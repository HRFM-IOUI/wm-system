// src/components/content/DummyGoods.js
import React from 'react';

const DummyGoods = () => {
  const goodsList = [
    { id: 1, name: 'オリジナルTシャツ', image: '/assets/images/goods1.jpg' },
    { id: 2, name: 'アクリルスタンド', image: '/assets/images/goods2.jpg' },
    { id: 3, name: '缶バッジセット', image: '/assets/images/goods3.jpg' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {goodsList.map((item) => (
        <div key={item.id} className="bg-white rounded-lg shadow p-4 text-center">
          <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded" />
          <h3 className="mt-2 text-lg font-semibold">{item.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default DummyGoods;
