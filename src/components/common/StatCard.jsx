import React from 'react';

export const StatCard = ({
  title,
  value,
  change,
  icon: Icon,
  trend = 'up',
  subtext,
  color = 'orange', // 'orange' | 'lavender' | 'green' | 'blue'
}) => {
  const colorMap = {
    orange: 'bg-[#FFF0EB] text-[#FF7043] border-[#FFD8CC] dark:bg-[#FF7043]/15 dark:border-[#FF7043]/30',
    lavender: 'bg-[#F3EFFF] text-[#6C5CE7] border-[#E4DCFF] dark:bg-[#6C5CE7]/15 dark:border-[#6C5CE7]/30',
    green: 'bg-[#ECFDF5] text-[#059669] border-[#A7F3D0] dark:bg-[#10B981]/15 dark:border-[#10B981]/30',
    blue: 'bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE] dark:bg-[#2563EB]/15 dark:border-[#2563EB]/30',
  };

  return (
    <div className="bg-white dark:bg-[#1A1A19] rounded-2xl border border-[#E8E7E0] dark:border-[#2C2C28] p-5 shadow-sm hover-lift transition-colors">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#737373] dark:text-[#8C8C87]">{title}</span>
        {Icon && (
          <div className={`p-2 rounded-xl border ${colorMap[color]}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-extrabold text-[#171717] dark:text-[#F5F5F0] tracking-tight">{value}</span>
        {change && (
          <span
            className={`text-xs font-semibold ${
              trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-stone-500 dark:text-stone-400'
            }`}
          >
            {trend === 'up' ? '+' : ''}{change}
          </span>
        )}
      </div>

      {subtext && <p className="text-xs text-[#737373] dark:text-[#8C8C87] mt-1.5">{subtext}</p>}
    </div>
  );
};
