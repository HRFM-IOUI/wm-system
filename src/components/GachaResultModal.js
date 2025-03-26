import React from 'react';

const rarityStyles = {
  SSR: 'bg-gradient-to-r from-yellow-400 to-pink-500 text-white border-yellow-500 shadow-lg',
  SR: 'bg-blue-100 border-blue-400 text-blue-800',
  R: 'bg-gray-100 border-gray-300 text-gray-700',
};

const GachaResultModal = ({ results, onClose }) => {
  if (!results || results.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-white w-full max-w-4xl max-h-[80vh] overflow-y-auto rounded-lg shadow-xl p-6 relative">
        <h2 className="text-2xl font-bold text-center mb-6">ガチャ結果</h2>
        <button
          className="absolute top-2 right-4 text-gray-500 hover:text-gray-700 text-lg font-bold"
          onClick={onClose}
        >
          ✕
        </button>

        {/* グリッド表示ここから */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">           {results.map((item, index) => {
            const rarityClass = rarityStyles[item.rarity] || rarityStyles.R;
            return (
              <div
                key={index}
                className={`border rounded-lg p-3 flex flex-col items-center justify-center ${rarityClass}`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-contain mb-2"
                />
                <p className="text-sm font-semibold">{item.name}</p>
                <span className="text-xs">{item.rarity}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GachaResultModal;