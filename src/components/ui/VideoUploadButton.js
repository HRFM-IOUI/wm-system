import React from 'react';
import { useNavigate } from 'react-router-dom';

const VideoUploadButton = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center p-4">
      <button
        onClick={() => navigate('/upload')}
        className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl shadow transition"
      >
        動画を投稿
      </button>
    </div>
  );
};

export default VideoUploadButton;
