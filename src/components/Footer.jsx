// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaWhatsapp,
  FaMapMarkerAlt, FaPhone, FaEnvelope
} from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Vastu Consultant', path: '/vastu' },
  { label: 'Blog', path: '/blog' },
  { label: 'Careers', path: '/careers' },
  { label: 'Contact', path: '/contact' },
];

const serviceLinks = [
  { label: 'Architecture', path: '/services/architecture' },
  { label: 'Home Construction', path: '/services/home-construction' },
  { label: 'Bungalow Design', path: '/services/bungalow' },
  { label: 'Interior Design', path: '/services/interior' },
  { label: 'Renovation', path: '/services/renovation' },
  { label: 'Turnkey Projects', path: '/services/turnkey' },
  { label: 'Structural Design', path: '/services/structural' },
];

const socials = [
  { icon: FaFacebookF, href: '#', label: 'Facebook' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaYoutube, href: '#', label: 'YouTube' },
  { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
  { icon: FaWhatsapp, href: 'https://wa.me/919876543210', label: 'WhatsApp' },
];

export default function Footer() {
  return (
    <footer className="bg-dark-100 border-t border-white/5">
      {/* Main Footer */}
      <div className="container-custom py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gold-gradient rounded-sm flex items-center justify-center">
                <span className="text-dark font-heading font-bold text-xl">B</span>
              </div>
              <div>
                <span className="font-heading text-2xl font-bold text-white">
                  Build<span className="text-gradient-gold">Craft</span>
                </span>
                <p className="text-[9px] text-gray-500 tracking-[0.2em] uppercase -mt-0.5">Construction</p>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Building dreams into reality since 2010. Premium architecture, construction, and interior design solutions across Maharashtra.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400
                  hover:border-gold hover:text-gold hover:bg-gold/5 transition-all duration-300"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-white font-semibold text-lg mb-6 pb-2 border-b border-gold/20">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 text-sm hover:text-gold transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <FiArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-1" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-white font-semibold text-lg mb-6 pb-2 border-b border-gold/20">
              Our Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 text-sm hover:text-gold transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <FiArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-1" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h4 className="font-heading text-white font-semibold text-lg mb-6 pb-2 border-b border-gold/20">
              Contact Us
            </h4>
            <div className="space-y-4 mb-8">
              <div className="flex gap-3">
                <FaMapMarkerAlt className="text-gold mt-1 shrink-0" size={14} />
                <span className="text-gray-400 text-sm">123 Construction Avenue, Baner, Pune – 411045, Maharashtra</span>
              </div>
              <div className="flex gap-3">
                <FaPhone className="text-gold mt-0.5 shrink-0" size={14} />
                <a href="tel:+919876543210" className="text-gray-400 text-sm hover:text-gold transition-colors">+91 98765 43210</a>
              </div>
              <div className="flex gap-3">
                <FaEnvelope className="text-gold mt-0.5 shrink-0" size={14} />
                <a href="mailto:info@buildcraft.in" className="text-gray-400 text-sm hover:text-gold transition-colors">info@buildcraft.in</a>
              </div>
            </div>
            {/* Newsletter */}
            <div>
              <p className="text-white text-sm font-medium mb-3">Subscribe to our newsletter</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-dark-200 border border-white/10 text-white text-sm placeholder-gray-600 px-4 py-3 rounded-l-lg focus:outline-none focus:border-gold"
                />
                <button className="bg-gold text-dark px-4 py-3 rounded-r-lg hover:bg-gold-light transition-colors">
                  <FiArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="container-custom py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} BuildCraft Construction. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="#" className="text-gray-500 text-xs hover:text-gold transition-colors">Privacy Policy</Link>
            <Link to="#" className="text-gray-500 text-xs hover:text-gold transition-colors">Terms of Service</Link>
            <Link to="#" className="text-gray-500 text-xs hover:text-gold transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
