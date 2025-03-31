import React from 'react';
import VideoSkeleton from '../VideoSkeleton';

const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      {[...Array(6)].map((_, i) => (
        <VideoSkeleton key={i} />
      ))}
    </div>
  );
};

export default LoadingSkeleton;
