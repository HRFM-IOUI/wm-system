// src/components/GachaStatusOverlay.js

import React from 'react';

const GachaStatusOverlay = ({ rank = 'Bronze', tickets = 0 }) => {
  return (
    <div className="absolute top-4 left-4 z-50 bg-white/10 backdrop-blur-md px-4 py-2 rounded-md text-sm text-white shadow-md">
      <div className="mb-1">
        <span className="font-semibold">VIPランク：</span>
        <span className="text-yellow-300 font-bold">{rank}</span>
      </div>
      <div>
        <span className="font-semibold">チケット：</span>
        <span className="text-green-300 font-bold">{tickets}枚</span>
      </div>
    </div>
  );
};

export default GachaStatusOverlay;
