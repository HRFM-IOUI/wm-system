import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Toppage from './pages/Toppage';
import GachaSelect from './pages/GachaSelect';
import GachaByType from './pages/GachaByType';
import Dashboard from './pages/Dashboard';
import Mypage from './pages/Mypage';
import Post from './pages/Post';
import Search from './pages/Search';
import Lounge from './pages/Lounge';
import Subscribe from './pages/Subscribe';
import TicketShop from './pages/TicketShop';

import HomeRedirect from './components/HomeRedirect'; // ← 新規追加

// 認証ガード付きルート
const ProtectedRoute = ({ element }) => {
  const [user, loading] = useAuthState(auth);
  if (loading) return null;
  return user ? element : <Navigate to="/" />;
};

function App() {
  return (
    <Routes>
      {/* ホーム → 状態に応じて自動リダイレクト */}
      <Route path="/" element={<HomeRedirect />} />

      {/* パブリックルート */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* 認証が必要なページ */}
      <Route path="/toppage" element={<ProtectedRoute element={<Toppage />} />} />
      <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
      <Route path="/mypage" element={<ProtectedRoute element={<Mypage />} />} />
      <Route path="/post" element={<ProtectedRoute element={<Post />} />} />
      <Route path="/search" element={<ProtectedRoute element={<Search />} />} />
      <Route path="/lounge" element={<ProtectedRoute element={<Lounge />} />} />
      <Route path="/subscribe" element={<ProtectedRoute element={<Subscribe />} />} />
      <Route path="/ticket-shop" element={<ProtectedRoute element={<TicketShop />} />} />

      {/* ガチャ選択ページ・タイプ別ページ */}
      <Route path="/gacha-select" element={<ProtectedRoute element={<GachaSelect />} />} />
      <Route path="/gacha/:type" element={<ProtectedRoute element={<GachaByType />} />} />

      {/* 不明なパスはログインへ */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;







