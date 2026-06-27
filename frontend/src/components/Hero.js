import React from 'react';
import Button from './Button';
import Reveal from './Reveal';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__inner">
        <div className="hero__content">
          <Reveal as="h1" className="hero__title">
            BI Manager &amp; Mathematician
          </Reveal>
          <Reveal as="p" className="hero__subtitle" delay={1}>
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

        <Reveal className="hero__media">
          <img
            className="hero__image"
            src={`${process.env.PUBLIC_URL}/assets/hero-rooster.jpg`}
            alt="A proud rooster strutting along the water's edge"
            loading="eager"
          />
        </Reveal>
      </div>
    </section>
  );
}
