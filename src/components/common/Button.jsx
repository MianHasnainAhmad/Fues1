import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-5 py-3 gap-2.5',
    icon: 'p-2.5 rounded-xl',
  };

  const variants = {
    primary: 'bg-[#FF7043] text-white hover:bg-[#F4511E] shadow-sm hover:shadow active:bg-[#E64A19] border border-transparent',
    secondary: 'bg-[#F2F1EC] text-[#171717] hover:bg-[#E8E7E0] dark:bg-[#242422] dark:text-[#F5F5F0] dark:hover:bg-[#2E2E2B] border border-[#E8E7E0] dark:border-[#2E2E2B]',
    outline: 'bg-white text-[#171717] border border-[#E8E7E0] hover:border-[#171717] hover:bg-[#F8F8F5] dark:bg-[#1A1A19] dark:text-[#F5F5F0] dark:border-[#2E2E2B] dark:hover:border-[#555550] dark:hover:bg-[#262624]',
    ghost: 'text-[#525252] hover:text-[#171717] hover:bg-[#F2F1EC] dark:text-[#A8A8A2] dark:hover:text-white dark:hover:bg-[#262624]',
    subtle: 'bg-[#FFF0EB] text-[#FF7043] hover:bg-[#FFE2D6] dark:bg-[#FF7043]/15 dark:hover:bg-[#FF7043]/25 border border-transparent',
    lavender: 'bg-[#E9E4FF] text-[#6C5CE7] hover:bg-[#DDD6FE] dark:bg-[#6C5CE7]/15 dark:hover:bg-[#6C5CE7]/25',
    danger: 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 dark:bg-rose-950/40 dark:text-rose-300 dark:hover:bg-rose-950/70 dark:border-rose-900/60',
    'danger-solid': 'bg-rose-600 text-white hover:bg-rose-700 shadow-xs active:bg-rose-800 border border-transparent dark:bg-rose-600 dark:text-white dark:hover:bg-rose-700',
    dark: 'bg-[#171717] text-white hover:bg-[#262626] dark:bg-white dark:text-[#171717] dark:hover:bg-stone-200 shadow-sm',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
        </>
      )}
    </button>
  );
};
