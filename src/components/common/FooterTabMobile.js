// src/components/common/FooterTabMobile.js
import React from 'react';
import { PlaySquare, Package, Gift } from 'lucide-react';

const FooterTabMobile = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { key: 'videos', label: 'メディア', icon: PlaySquare },
    { key: 'goods', label: 'グッズ', icon: Package },
    { key: 'gacha', label: 'ガチャ', icon: Gift },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex justify-around py-2 shadow-md">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex flex-col items-center justify-center text-xs font-semibold transition-all duration-200 ${
              activeTab === tab.key ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <Icon className="w-5 h-5 mb-0.5" />
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
};

export default FooterTabMobile;
