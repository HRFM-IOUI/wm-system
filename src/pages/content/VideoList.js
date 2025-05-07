import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import VideoCard from "../../components/VideoCard";

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const snap = await getDocs(
        query(collection(db, "videos"), orderBy("createdAt", "desc"))
      );
      const all = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setVideos(all);
    };

    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold mb-4">公開動画一覧</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.length === 0 ? (
          <p>動画が見つかりません。</p>
        ) : (
          videos.map((video) => <VideoCard key={video.id} video={video} />)
        )}
      </div>
    </div>
  );
};

export default VideoList;











