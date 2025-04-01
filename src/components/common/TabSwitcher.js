// src/components/common/TabSwitcher.js
import React from 'react';
import DummyGoods from './DummyGoods';
import DummyGacha from './DummyGacha';
import VideoList from '../video/VideoList';

const TabSwitcher = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { key: 'video', label: 'メディア' },
    { key: 'goods', label: 'グッズ' },
    { key: 'gacha', label: 'ガチャ' },
  ];

  return (
    <div className="w-full">
      <div className="flex justify-around border-b border-gray-300 bg-white rounded-md overflow-hidden">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-3 text-center font-semibold text-sm transition-all duration-150
              ${activeTab === tab.key
                ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-blue-600'}`}
          >
            <div className="flex items-center justify-center">
              {tab.label}
              {tab.key === 'gacha' && (
                <span className="ml-1 text-xs text-red-600 font-semibold animate-bounce">
                  オススメ！
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabSwitcher;

