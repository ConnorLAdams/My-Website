import React from 'react';
import Reveal from './Reveal';
import { DownloadIcon, EyeIcon } from './icons';

const RESUME_URL = '/api/media/Resume.pdf';
const CV_URL = '/api/media/Curriculum-Vitae.pdf';

export default function CTA() {
  return (
    <section className="section bg-page" id="resume">
      <div className="container">
        <Reveal className="relative grid grid-cols-1 items-center gap-8 overflow-hidden rounded-lg bg-[linear-gradient(100deg,#34402c_0%,#54653a_45%,#c98a3a_100%)] p-[clamp(2rem,5vw,4rem)] text-white shadow-[var(--shadow-lg)] min-[820px]:grid-cols-[1.25fr_0.75fr]">
          <div className="flex max-w-[48ch] flex-col items-start gap-4">
            <p className="m-0 text-xs font-bold uppercase tracking-[0.14em] text-white/80">
              Résumé / CV
            </p>
            <h2 className="text-white">Let&rsquo;s work together</h2>
            <p className="leading-[1.6] text-white/[0.88]">
              Grab the one-page résumé, or the full CV
              for the academic detail.
            </p>
            <div className="mt-1 flex flex-wrap gap-3">
              <a
                className="inline-flex items-center gap-2 rounded-sm border-2 border-transparent bg-white px-[1.4rem] py-[0.8rem] text-sm font-bold tracking-[-0.01em] text-[#7a3b16] shadow-[var(--shadow-md)] transition duration-[140ms] ease-brand hover:-translate-y-0.5 hover:bg-[#fff8ef] hover:shadow-[var(--shadow-lg)] active:translate-y-0 [&>svg]:size-[1.05em]"
                href={RESUME_URL}
                download
              >
                <DownloadIcon />
                Download Résumé
              </a>
              <a
                className="inline-flex items-center gap-2 rounded-sm border-2 border-white/70 px-[1.4rem] py-[0.8rem] text-sm font-bold tracking-[-0.01em] text-white transition duration-[140ms] ease-brand hover:-translate-y-0.5 hover:border-white hover:bg-white/[0.14] active:translate-y-0 [&>svg]:size-[1.05em]"
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <EyeIcon />
                Preview
              </a>
            </div>
            <p className="text-sm text-white/[0.78]">
              Prefer the full CV?{' '}
              <a
                className="font-semibold text-white underline underline-offset-[3px] transition-opacity duration-[140ms] hover:opacity-80"
                href={CV_URL}
                download
              >
                Download
              </a>{' '}
              &middot;{' '}
              <a
                className="font-semibold text-white underline underline-offset-[3px] transition-opacity duration-[140ms] hover:opacity-80"
                href={CV_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Preview
              </a>
            </p>
          </div>

          <div className="cta__graphic max-[820px]:hidden" aria-hidden="true">
            <div className="cta__doc cta__doc--back" />
            <div className="cta__doc cta__doc--front">
              <span className="cta__doc-avatar" />
              <span className="cta__doc-bar cta__doc-bar--title" />
              <span className="cta__doc-bar cta__doc-bar--sub" />
              <span className="cta__doc-line" />
              <span className="cta__doc-line" />
              <span className="cta__doc-line cta__doc-line--short" />
              <span className="cta__doc-line" />
              <span className="cta__doc-line cta__doc-line--short" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
