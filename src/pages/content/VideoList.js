// src/pages/content/VideoList.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db } from '../../firebase';
import { auth } from '../../firebase';
import { deleteVideoFromBunny } from '../../utils/bunnyUtils';
import { getUserVipStatus } from '../../utils/vipUtils';
import VideoCard from '../../components/VideoCard';
import VideoFilterBar from '../../components/ui/VideoFilterBar';

const VideoList = () => {
  const [user] = useAuthState(auth);
  const [videos, setVideos] = useState([]);
  const [vipRank, setVipRank] = useState(0);
  const [filter, setFilter] = useState({ category: '', tag: '' });

  useEffect(() => {
    const fetchVideos = async () => {
      const snap = await getDocs(query(collection(db, 'videos'), orderBy('createdAt', 'desc')));
      const all = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // ログイン済みの場合、自分の動画または公開動画だけ表示
      const filtered = all.filter(v => !v.isPrivate || v.ownerId === user?.uid);
      setVideos(filtered);
    };

    if (user) {
      fetchVideos();
    }
  }, [user]);

  useEffect(() => {
    const fetchVip = async () => {
      if (user) {
        const status = await getUserVipStatus(user.uid);
        setVipRank(status?.rank === 'VIP12' ? 12 : 0);
      }
    };
    fetchVip();
  }, [user]);

  const handleTogglePrivacy = async (videoId, isPrivate) => {
    try {
      await updateDoc(doc(db, 'videos', videoId), { isPrivate: !isPrivate });
      setVideos(prev => prev.map(v => (v.id === videoId ? { ...v, isPrivate: !isPrivate } : v)));
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

  const filtered = videos.filter(v => {
    return (
      (!filter.category || v.category === filter.category) &&
      (!filter.tag || v.tags?.includes(filter.tag))
    );
  });

  return (
    <div className="min-h-screen bg-white text-gray-800 p-6 space-y-6">
      <h1 className="text-2xl font-bold">動画一覧</h1>
      <VideoFilterBar filter={filter} setFilter={setFilter} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <p className="text-gray-500">該当する動画がありません。</p>
        ) : (
          filtered.map(video => (
            <div key={video.id} className="bg-gray-50 rounded shadow p-4">
              <VideoCard
                video={{
                  ...video,
                  playbackUrl:
                    vipRank >= 12 && video.dcPlaybackUrl
                      ? video.dcPlaybackUrl
                      : video.playbackUrl,
                }}
              />

              {video.ownerId === user?.uid && (
                <div className="flex justify-between items-center mt-3">
                  <button
                    onClick={() => handleTogglePrivacy(video.id, video.isPrivate)}
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
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VideoList;








