import React from 'react';
import { useNavigate } from 'react-router-dom';

const TicketShop = () => {
  const navigate = useNavigate();

  const handlePurchase = (amount) => {
    alert(`${amount}枚分のチケット購入処理（仮）を実行します`);
    navigate('/gacha');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">チケットショップ</h2>
        <div className="space-y-4">
          {[1, 10, 100].map((count) => (
            <div
              key={count}
              className="flex justify-between items-center border p-4 rounded hover:bg-gray-50"
            >
              <span>チケット {count}枚</span>
              <button
                onClick={() => handlePurchase(count)}
                className="bg-pink-500 text-white px-4 py-1 rounded hover:bg-pink-600"
              >
                購入
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TicketShop;