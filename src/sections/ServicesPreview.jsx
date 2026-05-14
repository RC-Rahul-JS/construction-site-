// src/sections/ServicesPreview.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import SectionTitle from '../components/SectionTitle';
import { services } from '../data/services';

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function ServicesPreview() {
  return (
    <section className="section-py bg-dark">
      <div className="container-custom">
        <SectionTitle
          tag="What We Do"
          title="Our Expert Services"
          subtitle="From architectural design to complete turnkey delivery — we offer comprehensive construction services under one roof."
          center
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="service-card"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-200 via-dark-200/20 to-transparent" />
                  {/* Icon badge */}
                  <div className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-gold/20 backdrop-blur-sm border border-gold/30
                  flex items-center justify-center">
                    <Icon size={15} className="text-gold" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-heading text-white font-semibold text-base mb-2 group-hover:text-gold transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">
                    {service.shortDesc}
                  </p>
                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-gold text-xs font-semibold tracking-wide uppercase
                    hover:gap-3 transition-all duration-300"
                  >
                    Learn More <FiArrowRight size={12} />
                  </Link>
                </div>

                {/* Bottom gold bar on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-gradient scale-x-0 group-hover:scale-x-100
                transition-transform duration-500 origin-left" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <Link to="/services" className="btn-outline">
            View All Services
            <FiArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
