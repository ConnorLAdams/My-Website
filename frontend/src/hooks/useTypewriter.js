import { useEffect, useState } from 'react';

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Types then deletes each string in `words`, looping forever. Respects
 * `prefers-reduced-motion` by rendering the first word statically.
 *
 * Returns `{ text, done }` where `done` is true only in the reduced-motion
 * static case (useful for hiding the blinking caret).
 */
export default function useTypewriter(
  words,
  { typeMs = 85, deleteMs = 40, holdMs = 1400 } = {},
) {
  // Decide reduced-motion once at mount so the effect never sets state
  // synchronously (it only updates via async timeouts below).
  const [reduced] = useState(prefersReducedMotion);
  const [text, setText] = useState(() =>
    prefersReducedMotion() && words && words.length ? words[0] : '',
  );

  useEffect(() => {
    if (reduced || !words || words.length === 0) return undefined;

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer;

    const tick = () => {
      const word = words[wordIndex];
      if (!deleting) {
        charIndex += 1;
        setText(word.slice(0, charIndex));
        if (charIndex === word.length) {
          deleting = true;
          timer = setTimeout(tick, holdMs);
          return;
        }
        timer = setTimeout(tick, typeMs);
      } else {
        charIndex -= 1;
        setText(word.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          timer = setTimeout(tick, typeMs);
          return;
        }
        timer = setTimeout(tick, deleteMs);
      }
    };

    timer = setTimeout(tick, typeMs);
    return () => clearTimeout(timer);
  }, [reduced, words, typeMs, deleteMs, holdMs]);

  return { text, done: reduced };
}
