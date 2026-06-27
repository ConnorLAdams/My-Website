import React, { useRef } from 'react';
import { projects } from '../data/content';
import ProjectCard from './ProjectCard';
import Reveal from './Reveal';
import { ArrowRightIcon } from './icons';
import './Projects.css';

export default function Projects() {
  const scrollerRef = useRef(null);

  const scrollByCards = (direction) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * 344, behavior: 'smooth' });
  };

  return (
    <section className="section projects" id="projects">
      <div className="container">
        <div className="projects__head">
          <Reveal as="h2" className="section__title projects__title">
            Projects
          </Reveal>
          <div className="projects__controls">
            <button
              type="button"
              className="projects__btn projects__btn--prev"
              aria-label="Scroll to previous projects"
              onClick={() => scrollByCards(-1)}
            >
              <ArrowRightIcon />
            </button>
            <button
              type="button"
              className="projects__btn"
              aria-label="Scroll to next projects"
              onClick={() => scrollByCards(1)}
            >
              <ArrowRightIcon />
            </button>
          </div>
        </div>

        <div className="projects__scroller" ref={scrollerRef}>
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
