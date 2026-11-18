import React, { forwardRef } from 'react';

export const Select = forwardRef(
  ({ label, error, helperText, options = [], className = '', id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="block text-xs font-semibold text-[#404040] mb-1.5 uppercase tracking-wider">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={`w-full bg-white border rounded-xl py-2.5 px-3.5 pr-8 text-sm text-[#171717] transition-colors appearance-none focus:outline-none focus:ring-2 focus:ring-[#FF7043]/20 focus:border-[#FF7043] cursor-pointer ${
              error ? 'border-red-400 focus:border-red-500' : 'border-[#E8E7E0]'
            } ${className}`}
            {...props}
          >
            {options.map((opt) => {
              const value = typeof opt === 'object' ? opt.value : opt;
              const text = typeof opt === 'object' ? opt.label : opt;
              return (
                <option key={value} value={value}>
                  {text}
                </option>
              );
            })}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#737373]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {error && <p className="mt-1.5 text-xs text-red-600 font-medium">{error}</p>}
        {!error && helperText && <p className="mt-1.5 text-xs text-[#737373]">{helperText}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
