// src/pages/NotFound.jsx
import { Link, useRouteError } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiHome, FiPhone } from 'react-icons/fi';

export default function NotFound() {
  const error = useRouteError();
  const is404 = !error || error?.status === 404;

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(201,168,76,0.4) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="text-center relative z-10 max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
        >
          {/* 404 / Error Number */}
          <div className="font-heading text-[10rem] leading-none font-black text-gradient-gold opacity-20 select-none mb-0">
            {is404 ? '404' : '⚠️'}
          </div>
          <div className="mt-[-2rem] mb-8">
            <div className="w-16 h-16 bg-gold/10 border border-gold/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="font-heading font-bold text-gold text-2xl">B</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            {is404 ? 'Page Not Found' : 'Something Went Wrong'}
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            {is404
              ? "The page you're looking for doesn't exist or may have been moved. Let's get you back on track."
              : "An unexpected error occurred. Our team has been notified. Please try again or go back to the home page."
            }
          </p>

          {/* Error details for developers */}
          {error && !is404 && (
            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-left">
              <p className="text-red-400 text-xs font-mono">
                {error?.statusText || error?.message || 'Unknown error'}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn-gold">
              <FiHome size={16} />
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="btn-outline"
            >
              <FiArrowLeft size={16} />
              Go Back
            </button>
            <a href="tel:+919876543210" className="btn-outline-white">
              <FiPhone size={16} />
              Call Us
            </a>
          </div>

          {/* Quick links */}
          <div className="mt-12 pt-8 border-t border-white/5">
            <p className="text-gray-500 text-sm mb-4">Looking for something specific?</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                { label: 'Services', to: '/services' },
                { label: 'Portfolio', to: '/portfolio' },
                { label: 'Vastu', to: '/vastu' },
                { label: 'Blog', to: '/blog' },
                { label: 'Contact', to: '/contact' },
                { label: 'Get Quote', to: '/quote' },
              ].map(link => (
                <Link key={link.to} to={link.to}
                  className="px-4 py-2 text-xs border border-white/10 text-gray-400 rounded-lg hover:border-gold/40 hover:text-gold transition-all">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
