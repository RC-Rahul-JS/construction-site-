// src/sections/HeroSlider.jsx
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=90',
    tag: 'Luxury Residences',
    title: 'Building Dreams',
    titleAlt: 'Into Reality',
    subtitle: 'Premium Architecture & Construction Solutions for the Discerning Client',
    btn1: { label: 'Explore Projects', to: '/portfolio' },
    btn2: { label: 'Contact Us', to: '/contact' },
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=90',
    tag: 'Commercial Excellence',
    title: 'Modern Construction',
    titleAlt: 'For Modern Living',
    subtitle: 'Residential • Commercial • Renovation — All Under One Roof',
    btn1: { label: 'Our Services', to: '/services' },
    btn2: { label: 'Get Quote', to: '/quote' },
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&q=90',
    tag: 'Interior Design',
    title: 'Luxury Bungalow &',
    titleAlt: 'Interior Designs',
    subtitle: 'Creative Spaces With Smart Planning & Vastu Expertise',
    btn1: { label: 'View Portfolio', to: '/portfolio' },
    btn2: { label: 'Free Consultation', to: '/contact' },
  },
];

const textVariants = {
  enter: { opacity: 0, y: 40 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((idx) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  }, [current]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent(prev => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent(prev => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-dark">
      {/* Background Images */}
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="hero-slide-img"
            loading="eager"
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-10" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container-custom w-full">
          <div className="max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div key={`content-${slide.id}`}>
                {/* Tag */}
                <motion.div
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mb-5"
                >
                  <span className="tag">{slide.tag}</span>
                </motion.div>

                {/* Title */}
                <motion.h1
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-none mb-3"
                >
                  {slide.title}
                  <br />
                  <span className="text-gradient-gold">{slide.titleAlt}</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.7, delay: 0.35 }}
                  className="text-lg text-gray-300 mb-10 max-w-xl leading-relaxed"
                >
                  {slide.subtitle}
                </motion.p>

                {/* Buttons */}
                <motion.div
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.7, delay: 0.5 }}
                  className="flex flex-wrap gap-4"
                >
                  <Link to={slide.btn1.to} className="btn-gold">
                    {slide.btn1.label}
                    <FiArrowRight size={16} />
                  </Link>
                  <Link to={slide.btn2.to} className="btn-outline-white">
                    {slide.btn2.label}
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Arrow Controls */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full
        bg-black/40 border border-white/20 flex items-center justify-center text-white
        hover:bg-gold/20 hover:border-gold transition-all duration-300 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <FiChevronLeft size={22} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full
        bg-black/40 border border-white/20 flex items-center justify-center text-white
        hover:bg-gold/20 hover:border-gold transition-all duration-300 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <FiChevronRight size={22} />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3 items-center">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-400 rounded-full ${
              i === current
                ? 'w-8 h-2 bg-gold'
                : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 right-8 z-30 text-white/40 text-sm font-mono">
        <span className="text-gold font-semibold">0{current + 1}</span> / 0{slides.length}
      </div>

      {/* Scroll Hint */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 hidden md:flex flex-col items-center gap-1.5"
        style={{ left: '50%', transform: 'translateX(-50%) translateX(120px)' }}
      >
        <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-gold/50 to-transparent" />
      </motion.div>
    </section>
  );
}
