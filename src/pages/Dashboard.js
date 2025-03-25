import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('投稿管理');

  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productPreview, setProductPreview] = useState(null);

  const handleProductSubmit = (e) => {
    e.preventDefault();
    alert(`商品 "${productName}" を ¥${productPrice} で出品しました！`);
    setProductName('');
    setProductPrice('');
    setProductPreview(null);
  };

  const totalEarnings = 254000;

  const chartData = {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
    datasets: [
      {
        label: '売上',
        data: [40000, 55000, 30000, 70000, 50000, 60000],
        borderColor: '#f472b6',
        backgroundColor: 'rgba(236, 72, 153, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-pink-600">オーナーダッシュボード</h1>

      {/* タブメニュー */}
      <div className="flex gap-4 mb-6">
        {['投稿管理', '商品出品', '出金管理', 'アナリティクス'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded ${
              activeTab === tab ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* タブコンテンツ */}
      {activeTab === '投稿管理' && (
        <div className="space-y-4">
          <p className="text-gray-600">ここに投稿管理機能を実装（例：投稿の一覧や削除ボタンなど）</p>
        </div>
      )}

      {activeTab === '商品出品' && (
        <form onSubmit={handleProductSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="商品名"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="number"
            placeholder="価格（円）"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setProductPreview(e.target.files[0])}
            className="w-full border p-2 rounded"
          />
          {productPreview && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">プレビュー:</p>
              <p className="text-xs">{productPreview.name}</p>
            </div>
          )}
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            出品する
          </button>
        </form>
      )}

      {activeTab === '出金管理' && (
        <div className="space-y-4">
          <p>出金可能額: <span className="text-lg font-semibold text-green-600">¥{totalEarnings.toLocaleString()}</span></p>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">出金申請</button>
        </div>
      )}

      {activeTab === 'アナリティクス' && (
        <div className="bg-white rounded-lg shadow p-4 mt-4">
          <h2 className="text-lg font-semibold mb-2">売上推移</h2>
          <Line data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;