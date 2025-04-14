// src/components/common/ProductPost.js
import React, { useState } from 'react';
import { db, storage } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';

const ProductPost = () => {
  const [user] = useAuthState(auth);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productPreview, setProductPreview] = useState(null);
  const [productDescription, setProductDescription] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !productPreview) return;
    try {
      setUploading(true);
      const fileRef = ref(storage, `products/${Date.now()}_${productPreview.name}`);
      await uploadBytes(fileRef, productPreview);
      const mediaUrl = await getDownloadURL(fileRef);

      await addDoc(collection(db, 'products'), {
        title: productName,
        price: Number(productPrice),
        description: productDescription,
        category: productCategory,
        imageUrl: mediaUrl,
        isPublic,
        createdAt: serverTimestamp(),
        ownerId: user.uid,
      });

      alert('商品を出品しました！');
      setProductName('');
      setProductPrice('');
      setProductDescription('');
      setProductCategory('');
      setProductPreview(null);
      setIsPublic(true);
    } catch (error) {
      console.error('出品エラー:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">新規出品</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">商品名</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">価格（円）</label>
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">カテゴリ</label>
          <select
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          >
            <option value="">選択してください</option>
            <option value="video">動画</option>
            <option value="image">画像</option>
            <option value="goods">グッズ</option>
            <option value="other">その他</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">商品説明</label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-28"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">メディアファイル</label>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setProductPreview(e.target.files[0])}
            className="mt-1 block w-full text-sm text-gray-700"
            required
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            id="public"
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <label htmlFor="public" className="text-sm text-gray-700">
            公開する（チェックを外すと非公開）
          </label>
        </div>
        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
          {uploading ? 'アップロード中...' : '出品する'}
        </button>
      </form>
    </div>
  );
};

export default ProductPost;


