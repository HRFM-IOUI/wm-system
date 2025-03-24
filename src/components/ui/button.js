// src/components/ui/Button.js
import React from 'react';

export default function Button({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-pink-500 to-orange-400 hover:opacity-90 transition duration-300 shadow-md ${className}`}
    >
      {children}
    </button>
  );
}
