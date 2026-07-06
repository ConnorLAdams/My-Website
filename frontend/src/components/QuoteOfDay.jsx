import React from 'react';
import { quotes } from '../data/content';
import Reveal from './Reveal';

// Deterministic pick: same quote for a given calendar day (UTC).
function quoteForToday() {
  if (!quotes.length) return null;
  const now = new Date();
  const dayIndex = Math.floor(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000,
  );
  return quotes[dayIndex % quotes.length];
}

export default function QuoteOfDay() {
  const quote = quoteForToday();
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
        <Reveal as="p" className="text-sm font-semibold text-accent" delay={2}>
          {quote.author}
        </Reveal>
      </div>
    </section>
  );
}
