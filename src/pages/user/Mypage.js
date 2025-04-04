import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import { getGachaHistory } from '../../utils/gachaUtils';
import { useNavigate, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';

const Mypage = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (!user) return navigate('/login');

    const fetchData = async () => {
      try {
        const results = await getGachaHistory(user.uid);
        setHistory(results);

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        console.log("ユーザードキュメント:", docSnap.data());
        if (docSnap.exists() && docSnap.data().isOwner) {
          setIsOwner(true);
        }
      } catch (err) {
        console.error('データ取得エラー:', err);
      }
    };

    fetchData();
  }, [user, navigate]);

  return (
    <div className="min-h-screen p-6 bg-gray-100 text-black">
      <h1 className="text-2xl font-bold mb-4">マイページ</h1>

      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">プロフィール</h2>
        {user ? (
          <div className="space-y-2">
            <p><strong>表示名:</strong> {user.displayName || '名無しユーザー'}</p>
            <p><strong>メール:</strong> {user.email}</p>

            {isOwner && (
              <div className="mt-4">
                <Link to="/dashboard" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  管理画面へ
                </Link>
              </div>
            )}
          </div>
        ) : (
          <p>ログイン情報が取得できませんでした。</p>
        )}
      </div>

      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">最近のガチャ履歴</h2>
        {history.length === 0 ? (
          <p className="text-gray-500">履歴がありません。</p>
        ) : (
          <ul className="space-y-4">
            {history.map((entry, index) => (
              <li key={index} className="border p-3 rounded bg-gray-50">
                <p className="text-sm text-gray-600 mb-2">
                  {entry.timestamp?.toDate().toLocaleString()}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {entry.results.map((item, i) => (
                    <div key={i} className="text-center">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-contain mx-auto" />
                      ) : (
                        <div className="w-16 h-16 bg-gray-300 flex items-center justify-center mx-auto text-sm text-gray-600 rounded">
                          No Img
                        </div>
                      )}
                      <p className="text-xs mt-1">{item.name}</p>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Mypage;


