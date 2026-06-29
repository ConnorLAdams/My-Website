use actix_web::{post, web, HttpResponse, Responder};
use serde::Deserialize;
use serde_json::json;

pub async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello from Rust!")
}

#[derive(Deserialize)]
pub struct ContactForm {
    pub name: String,
    pub email: String,
    #[serde(default)]
    pub subject: String,
    pub message: String,
}

fn escape_html(input: &str) -> String {
    input
        .replace('&', "&amp;")
        .replace('<', "&lt;")
        .replace('>', "&gt;")
        .replace('"', "&quot;")
}

#[post("/contact")]
pub async fn contact(form: web::Json<ContactForm>) -> impl Responder {
    let name = form.name.trim();
    let email = form.email.trim();
    let message = form.message.trim();
    let subject_choice = form.subject.trim();
    let subject_choice = if subject_choice.is_empty() {
        "General"
    } else {
        subject_choice
    };

    if name.is_empty() || message.is_empty() || !email.contains('@') || email.len() < 3 {
        return HttpResponse::BadRequest()
            .json(json!({ "error": "Please provide your name, a valid email, and a message." }));
    }

    let api_key = match std::env::var("RESEND_API_KEY") {
        Ok(key) if !key.is_empty() => key,
        _ => {
            eprintln!("[contact] RESEND_API_KEY is not set");
            return HttpResponse::InternalServerError()
                .json(json!({ "error": "The email service is not configured yet." }));
        }
    };

    let to = match std::env::var("CONTACT_TO_EMAIL") {
        Ok(addr) if !addr.is_empty() => addr,
        _ => {
            eprintln!("[contact] CONTACT_TO_EMAIL is not set");
            return HttpResponse::InternalServerError()
                .json(json!({ "error": "The email service is not configured yet." }));
        }
    };

    let from = std::env::var("CONTACT_FROM_EMAIL")
        .unwrap_or_else(|_| "Portfolio Contact <contact@connoradams.io>".to_string());

    let html_body = format!(
        "<p><strong>Name:</strong> {}</p><p><strong>Email:</strong> {}</p><p><strong>Subject:</strong> {}</p><p style=\"white-space:pre-wrap\">{}</p>",
        escape_html(name),
        escape_html(email),
        escape_html(subject_choice),
        escape_html(message),
    );
    let text_body =
        format!("Name: {name}\nEmail: {email}\nSubject: {subject_choice}\n\n{message}");

    let payload = json!({
        "from": from,
        "to": [to],
        "reply_to": email,
        "subject": format!("Portfolio contact ({subject_choice}) — {name}"),
        "html": html_body,
        "text": text_body,
    });

    let client = reqwest::Client::new();
    let response = client
        .post("https://api.resend.com/emails")
        .bearer_auth(api_key)
        .json(&payload)
        .send()
        .await;

    match response {
        Ok(resp) if resp.status().is_success() => HttpResponse::Ok().json(json!({ "ok": true })),
        Ok(resp) => {
            let status = resp.status();
            let body = resp.text().await.unwrap_or_default();
            eprintln!("[contact] Resend returned {status}: {body}");
            HttpResponse::BadGateway()
                .json(json!({ "error": "Your message could not be sent. Please try again later." }))
        }
        Err(err) => {
            eprintln!("[contact] request to Resend failed: {err}");
            HttpResponse::BadGateway()
                .json(json!({ "error": "Your message could not be sent. Please try again later." }))
        }
    }
}
