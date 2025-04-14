import React from 'react';
import { useNavigate } from 'react-router-dom';

const VideoCard = ({ video, isSubscribed = false }) => {
  const navigate = useNavigate();

  const handleSamplePlay = () => {
    navigate(`/video/${video.id}?preview=true`);
  };

  const handleFullPlay = () => {
    navigate(`/video/${video.id}`);
  };

  const handlePurchaseClick = () => {
    // ここは将来的にモーダル化 or 商品ページに誘導予定
    alert('この機能は現在準備中です。');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* サムネイル or ダミー画像 */}
      {video.thumbnailUrl ? (
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-gray-600">
          No Image
        </div>
      )}

      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold">{video.title}</h2>
        <p className="text-sm text-gray-500">
          {video.description || '詳細情報はありません'}
        </p>

        {/* 💡 補足表示 */}
        <p className="text-xs text-pink-500">
          🆓 サンプル視聴可能（{video.sampleDuration || '30秒'}）
        </p>
        {video.vipOnly && (
          <span className="text-[10px] text-white bg-black px-2 py-0.5 rounded-full">
            VIP限定
          </span>
        )}

        {/* 📺 FANZA風3ボタン */}
        <div className="flex flex-col gap-2 mt-3">
          <button
            onClick={handleSamplePlay}
            className="bg-pink-500 text-white py-1 rounded hover:bg-pink-600"
          >
            ▶️ サンプル再生
          </button>

          {!isSubscribed ? (
            <button
              onClick={() => navigate('/subscribe')}
              className="bg-yellow-400 text-black py-1 rounded hover:bg-yellow-500"
            >
              💳 月額で見る
            </button>
          ) : (
            <button
              onClick={handleFullPlay}
              className="bg-green-600 text-white py-1 rounded hover:bg-green-700"
            >
              ✅ 月額会員 本編視聴
            </button>
          )}

          <button
            onClick={handlePurchaseClick}
            className="bg-blue-600 text-white py-1 rounded hover:bg-blue-700"
          >
            🛒 単品購入（準備中）
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;









