use actix_web::{get, web, HttpResponse, Responder};
use std::{fs::File, io::Read};
use std::path::Path;

pub async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello from Rust!")
}

pub async fn get_projects() -> impl Responder {
    let projects = vec!["Project A", "Project B", "Project C"];
    HttpResponse::Ok().json(projects) // Returns a JSON response
}

#[get("/pyrrhus/{file_name}")]
pub async fn get_icon(path: web::Path<String>) -> impl Responder {
    let file_name: String = path.into_inner();
    let file_path = Path::new("icons").join(file_name);
    let mut file = File::open(file_path).expect("No File");

    let mut buffer = Vec::new();

    file.read_to_end(&mut buffer).expect("Bad File");
    HttpResponse::Ok().json(buffer) // Returns a JSON response
}
