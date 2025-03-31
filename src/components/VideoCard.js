import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/video.css';

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/watch/${video.id}`);
  };

  return (
    <div onClick={handleClick} className="video-card cursor-pointer shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105">
      <video
        src={video.videoUrl}
        className="w-full h-48 object-cover"
        controls={false}
        muted
        loop
        onMouseOver={(e) => e.currentTarget.play()}
        onMouseOut={(e) => e.currentTarget.pause()}
      />
      <div className="p-3">
        <h3 className="font-semibold text-lg truncate">{video.title}</h3>
        <p className="text-sm text-gray-500 truncate">{video.description}</p>
        <p className="text-xs text-gray-400 mt-1">
          {formatDistanceToNow(new Date(video.createdAt?.toDate()))} 前
        </p>
      </div>
    </div>
  );
};

export default VideoCard;






