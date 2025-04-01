import React from 'react';

const tabs = [
  { key: 'videos', label: '動画', badge: 'メイン', badgeStyle: 'balloon' },
  { key: 'goods', label: 'グッズ' },
  { key: 'gacha', label: 'ガチャ', badge: '激熱', badgeStyle: 'pulse' },
];

const TabSwitcher = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-around border-b border-gray-300 bg-white sticky top-0 z-10">
      {tabs.map((tab) => (
        <div key={tab.key} className="relative flex-1">
          <button
            onClick={() => setActiveTab(tab.key)}
            className={`w-full py-3 text-center font-semibold text-sm hover:bg-gray-100 transition-all duration-150 ${
              activeTab === tab.key
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500'
            }`}
          >
            {tab.label}
          </button>

          {tab.badge && (
            <div
              className={`absolute -top-3 right-4 text-xs font-bold ${
                tab.badgeStyle === 'pulse'
                  ? 'text-red-600 animate-ping-swap'
                  : 'text-blue-500 animate-balloon'
              }`}
            >
              {tab.badge}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TabSwitcher;







