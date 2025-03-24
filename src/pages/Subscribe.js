import React from 'react';
import { motion } from 'framer-motion';

const Subscribe = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-100 to-white flex items-center justify-center px-4">
      <motion.div
        className="bg-white shadow-2xl rounded-2xl p-8 max-w-lg w-full"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          TOAラウンジ 入会プラン
        </h2>
        <p className="text-gray-500 text-center mb-6">
          下記プランのいずれかでご入会いただけます。
        </p>

        <div className="grid gap-4">
          {/* プラン1 */}
          <div className="border rounded-xl p-4 hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-semibold mb-2">月額プラン</h3>
            <p className="text-gray-600 mb-4">¥980 / 月</p>
            <a
              href="https://example.com/pay-monthly"
              className="block bg-pink-500 hover:bg-pink-600 text-white text-center py-2 rounded-xl font-bold transition duration-300"
            >
              入会する
            </a>
          </div>

          {/* プラン2 */}
          <div className="border rounded-xl p-4 hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-semibold mb-2">年間プラン</h3>
            <p className="text-gray-600 mb-4">¥9,800 / 年</p>
            <a
              href="https://example.com/pay-yearly"
              className="block bg-orange-400 hover:bg-orange-500 text-white text-center py-2 rounded-xl font-bold transition duration-300"
            >
              入会する
            </a>
          </div>
        </div>

        <p className="text-sm text-gray-400 mt-6 text-center">
          決済は外部リンクで行われます。安心してご利用ください。
        </p>
      </motion.div>
    </div>
  );
};

export default Subscribe;