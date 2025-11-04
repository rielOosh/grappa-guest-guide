import React from 'react';

export const BackgroundBubbles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute w-40 h-40 rounded-full top-10 left-10 animate-float"
        style={{ background: `linear-gradient(to bottom right, var(--bubble-1), var(--bubble-2))` }}
      />
      <div
        className="absolute w-32 h-32 rounded-full top-60 right-16 animate-pulse"
        style={{
          background: `linear-gradient(to bottom right, var(--bubble-2), var(--bubble-3))`,
          animationDelay: '0.5s',
        }}
      />
      <div
        className="absolute w-28 h-28 rounded-full bottom-20 left-1/3 animate-float"
        style={{
          background: `linear-gradient(to bottom right, var(--bubble-3), var(--bubble-1))`,
          animationDelay: '2s',
        }}
      />
      <div
        className="absolute w-36 h-36 rounded-full bottom-40 right-10 animate-pulse"
        style={{
          background: `linear-gradient(to bottom right, var(--bubble-1), var(--bubble-4))`,
          animationDelay: '1s',
        }}
      />
      <div
        className="absolute w-24 h-24 rounded-full top-1/3 left-1/2 animate-float"
        style={{
          background: `linear-gradient(to bottom right, var(--bubble-3), var(--bubble-2))`,
          animationDelay: '3s',
        }}
      />
      <div
        className="absolute w-44 h-44 rounded-full bottom-10 left-10 animate-pulse"
        style={{
          background: `linear-gradient(to bottom right, var(--bubble-2), var(--bubble-4))`,
          animationDelay: '2.5s',
        }}
      />
      <div
        className="absolute w-20 h-20 rounded-full top-20 right-1/3 animate-float"
        style={{
          background: `linear-gradient(to bottom right, var(--bubble-1), var(--bubble-3))`,
          animationDelay: '1.5s',
        }}
      />
      <div
        className="absolute w-48 h-48 rounded-full top-1/2 right-1/4 animate-pulse"
        style={{
          background: `linear-gradient(to bottom right, var(--bubble-4), var(--bubble-2))`,
          animationDelay: '4s',
        }}
      />
      <div
        className="absolute w-16 h-16 rounded-full top-5 right-5 animate-float"
        style={{
          background: `linear-gradient(to bottom right, var(--bubble-3), var(--bubble-1))`,
          animationDelay: '0.5s',
        }}
      />
      <div
        className="absolute w-12 h-12 rounded-full bottom-32 right-20 animate-pulse"
        style={{
          background: `linear-gradient(to bottom right, var(--bubble-1), var(--bubble-2))`,
          animationDelay: '3.5s',
        }}
      />
      <div
        className="absolute w-14 h-14 rounded-full top-40 left-5 animate-float"
        style={{
          background: `linear-gradient(to bottom right, var(--bubble-3), var(--bubble-2))`,
          animationDelay: '2.5s',
        }}
      />
      <div
        className="absolute w-10 h-10 rounded-full bottom-5 right-1/2 animate-pulse"
        style={{
          background: `linear-gradient(to bottom right, var(--bubble-2), var(--bubble-4))`,
          animationDelay: '1.8s',
        }}
      />
      <div
        className="absolute w-18 h-18 rounded-full top-3/4 left-20 animate-float"
        style={{
          background: `linear-gradient(to bottom right, var(--bubble-1), var(--bubble-3))`,
          animationDelay: '4.5s',
        }}
      />
      <div
        className="absolute w-8 h-8 rounded-full top-2/3 right-10 animate-pulse"
        style={{
          background: `linear-gradient(to bottom right, var(--bubble-2), var(--bubble-1))`,
          animationDelay: '0.8s',
        }}
      />
      <div
        className="absolute w-15 h-15 rounded-full bottom-1/4 left-1/4 animate-float"
        style={{
          background: `linear-gradient(to bottom right, var(--bubble-3), var(--bubble-2))`,
          animationDelay: '3.2s',
        }}
      />
      <div
        className="absolute w-11 h-11 rounded-full top-10 left-1/3 animate-pulse"
        style={{
          background: `linear-gradient(to bottom right, var(--bubble-1), var(--bubble-2))`,
          animationDelay: '2.2s',
        }}
      />
    </div>
  );
};
