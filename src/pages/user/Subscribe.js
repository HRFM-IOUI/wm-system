import React from 'react';
import { motion } from 'framer-motion';

function Subscribe() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">TOAラウンジ プレミアム入会</h2>

        <div className="text-center mb-6">
          <span className="text-4xl font-bold text-indigo-600">¥1,200</span>
          <span className="text-gray-600"> / 月</span>
        </div>

        <ul className="mb-6 text-gray-700 list-disc list-inside space-y-1">
          <li>全コンテンツ閲覧</li>
          <li>限定イベントへの参加権</li>
          <li>サポートチャット利用</li>
        </ul>

        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200">
          入会する
        </button>

        <p className="text-xs text-gray-400 text-center mt-4">
          安心・安全な決済。キャンセルはいつでも可能です。
        </p>
      </motion.div>
    </div>
  );
}

export default Subscribe;