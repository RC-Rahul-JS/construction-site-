// src/components/TestimonialForm.jsx
import { useState } from 'react';
import { addDocument } from '../firebase/firestore';
import { uploadImage } from '../firebase/storage';

import { FiStar, FiUser, FiSend } from 'react-icons/fi';

export default function TestimonialForm() {
  const [formData, setFormData] = useState({ name: '', designation: '', rating: 5, message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addDocument('testimonials', {
        ...formData,
        image: null,
        type: 'public',
        approved: false, // Must be approved by admin
        createdAt: new Date().toISOString()
      });
      setSubmitted(true);
    } catch (err) {
      // Error handled silently
      alert('Failed to submit testimonial. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="glass-card p-8 text-center max-w-lg mx-auto">
        <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiStar className="text-gold" size={32} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
        <p className="text-gray-400">Your review has been submitted and will be visible after admin approval.</p>
        <button onClick={() => setSubmitted(false)} className="mt-6 text-gold text-sm font-semibold hover:underline">Submit another review</button>
      </div>
    );
  }

  return (
    <div className="glass-card p-8 max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">Share Your Experience</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 text-xs font-semibold mb-1 uppercase tracking-wider">Your Name</label>
            <input 
              type="text" required 
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs font-semibold mb-1 uppercase tracking-wider">Designation / Role</label>
            <input 
              type="text" placeholder="e.g. Homeowner"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
              value={formData.designation} onChange={e => setFormData({...formData, designation: e.target.value})}
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-400 text-xs font-semibold mb-1 uppercase tracking-wider">Rating</label>
          <div className="flex gap-2">
            {[1,2,3,4,5].map(star => (
              <button 
                key={star} type="button"
                onClick={() => setFormData({...formData, rating: star})}
                className={`w-10 h-10 rounded-lg border transition-all flex items-center justify-center ${formData.rating >= star ? 'border-gold bg-gold/10 text-gold' : 'border-white/10 text-gray-600'}`}
              >
                <FiStar size={18} className={formData.rating >= star ? 'fill-gold' : ''} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-gray-400 text-xs font-semibold mb-1 uppercase tracking-wider">Your Feedback</label>
          <textarea 
            required rows="4"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
            value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
          />
        </div>



        <button 
          type="submit" disabled={submitting}
          className="w-full bg-gold hover:bg-gold-600 text-dark font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2 mt-4"
        >
          {submitting ? 'Submitting...' : <><FiSend /> Submit Review</>}
        </button>
      </form>
    </div>
  );
}
