// src/pages/system/Confirm.js
// ConfirmAll.js と同等の「機能確認ダッシュボード」

import React from 'react';
import { Link } from 'react-router-dom';

const Confirm = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold mb-4">✅ 機能確認ダッシュボード</h1>

        <section className="bg-gray-50 p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">📦 商品系</h2>
          <ul className="list-disc list-inside space-y-1 text-pink-600 text-sm">
            <li>
              <Link to="/products" className="underline">商品一覧</Link>
            </li>
            <li>
              <Link to="/post" className="underline">商品出品（画像アップなど）</Link>
            </li>
          </ul>
        </section>

        <section className="bg-gray-50 p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">💳 決済関連</h2>
          <ul className="list-disc list-inside space-y-1 text-pink-600 text-sm">
            <li>
              <Link to="/system/payment-request/sample-id" className="underline">決済リクエスト画面</Link>
            </li>
            <li>
              <Link to="/dashboard" className="underline">ダッシュボード → 決済リクエスト承認</Link>
            </li>
          </ul>
        </section>

        <section className="bg-gray-50 p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">🎥 動画・再生・VIP</h2>
          <ul className="list-disc list-inside space-y-1 text-pink-600 text-sm">
            <li>
              <Link to="/videos" className="underline">動画一覧</Link>
            </li>
            <li>
              <Link to="/dashboard" className="underline">ダッシュボード → 動画投稿・削除</Link>
            </li>
          </ul>
        </section>

        <section className="bg-gray-50 p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">🛠 管理ツール系</h2>
          <ul className="list-disc list-inside space-y-1 text-pink-600 text-sm">
            <li>
              <Link to="/dashboard" className="underline">ダッシュボード全体確認</Link>
            </li>
            <li>
              <Link to="/mypage" className="underline">マイページ（VIP判定・履歴など）</Link>
            </li>
          </ul>
        </section>

      </div>
    </div>
  );
};

export default Confirm;

