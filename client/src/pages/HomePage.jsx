import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const categories = ['Cars', 'Beauty', 'News', 'Entertainment', 'Sports'];

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl p-10 bg-gradient-to-br from-brand to-blue-800 text-white">
        <h1 className="text-4xl font-bold mb-4">Buy & Sell Facebook Pages with Confidence</h1>
        <p className="max-w-2xl mb-6 opacity-90">A premium marketplace for verified, monetized, and high-engagement pages. Secure payments, verified sellers, and AI recommendations.</p>
        <div className="flex gap-3">
          <Link className="px-5 py-3 rounded-xl bg-white text-brand font-semibold" to="/market">Buy Pages</Link>
          <Link className="px-5 py-3 rounded-xl border border-white" to="/dashboard">Sell Pages</Link>
        </div>
      </motion.section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Popular Categories</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-4">{categories.map((c) => <div key={c} className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 text-center">{c}</div>)}</div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        {['Verified pages', 'Secure Stripe checkout', 'Trusted seller network'].map((item) => (
          <article key={item} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">{item}</article>
        ))}
      </section>
    </main>
  );
}
