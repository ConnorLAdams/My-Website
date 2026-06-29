mod handlers;
use actix_web::{web, App, HttpServer};
use actix_cors::Cors;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Load env vars from backend/.env.local first (gitignored secrets),
    // then backend/.env as a fallback. Values already in the process
    // environment always take precedence over both files.
    let _ = dotenvy::from_filename(".env.local");
    let _ = dotenvy::dotenv();

    // Cloud Run tells the container which port to listen on via $PORT.
    let port: u16 = std::env::var("PORT")
        .ok()
        .and_then(|p| p.parse().ok())
        .unwrap_or(8080);

    HttpServer::new(|| {
        // Restrict CORS to the production site and local dev origins. In
        // production the frontend is same-origin (served via a Firebase
        // Hosting rewrite to this service), so CORS only matters for direct
        // or local cross-origin calls.
        let cors = Cors::default()
            .allowed_origin("https://connoradams.io")
            .allowed_origin("https://www.connoradams.io")
            .allowed_origin("http://localhost:3000")
            .allowed_origin("http://127.0.0.1:3000")
            .allowed_methods(vec!["GET", "POST"])
            .allow_any_header()
            .max_age(3600);

        App::new()
            .wrap(cors)
            // Root health check (hit directly, e.g. by Cloud Run).
            .route("/", web::get().to(handlers::hello))
            // API lives under /api so the Firebase Hosting rewrite
            // (/api/** -> this service) maps cleanly onto these routes.
            .service(
                web::scope("/api")
                    .service(handlers::contact)
                    .service(handlers::serve_media),
            )
    })
    .bind(("0.0.0.0", port))?
    .run()
    .await
}

