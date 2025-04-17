// src/pages/system/ThankYou.js
import React from 'react';
import { Link } from 'react-router-dom';

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col items-center justify-center p-4">
      <div className="bg-gray-50 shadow rounded text-center p-6 space-y-4 max-w-md w-full">
        <h1 className="text-2xl font-bold text-pink-600">
          🎉 ご購入ありがとうございます！
        </h1>
        <p className="text-gray-700">
          注文を受け付けました。確認メールが送信されます。
        </p>
        <p className="text-sm text-gray-500">
          配送や視聴リンクに関する情報はマイページでもご確認いただけます。
        </p>
        <Link
          to="/toppage"
          className="inline-block bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded"
        >
          トップページに戻る
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;

