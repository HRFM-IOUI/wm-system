import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { getGachaHistory } from '../utils/gachaUtils';
import { getUserVipStatus } from '../utils/vipUtils';

const Mypage = () => {
  const [user, setUser] = useState(null);
  const [vipRank, setVipRank] = useState('ブロンズ');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const rank = await getUserVipStatus(user.uid);
        setVipRank(rank);
        const logs = await getGachaHistory(user.uid);
        setHistory(logs);
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">マイページ</h2>
        <p className="text-gray-700 mb-2">ユーザー名: {user?.displayName}</p>
        <p className="text-gray-700 mb-4">VIPランク: {vipRank}</p>

        <h3 className="text-xl font-semibold mb-2">ガチャ履歴（最新10件）</h3>
        {history.length === 0 ? (
          <p className="text-sm text-gray-500">履歴はまだありません。</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {history.map((entry, i) => (
              <div key={i} className="bg-white border rounded-lg shadow p-3">
                {entry.result?.map((item, idx) => (
                  <div key={idx} className="text-xs mb-1">
                    <span className="font-bold">{item.name}</span>（{item.rarity}）
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Mypage;