import React from 'react';

const STATUS_CONFIGS = {
  // Account & General Statuses
  active: { label: 'Active', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/40' },
  suspended: { label: 'Suspended', bg: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800/40' },
  restricted: { label: 'Restricted', bg: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/40' },
  
  // Idea & Moderation Statuses
  published: { label: 'Published', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/40' },
  approved: { label: 'Approved', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/40' },
  pending: { label: 'Pending Review', bg: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/40' },
  rejected: { label: 'Rejected', bg: 'bg-stone-100 text-stone-600 border-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:border-stone-700' },
  archived: { label: 'Archived', bg: 'bg-stone-100 text-stone-600 border-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:border-stone-700' },
  flagged: { label: 'Flagged', bg: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800/40' },
  resolved: { label: 'Resolved', bg: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800/40' },
  dismissed: { label: 'Dismissed', bg: 'bg-stone-100 text-stone-500 border-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:border-stone-700' },

  // Priority Levels
  high: { label: 'High Priority', bg: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800/40' },
  medium: { label: 'Medium', bg: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/40' },
  low: { label: 'Low', bg: 'bg-stone-100 text-stone-600 border-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:border-stone-700' },

  // Success / Failure
  success: { label: 'Success', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/40' },
  failed: { label: 'Failed', bg: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800/40' },
  verified: { label: 'Verified', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/40' },
  accepted: { label: 'Accepted', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/40' },
};

export const AdminStatusBadge = ({ status, customLabel = null, size = 'sm' }) => {
  const normalizedKey = String(status || '').toLowerCase().replace(/\s+/g, '_');
  const config = STATUS_CONFIGS[normalizedKey] || {
    label: customLabel || status || 'Unknown',
    bg: 'bg-stone-100 text-stone-700 border-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:border-stone-700',
  };

  const sizeClasses = size === 'xs' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border tracking-tight ${sizeClasses} ${config.bg}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {customLabel || config.label}
    </span>
  );
};

export default AdminStatusBadge;
