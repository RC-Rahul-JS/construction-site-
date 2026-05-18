// src/pages/About.jsx
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import SectionTitle from '../components/SectionTitle';
import TeamSection from '../sections/TeamSection';
import CTABanner from '../sections/CTABanner';

const timeline = [
  { year: '2010', title: 'Founded', desc: 'BuildCraft was established in Pune with a team of 5 passionate architects.' },
  { year: '2013', title: '50 Projects', desc: 'Reached our 50th project milestone, expanding into commercial construction.' },
  { year: '2016', title: 'Interior Division', desc: 'Launched our dedicated interior design division, offering turnkey solutions.' },
  { year: '2019', title: 'Pan-Maharashtra', desc: 'Expanded operations across Maharashtra with 30+ ongoing projects simultaneously.' },
  { year: '2022', title: '200 Projects', desc: 'Crossed 200 completed projects and 100 happy clients milestone.' },
  { year: '2025', title: 'Today', desc: '250+ projects, 50+ team members, and a legacy of excellence continues.' },
];

const values = [
  'Integrity in every transaction',
  'Uncompromising quality standards',
  'Client satisfaction above all',
  'Sustainable construction practices',
  'Innovation in design and execution',
  'Transparent communication always',
];

const stats = [
  { value: 250, suffix: '+', label: 'Projects Done' },
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 120, suffix: '+', label: 'Happy Clients' },
  { value: 50, suffix: '+', label: 'Expert Team' },
];

export default function About() {

  return (
    <>
      <Helmet>
        <title>About Us | BuildCraft Construction</title>
        <meta name="description" content="Learn about BuildCraft's 15+ years of construction excellence, our expert team, mission, and why we're Maharashtra's most trusted construction company." />
      </Helmet>

      {/* Page Hero */}
      <section className="relative pt-32 pb-20 bg-dark-100 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80" alt="About" className="w-full h-full object-cover opacity-10" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-dark-100/60 to-dark-100" />
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="tag mb-4 inline-block">About BuildCraft</span>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">
              Our <span className="text-gradient-gold">Story</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              15 years of building dreams, creating landmarks, and transforming spaces across Maharashtra.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Intro */}
      <section className="section-py bg-dark">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionTitle
                tag="Who We Are"
                title={<>Building Maharashtra's <span className="text-gradient-gold">Most Iconic</span> Spaces</>}
              />
              <p className="text-gray-400 leading-relaxed mb-6">
                Founded in 2010, BuildCraft Construction has grown from a small architecture firm to Maharashtra's most trusted full-service construction company. We specialize in residential, commercial, and interior design projects with a commitment to quality that has never wavered.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                Every project we undertake is a testament to our belief that great spaces change lives. From humble 2BHK renovations to 24-storey commercial towers, we bring the same passion, precision, and professionalism to every build.
              </p>
              <ul className="space-y-3 mb-8">
                {values.map(v => (
                  <li key={v} className="flex items-center gap-3 text-gray-300 text-sm">
                    <span className="w-5 h-5 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center shrink-0">
                      <FiCheck size={11} className="text-gold" />
                    </span>
                    {v}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&q=80" alt="Bungalow" className="rounded-2xl h-56 object-cover w-full" />
                <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80" alt="Commercial" className="rounded-2xl h-56 object-cover w-full mt-8" />
                <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80" alt="Interior" className="rounded-2xl h-56 object-cover w-full -mt-8" />
                <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80" alt="Construction" className="rounded-2xl h-56 object-cover w-full" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-gold-gradient shadow-gold-lg flex items-center justify-center">
                  <span className="text-dark font-heading font-bold text-xl">B</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-dark-100 border-y border-white/5">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/5">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center py-10 px-6">
                <div className="text-5xl font-heading font-bold text-gradient-gold mb-1">
                  {s.value}{s.suffix}
                </div>
                <p className="text-gray-400 text-sm">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-py bg-dark">
        <div className="container-custom">
          <SectionTitle tag="Our Journey" title={<>A Legacy of <span className="text-gradient-gold">Excellence</span></>} center />
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/50 via-gold/20 to-transparent transform -translate-x-1/2 hidden md:block" />
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-6 mb-10 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="glass-card p-6 rounded-xl border border-white/5 hover:border-gold/20 transition-colors">
                    <span className="text-gold font-bold text-xl font-heading">{item.year}</span>
                    <h4 className="text-white font-semibold mt-1 mb-2">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
                <div className="hidden md:flex items-start justify-center pt-4 shrink-0">
                  <div className="w-4 h-4 rounded-full bg-gold shadow-gold border-2 border-dark" />
                </div>
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TeamSection />
      <CTABanner />
    </>
  );
}
