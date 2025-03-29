import React from 'react';
import Lottie from 'lottie-react';
import goldAnimation from '../../assets/lottie/gold-animation.json';

const GachaGoldAnimation = ({ onComplete }) => {
  return (
    <div className="w-full max-w-sm mx-auto">
      <Lottie
        animationData={goldAnimation}
        loop={false}
        onComplete={onComplete}
        className="w-full"
      />
    </div>
  );
};

export default GachaGoldAnimation;
