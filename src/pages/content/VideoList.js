import React, { useEffect, useState } from "react";
import { db } from "../../firebase"; // ← 修正済み
import { collection, getDocs } from "firebase/firestore";
import VideoPlayer from "../../components/video/VideoPlayer"; // ← 修正済み

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const querySnapshot = await getDocs(collection(db, "videos"));
      const videoData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVideos(videoData);
    };

    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">動画一覧</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.length === 0 ? (
          <p>投稿された動画はまだありません。</p>
        ) : (
          videos.map(video => (
            <div key={video.id} className="bg-white rounded shadow p-4">
              <h2 className="text-lg font-bold mb-2">{video.title}</h2>
              <VideoPlayer playbackUrl={video.playbackUrl} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VideoList;


