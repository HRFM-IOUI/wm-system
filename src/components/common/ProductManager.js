// src/components/common/ProductManager.js
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';

const ProductManager = () => {
  const [user] = useAuthState(auth);
  const [products, setProducts] = useState([]);
  const [editStates, setEditStates] = useState({});

  useEffect(() => {
    if (!user) return;
    const fetchProducts = async () => {
      const q = query(collection(db, 'products'), where('ownerId', '==', user.uid));
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(items);
    };
    fetchProducts();
  }, [user]);

  const toggleEdit = (id) => {
    setEditStates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleChange = (id, field, value) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const handleSave = async (product) => {
    try {
      const ref = doc(db, 'products', product.id);
      await updateDoc(ref, {
        title: product.title,
        description: product.description,
        price: Number(product.price),
      });
      toggleEdit(product.id);
    } catch (error) {
      console.error('保存失敗:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('本当に削除しますか？')) return;
    try {
      await deleteDoc(doc(db, 'products', id));
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('削除失敗:', error);
    }
  };

  const handleDummyPurchase = async (product) => {
    if (!user) return;
    try {
      await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        productId: product.id,
        amount: product.price,
        createdAt: serverTimestamp(),
        status: 'paid'
      });
      alert('ダミー購入完了（orders に追加）');
    } catch (error) {
      console.error('購入処理エラー:', error);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">出品一覧</h2>
      {products.map(product => (
        <div key={product.id} className="bg-white p-4 rounded shadow space-y-2">
          {editStates[product.id] ? (
            <>
              <input
                className="border px-2 py-1 w-full"
                value={product.title}
                onChange={e => handleChange(product.id, 'title', e.target.value)}
              />
              <input
                className="border px-2 py-1 w-full"
                value={product.price}
                onChange={e => handleChange(product.id, 'price', e.target.value)}
              />
              <textarea
                className="border px-2 py-1 w-full"
                value={product.description}
                onChange={e => handleChange(product.id, 'description', e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => handleSave(product)}
                >保存</button>
                <button
                  className="text-gray-500 underline"
                  onClick={() => toggleEdit(product.id)}
                >キャンセル</button>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-lg font-bold">{product.title}</h3>
              <p className="text-sm">価格: ¥{product.price}</p>
              <p className="text-sm text-gray-600">{product.description}</p>
              <div className="flex gap-3">
                <button
                  className="text-blue-600 underline"
                  onClick={() => toggleEdit(product.id)}
                >編集</button>
                <button
                  className="text-red-600 underline"
                  onClick={() => handleDelete(product.id)}
                >削除</button>
                <button
                  className="text-green-600 underline"
                  onClick={() => handleDummyPurchase(product)}
                >ダミー購入</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductManager;

