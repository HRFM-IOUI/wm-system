// src/components/GachaTicketPurchase.js

import React, { useState, useEffect } from 'react';
import { addVipPointsForTicketPurchase } from '../utils/vipUtils';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const GachaTicketPurchase = ({ onClose }) => {
  const [selectedTicket, setSelectedTicket] = useState(1);
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, [auth]);

  const handlePurchase = async () => {
    if (!currentUser) {
      alert('ログインが必要です。');
      return;
    }

    try {
      await addVipPointsForTicketPurchase(currentUser.uid, selectedTicket);
      alert(`チケット${selectedTicket}枚を購入しました。\nVIPポイントが加算されました！`);
      onClose();
    } catch (error) {
      console.error('購入処理エラー:', error);
      alert('購入に失敗しました。');
    }
  };

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
        {[{ count: 1, price: 100, color: 'indigo' },
          { count: 10, price: 900, color: 'green' },
          { count: 100, price: 8000, color: 'pink' }].map(option => (
          <div
            key={option.count}
            className={`flex justify-between items-center bg-gray-100 rounded-lg p-4 cursor-pointer border 
              ${selectedTicket === option.count ? 'border-' + option.color + '-500' : 'border-transparent'}`}
            onClick={() => setSelectedTicket(option.count)}
          >
            <span>チケット{option.count}枚</span>
            <span className={`font-semibold text-${option.color}-600`}>¥{option.price.toLocaleString()}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
          onClick={handlePurchase}
        >
          購入する
        </button>
      </div>
    </div>
  );
};

export default GachaTicketPurchase;