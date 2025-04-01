import React from 'react';
import { Bell, Search } from 'lucide-react';
import logo from '../../assets/images/logo.svg.jpg';
import { useMediaQuery } from 'react-responsive';

const HeaderMobile = ({ activeTab, setActiveTab }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const tabItems = [
    { key: 'video', label: 'メディア' },
    { key: 'goods', label: 'グッズ' },
    { key: 'gacha', label: 'ガチャ' },
  ];

  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur shadow px-4 pt-2 pb-0">
      {/* 上部ロゴとアイコン */}
      <div className="flex justify-between items-center mb-2">
        <div className="w-6" />
        <img src={logo} alt="Logo" className="w-6 h-6" />
        <div className="flex space-x-4">
          <Search className="w-5 h-5 text-gray-600" />
          <Bell className="w-5 h-5 text-gray-600" />
        </div>
      </div>

      {/* 下部タブ切り替え */}
      <div className="flex border-b border-gray-300">
        {tabItems.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 pt-3 pb-3 text-base font-bold text-center border-b-2 transition-all duration-200 ease-in-out
              ${activeTab === tab.key
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-300'}`}
          >
            <div className="flex items-center justify-center">
              {tab.label}
              {tab.key === 'gacha' && (
                <span className="ml-1 text-xs text-red-600 font-semibold animate-bounce hidden md:inline">
                  オススメ！
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </header>
  );
};

export default HeaderMobile;






