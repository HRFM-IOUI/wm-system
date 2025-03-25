import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Toppage from './pages/Toppage';
import Lounge from './pages/Lounge';
import Dashboard from './pages/Dashboard'; // 旧 VendorDashboard

const App = () => {
  return (
    <Router>
      <Routes>
        {/* 最初はログインへ */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* ページルート */}
        <Route path="/login" element={<Login />} />
        <Route path="/toppage" element={<Toppage />} />
        <Route path="/lounge" element={<Lounge />} />

        {/* オーナー（顧客）ダッシュボード */}
        <Route path="/owner" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;