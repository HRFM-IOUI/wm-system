// src/pages/user/Mypage.js
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import { getGachaHistory } from '../../utils/gachaUtils';
import { useNavigate, Link } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

const Mypage = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (!user) return navigate('/login');

    const fetchData = async () => {
      try {
        const results = await getGachaHistory(user.uid);
        setHistory(results);

        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().isOwner) {
          setIsOwner(true);
        }
      } catch (err) {
        console.error('データ取得エラー:', err);
      }
    };

    fetchData();
  }, [user, navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      const q = query(collection(db, 'orders'), where('userId', '==', user.uid));
      const snapshot = await getDocs(q);
      const detailedOrders = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const data = docSnap.data();
          const items = data.items || [];
          return {
            id: docSnap.id,
            ...data,
            items,
          };
        })
      );
      setOrders(detailedOrders);
      setLoadingOrders(false);
    };

    fetchOrders();
  }, [user]);

  return (
    <div className="min-h-screen p-6 bg-gray-100 text-black space-y-6">
      <h1 className="text-2xl font-bold">マイページ</h1>

      <div className="bg-white rounded shadow p-4">
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
        <h2 className="text-lg font-semibold mb-2">購入履歴</h2>
        {loadingOrders ? (
          <p className="text-gray-500">読み込み中...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-500">購入履歴がありません。</p>
        ) : (
          <ul className="space-y-4">
            {orders.map(order => (
              <li key={order.id} className="border p-3 rounded bg-gray-50">
                <p className="font-semibold mb-1">注文日時: {order.createdAt?.toDate().toLocaleString() || '不明'}</p>
                <p className="text-sm text-gray-600 mb-1">ステータス: {order.status}</p>
                <div className="text-sm space-y-1">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between">
                      <span>{item.title || '商品名不明'} × {item.quantity || 1}</span>
                      <span>¥{item.price}</span>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
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



