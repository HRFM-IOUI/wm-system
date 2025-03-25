
import React, { useState } from 'react';

const ProductPost = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productPreview, setProductPreview] = useState(null);
  const [productDescription, setProductDescription] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      name: productName,
      price: productPrice,
      description: productDescription,
      category: productCategory,
      mediaUrl: productPreview,
      isPublic: isPublic,
    };

    const existing = JSON.parse(localStorage.getItem('products') || '[]');
    localStorage.setItem('products', JSON.stringify([newProduct, ...existing]));

    alert('商品が保存されました！');
    setProductName('');
    setProductPrice('');
    setProductDescription('');
    setProductCategory('');
    setProductPreview(null);
    setIsPublic(true);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">新規出品</h2>       <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">商品名</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="例）オリジナルグッズ、限定動画など"
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
            min="0"
            step="100"
            placeholder="例）1000"
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
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-28 resize-none"
            placeholder="商品の説明文を入力してください"
            required
          />
        </div>         <div>
          <label className="block text-sm font-medium text-gray-700">プレビュー画像 / 商品メディア</label>
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
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
          出品する
        </button>
      </form>
    </div>
  );
};

export default ProductPost;