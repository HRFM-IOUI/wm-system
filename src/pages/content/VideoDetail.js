// src/pages/content/VideoDetail.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const VideoDetail = ({ isVipUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      const docRef = doc(db, "videos", id);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setVideo({ id: snap.id, ...snap.data() });
      }
    };
    fetchVideo();
  }, [id]);

  if (!video) return <div className="p-4">読み込み中...</div>;

  const handleSubscribe = () => navigate("/subscribe");
  const handlePurchase = () => navigate(`/purchase/${video.id}`);
  const canPlay =
    isVipUser || video.type === "sample" || (!video.isPrivate && video.type === "sample");

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-4 bg-white shadow rounded">
      <h1 className="text-2xl font-bold">{video.title}</h1>
      <p className="text-gray-600 text-sm">
        カテゴリ: {video.category} / タイプ: {video.type}
      </p>

      {canPlay ? (
        video.playbackUrl ? (
          <video
            src={video.playbackUrl}
            controls
            className="w-full rounded"
          />
        ) : (
          <p>動画URLがありません</p>
        )
      ) : (
        <>
          {video.type === "main" && (
            <div className="p-4 border rounded bg-gray-50 text-center text-gray-700">
              この動画は月額会員限定です
              <button
                onClick={handleSubscribe}
                className="w-full py-2 mt-3 bg-pink-500 hover:bg-pink-600 text-white rounded"
              >
                月額会員になる
              </button>
            </div>
          )}
          {video.type === "dmode" && (
            <div className="p-4 border rounded bg-gray-50 text-center text-gray-700">
              この動画は単品購入が必要です
              <button
                onClick={handlePurchase}
                className="w-full py-2 mt-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded"
              >
                単品購入する
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VideoDetail;














