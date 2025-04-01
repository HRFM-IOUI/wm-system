import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import ProtectedRoute from './components/common/ProtectedRoute';
import OwnerRoute from './components/common/OwnerRoute';
import Header from './components/common/Header';
import HeaderMobile from './components/common/HeaderMobile';
import FooterMobile from './components/common/FooterMobile';

// 認証ページ
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

// 一般ユーザー向けページ
import Toppage from './pages/content/Toppage';
import GachaSelect from './pages/gacha/GachaSelect';
import GachaByType from './pages/gacha/GachaByType';
import Mypage from './pages/user/Mypage';
import Post from './pages/content/Post';
import Search from './pages/system/Search';
import Lounge from './pages/system/Lounge'; // ← ここは誰でもOKに変更
import Subscribe from './pages/user/Subscribe';
import TicketShop from './pages/system/TicketShop';
import VideoList from './pages/content/VideoList';

// 管理者専用ページ
import Dashboard from './pages/dashboard/Dashboard';

function App() {
  const location = useLocation();
  const hideHeaderPaths = ["/login", "/signup"];
  const isToppage = location.pathname === "/toppage";

  return (
    <>
      {/* 💻 PC用ヘッダー */}
      {!hideHeaderPaths.includes(location.pathname) && !isToppage && <Header />}

      {/* 📱 モバイル用追尾ヘッダー：/toppage のみ */}
      {isToppage && <HeaderMobile />}

      <Routes>
        {/* 公開ページ（ログイン不要） */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/lounge" element={<Lounge />} />

        {/* 一般ユーザー用（ログイン必須） */}
        <Route path="/toppage" element={<ProtectedRoute element={<Toppage />} />} />
        <Route path="/mypage" element={<ProtectedRoute element={<Mypage />} />} />
        <Route path="/post" element={<ProtectedRoute element={<Post />} />} />
        <Route path="/search" element={<ProtectedRoute element={<Search />} />} />
        <Route path="/subscribe" element={<ProtectedRoute element={<Subscribe />} />} />
        <Route path="/ticket-shop" element={<ProtectedRoute element={<TicketShop />} />} />
        <Route path="/videos" element={<ProtectedRoute element={<VideoList />} />} />
        <Route path="/gacha-select" element={<ProtectedRoute element={<GachaSelect />} />} />
        <Route path="/gacha/:type" element={<ProtectedRoute element={<GachaByType />} />} />

        {/* 管理者専用ページ */}
        <Route path="/dashboard" element={<OwnerRoute element={<Dashboard />} />} />

        {/* デフォルトルート */}
        <Route path="/" element={<Navigate to="/lounge" />} />
        <Route path="*" element={<Navigate to="/lounge" replace />} />
      </Routes>

      {/* 📱 モバイル用追尾フッター：/toppage のみ */}
      {isToppage && <FooterMobile />}
    </>
  );
}

export default App;

























