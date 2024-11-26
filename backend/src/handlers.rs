use actix_web::{get, web, HttpResponse, Responder};
use std::{fs::File, io::Read};
use std::path::Path;

pub async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello from Rust!")
}

#[get("/projects")]
pub async fn get_projects() -> impl Responder {
    let projects = vec!["Project A", "Project B", "Project C"];
    HttpResponse::Ok().json(projects) // Returns a JSON response
}

#[get("/pyrrhus2/{file_name}")]
pub async fn get_icon(path: web::Path<String>) -> impl Responder {
    let file_name: String = path.into_inner();
    let file_path = Path::new("icons").join(file_name);
    let mut file = File::open(file_path).expect("No File");

    let mut buffer = Vec::new();

    file.read_to_end(&mut buffer).expect("Bad File");
    HttpResponse::Ok().body(buffer) // Returns a JSON response
}

#[get("/pyrrhus")]
pub async fn get_rp_icon() -> impl Responder {
    let image_path = "media/rp_icon.png";

    let mut image = File::open(image_path).expect("Not an error");

    let mut buffer = Vec::new();

    image.read_to_end(&mut buffer).expect("Not an error");

    HttpResponse::Ok().body(buffer)
}
