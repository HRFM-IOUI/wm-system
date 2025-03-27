// src/components/GachaSpecialAnimation.js

import React, { useEffect } from 'react';
import Lottie from 'lottie-react';
import specialAnimationData from '../assets/ssr-animation.json'; // 豪華演出のLottie JSON

const GachaSpecialAnimation = ({ onComplete }) => {
  useEffect(() => {
    const audio = new Audio('/SSR_SE.mp3');
    audio.play();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="w-72 h-72">
        <Lottie
          animationData={specialAnimationData}
          loop={false}
          onComplete={onComplete}
        />
      </div>
    </div>
  );
};

export default GachaSpecialAnimation;