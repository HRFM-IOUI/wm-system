// src/pages/ThankYou.js
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { recordVideoPurchase } from '../utils/videoUtils';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const ThankYouPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (!sessionId || !user) {
      setError('ユーザー情報またはセッションIDが不足しています');
      setLoading(false);
      return;
    }

    const verifyAndRecord = async () => {
      try {
        const response = await fetch('https://shrill-unit-35d4.ik39-10vevic.workers.dev', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId }),
        });

        const result = await response.json();
        if (response.ok && result.videoId) {
          const success = await recordVideoPurchase(user.uid, result.videoId);
          if (success) {
            navigate(`/video/${result.videoId}`);
          } else {
            throw new Error('購入記録に失敗しました');
          }
        } else {
          throw new Error(result.error || 'セッション検証に失敗しました');
        }
      } catch (err) {
        console.error('検証エラー:', err);
        setError('セッションの検証中にエラーが発生しました');
        setLoading(false);
      }
    };

    verifyAndRecord();
  }, [searchParams, navigate, user]);

  return (
    <div className="p-6 text-center">
      {loading ? (
        <p>セッション確認中...</p>
      ) : (
        <p className="text-red-500">{error}</p>
      )}
    </div>
  );
};

export default ThankYouPage;






