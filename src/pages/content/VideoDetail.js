import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { getUserVipStatus } from '../../utils/vipUtils';
import {
  checkUserHasPurchasedVideo,
  recordVideoPurchase
} from '../../utils/videoUtils';
import VideoPlayer from '../../components/video/VideoPlayer';

const VideoDetail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const isPreview = searchParams.get('preview') === 'true';

  const [user] = useAuthState(auth);
  const [video, setVideo] = useState(null);
  const [canWatch, setCanWatch] = useState(false);
  const [isVIP12, setIsVIP12] = useState(false);
  const [hasPurchased, setHasPurchased] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideoAndStatus = async () => {
      if (!id) return;
      setLoading(true);

      const snap = await getDoc(doc(db, 'videos', id));
      if (!snap.exists()) {
        setLoading(false);
        return;
      }
      const videoData = snap.data();
      setVideo(videoData);

      if (isPreview) {
        setCanWatch(true);
        setLoading(false);
        return;
      }

      if (!user) {
        setCanWatch(false);
        setLoading(false);
        return;
      }

      const vipStatus = await getUserVipStatus(user.uid);
      const purchased = await checkUserHasPurchasedVideo(user.uid, id);
      setHasPurchased(purchased);

      if (vipStatus.rank === 'VIP12') {
        setCanWatch(true);
        setIsVIP12(true);
      } else if (purchased) {
        setCanWatch(true);
      } else {
        setCanWatch(false);
      }

      setLoading(false);
    };

    fetchVideoAndStatus();
  }, [id, isPreview, user]);

  const handlePurchase = async () => {
    if (!user || !id) return;
    const success = await recordVideoPurchase(user.uid, id);
    if (success) {
      setCanWatch(true);
      setHasPurchased(true);
    }
  };

  if (loading) {
    return <div className="p-4 text-gray-600">読み込み中...</div>;
  }

  if (!video) {
    return <div className="p-4 text-red-500">動画が見つかりません</div>;
  }

  const videoUrl = isVIP12 && video.directorsCutUrl
    ? video.directorsCutUrl
    : video.playbackUrl;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 text-gray-800">
      {/* 上部レイアウト */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <VideoPlayer playbackUrl={videoUrl} />
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{video.title}</h1>
          {isVIP12 && (
            <span className="text-green-600 font-semibold">
              🎬 VIP限定：ディレクターズ・カット版
            </span>
          )}
          <p className="text-gray-600 text-sm">{video.description || '詳細情報はありません'}</p>

          {/* 価格エリア */}
          {!canWatch ? (
            <div className="space-y-3">
              <p className="text-lg text-red-500 font-bold">🔒 ロック解除が必要です</p>
              <a
                href="/subscribe"
                className="block bg-yellow-400 hover:bg-yellow-500 text-center text-black font-bold py-2 rounded"
              >
                💳 月額加入して視聴
              </a>
              {!hasPurchased && (
                <button
                  onClick={handlePurchase}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded"
                >
                  🛒 ¥500 で単品購入
                </button>
              )}
            </div>
          ) : (
            <p className="text-green-600 font-bold">✅ 視聴可能です</p>
          )}
        </div>
      </div>

      {/* 関連動画セクション（仮） */}
      <div className="mt-10">
        <h2 className="text-lg font-bold mb-2">📺 関連コンテンツ</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-gray-100 h-32 rounded shadow flex items-center justify-center text-gray-400 text-sm">
              サムネイル
            </div>
          ))}
        </div>
      </div>

      {/* レビューセクション（ダミー） */}
      <div className="mt-10">
        <h2 className="text-lg font-bold mb-2">⭐️ ユーザーレビュー</h2>
        <div className="space-y-2 text-sm">
          <p>「最高でした！演出が神」 - ユーザーA</p>
          <p>「VIP限定のカットが良かった」 - ユーザーB</p>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;










