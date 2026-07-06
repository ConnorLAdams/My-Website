import React from 'react';
import { about } from '../data/content';
import Reveal from './Reveal';

export default function About() {
  return (
    <section className="section bg-page" id="about">
      <div className="container">
        <Reveal className="mb-3 flex justify-center">
          <span className="eyebrow">About</span>
        </Reveal>
        <Reveal
          as="p"
          className="mx-auto max-w-[62ch] text-center text-[1.15rem] leading-[1.7] text-body"
          delay={1}
        >
          {about}
        </Reveal>
      </div>
    </section>
  );
}
