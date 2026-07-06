import React from 'react';
import { AwardIcon, GradCapIcon, RocketIcon } from './icons';

const ICONS = {
  award: AwardIcon,
  cap: GradCapIcon,
  rocket: RocketIcon,
};

export default function FeatureCard({ title, body, icon }) {
  const Icon = ICONS[icon] || AwardIcon;
  return (
    <article className="flex h-full w-full flex-col gap-4 rounded-md border border-line bg-surface p-8 transition duration-[240ms] ease-brand hover:-translate-y-1 hover:border-accent hover:shadow-[var(--shadow-md)]">
      <span className="inline-grid h-12 w-12 place-items-center rounded-sm bg-elevated text-accent [&>svg]:size-[26px]">
        <Icon />
      </span>
      <h3 className="text-h3 text-heading">{title}</h3>
      <p className="text-[0.95rem] leading-[1.65] text-body">{body}</p>
    </article>
  );
}
