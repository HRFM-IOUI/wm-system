// src/pages/gacha/GachaByType.js
// ガチャをポイント制にし、1等当選時のサブスク特典も付与
// 配色はほぼ既存のまま

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import GachaResultModal from '../../components/gacha/GachaResultModal';
import GachaStageRenderer from '../../components/gacha/GachaStageRenderer';
import GachaStatusOverlay from '../../components/gacha/GachaStatusOverlay';
import GachaTicketModal from '../../components/gacha/GachaTicketModal';
import GachaHeader from '../../components/gacha/GachaHeader';
import {
  drawGacha,
  fetchGachaItems,
  saveGachaResult,
} from '../../utils/gachaUtils';
import { getUserVipStatus, recordGachaPlay } from '../../utils/vipUtils';
import gachaConfigs from '../../utils/gachaConfigs';
import '../../assets/animatedBackground.css';

const GachaByType = () => {
  const [user] = useAuthState(auth);
  const { type } = useParams();
  const navigate = useNavigate();

  const config = gachaConfigs[type];
  const audioRef = useRef(null);

  const [gachaItems, setGachaItems] = useState([]);
  const [drawResults, setDrawResults] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [gachaCount, setGachaCount] = useState(1);
  const [points, setPoints] = useState(0);
  const [rank, setRank] = useState('');
  const [gachaTotal, setGachaTotal] = useState(0);
  const [spent, setSpent] = useState(0);
  const [showStage, setShowStage] = useState(false);
  const [skipAnimation, setSkipAnimation] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!user) return navigate('/login');
    if (!config) return navigate('/gacha-select');

    const fetchData = async () => {
      const items = await fetchGachaItems(type);
      setGachaItems(items);
      const status = await getUserVipStatus(user.uid);
      setPoints(status.points || 0);
      setRank(status.rank || '');
      setGachaTotal(status.gachaCount || 0);
      setSpent(status.totalSpent || 0);
    };
    fetchData();
  }, [user, navigate, type, config]);

  const handleDraw = (count) => {
    setGachaCount(count);
    setShowTicketModal(true);
  };

  const executeDraw = async () => {
    if (!user) return;
    const cost = gachaCount * 500;
    if (points < cost) {
      alert(`ポイントが不足しています（必要: ${cost}pt）`);
      return;
    }

    try {
      setPoints(prev => prev - cost);
      await recordGachaPlay(user.uid);
      setShowTicketModal(false);
      setShowStage(true);

      if (audioRef.current) {
        audioRef.current.muted = isMuted;
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => console.warn('BGM再生失敗:', e));
      }
    } catch (err) {
      console.error('ポイント消費エラー:', err);
    }
  };

  const handleAnimationComplete = async () => {
    try {
      const results = await drawGacha(gachaItems, gachaCount, user.uid);
      await saveGachaResult(user.uid, results);
      setDrawResults(results);
      setShowResult(true);
    } catch (err) {
      console.error('ガチャ実行エラー:', err);
    } finally {
      setShowStage(false);
      setSkipAnimation(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  };

  const handleSkip = () => {
    setSkipAnimation(true);
    handleAnimationComplete();
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-white overflow-hidden">
      <div className="absolute inset-0 z-0 animated-background"></div>
      <GachaHeader />
      <GachaStatusOverlay />

      <audio
        ref={audioRef}
        src={require('../../assets/bgm/vip_theme_sample.mp3')}
        loop
      />

      <div className="relative z-10 flex flex-col items-center justify-start pt-24 space-y-4">
        <div className="text-black font-semibold text-center">
          <div>{config?.name || 'ガチャ'} 💰 ポイント: {points}</div>
          <div className="text-sm mt-1">
            🏅 VIPランク: {rank} ／ 🎰 累計ガチャ: {gachaTotal}回 ／ 💸 課金累計: ¥{spent}
          </div>
        </div>

        <button
          className="text-sm text-pink-600 underline hover:text-pink-800"
          onClick={toggleMute}
        >
          BGM {isMuted ? 'ONにする' : 'ミュートにする'}
        </button>

        <div className="flex gap-4">
          <button
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded shadow"
            onClick={() => handleDraw(1)}
          >
            1回（500pt）
          </button>
          <button
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded shadow"
            onClick={() => handleDraw(10)}
          >
            10回（5000pt）
          </button>
          <button
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded shadow"
            onClick={() => handleDraw(100)}
          >
            100回（50000pt）
          </button>
        </div>

        {showStage && (
          <GachaStageRenderer
            onComplete={handleAnimationComplete}
            skip={skipAnimation}
            onSkip={handleSkip}
          />
        )}

        {showResult && (
          <GachaResultModal
            results={drawResults}
            onClose={() => setShowResult(false)}
          />
        )}

        {showTicketModal && (
          <GachaTicketModal
            count={gachaCount}
            onConfirm={executeDraw}
            onClose={() => setShowTicketModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default GachaByType;































