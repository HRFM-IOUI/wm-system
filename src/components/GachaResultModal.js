import React from 'react';

const GachaResultModal = ({ results = [], onClose }) => {
  if (!results || results.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center px-4">
      <div className="bg-white max-w-4xl w-full rounded-lg shadow-lg p-6 relative overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold text-center text-pink-600 mb-4">🎉 ガチャ結果 🎉</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {results.map((item, index) => (
            <div key={index} className="bg-gradient-to-br from-pink-200 to-pink-100 border border-pink-300 rounded-lg p-2 text-center shadow">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name || `Item ${index + 1}`}
                  className="w-full h-32 object-cover rounded mb-1"
                />
              ) : (
                <div className="w-full h-32 flex items-center justify-center bg-gray-200 rounded mb-1 text-sm text-gray-500">
                  {item.name || `火・水・草・雷・光 など`}
                </div>
              )}
              <p className="text-sm font-semibold text-gray-800">{item.name || `???`}</p>
              <p className="text-xs text-gray-500">{item.rarity ? `★${item.rarity}` : ''}</p>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-pink-600 hover:text-pink-800 font-bold text-lg"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default GachaResultModal;












