mod handlers;
use actix_web::{web, App, HttpServer};
use actix_cors::Cors;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .wrap(Cors::default().allow_any_origin())
            .service(handlers::get_icon)
            // .route("/pyrrhus/{file_name}", web::get().to(handlers::get_icon))
            .service(handlers::get_projects)
            .service(handlers::get_rp_icon)
            .route("/", web::get().to(handlers::hello))
        })
        .bind("127.0.0.1:8080")?
        .run()
        .await
}

