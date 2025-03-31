import React from 'react';

const DummyGacha = () => {
  return (
    <div className="p-6 text-center text-gray-600">
      <h2 className="text-2xl font-bold mb-4">ガチャコンテンツ</h2>
      <p>ここにガチャの一覧や演出が表示されます（デモ用）</p>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="border rounded-xl shadow p-4 bg-white hover:shadow-lg transition"
          >
            <div className="bg-gray-200 h-28 rounded mb-2" />
            <div className="text-sm font-semibold">ガチャ #{i + 1}</div>
            <div className="text-xs text-gray-500">レア排出率：10%</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DummyGacha;
