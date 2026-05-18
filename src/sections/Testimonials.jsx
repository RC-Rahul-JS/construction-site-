// src/sections/Testimonials.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { Autoplay, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaStar, FaQuoteLeft, FaPen } from 'react-icons/fa';
import { FiX, FiArrowRight } from 'react-icons/fi';
import SectionTitle from '../components/SectionTitle';
import { useState, useEffect } from 'react';
import { getDocuments } from '../firebase/firestore';
import TestimonialForm from '../components/TestimonialForm';
import { getDocumentById } from '../firebase/firestore';

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <FaStar key={i} size={10} className={i < rating ? 'text-gold' : 'text-gray-600'} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allowPublic, setAllowPublic] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch settings
    getDocumentById('settings', 'global').then(settings => {
      if (settings) setAllowPublic(settings.allowPublicTestimonials !== false);
    });
    getDocuments('testimonials', { filters: [{ field: 'approved', op: '==', value: true }] })
      .then(data => {
        setTestimonials(data);
      })
      .catch(() => setTestimonials([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <section className="section-py bg-dark-100 text-white text-center">Loading testimonials...</section>;

  return (
    <section className="section-py bg-dark-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gold/3 via-transparent to-gold/3 pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionTitle
            tag="Client Reviews"
            title={<>What Our <span className="text-gradient-gold">Clients Say</span></>}
            subtitle="Real stories from homeowners and developers who trusted us with their vision."
            noMargin
          />
          
          <div className="flex items-center gap-4">
            <Link to="/reviews" className="text-gold text-[13px] font-semibold hover:underline flex items-center gap-1.5">
              View All Reviews <FiArrowRight size={14} />
            </Link>
            {allowPublic && (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="btn-gold text-xs px-5 py-2.5 flex items-center gap-2"
              >
                <FaPen size={10} /> Write a Review
              </button>
            )}
          </div>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={16}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="testimonial-card !p-5 h-full flex flex-col relative group hover:-translate-y-1 transition-transform duration-300">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover border border-gold/30"
                    />
                    <div>
                      <p className="text-white font-bold text-[13px]">{t.name}</p>
                      <p className="text-gray-500 text-[10px] leading-tight">
                        {t.designation || t.role} {t.company || t.location ? `• ${t.company || t.location}` : ''}
                      </p>
                    </div>
                  </div>
                  <FaQuoteLeft size={20} className="text-gold/20 group-hover:text-gold/40 transition-colors" />
                </div>

                <p className="text-gray-300 text-[11px] leading-relaxed flex-1 mb-4 italic">
                  "{t.message || t.review}"
                </p>

                <div className="flex justify-between items-end border-t border-white/5 pt-3 mt-auto">
                  <StarRating rating={t.rating} />
                  {t.project && (
                    <span className="text-[9px] text-gold tracking-wide uppercase font-semibold">
                      {t.project}
                    </span>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Modal for Submission */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark/90 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-full max-w-2xl bg-dark-100 rounded-3xl overflow-hidden border border-white/10"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white z-10"
              >
                <FiX size={24} />
              </button>
              <div className="max-h-[90vh] overflow-y-auto">
                <TestimonialForm />
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
