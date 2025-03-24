import React from 'react';
import { Link } from 'react-router-dom';

const Lounge = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-orange-100 px-4 py-10">
      <div className="max-w-2xl w-full text-center bg-white bg-opacity-80 backdrop-blur-md p-10 rounded-2xl shadow-xl">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-800">TOA Lounge</h1>
        <p className="text-gray-700 text-base sm:text-lg mb-8">
          ここはTOAクリエイターたちの集う、特別なオンラインスペースです。
          <br className="hidden sm:block" />
          今すぐ参加して、あなたの世界を広げよう。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/login"
            className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-semibold transition text-sm sm:text-base"
          >
            ログイン
          </Link>
          <Link
            to="/login"
            className="px-8 py-3 bg-white hover:bg-gray-100 text-blue-600 border border-blue-500 rounded-full font-semibold transition text-sm sm:text-base"
          >
            入会する
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Lounge;