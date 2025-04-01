// スライドメニュー用の SidebarMobile.js
import React from "react";
import { Link } from "react-router-dom";
import { User, Bookmark, Settings, LogOut } from "lucide-react";

const SidebarMobile = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-4/5 max-w-xs bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-bold">メニュー</h2>
        <button onClick={onClose} className="text-gray-500">×</button>
      </div>
      <ul className="p-4 space-y-4 text-gray-700">
        <li><Link to="/mypage" onClick={onClose} className="flex items-center gap-2"><User className="w-4 h-4" />プロフィール</Link></li>
        <li><Link to="/bookmarks" onClick={onClose} className="flex items-center gap-2"><Bookmark className="w-4 h-4" />ブックマーク</Link></li>
        <li><Link to="/settings" onClick={onClose} className="flex items-center gap-2"><Settings className="w-4 h-4" />設定</Link></li>
        <li><Link to="/logout" onClick={onClose} className="flex items-center gap-2"><LogOut className="w-4 h-4" />ログアウト</Link></li>
      </ul>
    </div>
  );
};

export default SidebarMobile;
