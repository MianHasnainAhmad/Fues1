import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = 'max-w-lg',
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#171717]/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        className={`relative w-full ${maxWidth} bg-white dark:bg-[#1A1A19] rounded-2xl border border-[#E8E7E0] dark:border-[#2B2B27] shadow-2xl p-5 sm:p-7 z-10 my-auto transition-all animate-in fade-in zoom-in-95 duration-200 max-h-[calc(100vh-3rem)] overflow-y-auto`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            {title && <h3 className="text-xl font-bold text-[#171717] dark:text-[#F5F5F0]">{title}</h3>}
            {description && <p className="text-sm text-[#737373] dark:text-[#A8A8A2] mt-1">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#737373] hover:text-[#171717] hover:bg-[#F2F1EC] dark:text-[#A8A8A2] dark:hover:text-white dark:hover:bg-[#262624] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
};
