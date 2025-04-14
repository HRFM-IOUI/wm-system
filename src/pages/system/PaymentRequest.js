// src/pages/system/PaymentRequest.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../../firebase';

const PaymentRequest = () => {
  const { productId } = useParams();
  const [user] = useAuthState(auth);
  const [product, setProduct] = useState(null);
  const [method, setMethod] = useState('paypay');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
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
        console.error('商品情報取得エラー:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleSubmit = async () => {
    if (!user || !product) return;
    try {
      setSubmitting(true);
      await addDoc(collection(db, 'purchaseRequests'), {
        userId: user.uid,
        productId: product.id,
        method,
        status: 'pending',
        requestedAt: serverTimestamp(),
      });
      alert('決済リクエストを送信しました！');
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
      <h1 className="text-xl font-bold">決済リクエスト</h1>
      <div className="bg-white shadow p-4 rounded space-y-2">
        <h2 className="text-lg font-semibold">{product.title}</h2>
        <p className="text-sm text-gray-600">価格: ¥{product.price}</p>
        <div>
          <label className="block font-semibold mb-1">支払い方法:</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          >
            <option value="paypay">PayPay</option>
            <option value="bank">銀行振込</option>
            <option value="stripe">クレカ/その他</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-4"
        >
          {submitting ? '送信中...' : '決済リクエストを送信'}
        </button>
      </div>
    </div>
  );
};

export default PaymentRequest;
