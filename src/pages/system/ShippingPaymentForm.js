// src/pages/system/ShippingPaymentForm.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../../firebase';

const ShippingPaymentForm = () => {
  const { productId } = useParams();
  const [user] = useAuthState(auth);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    postal: '',
    address: '',
    phone: '',
    method: 'link',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const ref = doc(db, 'products', productId);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setProduct({ id: snap.id, ...snap.data() });
        }
      } catch (error) {
        console.error('商品取得失敗:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  useEffect(() => {
    if (form.postal.length === 7 && /^[0-9]+$/.test(form.postal)) {
      fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${form.postal}`)
        .then(res => res.json())
        .then(data => {
          if (data.results && data.results.length > 0) {
            const r = data.results[0];
            setForm(prev => ({ ...prev, address: `${r.address1}${r.address2}${r.address3}` }));
          }
        });
    }
  }, [form.postal]);

  const handleSubmit = async () => {
    if (!user || !product) return;
    try {
      setSubmitting(true);
      await addDoc(collection(db, 'purchaseRequests'), {
        userId: user.uid,
        productId: product.id,
        ...form,
        status: 'pending',
        requestedAt: serverTimestamp(),
      });
      alert('購入リクエストを送信しました！');
      navigate('/mypage');
    } catch (error) {
      console.error('送信失敗:', error);
      alert('送信に失敗しました');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-4">読み込み中...</div>;
  if (!product) return <div className="p-4">商品が見つかりません</div>;

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <h1 className="text-xl font-bold">購入・配送情報の入力</h1>

      <div className="bg-white shadow p-4 rounded space-y-2">
        <h2 className="text-lg font-semibold">{product.title}</h2>
        <p className="text-sm text-gray-600">価格: ¥{product.price}</p>

        <input
          type="text"
          placeholder="氏名"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="郵便番号 (例: 1000001)"
          value={form.postal}
          onChange={e => setForm({ ...form, postal: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="住所"
          value={form.address}
          onChange={e => setForm({ ...form, address: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="tel"
          placeholder="電話番号"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
          className="w-full border p-2 rounded"
        />

        <select
          value={form.method}
          onChange={e => setForm({ ...form, method: e.target.value })}
          className="w-full border p-2 rounded"
        >
          <option value="link">クレジット／リンク決済</option>
          <option value="bank">銀行振込</option>
        </select>

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {submitting ? '送信中...' : '購入リクエスト送信'}
        </button>
      </div>
    </div>
  );
};

export default ShippingPaymentForm;
