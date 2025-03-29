import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-400 text-sm py-6 text-center border-t border-gray-200 mt-12">
      © {new Date().getFullYear()} TOA Lounge. All rights reserved.
    </footer>
  );
};

export default Footer;