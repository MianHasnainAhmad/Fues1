import React from 'react';
import { Search, X } from 'lucide-react';

export const SearchBar = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search ideas, keywords, or skills...',
  className = '',
}) => {
  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <Search className="absolute left-3.5 w-4 h-4 text-[#737373] pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white border border-[#E8E7E0] rounded-xl pl-10 pr-9 py-2.5 text-sm text-[#171717] placeholder:text-[#A3A3A3] focus:outline-none focus:ring-2 focus:ring-[#FF7043]/20 focus:border-[#FF7043] transition-colors"
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute right-3 p-1 rounded-md text-[#737373] hover:text-[#171717] hover:bg-[#F2F1EC] dark:hover:text-white dark:hover:bg-[#262624] transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
