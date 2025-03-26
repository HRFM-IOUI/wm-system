import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GachaAnimation = ({ onComplete }) => {
  const [showExplosion, setShowExplosion] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowExplosion(true), 1500);
    const timer2 = setTimeout(() => onComplete(), 3000); // 結果表示へ遷移

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <AnimatePresence>
        {!showExplosion ? (
          <motion.div
            className="w-24 h-24 bg-blue-400 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          />
        ) : (
          <motion.div
            className="w-40 h-40 bg-yellow-400 rounded-full shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1.2, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-white text-center pt-16 font-bold">爆発！</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GachaAnimation;