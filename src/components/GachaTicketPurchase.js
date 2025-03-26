import React from 'react';

const GachaTicketPurchase = ({ onClose }) => {
  return (
    <div className="bg-white rounded-xl shadow-2xl p-8 w-[320px] sm:w-[400px] text-gray-900 relative">
      {/* 閉じるボタン */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
      >
        ×
      </button>

      <h2 className="text-2xl font-bold text-center mb-6">ガチャチケット購入</h2>

      <div className="space-y-4">
        <div className="flex justify-between items-center bg-gray-100 rounded-lg p-4">
          <span>チケット1枚</span>
          <span className="font-semibold text-indigo-600">¥100</span>
        </div>
        <div className="flex justify-between items-center bg-gray-100 rounded-lg p-4">
          <span>チケット10枚</span>
          <span className="font-semibold text-green-600">¥900</span>
        </div>
        <div className="flex justify-between items-center bg-gray-100 rounded-lg p-4">
          <span>チケット100枚</span>
          <span className="font-semibold text-pink-600">¥8,000</span>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
          onClick={() => {
            alert('購入処理は現在未実装です。');
            onClose();
          }}
        >
          購入する
        </button>
      </div>
    </div>
  );
};

export default GachaTicketPurchase;