import React, { createContext, useContext, useState, useEffect } from 'react';

export const ACCENTS = {
  orange: {
    id: 'orange',
    name: 'Sunset Orange',
    hex: '#FF7043',
    hexDark: '#FF7043',
    badge: 'Classic Spark',
    description: 'Warm, creative, community-focused spark',
  },
  violet: {
    id: 'violet',
    name: 'Electric Violet',
    hex: '#7C3AED',
    hexDark: '#9061F9',
    badge: 'Modern Linear',
    description: 'Sleek, futuristic, focused developer aesthetic',
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Forest',
    hex: '#059669',
    hexDark: '#10B981',
    badge: 'Organic Synergy',
    description: 'Fresh, harmonious, sustainable growth & teamwork',
  },
};

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('fuse_theme');
    if (saved) return saved;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  const [accent, setAccentState] = useState(() => {
    return localStorage.getItem('fuse_accent') || 'orange';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('fuse_theme', theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-accent', accent);
    localStorage.setItem('fuse_accent', accent);
  }, [accent]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setAccent = (newAccent) => {
    if (ACCENTS[newAccent]) {
      setAccentState(newAccent);
    }
  };

  const activeAccentConfig = ACCENTS[accent] || ACCENTS.orange;
  const accentColor = theme === 'dark' ? activeAccentConfig.hexDark : activeAccentConfig.hex;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        isDark: theme === 'dark',
        accent,
        setAccent,
        accents: Object.values(ACCENTS),
        activeAccentConfig,
        accentColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
