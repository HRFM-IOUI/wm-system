import React from 'react';
import { Home, ShoppingBag, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FooterMobile = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-14 shadow z-50 md:hidden">
      <button
        onClick={() => navigate('/toppage')}
        className="flex flex-col items-center text-gray-700 hover:text-blue-600"
      >
        <Home size={22} />
        <span className="text-[10px]">メディア</span>
      </button>
      <button
        onClick={() => navigate('/shop')}
        className="flex flex-col items-center text-gray-700 hover:text-blue-600"
      >
        <ShoppingBag size={22} />
        <span className="text-[10px]">グッズ</span>
      </button>
      <button
        onClick={() => navigate('/gacha-select')}
        className="flex flex-col items-center text-gray-700 hover:text-blue-600"
      >
        <Gift size={22} />
        <span className="text-[10px]">ガチャ</span>
      </button>
    </div>
  );
};

export default FooterMobile;
