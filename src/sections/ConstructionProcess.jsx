// src/sections/ConstructionProcess.jsx
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import {
  FiMessageCircle, FiClipboard, FiEdit3, FiCheckCircle,
  FiTool, FiHome, FiPackage
} from 'react-icons/fi';

const steps = [
  { icon: FiMessageCircle, step: '01', title: 'Consultation', desc: 'Initial meeting to understand your vision, requirements, and budget.' },
  { icon: FiClipboard, step: '02', title: 'Planning', desc: 'Detailed project planning, site analysis, and feasibility study.' },
  { icon: FiEdit3, step: '03', title: 'Design', desc: '3D architectural design and blueprint creation with your feedback.' },
  { icon: FiCheckCircle, step: '04', title: 'Approval', desc: 'Government approvals, permits, and regulatory clearances.' },
  { icon: FiTool, step: '05', title: 'Construction', desc: 'Expert construction with quality materials and regular progress updates.' },
  { icon: FiHome, step: '06', title: 'Finishing', desc: 'Interior finishing, painting, flooring, and final detailing.' },
  { icon: FiPackage, step: '07', title: 'Delivery', desc: 'Handover inspection, documentation, and post-completion support.' },
];

export default function ConstructionProcess() {
  return (
    <section className="section-py bg-dark relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(201,168,76,0.5) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container-custom relative z-10">
        <SectionTitle
          tag="How We Work"
          title={<>Our Construction <span className="text-gradient-gold">Process</span></>}
          subtitle="A systematic, transparent, and client-focused process from concept to completion."
          center
        />

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 lg:gap-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="process-step group"
                >
                  {/* Icon circle */}
                  <div className="relative mb-4">
                    <div className="w-24 h-24 rounded-full bg-dark-200 border-2 border-white/10 flex items-center justify-center
                    group-hover:border-gold group-hover:bg-gold/5 transition-all duration-400 mx-auto relative z-10">
                      <Icon size={28} className="text-gray-400 group-hover:text-gold transition-colors duration-300" />
                    </div>
                    {/* Step number */}
                    <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-gold flex items-center justify-center
                    text-dark text-[10px] font-bold z-20 mx-auto"
                      style={{ right: 'calc(50% - 48px)' }}
                    >
                      {step.step}
                    </div>
                  </div>
                  <h4 className="font-heading text-white font-semibold text-sm mb-2 group-hover:text-gold transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-gray-500 text-xs leading-relaxed px-2">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
