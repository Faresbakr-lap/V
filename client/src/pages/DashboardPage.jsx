import { useState } from 'react';
import api from '../services/api';

const initial = {
  name: '', description: '', category: 'news', audienceCountry: 'USA', followersCount: 100000,
  engagementRate: 3.5, verified: false, rightsManager: false, monetization: true, price: 1000,
  reach: 10000, avgDailyViews: 2000, genderSplit: { male: 55, female: 45 }, ageSplit: { '18-24': 30 }, audienceBreakdown: { USA: 40 },
};

export default function DashboardPage() {
  const [form, setForm] = useState(initial);

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/listings', form);
    alert('Listing saved');
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-4">Seller Dashboard</h1>
      <form className="grid gap-3" onSubmit={submit}>
        {['name', 'description', 'category', 'audienceCountry', 'followersCount', 'engagementRate', 'price'].map((field) => (
          <input key={field} placeholder={field} className="p-3 rounded bg-white dark:bg-slate-900 border" value={form[field]} onChange={(e) => setForm((v) => ({ ...v, [field]: e.target.value }))} />
        ))}
        <button className="px-4 py-2 rounded bg-brand text-white">Create Listing</button>
      </form>
    </main>
  );
}
