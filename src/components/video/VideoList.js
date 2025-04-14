// src/pages/content/VideoList.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { getVipRank } from '../../utils/vipUtils';
import VideoCard from '../../components/VideoCard';
import VideoFilterBar from '../../components/ui/VideoFilterBar';

const VideoList = () => {
  const [user] = useAuthState(auth);
  const [videos, setVideos] = useState([]);
  const [vipRank, setVipRank] = useState(0);
  const [filter, setFilter] = useState({ category: '', tag: '' });

  useEffect(() => {
    const fetchVipRank = async () => {
      if (user) {
        const rank = await getVipRank(user.uid);
        setVipRank(rank);
      }
    };
    fetchVipRank();
  }, [user]);

  useEffect(() => {
    const fetchVideos = async () => {
      const q = query(collection(db, 'videos'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const videoData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVideos(videoData);
    };
    fetchVideos();
  }, []);

  const filteredVideos = videos.filter(video => {
    const matchCategory = filter.category ? video.category === filter.category : true;
    const matchTag = filter.tag ? video.tags?.includes(filter.tag) : true;
    return matchCategory && matchTag;
  });

  return (
    <div className="px-4 py-6 max-w-screen-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">動画一覧</h1>
      <VideoFilterBar filter={filter} setFilter={setFilter} />
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {filteredVideos.map(video => (
          <VideoCard
            key={video.id}
            title={video.title}
            playbackUrl={vipRank >= 12 && video.dcPlaybackUrl ? video.dcPlaybackUrl : video.playbackUrl}
            thumbnail={video.thumbnail || ''}
            tags={video.tags || []}
            isVIP={vipRank >= 12}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoList;

