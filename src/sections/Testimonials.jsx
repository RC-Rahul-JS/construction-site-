// src/sections/Testimonials.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import SectionTitle from '../components/SectionTitle';
import { testimonials } from '../data/testimonials';

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5 mb-4">
      {[...Array(5)].map((_, i) => (
        <FaStar key={i} size={13} className={i < rating ? 'text-gold' : 'text-gray-600'} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="section-py bg-dark-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gold/3 via-transparent to-gold/3 pointer-events-none" />

      <div className="container-custom relative z-10">
        <SectionTitle
          tag="Client Reviews"
          title={<>What Our <span className="text-gradient-gold">Clients Say</span></>}
          subtitle="Real stories from homeowners, businesses, and developers who trusted us with their vision."
          center
        />

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-14"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="testimonial-card h-full flex flex-col">
                {/* Quote icon */}
                <FaQuoteLeft size={28} className="text-gold/30 mb-4" />

                <StarRating rating={t.rating} />

                <p className="text-gray-300 text-sm leading-relaxed flex-1 mb-6 italic">
                  "{t.review}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gold/30"
                  />
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.role} • {t.location}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="text-[9px] text-gold tracking-wide uppercase font-medium">
                      {t.project}
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
