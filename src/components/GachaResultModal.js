import React from 'react';

const GachaResultModal = ({ results, onClose }) => {
  if (!Array.isArray(results)) return null;

  const getColorByRarity = (rarity) => {
    switch (rarity) {
      case 'UR':
        return 'bg-yellow-300 border-yellow-500';
      case 'SR':
        return 'bg-purple-300 border-purple-500';
      case 'R':
        return 'bg-blue-300 border-blue-500';
      default:
        return 'bg-gray-200 border-gray-400';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
        <h2 className="text-xl font-bold text-center mb-4">🎉 ガチャ結果 🎉</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {results.map((item, index) => (
            <div
              key={index}
              className={`p-4 rounded shadow text-center border-2 ${getColorByRarity(item.rarity)}`}
            >
              <div className="text-lg font-semibold">{item.name}</div>
              <div className="text-sm italic text-gray-600">{item.rarity}</div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white bg-pink-600 hover:bg-pink-700 px-3 py-1 rounded"
        >
          閉じる
        </button>
      </div>
    </div>
  );
};

export default GachaResultModal;


