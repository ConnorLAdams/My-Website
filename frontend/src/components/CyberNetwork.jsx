import React, { useEffect, useRef } from 'react';

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

// Animated node/edge "constellation" tinted from the active theme tokens.
// Cabernet nodes + links over the forest-green hero canvas.
export default function CyberNetwork() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const root = document.documentElement;
    const reduced = prefersReducedMotion();

    let width = 0;
    let height = 0;
    let nodes = [];
    let raf = 0;
    let visible = true;

    const colors = { node: '#c24a62', line: '#8ea391' };
    const readColors = () => {
      const cs = getComputedStyle(root);
      colors.node = cs.getPropertyValue('--c-accent').trim() || colors.node;
      colors.line = cs.getPropertyValue('--c-text-muted').trim() || colors.line;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.max(24, Math.round((width * height) / 18000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
    };

    const MAX_DIST = 130;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < MAX_DIST) {
            ctx.globalAlpha = (1 - dist / MAX_DIST) * 0.45;
            ctx.strokeStyle = colors.line;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = colors.node;
      for (let i = 0; i < nodes.length; i += 1) {
        ctx.beginPath();
        ctx.arc(nodes[i].x, nodes[i].y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const step = () => {
      for (let i = 0; i < nodes.length; i += 1) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x <= 0 || n.x >= width) n.vx *= -1;
        if (n.y <= 0 || n.y >= height) n.vy *= -1;
      }
      draw();
      raf = requestAnimationFrame(step);
    };

    readColors();
    resize();
    if (reduced) {
      draw();
    } else {
      raf = requestAnimationFrame(step);
    }

    const onResize = () => {
      resize();
      if (reduced) draw();
    };
    window.addEventListener('resize', onResize);

    const mo = new MutationObserver(() => {
      readColors();
      if (reduced) draw();
    });
    mo.observe(root, {
      attributes: true,
      attributeFilter: ['data-theme', 'data-palette'],
    });

    let io;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting === visible) return;
          visible = entry.isIntersecting;
          if (reduced) return;
          if (visible) {
            raf = requestAnimationFrame(step);
          } else {
            cancelAnimationFrame(raf);
          }
        },
        { threshold: 0 },
      );
      io.observe(canvas);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      mo.disconnect();
      if (io) io.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
