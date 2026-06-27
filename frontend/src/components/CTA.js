import React from 'react';
import Reveal from './Reveal';
import { DownloadIcon, EyeIcon } from './icons';
import './CTA.css';

const RESUME_URL = `${process.env.PUBLIC_URL}/assets/Resume.pdf`;
const CV_URL = `${process.env.PUBLIC_URL}/assets/Curriculum-Vitae.pdf`;

export default function CTA() {
  return (
    <section className="section cta-section" id="resume">
      <div className="container">
        <Reveal className="cta">
          <div className="cta__content">
            <p className="cta__eyebrow">Résumé / CV</p>
            <h2 className="cta__title">Let&rsquo;s work together</h2>
            <p className="cta__text">
              Grab the one-page résumé, or the full CV
              for the academic detail.
            </p>
            <div className="cta__actions">
              <a className="cta__btn cta__btn--primary" href={RESUME_URL} download>
                <DownloadIcon />
                Download Résumé
              </a>
              <a
                className="cta__btn cta__btn--ghost"
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <EyeIcon />
                Preview
              </a>
            </div>
            <p className="cta__alt">
              Prefer the full CV?{' '}
              <a className="cta__link" href={CV_URL} download>
                Download
              </a>{' '}
              &middot;{' '}
              <a
                className="cta__link"
                href={CV_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Preview
              </a>
            </p>
          </div>

          <div className="cta__graphic" aria-hidden="true">
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
