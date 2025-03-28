import React, { useEffect, useState, useRef } from 'react';
import Lottie from 'lottie-react';

import stage1Animation from '../assets/lottie/stage1.json';
import stage2Animation from '../assets/lottie/stage2.json';
import stage3Animation from '../assets/lottie/stage3.json';

const GachaStageRenderer = ({ username, onComplete }) => {
  const [stage, setStage] = useState(1);
  const [skipped, setSkipped] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (skipped) return;

    timerRef.current = setInterval(() => {
      setStage((prev) => {
        if (prev >= 3) {
          clearInterval(timerRef.current);
          onComplete();
          return prev;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(timerRef.current);
  }, [skipped]);

  const handleSkip = () => {
    setSkipped(true);
    clearInterval(timerRef.current);
    onComplete(); // 即完了・即ガチャ結果へ
  };

  const getMessage = () => {
    switch (stage) {
      case 1:
        return '宝の商人は占っています';
      case 2:
        return 'これには一晩待つ必要があります';
      case 3:
        return `${username}様！ご覧下さい、お宝です！`;
      default:
        return '';
    }
  };

  const getAnimation = () => {
    switch (stage) {
      case 1:
        return stage1Animation;
      case 2:
        return stage2Animation;
      case 3:
        return stage3Animation;
      default:
        return null;
    }
  };

  if (skipped) return null;

  return (
    <div className="absolute inset-0 z-[999] bg-black bg-opacity-90 flex flex-col items-center justify-start text-center px-4 pt-12">
      <div className="absolute top-4 right-4">
        <button
          onClick={handleSkip}
          className="bg-white bg-opacity-20 hover:bg-opacity-40 text-sm text-white px-4 py-1 rounded-full border border-white backdrop-blur-md shadow-md transition"
        >
          スキップ
        </button>
      </div>

      <div className="w-72 sm:w-96 mt-8">
        <Lottie animationData={getAnimation()} loop={false} />
      </div>

      <p className="text-lg sm:text-xl font-bold animate-pulse mt-6">{getMessage()}</p>
    </div>
  );
};

export default GachaStageRenderer;