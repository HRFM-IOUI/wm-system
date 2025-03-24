import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Toppage from './pages/Toppage';
import Lounge from './pages/Lounge';
import Post from './pages/Post'; // ← 投稿ページを追加

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/toppage" element={<Toppage />} />
        <Route path="/lounge" element={<Lounge />} />
        <Route path="/post" element={<Post />} /> {/* 投稿ページ */}
      </Routes>
    </Router>
  );
};

export default App;