import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ICON_BASE = 'absolute inset-0 transition duration-[240ms] ease-brand';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const label = `Switch to ${isDark ? 'light' : 'dark'} mode`;

  return (
    <button
      type="button"
      className={`relative inline-grid h-10 w-10 place-items-center rounded-pill border-[1.5px] border-line bg-transparent p-0 text-accent transition duration-[140ms] ease-brand hover:border-accent hover:bg-accent-soft active:scale-[0.92]${
        className ? ` ${className}` : ''
      }`}
      onClick={toggleTheme}
      aria-label={label}
      aria-pressed={isDark}
      title={label}
    >
      <span className="relative h-5 w-5" aria-hidden="true">
        <svg
          className={`${ICON_BASE} rotate-0 scale-100 opacity-100 dark:rotate-90 dark:scale-[0.4] dark:opacity-0`}
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
        <svg
          className={`${ICON_BASE} -rotate-90 scale-[0.4] opacity-0 dark:rotate-0 dark:scale-100 dark:opacity-100`}
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      </span>
    </button>
  );
}
