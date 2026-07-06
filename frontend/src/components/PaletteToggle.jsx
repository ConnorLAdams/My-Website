import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ICON_BASE = 'absolute inset-0 transition duration-[240ms] ease-brand';

// Switches the brand palette (Goofy "Red Panda" <-> Professional). Independent of
// the light/dark ThemeToggle. The icon crossfade is driven by `palette` state
// directly (there is no Tailwind variant for palette like there is for `dark:`).
export default function PaletteToggle({ className = '' }) {
  const { palette, togglePalette } = useTheme();
  const isPro = palette === 'pro';
  const label = `Switch to ${isPro ? 'Goofy' : 'Professional'} theme`;

  return (
    <button
      type="button"
      className={`relative inline-grid h-10 w-10 place-items-center rounded-pill border-[1.5px] border-line bg-transparent p-0 text-accent transition duration-[140ms] ease-brand hover:border-accent hover:bg-accent-soft active:scale-[0.92]${
        className ? ` ${className}` : ''
      }`}
      onClick={togglePalette}
      aria-label={label}
      aria-pressed={isPro}
      title={label}
    >
      <span className="relative h-5 w-5" aria-hidden="true">
        {/* Goofy: a playful sparkle (shown when the Professional palette is off) */}
        <svg
          className={`${ICON_BASE} ${
            isPro
              ? '-rotate-90 scale-[0.4] opacity-0'
              : 'rotate-0 scale-100 opacity-100'
          }`}
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 4l1.8 4.9L19 11l-5.2 1.8L12 18l-1.8-4.9L5 11l5.2-1.8z" />
        </svg>
        {/* Professional: a briefcase (shown when the Professional palette is on) */}
        <svg
          className={`${ICON_BASE} ${
            isPro
              ? 'rotate-0 scale-100 opacity-100'
              : 'rotate-90 scale-[0.4] opacity-0'
          }`}
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" />
          <path d="M3 12h18" />
        </svg>
      </span>
    </button>
  );
}
