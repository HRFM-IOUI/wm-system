import React, { useState } from 'react';
import VideoList from '@/components/video/VideoList';
import DummyGoods from '@/components/common/DummyGoods';
import DummyGacha from '@/components/common/DummyGacha';

const tabs = [
  { key: 'videos', label: '動画' },
  { key: 'goods', label: 'グッズ' },
  { key: 'gacha', label: 'ガチャ' },
];

const TabSwitcher = () => {
  const [activeTab, setActiveTab] = useState('videos');

  const renderContent = () => {
    switch (activeTab) {
      case 'videos':
        return <VideoList />;
      case 'goods':
        return <DummyGoods />;
      case 'gacha':
        return <DummyGacha />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-around border-b border-gray-300">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 text-center py-3 font-semibold transition-colors duration-200 ${
              activeTab === tab.key
                ? 'border-b-4 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default TabSwitcher;
