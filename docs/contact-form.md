# Contact form & email (Resend)

The site's **Contact** section posts a message to the Rust backend, which sends
it to your inbox through [Resend](https://resend.com). The API key stays on the
server and is never exposed to the browser.

## How it works

- Frontend: `frontend/src/components/Contact.js` posts JSON `{ name, email, message }`
  to `${REACT_APP_API_URL || "http://127.0.0.1:8080"}/contact`.
- Backend: `POST /contact` in `backend/src/handlers.rs` validates the input and
  calls the Resend API. `reply_to` is set to the visitor's email so you can reply
  directly from your inbox.
- Secrets are read from environment variables (loaded from `backend/.env.local`,
  then `backend/.env`).

## Prerequisites

- A Resend account with the `connoradams.io` domain verified.

## 1. Create a minimal-scope Resend API key

> A Resend API key can only be created from your Resend account (the dashboard,
> or the Resend API using an *existing* full-access key). It can't be generated
> from this repo, and you should never share it in chat — paste it straight into
> `backend/.env.local`.

In the Resend dashboard:

1. Go to **API Keys → Create API Key**.
2. **Name:** `portfolio-contact-form`.
3. **Permission:** select **Sending access** (not *Full access*). This is the
   least privilege needed — the key can send email but cannot manage domains,
   keys, or read account data.
4. **Domain:** restrict the key to **connoradams.io**.
5. Create it and copy the key (it's shown only once).

## 2. Configure `backend/.env.local`

This file is gitignored. Fill in:

```
RESEND_API_KEY=re_your_real_key
CONTACT_TO_EMAIL=you@your-inbox.com
CONTACT_FROM_EMAIL=Portfolio Contact <contact@connoradams.io>
```

- `CONTACT_FROM_EMAIL` must use the verified `connoradams.io` domain (any
  local-part, e.g. `contact@`, works).
- `CONTACT_TO_EMAIL` must be an inbox you actually receive mail at. Resend only
  *sends* mail, so `connoradams.io` won't receive anything unless you also have
  email hosting/forwarding there — a personal inbox is usually simplest.

## 3. Run locally

```
cd backend && cargo run     # API on 127.0.0.1:8080, loads .env.local then .env
cd frontend && npm start    # site on http://localhost:3000
```

Submit the form; the message should arrive at `CONTACT_TO_EMAIL`.

## Production notes

- Build the frontend with `REACT_APP_API_URL` pointing at the deployed backend.
- CORS is currently open (any origin) for local dev — lock it to your real
  origin in `backend/src/main.rs` before deploying.
- Consider basic spam protection (a honeypot field and/or rate limiting).

## Troubleshooting

- **"The email service is not configured yet."** — `RESEND_API_KEY` or
  `CONTACT_TO_EMAIL` is missing/empty in `backend/.env.local`.
- **"Your message could not be sent."** — check the backend logs for
  `[contact] Resend returned ...`; usually the `from` domain isn't verified or
  the key lacks sending access.
- **CORS / network error in the browser** — make sure the backend is running on
  `127.0.0.1:8080` (or set `REACT_APP_API_URL`).
