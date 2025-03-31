// src/components/common/SidebarRight.js
import React from "react";

const SidebarRight = () => {
  return (
    <aside className="hidden xl:block w-[280px] p-4 space-y-6 bg-gray-50 text-sm">
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-bold text-gray-800 mb-2">おすすめ</h2>
        <ul className="space-y-2">
          <li className="hover:underline cursor-pointer">ガチャアイテム新着</li>
          <li className="hover:underline cursor-pointer">フォロー提案</li>
          <li className="hover:underline cursor-pointer">人気タグ</li>
        </ul>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-bold text-gray-800 mb-2">トレンド</h2>
        <ul className="space-y-2">
          <li className="hover:underline cursor-pointer">#カフェ巡り</li>
          <li className="hover:underline cursor-pointer">#動画投稿</li>
          <li className="hover:underline cursor-pointer">#人気ユーザー</li>
        </ul>
      </div>
    </aside>
  );
};

export default SidebarRight;