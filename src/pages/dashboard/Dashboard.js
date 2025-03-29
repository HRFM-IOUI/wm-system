import React, { useState, useEffect } from 'react';
import ProductPost from '../../components/common/ProductPost';
import VideoUploader from '../../components/video/VideoUploader';
import VideoPlayer from '../../components/video/VideoPlayer';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [videoList, setVideoList] = useState([]);

  const dummyPosts = [
    { id: 1, title: '初めての投稿', type: '動画', sales: 12, revenue: 3600 },
    { id: 2, title: '2作目のコンテンツ', type: '画像', sales: 8, revenue: 2400 },
  ];

  const chartData = {
    labels: ['1月', '2月', '3月', '4月'],
    datasets: [
      {
        label: '売上 (¥)',
        data: [12000, 19000, 3000, 5000],
        backgroundColor: 'rgba(236, 72, 153, 0.6)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: '月別売上推移' },
    },
  };

  useEffect(() => {
    if (activeTab === 'video') {
      const fetchVideos = async () => {
        const querySnapshot = await getDocs(collection(db, 'videos'));
        const videos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setVideoList(videos);
      };
      fetchVideos();
    }
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <div className="space-y-4">
            {dummyPosts.map(post => (
              <div key={post.id} className="border rounded p-4 shadow-sm bg-white">
                <h3 className="text-lg font-bold">{post.title}</h3>
                <p className="text-sm text-gray-600">{post.type}</p>
                <div className="text-sm mt-2">
                  販売数: <span className="font-semibold">{post.sales}</span><br />
                  売上: <span className="font-semibold">¥{post.revenue}</span>
                </div>
              </div>
            ))}
          </div>
        );
      case 'product':
        return <ProductPost />;
      case 'withdraw':
        return (
          <div className="bg-white p-4 rounded shadow">
            <p className="mb-2">現在の出金可能額:</p>
            <h3 className="text-2xl font-bold text-pink-600 mb-4">¥12,400</h3>
            <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition">
              出金申請する
            </button>
          </div>
        );
      case 'analytics':
        return (
          <div className="bg-white p-4 rounded shadow">
            <Bar data={chartData} options={chartOptions} />
          </div>
        );
      case 'video':
        return (
          <div className="space-y-6">
            <VideoUploader ownerId="dummyOwnerId" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {videoList.map(video => (
                <div key={video.id} className="bg-white p-4 rounded shadow">
                  <h3 className="font-bold text-lg">{video.title}</h3>
                  <VideoPlayer playbackUrl={video.playbackUrl} />
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* 左タブ */}
      <aside className="w-full md:w-1/4 bg-white shadow p-4 space-y-4">
        <h2 className="text-xl font-bold mb-4">ダッシュボード</h2>
        <button onClick={() => setActiveTab('posts')} className={`block w-full text-left px-4 py-2 rounded ${activeTab === 'posts' ? 'bg-pink-500 text-white' : 'hover:bg-gray-100'}`}>
          投稿管理
        </button>
        <button onClick={() => setActiveTab('product')} className={`block w-full text-left px-4 py-2 rounded ${activeTab === 'product' ? 'bg-pink-500 text-white' : 'hover:bg-gray-100'}`}>
          商品出品
        </button>
        <button onClick={() => setActiveTab('withdraw')} className={`block w-full text-left px-4 py-2 rounded ${activeTab === 'withdraw' ? 'bg-pink-500 text-white' : 'hover:bg-gray-100'}`}>
          出金管理
        </button>
        <button onClick={() => setActiveTab('analytics')} className={`block w-full text-left px-4 py-2 rounded ${activeTab === 'analytics' ? 'bg-pink-500 text-white' : 'hover:bg-gray-100'}`}>
          アナリティクス
        </button>
        <button onClick={() => setActiveTab('video')} className={`block w-full text-left px-4 py-2 rounded ${activeTab === 'video' ? 'bg-pink-500 text-white' : 'hover:bg-gray-100'}`}>
          動画投稿
        </button>
      </aside>

      {/* メイン表示エリア */}
      <main className="flex-1 p-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
