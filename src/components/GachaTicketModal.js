// src/components/GachaTicketModal.js

import React from 'react';

const GachaTicketModal = ({ ticketCount, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 text-center shadow-xl">
        <h2 className="text-lg font-semibold mb-4">
          チケット{ticketCount}枚を使用してガチャを引きますか？
        </h2>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onConfirm}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            はい
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            いいえ
          </button>
        </div>
      </div>
    </div>
  );
};

export default GachaTicketModal;