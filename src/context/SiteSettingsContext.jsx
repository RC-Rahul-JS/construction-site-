// src/context/SiteSettingsContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { getDocumentById } from '../firebase/firestore';

const SiteSettingsContext = createContext(null);

// Default fallback values (used if Firebase hasn't been set up yet)
const defaultSettings = {
  siteName: 'BuildCraft Construction',
  tagline: 'Building Dreams Into Reality',
  logoTextWhite: 'Build',
  logoTextGold: 'Craft',
  logoIcon: 'B',
  logoSubText: 'Construction',
  phone: '+91 98765 43210',
  whatsapp: '919876543210',
  email: 'info@buildcraft.in',
  emailProjects: 'projects@buildcraft.in',
  emailCareers: 'careers@buildcraft.in',
  address: '123 Construction Avenue, Baner, Pune – 411045, Maharashtra',
  facebook: '#',
  instagram: '#',
  youtube: '#',
  linkedin: '#',
  footerText: '',
  googleMapsEmbed: '',
  whatsappMessage: "Hello! I'm interested in your construction services.",
};

export function SiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocumentById('settings', 'global')
      .then(data => {
        if (data) {
          setSettings({ ...defaultSettings, ...data });
        }
      })
      .catch(() => {
        // Use defaults silently
      })
      .finally(() => setLoading(false));
  }, []);

  // Helper: clean number and add 91 if it's 10 digits
  const formatForLink = (num) => {
    if (!num) return '';
    const clean = num.replace(/\D/g, '');
    return clean.length === 10 ? `91${clean}` : clean;
  };

  const phoneClean = formatForLink(settings.phone);
  const waNumber = formatForLink(settings.whatsapp);
  
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(settings.whatsappMessage || defaultSettings.whatsappMessage)}`;
  const waLinkPlain = `https://wa.me/${waNumber}`;
  const phoneLink = `tel:${phoneClean}`;

  // For display (e.g. +91 70894 49249)
  const displayPhone = settings.phone?.replace(/\D/g, '').length === 10 ? `+91 ${settings.phone}` : settings.phone;
  const displayWhatsapp = settings.whatsapp?.replace(/\D/g, '').length === 10 ? `+91 ${settings.whatsapp}` : settings.whatsapp;

  return (
    <SiteSettingsContext.Provider value={{
      settings,
      loading,
      phoneLink,
      waLink,
      waLinkPlain,
      phoneClean,
      displayPhone,
      displayWhatsapp,
      emailjs: {
        serviceId: settings.emailjsServiceId,
        templateId: settings.emailjsTemplateId,
        publicKey: settings.emailjsPublicKey
      }
    }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
