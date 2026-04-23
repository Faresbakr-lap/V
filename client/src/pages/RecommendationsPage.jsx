import { useEffect, useState } from 'react';
import ListingCard from '../components/ListingCard';
import api from '../services/api';

export default function RecommendationsPage() {
  const [data, setData] = useState({ recommendations: [] });

  useEffect(() => {
    api.get('/recommendations').then((res) => setData(res.data)).catch(() => setData({ recommendations: [] }));
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-6 py-8 space-y-5">
      <h1 className="text-2xl font-bold">AI-Powered Recommendations</h1>
      <p className="text-sm text-slate-500">Behavior model: {data.strategy || 'Sign in to activate personalized suggestions.'}</p>
      <div className="grid md:grid-cols-3 gap-4">{data.recommendations.map((listing) => <ListingCard key={listing.id} listing={listing} />)}</div>
    </main>
  );
}
