import React from 'react';
import { CloseIcon } from './Icons';

export const Dialog = ({ isOpen, onClose, title, content, currentTheme }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4 animate-fadeIn"
      style={{ background: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl shadow-2xl animate-slideUp ${
          currentTheme === 'day' ? 'bg-slate-50/95 text-slate-900' : 'bg-slate-900/95 text-white'
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{ backdropFilter: 'blur(20px)' }}
      >
        <div
          className={`sticky top-0 z-10 flex items-center justify-between p-6 border-b ${
            currentTheme === 'day' ? 'bg-white/80 border-slate-200' : 'bg-slate-800/80 border-slate-700'
          }`}
          style={{ backdropFilter: 'blur(10px)' }}
        >
          <h2 className={`text-2xl font-bold ${currentTheme === 'day' ? 'text-slate-900' : 'text-white'}`}>
            {title}
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-all hover:scale-110 ${
              currentTheme === 'day'
                ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                : 'bg-slate-700 text-white hover:bg-slate-600'
            }`}
            aria-label="Close dialog"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="p-6">{content}</div>
      </div>
    </div>
  );
};
