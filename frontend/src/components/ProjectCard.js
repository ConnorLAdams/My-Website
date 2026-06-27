import React from 'react';
import {
  ArrowRightIcon,
  LogisticCurveIcon,
  OscillatorIcon,
  MatrixIcon,
  OrbitIcon,
} from './icons';
import './ProjectCard.css';

const ICONS = {
  logistic: LogisticCurveIcon,
  oscillator: OscillatorIcon,
  matrix: MatrixIcon,
  orbit: OrbitIcon,
};

export default function ProjectCard({ title, blurb, href = '#', icon, iconColor }) {
  const Icon = ICONS[icon] || LogisticCurveIcon;
  return (
    <article className="project-card">
      <span className="project-card__avatar" style={{ color: iconColor }}>
        <Icon />
      </span>
      <h3 className="project-card__title">{title}</h3>
      <p className="project-card__text">{blurb}</p>
      <a className="project-card__link" href={href}>
        Learn More
        <ArrowRightIcon />
      </a>
    </article>
  );
}
