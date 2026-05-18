// src/pages/Careers.jsx
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMapPin, FiClock, FiBriefcase, FiArrowRight, FiX, FiSend } from 'react-icons/fi';
import { getDocuments, addDocument } from '../firebase/firestore';
import { useSiteSettings } from '../context/SiteSettingsContext';

const perks = ['Competitive Salary', 'Health Insurance', 'Professional Training', 'Flexible Hours', 'Project Bonuses', 'Growth Opportunities'];

export default function Careers() {
  const { settings } = useSiteSettings();
  const [openings, setOpenings] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', experience: '', message: '' });
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    getDocuments('careers', { filters: [{ field: 'active', op: '==', value: true }] })
      .then(data => setOpenings(data))
      .catch(() => setOpenings([]));
  }, []);

  const [submitting, setSubmitting] = useState(false);

  const handleApply = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addDocument('job_applications', {
        ...form,
        jobId: selected.id,
        jobTitle: selected.title,
        jobDept: selected.dept,
        status: 'New',
        createdAt: new Date().toISOString()
      });
      setApplied(true);
      setTimeout(() => { 
        setApplied(false); 
        setSelected(null);
        setForm({ name: '', email: '', phone: '', experience: '', message: '' });
      }, 3000);
    } catch (error) {
      alert('Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Careers | BuildCraft Construction</title>
        <meta name="description" content="Join BuildCraft Construction team. Explore exciting career opportunities in architecture, engineering, interior design, and project management." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-dark-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-100/60 to-dark-100" />
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="tag mb-4 inline-block">Join Our Team</span>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">
              Build Your <span className="text-gradient-gold">Career</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Join a passionate team of construction professionals dedicated to creating extraordinary spaces.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Perks */}
      <section className="py-14 bg-dark border-y border-white/5">
        <div className="container-custom">
          <div className="flex flex-wrap gap-4 justify-center">
            {perks.map((perk, i) => (
              <motion.div key={perk} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex items-center gap-2 px-5 py-3 glass-card-gold rounded-xl text-sm text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />{perk}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="section-py bg-dark">
        <div className="container-custom max-w-4xl">
          <h2 className="font-heading text-3xl font-bold text-white mb-10 text-center">
            Current <span className="text-gradient-gold">Openings</span>
          </h2>
          <div className="space-y-5">
            {openings.map((job, i) => (
              <motion.div key={job.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-dark-200 border border-white/5 hover:border-gold/25 rounded-2xl p-6 transition-all duration-300 hover:shadow-gold group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="tag text-[10px]">{job.dept}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] border ${job.type === 'Full-time' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>{job.type}</span>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-white group-hover:text-gold transition-colors mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1"><FiMapPin size={11} className="text-gold" />{job.location}</span>
                      <span className="flex items-center gap-1"><FiBriefcase size={11} className="text-gold" />{job.experience}</span>
                      <span className="flex items-center gap-1"><FiClock size={11} className="text-gold" />{job.type}</span>
                    </div>
                    <p className="text-gray-400 text-sm">{job.desc}</p>
                  </div>
                  <button onClick={() => setSelected(job)} className="btn-gold shrink-0 self-start md:self-center text-xs px-5 py-2.5">
                    Apply Now <FiArrowRight size={13} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center glass-card p-8 rounded-2xl">
            <p className="text-gray-400 mb-2">Don't see a role that fits?</p>
            <p className="text-white font-medium mb-4">Send us your resume and we'll reach out when we have the right opening.</p>
            <a href={`mailto:${settings.emailCareers || settings.email}`} className="btn-outline">Email Your Resume</a>
          </div>
        </div>
      </section>

      {/* Apply Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={e => e.target === e.currentTarget && setSelected(null)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-dark-100 border border-white/10 rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="font-heading text-2xl font-bold text-white">{selected.title}</h3>
                  <p className="text-gold text-sm">{selected.dept} • {selected.location}</p>
                </div>
                <button onClick={() => setSelected(null)} className="w-8 h-8 rounded-full bg-dark-300 flex items-center justify-center text-gray-400 hover:text-white">
                  <FiX size={16} />
                </button>
              </div>
              {applied ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                    <span className="text-green-400 text-2xl">✓</span>
                  </div>
                  <p className="text-white font-semibold">Application Submitted!</p>
                  <p className="text-gray-400 text-sm mt-2">We'll review and contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-4">
                  <div><label className="text-gray-400 text-xs block mb-1.5">Full Name *</label><input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="Your full name" /></div>
                  <div><label className="text-gray-400 text-xs block mb-1.5">Email *</label><input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="input-field" placeholder="your@email.com" /></div>
                  <div><label className="text-gray-400 text-xs block mb-1.5">Phone *</label><input type="tel" required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="input-field" placeholder="+91 XXXXX XXXXX" /></div>
                  <div><label className="text-gray-400 text-xs block mb-1.5">Years of Experience</label><input type="text" value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} className="input-field" placeholder="e.g. 4 years" /></div>
                  <div><label className="text-gray-400 text-xs block mb-1.5">Cover Note</label><textarea rows={3} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="textarea-field" placeholder="Why you'd be a great fit..." /></div>
                  <button type="submit" disabled={submitting} className="btn-gold w-full justify-center">
                    <FiSend size={14} /> {submitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
