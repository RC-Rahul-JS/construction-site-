// src/sections/CostCalculator.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCpu } from 'react-icons/fi';
import SectionTitle from '../components/SectionTitle';
import { Link } from 'react-router-dom';

const constructionTypes = [
  { id: 'standard', label: 'Standard', rateMin: 1800, rateMax: 2200 },
  { id: 'premium', label: 'Premium', rateMin: 2400, rateMax: 3200 },
  { id: 'luxury', label: 'Luxury', rateMin: 3500, rateMax: 5000 },
];

function formatCurrency(val) {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)} Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)} L`;
  return `₹${val.toLocaleString('en-IN')}`;
}

export default function CostCalculator() {
  const [area, setArea] = useState(1500);
  const [type, setType] = useState('premium');

  const selected = constructionTypes.find(t => t.id === type);
  const minCost = area * selected.rateMin;
  const maxCost = area * selected.rateMax;

  return (
    <section className="section-py bg-dark-100">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            tag="Cost Calculator"
            title={<>Estimate Your <span className="text-gradient-gold">Construction Cost</span></>}
            subtitle="Get a rough cost estimate instantly. For a detailed quote, contact our team."
            center
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 md:p-12"
          >
            <div className="grid md:grid-cols-2 gap-10">
              {/* Left - Inputs */}
              <div>
                {/* Area Slider */}
                <div className="mb-8">
                  <div className="flex justify-between mb-3">
                    <label className="text-white font-medium text-sm">Built-up Area</label>
                    <span className="text-gold font-bold">{area.toLocaleString()} sq.ft</span>
                  </div>
                  <input
                    type="range"
                    min={500}
                    max={10000}
                    step={100}
                    value={area}
                    onChange={e => setArea(Number(e.target.value))}
                    className="w-full h-1.5 bg-dark-300 rounded-full appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                    [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:shadow-gold"
                    style={{
                      background: `linear-gradient(to right, #C9A84C ${((area - 500) / 9500) * 100}%, #252525 0)`,
                    }}
                  />
                  <div className="flex justify-between text-gray-500 text-xs mt-2">
                    <span>500 sq.ft</span>
                    <span>10,000 sq.ft</span>
                  </div>
                </div>

                {/* Construction Type */}
                <div>
                  <label className="text-white font-medium text-sm block mb-3">Construction Quality</label>
                  <div className="grid grid-cols-3 gap-3">
                    {constructionTypes.map(ct => (
                      <button
                        key={ct.id}
                        onClick={() => setType(ct.id)}
                        className={`py-3 px-2 rounded-lg border text-sm font-medium transition-all duration-300
                          ${type === ct.id
                            ? 'bg-gold/20 border-gold text-gold'
                            : 'bg-dark-300 border-white/10 text-gray-400 hover:border-gold/30 hover:text-gold'
                          }`}
                      >
                        {ct.label}
                        <span className="block text-[10px] opacity-70 mt-0.5">
                          ₹{ct.rateMin}-{ct.rateMax}/sqft
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right - Result */}
              <div className="flex flex-col items-center justify-center bg-dark-200 rounded-xl p-8 border border-gold/10 text-center">
                <FiCpu size={32} className="text-gold mb-4" />
                <p className="text-gray-400 text-sm mb-3">Estimated Construction Cost</p>
                <div className="text-3xl font-heading font-bold text-gradient-gold mb-1">
                  {formatCurrency(minCost)}
                </div>
                <div className="text-gray-500 text-sm mb-1">to</div>
                <div className="text-3xl font-heading font-bold text-gradient-gold mb-4">
                  {formatCurrency(maxCost)}
                </div>
                <p className="text-gray-500 text-xs leading-relaxed mb-6">
                  *Estimate only. Actual cost depends on location, design complexity, soil type, and market rates.
                </p>
                <Link to="/contact" className="btn-gold w-full justify-center">
                  Get Exact Quote
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
