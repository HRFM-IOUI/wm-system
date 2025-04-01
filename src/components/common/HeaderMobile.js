import React from 'react';
import { Bell, Search } from 'lucide-react';
import logo from '../../assets/images/logo.svg.jpg';

const HeaderMobile = () => {
  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur shadow px-4 pt-2 pb-2">
      <div className="flex justify-between items-center">
        <div className="w-6" />
        <img src={logo} alt="Logo" className="w-6 h-6" />
        <div className="flex space-x-4">
          <Search className="w-5 h-5 text-gray-600" />
          <Bell className="w-5 h-5 text-gray-600" />
        </div>
      </div>
    </header>
  );
};

export default HeaderMobile;









