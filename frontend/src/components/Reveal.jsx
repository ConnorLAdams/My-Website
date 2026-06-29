import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

/**
 * Wraps children in an element that fades/slides in on scroll.
 * `delay` (1-3) staggers grouped items. `as` sets the element tag.
 */
export default function Reveal({
  as: Tag = 'div',
  className = '',
  delay,
  children,
  ...rest
}) {
  const ref = useScrollReveal();
  const classes = [
    'reveal',
    delay ? `reveal--delay-${delay}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag ref={ref} className={classes} {...rest}>
      {children}
    </Tag>
  );
}
