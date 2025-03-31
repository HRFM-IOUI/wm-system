import React from 'react';
import '../assets/styles/video.css';

const VideoSkeleton = () => {
  return (
    <div className="video-card skeleton animate-pulse rounded-lg overflow-hidden shadow-md">
      <div className="bg-gray-300 h-48 w-full" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default VideoSkeleton;

