import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import stage1 from '../../assets/lottie/stage1.json';
import stage2 from '../../assets/lottie/stage2.json';
import stage3 from '../../assets/lottie/stage3.json';

const GachaStageRenderer = ({ onComplete, skip, onSkip }) => {
  const [stage, setStage] = useState(1);

  useEffect(() => {
    if (skip) {
      onComplete();
    } else {
      const timers = [
        setTimeout(() => setStage(2), 2000),
        setTimeout(() => setStage(3), 4000),
        setTimeout(() => onComplete(), 6000),
      ];

      return () => timers.forEach(clearTimeout);
    }
  }, [skip, onComplete]);

  const renderStage = () => {
    switch (stage) {
      case 1:
        return (
          <>
            <Lottie animationData={stage1} className="w-80 h-80" />
            <p className="text-lg font-bold text-white animate-pulse">召喚陣が現れた…</p>
          </>
        );
      case 2:
        return (
          <>
            <Lottie animationData={stage2} className="w-80 h-80" />
            <p className="text-lg font-bold text-white animate-pulse">時の精霊が動き出す…</p>
          </>
        );
      case 3:
        return (
          <>
            <Lottie animationData={stage3} className="w-80 h-80" />
            <p className="text-xl font-extrabold text-yellow-300 animate-pulse">
              「朱雀の加護」が宿る！
            </p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center">
      {renderStage()}

      <button
        onClick={onSkip}
        className="absolute top-4 right-6 text-white bg-black bg-opacity-40 px-4 py-1 rounded hover:bg-opacity-60"
      >
        スキップ
      </button>
    </div>
  );
};

export default GachaStageRenderer;















