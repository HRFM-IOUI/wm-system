// src/components/common/SideMenuMobile.js
import React from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

const SideMenuMobile = ({ onClose }) => {
  const menuItems = [
    { label: 'マイページ', path: '/mypage' },
    { label: '投稿', path: '/post' },
    { label: '検索', path: '/search' },
    { label: 'チケット', path: '/ticket-shop' },
    { label: 'VIP', path: '/subscribe' },
    { label: 'ログアウト', path: '/login' }, // 仮リンク
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* オーバーレイ背景 */}
      <div
        className="fixed inset-0 bg-black opacity-30"
        onClick={onClose}
      />

      {/* スライドメニュー本体 */}
      <div className="relative w-4/5 max-w-xs h-full bg-white text-black shadow-lg border-r border-gray-200 p-4 z-50">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">メニュー</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <nav className="space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className="block text-sm font-medium text-gray-700 hover:text-blue-500 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SideMenuMobile;
