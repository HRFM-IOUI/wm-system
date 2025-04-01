import React from "react";
import { Link, useLocation } from "react-router-dom";
import { PlaySquare, Gift, Package, User, Ticket, Star } from "lucide-react"; // アイコンお好みで調整可

const MenuPanel = () => {
  const location = useLocation();

  const menuItems = [
    { label: "動画", path: "/toppage", icon: <PlaySquare className="w-5 h-5 mb-1" /> },
    { label: "グッズ", path: "/search", icon: <Package className="w-5 h-5 mb-1" /> },
    { label: "ガチャ", path: "/mypage", icon: <Gift className="w-5 h-5 mb-1" /> },
    { label: "マイルーム", path: "/gacha-select", icon: <User className="w-5 h-5 mb-1" /> },
    { label: "チケット", path: "/ticket-shop", icon: <Ticket className="w-5 h-5 mb-1" /> },
    { label: "VIP", path: "/post", icon: <Star className="w-5 h-5 mb-1" /> },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 p-4 bg-white shadow rounded-xl mb-4">
      {menuItems.map((item, index) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            to={item.path}
            key={index}
            className={`flex flex-col items-center justify-center p-3 rounded-xl text-sm font-semibold shadow-sm transition-all duration-200 ${
              isActive ? "bg-blue-100 text-blue-600" : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        );
      })}
    </div>
  );
};

export default MenuPanel;

