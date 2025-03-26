import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GachaTicketModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-lg shadow-xl w-[90%] max-w-md p-6 relative"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
          >
            &times;
          </button>

          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            ガチャチケット購入
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between border rounded-lg p-4 shadow-sm hover:shadow transition">
              <div>
                <p className="font-semibold">1枚</p>
                <p className="text-sm text-gray-500">¥100</p>
              </div>
              <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-2 rounded-full text-sm">
                購入する
              </button>
            </div>

            <div className="flex items-center justify-between border rounded-lg p-4 shadow-sm hover:shadow transition">
              <div>
                <p className="font-semibold">10枚</p>
                <p className="text-sm text-gray-500">¥900（10%オフ）</p>
              </div>
              <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-2 rounded-full text-sm">
                購入する
              </button>
            </div>             <div className="flex items-center justify-between border rounded-lg p-4 shadow-sm hover:shadow transition">
              <div>
                <p className="font-semibold">100枚</p>
                <p className="text-sm text-gray-500">¥8,000（20%オフ）</p>
              </div>
              <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-2 rounded-full text-sm">
                購入する
              </button>
            </div>
          </div>

          <p className="text-xs text-center text-gray-400 mt-6">
            ※ 購入後の払い戻しはできません。
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GachaTicketModal;