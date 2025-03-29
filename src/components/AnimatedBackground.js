import React from 'react';
import '../../assets/animatedBackground.css';

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 z-[0] pointer-events-none">
      <div className="animated-stars" />
      <div className="animated-overlay" />
    </div>
  );
};

export default AnimatedBackground;
