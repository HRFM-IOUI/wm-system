import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const Lounge = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-orange-50 to-white">
      <motion.div
        className="flex-grow flex flex-col items-center justify-center px-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-extrabold mb-4 text-gray-800">TOAラウンジ</h1>
        <p className="text-gray-600 text-lg mb-6 text-center">
          限定コミュニティに参加しよう
        </p>
        <div className="flex gap-4">
          <a
            href="/login"
            className="px-6 py-2 bg-white text-pink-500 font-semibold rounded-full border border-pink-500 hover:bg-pink-50 transition"
          >
            ログイン
          </a>
          <a
            href="/subscribe"
            className="px-6 py-2 bg-pink-500 text-white font-semibold rounded-full hover:bg-pink-600 transition"
          >
            入会
          </a>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default Lounge;