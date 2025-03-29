import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
//import GachaCard from '../components/GachaCard';//
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
import '../assets/animatedBackground.css';

const Gacha = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [gachaItems, setGachaItems] = useState([]);
  const [drawResults, setDrawResults] = useState([]);
  //const [isDrawing, setIsDrawing] = useState(false);//
  const [showResult, setShowResult] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [gachaCount, setGachaCount] = useState(1);
  const [ticketCount, setTicketCount] = useState(0);
  const [showStage, setShowStage] = useState(false);
  const [skipAnimation, setSkipAnimation] = useState(false);

  useEffect(() => {
    if (!user) return navigate('/login');
    const fetchData = async () => {
      const items = await fetchGachaItems();
      setGachaItems(items);
      const count = await fetchUserTicketCount(user.uid);
      setTicketCount(count);
    };
    fetchData();
  }, [user, navigate]);

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
    } catch (err) {
      console.error('チケット消費エラー:', err);
    }
  };

  const handleAnimationComplete = async () => {
    try {
      const results = await drawGacha(gachaItems, gachaCount);
      console.log('🎯 drawResults =', results); // ログ追跡用
      await saveGachaResult(user.uid, results);
      setDrawResults(results);
      setShowResult(true);
    } catch (err) {
      console.error('ガチャ実行エラー:', err);
    } finally {

      setShowStage(false);
      setSkipAnimation(false);
    }
  };

  const handleSkip = () => {
    setSkipAnimation(true);
    handleAnimationComplete();
  };

  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden">
      <div className="absolute inset-0 z-0 animated-background"></div>
      <GachaHeader />
      <GachaStatusOverlay />

      <div className="relative z-10 flex flex-col items-center justify-start pt-24 space-y-4">
        <div className="text-white">🎫 残りチケット: {ticketCount}</div>
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
          <>
            {console.log('📦 showResult true, drawResults =', drawResults)}
            <GachaResultModal
              results={drawResults}
              onClose={() => setShowResult(false)}
            />
          </>
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

export default Gacha;
























