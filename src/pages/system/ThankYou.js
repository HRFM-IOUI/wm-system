// src/pages/system/ThankYou.js
import React from 'react';
import { Link } from 'react-router-dom';

const ThankYou = () => {
  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded text-center space-y-6">
      <h1 className="text-2xl font-bold text-pink-600">🎉 ご購入ありがとうございます！</h1>
      <p className="text-gray-700">注文を受け付けました。確認メールが送信されます。</p>
      <p className="text-sm text-gray-500">配送や視聴リンクに関する情報はマイページでもご確認いただけます。</p>
      <Link
        to="/toppage"
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        トップページに戻る
      </Link>
    </div>
  );
};

export default ThankYou;
