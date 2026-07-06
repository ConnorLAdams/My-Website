import React from 'react';
import {
  ArrowRightIcon,
  LogisticCurveIcon,
  OscillatorIcon,
  MatrixIcon,
  OrbitIcon,
} from './icons';

const ICONS = {
  logistic: LogisticCurveIcon,
  oscillator: OscillatorIcon,
  matrix: MatrixIcon,
  orbit: OrbitIcon,
};

export default function ProjectCard({ title, blurb, href = '#', icon, category }) {
  const Icon = ICONS[icon] || LogisticCurveIcon;
  return (
    <article className="group flex h-full w-full flex-col gap-4 rounded-md border border-line bg-elevated p-6 transition duration-[240ms] ease-brand hover:-translate-y-1 hover:border-accent hover:shadow-[var(--shadow-md)]">
      <div className="flex items-center justify-between gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-sm bg-surface text-accent [&>svg]:size-[24px]">
          <Icon />
        </span>
        {category && <span className="eyebrow">{category}</span>}
      </div>
      <h3 className="text-[1.15rem] text-heading">{title}</h3>
      <p className="text-[0.92rem] leading-[1.6] text-muted">{blurb}</p>
      <a
        className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn More
        <ArrowRightIcon className="size-[1em] transition-transform duration-[140ms] group-hover:translate-x-[3px]" />
      </a>
    </article>
  );
}
