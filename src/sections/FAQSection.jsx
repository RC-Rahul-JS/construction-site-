// src/sections/FAQSection.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';
import SectionTitle from '../components/SectionTitle';
import { faqs } from '../data/faqs';

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className={`accordion-item ${isOpen ? 'open' : ''}`}>
      <button
        className="accordion-header"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="text-sm pr-4">{faq.question}</span>
        <span className="shrink-0 w-8 h-8 rounded-full bg-dark-300 border border-white/10 flex items-center justify-center
        text-gold transition-all duration-300 group-hover:bg-gold/10">
          {isOpen ? <FiMinus size={14} /> : <FiPlus size={14} />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="accordion-body">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openId, setOpenId] = useState(1);

  return (
    <section className="section-py bg-dark">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <SectionTitle
              tag="FAQ"
              title={<>Frequently Asked <span className="text-gradient-gold">Questions</span></>}
              subtitle="Have questions about construction, costs, or our process? Find answers here."
            />

            {/* Contact CTA */}
            <div className="glass-card p-6 mt-8">
              <h4 className="text-white font-semibold mb-2">Still have questions?</h4>
              <p className="text-gray-400 text-sm mb-4">Our team is ready to help with any specific queries about your project.</p>
              <div className="flex gap-3">
                <a href="tel:+919876543210" className="btn-gold text-xs px-5 py-2.5">Call Now</a>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="btn-outline text-xs px-5 py-2.5">WhatsApp</a>
              </div>
            </div>
          </div>

          {/* Right - Accordion */}
          <div className="space-y-3">
            {faqs.map(faq => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
