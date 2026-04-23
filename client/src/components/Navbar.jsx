import { Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ darkMode, setDarkMode }) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 backdrop-blur border-b border-slate-200/80 dark:border-slate-800 bg-white/85 dark:bg-slate-900/70">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-brand">Fares Bakr</Link>
        <nav className="flex items-center gap-5 text-sm font-medium text-slate-700 dark:text-slate-200">
          <Link to="/market">Marketplace</Link>
          <Link to="/recommendations">AI Picks</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/messages">Messages</Link>
          <button onClick={() => setDarkMode(!darkMode)}>{darkMode ? <Sun size={18} /> : <Moon size={18} />}</button>
          <Link to="/auth" className="px-4 py-2 rounded-lg bg-brand text-white">{user ? user.name : 'Login'}</Link>
        </nav>
      </div>
    </header>
  );
}
