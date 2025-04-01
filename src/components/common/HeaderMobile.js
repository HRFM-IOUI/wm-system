// ✅ ステップ 1: FooterMobile を削除
// src/App.js から以下の行を削除、または条件を無効に
// 
// {isToppage && <FooterMobile />} // ← これを削除またはコメントアウト

// ✅ ステップ 2: HeaderMobile にタブバーを組み込む（既にある構成を拡張）
// src/components/common/HeaderMobile.js（修正済みの全コード）

import React from 'react';
import { Bell, Search } from 'lucide-react';
import logo from '../../assets/images/logo.svg.jpg';
import classNames from 'classnames';

const HeaderMobile = ({ activeTab, setActiveTab }) => {
  const tabItems = [
    { key: 'video', label: 'メディア' },
    { key: 'goods', label: 'グッズ' },
    { key: 'gacha', label: 'ガチャ' },
  ];

  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur shadow">
      <div className="flex justify-between items-center px-4 pt-2 pb-1">
        <div className="w-6" />
        <img src={logo} alt="Logo" className="w-6 h-6" />
        <div className="flex space-x-4">
          <Search className="w-5 h-5 text-gray-600" />
          <Bell className="w-5 h-5 text-gray-600" />
        </div>
      </div>

      {/* 📱 フッター位置にタブ表示 */}
      <div className="flex border-t border-gray-300 mt-1">
        {tabItems.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={classNames(
              'flex-1 py-3 text-center font-semibold text-sm transition-all duration-150',
              {
                'text-blue-600 border-t-2 border-blue-500 bg-white': activeTab === tab.key,
                'text-gray-500 hover:text-blue-600 bg-gray-50': activeTab !== tab.key,
              }
            )}
          >
            <span className="text-base">{tab.label}</span>
            {tab.key === 'gacha' && !window.matchMedia('(max-width: 767px)').matches && (
              <span className="ml-1 text-xs text-red-600 font-semibold animate-ping">激熱</span>
            )}
          </button>
        ))}
      </div>
    </header>
  );
};

export default HeaderMobile;








