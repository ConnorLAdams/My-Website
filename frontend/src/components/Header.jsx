import React, { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import PaletteToggle from './PaletteToggle';
import { useTheme } from '../context/ThemeContext';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Research', href: '#research' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { palette } = useTheme();
  const isPro = palette === 'pro';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const goTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeMenu();
  };

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container site-header__inner">
        <a href="#top" className="logo" onClick={goTop} aria-label="C. Adams — home">
          <img
            className="logo__img"
            src={isPro ? '/assets/irish-harp.svg' : '/assets/logo.svg'}
            alt=""
            width="40"
            height="40"
          />
          <span className="logo__text">C. Adams</span>
        </a>

        <nav
          id="primary-nav"
          className={`site-nav${menuOpen ? ' is-open' : ''}`}
          aria-label="Primary"
        >
          <ul className="site-nav__list">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  className="site-nav__link"
                  href={item.href}
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__right">
          <PaletteToggle />
          <ThemeToggle />

          <button
            type="button"
            className={`nav-toggle${menuOpen ? ' is-open' : ''}`}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
