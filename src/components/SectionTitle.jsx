// src/components/SectionTitle.jsx
import { motion } from 'framer-motion';

export default function SectionTitle({ tag, title, subtitle, center = false, light = false }) {
  return (
    <div className={`mb-14 ${center ? 'text-center' : ''}`}>
      {tag && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`mb-4 ${center ? 'flex justify-center' : ''}`}
        >
          <span className="tag">{tag}</span>
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`font-heading text-4xl md:text-5xl font-bold mb-4 leading-tight ${light ? 'text-dark' : 'text-white'}`}
      >
        {title}
      </motion.h2>
      {!center && (
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '4rem' }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="h-0.5 bg-gold-gradient mb-4"
        />
      )}
      {center && (
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '4rem' }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="h-0.5 bg-gold-gradient mb-4 mx-auto"
        />
      )}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`text-lg max-w-2xl leading-relaxed ${center ? 'mx-auto' : ''} ${light ? 'text-gray-600' : 'text-gray-400'}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
