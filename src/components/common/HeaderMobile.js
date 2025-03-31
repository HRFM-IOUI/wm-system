// src/components/common/HeaderMobile.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search } from 'lucide-react'; // ← Home を削除

const HeaderMobile = () => {
  const navigate = useNavigate();

  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow px-4 py-2 flex justify-between items-center">
      <button onClick={() => navigate('/')} className="text-gray-800 font-bold text-lg">
        MyFans
      </button>
      <div className="flex space-x-4">
        <Search className="w-5 h-5 text-gray-600" />
        <Bell className="w-5 h-5 text-gray-600" />
      </div>
    </header>
  );
};

export default HeaderMobile;

