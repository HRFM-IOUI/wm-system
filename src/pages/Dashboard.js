import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">ようこそ、TOAラウンジへ！</h1>
        <p className="text-gray-500 mb-6">このダッシュボードはログイン後のページです。</p>
        <button className="bg-pink-500 text-white px-6 py-2 rounded-xl font-semibold hover:bg-pink-600 transition">
          サブスク管理へ
        </button>
      </div>
    </div>
  );
};

export default Dashboard;