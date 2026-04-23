import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import ListingDetailsPage from './pages/ListingDetailsPage';
import MarketplacePage from './pages/MarketplacePage';
import MessagesPage from './pages/MessagesPage';
import RecommendationsPage from './pages/RecommendationsPage';
import './index.css';

function App() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/market" element={<MarketplacePage />} />
          <Route path="/listing/:id" element={<ListingDetailsPage />} />
          <Route path="/recommendations" element={<RecommendationsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
