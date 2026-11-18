import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle = ({ className = '', size = 'md' }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
        isDark
          ? 'bg-[#1C1C1B] border-[#2E2E2B] text-amber-400 hover:text-amber-300 hover:bg-[#252523]'
          : 'bg-[#F8F8F5] border-[#E8E7E0] text-[#525252] hover:text-[#171717] hover:bg-[#F2F1EC]'
      } ${className}`}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-4 h-4 transition-transform duration-300 rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 transition-transform duration-300 -rotate-12 hover:rotate-0" />
      )}
    </button>
  );
};
