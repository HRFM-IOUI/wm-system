// src/pages/NotFound.js
import React from 'react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center text-gray-800 px-4">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-pink-600">
          404 - ページが見つかりません。
        </h1>
        <p className="text-gray-600 text-sm">
          指定されたURLが間違っているか、削除されています。
        </p>
        <a
          href="/"
          className="inline-block mt-3 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded text-sm"
        >
          トップへ戻る
        </a>
      </div>
    </div>
  );
};

export default NotFound;

