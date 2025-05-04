// src/pages/content/CancelPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const CancelPage = () => {
  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4 text-red-600">決済がキャンセルされました</h1>
      <p className="mb-4">決済処理がキャンセルされました。もう一度お試しいただくか、トップページへ戻ってください。</p>
      <Link
        to="/toppage"
        className="inline-block mt-4 px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
      >
        トップページに戻る
      </Link>
    </div>
  );
};

export default CancelPage;

