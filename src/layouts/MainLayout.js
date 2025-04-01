import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import HeaderMobile from './HeaderMobile';
import FooterTabMobile from './FooterTabMobile';
import SideMenuMobile from './SideMenuMobile';
import { useMediaQuery } from 'react-responsive';

const MainLayout = ({ children, activeTab, setActiveTab }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const location = useLocation();

  const hidePaths = ['/login', '/signup'];
  const shouldHideMobileNav = hidePaths.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-black">
      {/* モバイル用追尾ヘッダー（左アイコンタップでメニュー） */}
      {isMobile && !shouldHideMobileNav && (
        <HeaderMobile
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onMenuClick={() => setIsSideMenuOpen(true)}
        />
      )}

      {/* モバイル用スライドメニュー */}
      {isMobile && isSideMenuOpen && (
        <SideMenuMobile onClose={() => setIsSideMenuOpen(false)} />
      )}

      <main className="flex-1 pt-14 pb-16 md:pt-4 md:pb-0 overflow-y-auto">
        {children}
      </main>

      {/* モバイル用追尾フッター（タブ） */}
      {isMobile && !shouldHideMobileNav && (
        <FooterTabMobile activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
    </div>
  );
};

export default MainLayout;

