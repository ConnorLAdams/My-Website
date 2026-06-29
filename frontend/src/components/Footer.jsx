import React from 'react';
import { LinkedInIcon, GitHubIcon, InstagramIcon } from './icons';

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
    <footer className="bg-green-dark text-on-dark" id="footer">
      <div className="container flex flex-wrap items-center justify-between gap-6 py-8 max-[640px]:flex-col max-[640px]:gap-4 max-[640px]:text-center">
        <a
          href="#top"
          className="inline-flex items-center gap-2.5"
          aria-label="C. Adams — back to top"
        >
          <img
            className="h-9 w-9 object-contain"
            src="/assets/logo.svg"
            alt=""
            width="36"
            height="36"
          />
          <span className="text-[1.25rem] font-extrabold tracking-[-0.02em] text-white">
            C. Adams
          </span>
        </a>

        <p className="text-sm text-white/70">Updated June 27th, 2026</p>

        <ul className="flex gap-3">
          {SOCIAL.map(({ id, label, href, Icon }) => (
            <li key={id}>
              <a
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition duration-[140ms] ease-brand hover:-translate-y-0.5 hover:bg-accent [&>svg]:size-[18px]"
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
