import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './index.css';
import Verification from './components/Verification';
import MainPage from './pages/MainPage';
import GamePage from './pages/GamePage';
import HomePage from './pages/HomePage';




export default function App() {
        return (
            <>
            <Verification />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/game" element={<GamePage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="*" element={<MainPage />} /> {/*ERROR*/}
                </Routes>
            </BrowserRouter>
            </>
        );
    }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

