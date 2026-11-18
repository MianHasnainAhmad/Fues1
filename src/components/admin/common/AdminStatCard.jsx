import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const AdminStatCard = ({
  title,
  value,
  change = null,
  changeType = 'positive', // 'positive' | 'negative' | 'neutral'
  caption = 'vs last 30 days',
  icon: Icon = null,
  accentColor = null,
}) => {
  return (
    <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-2xl p-5 shadow-xs flex flex-col justify-between transition-all hover:border-[#171717]/30 dark:hover:border-stone-600">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold text-[#71717A] dark:text-[#A8A8A2] tracking-wide uppercase">
          {title}
        </span>
        {Icon && (
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-[#F2F1EC] dark:bg-[#262624] text-[#171717] dark:text-[#F5F5F0]"
            style={accentColor ? { color: accentColor } : undefined}
          >
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-2">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171717] dark:text-[#F5F5F0] tracking-tight">
          {value}
        </h3>

        {change !== null && (
          <div
            className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
              changeType === 'positive'
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                : changeType === 'negative'
                ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400'
                : 'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300'
            }`}
          >
            {changeType === 'positive' && <TrendingUp className="w-3 h-3" />}
            {changeType === 'negative' && <TrendingDown className="w-3 h-3" />}
            {changeType === 'neutral' && <Minus className="w-3 h-3" />}
            <span>{change}</span>
          </div>
        )}
      </div>

      {caption && (
        <span className="text-[11px] text-[#A3A3A3] dark:text-[#6E6E69] mt-2 block">
          {caption}
        </span>
      )}
    </div>
  );
};

export default AdminStatCard;
