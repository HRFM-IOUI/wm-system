// src/pages/content/ProductDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { getUserVipStatus } from '../../utils/vipUtils';

const VIP_RANKS = ['VIP12', 'Platinum'];

const ProductDetail = () => {
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const [product, setProduct] = useState(null);
  const [canAccess, setCanAccess] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error('商品取得失敗:', error);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const checkAccess = async () => {
      if (!user || !product) {
        setCheckingAccess(false);
        return;
      }

      const vip = await getUserVipStatus(user.uid);
      if (VIP_RANKS.includes(vip.rank)) {
        setCanAccess(true);
        setCheckingAccess(false);
        return;
      }

      const q = query(
        collection(db, 'orders'),
        where('userId', '==', user.uid),
        where('productId', '==', id),
        where('status', '==', 'paid')
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        setCanAccess(true);
      } else {
        setCanAccess(false);
      }
      setCheckingAccess(false);
    };

    checkAccess();
  }, [user, product, id]);

  if (!product || checkingAccess) {
    return (
      <div className="p-4 text-center text-gray-500">読み込み中...</div>
    );
  }

  if (!canAccess) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold mb-2">この商品は購入者専用です</h2>
        <p className="text-gray-600">ご購入またはVIP12ランクでご覧いただけます。</p>

        {product.paymentLink ? (
          <div className="mt-4">
            <a
              href={product.paymentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              💳 外部決済リンクへ進む
            </a>
          </div>
        ) : (
          <div className="mt-4">
            <button
              onClick={() => navigate(`/payment-request/${product.id}`)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              💳 決済リクエストを送信
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <p className="text-gray-700">価格: ¥{product.price}</p>
      <p className="text-gray-600">{product.description}</p>

      {product.imageUrl && (
        <img src={product.imageUrl} alt={product.title} className="rounded shadow max-w-full" />
      )}

      {product.videoUrl && (
        <video controls className="w-full rounded shadow" src={product.videoUrl} />
      )}

      <div className="text-sm text-gray-400 mt-2">
        {product.paymentLink && (
          <p>🔗 決済リンク: <a href={product.paymentLink} className="text-blue-600 underline" target="_blank" rel="noreferrer">{product.paymentLink}</a></p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;






