import React from 'react';
import { Bell, Search } from 'lucide-react';
import logo from '../../assets/images/logo.svg.jpg'; // ← ロゴ画像パス

const HeaderMobile = ({ onMenuClick }) => {
  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur shadow px-4 pt-2 pb-2">
      <div className="flex justify-between items-center">
        {/* 左：メニューアイコン */}
        <button onClick={onMenuClick} className="text-gray-700 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>

        {/* 中央：ロゴ */}
        <img src={logo} alt="Logo" className="w-6 h-6" />

        {/* 右：通知と検索 */}
        <div className="flex space-x-4">
          <Search className="w-5 h-5 text-gray-600" />
          <Bell className="w-5 h-5 text-gray-600" />
        </div>
      </div>
    </header>
  );
};

export default HeaderMobile;










