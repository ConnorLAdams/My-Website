import React from 'react';
import { research } from '../data/content';
import HorizontalCard from './HorizontalCard';
import Reveal from './Reveal';

export default function Research() {
  return (
    <section className="section bg-surface" id="research">
      <div className="container">
        <Reveal className="mb-3 flex justify-center">
          <span className="eyebrow">Research</span>
        </Reveal>
        <Reveal as="h2" className="mb-10 text-center" delay={1}>
          Selected research
        </Reveal>
        <div className="[&>*+*]:mt-[clamp(2rem,5vw,4rem)]">
          {research.map((card) => (
            <HorizontalCard key={card.id} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
