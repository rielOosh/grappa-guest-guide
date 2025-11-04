import React from 'react';
import { CloseIcon } from './Icons';

export const ImageZoom = ({ src, onClose, currentTheme }) => {
  if (!src) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
      style={{ background: 'rgba(0, 0, 0, 0.9)' }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className={`absolute top-4 right-4 p-3 rounded-xl transition-all hover:scale-110 z-10 ${
          currentTheme === 'day'
            ? 'bg-white/90 text-slate-700 hover:bg-white'
            : 'bg-slate-800/90 text-white hover:bg-slate-700'
        }`}
        aria-label="Close image"
      >
        <CloseIcon />
      </button>
      <img
        src={src}
        alt="Zoomed view"
        className="max-w-full max-h-full rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};
