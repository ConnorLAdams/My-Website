import React, { useRef } from 'react';
import { projects } from '../data/content';
import ProjectCard from './ProjectCard';
import Reveal from './Reveal';
import { ArrowRightIcon } from './icons';

export default function Projects() {
  const scrollerRef = useRef(null);

  const scrollByCards = (direction) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * 344, behavior: 'smooth' });
  };

  return (
    <section className="section bg-surface" id="projects">
      <div className="container">
        <div className="relative">
          <Reveal as="h2" className="mb-8 text-center">
            Projects
          </Reveal>
          <div className="absolute right-0 top-[2px] flex gap-2 max-[720px]:hidden">
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full border-[1.5px] border-line bg-elevated p-0 text-accent transition duration-[140ms] ease-brand hover:border-accent hover:bg-accent-soft active:scale-[0.92] [&>svg]:size-[18px] [&>svg]:rotate-180"
              aria-label="Scroll to previous projects"
              onClick={() => scrollByCards(-1)}
            >
              <ArrowRightIcon />
            </button>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full border-[1.5px] border-line bg-elevated p-0 text-accent transition duration-[140ms] ease-brand hover:border-accent hover:bg-accent-soft active:scale-[0.92] [&>svg]:size-[18px]"
              aria-label="Scroll to next projects"
              onClick={() => scrollByCards(1)}
            >
              <ArrowRightIcon />
            </button>
          </div>
        </div>

        <div
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-pl-[4px] px-[4px] pt-3 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-webkit-mask-image:linear-gradient(90deg,transparent_0,#000_4%,#000_96%,transparent_100%)] [mask-image:linear-gradient(90deg,transparent_0,#000_4%,#000_96%,transparent_100%)] max-[720px]:[-webkit-mask-image:none] max-[720px]:[mask-image:none]"
          ref={scrollerRef}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
