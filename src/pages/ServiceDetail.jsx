// src/pages/ServiceDetail.jsx
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getDocumentByField, getDocuments } from '../firebase/firestore';
import * as FaIcons from 'react-icons/fa';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck, FiArrowLeft } from 'react-icons/fi';
import CTABanner from '../sections/CTABanner';
import FAQSection from '../sections/FAQSection';

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [otherServices, setOtherServices] = useState([]);

  useEffect(() => {
    setLoading(true);
    getDocumentByField('services', 'slug', slug)
      .then(data => {
        setService(data);
      })
      .catch(() => setService(null))
      .finally(() => setLoading(false));

    getDocuments('services', { sortBy: 'order', sortOrder: 'asc' })
      .then(data => setOtherServices(data))
      .catch(() => setOtherServices([]));
  }, [slug]);


  if (loading) return <div className="min-h-screen flex items-center justify-center bg-dark pt-20 text-white">Loading...</div>;

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark pt-20">
        <div className="text-center">
          <h2 className="text-white font-heading text-3xl mb-4">Service not found</h2>
          <Link to="/services" className="btn-gold">Back to Services</Link>
        </div>
      </div>
    );
  }

  const Icon = typeof service.icon === 'string' ? (FaIcons[service.icon] || FaIcons.FaWrench) : service.icon;

  return (
    <>
      <Helmet>
        <title>{service.title} | BuildCraft Construction</title>
        <meta name="description" content={service.description} />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/80 to-dark/40" />
        </div>
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <Link to="/services" className="inline-flex items-center gap-2 text-gold text-sm mb-6 hover:gap-3 transition-all">
              <FiArrowLeft size={14} /> Back to Services
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-gold/20 border border-gold/40 flex items-center justify-center">
                <Icon size={26} className="text-gold" />
              </div>
              <span className="tag">Our Services</span>
            </div>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">{service.title}</h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">{service.description}</p>
            <Link to="/contact" className="btn-gold">
              Get a Quote <FiArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="section-py bg-dark">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="font-heading text-4xl font-bold text-white mb-6">
                Why Choose Our <span className="text-gradient-gold">{service.title}</span> Service?
              </h2>
              <div 
                className="rich-text mb-8"
                dangerouslySetInnerHTML={{ __html: service.description }}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(service.features || []).map(f => (
                  <div key={f} className="flex items-start gap-3 p-4 glass-card rounded-xl">
                    <span className="w-6 h-6 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center shrink-0 mt-0.5">
                      <FiCheck size={12} className="text-gold" />
                    </span>
                    <span className="text-gray-300 text-sm">{f}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/contact" className="btn-gold">Book Consultation</Link>
                <Link to="/portfolio" className="btn-outline">View Projects</Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="relative rounded-2xl overflow-hidden">
                <img src={service.image} alt={service.title} className="w-full h-[440px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="py-16 bg-dark-100 border-t border-white/5">
        <div className="container-custom">
          <h3 className="font-heading text-2xl font-bold text-white mb-8 text-center">Explore Other Services</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {otherServices.filter(s => s.slug !== slug).map(s => {
              const SIcon = typeof s.icon === 'string' ? (FaIcons[s.icon] || FaIcons.FaWrench) : s.icon;
              return (
                <Link key={s.id} to={`/services/${s.slug}`} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-dark-200 border border-white/5 text-gray-400 text-sm hover:border-gold/30 hover:text-gold transition-all duration-300">
                  <SIcon size={14} className="text-gold" /> {s.title}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <FAQSection />
      <CTABanner />
    </>
  );
}
