// src/sections/WhyChooseUs.jsx
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import {
  FiShield, FiUsers, FiStar, FiClock, FiDollarSign,
  FiHeadphones, FiEye, FiCpu
} from 'react-icons/fi';

const features = [
  { icon: FiShield, title: 'High Quality Materials', desc: 'Only ISI-certified, premium materials from trusted suppliers for lasting durability.' },
  { icon: FiUsers, title: 'Experienced Team', desc: 'A multidisciplinary team of 50+ professionals with decades of combined expertise.' },
  { icon: FiStar, title: 'Modern Designs', desc: 'Cutting-edge architectural and interior designs inspired by global trends.' },
  { icon: FiClock, title: 'On-Time Delivery', desc: 'Strict project timelines with transparent milestones and real-time updates.' },
  { icon: FiDollarSign, title: 'Budget Friendly', desc: 'Competitive pricing without compromising quality. Value for every rupee.' },
  { icon: FiHeadphones, title: '24/7 Support', desc: 'Dedicated client support throughout the project and post-completion warranty.' },
  { icon: FiEye, title: 'Transparent Pricing', desc: 'No hidden costs. Detailed quotations with itemized cost breakdowns.' },
  { icon: FiCpu, title: 'Smart Construction', desc: 'Using the latest construction technology, tools, and management software.' },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function WhyChooseUs() {
  return (
    <section className="section-py bg-dark">
      <div className="container-custom">
        <div className="mb-12">
          <SectionTitle
            tag="Why Choose Us"
            title={<>Building Trust, <span className="text-gradient-gold">One Project</span> At a Time</>}
            subtitle="We combine experience, innovation, and dedication to deliver construction excellence that exceeds expectations."
            center
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-10 items-center">
          
          {/* Left Features */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col gap-5 order-2 lg:order-1"
          >
            {features.slice(0, 4).map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div key={feature.title} variants={itemVariants} className="flex gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors duration-300">
                    <Icon size={14} className="text-gold" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-xs mb-1 group-hover:text-gold transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-gray-500 text-[10px] leading-snug pr-4">{feature.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Center Image */}
          <div className="relative order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-[300px] lg:max-w-full rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80"
                alt="BuildCraft team"
                className="w-full h-[380px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
            </div>

            {/* Floating stats card */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass-card-gold px-5 py-3 rounded-xl w-[180px] text-center"
            >
              <div className="text-2xl font-heading font-bold text-gradient-gold mb-0.5">15+</div>
              <div className="text-gray-300 text-[10px] uppercase tracking-wide">Years of Excellence</div>
              <div className="flex justify-center gap-0.5 mt-1.5">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-3 h-0.5 rounded-full bg-gold" />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Features */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col gap-5 order-3"
          >
            {features.slice(4, 8).map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div key={feature.title} variants={itemVariants} className="flex gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors duration-300">
                    <Icon size={14} className="text-gold" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-xs mb-1 group-hover:text-gold transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-gray-500 text-[10px] leading-snug pr-4">{feature.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
