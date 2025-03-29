// src/components/GachaStageRenderer.js
import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import stage1 from '../assets/lottie/stage1.json';
import stage2 from '../assets/lottie/stage2.json';
import stage3 from '../assets/lottie/stage3.json';

const GachaStageRenderer = ({ onComplete, skip, onSkip }) => {
  const [stage, setStage] = useState(1);

  useEffect(() => {
    if (skip) {
      onComplete?.(); // スキップ時は即完了
      return;
    }

    const timers = [
      setTimeout(() => setStage(2), 2000),
      setTimeout(() => setStage(3), 4000),
      setTimeout(() => {
        onComplete?.(); // 演出完了後に onComplete 呼び出し
      }, 6000),
    ];

    return () => timers.forEach(clearTimeout);
  }, [skip, onComplete]);

  const getAnimation = () => {
    switch (stage) {
      case 1:
        return stage1;
      case 2:
        return stage2;
      case 3:
        return stage3;
      default:
        return stage1;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity z-50 flex items-center justify-center flex-col">
      <button
        onClick={onSkip}
        className="absolute top-4 right-4 text-white bg-gray-700 hover:bg-red-600 px-3 py-1 rounded"
      >
        演出をスキップ
      </button>
      <div className="w-72 md:w-96">
        <Lottie animationData={getAnimation()} loop={false} />
      </div>
      <div className="mt-4 text-white text-lg">宝の商人の秘法は貴方に祝福を授けます…</div>
    </div>
  );
};

export default GachaStageRenderer;














