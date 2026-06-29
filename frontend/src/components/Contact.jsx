import React, { useState } from 'react';
import Reveal from './Reveal';
import Button from './Button';

const API_BASE = import.meta.env.VITE_API_URL || '/api';
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
    <section className="section bg-page" id="contact">
      <div className="container">
        <Reveal as="h2" className="mb-3 text-center">
          Get in touch
        </Reveal>
        <Reveal
          as="p"
          className="mx-auto mb-12 max-w-[54ch] text-center text-[1.05rem] leading-[1.6] text-muted"
          delay={1}
        >
          Have a role, a project, or a question? Send a message and I&rsquo;ll
          get back to you.
        </Reveal>

        <Reveal
          className="mx-auto w-full max-w-[640px] rounded-lg border border-line bg-surface p-[clamp(1.5rem,4vw,3rem)] shadow-[var(--shadow-md)]"
          delay={2}
        >
          {status === 'success' ? (
            <div
              className="flex flex-col items-center gap-4 py-6 text-center"
              role="status"
            >
              <h3>Thanks for reaching out!</h3>
              <p className="text-muted">
                Your message is on its way &mdash; I&rsquo;ll reply soon.
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => setStatus('idle')}
              >
                Send another
              </Button>
            </div>
          ) : (
            <form
              className="contact-form flex flex-col gap-4"
              onSubmit={onSubmit}
              noValidate
            >
              <div className="grid grid-cols-2 gap-4 max-[560px]:grid-cols-1">
                <label className="flex flex-col gap-2 text-sm font-semibold text-body">
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
                <label className="flex flex-col gap-2 text-sm font-semibold text-body">
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
              <label className="flex flex-col gap-2 text-sm font-semibold text-body">
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
              <label className="flex flex-col gap-2 text-sm font-semibold text-body">
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
                <p
                  className="m-0 text-sm font-semibold text-[#d14343]"
                  role="alert"
                >
                  {error}
                </p>
              )}

              <Button
                type="submit"
                variant="solid"
                className="self-start"
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
