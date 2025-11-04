import React from 'react';

export const LanguageModal = ({ isOpen, onSelectLanguage, currentTheme }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
      style={{ background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(8px)' }}
    >
      <div
        className={`w-full max-w-md rounded-3xl shadow-2xl p-8 animate-scaleIn ${
          currentTheme === 'day' ? 'bg-white text-slate-900' : 'bg-slate-800 text-white'
        }`}
      >
        <h2 className={`text-3xl font-bold text-center mb-6 ${currentTheme === 'day' ? 'text-slate-900' : 'text-white'}`}>
          Select Language / בחר שפה
        </h2>
        <div className="space-y-4">
          <button
            onClick={() => onSelectLanguage('en')}
            className={`w-full py-6 px-6 rounded-xl font-bold text-xl transition-all transform hover:scale-105 shadow-lg haptic ${
              currentTheme === 'day'
                ? 'bg-slate-600 hover:bg-slate-700 text-white'
                : 'bg-slate-700 hover:bg-slate-600 text-white'
            }`}
          >
            🇬🇧 English
          </button>
          <button
            onClick={() => onSelectLanguage('he')}
            className={`w-full py-6 px-6 rounded-xl font-bold text-xl transition-all transform hover:scale-105 shadow-lg haptic ${
              currentTheme === 'day'
                ? 'bg-slate-600 hover:bg-slate-700 text-white'
                : 'bg-slate-700 hover:bg-slate-600 text-white'
            }`}
          >
            🇮🇱 עברית
          </button>
        </div>
      </div>
    </div>
  );
};
