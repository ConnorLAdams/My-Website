import React from 'react';
import Reveal from './Reveal';
import HeroBackground from './HeroBackground';
import useTypewriter from '../hooks/useTypewriter';
import { roles } from '../data/content';
import { GitHubIcon, LinkedInIcon, DownloadIcon, ChevronDownIcon } from './icons';
import Tooltip from './Tooltip';

const GITHUB_URL = 'https://github.com/connorladams';
const LINKEDIN_URL = 'https://www.linkedin.com/in/connorladams';
const RESUME_URL = '/api/media/Resume.pdf';

const ICON_LINK =
  'grid h-11 w-11 place-items-center rounded-full border-[1.5px] border-line text-body transition duration-[140ms] ease-brand hover:-translate-y-0.5 hover:border-accent hover:bg-accent-soft hover:text-accent [&>svg]:size-[20px]';

export default function Hero() {
  const { text, done } = useTypewriter(roles);
  const [atTop, setAtTop] = React.useState(true);

  React.useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      className="relative flex min-h-[78vh] items-center justify-center overflow-hidden bg-page py-[clamp(3rem,10vh,7rem)]"
      id="top"
    >
      <HeroBackground />
      <div className="container relative z-10 flex flex-col items-center gap-6 text-center">
        <Reveal
          as="h1"
          className="max-w-[18ch] text-[length:var(--text-display)] font-extrabold leading-[1.02] tracking-[-0.03em]"
        >
          Hi, I&rsquo;m Connor
        </Reveal>
        <Reveal
          as="p"
          className="flex min-h-[1.6em] items-center justify-center text-h2 font-semibold text-subtitle"
          delay={1}
        >
          <span aria-live="polite">{text}</span>
          <span
            aria-hidden="true"
            className={`ml-1 inline-block h-[1em] w-[3px] translate-y-[0.12em] bg-accent ${
              done ? 'opacity-0' : 'motion-safe:animate-pulse'
            }`}
          />
        </Reveal>
        <Reveal className="mt-3 flex items-center justify-center gap-3" delay={2}>
          <Tooltip label="GitHub">
            <a
              className={ICON_LINK}
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <GitHubIcon />
            </a>
          </Tooltip>
          <Tooltip label="LinkedIn">
            <a
              className={ICON_LINK}
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </a>
          </Tooltip>
          <Tooltip label="Download Résumé">
            <a
              className={ICON_LINK}
              href={RESUME_URL}
              download
              aria-label="Download Résumé"
            >
              <DownloadIcon />
            </a>
          </Tooltip>
        </Reveal>
      </div>
      <div
        aria-hidden="true"
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-500 ${
          atTop ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ChevronDownIcon className="scroll-hint size-6 text-muted" />
      </div>
    </section>
  );
}
