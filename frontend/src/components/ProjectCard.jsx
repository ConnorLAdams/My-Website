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

export default function ProjectCard({ title, blurb, href = '#', icon, iconColor }) {
  const Icon = ICONS[icon] || LogisticCurveIcon;
  return (
    <article className="flex shrink-0 grow-0 basis-[320px] snap-start flex-col items-center gap-3 rounded-md border border-line bg-elevated p-8 text-center shadow-[var(--shadow-sm)] transition duration-[240ms] ease-brand hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]">
      <span
        className="grid h-21 w-21 place-items-center overflow-hidden rounded-full border-[3px] border-elevated bg-surface shadow-[var(--shadow-sm)] [&>svg]:size-[46px]"
        style={{ color: iconColor }}
      >
        <Icon />
      </span>
      <h3 className="text-[1.15rem] text-heading">{title}</h3>
      <p className="text-[0.92rem] leading-[1.6] text-muted">{blurb}</p>
      <a
        className="group mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
        href={href}
      >
        Learn More
        <ArrowRightIcon className="size-[1em] transition-transform duration-[140ms] group-hover:translate-x-[3px]" />
      </a>
    </article>
  );
}
