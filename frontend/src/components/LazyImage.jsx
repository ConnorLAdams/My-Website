import React, { useEffect, useRef, useState } from 'react';

/**
 * Drop-in image component that shows a warm skeleton shimmer while the image
 * downloads from the backend (/api/media/…), then fades the skeleton out once
 * the image is ready.
 *
 * The component renders a block-level wrapper <span> that owns the layout
 * (aspect ratio, shadow, rounded corners) so the inner <img> can fill it
 * with `w-full h-full object-cover`.  This keeps the skeleton neatly clipped
 * behind the rounded corners via `overflow-hidden` on the wrapper.
 *
 * Props
 * ─────
 * className    — applied to the outer wrapper span (aspect-ratio, sizing,
 *                shadow, rounded corners, z-index, …).  overflow-hidden is
 *                always present so the skeleton is clipped to the corners.
 * imgClassName — applied to the inner <img> (object-fit, hover transitions, …)
 * loading      — forwarded to <img>; defaults to "lazy"
 * alt          — forwarded to <img>
 * …rest        — src and any other <img> props are forwarded to <img>
 */
export default function LazyImage({
  className = '',
  imgClassName = '',
  loading = 'lazy',
  alt,
  ...props
}) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  // Handle images that are already in the browser cache: their `load` event
  // fires synchronously during attribute assignment, before React attaches the
  // onLoad handler.  Checking `complete` on mount covers that edge case.
  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, []);

  return (
    <span
      className={`block relative overflow-hidden${className ? ` ${className}` : ''}`}
    >
      {/* Skeleton shimmer — sits on top (z-[1]) while the image loads,
          then fades to transparent via the Tailwind transition-opacity class.
          pointer-events-none ensures it never blocks clicks after loading. */}
      <span
        aria-hidden="true"
        className={`img-skeleton absolute inset-0 z-[1] pointer-events-none transition-opacity duration-500${
          loaded ? ' opacity-0' : ' opacity-100'
        }`}
      />

      <img
        ref={imgRef}
        className={`block w-full h-full${imgClassName ? ` ${imgClassName}` : ''}`}
        alt={alt}
        loading={loading}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        {...props}
      />
    </span>
  );
}
