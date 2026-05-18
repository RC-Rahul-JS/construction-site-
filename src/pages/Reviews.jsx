// src/pages/Reviews.jsx
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getDocuments } from '../firebase/firestore';
import { FiSearch, FiStar, FiUser, FiArrowLeft } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getDocuments('testimonials', { filters: [{ field: 'approved', op: '==', value: true }] })
      .then(data => setReviews(data))
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = reviews.filter(r => 
    (r.name || r.clientName || '').toLowerCase().includes(search.toLowerCase()) ||
    (r.message || r.review || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Client Reviews | BuildCraft Construction</title>
        <meta name="description" content="Read what our clients have to say about their experience with BuildCraft Construction." />
      </Helmet>

      <section className="relative pt-32 pb-20 bg-dark-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-100/60 to-dark-100" />
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-gold text-sm mb-6 hover:gap-3 transition-all">
              <FiArrowLeft size={14} /> Back to Home
            </Link>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">
              Client <span className="text-gradient-gold">Reviews</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              Discover why homeowners and developers across Maharashtra trust BuildCraft.
            </p>
            
            <div className="max-w-md mx-auto relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search by name or keyword..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-dark-200 border border-white/10 text-white placeholder-gray-500 rounded-xl pl-12 pr-5 py-4 focus:outline-none focus:border-gold transition-colors"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-py bg-dark min-h-[400px]">
        <div className="container-custom">
          {loading ? (
            <div className="text-center py-20 text-white">Loading reviews...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-lg">No reviews found matches "{search}"</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((r, i) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="testimonial-card flex flex-col"
                >
                  <FaQuoteLeft size={24} className="text-gold/20 mb-4" />
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} size={12} className={i < r.rating ? 'text-gold fill-gold' : 'text-gray-600'} />
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 italic flex-1">
                    "{r.message || r.review}"
                  </p>
                  <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-dark-300 flex items-center justify-center border border-gold/30">
                      {r.image ? (
                        <img src={r.image} alt={r.name || r.clientName} className="w-full h-full object-cover" />
                      ) : (
                        <FiUser className="text-gray-500" size={16} />
                      )}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{r.name || r.clientName}</p>
                      <p className="text-gray-500 text-[10px] uppercase tracking-wider">
                        {r.designation || r.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
