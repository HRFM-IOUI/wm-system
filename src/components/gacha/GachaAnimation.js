// src/components/GachaAnimation.js

import React from 'react';
import Lottie from 'lottie-react';
import gachaAnimationData from '../../assets/gacha-animation.json'; // あなたのLottie JSONに置き換えてください

const GachaAnimation = ({ onComplete }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="w-64 h-64">
        <Lottie
          animationData={gachaAnimationData}
          loop={false}
          onComplete={onComplete}
        />
      </div>
    </div>
  );
};

export default GachaAnimation;