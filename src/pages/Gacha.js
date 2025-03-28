import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import GachaHeader from '../components/GachaHeader';
import GachaStatusOverlay from '../components/GachaStatusOverlay';
import GachaTicketModal from '../components/GachaTicketModal';
import GachaStageRenderer from '../components/GachaStageRenderer';
import GachaResultModal from '../components/GachaResultModal';
import {
  drawGacha,
  fetchGachaItems,
  saveGachaResult,
} from '../utils/gachaUtils';
import '../assets/animatedBackground.css';

const Gacha = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [gachaItems, setGachaItems] = useState([]);
  const [drawResults, setDrawResults] = useState([]);
  const [gachaCount, setGachaCount] = useState(1);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showStage, setShowStage] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [skipAnimation, setSkipAnimation] = useState(false);

  useEffect(() => {
    if (!user) return navigate('/login');
    const fetchData = async () => {
      const items = await fetchGachaItems();
      setGachaItems(items);
    };
    fetchData();
  }, [user, navigate]);

  const handleDraw = (count) => {
    setGachaCount(count);
    setShowTicketModal(true);
  };

  const executeDraw = async () => {
    if (!user) return;
    setShowTicketModal(false);
    setShowStage(true);
    setIsDrawing(true);

    const results = await drawGacha(gachaItems, gachaCount);
    await saveGachaResult(user.uid, results);
    setDrawResults(results);

    if (!skipAnimation) {
      setTimeout(() => {
        setShowStage(false);
        setShowResult(true);
        setIsDrawing(false);
        setSkipAnimation(false);
      }, 6000);
    } else {
      setShowStage(false);
      setShowResult(true);
      setIsDrawing(false);
      setSkipAnimation(false);
    }
  };

  const handleSkip = () => {
    setSkipAnimation(true);
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 z-0 animated-background"></div>

      <GachaHeader />
      <GachaStatusOverlay />

      <div className="relative z-10 pt-24 flex flex-col items-center gap-4">
        <div className="flex gap-4">
          <button className="bg-pink-600 px-4 py-2 rounded" onClick={() => handleDraw(1)}>1回</button>
          <button className="bg-pink-600 px-4 py-2 rounded" onClick={() => handleDraw(10)}>10回</button>
          <button className="bg-pink-600 px-4 py-2 rounded" onClick={() => handleDraw(100)}>100回</button>
        </div>

        {showTicketModal && (
          <GachaTicketModal
            count={gachaCount}
            onConfirm={executeDraw}
            onClose={() => setShowTicketModal(false)}
          />
        )}

        {showStage && (
          <GachaStageRenderer
            onComplete={executeDraw}
            onSkip={handleSkip}
            skip={skipAnimation}
          />
        )}

        {showResult && (
          <GachaResultModal
            results={drawResults}
            onClose={() => setShowResult(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Gacha;










