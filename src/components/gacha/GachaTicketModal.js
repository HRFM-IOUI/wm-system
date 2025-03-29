import React from 'react';

const GachaTicketModal = ({ count, onConfirm, onClose }) => {
  if (typeof onConfirm !== 'function' || typeof onClose !== 'function') return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md text-center shadow-lg relative">
        <h2 className="text-lg font-bold mb-4">ガチャ確認</h2>
        <p className="mb-6">
          チケットを <span className="font-bold text-pink-600">{count}</span> 枚消費して
          ガチャを回しますか？
        </p>
        <div className="flex justify-around">
          <button
            onClick={onConfirm}
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded"
          >
            はい
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded"
          >
            キャンセル
          </button>
        </div>
      </div>
    </div>
  );
};

export default GachaTicketModal;

