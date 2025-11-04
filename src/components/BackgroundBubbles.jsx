import React from 'react';

export const BackgroundBubbles = () => {
  const bubbles = [
    { size: 'w-40 h-40', pos: 'top-10 left-10', gradient: '1-2', animation: 'float', delay: '0s' },
    { size: 'w-32 h-32', pos: 'top-60 right-16', gradient: '2-3', animation: 'pulse-glow', delay: '0.5s' },
    { size: 'w-28 h-28', pos: 'bottom-20 left-1/3', gradient: '3-1', animation: 'float', delay: '2s' },
    { size: 'w-36 h-36', pos: 'bottom-40 right-10', gradient: '1-4', animation: 'pulse-glow', delay: '1s' },
    { size: 'w-24 h-24', pos: 'top-1/3 left-1/2', gradient: '3-2', animation: 'float', delay: '3s' },
    { size: 'w-44 h-44', pos: 'bottom-10 left-10', gradient: '2-4', animation: 'pulse-glow', delay: '2.5s' },
    { size: 'w-20 h-20', pos: 'top-20 right-1/3', gradient: '1-3', animation: 'float', delay: '1.5s' },
    { size: 'w-48 h-48', pos: 'top-1/2 right-1/4', gradient: '4-2', animation: 'pulse-glow', delay: '4s' },
    { size: 'w-16 h-16', pos: 'top-5 right-5', gradient: '3-1', animation: 'float', delay: '0.5s' },
    { size: 'w-12 h-12', pos: 'bottom-32 right-20', gradient: '1-2', animation: 'pulse-glow', delay: '3.5s' },
    { size: 'w-14 h-14', pos: 'top-40 left-5', gradient: '3-2', animation: 'float', delay: '2.5s' },
    { size: 'w-10 h-10', pos: 'bottom-5 right-1/2', gradient: '2-4', animation: 'pulse-glow', delay: '1.8s' },
    { size: 'w-18 h-18', pos: 'top-3/4 left-20', gradient: '1-3', animation: 'float', delay: '4.5s' },
    { size: 'w-8 h-8', pos: 'top-2/3 right-10', gradient: '2-1', animation: 'pulse-glow', delay: '0.8s' },
    { size: 'w-15 h-15', pos: 'bottom-1/4 left-1/4', gradient: '3-2', animation: 'float', delay: '3.2s' },
    { size: 'w-11 h-11', pos: 'top-10 left-1/3', gradient: '1-2', animation: 'pulse-glow', delay: '2.2s' },
  ];

  const getGradient = (gradientKey) => {
    const gradients = {
      '1-2': 'linear-gradient(135deg, var(--bubble-1), var(--bubble-2))',
      '2-3': 'linear-gradient(135deg, var(--bubble-2), var(--bubble-3))',
      '3-1': 'linear-gradient(135deg, var(--bubble-3), var(--bubble-1))',
      '1-4': 'linear-gradient(135deg, var(--bubble-1), var(--bubble-4))',
      '3-2': 'linear-gradient(135deg, var(--bubble-3), var(--bubble-2))',
      '2-4': 'linear-gradient(135deg, var(--bubble-2), var(--bubble-4))',
      '1-3': 'linear-gradient(135deg, var(--bubble-1), var(--bubble-3))',
      '4-2': 'linear-gradient(135deg, var(--bubble-4), var(--bubble-2))',
      '2-1': 'linear-gradient(135deg, var(--bubble-2), var(--bubble-1))',
    };
    return gradients[gradientKey];
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {bubbles.map((bubble, index) => (
        <div
          key={index}
          className={`absolute ${bubble.size} ${bubble.pos} rounded-full animate-${bubble.animation}`}
          style={{
            background: getGradient(bubble.gradient),
            animationDelay: bubble.delay,
            boxShadow: 'inset 0 0 30px rgba(255, 255, 255, 0.2), 0 0 20px rgba(255, 255, 255, 0.1)',
            filter: 'blur(1px)',
          }}
        >
          <div
            className="w-full h-full rounded-full animate-shimmer opacity-50"
            style={{
              background: 'linear-gradient(135deg, transparent 30%, var(--bubble-shimmer) 50%, transparent 70%)',
              backgroundSize: '200% 200%',
            }}
          />
        </div>
      ))}
    </div>
  );
};
