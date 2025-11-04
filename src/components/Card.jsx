import React from 'react';

export const Card = ({ card, index, isLoaded, currentTheme, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`glass rounded-2xl p-5 cursor-pointer shadow-lg card-hover haptic ${isLoaded ? 'animate-scaleIn' : 'opacity-0'}`}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <div
          className={`p-4 bg-gradient-to-br ${card.gradient} backdrop-blur-sm rounded-2xl shadow-md icon-container border border-white/40 ${currentTheme === 'night' ? 'shadow-[0_0_20px_rgba(255,255,255,0.1)]' : ''}`}
        >
          {card.icon}
        </div>
        <h3 className={`font-bold text-base tracking-tight ${currentTheme === 'day' ? 'text-slate-900' : 'text-white'}`}>
          {card.title}
        </h3>
      </div>
    </div>
  );
};
