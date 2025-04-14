// src/components/dashboard/OrderManager.js
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, updateDoc, doc, query, orderBy } from 'firebase/firestore';

const OrderManager = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('pending');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(list);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    await updateDoc(doc(db, 'orders', id), { status: newStatus });
    setOrders(prev => prev.map(order => order.id === id ? { ...order, status: newStatus } : order));
  };

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">📦 発送管理</h2>

      <div className="flex gap-2">
        {['pending', 'shipped', 'completed', 'all'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1 rounded border ${filter === status ? 'bg-blue-600 text-white' : 'bg-white'}`}
          >
            {status === 'all' ? '全て' : status.toUpperCase()}
          </button>
        ))}
      </div>

      {loading ? (
        <p>読み込み中...</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-600">注文が見つかりません</p>
      ) : (
        <div className="space-y-4">
          {filtered.map(order => (
            <div key={order.id} className="p-4 border rounded bg-white">
              <p><strong>名前:</strong> {order.name}</p>
              <p><strong>住所:</strong> {order.postalCode} {order.address} {order.building}</p>
              <p><strong>電話:</strong> {order.phone}</p>
              <p><strong>メール:</strong> {order.email}</p>
              <p><strong>ステータス:</strong> {order.status}</p>
              <div className="mt-2 space-x-2">
                <button onClick={() => handleStatusChange(order.id, 'shipped')} className="px-2 py-1 bg-yellow-500 text-white rounded">発送済みに</button>
                <button onClick={() => handleStatusChange(order.id, 'completed')} className="px-2 py-1 bg-green-600 text-white rounded">完了に</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderManager;
