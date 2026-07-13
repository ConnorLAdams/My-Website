import React, { useState, useEffect, useCallback } from 'react';
import { quotes as fallbackQuotes } from '../data/content';
import Reveal from './Reveal';
import { RefreshCwIcon } from './icons';

// Deterministic fallback so something is shown immediately while the API loads.
function fallbackForToday() {
  if (!fallbackQuotes.length) return null;
  const now = new Date();
  const dayIndex = Math.floor(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000,
  );
  return fallbackQuotes[dayIndex % fallbackQuotes.length];
}

function randomFallback() {
  if (!fallbackQuotes.length) return null;
  return fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
}

export default function QuoteOfDay() {
  const [quote, setQuote] = useState(fallbackForToday);
  const [loading, setLoading] = useState(false);

  const fetchQuote = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/quote');
      if (!res.ok) throw new Error('non-ok');
      const data = await res.json();
      if (data.text && data.author) {
        setQuote({ text: data.text, author: data.author });
      } else {
        throw new Error('empty');
      }
    } catch {
      setQuote(randomFallback());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  if (!quote) return null;

  return (
    <section className="section bg-surface" id="quote">
      <div className="container flex flex-col items-center gap-4 text-center">
        <Reveal className="flex justify-center">
          <span className="eyebrow">Quote of the day</span>
        </Reveal>
        <Reveal
          as="blockquote"
          className="max-w-[60ch] text-[clamp(1.25rem,1rem+1.4vw,1.75rem)] font-medium leading-[1.5] text-heading"
          delay={1}
        >
          &ldquo;{quote.text}&rdquo;
        </Reveal>
        <Reveal className="flex flex-col items-center gap-3" delay={2}>
          <p className="text-sm font-semibold text-accent">{quote.author}</p>
          <button
            type="button"
            onClick={fetchQuote}
            disabled={loading}
            aria-label="Refresh quote"
            className="grid h-8 w-8 place-items-center rounded-full border border-line text-muted transition duration-[140ms] ease-brand hover:border-accent hover:text-accent disabled:cursor-not-allowed"
          >
            <RefreshCwIcon className={`size-[15px]${loading ? ' animate-spin' : ''}`} />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
