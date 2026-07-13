import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

const STORAGE_KEY = 'ca-theme';
const PALETTE_KEY = 'ca-palette';

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
  palette: 'pro',
  togglePalette: () => {},
});

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  } catch (e) {
    return 'light';
  }
}

function getInitialPalette() {
  if (typeof window === 'undefined') return 'pro';
  try {
    const stored = window.localStorage.getItem(PALETTE_KEY);
    if (stored === 'panda' || stored === 'pro') return stored;
    return 'pro'; // first-time visitors default to the Professional look
  } catch (e) {
    return 'pro';
  }
}

// Browser-chrome color per palette + mode (keeps the mobile address bar on-theme).
const THEME_COLORS = {
  'panda-light': '#ffffff',
  'panda-dark': '#16180f',
  'pro-light': '#f3f5f0',
  'pro-dark': '#0e1611',
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);
  const [palette, setPalette] = useState(getInitialPalette);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* ignore write errors (e.g. private mode) */
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-palette', palette);
    try {
      window.localStorage.setItem(PALETTE_KEY, palette);
    } catch (e) {
      /* ignore write errors (e.g. private mode) */
    }
  }, [palette]);

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute(
        'content',
        THEME_COLORS[`${palette}-${theme}`] || THEME_COLORS['panda-light'],
      );
    }
  }, [palette, theme]);

  useEffect(() => {
    const svgIcon = document.querySelector('link[type="image/svg+xml"]');
    const pngIcon = document.querySelector('link[rel="icon"]:not([type])');
    if (palette === 'pro') {
      if (svgIcon) svgIcon.href = '/assets/harp-favicon.svg';
      if (pngIcon) pngIcon.href = '/harp-tab.png';
    } else {
      if (svgIcon) svgIcon.href = '/Red_Panda_Tab.png';
      if (pngIcon) pngIcon.href = '/Red_Panda_Tab.png';
    }
  }, [palette]);

  const toggleTheme = useCallback(
    () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')),
    [],
  );

  const togglePalette = useCallback(
    () => setPalette((prev) => (prev === 'pro' ? 'panda' : 'pro')),
    [],
  );

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, palette, togglePalette }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export default ThemeContext;
