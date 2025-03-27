// src/components/GachaResultModal.js

import React from 'react';

const GachaResultModal = ({ results, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">ガチャ結果</h2>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {results.map((item, index) => (
            <div key={index} className="text-center border p-2 rounded">
              {item.name}（{item.rarity}）
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          閉じる
        </button>
      </div>
    </div>
  );
};

export default GachaResultModal;