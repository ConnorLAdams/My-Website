import React, { useState } from 'react';
import { experience } from '../data/content';
import Reveal from './Reveal';
import { ChevronDownIcon } from './icons';

// Collapsible "dropdown" accordion (ciangoon-style). Each role expands to reveal
// its summary and grouped achievements. First role open by default; any number
// can be open at once.
export default function Experience() {
  const [open, setOpen] = useState(
    () => new Set(experience.length ? [experience[0].id] : []),
  );

  const toggle = (id) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <section className="section bg-surface" id="experience">
      <div className="container">
        <Reveal className="mb-3 flex justify-center">
          <span className="eyebrow">Experience</span>
        </Reveal>
        <Reveal as="h2" className="mb-10 text-center" delay={1}>
          Where I&rsquo;ve worked
        </Reveal>

        <Reveal className="exp-list mx-auto max-w-[760px]">
          {experience.map((job) => {
            const isOpen = open.has(job.id);
            const panelId = `exp-panel-${job.id}`;
            return (
              <div className="exp-item" key={job.id}>
                <button
                  type="button"
                  className="exp-header"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(job.id)}
                >
                  <span className="exp-header__main">
                    <span className="exp-header__role">{job.role}</span>
                    <span className="exp-header__meta">
                      {job.company}
                      {job.location ? ` \u00b7 ${job.location}` : ''}
                    </span>
                  </span>
                  <span className="exp-header__right">
                    <span className="exp-header__period">{job.period}</span>
                    <ChevronDownIcon
                      className={`exp-chevron${isOpen ? ' is-open' : ''}`}
                    />
                  </span>
                </button>
                <div
                  className={`exp-panel${isOpen ? ' is-open' : ''}`}
                  id={panelId}
                >
                  <div className="exp-panel__inner">
                    <div className="exp-panel__content">
                      {job.summary && (
                        <p className="exp-summary">{job.summary}</p>
                      )}
                      <div className="exp-groups">
                        {job.groups.map((group) => (
                          <div key={group.heading}>
                            <p className="eyebrow mb-2">{group.heading}</p>
                            <ul className="exp-points">
                              {group.points.map((point, idx) => (
                                <li key={idx}>{point}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
