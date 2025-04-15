import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react'; // アイコンがあれば（Lucide使用）

const BackButton = ({ to = -1, label = '戻る' }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="inline-flex items-center gap-2 text-sm text-pink-600 hover:underline mt-8"
    >
      <ArrowLeft size={16} />
      {label}
    </button>
  );
};

export default BackButton;
