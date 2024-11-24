mod handlers;
use actix_web::{web, App, HttpServer};
use actix_cors::Cors;
// use crate::handlers;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(handlers::get_icon)
            .wrap(Cors::default().allow_any_origin())
            // .route("/pyrrhus/{file_name}", web::get().to(handlers::get_icon))
            .route("/", web::get().to(handlers::hello))
            .route("/projects", web::get().to(handlers::get_projects))
        })
        .bind("127.0.0.1:8080")?
        .run()
        .await
}

