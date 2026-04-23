const countries = ['USA', 'India', 'Pakistan', 'Egypt', 'UAE'];
const categories = ['cars', 'beauty', 'news', 'entertainment', 'business'];

export default function FilterPanel({ filters, setFilters, onApply }) {
  return (
    <section className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900 space-y-3">
      <h2 className="font-semibold">Advanced Filters</h2>
      <div className="grid md:grid-cols-4 gap-3 text-sm">
        <select className="p-2 rounded bg-slate-100 dark:bg-slate-800" onChange={(e) => setFilters((v) => ({ ...v, country: e.target.value }))}>
          <option value="">Country</option>{countries.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select className="p-2 rounded bg-slate-100 dark:bg-slate-800" onChange={(e) => setFilters((v) => ({ ...v, category: e.target.value }))}>
          <option value="">Category</option>{categories.map((c) => <option key={c}>{c}</option>)}
        </select>
        <input type="number" placeholder="Min followers" className="p-2 rounded bg-slate-100 dark:bg-slate-800" onChange={(e) => setFilters((v) => ({ ...v, minFollowers: e.target.value }))} />
        <input type="number" placeholder="Max price" className="p-2 rounded bg-slate-100 dark:bg-slate-800" onChange={(e) => setFilters((v) => ({ ...v, maxPrice: e.target.value }))} />
      </div>
      <button className="px-4 py-2 rounded bg-brand text-white" onClick={onApply}>Apply</button>
    </section>
  );
}
