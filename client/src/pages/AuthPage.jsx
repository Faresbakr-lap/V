import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const endpoint = mode === 'login' ? '/auth/login' : '/auth/register';
    const { data } = await api.post(endpoint, form);
    login(data);
    navigate('/market');
  };

  return (
    <main className="max-w-md mx-auto px-6 py-14">
      <form className="space-y-3 p-6 rounded-2xl border bg-white dark:bg-slate-900" onSubmit={submit}>
        <h1 className="text-2xl font-bold">{mode === 'login' ? 'Sign In' : 'Create Account'}</h1>
        {mode === 'register' && <input className="w-full p-3 rounded bg-slate-100 dark:bg-slate-800" placeholder="Name" onChange={(e) => setForm((v) => ({ ...v, name: e.target.value }))} />}
        <input className="w-full p-3 rounded bg-slate-100 dark:bg-slate-800" placeholder="Email" onChange={(e) => setForm((v) => ({ ...v, email: e.target.value }))} />
        <input type="password" className="w-full p-3 rounded bg-slate-100 dark:bg-slate-800" placeholder="Password" onChange={(e) => setForm((v) => ({ ...v, password: e.target.value }))} />
        <button className="w-full py-3 rounded bg-brand text-white">Continue</button>
        <button type="button" className="text-sm" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>Switch to {mode === 'login' ? 'Register' : 'Login'}</button>
      </form>
    </main>
  );
}
