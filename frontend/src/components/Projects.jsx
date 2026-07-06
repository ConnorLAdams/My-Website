import React, { useMemo, useState } from 'react';
import { projects } from '../data/content';
import ProjectCard from './ProjectCard';
import Reveal from './Reveal';

const INITIAL_VISIBLE = 3;

export default function Projects() {
  const categories = useMemo(
    () => [
      'All',
      ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean))),
    ],
    [],
  );
  const [active, setActive] = useState('All');
  const [expanded, setExpanded] = useState(false);

  const filtered = useMemo(
    () =>
      active === 'All'
        ? projects
        : projects.filter((p) => p.category === active),
    [active],
  );
  const visible = expanded ? filtered : filtered.slice(0, INITIAL_VISIBLE);
  const canExpand = filtered.length > INITIAL_VISIBLE;

  const selectCategory = (cat) => {
    setActive(cat);
    setExpanded(false);
  };

  return (
    <section className="section bg-page" id="projects">
      <div className="container">
        <Reveal className="mb-3 flex justify-center">
          <span className="eyebrow">Projects</span>
        </Reveal>
        <Reveal as="h2" className="mb-8 text-center" delay={1}>
          Things I&rsquo;ve built &amp; explored
        </Reveal>

        <Reveal className="mb-8 flex flex-wrap justify-center gap-2" delay={1}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-pill${active === cat ? ' is-active' : ''}`}
              aria-pressed={active === cat}
              onClick={() => selectCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </Reveal>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
          {visible.map((project) => (
            <Reveal key={project.id} className="flex">
              <ProjectCard {...project} />
            </Reveal>
          ))}
        </div>

        {canExpand && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              className="filter-pill"
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? 'Show less' : 'Show more'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
