import { useEffect, useState } from 'react';
import FilterPanel from '../components/FilterPanel';
import ListingCard from '../components/ListingCard';
import api from '../services/api';

export default function MarketplacePage() {
  const [filters, setFilters] = useState({});
  const [listings, setListings] = useState([]);

  const loadListings = async () => {
    const { data } = await api.get('/listings', { params: filters });
    setListings(data);
  };

  useEffect(() => {
    loadListings();
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
      <FilterPanel filters={filters} setFilters={setFilters} onApply={loadListings} />
      <div className="grid md:grid-cols-3 gap-4">{listings.map((listing) => <ListingCard key={listing.id} listing={listing} />)}</div>
    </main>
  );
}
