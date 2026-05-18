// src/pages/Services.jsx
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import SectionTitle from '../components/SectionTitle';
import { useState, useEffect } from 'react';
import { getDocuments } from '../firebase/firestore';
import * as FaIcons from 'react-icons/fa';
import CTABanner from '../sections/CTABanner';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocuments('services', { sortBy: 'order', sortOrder: 'asc' })
      .then(data => {
        setServices(data);
      })
      .catch(() => setServices([]))
      .finally(() => setLoading(false));
  }, []);


  if (loading) return <section className="section-py bg-dark text-white text-center">Loading services...</section>;
  return (
    <>
      <Helmet>
        <title>Our Services | BuildCraft Construction</title>
        <meta name="description" content="Explore BuildCraft's comprehensive construction services: architecture, home construction, bungalow design, interior design, renovation, Vastu consultancy, and more." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-dark-100 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80" alt="Services" className="w-full h-full object-cover opacity-10" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-dark-100/60 to-dark-100" />
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="tag mb-4 inline-block">What We Offer</span>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">
              Our <span className="text-gradient-gold">Services</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Comprehensive construction and design solutions tailored to every need and budget.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-py bg-dark">
        <div className="container-custom">
          <SectionTitle tag="Expert Services" title={<>Everything You Need, <span className="text-gradient-gold">Under One Roof</span></>} center />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => {
              const Icon = typeof service.icon === 'string' ? (FaIcons[service.icon] || FaIcons.FaWrench) : service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="service-card group"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-200 via-dark-200/30 to-transparent" />
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-gold/20 backdrop-blur-sm border border-gold/30 flex items-center justify-center">
                      <Icon size={18} className="text-gold" />
                    </div>
                  </div>
                  <div className="p-7">
                    <h2 className="font-heading text-white font-bold text-xl mb-3 group-hover:text-gold transition-colors">{service.title}</h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5">{service.description}</p>
                    <ul className="space-y-2 mb-6">
                      {(service.features || []).map(f => (
                        <li key={f} className="flex items-center gap-2 text-gray-400 text-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link to={`/services/${service.slug}`} className="btn-gold text-xs px-5 py-2.5">
                      Learn More <FiArrowRight size={13} />
                    </Link>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
