import React from 'react';
import { motion } from 'framer-motion';
import sampleImage from '../assets/gacha-machine.png'; // グレー系のサンプル画像を使用

const GachaAnimationStage = ({ message = "ガチャ演出中…" }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-lg shadow-inner w-full max-w-md mx-auto">
      {/* サンプル画像 */}
      <img src={sampleImage} alt="演出" className="w-40 h-40 object-contain mb-6 grayscale" />

      {/* テキスト点滅アニメーション */}
      <motion.div
        className="text-lg font-bold text-indigo-600 text-center"
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        {message}
      </motion.div>
    </div>
  );
};

export default GachaAnimationStage;