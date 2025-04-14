// src/components/ui/FloatingCartBar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const FloatingCartBar = ({ item, quantity, onClear }) => {
  const navigate = useNavigate();
  if (!item) return null;

  const totalPrice = item.price * quantity;

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-full px-6 py-2 flex items-center gap-4 z-50 border border-pink-300">
      <div className="text-sm font-medium">
        🛒 {item.title} × {quantity} = <span className="text-pink-600 font-bold">¥{totalPrice}</span>
      </div>
      <button
        className="text-sm text-blue-600 underline"
        onClick={() => navigate('/checkout')}
      >
        購入に進む
      </button>
      <button
        className="text-sm text-gray-500 underline"
        onClick={onClear}
      >
        クリア
      </button>
    </div>
  );
};

export default FloatingCartBar;
