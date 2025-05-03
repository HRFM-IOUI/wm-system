// src/components/ui/SimpleGachaModal.js
import React, { useState } from 'react';
import { drawGacha, saveGachaResult } from '../../utils/gachaUtils';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';

const SimpleGachaModal = ({ onClose }) => {
  const [user] = useAuthState(auth);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDraw = async () => {
    setLoading(true);
    const results = await drawGacha();
    setResult(results[0]); // 1回だけ抽選
    if (user) {
      await saveGachaResult(user.uid, results);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-sm w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          ✕
        </button>
        <h2 className="text-lg font-semibold mb-4">✨ガチャを回す✨</h2>

        {loading ? (
          <p>抽選中...</p>
        ) : result ? (
          <div>
            <p className="text-xl font-bold text-pink-500">{result.name}</p>
            {result.type === 'subscription' && (
              <p className="text-sm text-green-500">🎉サブスク1ヶ月無料！🎉</p>
            )}
            <button
              className="mt-4 bg-gray-300 px-4 py-1 rounded"
              onClick={() => setResult(null)}
            >
              もう一回
            </button>
          </div>
        ) : (
          <button
            onClick={handleDraw}
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
          >
            ガチャを回す
          </button>
        )}
      </div>
    </div>
  );
};

export default SimpleGachaModal;
