import React, { useEffect, useState } from 'react';
import Button from './Button';
import ThemeToggle from './ThemeToggle';
import PaletteToggle from './PaletteToggle';

const NAV_ITEMS = [
  { label: 'Education', href: '#education' },
  { label: 'Research', href: '#research' },
  { label: 'Projects', href: '#projects' },
  { label: 'Résumé', href: '#resume' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
            src="/assets/logo.svg"
            alt=""
            width="40"
            height="40"
          />
          <span className="logo__text">C. Adams</span>
        </a>

        <div className="site-header__right">
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
            <Button
              as="a"
              href="#contact"
              variant="outline"
              className="site-nav__cta"
              onClick={closeMenu}
            >
              Contact
            </Button>
          </nav>

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
