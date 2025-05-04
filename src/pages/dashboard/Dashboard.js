// src/pages/dashboard/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
  orderBy
} from 'firebase/firestore';
import { auth, db } from '../../firebase';
import VideoCard from '../../components/VideoCard';
import ProductCard from '../../components/common/ProductCard'; // ✅ 修正済み
import VideoUploader from '../../components/video/VideoUploader';
import { deleteVideoFromBunny } from '../../utils/bunnyUtils';

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [videos, setVideos] = useState([]);
  const [products, setProducts] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const videoSnap = await getDocs(
        query(
          collection(db, 'videos'),
          where('ownerId', '==', user.uid),
          orderBy('createdAt', 'desc')
        )
      );
      const videoData = videoSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setVideos(videoData);

      const productSnap = await getDocs(
        query(
          collection(db, 'products'),
          where('ownerId', '==', user.uid),
          orderBy('createdAt', 'desc')
        )
      );
      const productData = productSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productData);
    };

    fetchData();
  }, [user]);

  const handleTogglePrivacy = async (videoId, isPrivate) => {
    try {
      await updateDoc(doc(db, 'videos', videoId), {
        isPrivate: !isPrivate
      });
      setVideos(prev =>
        prev.map(v =>
          v.id === videoId ? { ...v, isPrivate: !isPrivate } : v
        )
      );
    } catch (e) {
      console.error('公開状態変更エラー:', e);
    }
  };

  const handleDelete = async (videoId, docId) => {
    try {
      await deleteVideoFromBunny(videoId);
      await deleteDoc(doc(db, 'videos', docId));
      setVideos(prev => prev.filter(v => v.id !== docId));
    } catch (err) {
      alert('削除に失敗しました');
    }
  };

  const filteredVideos = videos.filter(v => {
    return (
      (filterType === 'all' || v.type === filterType) &&
      (!filterCategory || v.category === filterCategory)
    );
  });

  return (
    <div className="min-h-screen bg-white p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">ダッシュボード</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">動画投稿</h2>
        <VideoUploader />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">動画管理</h2>
        <div className="flex gap-4 mb-4">
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="all">すべて</option>
            <option value="sample">サンプル</option>
            <option value="main">本編</option>
            <option value="dmode">DMODE</option>
          </select>

          <input
            type="text"
            placeholder="カテゴリでフィルタ"
            className="border p-2 rounded"
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVideos.map(video => (
            <div key={video.id} className="bg-gray-50 rounded shadow p-4">
              <VideoCard video={video} isVipUser={true} />
              <div className="flex justify-between items-center mt-2">
                <button
                  onClick={() =>
                    handleTogglePrivacy(video.id, video.isPrivate)
                  }
                  className="text-sm text-blue-600 hover:underline"
                >
                  {video.isPrivate ? '公開にする' : '非公開にする'}
                </button>
                <button
                  onClick={() => handleDelete(video.videoId, video.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  削除
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mt-6 mb-2">商品管理</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              showOwnerControls={true}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

















