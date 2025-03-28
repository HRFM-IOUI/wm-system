// src/components/GachaStageRenderer.js
import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import stage1 from '../assets/lottie/stage1.json';
import stage2 from '../assets/lottie/stage2.json';
import stage3 from '../assets/lottie/stage3.json';

const stages = [
  {
    animation: stage1,
    message: '宝の商人は占っています...',
  },
  {
    animation: stage2,
    message: 'これには一晩待つ必要があります...',
  },
  {
    animation: stage3,
    message: (userName) => `${userName}様！ご覧ください、お宝です！`,
  },
];

const GachaStageRenderer = ({ onComplete, skip, onSkip, userName }) => {
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    if (skip) {
      onComplete?.(); // 即時完了
      return;
    }

    const interval = setInterval(() => {
      if (stageIndex < stages.length - 1) {
        setStageIndex((prev) => prev + 1);
      } else {
        clearInterval(interval);
        onComplete?.(); // 最終演出後に実行
      }
    }, 2000); // 各ステージ2秒

    return () => clearInterval(interval);
  }, [stageIndex, skip, onComplete]);

  const currentStage = stages[stageIndex];

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-90 text-white">
      <div className="relative w-80 h-80">
        <Lottie animationData={currentStage.animation} loop={false} />
        <div className="absolute bottom-0 w-full text-center text-lg font-bold animate-pulse">
          {typeof currentStage.message === 'function'
            ? currentStage.message(userName)
            : currentStage.message}
        </div>
      </div>
      <button
        onClick={onSkip}
        className="absolute top-4 right-4 px-3 py-1 bg-gray-800 text-sm rounded shadow hover:bg-gray-700"
      >
        スキップ
      </button>
    </div>
  );
};

export default GachaStageRenderer;





