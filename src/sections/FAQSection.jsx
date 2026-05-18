// src/sections/FAQSection.jsx

import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';
import SectionTitle from '../components/SectionTitle';
import { useState, useEffect } from 'react';
import { getDocuments } from '../firebase/firestore';
import { useSiteSettings } from '../context/SiteSettingsContext';

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className={`border border-white/5 rounded-xl bg-dark-200 overflow-hidden transition-all duration-300 ${isOpen ? 'border-gold/30 shadow-lg shadow-gold/5' : 'hover:border-white/10'}`}>
      <button 
        className="w-full flex items-center justify-between p-3.5 text-left focus:outline-none" 
        onClick={onToggle}
      >
        <span className={`text-[12px] font-medium pr-4 transition-colors ${isOpen ? 'text-gold' : 'text-gray-200'}`}>
          {faq.question}
        </span>
        <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-gold/20 text-gold scale-110' : 'bg-dark-300 text-gray-400'}`}>
          {isOpen ? <FiMinus size={12} /> : <FiPlus size={12} />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }} 
            transition={{ duration: 0.3 }} 
            className="overflow-hidden"
          >
            <div className="px-3.5 pb-4 text-[10px] text-gray-400 leading-relaxed border-t border-white/5 mx-3.5 pt-3 mt-1">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const { phoneLink, waLinkPlain } = useSiteSettings();
  const [openId, setOpenId] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    getDocuments('faq', { sortBy: 'order', sortOrder: 'asc' })
      .then(data => {
        setFaqs(data);
        if (data.length > 0) setOpenId(data[0].id);
      })
      .catch(() => setFaqs([]))
      .finally(() => setLoading(false));
  }, []);


  if (loading) return <section className="section-py bg-dark text-white text-center">Loading FAQs...</section>;

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
            <div className="glass-card p-5 mt-6 rounded-xl">
              <h4 className="text-white font-semibold text-[13px] mb-1">Still have questions?</h4>
              <p className="text-gray-400 text-[10px] mb-4">Our team is ready to help with any specific queries about your project.</p>
              <div className="flex flex-wrap gap-2.5">
                <a href={phoneLink} className="btn-gold text-[10px] px-4 py-2">Call Now</a>
                <a href={waLinkPlain} target="_blank" rel="noopener noreferrer" className="btn-outline text-[10px] px-4 py-2">WhatsApp</a>
              </div>
            </div>
          </div>

          {/* Right - Accordion */}
          <div className="space-y-2.5">
            {(showAll ? faqs : faqs.slice(0, 4)).map(faq => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
              />
            ))}
            {faqs.length > 4 && (
              <button 
                onClick={() => setShowAll(!showAll)} 
                className="w-full py-2.5 mt-1 text-[10px] text-gold font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-gold/10 rounded-xl transition-colors border border-dashed border-gold/30"
              >
                {showAll ? 'View Less' : 'View More FAQs'} 
                <FiPlus className={`transition-transform duration-300 ${showAll ? 'rotate-45' : ''}`} />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
