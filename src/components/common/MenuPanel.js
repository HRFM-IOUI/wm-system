import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BookOpen, Gift, Package, User, Ticket, Star } from "lucide-react"; // 動画→ご利用ガイドは BookOpen

const MenuPanel = () => {
  const location = useLocation();

  const menuItems = [
    { label: "ご利用ガイド", path: "/lounge", icon: BookOpen },
    { label: "グッズ", path: "/search", icon: Package },
    { label: "ガチャ", path: "/mypage", icon: Gift, recommended: true },
    { label: "マイルーム", path: "/gacha-select", icon: User },
    { label: "チケット", path: "/ticket-shop", icon: Ticket },
    { label: "VIP", path: "/post", icon: Star },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 p-4 bg-white shadow rounded-xl mb-4 relative">
      {menuItems.map((item, index) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;

        return (
          <div key={index} className="relative">
            <Link
              to={item.path}
              className={`flex flex-col items-center justify-center p-3 rounded-xl text-sm font-semibold shadow-sm transition-all duration-200 w-full h-full ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              {item.label}
            </Link>

            {item.recommended && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-white border border-gray-300 rounded-full shadow text-xs text-pink-600 font-semibold whitespace-nowrap z-10">
                💥 オススメ！
                <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-white border-l border-b border-gray-300 rotate-45" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MenuPanel;



