// src/components/common/TabMenu.js
import React from 'react';

const TabMenu = ({ selectedTab, onTabChange }) => {
  const tabs = [
    { id: 'posts', label: '投稿' },
    { id: 'replies', label: '返信' },
    { id: 'media', label: 'メディア' },
  ];

  return (
    <div className="flex justify-around border-b border-gray-300 bg-white sticky top-0 z-10">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 py-3 text-center font-semibold text-sm hover:bg-gray-100 transition-all duration-150
            ${selectedTab === tab.id ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabMenu;
