import React from "react";
import { Link } from "react-router-dom";

const MenuPanel = () => {
  const menuItems = [
    { label: "ホーム", path: "/toppage" },
    { label: "検索", path: "/search" },
    { label: "マイページ", path: "/mypage" },
    { label: "ガチャ", path: "/gacha-select" },
    { label: "チケット", path: "/ticket-shop" },
    { label: "投稿", path: "/post" },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 p-4 bg-white shadow rounded-xl mb-4">
      {menuItems.map((item, index) => (
        <Link
          to={item.path}
          key={index}
          className="flex flex-col items-center justify-center p-3 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-semibold shadow-sm"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default MenuPanel;
