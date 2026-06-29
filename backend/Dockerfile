# ---- Build stage ----
FROM rust:1-slim AS build
WORKDIR /app

# Copy manifest + sources and build an optimized release binary.
COPY Cargo.toml Cargo.lock ./
COPY src ./src
RUN cargo build --release

# ---- Runtime stage ----
# distroless/cc includes glibc + ca-certificates, which reqwest (rustls) needs
# to make the HTTPS call to the Resend API.
FROM gcr.io/distroless/cc-debian12
COPY --from=build /app/target/release/backend /usr/local/bin/backend

# Cloud Run provides $PORT at runtime; the app reads it and defaults to 8080.
ENV PORT=8080
EXPOSE 8080

CMD ["/usr/local/bin/backend"]
