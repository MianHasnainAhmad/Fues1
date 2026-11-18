import React, { forwardRef } from 'react';

export const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      icon: Icon,
      rightElement,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold text-[#404040] dark:text-[#D4D4D0] mb-1.5 uppercase tracking-wider">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {Icon && (
            <div className="absolute left-3.5 pointer-events-none text-[#737373] dark:text-[#A8A8A2]">
              <Icon className="w-4 h-4" />
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={`w-full bg-white dark:bg-[#1E1E1C] border rounded-xl py-2.5 text-sm text-[#171717] dark:text-[#F5F5F0] placeholder:text-[#A3A3A3] dark:placeholder:text-[#666660] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF7043]/20 focus:border-[#FF7043] ${
              Icon ? 'pl-10' : 'pl-3.5'
            } ${rightElement ? 'pr-10' : 'pr-3.5'} ${
              error ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-[#E8E7E0] dark:border-[#2E2E2B]'
            } ${className}`}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-3.5 flex items-center text-[#737373]">
              {rightElement}
            </div>
          )}
        </div>
        {error && <p className="mt-1.5 text-xs text-red-600 font-medium">{error}</p>}
        {!error && helperText && <p className="mt-1.5 text-xs text-[#737373]">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
