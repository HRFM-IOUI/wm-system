// src/App.js
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';
import OwnerRoute from './components/common/OwnerRoute';
import HeaderMobile from './components/common/HeaderMobile';

// 認証ページ
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

// 一般ユーザー用ページ
import Toppage from './pages/content/Toppage';
import GachaSelect from './pages/gacha/GachaSelect';
import GachaByType from './pages/gacha/GachaByType';
import Mypage from './pages/user/Mypage';
import Post from './pages/content/Post';
import Search from './pages/system/Search';
import Lounge from './pages/system/Lounge';
import Subscribe from './pages/user/Subscribe';
import TicketShop from './pages/system/TicketShop';
import VideoList from './pages/content/VideoList';
import VideoDetail from './pages/content/VideoDetail';
import ProductList from './pages/content/ProductList';
import ProductDetail from './pages/content/ProductDetail';
import PaymentRequest from './pages/system/PaymentRequest';
import ConfirmAll from './pages/system/ConfirmAll';

// 管理者専用ページ
import Dashboard from './pages/dashboard/Dashboard';

function App() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isToppage = location.pathname === '/toppage';
  const isLounge = location.pathname === '/lounge';

  return (
    <>
      {isMobile && (isToppage || isLounge) && <HeaderMobile />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/lounge" element={<Lounge />} />

        <Route path="/toppage" element={<ProtectedRoute element={<Toppage />} />} />
        <Route path="/mypage" element={<ProtectedRoute element={<Mypage />} />} />
        <Route path="/post" element={<ProtectedRoute element={<Post />} />} />
        <Route path="/search" element={<ProtectedRoute element={<Search />} />} />
        <Route path="/subscribe" element={<ProtectedRoute element={<Subscribe />} />} />
        <Route path="/ticket-shop" element={<ProtectedRoute element={<TicketShop />} />} />
        <Route path="/videos" element={<ProtectedRoute element={<VideoList />} />} />
        <Route path="/video/:id" element={<ProtectedRoute element={<VideoDetail />} />} />
        <Route path="/products" element={<ProtectedRoute element={<ProductList />} />} />
        <Route path="/product/:id" element={<ProtectedRoute element={<ProductDetail />} />} />
        <Route path="/gacha-select" element={<ProtectedRoute element={<GachaSelect />} />} />
        <Route path="/gacha/:type" element={<ProtectedRoute element={<GachaByType />} />} />
        <Route path="/system/payment-request/:productId" element={<ProtectedRoute element={<PaymentRequest />} />} />
        <Route path="/confirm" element={<ProtectedRoute element={<ConfirmAll />} />} />

        <Route path="/dashboard" element={<OwnerRoute element={<Dashboard />} />} />

        <Route path="/" element={<Navigate to="/lounge" />} />
        <Route path="*" element={<Navigate to="/lounge" replace />} />
      </Routes>
    </>
  );
}

export default App;






































