// src/components/dashboard/PurchaseRequestManager.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';

const PurchaseRequestManager = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    const snapshot = await getDocs(collection(db, 'purchaseRequests'));
    const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setRequests(list.filter(req => req.status === 'pending'));
    setLoading(false);
  };

  const handleApprove = async (request) => {
    if (!window.confirm('このリクエストを承認しますか？')) return;
    try {
      await updateDoc(doc(db, 'purchaseRequests', request.id), {
        status: 'approved',
        approvedAt: serverTimestamp(),
      });

      await addDoc(collection(db, 'orders'), {
        userId: request.userId,
        productId: request.productId,
        status: 'paid',
        amount: 0,
        createdAt: serverTimestamp(),
      });

      alert('承認しました');
      fetchRequests();
    } catch (error) {
      console.error('承認失敗:', error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) return <div className="p-4">読み込み中...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">未承認の決済リクエスト</h2>
      {requests.length === 0 ? (
        <p className="text-gray-600">未承認のリクエストはありません。</p>
      ) : (
        requests.map(req => (
          <div key={req.id} className="border p-4 rounded bg-white shadow">
            <p><span className="font-semibold">ユーザー:</span> {req.userId}</p>
            <p><span className="font-semibold">商品:</span> {req.productId}</p>
            <p><span className="font-semibold">方法:</span> {req.method}</p>
            <button
              onClick={() => handleApprove(req)}
              className="mt-2 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
            >
              承認する
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default PurchaseRequestManager;



