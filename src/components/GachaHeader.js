import React from 'react';
import { useNavigate } from 'react-router-dom';

const GachaHeader = ({ username, loginStreak = 0, rank, tickets }) => {
  const navigate = useNavigate();

  const handleClick = (type) => {
    switch (type) {
      case 'user':
        navigate('/mypage');
        break;
      case 'vip':
        alert('VIPランクの詳細ポップアップ（後で実装）');
        break;
      case 'streak':
        alert(`現在の連続ログイン日数: ${loginStreak}日\n（詳細表示は後で実装）`);
        break;
      case 'ticket':
        navigate('/gacha/ticket');
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-white border-b shadow-md px-4 py-3 flex flex-wrap justify-around items-center text-sm text-gray-800 sticky top-0 z-50 gap-y-2">
      <span
        onClick={() => handleClick('user')}
        className="cursor-pointer hover:underline"
      >
        ユーザー名：<strong className="text-blue-600">{username}</strong>
      </span>
      <span
        onClick={() => handleClick('streak')}
        className="cursor-pointer hover:underline"
      >
        ログイン連続：<strong className="text-purple-600">{loginStreak}日</strong>
      </span>
      <span
        onClick={() => handleClick('vip')}
        className="cursor-pointer hover:underline"
      >
        VIPランク：<strong className="text-indigo-600">{rank}</strong>
      </span>
      <span
        onClick={() => handleClick('ticket')}
        className="cursor-pointer hover:underline"
      >
        チケット：<strong className="text-green-600">{tickets}</strong>枚
      </span>
    </div>
  );
};

export default GachaHeader;