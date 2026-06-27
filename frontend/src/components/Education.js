import React from 'react';
import { education } from '../data/content';
import FeatureCard from './FeatureCard';
import Reveal from './Reveal';
import './Education.css';

export default function Education() {
  return (
    <section className="section education" id="education">
      <div className="container">
        <Reveal as="h2" className="section__title">
          Education
        </Reveal>
        <div className="education__grid">
          {education.map((item, index) => (
            <Reveal
              key={item.id}
              className="education__cell"
              delay={(index % 3) + 1}
            >
              <FeatureCard {...item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
