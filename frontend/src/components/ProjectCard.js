import React from 'react';
import { ArrowRightIcon } from './icons';
import './ProjectCard.css';

export default function ProjectCard({ title, blurb, href = '#' }) {
  return (
    <article className="project-card">
      <span className="project-card__avatar">
        <img src={`${process.env.PUBLIC_URL}/assets/logo.svg`} alt="" />
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
