import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';

import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Toppage from './pages/content/Toppage';
import GachaSelect from './pages/gacha/GachaSelect';
import GachaByType from './pages/gacha/GachaByType';
import Dashboard from './pages/dashboard/Dashboard';
import Mypage from './pages/user/Mypage';
import Post from './pages/content/Post';
import Search from './pages/system/Search';
import Lounge from './pages/system/Lounge';
import Subscribe from './pages/user/Subscribe';
import TicketShop from './pages/system/TicketShop';
import VideoList from './pages/content/VideoList';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/toppage" element={<ProtectedRoute element={<Toppage />} />} />
      <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
      <Route path="/videos" element={<ProtectedRoute element={<VideoList />} />} />
      <Route path="/mypage" element={<ProtectedRoute element={<Mypage />} />} />
      <Route path="/post" element={<ProtectedRoute element={<Post />} />} />
      <Route path="/search" element={<ProtectedRoute element={<Search />} />} />
      <Route path="/subscribe" element={<ProtectedRoute element={<Subscribe />} />} />
      <Route path="/ticket-shop" element={<ProtectedRoute element={<TicketShop />} />} />
      <Route path="/gacha-select" element={<ProtectedRoute element={<GachaSelect />} />} />
      <Route path="/gacha/:type" element={<ProtectedRoute element={<GachaByType />} />} />
      <Route path="/lounge" element={<ProtectedRoute element={<Lounge />} />} />
      <Route path="/" element={<Navigate to="/lounge" />} />
      <Route path="*" element={<Navigate to="/lounge" replace />} />
    </Routes>
  );
}

export default App;













