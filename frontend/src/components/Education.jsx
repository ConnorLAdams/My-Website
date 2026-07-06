import React from 'react';
import { education } from '../data/content';
import FeatureCard from './FeatureCard';
import Reveal from './Reveal';

export default function Education() {
  return (
    <section className="section bg-page" id="education">
      <div className="container">
        <Reveal className="mb-3 flex justify-center">
          <span className="eyebrow">Education</span>
        </Reveal>
        <Reveal as="h2" className="mb-8 text-center" delay={1}>
          Academic foundation
        </Reveal>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
          {education.map((item, index) => (
            <Reveal key={item.id} className="flex" delay={(index % 3) + 1}>
              <FeatureCard {...item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
