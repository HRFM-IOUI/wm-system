import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Toppage from './pages/Toppage';
import Gacha from './pages/Gacha';
import Dashboard from './pages/Dashboard';
import Mypage from './pages/Mypage';
import Post from './pages/Post';
import Search from './pages/Search';
import Lounge from './pages/Lounge';
import Subscribe from './pages/Subscribe';
import TicketShop from './pages/TicketShop';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/toppage" element={<Toppage />} />
      <Route path="/gacha" element={<Gacha />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/post" element={<Post />} />
      <Route path="/search" element={<Search />} />
      <Route path="/lounge" element={<Lounge />} />
      <Route path="/subscribe" element={<Subscribe />} />
      <Route path="/ticket-shop" element={<TicketShop />} />
    </Routes>
  );
}

export default App;

