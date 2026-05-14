// src/pages/Contact.jsx
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend, FiCheck } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const contactInfo = [
  { icon: FiMapPin, title: 'Office Address', lines: ['123 Construction Avenue, Baner,', 'Pune – 411045, Maharashtra'] },
  { icon: FiPhone, title: 'Phone & WhatsApp', lines: ['+91 98765 43210', '+91 98765 43211'] },
  { icon: FiMail, title: 'Email Address', lines: ['info@buildcraft.in', 'projects@buildcraft.in'] },
  { icon: FiClock, title: 'Working Hours', lines: ['Mon – Sat: 9:00 AM – 7:00 PM', 'Sunday: 10:00 AM – 2:00 PM'] },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', budget: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', service: '', budget: '', message: '' });
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | BuildCraft Construction</title>
        <meta name="description" content="Get in touch with BuildCraft Construction for free consultation, project quotation, or any queries about construction services in Pune and Maharashtra." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-dark-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-100/60 to-dark-100" />
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="tag mb-4 inline-block">Get In Touch</span>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">
              Contact <span className="text-gradient-gold">Us</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Ready to start your dream project? Reach out for a free consultation today.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-py bg-dark">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left - Info */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-white mb-6">Let's Talk</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Our team of experts is ready to discuss your construction project. Whether it's a small renovation or a large commercial development — we're here to help.
              </p>

              <div className="space-y-6 mb-8">
                {contactInfo.map(({ icon: Icon, title, lines }) => (
                  <div key={title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                      <Icon size={17} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm mb-1">{title}</p>
                      {lines.map((l, i) => <p key={i} className="text-gray-400 text-sm">{l}</p>)}
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/919876543210?text=Hello! I'm interested in your construction services."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] px-5 py-4 rounded-xl hover:bg-[#25D366]/20 transition-all duration-300"
              >
                <FaWhatsapp size={22} />
                <div>
                  <p className="font-semibold text-sm">Chat on WhatsApp</p>
                  <p className="text-[#25D366]/70 text-xs">Quick response guaranteed</p>
                </div>
              </a>
            </div>

            {/* Right - Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-16 rounded-2xl text-center h-full flex flex-col items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mb-6">
                    <FiCheck size={36} className="text-green-400" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white mb-3">Message Sent!</h3>
                  <p className="text-gray-400 mb-6">Thank you for contacting us. Our team will get back to you within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)} className="btn-gold">Send Another Message</button>
                </motion.div>
              ) : (
                <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                  className="glass-card p-8 md:p-10 rounded-2xl space-y-6">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-gray-400 text-xs mb-2">Full Name *</label>
                      <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Rahul Sharma" className="input-field" />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs mb-2">Phone Number *</label>
                      <input type="tel" required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210" className="input-field" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs mb-2">Email Address *</label>
                    <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" className="input-field" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-gray-400 text-xs mb-2">Service Interested In</label>
                      <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} className="select-field">
                        <option value="">Select a service</option>
                        <option>Architecture</option>
                        <option>Home Construction</option>
                        <option>Bungalow Design</option>
                        <option>Interior Design</option>
                        <option>Renovation</option>
                        <option>Vastu Consultant</option>
                        <option>Turnkey Project</option>
                        <option>Commercial Project</option>
                        <option>Structural Design</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs mb-2">Estimated Budget</label>
                      <select value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })} className="select-field">
                        <option value="">Select budget range</option>
                        <option>Under ₹25 Lakh</option>
                        <option>₹25 – 50 Lakh</option>
                        <option>₹50 Lakh – 1 Crore</option>
                        <option>₹1 – 3 Crore</option>
                        <option>₹3 Crore+</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs mb-2">Your Message *</label>
                    <textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Describe your project requirements, location, timeline, and any specific needs..." className="textarea-field" />
                  </div>
                  <button type="submit" disabled={loading} className="btn-gold w-full justify-center disabled:opacity-70 disabled:cursor-not-allowed">
                    {loading ? (
                      <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-dark/30 border-t-dark rounded-full animate-spin" /> Sending...</span>
                    ) : (
                      <><FiSend size={15} /> Send Message</>
                    )}
                  </button>
                </motion.form>
              )}
            </div>
          </div>

          {/* Map */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="mt-14 rounded-2xl overflow-hidden border border-white/5 h-[400px]">
            <iframe
              title="BuildCraft Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.265588856342!2d73.77802531489144!3d18.559090187382286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0xa9e05b68df87d9e5!2sBaner%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
              allowFullScreen
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}
