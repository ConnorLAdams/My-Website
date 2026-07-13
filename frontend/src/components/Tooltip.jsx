import React from 'react';

/**
 * Wraps any element and shows a small label tooltip above it on hover.
 * Usage: <Tooltip label="GitHub"><a ...>...</a></Tooltip>
 */
export default function Tooltip({ label, children }) {
  return (
    <span className="group/tip relative inline-flex">
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded border border-line bg-elevated px-2.5 py-1 text-xs font-medium text-body opacity-0 shadow-[var(--shadow-md)] transition-opacity duration-150 group-hover/tip:opacity-100"
      >
        {label}
      </span>
    </span>
  );
}
