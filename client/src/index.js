import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './index.css';
import MainPage from './pages/MainPage';
import GamePage from './pages/GamePage';




export default function App() {
        return (
            <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/game" element={<GamePage />} />
                </Routes>
            </BrowserRouter>
            </>
        );
    }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

