import React from 'react';

const tabs = [
  { key: 'videos', label: '動画' },
  { key: 'goods', label: 'グッズ' },
  { key: 'gacha', label: 'ガチャ' },
];

const TabSwitcher = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-around border-b border-gray-300 bg-white sticky top-0 z-10">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`flex-1 py-3 text-center font-semibold text-sm hover:bg-gray-100 transition-all duration-150
            ${activeTab === tab.key ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabSwitcher;


