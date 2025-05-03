// src/components/VideoCard.js

import React from "react";
import { useNavigate } from "react-router-dom";

const VideoCard = ({ video, isVipUser }) => {
  const navigate = useNavigate();

  const handleSubscribe = () => {
    navigate("/subscribe");
  };

  const handleDetail = () => {
    navigate(`/video/${video.id}`);
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition">
      <h2 className="text-lg font-bold mb-2">{video.title}</h2>

      {video.thumbnailUrl && (
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full rounded mb-2"
        />
      )}

      {video.playbackUrl && isVipUser && (
        <video
          src={video.playbackUrl}
          controls
          className="w-full rounded mb-2"
        />
      )}

      <button
        onClick={handleDetail}
        className="w-full py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded mb-2"
      >
        詳細を見る
      </button>

      {/* 👇 未加入者にサブスク導線表示 */}
      {!isVipUser && (
        <button
          onClick={handleSubscribe}
          className="w-full py-2 text-sm bg-pink-500 hover:bg-pink-600 text-white rounded"
        >
          有料会員になる（今すぐ加入）
        </button>
      )}
    </div>
  );
};

export default VideoCard;










