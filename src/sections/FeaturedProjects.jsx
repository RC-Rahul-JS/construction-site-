// src/sections/FeaturedProjects.jsx
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { motion } from 'framer-motion';
import { FiArrowRight, FiMapPin, FiClock } from 'react-icons/fi';
import { FaRupeeSign } from 'react-icons/fa';
import SectionTitle from '../components/SectionTitle';
import { projects } from '../data/projects';

const featured = projects.filter(p => p.featured);

export default function FeaturedProjects() {
  return (
    <section className="section-py bg-dark-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <SectionTitle
            tag="Our Work"
            title={<>Featured <span className="text-gradient-gold">Projects</span></>}
            subtitle="Handpicked showcase of our most prestigious and impactful construction achievements."
          />
          <Link to="/portfolio" className="btn-outline shrink-0 self-start lg:self-auto mb-14 lg:mb-0">
            All Projects <FiArrowRight size={16} />
          </Link>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-14"
        >
          {featured.map((project) => (
            <SwiperSlide key={project.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group bg-dark-200 rounded-2xl overflow-hidden border border-white/5 hover:border-gold/30
                transition-all duration-500 hover:shadow-gold hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-200 via-transparent to-transparent" />
                  {/* Status badge */}
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold
                    ${project.status === 'Completed' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-gold/20 text-gold border border-gold/30'}`}>
                    {project.status}
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="tag text-[10px]">{project.categoryLabel}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-heading text-white font-bold text-lg mb-3 group-hover:text-gold transition-colors">
                    {project.title}
                  </h3>

                  <div className="flex flex-wrap gap-3 mb-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <FiMapPin size={11} className="text-gold" />
                      {project.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiClock size={11} className="text-gold" />
                      {project.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaRupeeSign size={10} className="text-gold" />
                      {project.budget}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-gray-500">Completion</span>
                      <span className="text-gold font-semibold">{project.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  <Link
                    to={`/portfolio/${project.id}`}
                    className="inline-flex items-center gap-2 text-gold text-xs font-semibold uppercase tracking-wide
                    hover:gap-4 transition-all duration-300"
                  >
                    View Details <FiArrowRight size={12} />
                  </Link>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
