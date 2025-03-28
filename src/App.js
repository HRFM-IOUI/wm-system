import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Lounge from './pages/Lounge';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Toppage from './pages/Toppage';
import Dashboard from './pages/Dashboard';
import Gacha from './pages/Gacha';
import Mypage from './pages/Mypage';
import Search from './pages/Search';
import Post from './pages/Post';
import Subscribe from './pages/Subscribe';
import TicketShop from './pages/TicketShop';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Lounge />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/toppage" element={<Toppage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/gacha" element={<Gacha />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/post" element={<Post />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/ticket-shop" element={<TicketShop />} />
        {/* 未定義ルートはLoungeにリダイレクト */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;