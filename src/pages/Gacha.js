import React, { useState } from 'react';
import GachaTicketPurchase from '../components/GachaTicketPurchase';
import GachaResultModal from '../components/GachaResultModal';
import { motion } from 'framer-motion';
import animationData from '../assets/gacha-animation.json';
import Lottie from 'lottie-react';

const Gacha = () => {
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState([]);

  const handleOpenTicketModal = () => setShowTicketModal(true);
  const handleCloseTicketModal = () => setShowTicketModal(false);

  const handleStartGacha = (type, genre) => {
    setShowAnimation(true);
    setTimeout(() => {
      const dummyResults = Array(type === '100' ? 100 : type === '10' ? 10 : 1)
        .fill(null)
        .map(() => ({
          name: 'キャラ名',
          rarity: ['R', 'SR', 'SSR'][Math.floor(Math.random() * 3)],
        }));
      setResults(dummyResults);
      setShowAnimation(false);
      setShowResult(true);
    }, 2500);
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold text-center mb-6">ジャンル別ガチャ</h1>

      {/* ガチャ3列 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {['流星ギフトパック小', '流星ギフトパック中', '流星ギフトパック大'].map((genre) => (
          <div
            key={genre}
            className="bg-white bg-opacity-10 p-4 rounded-lg shadow-md text-center"
          >
            <img
              src="/gacha-machine.png"
              alt="Gacha Machine"
              className="w-20 h-20 mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{genre}</h2>
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => handleStartGacha('1', genre)}
                className="bg-indigo-500 hover:bg-indigo-600 text-white py-1 px-4 rounded"
              >
                1連ガチャ <span className="ml-2">🪙</span>
              </button>
              <button
                onClick={() => handleStartGacha('10', genre)}
                className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded"
              >
                10連ガチャ <span className="ml-2">🪙</span>
              </button>
              <button
                onClick={() => handleStartGacha('100', genre)}
                className="bg-pink-500 hover:bg-pink-600 text-white py-1 px-4 rounded"
              >
                100連ガチャ <span className="ml-2">🪙</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* アニメーション表示 */}
      {showAnimation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-64 h-64"
          >
            <Lottie animationData={animationData} loop autoplay />
          </motion.div>
        </div>
      )}

      {/* ガチャ結果モーダル */}
      {showResult && (
        <GachaResultModal results={results} onClose={() => setShowResult(false)} />
      )}

      {/* チケット購入ボタン（右下固定） */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={handleOpenTicketModal}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-full shadow-lg"
        >
          流星チケット購入
        </button>
      </div>

      {/* チケット購入モーダル */}
      {showTicketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="relative z-60">
            <GachaTicketPurchase onClose={handleCloseTicketModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gacha;