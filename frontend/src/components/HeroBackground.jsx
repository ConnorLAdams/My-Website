import React from 'react';
import { useTheme } from '../context/ThemeContext';
import CyberNetwork from './CyberNetwork';
import OceanScene from './OceanScene';

// Sits behind the hero content. Professional => animated cyber network;
// Goofy => animated ocean with a surfing rooster. A scrim keeps text legible.
export default function HeroBackground() {
  const { palette } = useTheme();
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {palette === 'pro' ? <CyberNetwork /> : <OceanScene />}
      <div className="hero-scrim absolute inset-0" />
    </div>
  );
}
