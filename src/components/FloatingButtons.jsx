import { motion } from 'framer-motion';
import { FaWhatsapp, FaPhone } from 'react-icons/fa';
import { useSiteSettings } from '../context/SiteSettingsContext';

export default function FloatingButtons() {
  const { phoneLink, waLink } = useSiteSettings();
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Call Button */}
      <motion.a
        href={phoneLink}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.5, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-13 h-13 w-[52px] h-[52px] rounded-full bg-blue-600 shadow-lg flex items-center justify-center text-white relative group"
        aria-label="Call Us"
      >
        <FaPhone size={18} />
        {/* Tooltip */}
        <span className="absolute right-full mr-3 bg-dark-100 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap
          opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">
          Call Us
        </span>
      </motion.a>

      {/* WhatsApp Button */}
      <motion.a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.7, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-[56px] h-[56px] rounded-full bg-[#25D366] shadow-lg flex items-center justify-center text-white relative group animate-pulse-gold"
        aria-label="WhatsApp"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        <FaWhatsapp size={24} className="relative z-10" />
        {/* Tooltip */}
        <span className="absolute right-full mr-3 bg-dark-100 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap
          opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">
          Chat on WhatsApp
        </span>
      </motion.a>
    </div>
  );
}
