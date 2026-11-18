import React from 'react';

export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  icon: Icon
}) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 rounded-md gap-1 font-medium',
    md: 'text-xs px-2.5 py-1 rounded-full gap-1.5 font-medium',
    lg: 'text-sm px-3 py-1.5 rounded-full gap-2 font-medium',
  };

  const variants = {
    default: 'bg-[#F2F1EC] text-[#525252] border border-[#E8E7E0]',
    primary: 'bg-[#FFF0EB] text-[#FF7043] border border-[#FFD8CC]',
    lavender: 'bg-[#F3EFFF] text-[#6C5CE7] border border-[#E4DCFF]',
    green: 'bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]',
    amber: 'bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]',
    blue: 'bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]',
    dark: 'bg-[#171717] text-white',
  };

  return (
    <span className={`inline-flex items-center shrink-0 leading-tight transition-colors ${sizeStyles[size]} ${variants[variant]} ${className}`}>
      {Icon && <Icon className="w-3 h-3 shrink-0" />}
      {children}
    </span>
  );
};
