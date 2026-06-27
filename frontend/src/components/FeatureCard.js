import React from 'react';
import { AwardIcon, GradCapIcon, RocketIcon } from './icons';
import './FeatureCard.css';

const ICONS = {
  award: AwardIcon,
  cap: GradCapIcon,
  rocket: RocketIcon,
};

export default function FeatureCard({ title, body, icon, iconColor }) {
  const Icon = ICONS[icon] || AwardIcon;
  return (
    <article className="feature-card">
      <span className="feature-card__icon" style={{ color: iconColor }}>
        <Icon />
      </span>
      <h3 className="feature-card__title">{title}</h3>
      <p className="feature-card__body">{body}</p>
    </article>
  );
}
