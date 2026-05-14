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
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80"
                alt="BuildCraft team"
                className="w-full h-[520px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-dark/60 via-transparent to-transparent" />
            </div>

            {/* Floating stats card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -bottom-6 -right-6 glass-card-gold p-6 rounded-xl"
            >
              <div className="text-4xl font-heading font-bold text-gradient-gold mb-1">15+</div>
              <div className="text-gray-300 text-sm">Years of Excellence</div>
              <div className="flex gap-0.5 mt-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-1 rounded-full bg-gold" />
                ))}
              </div>
            </motion.div>

            {/* Gold frame accent */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-gold rounded-tl-xl pointer-events-none" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-gold rounded-br-xl pointer-events-none" />
          </div>

          {/* Right - Content */}
          <div className="order-1 lg:order-2">
            <SectionTitle
              tag="Why Choose Us"
              title={<>Building Trust, <span className="text-gradient-gold">One Project</span> At a Time</>}
              subtitle="We combine experience, innovation, and dedication to deliver construction excellence that exceeds expectations."
            />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    variants={itemVariants}
                    className="flex gap-4 p-4 rounded-xl border border-white/5 hover:border-gold/20 
                    hover:bg-gold/3 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0
                    group-hover:bg-gold/20 transition-colors duration-300">
                      <Icon size={17} className="text-gold" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm mb-1 group-hover:text-gold transition-colors">
                        {feature.title}
                      </h4>
                      <p className="text-gray-500 text-xs leading-relaxed">{feature.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
