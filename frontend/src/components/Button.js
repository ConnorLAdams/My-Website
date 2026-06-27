import React from 'react';
import './Button.css';

/**
 * Button / link styled per the Red Panda design system.
 * - variant: "outline" (default) | "solid" | "dark"
 * - as: element or component to render (e.g. "a")
 */
export default function Button({
  as: Tag = 'button',
  variant = 'outline',
  className = '',
  children,
  ...rest
}) {
  const classes = ['btn', `btn--${variant}`, className].filter(Boolean).join(' ');
  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}
