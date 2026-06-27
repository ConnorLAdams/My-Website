import React, { useState } from 'react';
import Reveal from './Reveal';
import Button from './Button';
import './Contact.css';

const API_BASE = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8080';
const SUBJECTS = [
  // 'Job opportunity',
  'Collaboration',
  'Freelance or contract work',
  'General question',
  'Just saying hi',
];
const EMPTY = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [error, setError] = useState('');

  const update = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.subject ||
      !form.message.trim()
    ) {
      setStatus('error');
      setError('Please fill in every field.');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        let message = 'Something went wrong. Please try again.';
        try {
          const data = await res.json();
          if (data && data.error) message = data.error;
        } catch (_) {
          /* ignore non-JSON error bodies */
        }
        throw new Error(message);
      }

      setForm(EMPTY);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section className="section contact" id="contact">
      <div className="container contact__inner">
        <Reveal as="h2" className="section__title">
          Get in touch
        </Reveal>
        <Reveal as="p" className="contact__lead" delay={1}>
          Have a role, a project, or a question? Send a message and I&rsquo;ll
          get back to you.
        </Reveal>

        <Reveal className="contact__card" delay={2}>
          {status === 'success' ? (
            <div className="contact__success" role="status">
              <h3>Thanks for reaching out!</h3>
              <p>Your message is on its way &mdash; I&rsquo;ll reply soon.</p>
              <Button
                type="button"
                variant="outline"
                onClick={() => setStatus('idle')}
              >
                Send another
              </Button>
            </div>
          ) : (
            <form className="contact__form" onSubmit={onSubmit} noValidate>
              <div className="contact__row">
                <label className="contact__field">
                  <span>Name</span>
                  <input
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={update}
                    autoComplete="name"
                    required
                  />
                </label>
                <label className="contact__field">
                  <span>Email</span>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={update}
                    autoComplete="email"
                    required
                  />
                </label>
              </div>
              <label className="contact__field">
                <span>Subject</span>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={update}
                  required
                >
                  <option value="" disabled>
                    Choose a topic…
                  </option>
                  {SUBJECTS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label className="contact__field">
                <span>Message</span>
                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={update}
                  required
                />
              </label>

              {status === 'error' && (
                <p className="contact__error" role="alert">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                variant="solid"
                className="contact__submit"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Sending\u2026' : 'Send message'}
              </Button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
