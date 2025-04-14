import React, { useState, useContext } from 'react';
import axios from 'axios';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { CartContext } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    postalCode: '',
    address: '',
    building: '',
    phone: '',
    email: '',
    deliveryMemo: '',
    deviceInfo: '',
    method: 'cr',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePostalLookup = async () => {
    try {
      const { postalCode } = formData;
      if (!postalCode.match(/^\d{3}-?\d{4}$/)) return alert('郵便番号を正しく入力してください');
      const res = await axios.get(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode.replace('-', '')}`);
      const data = res.data;
      if (data.results) {
        const { address1, address2, address3 } = data.results[0];
        setFormData((prev) => ({
          ...prev,
          address: `${address1}${address2}${address3}`,
        }));
      } else {
        alert('住所が見つかりませんでした');
      }
    } catch (err) {
      console.error(err);
      alert('検索エラー');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return alert('カートに商品がありません');

    const orderData = {
      ...formData,
      items: cartItems,
      status: 'pending',
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, 'orders'), orderData);
      clearCart();
      alert('注文が送信されました！');

      // 🔽 決済方法ごとの分岐
      if (formData.method === 'link') {
        const firstLink = cartItems.find(item => item.paymentLink)?.paymentLink;
        if (firstLink) {
          window.location.href = firstLink;
          return;
        } else {
          alert('決済リンクが設定されていません');
        }
      } else if (formData.method === 'cr') {
        navigate('/cr-payment');
      } else if (formData.method === 'applepay') {
        alert('ApplePayは現在準備中です');
      }
    } catch (err) {
      console.error(err);
      alert('注文の送信に失敗しました');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded space-y-4">
      <h1 className="text-xl font-bold mb-4">🛒 配送情報の入力</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold">お名前</label>
          <input name="name" value={formData.name} onChange={handleChange} className="w-full border rounded p-2" required />
        </div>

        <div>
          <label className="block text-sm font-semibold">郵便番号</label>
          <div className="flex gap-2">
            <input name="postalCode" value={formData.postalCode} onChange={handleChange} className="flex-1 border rounded p-2" placeholder="例: 100-0001" required />
            <button type="button" onClick={handlePostalLookup} className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700">住所検索</button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold">住所</label>
          <input name="address" value={formData.address} onChange={handleChange} className="w-full border rounded p-2" required />
        </div>

        <div>
          <label className="block text-sm font-semibold">建物名・部屋番号</label>
          <input name="building" value={formData.building} onChange={handleChange} className="w-full border rounded p-2" />
        </div>

        <div>
          <label className="block text-sm font-semibold">電話番号</label>
          <input name="phone" value={formData.phone} onChange={handleChange} className="w-full border rounded p-2" required />
        </div>

        <div>
          <label className="block text-sm font-semibold">メールアドレス</label>
          <input name="email" value={formData.email} onChange={handleChange} className="w-full border rounded p-2" required />
        </div>

        <div>
          <label className="block text-sm font-semibold">配送メモ（任意）</label>
          <textarea name="deliveryMemo" value={formData.deliveryMemo} onChange={handleChange} className="w-full border rounded p-2" placeholder="配送に関する補足があればご記入ください" />
        </div>

        <div>
          <label className="block text-sm font-semibold">視聴端末・その他（任意）</label>
          <input name="deviceInfo" value={formData.deviceInfo} onChange={handleChange} className="w-full border rounded p-2" placeholder="例：iPhone 13, iPadなど" />
        </div>

        <div>
          <label className="block font-semibold">支払い方法を選択</label>
          <div className="space-y-2 mt-2">
            <label className="block">
              <input type="radio" name="method" value="cr" checked={formData.method === 'cr'} onChange={handleChange} /> CR決済
            </label>
            <label className="block">
              <input type="radio" name="method" value="link" checked={formData.method === 'link'} onChange={handleChange} /> 外部リンク決済
            </label>
            <label className="block">
              <input type="radio" name="method" value="applepay" checked={formData.method === 'applepay'} onChange={handleChange} /> ApplePay（準備中）
            </label>
          </div>
        </div>

        <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700">購入を確定</button>
      </form>
    </div>
  );
};

export default Checkout;




