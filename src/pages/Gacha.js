// src/pages/Gacha.js
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import GachaStageRenderer from '../components/GachaStageRenderer';
import GachaResultModal from '../components/GachaResultModal';
import GachaTicketModal from '../components/GachaTicketModal';
import GachaStatusOverlay from '../components/GachaStatusOverlay';
import { drawGacha, saveGachaResult } from '../utils/gachaUtils';
import { getUserVipStatus } from '../utils/vipUtils';

const Gacha = () => {
  const [user] = useAuthState(auth);
  const [gachaResults, setGachaResults] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [drawCount, setDrawCount] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);
  const [vipRank, setVipRank] = useState('');
  const [ticketCount, setTicketCount] = useState(100);
  const [showNoTicketModal, setShowNoTicketModal] = useState(false);

  useEffect(() => {
    if (user) {
      getUserVipStatus(user.uid).then(setVipRank);
    }
  }, [user]);

  const executeDraw = async () => {
    if (!user) return;
    if (ticketCount < drawCount) {
      setShowNoTicketModal(true);
      return;
    }
    setShowConfirm(false);
    setShowAnimation(true);

    setTimeout(async () => {
      const results = await drawGacha(drawCount, 'default_gacha_2025');
      setTicketCount(prev => prev - drawCount);
      await saveGachaResult(user.uid, results);
      setGachaResults(results);
      setShowAnimation(false);
      setShowResult(true);
    }, 6000);
  };

  const handleDrawClick = (count) => {
    if (!user) {
      alert('ログインが必要です');
      return;
    }
    setDrawCount(count);
    setShowConfirm(true);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-yellow-900 text-white overflow-hidden">
      <GachaStatusOverlay user={user} ticketCount={ticketCount} vipRank={vipRank} />

      <div className="flex flex-col items-center justify-center pt-32">
        <div className="flex gap-4 mb-6">
          <button onClick={() => handleDrawClick(1)} className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-lg">
            1連ガチャ
          </button>
          <button onClick={() => handleDrawClick(10)} className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg">
            10連ガチャ
          </button>
          <button onClick={() => handleDrawClick(100)} className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg">
            100連ガチャ
          </button>
        </div>
      </div>

      {showConfirm && (
        <GachaTicketModal
          count={drawCount}
          onConfirm={executeDraw}
          onClose={() => setShowConfirm(false)}
        />
      )}

      {showAnimation && (
        <GachaStageRenderer
          username={user?.displayName || '冒険者'}
          onSkip={() => {
            setShowAnimation(false);
            executeDraw();
          }}
          onComplete={() => {
            setShowAnimation(false);
            setShowResult(true);
          }}
        />
      )}

      {showResult && (
        <GachaResultModal
          results={gachaResults}
          onClose={() => setShowResult(false)}
        />
      )}

      {showNoTicketModal && (
        <GachaTicketModal
          noTicket
          onClose={() => setShowNoTicketModal(false)}
        />
      )}
    </div>
  );
};

export default Gacha;


