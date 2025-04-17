// src/components/ui/DailyBonusBanner.js
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { grantLoginBonus } from '../../utils/vipUtils';

const DailyBonusBanner = () => {
  const [user] = useAuthState(auth);
  const [status, setStatus] = useState('loading');
  const [pointsEarned, setPointsEarned] = useState(0);

  useEffect(() => {
    const applyBonus = async () => {
      if (!user) {
        setStatus('noUser');
        return;
      }
      try {
        const bonus = await grantLoginBonus(user.uid);
        if (bonus === null) {
          // 同日に既に受け取り済み
          setStatus('already');
        } else if (typeof bonus === 'number') {
          setPointsEarned(bonus);
          setStatus('granted');
        }
      } catch (err) {
        console.error('ログインボーナス取得失敗:', err);
        setStatus('error');
      }
    };
    applyBonus();
  }, [user]);

  if (status === 'loading' || status === 'noUser') return null;

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 px-4 py-3 mb-4 shadow rounded">
      {status === 'granted' && (
        <p className="font-semibold">
          🎉 ログインボーナス +{pointsEarned}pt を獲得しました！
        </p>
      )}
      {status === 'already' && (
        <p>📅 本日のログインボーナスはすでに受け取り済みです。</p>
      )}
      {status === 'error' && (
        <p>⚠️ ボーナスの取得中にエラーが発生しました。（詳細はコンソール確認）</p>
      )}
    </div>
  );
};

export default DailyBonusBanner;



