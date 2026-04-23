import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

export default function ListingDetailsPage() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    api.get(`/listings/${id}`).then(({ data }) => {
      setListing(data);
      api.post('/recommendations/events', { listingId: id, action: 'VIEW', durationSec: 30 }).catch(() => {});
    });
  }, [id]);

  if (!listing) return <div className="p-8">Loading...</div>;

  return (
    <main className="max-w-5xl mx-auto px-6 py-8 space-y-5">
      <h1 className="text-3xl font-bold">{listing.name}</h1>
      <p className="text-slate-500">{listing.description}</p>
      <div className="grid md:grid-cols-3 gap-4 text-sm">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border">Followers: {listing.followersCount.toLocaleString()}</div>
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border">Reach: {listing.reach.toLocaleString()}</div>
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border">Engagement: {listing.engagementRate}%</div>
      </div>
      <section className="rounded-xl p-4 bg-white dark:bg-slate-900 border space-y-2">
        <h2 className="font-semibold">Audience Insights</h2>
        <pre className="text-xs overflow-x-auto">{JSON.stringify(listing.audienceBreakdown, null, 2)}</pre>
      </section>
      <button className="px-6 py-3 rounded-xl bg-brand text-white">Buy for ${listing.price}</button>
    </main>
  );
}
