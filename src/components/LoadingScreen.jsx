// src/components/LoadingScreen.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-dark"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 text-center"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gold-gradient rounded-sm flex items-center justify-center">
                <span className="text-dark font-heading font-bold text-xl">B</span>
              </div>
              <span className="font-heading text-3xl font-bold text-white tracking-wide">
                Build<span className="text-gradient-gold">Craft</span>
              </span>
            </div>
            <p className="text-gray-500 text-xs tracking-[0.3em] uppercase">Construction & Architecture</p>
          </motion.div>

          {/* Loader ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <div className="loader-ring" />
          </motion.div>

          {/* Progress line */}
          <motion.div
            className="mt-8 w-48 h-px bg-dark-300 overflow-hidden rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <motion.div
              className="h-full bg-gold-gradient rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
