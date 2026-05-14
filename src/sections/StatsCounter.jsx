// src/sections/StatsCounter.jsx
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { FiAward, FiCalendar, FiUsers, FiTool } from 'react-icons/fi';
import { useState, useEffect, useRef } from 'react';

const stats = [
  { icon: FiAward, value: 250, suffix: '+', label: 'Projects Completed' },
  { icon: FiCalendar, value: 15, suffix: '+', label: 'Years Experience' },
  { icon: FiUsers, value: 120, suffix: '+', label: 'Happy Clients' },
  { icon: FiTool, value: 50, suffix: '+', label: 'Expert Workers' },
];

function AnimatedNumber({ value, suffix, active, delay = 0 }) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    const timeout = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }, delay);
    return () => clearTimeout(timeout);
  }, [active, value, delay]);

  return (
    <span>
      {count}{suffix}
    </span>
  );
}

export default function StatsCounter() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section ref={ref} className="relative bg-dark-100 py-16 border-y border-white/5">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/5">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex flex-col items-center justify-center py-10 px-6 text-center group"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-all duration-300">
                  <Icon size={20} className="text-gold" />
                </div>
                <div className="text-4xl lg:text-5xl font-heading font-bold text-gradient-gold mb-1">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} active={inView} delay={i * 200} />
                </div>
                <p className="text-gray-400 text-sm tracking-wide">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}
