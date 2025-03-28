import React, { useState } from 'react';
import GachaTicketModal from './GachaTicketModal';

const GachaCard = ({ gacha, onStart }) => {
  const [showModal, setShowModal] = useState(false);
  const [drawCount, setDrawCount] = useState(1);

  const handleDraw = (count) => {
    setDrawCount(count);
    setShowModal(true);
  };

  const confirmDraw = () => {
    setShowModal(false);
    onStart(gacha.id, drawCount);
  };

  return (
    <div className="bg-white text-black rounded-lg shadow-lg p-4 w-full max-w-xs">
      <img src={gacha.image} alt={gacha.title} className="w-full h-40 object-cover rounded" />
      <h3 className="text-lg font-bold mt-4">{gacha.title}</h3>
      <p className="text-sm text-gray-700">{gacha.description}</p>

      <div className="mt-4 flex flex-col gap-2">
        <button onClick={() => handleDraw(1)} className="bg-pink-500 hover:bg-pink-600 text-white py-2 rounded font-semibold">1連</button>
        <button onClick={() => handleDraw(10)} className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded font-semibold">10連</button>
        <button onClick={() => handleDraw(100)} className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded font-semibold">100連</button>
      </div>

      {showModal && (
        <GachaTicketModal
          drawCount={drawCount}
          onConfirm={confirmDraw}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default GachaCard;