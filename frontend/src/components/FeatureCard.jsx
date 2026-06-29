import React from 'react';
import { AwardIcon, GradCapIcon, RocketIcon } from './icons';

const ICONS = {
  award: AwardIcon,
  cap: GradCapIcon,
  rocket: RocketIcon,
};

export default function FeatureCard({ title, body, icon, iconColor }) {
  const Icon = ICONS[icon] || AwardIcon;
  return (
    <article className="flex h-full w-full flex-col gap-4 rounded-md border border-line bg-surface p-8 shadow-[var(--shadow-sm)] transition duration-[240ms] ease-brand hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]">
      <span
        className="inline-grid h-14 w-14 place-items-center rounded-sm bg-elevated shadow-[var(--shadow-sm)] [&>svg]:size-[30px]"
        style={{ color: iconColor }}
      >
        <Icon />
      </span>
      <h3 className="text-h3 text-accent-fill">{title}</h3>
      <p className="text-[0.95rem] leading-[1.65] text-body">{body}</p>
    </article>
  );
}
