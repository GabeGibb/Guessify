import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './index.css';
import Verification from './components/Verification';
import MainPage from './pages/MainPage';
import GamePage from './pages/GamePage';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Loading from './components/Loading';



export default function App() {
    return (
        <div className="text-white">
            <Verification />
            <Navbar />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/game" element={<GamePage />} />
                    <Route path="/home" element={<HomePage />} />
                    {/* <Route path="*" element={<MainPage />} /> ERROR */}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

