import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lounge from './pages/Lounge';
import Subscribe from './pages/Subscribe';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/lounge" element={<Lounge />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;