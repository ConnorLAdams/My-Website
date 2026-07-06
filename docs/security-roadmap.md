# Security roadmap — connoradams.io

A prioritised checklist of security improvements for the React/Vite frontend
(Firebase Hosting) + Rust/actix-web backend (Cloud Run) stack.  Items are
grouped by urgency, not implementation order — do P0 before anything else.

## Threat model (brief)

This is a read-mostly personal portfolio with one write surface (the contact
form).  There is no user authentication, no database, and no stored PII beyond
what Resend receives and retransmits as email.  The realistic threats are:

- **Spam / API abuse** — bots hammering `/api/contact` burns Resend credits and
  can get the sending domain flagged.
- **Content injection** — malicious input in the contact form forwarded into the
  HTML email body (already partially mitigated; gaps remain).
- **Clickjacking / XSS** — missing HTTP security headers leave the door open on
  the frontend.
- **Resource exhaustion** — no rate limiting or request-size caps on any
  endpoint.
- **Information leakage** — error messages, log lines, and response bodies
  disclosing internal details.
- **Credential theft** — Resend API key exposure via logs, error responses, or
  misconfigured secrets.
- **Dependency vulnerabilities** — unaudited npm/Cargo packages.

---

## P0 — Fix now (active risk)

### 1. Rate-limit the contact endpoint

Every unauthenticated call to `POST /api/contact` fires a real Resend API
request.  There is currently no limit.  A simple bot can exhaust your monthly
Resend quota in seconds and potentially get `connoradams.io` flagged as a
spam source.

**Add `actix-governor` (token-bucket rate limiter for actix-web):**

```toml
# backend/Cargo.toml
actix-governor = "0.5"
```

```rust
// backend/src/main.rs
use actix_governor::{Governor, GovernorConfigBuilder};

let contact_governor = GovernorConfigBuilder::default()
    .per_second(1)        // 1 request per second sustained
    .burst_size(3)        // allow short bursts of 3
    .finish()
    .unwrap();

App::new()
    .service(
        web::scope("/api")
            .service(
                web::scope("")
                    .wrap(Governor::new(&contact_governor))
                    .service(handlers::contact),
            )
            .service(handlers::serve_media),
    )
```

Keyed by client IP by default.  Cloud Run sets `X-Forwarded-For`; configure
`GovernorConfigBuilder::use_headers()` to key on that header.

---

### 2. Add HTTP security headers to Firebase Hosting

`firebase.json` currently has no `headers` block.  This means the site ships
without a Content Security Policy, no framing protection, and no MIME-type
sniffing guard.

```json
// firebase.json — add inside "hosting"
"headers": [
  {
    "source": "**",
    "headers": [
      { "key": "X-Frame-Options",        "value": "DENY" },
      { "key": "X-Content-Type-Options", "value": "nosniff" },
      { "key": "Referrer-Policy",        "value": "strict-origin-when-cross-origin" },
      { "key": "Permissions-Policy",     "value": "camera=(), microphone=(), geolocation=()" },
      {
        "key": "Content-Security-Policy",
        "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' /api/; connect-src 'self' /api/; frame-ancestors 'none'"
      },
      { "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains" }
    ]
  },
  {
    "source": "/assets/**",
    "headers": [
      { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
    ]
  }
]
```

> **Note:** The CSP `unsafe-inline` is required by Tailwind's runtime CSS
> injection.  Once you pin Tailwind to a build-time-only step (which is already
> done in this Vite setup), you can tighten this to a nonce- or hash-based
> approach.

---

### 3. Validate the `subject` field on the backend

The frontend restricts subjects to a hardcoded list, but the backend accepts
any string.  A caller bypassing the UI can inject arbitrary text into the email
subject line.  Validate against the allowlist server-side:

```rust
// backend/src/handlers.rs
const ALLOWED_SUBJECTS: &[&str] = &[
    "Collaboration",
    "Freelance or contract work",
    "General question",
    "Just saying hi",
    "General",  // the default fallback
];

// inside the contact handler, after trimming:
if !ALLOWED_SUBJECTS.contains(&subject_choice) {
    return HttpResponse::BadRequest()
        .json(json!({ "error": "Invalid subject." }));
}
```

---

## P1 — Short-term (do before the next deploy)

### 4. Add a request body size limit

actix-web's default JSON extractor limit is 256 KB, which is far larger than
any contact form submission needs.  Tightening this reduces the impact of
someone sending huge payloads to exhaust Cloud Run memory.

```rust
// backend/src/main.rs — configure the JSON extractor
App::new()
    .app_data(
        web::JsonConfig::default()
            .limit(4_096)  // 4 KB — more than enough for a contact form
            .error_handler(|err, _req| {
                let resp = HttpResponse::BadRequest()
                    .json(json!({ "error": err.to_string() }));
                actix_web::error::InternalError::from_response(err, resp).into()
            }),
    )
    // ...
```

---

### 5. Add a honeypot field to the contact form

Bots typically fill every visible field.  A hidden field that legitimate users
never touch (and that the backend rejects if non-empty) catches the majority of
automated submissions without requiring a CAPTCHA.

**Frontend (`Contact.jsx`):**
```jsx
{/* Honeypot — hidden from users, filled only by bots */}
<input
  name="website"
  type="text"
  value={form.website || ''}
  onChange={update}
  tabIndex={-1}
  autoComplete="off"
  aria-hidden="true"
  style={{ display: 'none' }}
/>
```

**Backend (`handlers.rs`):**
```rust
pub struct ContactForm {
    // ...existing fields...
    #[serde(default)]
    pub website: String,  // honeypot
}

// at the top of the handler:
if !form.website.is_empty() {
    // Silently return 200 so bots don't know they were caught.
    return HttpResponse::Ok().json(json!({ "ok": true }));
}
```

---

### 6. Strengthen email validation

`!email.contains('@') || email.len() < 3` accepts strings like `a@b`.  Use a
minimal structural check that at least requires a local part, `@`, and a domain
with a dot:

```rust
fn is_valid_email(email: &str) -> bool {
    let parts: Vec<&str> = email.splitn(2, '@').collect();
    if parts.len() != 2 { return false; }
    let (local, domain) = (parts[0], parts[1]);
    !local.is_empty() && domain.contains('.') && domain.len() > 3
}

// replace the inline check:
if name.is_empty() || message.is_empty() || !is_valid_email(email) { ... }
```

For stricter validation, consider the `email_address` crate (RFC 5321 compliant).

---

### 7. Share the `reqwest::Client` across requests

`handlers.rs` calls `reqwest::Client::new()` on every contact submission.
Creating a new client allocates a thread-pool, TLS state, and connection pool
each time.  This is wasteful and, under load, a resource-exhaustion vector.

```rust
// backend/src/main.rs
let http_client = reqwest::Client::builder()
    .timeout(std::time::Duration::from_secs(10))
    .build()
    .expect("failed to build reqwest client");

App::new()
    .app_data(web::Data::new(http_client))
    // ...

// backend/src/handlers.rs
pub async fn contact(
    client: web::Data<reqwest::Client>,
    form: web::Json<ContactForm>,
) -> impl Responder {
    // use client instead of reqwest::Client::new()
```

This also gives you a natural place to enforce a request timeout (currently
there is none — a slow Resend response hangs the handler indefinitely).

---

### 8. Add `cargo audit` and `npm audit` to CI

Neither GitHub Actions workflow currently audits dependencies for known CVEs.
Add a step to each:

```yaml
# .github/workflows/deploy-backend.yml
- name: Audit Cargo dependencies
  run: |
    cargo install cargo-audit --locked
    cargo audit
  working-directory: backend
```

```yaml
# .github/workflows/deploy-frontend.yml
- name: Audit npm dependencies
  run: npm audit --audit-level=high
  working-directory: frontend
```

Set `--audit-level=high` for npm to avoid blocking on low-severity advisories
in dev-only packages.

---

## P2 — Medium-term (hardening)

### 9. Validate media file extensions on the backend

`serve_media` currently allows any filename that doesn't contain path
separators.  Someone requesting `/api/media/handlers.rs` (if `MEDIA_DIR` were
misconfigured to point to `src/`) would receive it.  Restrict to an explicit
allowlist of extensions the endpoint is supposed to serve:

```rust
const ALLOWED_EXTENSIONS: &[&str] = &[
    "jpg", "jpeg", "png", "svg", "webp", "gif", "ico", "pdf",
];

let ext_ok = file_path
    .extension()
    .and_then(|e| e.to_str())
    .map(|e| ALLOWED_EXTENSIONS.contains(&e.to_lowercase().as_str()))
    .unwrap_or(false);

if !ext_ok {
    return Err(actix_web::error::ErrorForbidden("file type not allowed"));
}
```

---

### 10. Add security headers in the backend response

The `/api/**` routes (served from Cloud Run) bypass Firebase Hosting's `headers`
block.  Add a response middleware to the actix-web app that sets security
headers for every API response:

```rust
// backend/src/main.rs
use actix_web::middleware::DefaultHeaders;

App::new()
    .wrap(
        DefaultHeaders::new()
            .add(("X-Content-Type-Options", "nosniff"))
            .add(("X-Frame-Options", "DENY"))
            .add(("Cache-Control", "no-store"))  // API responses should not be cached
    )
    // ...
```

---

### 11. Move remaining plaintext env vars to Secret Manager

`CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` are not secrets today, but they
set a precedent.  More importantly, Cloud Run's `--set-env-vars` values are
visible in the Cloud Console to any project IAM member.  Migrate all
configuration to Secret Manager for a uniform access-controlled store:

```bash
gcloud secrets create contact-to-email --replication-policy=automatic
echo -n "connor@connoradams.io" | gcloud secrets versions add contact-to-email --data-file=-

# then in the deploy command:
--set-secrets RESEND_API_KEY=resend-api-key:latest,\
              CONTACT_TO_EMAIL=contact-to-email:latest,\
              CONTACT_FROM_EMAIL=contact-from-email:latest
```

---

### 12. Sanitize logs — avoid logging user-supplied data

`eprintln!("[contact] Resend returned {status}: {body}")` logs the raw Resend
response body.  While this is from Resend (not directly from the user), error
bodies can reflect submitted data.  Log only the status code in production:

```rust
eprintln!("[contact] Resend returned {status}");
// if debugging is needed, gate on a DEBUG env var:
if std::env::var("LOG_RESEND_BODY").is_ok() {
    eprintln!("[contact] Resend body: {body}");
}
```

---

### 13. Verify email DNS records (SPF, DKIM, DMARC)

The deployment roadmap notes that Resend's SPF/DKIM records are set up for
`connoradams.io`.  Complete the email authentication chain with DMARC:

```
# DNS TXT record:
_dmarc.connoradams.io  TXT  "v=DMARC1; p=quarantine; rua=mailto:dmarc@connoradams.io; pct=100"
```

Start with `p=quarantine` (softer), verify no legitimate mail is affected via
the aggregate reports, then move to `p=reject`.  Without DMARC, anyone can
spoof `@connoradams.io` in the `From` header.

---

## P3 — Long-term (defense in depth)

### 14. CAPTCHA or proof-of-work on the contact form

A honeypot (item 5) catches naive bots but not targeted scripts.  For stronger
spam prevention, add one of:

- **Cloudflare Turnstile** (privacy-friendly, no user interaction required for
  most visitors) — free tier available.
- **hCaptcha** — free for low-volume personal sites.
- **Proof-of-work** (e.g. `@altcha-org/altcha`) — fully self-hosted,
  no third-party calls, solves client-side.

---

### 15. Subresource Integrity (SRI) for external fonts

`theme.css` currently imports Inter from Google Fonts via a `<link>` in
`index.html`.  If that CDN is compromised, injected scripts could run on the
page.  Either self-host the font files (preferred) or add `integrity` +
`crossorigin` attributes to the `<link>` tag:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap"
  integrity="sha384-<hash>"
  crossorigin="anonymous"
/>
```

Note: Google Fonts responses are not stable hashes (they vary by user-agent),
so self-hosting is the more reliable path.

---

### 16. Set Cloud Run minimum / maximum instance limits

The current deployment has no explicit concurrency or instance caps.  A spike
in traffic (or a deliberate flood) can scale Cloud Run beyond your cost
comfort:

```bash
gcloud run services update backend \
  --region us-central1 \
  --min-instances 0 \
  --max-instances 5 \
  --concurrency 80
```

Pair this with the rate limiter from item 1 so per-IP abuse is caught before
it generates many Cloud Run instances.

---

### 17. Enable Cloud Armor (WAF) on the Cloud Run origin

Once the site has sustained traffic, consider attaching a Cloud Armor security
policy to the Firebase Hosting backend service.  This gives managed WAF rules
(OWASP top 10), geo-blocking, and adaptive protection at the network edge
before requests ever hit actix-web.

Cloud Armor is overkill for a portfolio today but worth knowing for when the
site grows or if you repurpose the backend for higher-stakes use.

---

## Summary table

| # | Item | Priority | Effort |
|---|------|----------|--------|
| 1 | Rate-limit `/api/contact` | P0 | ~1 h |
| 2 | HTTP security headers (Firebase) | P0 | ~30 min |
| 3 | Validate subject server-side | P0 | ~15 min |
| 4 | Body size limit | P1 | ~15 min |
| 5 | Honeypot field | P1 | ~30 min |
| 6 | Stronger email validation | P1 | ~20 min |
| 7 | Shared `reqwest::Client` + timeout | P1 | ~30 min |
| 8 | `cargo audit` + `npm audit` in CI | P1 | ~30 min |
| 9 | Media extension allowlist | P2 | ~20 min |
| 10 | Security headers on API responses | P2 | ~20 min |
| 11 | Move all config to Secret Manager | P2 | ~30 min |
| 12 | Sanitize log output | P2 | ~15 min |
| 13 | DMARC record | P2 | ~20 min |
| 14 | CAPTCHA / proof-of-work | P3 | ~2–4 h |
| 15 | Self-host fonts / SRI | P3 | ~1 h |
| 16 | Cloud Run instance limits | P3 | ~15 min |
| 17 | Cloud Armor WAF | P3 | ~2 h |
