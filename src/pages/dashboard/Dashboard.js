// src/pages/dashboard/Dashboard.js
import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { deleteVideoFromBunny } from '../../utils/bunnyUtils';
import VideoPlayer from '../../components/video/VideoPlayer';
import Uploader from '../../components/video/Uploader'; // ← 追加

const Dashboard = () => {
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(collection(db, 'videos'), where('userId', '==', user.uid));
    const querySnapshot = await getDocs(q);
    const videoList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setVideos(videoList);
  };

  const handleDelete = async (guid) => {
    if (!window.confirm('本当に削除しますか？')) return;

    try {
      await deleteVideoFromBunny(guid);
      await deleteDoc(doc(db, 'videos', guid));
      setVideos((prev) => prev.filter((v) => v.guid !== guid));
    } catch (err) {
      console.error(err);
      alert('削除に失敗しました');
    }
  };

  const togglePublic = async (guid, current) => {
    try {
      const ref = doc(db, 'videos', guid);
      await updateDoc(ref, { isPublic: !current });
      setVideos((prev) =>
        prev.map((v) => (v.guid === guid ? { ...v, isPublic: !current } : v))
      );
    } catch (err) {
      console.error(err);
      alert('更新に失敗しました');
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold">マイ動画管理</h1>

      {/* 投稿フォーム */}
      <Uploader />

      {/* 投稿一覧 */}
      <div className="grid gap-4">
        {videos.length === 0 ? (
          <p>まだ動画がありません。</p>
        ) : (
          videos.map((video) => (
            <div
              key={video.guid}
              className="p-4 border rounded-xl shadow-sm bg-white space-y-2"
            >
              <p className="font-semibold">{video.title}</p>
              <VideoPlayer guid={video.guid} />
              <div className="flex gap-4 mt-2">
                <button
                  onClick={() => togglePublic(video.guid, video.isPublic)}
                  className={`px-3 py-1 rounded ${
                    video.isPublic ? 'bg-green-500' : 'bg-gray-400'
                  } text-white`}
                >
                  {video.isPublic ? '公開中' : '非公開'}
                </button>
                <button
                  onClick={() => handleDelete(video.guid)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  削除
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;























