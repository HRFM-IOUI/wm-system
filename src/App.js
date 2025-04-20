import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import ProtectedRoute from './components/common/ProtectedRoute';
import OwnerRoute from './components/common/OwnerRoute';
import HeaderMobile from './components/common/HeaderMobile';

// 認証ページ
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import EmailSignupPage from './pages/auth/EmailSignupPage';

// 一般ユーザー用ページ
import Toppage from './pages/content/Toppage';
import DmodePage from './pages/content/DmodePage'; // ✅ 変更：VIPページ → Dmodeページ
import GachaSelect from './pages/gacha/GachaSelect';
import GachaByType from './pages/gacha/GachaByType';
import Mypage from './pages/user/Mypage';
import Post from './pages/content/Post';
import Lounge from './pages/system/Lounge';
import Subscribe from './pages/user/Subscribe';
import TicketShop from './pages/system/TicketShop';
import VideoList from './pages/content/VideoList';
import VideoDetail from './pages/content/VideoDetail';
import ProductList from './pages/content/ProductList';
import ProductDetail from './pages/content/ProductDetail';
import PaymentRequest from './pages/system/PaymentRequest';

// 管理者専用ページ
import Dashboard from './pages/dashboard/Dashboard';

// 法務ページ
import PrivacyPolicy from './pages/system/PrivacyPolicy';
import TermsOfService from './pages/system/TermsOfService';
import LegalNotice from './pages/system/LegalNotice';

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
    <GoogleReCaptchaProvider reCaptchaKey="6LcB6BgrAAAAAANmgakt5YmGjMMrukwz2FjnHtRi">
      <>
        {isMobile && (isToppage || isLounge) && <HeaderMobile />}
        <Routes>
          {/* 認証 */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/email" element={<EmailSignupPage />} />

          {/* 一般ページ */}
          <Route path="/lounge" element={<Lounge />} />
          <Route path="/toppage" element={<ProtectedRoute element={<Toppage />} />} />
          <Route path="/dmode" element={<ProtectedRoute element={<DmodePage />} />} /> {/* ✅ Dmode */}
          <Route path="/mypage" element={<ProtectedRoute element={<Mypage />} />} />
          <Route path="/post" element={<ProtectedRoute element={<Post />} />} />
          <Route path="/subscribe" element={<ProtectedRoute element={<Subscribe />} />} />
          <Route path="/ticket-shop" element={<ProtectedRoute element={<TicketShop />} />} />
          <Route path="/videos" element={<ProtectedRoute element={<VideoList />} />} />
          <Route path="/video/:id" element={<ProtectedRoute element={<VideoDetail />} />} />
          <Route path="/products" element={<ProtectedRoute element={<ProductList />} />} />
          <Route path="/product/:id" element={<ProtectedRoute element={<ProductDetail />} />} />
          <Route path="/gacha-select" element={<ProtectedRoute element={<GachaSelect />} />} />
          <Route path="/gacha/:type" element={<ProtectedRoute element={<GachaByType />} />} />
          <Route path="/system/payment-request/:productId" element={<ProtectedRoute element={<PaymentRequest />} />} />

          {/* 管理者 */}
          <Route path="/dashboard" element={<OwnerRoute element={<Dashboard />} />} />

          {/* 法務ページ */}
          <Route path="/system/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/system/TermsOfService" element={<TermsOfService />} />
          <Route path="/system/LegalNotice" element={<LegalNotice />} />

          {/* ルート */}
          <Route path="/" element={<Navigate to="/lounge" />} />
          <Route path="*" element={<Navigate to="/lounge" replace />} />
        </Routes>
      </>
    </GoogleReCaptchaProvider>
  );
}

export default App;











































