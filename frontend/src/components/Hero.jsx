import React from 'react';
import Button from './Button';
import Reveal from './Reveal';

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-page py-[clamp(2rem,6vw,6rem)]"
      id="top"
    >
      <div className="container grid grid-cols-1 items-center gap-8 min-[860px]:grid-cols-[1fr_1.25fr] min-[860px]:gap-[clamp(1.5rem,4vw,3rem)]">
        <div className="flex flex-col items-start gap-6">
          <Reveal as="h1" className="min-[860px]:max-w-[12ch]">
            BI Manager &amp; Mathematician
          </Reveal>
          <Reveal
            as="p"
            className="max-w-[42ch] text-[1.05rem] font-medium leading-[1.5] text-subtitle"
            delay={1}
          >
            Professional learner with a passion for all things complicated
          </Reveal>
          <Reveal delay={2}>
            <Button
              as="a"
              href="https://github.com/connorladams"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit My GitHub
            </Button>
          </Reveal>
        </div>

        <Reveal className="group relative before:absolute before:inset-[14%_-8%_-14%_12%] before:z-0 before:rounded-lg before:bg-[radial-gradient(60%_60%_at_70%_30%,var(--c-accent-soft),transparent_75%)] before:content-['']">
          <img
            className="relative z-[1] aspect-[686/481] w-full rounded-md object-cover shadow-[var(--shadow-lg)] transition-transform duration-[520ms] ease-brand group-hover:scale-[1.03]"
            src="/assets/hero-rooster.jpg"
            alt="A proud rooster strutting along the water's edge"
            loading="eager"
          />
        </Reveal>
      </div>
    </section>
  );
}
