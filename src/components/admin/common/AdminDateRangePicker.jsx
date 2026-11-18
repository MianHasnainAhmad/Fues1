import React from 'react';
import { Calendar } from 'lucide-react';

const RANGES = [
  { id: 'today', label: 'Today' },
  { id: '7d', label: '7 Days' },
  { id: '30d', label: '30 Days' },
  { id: '90d', label: '90 Days' },
  { id: 'custom', label: 'Custom' },
];

export const AdminDateRangePicker = ({ activeRange = '30d', onRangeChange }) => {
  return (
    <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] shadow-xs max-w-full overflow-x-auto">
      <div className="px-2 text-stone-400">
        <Calendar className="w-3.5 h-3.5" />
      </div>
      {RANGES.map((range) => {
        const isSelected = activeRange === range.id;
        return (
          <button
            key={range.id}
            onClick={() => onRangeChange(range.id)}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              isSelected
                ? 'bg-[#171717] text-white dark:bg-white dark:text-[#171717] shadow-xs'
                : 'text-[#71717A] dark:text-[#A8A8A2] hover:text-[#171717] dark:hover:text-white hover:bg-[#F2F1EC] dark:hover:bg-[#262624]'
            }`}
          >
            {range.label}
          </button>
        );
      })}
    </div>
  );
};

export default AdminDateRangePicker;
