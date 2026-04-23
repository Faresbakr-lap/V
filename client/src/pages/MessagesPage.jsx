import { useEffect, useState } from 'react';
import api from '../services/api';

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    api.get('/social/messages').then(({ data }) => setMessages(data)).catch(() => {});
  }, []);

  return (
    <main className="max-w-4xl mx-auto px-6 py-8 space-y-3">
      <h1 className="text-2xl font-bold">Messages</h1>
      <div className="space-y-2">{messages.map((m) => <div key={m.id} className="p-3 rounded-xl border bg-white dark:bg-slate-900">{m.content}</div>)}</div>
    </main>
  );
}
