import React from 'react';

export const Avatar = ({
  src,
  alt = '',
  name = 'User',
  size = 'md',
  status, // 'online' | 'offline'
  className = '',
}) => {
  const sizeMap = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl font-bold',
    '2xl': 'w-24 h-24 text-2xl font-bold',
  };

  const statusSize = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-3.5 h-3.5',
    '2xl': 'w-4 h-4',
  };

  const initials = name
    ? name
        .split(' ')
        .map((p) => p[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'U';

  return (
    <div className={`relative inline-block shrink-0 ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt || name}
          className={`${sizeMap[size]} rounded-full object-cover border border-[#E8E7E0] bg-white`}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : (
        <div
          className={`${sizeMap[size]} rounded-full bg-[#FFF0EB] text-[#FF7043] flex items-center justify-center font-semibold border border-[#FFD8CC]`}
        >
          {initials}
        </div>
      )}
      {status && (
        <span
          className={`absolute bottom-0 right-0 ${statusSize[size]} rounded-full border-2 border-white ${
            status === 'online' ? 'bg-emerald-500' : 'bg-stone-300'
          }`}
        />
      )}
    </div>
  );
};
