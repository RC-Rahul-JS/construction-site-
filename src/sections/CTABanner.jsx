// src/sections/CTABanner.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiPhone } from 'react-icons/fi';

export default function CTABanner() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1920&q=80"
          alt="construction"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/70 to-transparent" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <span className="tag mb-6 inline-block">Start Your Project</span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Build Your <span className="text-gradient-gold">Dream Space?</span>
          </h2>
          <p className="text-gray-300 text-lg mb-10 leading-relaxed">
            Contact us today for a free consultation. Let our experts help you plan, design, and build the perfect space within your budget and timeline.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/contact" className="btn-gold text-base px-8 py-4">
              Get Free Consultation
              <FiArrowRight size={18} />
            </Link>
            <a href="tel:+919876543210" className="btn-outline-white text-base px-8 py-4">
              <FiPhone size={18} />
              +91 98765 43210
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
