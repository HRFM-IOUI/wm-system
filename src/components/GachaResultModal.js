// src/components/GachaResultModal.js
import React from 'react';
import '../assets/GachaResultModal.css';

const GachaResultModal = ({ results = [], onClose }) => {
  if (!Array.isArray(results) || results.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 text-white">
        <div className="bg-gray-800 p-6 rounded shadow-lg max-w-md text-center space-y-4">
          <h2 className="text-lg font-bold">ガチャ結果</h2>
          <p>結果がありません</p>
          <button
            onClick={onClose}
            className="mt-4 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded shadow"
          >
            閉じる
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 text-white">
      <div className="bg-gray-900 p-6 rounded shadow-lg max-w-xl w-full space-y-4">
        <h2 className="text-lg font-bold">ガチャ結果</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {results.map((item, index) => (
            <div
              key={index}
              className={`rounded p-3 text-center ${
                item.rarity === 'SSR'
                  ? 'bg-gradient-to-r from-yellow-400 to-red-500'
                  : item.rarity === 'SR'
                  ? 'bg-purple-600'
                  : item.rarity === 'R'
                  ? 'bg-blue-600'
                  : 'bg-gray-700'
              }`}
            >
              <div className="font-bold">{item.name || '???'}</div>
              <div className="text-sm opacity-80">{item.rarity}</div>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="block mx-auto mt-4 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded shadow"
        >
          閉じる
        </button>
      </div>
    </div>
  );
};

export default GachaResultModal;










