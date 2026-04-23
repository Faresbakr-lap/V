import { BadgeCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ListingCard({ listing }) {
  return (
    <article className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3 shadow-sm">
      <h3 className="font-semibold text-lg">{listing.name}</h3>
      <p className="text-sm text-slate-500">{listing.category} • {listing.audienceCountry}</p>
      <div className="text-sm grid grid-cols-2 gap-2">
        <span>Followers: {listing.followersCount.toLocaleString()}</span>
        <span>Engagement: {listing.engagementRate}%</span>
        <span>Monetized: {listing.monetization ? 'Yes' : 'No'}</span>
        <span>Rights Mgr: {listing.rightsManager ? 'Yes' : 'No'}</span>
      </div>
      <div className="flex justify-between items-center">
        <strong className="text-brand text-lg">${listing.price}</strong>
        {listing.verified && <BadgeCheck className="text-emerald-500" size={18} />}
      </div>
      <Link className="inline-block text-sm px-4 py-2 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900" to={`/listing/${listing.id}`}>
        View Details
      </Link>
    </article>
  );
}
