import React, { useState, useRef, useEffect } from 'react';

export const Dropdown = ({
  trigger,
  children,
  align = 'right',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const alignStyles = {
    right: 'right-0',
    left: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
  };

  return (
    <div className={`relative inline-block ${className}`} ref={containerRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={`absolute ${alignStyles[align]} mt-2 min-w-[200px] max-w-[calc(100vw-2rem)] bg-white dark:bg-[#1A1A19] rounded-xl border border-[#E8E7E0] dark:border-[#2B2B27] shadow-xl py-1.5 z-40 animate-in fade-in zoom-in-95 duration-150`}
          onClick={() => setIsOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export const DropdownItem = ({
  label,
  children,
  onClick,
  icon: Icon,
  danger = false,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3.5 py-2 text-sm flex items-center gap-2.5 transition-colors cursor-pointer rounded-lg ${
        danger
          ? 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10'
          : 'text-[#404040] hover:text-[#171717] hover:bg-[#F8F8F5] dark:text-[#D4D4D0] dark:hover:text-white dark:hover:bg-[#262624]'
      } ${className}`}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      <span className="truncate">{label || children}</span>
    </button>
  );
};
