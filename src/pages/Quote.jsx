// src/pages/Quote.jsx
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiArrowLeft, FiCheck } from 'react-icons/fi';
import { addDocument } from '../firebase/firestore';

const steps = ['Project Type', 'Requirements', 'Budget & Timeline', 'Contact Info'];

const projectTypes = [
  { id: 'home', label: 'Home Construction', icon: '🏠' },
  { id: 'bungalow', label: 'Bungalow Design', icon: '🏡' },
  { id: 'commercial', label: 'Commercial Project', icon: '🏢' },
  { id: 'renovation', label: 'Renovation', icon: '🔨' },
  { id: 'interior', label: 'Interior Design', icon: '🛋️' },
  { id: 'turnkey', label: 'Turnkey Project', icon: '🔑' },
];

const qualities = [
  { id: 'standard', label: 'Standard', desc: '₹1,800 – ₹2,200 / sqft', range: [1800, 2200] },
  { id: 'premium', label: 'Premium', desc: '₹2,400 – ₹3,200 / sqft', range: [2400, 3200] },
  { id: 'luxury', label: 'Luxury', desc: '₹3,500 – ₹5,000 / sqft', range: [3500, 5000] },
];

const timelines = ['As soon as possible', '1 – 3 months', '3 – 6 months', '6 months+', 'Not decided yet'];
const budgetRanges = ['Under ₹25 Lakh', '₹25 – 50 Lakh', '₹50L – 1 Cr', '₹1 – 3 Crore', '₹3 Crore+'];

export default function Quote() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ type: '', area: 1500, quality: 'premium', timeline: '', budget: '', name: '', phone: '', email: '', city: '' });
  const [submitted, setSubmitted] = useState(false);

  const selected = qualities.find(q => q.id === data.quality);
  const minEst = data.area * (selected?.range[0] ?? 2400);
  const maxEst = data.area * (selected?.range[1] ?? 3200);
  const fmt = v => v >= 10000000 ? `₹${(v / 10000000).toFixed(1)} Cr` : `₹${(v / 100000).toFixed(0)} L`;

  const handleSubmit = async () => {
    try {
      await addDocument('quotes', {
        ...data,
        estimateRange: `${fmt(minEst)} – ${fmt(maxEst)}`,
        minEst,
        maxEst,
        createdAt: new Date().toISOString(),
        status: 'Pending'
      });
      setSubmitted(true);
    } catch (err) {
      alert('Failed to submit quote request. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center pt-20">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mx-auto mb-6">
            <FiCheck size={40} className="text-green-400" />
          </div>
          <h2 className="font-heading text-3xl font-bold text-white mb-4">Quote Request Submitted!</h2>
          <p className="text-gray-400 mb-4">Thank you, <strong className="text-gold">{data.name}</strong>! Our team will review your requirements and send you a detailed quote within <strong className="text-white">24 hours</strong>.</p>
          <div className="glass-card p-6 rounded-xl mb-8 text-left">
            <p className="text-gray-500 text-xs mb-2">Estimated Cost Range</p>
            <p className="text-gradient-gold font-heading text-3xl font-bold">{fmt(minEst)} – {fmt(maxEst)}</p>
            <p className="text-gray-500 text-xs mt-1">*Preliminary estimate based on your inputs</p>
          </div>
          <a href="/" className="btn-gold">Back to Home</a>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Get a Quote | BuildCraft Construction</title>
        <meta name="description" content="Get a free construction quote from BuildCraft. Fill in your project details and receive a detailed estimate within 24 hours." />
      </Helmet>

      <div className="min-h-screen bg-dark pt-32 pb-20">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12">
            <span className="tag mb-4 inline-block">Free Estimate</span>
            <h1 className="font-heading text-5xl font-bold text-white mb-3">
              Get Your <span className="text-gradient-gold">Project Quote</span>
            </h1>
            <p className="text-gray-400">Answer a few quick questions and we'll send you a detailed estimate.</p>
          </div>

          {/* Progress */}
          <div className="flex items-center justify-between mb-12 relative">
            <div className="absolute left-0 right-0 top-1/2 h-px bg-dark-300 -translate-y-1/2 z-0" />
            <div className="absolute left-0 top-1/2 h-px bg-gold-gradient -translate-y-1/2 z-0 transition-all duration-500"
              style={{ width: `${(step / (steps.length - 1)) * 100}%` }} />
            {steps.map((s, i) => (
              <div key={s} className="relative z-10 flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300
                  ${i < step ? 'bg-gold border-gold text-dark' : i === step ? 'bg-gold/20 border-gold text-gold' : 'bg-dark-200 border-dark-400 text-gray-500'}`}>
                  {i < step ? <FiCheck size={16} /> : i + 1}
                </div>
                <span className={`text-[11px] font-medium hidden sm:block ${i === step ? 'text-gold' : 'text-gray-500'}`}>{s}</span>
              </div>
            ))}
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}
              className="glass-card p-8 md:p-12 rounded-2xl">

              {/* Step 0: Project Type */}
              {step === 0 && (
                <div>
                  <h2 className="font-heading text-2xl font-bold text-white mb-2">What type of project?</h2>
                  <p className="text-gray-400 text-sm mb-8">Select the category that best describes your project.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {projectTypes.map(t => (
                      <button key={t.id} onClick={() => setData({ ...data, type: t.id })}
                        className={`p-5 rounded-xl border text-center transition-all duration-300
                          ${data.type === t.id ? 'bg-gold/15 border-gold text-white' : 'bg-dark-200 border-white/10 text-gray-400 hover:border-gold/30 hover:text-white'}`}>
                        <span className="text-3xl mb-3 block">{t.icon}</span>
                        <span className="text-sm font-medium">{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 1: Requirements */}
              {step === 1 && (
                <div>
                  <h2 className="font-heading text-2xl font-bold text-white mb-2">Project Requirements</h2>
                  <p className="text-gray-400 text-sm mb-8">Tell us about the size and quality of construction.</p>
                  <div className="mb-8">
                    <div className="flex justify-between mb-3">
                      <label className="text-white font-medium">Built-up Area</label>
                      <span className="text-gold font-bold">{data.area.toLocaleString()} sq.ft</span>
                    </div>
                    <input type="range" min={500} max={15000} step={100} value={data.area} onChange={e => setData({ ...data, area: Number(e.target.value) })}
                      className="w-full h-1.5 bg-dark-300 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold"
                      style={{ background: `linear-gradient(to right, #C9A84C ${((data.area - 500) / 14500) * 100}%, #252525 0)` }} />
                    <div className="flex justify-between text-gray-500 text-xs mt-2"><span>500</span><span>15,000 sq.ft</span></div>
                  </div>
                  <div>
                    <label className="text-white font-medium block mb-4">Construction Quality</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {qualities.map(q => (
                        <button key={q.id} onClick={() => setData({ ...data, quality: q.id })}
                          className={`p-4 rounded-xl border text-center transition-all duration-300
                            ${data.quality === q.id ? 'bg-gold/15 border-gold' : 'bg-dark-200 border-white/10 hover:border-gold/30'}`}>
                          <p className={`font-semibold text-sm mb-1 ${data.quality === q.id ? 'text-gold' : 'text-white'}`}>{q.label}</p>
                          <p className="text-gray-500 text-xs">{q.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Live estimate */}
                  <div className="mt-8 p-5 bg-dark-200 rounded-xl border border-gold/15 text-center">
                    <p className="text-gray-500 text-xs mb-1">Estimated Cost</p>
                    <p className="text-gradient-gold font-heading text-2xl font-bold">{fmt(minEst)} – {fmt(maxEst)}</p>
                  </div>
                </div>
              )}

              {/* Step 2: Budget & Timeline */}
              {step === 2 && (
                <div>
                  <h2 className="font-heading text-2xl font-bold text-white mb-2">Budget & Timeline</h2>
                  <p className="text-gray-400 text-sm mb-8">Help us understand your financial plan and urgency.</p>
                  <div className="mb-6">
                    <label className="text-white font-medium block mb-4">Overall Budget</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {budgetRanges.map(b => (
                        <button key={b} onClick={() => setData({ ...data, budget: b })}
                          className={`py-3 px-4 rounded-lg border text-sm text-center transition-all
                            ${data.budget === b ? 'bg-gold/15 border-gold text-gold' : 'bg-dark-200 border-white/10 text-gray-400 hover:border-gold/30 hover:text-white'}`}>
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-white font-medium block mb-4">Preferred Timeline</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {timelines.map(t => (
                        <button key={t} onClick={() => setData({ ...data, timeline: t })}
                          className={`py-3 px-4 rounded-lg border text-sm text-left transition-all
                            ${data.timeline === t ? 'bg-gold/15 border-gold text-gold' : 'bg-dark-200 border-white/10 text-gray-400 hover:border-gold/30 hover:text-white'}`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Contact Info */}
              {step === 3 && (
                <div>
                  <h2 className="font-heading text-2xl font-bold text-white mb-2">Your Contact Details</h2>
                  <p className="text-gray-400 text-sm mb-8">We'll send the detailed quote to your email and call you to discuss.</p>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-gray-400 text-xs mb-2">Full Name *</label>
                      <input type="text" required value={data.name} onChange={e => setData({ ...data, name: e.target.value })} placeholder="Rahul Sharma" className="input-field" />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs mb-2">Phone Number *</label>
                      <input type="tel" required value={data.phone} onChange={e => setData({ ...data, phone: e.target.value })} placeholder="+91 98765 43210" className="input-field" />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs mb-2">Email Address *</label>
                      <input type="email" required value={data.email} onChange={e => setData({ ...data, email: e.target.value })} placeholder="your@email.com" className="input-field" />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs mb-2">City / Location</label>
                      <input type="text" value={data.city} onChange={e => setData({ ...data, city: e.target.value })} placeholder="Pune, Maharashtra" className="input-field" />
                    </div>
                  </div>
                  {/* Summary */}
                  <div className="mt-8 p-5 bg-dark-200 rounded-xl border border-white/5 space-y-3 text-sm">
                    <h4 className="text-white font-semibold mb-3">Quote Summary</h4>
                    <div className="flex justify-between"><span className="text-gray-500">Project Type</span><span className="text-white capitalize">{data.type || 'Not selected'}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Area</span><span className="text-white">{data.area.toLocaleString()} sq.ft</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Quality</span><span className="text-white capitalize">{data.quality}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Estimated Cost</span><span className="text-gradient-gold font-bold">{fmt(minEst)} – {fmt(maxEst)}</span></div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-10">
                <button onClick={() => setStep(s => s - 1)} disabled={step === 0}
                  className="btn-outline disabled:opacity-30 disabled:cursor-not-allowed">
                  <FiArrowLeft size={16} /> Back
                </button>
                {step < steps.length - 1 ? (
                  <button onClick={() => setStep(s => s + 1)}
                    disabled={(step === 0 && !data.type)}
                    className="btn-gold disabled:opacity-40 disabled:cursor-not-allowed">
                    Next <FiArrowRight size={16} />
                  </button>
                ) : (
                  <button onClick={handleSubmit} disabled={!data.name || !data.phone || !data.email} className="btn-gold disabled:opacity-40">
                    Submit Quote Request <FiArrowRight size={16} />
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
