import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('post');
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState('video');
  const [isPublic, setIsPublic] = useState(true);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productPreview, setProductPreview] = useState('');

  const [earnings, setEarnings] = useState([500, 700, 800, 600, 750, 900, 950]);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    setPosts(savedPosts);
  }, []);   const handlePostSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      title,
      description,
      type: mediaType,
      mediaUrl: media ? URL.createObjectURL(media) : '',
      isPublic,
      user: {
        name: 'オーナー',
        avatar: 'https://i.pravatar.cc/150?img=5'
      },
      stats: {
        likes: 0,
        views: 0
      }
    };
    const updated = [newPost, ...posts];
    setPosts(updated);
    localStorage.setItem('posts', JSON.stringify(updated));
    setTitle('');
    setDescription('');
    setMedia(null);
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      name: productName,
      price: productPrice,
      preview: productPreview
    };
    const existing = JSON.parse(localStorage.getItem('products') || '[]');
    const updated = [newProduct, ...existing];
    localStorage.setItem('products', JSON.stringify(updated));
    setProductName('');
    setProductPrice('');
    setProductPreview('');
  };

  const chartData = {
    labels: ['月', '火', '水', '木', '金', '土', '日'],
    datasets: [
      {
        label: '売上（円）',
        data: earnings,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: '今週の売上' }
    }
  };   return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6 text-pink-600">オーナーダッシュボード</h1>

      <div className="mb-4 flex space-x-4">
        <button onClick={() => setActiveTab('投稿')} className={`px-4 py-2 rounded ${activeTab === '投稿' ? 'bg-pink-500 text-white' : 'bg-white border'}`}>投稿管理</button>
        <button onClick={() => setActiveTab('商品')} className={`px-4 py-2 rounded ${activeTab === '商品' ? 'bg-pink-500 text-white' : 'bg-white border'}`}>商品管理</button>
        <button onClick={() => setActiveTab('出金')} className={`px-4 py-2 rounded ${activeTab === '出金' ? 'bg-pink-500 text-white' : 'bg-white border'}`}>出金管理</button>
        <button onClick={() => setActiveTab('分析')} className={`px-4 py-2 rounded ${activeTab === '分析' ? 'bg-pink-500 text-white' : 'bg-white border'}`}>アナリティクス</button>
      </div>

      {/* 投稿管理 */}
      {activeTab === '投稿' && (
        <form onSubmit={handlePostSubmit} className="space-y-4 mb-8">
          <input type="text" placeholder="タイトル" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border p-2 rounded" required />
          <textarea placeholder="説明文" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border p-2 rounded h-24" />
          <select value={mediaType} onChange={(e) => setMediaType(e.target.value)} className="w-full border p-2 rounded">
            <option value="image">画像</option>
            <option value="video">動画</option>
          </select>
          <input type="file" accept={mediaType === 'video' ? 'video/*' : 'image/*'} onChange={(e) => setMedia(e.target.files[0])} className="w-full" />
          <label className="block">
            <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} className="mr-2" />
            公開する
          </label>
          <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded">投稿</button>
        </form>
      )}

      {/* 商品管理 */}
      {activeTab === '商品' && (
        <form onSubmit={handleProductSubmit} className="space-y-4 mb-8">
          <input type="text" placeholder="商品名" value={productName} onChange={(e) => setProductName(e.target.value)} className="w-full border p-2 rounded" required />
          <input type="number" placeholder="価格 (円)" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} className="w-full border p-2 rounded" required />
          <input type="file" accept="image/*" onChange={(e) => setProductPreview(e.target.files[0])} className="w-full" />
          {productPreview && (
            <img src={URL.createObjectURL(productPreview)} alt="プレビュー" className="w-40 rounded" />
          )}
          <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded">出品</button>
        </form>
      )}

      {/* 出金管理 */}
      {activeTab === '出金' && (
        <div className="space-y-4">
          <p>現在の出金可能額: <span className="text-lg font-bold text-green-600">¥{totalEarnings}</span></p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">出金申請</button>
        </div>
      )}

      {/* アナリティクス */}
      {activeTab === '分析' && (
        <div className="bg-white rounded-lg shadow p-4 max-w-xl">
          <Line data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;