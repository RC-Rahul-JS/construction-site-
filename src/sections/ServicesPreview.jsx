// src/sections/ServicesPreview.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import SectionTitle from '../components/SectionTitle';
import { useState, useEffect } from 'react';
import { getDocuments } from '../firebase/firestore';
import * as FaIcons from 'react-icons/fa';
import { services as fallbackServices } from '../data/services';

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function ServicesPreview() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocuments('services', { sortBy: 'order', sortOrder: 'asc' })
      .then(data => {
        setServices(data.length > 0 ? data : fallbackServices);
      })
      .catch(() => setServices(fallbackServices))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <section className="section-py bg-dark text-white text-center">Loading services...</section>;

  const row1 = services.slice(0, Math.ceil(services.length / 2));
  const row2 = services.slice(Math.ceil(services.length / 2));

  const ServiceCard = ({ service }) => {
    const Icon = typeof service.icon === 'string' ? (FaIcons[service.icon] || FaIcons.FaWrench) : service.icon;
    return (
      <div className="service-card group w-[180px] sm:w-[210px] flex-shrink-0 cursor-pointer rounded-xl">
        {/* Image */}
        <div className="relative h-28 overflow-hidden rounded-t-xl">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-200 via-dark-200/20 to-transparent" />
          {/* Icon badge */}
          <div className="absolute top-2 right-2 w-7 h-7 rounded-md bg-gold/20 backdrop-blur-sm border border-gold/30
          flex items-center justify-center">
            <Icon size={12} className="text-gold" />
          </div>
        </div>

        {/* Content */}
        <div className="p-3">
          <h3 className="font-heading text-white font-semibold text-[13px] mb-1.5 group-hover:text-gold transition-colors duration-300">
            {service.title}
          </h3>
          <p className="text-gray-500 text-[10px] leading-snug mb-2.5 line-clamp-2">
            {service.shortDesc}
          </p>
          <Link
            to={`/services/${service.slug}`}
            className="inline-flex items-center gap-1.5 text-gold text-[10px] font-semibold tracking-wide uppercase
            hover:gap-2.5 transition-all duration-300"
          >
            Learn More <FiArrowRight size={10} />
          </Link>
        </div>

        {/* Bottom gold bar on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-gradient scale-x-0 group-hover:scale-x-100
        transition-transform duration-500 origin-left" />
      </div>
    );
  };

  return (
    <section className="section-py bg-dark overflow-hidden">
      <div className="container-custom">
        <SectionTitle
          tag="What We Do"
          title={<>Our Expert <span className="text-gradient-gold">Services</span></>}
          subtitle="From architectural design to complete turnkey delivery — we offer comprehensive construction services under one roof."
          center
        />
      </div>

      {/* Marquee Rows */}
      <div className="mt-10 flex flex-col gap-6">
        {/* Row 1: Left to Right */}
        <div className="flex w-max animate-marquee-right hover:[animation-play-state:paused]">
          <div className="flex gap-6 px-3">
            {[...row1, ...row1, ...row1].map((service, i) => (
              <ServiceCard key={`${service.id}-${i}`} service={service} />
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left */}
        <div className="flex w-max animate-marquee-left hover:[animation-play-state:paused]">
          <div className="flex gap-6 px-3">
            {[...row2, ...row2, ...row2].map((service, i) => (
              <ServiceCard key={`${service.id}-${i}`} service={service} />
            ))}
          </div>
        </div>
      </div>

      <div className="container-custom mt-14 text-center">
        <Link to="/services" className="btn-outline">
          View All Services
          <FiArrowRight size={16} />
        </Link>
      </div>

      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-33.33%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marqueeLeft 45s linear infinite;
        }
        .animate-marquee-right {
          animation: marqueeRight 45s linear infinite;
        }
      `}</style>
    </section>
  );
}
