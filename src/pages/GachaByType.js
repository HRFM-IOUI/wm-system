import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import GachaResultModal from '../components/GachaResultModal';
import GachaStageRenderer from '../components/GachaStageRenderer';
import GachaStatusOverlay from '../components/GachaStatusOverlay';
import GachaTicketModal from '../components/GachaTicketModal';
import GachaHeader from '../components/GachaHeader';
import {
  drawGacha,
  fetchGachaItems,
  saveGachaResult,
  fetchUserTicketCount,
  consumeGachaTickets,
} from '../utils/gachaUtils';
import gachaConfigs from '../utils/gachaConfigs';
import '../assets/animatedBackground.css';

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
  const [ticketCount, setTicketCount] = useState(0);
  const [showStage, setShowStage] = useState(false);
  const [skipAnimation, setSkipAnimation] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // 🔇 ミュート状態

  useEffect(() => {
    if (!user) return navigate('/login');
    if (!config) return navigate('/gacha-select');

    const fetchData = async () => {
      const items = await fetchGachaItems(type);
      setGachaItems(items);
      const count = await fetchUserTicketCount(user.uid);
      setTicketCount(count);
    };
    fetchData();
  }, [user, navigate, type]);

  const handleDraw = (count) => {
    setGachaCount(count);
    setShowTicketModal(true);
  };

  const executeDraw = async () => {
    if (!user) return;
    if (ticketCount < gachaCount) {
      alert('チケットが不足しています');
      return;
    }

    try {
      await consumeGachaTickets(user.uid, gachaCount);
      setTicketCount(prev => prev - gachaCount);
      setShowTicketModal(false);
      setShowStage(true);

      // 🎵 BGM再生
      if (audioRef.current) {
        audioRef.current.muted = isMuted;
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => console.warn('BGM再生失敗:', e));
      }
    } catch (err) {
      console.error('チケット消費エラー:', err);
    }
  };

  const handleAnimationComplete = async () => {
    try {
      const results = await drawGacha(gachaItems, gachaCount);
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

      {/* 🎵 BGM 再生 */}
      <audio
        ref={audioRef}
        src={require('../assets/bgm/vip_theme_sample.mp3')}
        loop
      />

      <div className="relative z-10 flex flex-col items-center justify-start pt-24 space-y-4">
        <div className="text-black font-semibold">
          {config?.name || 'ガチャ'} 🎫 チケット: {ticketCount}
        </div>

        {/* 🔇 ミュート切り替え */}
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
            1回
          </button>
          <button
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded shadow"
            onClick={() => handleDraw(10)}
          >
            10回
          </button>
          <button
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded shadow"
            onClick={() => handleDraw(100)}
          >
            100回
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



























