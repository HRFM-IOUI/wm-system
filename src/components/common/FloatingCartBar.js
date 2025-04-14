// src/components/common/FloatingCartBar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const FloatingCartBar = ({ item, onClear }) => {
  const navigate = useNavigate();

  if (!item) return null;

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 w-[95%] sm:w-[400px] bg-white border border-gray-300 shadow-xl rounded-xl p-3 flex items-center justify-between space-x-4">
      <div className="flex-1">
        <p className="text-sm font-semibold truncate">🛍 {item.title}</p>
        <p className="text-xs text-gray-600">数量: {item.quantity} / 合計: ¥{item.price * item.quantity}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="text-xs text-gray-500 underline"
          onClick={onClear}
        >
          取消
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
          onClick={() => navigate('/checkout')}
        >
          購入へ
        </button>
      </div>
    </div>
  );
};

export default FloatingCartBar;
