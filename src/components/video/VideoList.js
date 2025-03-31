import React from "react";
import VideoCard from "../../components/VideoCard";
import VideoSkeleton from "../../components/VideoSkeleton";

const VideoList = ({ videos, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <VideoSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!videos.length) {
    return <p className="text-center text-gray-500">動画が見つかりませんでした。</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
};

export default VideoList;
