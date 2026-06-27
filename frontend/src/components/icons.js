import React from 'react';

/* Stroke icons share these defaults; brand/fill icons override as needed. */
const stroke = {
  viewBox: '0 0 24 24',
  width: '1em',
  height: '1em',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function AwardIcon(props) {
  return (
    <svg {...stroke} aria-hidden="true" {...props}>
      <circle cx="12" cy="8" r="5" />
      <path d="m9 12.5-1.5 8.5L12 18l4.5 3-1.5-8.5" />
    </svg>
  );
}

export function GradCapIcon(props) {
  return (
    <svg {...stroke} aria-hidden="true" {...props}>
      <path d="M22 10 12 5 2 10l10 5 10-5Z" />
      <path d="M6 12v5c0 1 2.5 3 6 3s6-2 6-3v-5" />
      <path d="M22 10v6" />
    </svg>
  );
}

export function RocketIcon(props) {
  return (
    <svg {...stroke} aria-hidden="true" {...props}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

/* Project icons: each derived from the project's topic. */
export function LogisticCurveIcon(props) {
  return (
    <svg {...stroke} aria-hidden="true" {...props}>
      <path d="M5 4v15h15" />
      <path d="M5 17C12 17 12 7 19 7" />
    </svg>
  );
}

export function OscillatorIcon(props) {
  return (
    <svg {...stroke} aria-hidden="true" {...props}>
      <path d="M3 12h1" />
      <path d="M4 12Q7 5 10 12T16 12 22 12" />
    </svg>
  );
}

export function MatrixIcon(props) {
  return (
    <svg {...stroke} aria-hidden="true" {...props}>
      <path d="M8 4H5v16h3" />
      <path d="M16 4h3v16h-3" />
      <g fill="currentColor" stroke="none">
        <circle cx="9.5" cy="8.5" r="1.1" />
        <circle cx="12" cy="8.5" r="1.1" />
        <circle cx="9.5" cy="12" r="1.1" />
        <circle cx="12" cy="12" r="1.1" />
        <circle cx="14.5" cy="12" r="1.1" />
        <circle cx="12" cy="15.5" r="1.1" />
        <circle cx="14.5" cy="15.5" r="1.1" />
      </g>
    </svg>
  );
}

export function OrbitIcon(props) {
  return (
    <svg {...stroke} aria-hidden="true" {...props}>
      <g transform="rotate(-25 12 12)">
        <ellipse cx="12" cy="12" rx="9" ry="4.5" />
        <circle cx="21" cy="12" r="1.5" fill="currentColor" stroke="none" />
      </g>
      <circle cx="12" cy="12" r="2.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ArrowRightIcon(props) {
  return (
    <svg {...stroke} aria-hidden="true" {...props}>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

export function DownloadIcon(props) {
  return (
    <svg {...stroke} aria-hidden="true" {...props}>
      <path d="M12 3v12" />
      <path d="m7 11 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

export function EyeIcon(props) {
  return (
    <svg {...stroke} aria-hidden="true" {...props}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function StarIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" />
    </svg>
  );
}

export function LinkedInIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM9 9h3.8v1.71h.05c.53-1 1.83-2.06 3.76-2.06C20.4 8.65 21 11 21 14.1V21h-4v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.38 1.6-2.38 3.27V21H9z" />
    </svg>
  );
}

export function GitHubIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.16.58.67.48A10 10 0 0 0 22 12 10 10 0 0 0 12 2Z" />
    </svg>
  );
}

export function InstagramIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}
