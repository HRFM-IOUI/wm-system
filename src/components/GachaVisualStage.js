// src/components/GachaVisualStage.js

import React from 'react';

const GachaVisualStage = ({ items }) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-white text-center mt-10">
        ガチャ結果がありません。
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {items.map((item, index) => (
        <div
          key={index}
          className={`p-4 rounded shadow transition-transform duration-300 transform hover:scale-105
            ${item.rarity === 'SSR'
              ? 'bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white animate-pulse'
              : item.rarity === 'SR'
              ? 'bg-purple-400 text-white'
              : 'bg-gray-100'}
          `}
        >
          <h3 className="font-bold text-lg mb-1">{item.name}</h3>
          <p className="text-sm">{item.rarity}</p>
        </div>
      ))}
    </div>
  );
};

export default GachaVisualStage;

