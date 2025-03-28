// src/components/GachaTicketModal.js

import React from 'react';

const GachaTicketModal = ({
  drawCount,
  onConfirm,
  onClose,
  noTicket = false,
  onShopRedirect,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
        {/* 閉じる */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl font-bold"
          aria-label="閉じる"
        >
          ×
        </button>

        {noTicket ? (
          <>
            <h2 className="text-xl font-semibold text-center text-pink-600 mb-2">
              ガチャチケットがありません
            </h2>
            <p className="text-sm text-center text-gray-700 mb-6">
              チケットショップでガチャチケットをご購入ください。
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
              <button
                onClick={onShopRedirect}
                className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg shadow transition"
              >
                チケットショップへ
              </button>
              <button
                onClick={onClose}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg shadow transition"
              >
                キャンセル
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-center text-gray-900 mb-2">
              ガチャを回しますか？
            </h2>
            <p className="text-sm text-center text-gray-600 mb-6">
              チケットを <span className="font-bold text-indigo-600">{drawCount}</span> 枚消費してガチャを回します。
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={onConfirm}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition"
              >
                はい
              </button>
              <button
                onClick={onClose}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg shadow transition"
              >
                いいえ
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GachaTicketModal;
