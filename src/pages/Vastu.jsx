// src/pages/Vastu.jsx
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSiteSettings } from '../context/SiteSettingsContext';
import { FiCompass, FiHome, FiSun, FiStar, FiCheck, FiSend } from 'react-icons/fi';
import SectionTitle from '../components/SectionTitle';
import CTABanner from '../sections/CTABanner';

const vastuServices = [
  { icon: FiHome, title: 'Residential Vastu', desc: 'Complete home Vastu analysis for positive energy flow, prosperity, and health of all family members.' },
  { icon: FiCompass, title: 'Plot Analysis', desc: 'Pre-purchase plot evaluation including shape, slope, surrounding environment, and directional alignment.' },
  { icon: FiSun, title: 'Office Vastu', desc: 'Optimize your workplace for productivity, financial growth, and employee wellbeing through Vastu principles.' },
  { icon: FiStar, title: 'Vastu Remedies', desc: 'Non-structural corrections and remedies for existing spaces without major renovation or demolition.' },
];

const vastuTips = [
  'Main entrance should ideally face North, East, or North-East',
  'Master bedroom in South-West for stability and health',
  'Kitchen in South-East (fire zone) for positive energy',
  'Avoid beams directly above sleeping areas',
  'Pooja room in North-East corner for spiritual energy',
  'Avoid mirrors facing the bed in the bedroom',
];

export default function Vastu() {
  const { phoneLink } = useSiteSettings();
  const [form, setForm] = useState({ name: '', phone: '', email: '', propertyType: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: '', phone: '', email: '', propertyType: '', message: '' });
  };

  return (
    <>
      <Helmet>
        <title>Vastu Consultant | BuildCraft Construction</title>
        <meta name="description" content="Expert Vastu Shastra consultancy for homes, offices, and plots. Certified Vastu consultant in Pune and Maharashtra." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80" alt="Vastu" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/80 to-dark/50" />
        </div>
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <span className="tag mb-4 inline-block">Ancient Wisdom</span>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">
              Vastu <span className="text-gradient-gold">Consultancy</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Align your space with the ancient science of Vastu Shastra for harmony, prosperity, health, and positive energy in every corner of your life.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#booking" className="btn-gold">Book Consultation</a>
              <a href={phoneLink} className="btn-outline-white">Call Expert</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="section-py bg-dark">
        <div className="container-custom">
          <SectionTitle tag="Our Vastu Services" title={<>Holistic <span className="text-gradient-gold">Vastu Solutions</span></>} center subtitle="Our certified Vastu experts help you align your space with natural energies for a fulfilling life." />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vastuServices.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.title} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="glass-card-gold p-7 rounded-2xl text-center group hover:border-gold/40 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-5 group-hover:bg-gold/20 transition-colors">
                    <Icon size={26} className="text-gold" />
                  </div>
                  <h3 className="font-heading text-white font-semibold text-lg mb-3">{s.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tips + Booking */}
      <section className="section-py bg-dark-100">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Vastu Tips */}
            <div>
              <SectionTitle tag="Quick Tips" title={<>Essential Vastu <span className="text-gradient-gold">Guidelines</span></>} />
              <div className="space-y-4">
                {vastuTips.map((tip, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                    className="flex items-start gap-4 p-4 glass-card rounded-xl">
                    <span className="w-7 h-7 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center shrink-0">
                      <FiCheck size={13} className="text-gold" />
                    </span>
                    <p className="text-gray-300 text-sm leading-relaxed">{tip}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-dark-200 rounded-2xl border border-gold/20">
                <div className="flex flex-wrap gap-4">
                  <img src="https://randomuser.me/api/portraits/women/56.jpg" alt="Vastu Expert" className="w-14 h-14 rounded-full border-2 border-gold/30" />
                  <div>
                    <p className="text-white font-semibold">Pooja Verma</p>
                    <p className="text-gold text-xs mb-2">Certified Vastu Consultant • 10 Years Experience</p>
                    <p className="text-gray-400 text-xs">I have helped 500+ families transform their homes and offices using authentic Vastu principles for prosperity and peace.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div id="booking">
              <SectionTitle tag="Book Now" title={<>Schedule a <span className="text-gradient-gold">Free Call</span></>} />
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-10 rounded-2xl text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                    <FiCheck size={28} className="text-green-400" />
                  </div>
                  <h3 className="text-white font-heading text-xl mb-2">Request Received!</h3>
                  <p className="text-gray-400 text-sm">Our Vastu consultant will call you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-xs mb-2">Your Name *</label>
                      <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Rahul Sharma" className="input-field" />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs mb-2">Phone *</label>
                      <input type="tel" required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 XXXXX XXXXX" className="input-field" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs mb-2">Email Address</label>
                    <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs mb-2">Property Type *</label>
                    <select required value={form.propertyType} onChange={e => setForm({ ...form, propertyType: e.target.value })} className="select-field">
                      <option value="">Select property type</option>
                      <option>Residential Home</option>
                      <option>Apartment / Flat</option>
                      <option>Office / Commercial</option>
                      <option>Plot / Land</option>
                      <option>Industrial</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs mb-2">Your Query</label>
                    <textarea rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Describe your Vastu concern or query..." className="textarea-field" />
                  </div>
                  <button type="submit" className="btn-gold w-full justify-center">
                    <FiSend size={15} /> Book Free Consultation
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
