// src/pages/content/VideoDetail.js

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

      // Firestoreから動画データ取得
      const docRef = doc(db, 'videos', id);
      const snap = await getDoc(docRef);
      if (!snap.exists()) {
        setLoading(false);
        return;
      }
      const videoData = snap.data();
      setVideo(videoData);

      // プレビュー用パラメータによりサンプル視聴を許可
      if (isPreview) {
        setCanWatch(true);
        setLoading(false);
        return;
      }

      // ログインしていない場合は視聴不可
      if (!user) {
        setCanWatch(false);
        setLoading(false);
        return;
      }

      // VIPステータス取得
      const vipStatus = await getUserVipStatus(user.uid);
      // 単品購入済みかどうか
      const purchased = await checkUserHasPurchasedVideo(user.uid, id);
      setHasPurchased(purchased);

      // VIP12 なら無修正版視聴可
      if (vipStatus.rank === 'VIP12') {
        setCanWatch(true);
        setIsVIP12(true);
      }
      // VIPでなくても単品購入していれば視聴可
      else if (purchased) {
        setCanWatch(true);
      }
      // どちらでもなければ視聴不可
      else {
        setCanWatch(false);
      }

      setLoading(false);
    };

    fetchVideoAndStatus();
  }, [id, isPreview, user]);

  // 単品購入ボタン処理
  const handlePurchase = async () => {
    if (!user || !id) return;
    const success = await recordVideoPurchase(user.uid, id);
    if (success) {
      setCanWatch(true);
      setHasPurchased(true);
    }
  };

  // 読み込み中
  if (loading) {
    return <div className="p-4 text-gray-600">読み込み中...</div>;
  }

  // 動画が存在しない
  if (!video) {
    return <div className="p-4 text-red-500">動画が見つかりません</div>;
  }

  // 視聴不可の場合
  if (!canWatch) {
    return (
      <div className="p-4 text-center text-gray-700">
        <h2 className="text-xl font-bold mb-4">
          この動画は視聴できません
        </h2>
        <p>サンプル版のみご視聴いただけます。</p>
        <div className="mt-4 space-y-2">
          <a
            href="/subscribe"
            className="block text-blue-600 underline hover:text-blue-800"
          >
            月額プランを見る
          </a>
          {!hasPurchased && (
            <button
              onClick={handlePurchase}
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
            >
              🛒 単品購入して視聴する
            </button>
          )}
        </div>
      </div>
    );
  }

  // VIP12の場合ディレクターズカット優先、無いなら通常版
  const videoUrl = isVIP12 && video.directorsCutUrl
    ? video.directorsCutUrl
    : video.playbackUrl;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4 text-gray-800">
      <h1 className="text-xl font-bold">{video.title}</h1>
      <video
        controls
        className="w-full rounded shadow"
        src={videoUrl}
      />

      <p className="text-sm text-gray-600">
        {video.description || '詳細情報はありません'}
      </p>

      {isVIP12 && (
        <div className="text-green-600 font-bold">
          🎬 VIP限定：ディレクターズ・カット版を視聴中
        </div>
      )}
    </div>
  );
};

export default VideoDetail;







