// src/sections/HeroSlider.jsx
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { getDocuments } from '../firebase/firestore';

const textVariants = { enter: { opacity: 0, y: 40 }, center: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 } };

export default function HeroSlider() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    getDocuments('sliders', { sortBy: 'order', sortOrder: 'asc' })
      .then(data => {
        setSlides(data);
      })
      .catch(() => setSlides([]))
      .finally(() => setLoading(false));
  }, []);

  const goTo = useCallback((idx) => { setDirection(idx > current ? 1 : -1); setCurrent(idx); }, [current]);
  const next = useCallback(() => { setDirection(1); setCurrent(prev => slides.length > 0 ? (prev + 1) % slides.length : 0); }, [slides.length]);
  const prev = useCallback(() => { setDirection(-1); setCurrent(prev => slides.length > 0 ? (prev - 1 + slides.length) % slides.length : 0); }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, slides.length]);

  if (loading || slides.length === 0) return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-dark flex items-center justify-center text-white">
      <div className="animate-pulse text-gray-400">Loading...</div>
    </section>
  );

  const slide = slides[current];

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-dark">
      <AnimatePresence initial={false}>
        <motion.div key={slide.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2 }} className="absolute inset-0">
          <img src={slide.image} alt={slide.title} className="hero-slide-img" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-10" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 h-full flex items-center pt-24 sm:pt-32">
        <div className="container-custom w-full">
          <div className="max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div key={`content-${slide.id}`}>
                <motion.div variants={textVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.6, delay: 0.1 }} className="mb-5">
                  <span className="tag">{slide.tag}</span>
                </motion.div>
                <motion.h1 variants={textVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.7, delay: 0.2 }} className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-3">
                  {slide.title}<br /><span className="text-gradient-gold">{slide.titleAlt}</span>
                </motion.h1>
                <motion.p variants={textVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.7, delay: 0.35 }} className="text-sm sm:text-base md:text-lg text-gray-300 mb-8 max-w-lg leading-relaxed">
                  {slide.subtitle}
                </motion.p>
                <motion.div variants={textVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.7, delay: 0.5 }} className="flex flex-wrap gap-4">
                  <Link to={slide.btn1?.to || '/portfolio'} className="btn-gold">{slide.btn1?.label || 'Explore'}<FiArrowRight size={16} /></Link>
                  <Link to={slide.btn2?.to || '/contact'} className="btn-outline-white">{slide.btn2?.label || 'Contact Us'}</Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>


      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3 items-center">
        {slides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-400 rounded-full ${i === current ? 'w-8 h-2 bg-gold' : 'w-2 h-2 bg-white/40 hover:bg-white/70'}`} />
        ))}
      </div>
      <div className="absolute bottom-8 right-8 z-30 text-white/40 text-sm font-mono">
        <span className="text-gold font-semibold">0{current + 1}</span> / 0{slides.length}
      </div>
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 hidden md:flex flex-col items-center gap-1.5"
        style={{ left: '50%', transform: 'translateX(-50%) translateX(120px)' }}>
        <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-gold/50 to-transparent" />
      </motion.div>
    </section>
  );
}
