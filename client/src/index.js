import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './index.css';
import MainPage from './pages/MainPage';
import Other from './pages/Other'


export default function App() {
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/other" element={<Other />} />
        </Routes>
      </BrowserRouter>
    );
  }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

