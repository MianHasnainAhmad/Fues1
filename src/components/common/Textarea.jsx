import React, { forwardRef } from 'react';

export const Textarea = forwardRef(
  ({ label, error, helperText, rows = 4, className = '', id, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="block text-xs font-semibold text-[#404040] mb-1.5 uppercase tracking-wider">
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          className={`w-full bg-white border rounded-xl py-2.5 px-3.5 text-sm text-[#171717] placeholder:text-[#A3A3A3] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF7043]/20 focus:border-[#FF7043] resize-y ${
            error ? 'border-red-400 focus:border-red-500' : 'border-[#E8E7E0]'
          } ${className}`}
          {...props}
        />
        {error && <p className="mt-1.5 text-xs text-red-600 font-medium">{error}</p>}
        {!error && helperText && <p className="mt-1.5 text-xs text-[#737373]">{helperText}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
