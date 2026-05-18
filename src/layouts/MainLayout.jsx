// src/layouts/MainLayout.jsx
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingButtons from '../components/FloatingButtons';
import { Helmet } from 'react-helmet-async';
import { useSiteSettings } from '../context/SiteSettingsContext';

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export default function MainLayout() {
  const { settings } = useSiteSettings();
  const { pathname } = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
    });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div className="min-h-screen bg-dark">
      <Helmet>
        <title>{settings.metaTitle || settings.siteName}</title>
        <meta name="description" content={settings.metaDescription} />
        <meta name="keywords" content={settings.metaKeywords} />
        {/* Open Graph */}
        <meta property="og:title" content={settings.metaTitle || settings.siteName} />
        <meta property="og:description" content={settings.metaDescription} />
        {settings.logo && <meta property="og:image" content={settings.logo} />}
      </Helmet>
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
