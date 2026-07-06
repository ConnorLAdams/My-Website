import React from 'react';

/**
 * Button / link styled per the Red Panda design system.
 * - variant: "outline" (default) | "solid" | "dark"
 * - as: element or component to render (e.g. "a")
 */
const BASE =
  'inline-flex items-center justify-center gap-2 py-[0.7rem] px-[1.3rem] border-2 border-transparent rounded-sm font-sans font-semibold text-sm leading-none tracking-[-0.01em] text-center whitespace-nowrap transition duration-[140ms] ease-brand hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none';

const VARIANTS = {
  outline:
    'border-accent text-accent bg-transparent hover:bg-accent hover:text-white hover:shadow-[var(--shadow-sm)]',
  solid: 'bg-accent-fill text-white hover:bg-accent hover:shadow-[var(--shadow-md)]',
  dark: 'bg-[color:var(--c-btn-dark-bg)] text-white hover:bg-black hover:shadow-[var(--shadow-md)]',
};

export default function Button({
  as: Tag = 'button',
  variant = 'outline',
  className = '',
  children,
  ...rest
}) {
  const classes = [BASE, VARIANTS[variant] || VARIANTS.outline, className]
    .filter(Boolean)
    .join(' ');
  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}
