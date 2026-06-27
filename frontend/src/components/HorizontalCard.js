import React from 'react';
import Button from './Button';
import Reveal from './Reveal';
import { ArrowRightIcon } from './icons';
import './HorizontalCard.css';

export default function HorizontalCard({
  title,
  body,
  image,
  alt,
  href = '#',
  reversed = false,
}) {
  return (
    <div className={`hcard${reversed ? ' hcard--reversed' : ''}`}>
      <Reveal className="hcard__media">
        <img
          className="hcard__img"
          src={`${process.env.PUBLIC_URL}${image}`}
          alt={alt}
          loading="lazy"
        />
      </Reveal>
      <Reveal className="hcard__content" delay={1}>
        <h3 className="hcard__title">{title}</h3>
        <p className="hcard__text">{body}</p>
        <Button as="a" href={href} variant="outline">
          Learn More
          <ArrowRightIcon />
        </Button>
      </Reveal>
    </div>
  );
}
