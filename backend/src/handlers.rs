use actix_web::{HttpResponse, Responder};

pub async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello from Rust!")
}

pub async fn get_projects() -> impl Responder {
    let projects = vec!["Project A", "Project B", "Project C"];
    HttpResponse::Ok().json(projects) // Returns a JSON response
}

