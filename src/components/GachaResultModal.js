// src/components/GachaResultModal.js
import React from 'react';

const getColorByRarity = (rarity) => {
  switch (rarity) {
    case 'SSR': return 'bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white';
    case 'SR': return 'bg-purple-200 text-purple-800';
    case 'R': return 'bg-gray-100 text-gray-800';
    default: return 'bg-white text-gray-800';
  }
};

const GachaResultModal = ({ results = [], onClose }) => {
  const safeResults = Array.isArray(results) ? results : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-center mb-4">ガチャ結果</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[60vh] overflow-y-auto">
          {safeResults.map((item, index) => {
            if (!item || !item.rarity) return null;
            const rarityStyle = getColorByRarity(item.rarity);
            return (
              <div
                key={index}
                className={`rounded-xl p-4 shadow-md text-center ${rarityStyle}`}
              >
                <p className="font-semibold text-sm">{item.name || '???'}</p>
                <p className="text-xs opacity-70">{item.rarity}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GachaResultModal;
