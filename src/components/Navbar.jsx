// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiPhone } from 'react-icons/fi';
import { useSiteSettings } from '../context/SiteSettingsContext';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Vastu', path: '/vastu' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const { settings, phoneLink, displayPhone } = useSiteSettings();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-dark/95 backdrop-blur-xl shadow-[0_2px_30px_rgba(0,0,0,0.5)] border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              {settings.logo ? (
                <img
                  src={settings.logo}
                  alt={settings.siteName || 'Logo'}
                  className="h-10 w-auto max-w-[140px] object-contain"
                />
              ) : (
                <>
                  <div className="w-9 h-9 bg-gold-gradient rounded-sm flex items-center justify-center shadow-gold transition-all duration-300 group-hover:shadow-gold-lg">
                    <span className="text-dark font-heading font-bold text-lg leading-none">
                      {settings.logoIcon !== undefined ? settings.logoIcon : (settings.siteName || 'B').charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <span className="font-heading text-xl font-bold text-white tracking-wide">
                      {settings.logoTextWhite || (settings.siteName || 'BuildCraft').split(' ')[0]}
                      <span className="text-gradient-gold ml-1">
                        {settings.logoTextGold !== undefined ? settings.logoTextGold : ((settings.siteName || 'BuildCraft').split(' ').length > 1 ? (settings.siteName || 'BuildCraft').split(' ').slice(1).join(' ') : 'Craft')}
                      </span>
                    </span>
                    <p className="text-[9px] text-gray-500 tracking-[0.2em] uppercase leading-none -mt-0.5">
                      {settings.logoSubText !== undefined ? settings.logoSubText : (settings.tagline || 'Construction')}
                    </p>
                  </div>
                </>
              )}
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-7">
              {navLinks.map(link => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? '!text-gold' : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-4">
              {/* Phone Display */}
              <a href={phoneLink} className="hidden lg:flex items-center gap-2 text-white/90 hover:text-gold transition-colors text-xs font-bold tracking-wide mr-2">
                <FiPhone size={14} className="text-gold" />
                {displayPhone}
              </a>

              {/* CTA */}
              <Link
                to="/contact"
                className="hidden md:flex items-center gap-2 btn-gold text-xs px-5 py-2.5"
              >
                Get Quote
              </Link>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center text-white"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-72 bg-dark-100 border-l border-white/5 flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <span className="font-heading text-lg font-bold text-white">Menu</span>
                <button onClick={() => setMobileOpen(false)}>
                  <FiX size={22} className="text-gray-400" />
                </button>
              </div>
              <div className="flex flex-col p-6 gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `block py-3.5 px-4 rounded-lg text-sm font-medium transition-all duration-200
                        ${isActive ? 'bg-gold/10 text-gold border border-gold/20' : 'text-gray-300 hover:text-gold hover:bg-white/5'}`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </div>
              <div className="mt-auto p-6 border-t border-white/5">
                <Link to="/quote" className="btn-gold w-full justify-center">
                  Get Free Quote
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
