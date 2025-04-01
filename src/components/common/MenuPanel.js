// ✅ 3×2パネル（MenuPanel.js）のモバイル時アイコン非表示＆レスポンシブ最適化版
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { PlaySquare, Package, Gift, User, Ticket, ShieldCheck } from 'lucide-react';

const items = [
  { icon: PlaySquare, label: 'ご利用ガイド仮', to: '/guide' },
  { icon: Package, label: 'グッズ仮', to: '/goods' },
  { icon: Gift, label: 'ガチャ', to: '/gacha-select', badge: 'オススメ！' },
  { icon: User, label: 'マイページ', to: '/mypage' },
  { icon: Ticket, label: 'チケット', to: '/ticket-shop' },
  { icon: ShieldCheck, label: 'VIP仮', to: '/vip' },
];

const MenuPanel = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4">
      {items.map(({ icon: Icon, label, to, badge }) => (
        <Link
          to={to}
          key={label}
          className="relative bg-white hover:bg-pink-50 rounded-2xl border shadow flex flex-col items-center justify-center py-3 px-2 transition-all"
        >
          {/* コーチマーク付きバッジ */}
          {badge && (
            <span className="absolute -top-1.5 right-1.5 bg-gradient-to-r from-pink-500 to-yellow-400 text-white text-[9px] font-bold px-2 py-[1px] rounded-full animate-pulse shadow-lg z-10">
              {badge}
            </span>
          )}

          {!isMobile && <Icon className="w-6 h-6 mb-1 text-pink-500" />}
          <span className="text-[10px] sm:text-xs font-semibold text-center leading-tight break-words">
            {label}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default MenuPanel;


