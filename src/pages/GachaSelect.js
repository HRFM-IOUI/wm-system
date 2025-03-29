import React from 'react';
import { useNavigate } from 'react-router-dom';
import gachaConfigs from '../utils/gachaConfigs';

const GachaSelect = () => {
  const navigate = useNavigate();

  const handleSelect = (type) => {
    navigate(`/gacha/${type}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">ガチャを選択してください</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {Object.entries(gachaConfigs).map(([key, config]) => (
          <div
            key={key}
            onClick={() => handleSelect(key)}
            className="bg-white bg-opacity-10 rounded-lg overflow-hidden shadow-md hover:scale-105 transition transform cursor-pointer"
          >
            <img
              src={config.image}
              alt={config.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold text-pink-400">{config.name}</h2>
              <p className="text-sm text-gray-300 mt-1">{config.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GachaSelect;







