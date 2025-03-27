// src/pages/Gacha.js

import React, { useState, useEffect } from 'react';
import GachaResultModal from '../components/GachaResultModal';
import GachaTicketModal from '../components/GachaTicketModal';
import GachaAnimation from '../components/GachaAnimation';
import gachaMachine from '../assets/gacha-machine.png';

const Gacha = () => {
  const [showResultModal, setShowResultModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const [gachaResults, setGachaResults] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('人気');

  useEffect(() => {
    setShowResultModal(false);
    setGachaResults([]);
    setSelectedCount(0);
  }, []);

  const genres = ['人気', '新着', '限定'];

  const handleOpenGacha = (count) => {
    setSelectedCount(count);
    setShowConfirmModal(true);
  };

  const handleConfirmYes = () => {
    setShowConfirmModal(false);
    setIsAnimating(true);

    setTimeout(() => {
      const results = generateMockResults(selectedCount);
      setGachaResults(results);
      setShowResultModal(true);
      setIsAnimating(false);
    }, 1800); // Lottie演出時間に合わせて
  };

  const handleConfirmNo = () => {
    setSelectedCount(0);
    setShowConfirmModal(false);
  };

  const generateMockResults = (count) => {
    const rarities = ['R', 'SR', 'SSR'];
    return Array.from({ length: count }, (_, i) => ({
      name: `アイテム${i + 1}`,
      rarity: rarities[Math.floor(Math.random() * rarities.length)],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 relative">
      <h1 className="text-2xl font-bold mb-4 text-center">ジャンル別ガチャ</h1>

      {/* ジャンル選択 */}
      <div className="flex justify-center space-x-4 mb-6">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              selectedGenre === genre
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-300 text-gray-700'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* ガチャマシン画像 */}
      <div className="flex justify-center mb-6">
        <img src={gachaMachine} alt="ガちゃマシン" className="w-48 h-auto" />
      </div>

      {/* ガチャボタン */}
      <div className="flex justify-center space-x-4 mb-6">
        {[1, 10, 100].map((count) => (
          <button
            key={count}
            onClick={() => handleOpenGacha(count)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow"
          >
            {count}連ガチャ
          </button>
        ))}
      </div>

      {/* モーダル類 */}
      {showConfirmModal && (
        <GachaTicketModal
          ticketCount={selectedCount}
          onConfirm={handleConfirmYes}
          onCancel={handleConfirmNo}
        />
      )}
      {showResultModal && (
        <GachaResultModal
          results={gachaResults}
          onClose={() => {
            setShowResultModal(false);
            setGachaResults([]);
            setSelectedCount(0);
          }}
        />
      )}
      {isAnimating && <GachaAnimation />}
    </div>
  );
};

export default Gacha;