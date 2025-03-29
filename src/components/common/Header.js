import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/lounge" className="text-xl font-bold text-pink-600">
          TOAラウンジ
        </Link>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link to="/login" className="hover:text-pink-600 transition">ログイン</Link>
          <Link to="/subscribe" className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-xl transition">入会</Link>
        </nav>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white shadow-md px-4 pt-2 pb-4 space-y-3"
          >
            <Link to="/login" className="block text-gray-700 hover:text-pink-600" onClick={() => setIsOpen(false)}>ログイン</Link>
            <Link to="/subscribe" className="block text-pink-600 font-semibold" onClick={() => setIsOpen(false)}>入会</Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;