// src/components/VideoCard.js
import React from "react";
import { useNavigate } from "react-router-dom";

const VideoCard = ({ video, isVipUser }) => {
  const navigate = useNavigate();

  const handleDetail = () => {
    navigate(`/video/${video.id}`);
  };

  const handleSubscribe = () => {
    navigate("/subscribe");
  };

  const handlePurchase = () => {
    navigate(`/purchase/${video.id}`);
  };

  const showSample = video.type === "sample";
  const showMain = video.type === "main";
  const showDmode = video.type === "dmode";

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

      <div className="space-y-2">
        {showSample && (
          <button
            onClick={handleDetail}
            className="w-full py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded"
          >
            サンプル視聴
          </button>
        )}

        {showMain && (
          <button
            onClick={isVipUser ? handleDetail : handleSubscribe}
            className={`w-full py-2 text-sm rounded text-white ${
              isVipUser ? "bg-green-500 hover:bg-green-600" : "bg-pink-500 hover:bg-pink-600"
            }`}
          >
            {isVipUser ? "視聴する" : "月額会員で視聴"}
          </button>
        )}

        {showDmode && (
          <button
            onClick={handlePurchase}
            className="w-full py-2 text-sm bg-indigo-500 hover:bg-indigo-600 text-white rounded"
          >
            単品購入へ
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoCard;














