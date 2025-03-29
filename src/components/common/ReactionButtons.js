// src/components/ReactionButtons.js
import React, { useState } from 'react';
import { FaHeart, FaRegComment, FaShare } from 'react-icons/fa';

const ReactionButtons = ({ onCommentClick }) => {
  const [liked, setLiked] = useState(false);
  const [balloons, setBalloons] = useState([]);

  const handleLike = () => {
    setLiked(!liked);

    const id = Date.now();
    setBalloons((prev) => [...prev, id]);

    setTimeout(() => {
      setBalloons((prev) => prev.filter((b) => b !== id));
    }, 1000);
  };

  return (
    <div className="flex items-center space-x-6 text-gray-600">
      <div className="relative">
        <button onClick={handleLike} className="focus:outline-none">
          <FaHeart className={`text-xl ${liked ? 'text-pink-500' : ''}`} />
        </button>
        {balloons.map((id) => (
          <span
            key={id}
            className="absolute text-pink-400 text-xl animate-balloon left-1/2 transform -translate-x-1/2"
          >
            ♥
          </span>
        ))}
      </div>

      <button onClick={onCommentClick} className="focus:outline-none">
        <FaRegComment className="text-xl" />
      </button>

      <button onClick={() => alert('SNS共有機能は今後追加されます')} className="focus:outline-none">
        <FaShare className="text-xl" />
      </button>
    </div>
  );
};

export default ReactionButtons;