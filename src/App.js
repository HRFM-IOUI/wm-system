import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Lounge from './pages/Lounge';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Toppage from './pages/Toppage';
import Dashboard from './pages/Dashboard';
import Gacha from './pages/Gacha'; 

function App() {
  return (
    <Router>
      <Routes>
        {/* ルート設定 */}
        <Route path="/" element={<Lounge />} />
        <Route path="/lounge" element={<Lounge />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/toppage" element={<Toppage />} />
        <Route path="/owner" element={<Dashboard />} />
        <Route path="/gacha" element={<Gacha />} />

        {/* 万が一の白表示対策（未定義ルートは / にリダイレクト） */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;