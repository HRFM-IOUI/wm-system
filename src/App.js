import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lounge from './pages/Lounge';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/lounge" element={<Lounge />} />
            </Routes>
        </Router>
    );
}

export default App;

