import React from 'react';
import { Button } from './Button';

export const EmptyState = ({
  icon: Icon,
  title = 'No results found',
  description = 'Try adjusting your search filters or check back later.',
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-12 bg-white rounded-2xl border border-dashed border-[#E8E7E0] ${className}`}>
      {Icon && (
        <div className="w-14 h-14 rounded-2xl bg-[#FFF0EB] text-[#FF7043] flex items-center justify-center mb-4 border border-[#FFD8CC]">
          <Icon className="w-7 h-7" />
        </div>
      )}
      <h3 className="text-lg font-bold text-[#171717]">{title}</h3>
      <p className="text-sm text-[#737373] max-w-sm mt-1 mb-5">{description}</p>
      {actionLabel && onAction && (
        <Button variant="primary" size="md" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

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
