// src/pages/Blog.jsx
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiClock, FiArrowRight } from 'react-icons/fi';
import { blogs } from '../data/blog';

const allCategories = ['All', ...new Set(blogs.map(b => b.category))];

export default function Blog() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = blogs.filter(b => {
    const matchCat = activeCategory === 'All' || b.category === activeCategory;
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <Helmet>
        <title>Blog | BuildCraft Construction</title>
        <meta name="description" content="Expert construction tips, design trends, Vastu guidance, and building insights from BuildCraft's team." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-dark-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-100/60 to-dark-100" />
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="tag mb-4 inline-block">Our Blog</span>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">
              Construction <span className="text-gradient-gold">Insights</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              Expert articles on architecture, design trends, construction tips, and more.
            </p>
            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-dark-200 border border-white/10 text-white placeholder-gray-500 rounded-xl pl-12 pr-5 py-4 focus:outline-none focus:border-gold transition-colors"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-py bg-dark">
        <div className="container-custom">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 mb-12">
            {allCategories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="bg-dark-200 rounded-2xl overflow-hidden border border-white/5 hover:border-gold/25 group transition-all duration-400 hover:-translate-y-1 hover:shadow-gold"
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-200 to-transparent" />
                  <span className="absolute top-4 left-4 tag text-[10px]">{post.category}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><FiClock size={11} className="text-gold" />{post.readTime}</span>
                    <span>{post.date}</span>
                  </div>
                  <h2 className="font-heading text-white font-bold text-lg leading-tight mb-3 group-hover:text-gold transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <img src={post.authorImage} alt={post.author} className="w-7 h-7 rounded-full border border-gold/30" />
                      <span className="text-gray-400 text-xs">{post.author}</span>
                    </div>
                    <Link to={`/blog/${post.slug}`} className="text-gold text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                      Read <FiArrowRight size={11} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              <p className="text-lg mb-2">No articles found</p>
              <p className="text-sm">Try a different search term or category</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
