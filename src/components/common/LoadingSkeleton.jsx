import React from 'react';

export const LoadingSkeleton = ({ count = 3, type = 'card' }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-[#1A1A19] rounded-2xl border border-[#E8E7E0] dark:border-[#2C2C28] p-6 animate-pulse space-y-4 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-stone-200 dark:bg-[#2A2A27]" />
            <div className="space-y-1.5 flex-1">
              <div className="h-3.5 bg-stone-200 dark:bg-[#2A2A27] rounded w-1/3" />
              <div className="h-2.5 bg-stone-100 dark:bg-[#22221F] rounded w-1/4" />
            </div>
          </div>
          <div className="h-4 bg-stone-200 dark:bg-[#2A2A27] rounded w-4/5" />
          <div className="space-y-2">
            <div className="h-3 bg-stone-100 dark:bg-[#22221F] rounded w-full" />
            <div className="h-3 bg-stone-100 dark:bg-[#22221F] rounded w-5/6" />
          </div>
          <div className="flex gap-2 pt-2">
            <div className="h-6 w-16 bg-stone-100 dark:bg-[#22221F] rounded-full" />
            <div className="h-6 w-20 bg-stone-100 dark:bg-[#22221F] rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};
