// src/pages/system/Confirm.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';

const Confirm = () => {
  const { cartItems, getTotalPrice } = useContext(CartContext);
  const navigate = useNavigate();

  const handleProceed = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return <div className="p-4 text-center">カートに商品がありません。</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">🛍 注文内容の確認</h1>

      <div className="bg-white rounded shadow p-4 space-y-4">
        {cartItems.map((item, index) => (
          <div key={index} className="border-b pb-2">
            <p className="font-semibold">{item.title}</p>
            <p className="text-sm text-gray-500">¥{item.price.toLocaleString()}</p>
          </div>
        ))}
        <div className="text-right font-bold text-lg">
          合計金額: ¥{getTotalPrice().toLocaleString()}
        </div>
      </div>

      <button
        onClick={handleProceed}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        支払いへ進む
      </button>
    </div>
  );
};

export default Confirm;
