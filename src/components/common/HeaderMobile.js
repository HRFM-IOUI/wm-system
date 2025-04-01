// src/components/common/HeaderMobile.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { Menu } from 'lucide-react';

const HeaderMobile = ({ onMenuClick }) => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleIconClick = () => {
    if (onMenuClick) onMenuClick();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md flex items-center justify-between px-4 h-14">
      {/* 左アイコン（ログインユーザー or メニュー） */}
      <button onClick={handleIconClick} className="focus:outline-none">
        {user && user.photoURL ? (
          <img
            src={user.photoURL}
            alt="User Icon"
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <Menu className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {/* 中央ロゴ */}
      <div
        className="text-lg font-bold text-gray-800 cursor-pointer"
        onClick={() => navigate('/')}
      >
        Toa Fans Shop
      </div>

      {/* 右側はスペース確保のみ（将来通知など） */}
      <div className="w-8 h-8" />
    </header>
  );
};

export default HeaderMobile;










