import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Button } from '../../common/Button';

export const AdminConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Destructive Action',
  description = 'Are you certain you want to proceed? This change takes effect immediately on the live Fuse platform.',
  confirmText = 'Confirm & Execute',
  cancelText = 'Cancel',
  danger = true,
  requireTyping = false,
  requiredWord = 'DELETE',
  loading = false,
}) => {
  const [typedInput, setTypedInput] = useState('');

  if (!isOpen) return null;

  const isConfirmDisabled = requireTyping && typedInput.trim().toUpperCase() !== requiredWord.toUpperCase();

  const handleConfirm = () => {
    onConfirm();
    setTypedInput('');
  };

  const handleClose = () => {
    setTypedInput('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150 max-h-[calc(100vh-3rem)] overflow-y-auto my-auto">
        <div className="flex items-start justify-between gap-4">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
              danger
                ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400'
                : 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400'
            }`}
          >
            <AlertTriangle className="w-6 h-6" />
          </div>

          <button
            onClick={handleClose}
            className="p-1 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-bold text-[#171717] dark:text-[#F5F5F0]">
            {title}
          </h3>
          <p className="text-xs text-[#71717A] dark:text-[#A8A8A2] leading-relaxed">
            {description}
          </p>
        </div>

        {requireTyping && (
          <div className="space-y-2 pt-2">
            <label className="text-xs font-semibold text-[#171717] dark:text-[#F5F5F0]">
              Type <span className="font-mono text-rose-600 font-bold">{requiredWord}</span> to verify:
            </label>
            <input
              type="text"
              value={typedInput}
              onChange={(e) => setTypedInput(e.target.value)}
              placeholder={`Type "${requiredWord}"`}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E7E0] dark:border-[#2B2B27] bg-[#F8F8F5] dark:bg-[#141413] text-sm text-[#171717] dark:text-[#F5F5F0] focus:outline-none focus:border-rose-500"
            />
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#F0EFEA] dark:border-[#22221F]">
          <Button variant="ghost" size="sm" onClick={handleClose} disabled={loading}>
            {cancelText}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleConfirm}
            disabled={isConfirmDisabled || loading}
            className={danger ? '!bg-rose-600 hover:!bg-rose-700 text-white' : ''}
          >
            {loading ? 'Processing...' : confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminConfirmModal;
