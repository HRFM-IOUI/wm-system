// src/components/dashboard/PaymentLinkManager.js
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp
} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';

const PaymentLinkManager = () => {
  const [links, setLinks] = useState([]);
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [creating, setCreating] = useState(false);
  const [user] = useAuthState(auth);

  const fetchLinks = async () => {
    const snap = await getDocs(collection(db, 'paymentLinks'));
    const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setLinks(data);
  };

  const handleCreate = async () => {
    if (!user || !url) return;
    try {
      setCreating(true);
      await addDoc(collection(db, 'paymentLinks'), {
        url,
        description,
        createdAt: serverTimestamp(),
        ownerId: user.uid,
      });
      setUrl('');
      setDescription('');
      fetchLinks();
    } catch (err) {
      console.error('リンク作成エラー:', err);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('このリンクを削除しますか？')) return;
    try {
      await deleteDoc(doc(db, 'paymentLinks', id));
      fetchLinks();
    } catch (err) {
      console.error('削除エラー:', err);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">決済リンク管理</h2>
      <div className="bg-white p-4 rounded shadow space-y-2">
        <input
          type="url"
          placeholder="決済リンクURL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          placeholder="説明 (任意)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <button
          onClick={handleCreate}
          disabled={creating}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {creating ? '作成中...' : 'リンク作成'}
        </button>
      </div>

      <div className="space-y-4">
        {links.length === 0 ? (
          <p className="text-gray-600">登録されたリンクはありません。</p>
        ) : (
          links.map(link => (
            <div key={link.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
              <div>
                <p className="text-blue-600 underline break-all">
                  <a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a>
                </p>
                {link.description && <p className="text-sm text-gray-600 mt-1">{link.description}</p>}
              </div>
              <button
                onClick={() => handleDelete(link.id)}
                className="text-red-500 text-sm hover:underline"
              >削除</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PaymentLinkManager;

