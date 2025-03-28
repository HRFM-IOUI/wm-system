// src/components/GachaSpecialAnimation.js

import React from 'react';
import Lottie from 'lottie-react';
import specialAnimation from '../assets/special-animation-1.json';

const GachaSpecialAnimation = ({ message }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Lottie animationData={specialAnimation} loop={true} className="w-[300px] h-[300px]" />
      <p className="mt-4 text-lg font-bold text-white animate-pulse">{message}</p>
    </div>
  );
};