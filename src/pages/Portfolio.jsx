// src/pages/Portfolio.jsx
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { FiMapPin, FiMaximize2, FiArrowRight } from 'react-icons/fi';
import SectionTitle from '../components/SectionTitle';
import { projects, categories } from '../data/projects';
import CTABanner from '../sections/CTABanner';

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filtered = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const lightboxSlides = filtered.map(p => ({ src: p.image, alt: p.title }));

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Portfolio | BuildCraft Construction</title>
        <meta name="description" content="Explore BuildCraft's portfolio of luxury homes, bungalows, commercial projects, renovation, and interior design projects across Maharashtra." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-dark-100 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80" alt="Portfolio" className="w-full h-full object-cover opacity-10" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-dark-100/60 to-dark-100" />
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="tag mb-4 inline-block">Our Work</span>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">
              Project <span className="text-gradient-gold">Portfolio</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A curated showcase of our finest residential, commercial, and interior projects.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="section-py bg-dark">
        <div className="container-custom">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="project-card group rounded-2xl overflow-hidden bg-dark-200 border border-white/5 hover:border-gold/30 hover:shadow-gold transition-all duration-500"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-200 via-transparent to-transparent" />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-dark/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <button
                        onClick={() => openLightbox(i)}
                        className="w-12 h-12 rounded-full bg-gold text-dark flex items-center justify-center hover:bg-gold-light transition-colors"
                        aria-label="View full image"
                      >
                        <FiMaximize2 size={18} />
                      </button>
                      <Link
                        to={`/portfolio/${project.id}`}
                        className="w-12 h-12 rounded-full bg-white/10 border border-white/30 text-white flex items-center justify-center hover:bg-white/20 transition-colors backdrop-blur-sm"
                        aria-label="View project details"
                      >
                        <FiArrowRight size={18} />
                      </Link>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold
                        ${project.status === 'Completed' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-gold/20 text-gold border border-gold/30'}`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="tag text-[10px]">{project.categoryLabel}</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h3 className="font-heading text-white font-bold text-lg mb-2 group-hover:text-gold transition-colors">{project.title}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1"><FiMapPin size={10} className="text-gold" />{project.location}</span>
                      <span>{project.area}</span>
                      <span>{project.year}</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${project.progress}%` }} />
                    </div>
                    <div className="flex justify-between text-xs mt-1.5 text-gray-500">
                      <span>Completion</span>
                      <span className="text-gold">{project.progress}%</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-500">No projects in this category yet.</div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={lightboxSlides}
      />

      <CTABanner />
    </>
  );
}
