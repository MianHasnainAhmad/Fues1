import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const ACCENT_COLORS = [
  { id: 'orange', name: 'Sunset Orange', color: '#FF7043', darkColor: '#FF7043' },
  { id: 'violet', name: 'Electric Violet', color: '#7C3AED', darkColor: '#9061F9' },
  { id: 'emerald', name: 'Emerald Forest', color: '#059669', darkColor: '#10B981' },
];

export const AccentSelector = ({ className = '', size = 'md' }) => {
  const { accent, setAccent, isDark } = useTheme();

  return (
    <div
      className={`inline-flex items-center gap-1.5 p-1 rounded-full bg-[#F2F1EC] dark:bg-[#1E1E1C] border border-[#E8E7E0] dark:border-[#2B2B27] ${className}`}
      role="radiogroup"
      aria-label="Select brand accent color"
    >
      {ACCENT_COLORS.map((item) => {
        const isSelected = accent === item.id;
        const displayColor = isDark ? item.darkColor : item.color;

        return (
          <button
            key={item.id}
            onClick={() => setAccent(item.id)}
            className={`relative rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center focus:outline-none ${
              size === 'sm' ? 'w-5 h-5' : 'w-6 h-6'
            } ${
              isSelected
                ? 'scale-110 ring-2 ring-offset-2 ring-offset-[#F8F8F5] dark:ring-offset-[#111110] shadow-xs'
                : 'opacity-70 hover:opacity-100 hover:scale-105'
            }`}
            style={{
              backgroundColor: displayColor,
              // When selected, use the color itself for the focus ring
              boxShadow: isSelected ? `0 0 0 2px ${displayColor}` : undefined,
            }}
            title={`${item.name} palette`}
            aria-checked={isSelected}
            role="radio"
          >
            {isSelected && (
              <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default AccentSelector;
