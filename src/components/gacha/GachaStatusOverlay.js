import React from 'react';
import { useNavigate } from 'react-router-dom';

const GachaStatusOverlay = ({ userName = 'デモユーザー', loginDays = 7, vipRank = 'ブロンズ', ticketCount = 100 }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-black bg-opacity-80 text-white flex justify-between items-center px-6 py-2 shadow-md text-sm md:text-base">
      <div className="flex gap-4 items-center">
        <button onClick={() => navigate('/mypage')} className="hover:underline">{userName}</button>
        <button onClick={() => navigate('/login-days')} className="hover:underline">連続ログイン: {loginDays}日</button>
        <button onClick={() => navigate('/vip-info')} className="hover:underline">VIP: {vipRank}</button>
      </div>
      <div>
        <button onClick={() => navigate('/ticket-shop')} className="hover:underline">
          🎫 チケット: {ticketCount}枚
        </button>
      </div>
    </div>
  );
};

export default GachaStatusOverlay;

