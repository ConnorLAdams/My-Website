import React from 'react';
import { LinkedInIcon, GitHubIcon, InstagramIcon } from './icons';
import './Footer.css';

const SOCIAL = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/connorladams',
    Icon: LinkedInIcon,
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/connorladams',
    Icon: GitHubIcon,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/cleeadams',
    Icon: InstagramIcon,
  },
];

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container footer__inner">
        <a href="#top" className="footer__brand" aria-label="C. Adams — back to top">
          <img
            className="footer__logo"
            src={`${process.env.PUBLIC_URL}/assets/logo.svg`}
            alt=""
            width="36"
            height="36"
          />
          <span className="footer__name">C. Adams</span>
        </a>

        <p className="footer__meta">Updated June 27th, 2026</p>

        <ul className="footer__social">
          {SOCIAL.map(({ id, label, href, Icon }) => (
            <li key={id}>
              <a
                className="footer__social-link"
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
