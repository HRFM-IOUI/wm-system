// src/components/ProductCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleViewDetail = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
      {/* 商品画像 */}
      {product.imageUrl ? (
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-48 object-cover"
          onClick={handleViewDetail}
        />
      ) : (
        <div
          className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500"
          onClick={handleViewDetail}
        >
          No Image
        </div>
      )}

      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold truncate" onClick={handleViewDetail}>
          {product.title}
        </h2>
        <p className="text-sm text-gray-500 line-clamp-2">
          {product.description || '商品説明はありません'}
        </p>
        <p className="text-pink-600 font-bold text-sm">¥{product.price}</p>

        <button
          onClick={handleViewDetail}
          className="w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700 text-sm"
        >
          🔍 詳細を見る
        </button>
      </div>
    </div>
  );
};

export default ProductCard;



