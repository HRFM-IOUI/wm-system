import React from "react";
import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  return (
    <div className="rounded overflow-hidden shadow bg-white">
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          src={`https://iframe.mediadelivery.net/embed/${process.env.REACT_APP_BUNNY_LIBRARY_ID}/${video.videoId}`}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
          title={video.title}
        />
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-lg truncate">{video.title}</h3>
        <p className="text-gray-500 text-sm mt-1">カテゴリ: {video.category || "未設定"}</p>
        <Link
          to={`/video/${video.id}`}
          className="text-blue-500 hover:underline text-sm mt-2 inline-block"
        >
          詳細を見る
        </Link>
      </div>
    </div>
  );
};

export default VideoCard;
















