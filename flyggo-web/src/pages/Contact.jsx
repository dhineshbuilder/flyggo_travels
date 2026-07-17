import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', destination: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      await addDoc(collection(db, 'enquiries'), {
        ...formData,
        createdAt: serverTimestamp(),
        status: 'Pending'
      });
      setStatus('Sent Successfully!');
      setFormData({ name: '', email: '', destination: '', message: '' });
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      console.error(error);
      setStatus('Error sending message.');
    }
  };

  return (
    <div className="pt-24 pb-12 px-6 lg:px-8 max-w-7xl mx-auto min-h-[calc(100vh-100px)] flex items-center">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Left Side: Image & Info */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative rounded-[2.5rem] overflow-hidden min-h-[400px] lg:min-h-[600px] shadow-xl"
        >
          <img 
            src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80" 
            alt="Bali Resort" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 p-10 text-white w-full">
            <h3 className="text-xs font-bold tracking-widest text-orange-400 uppercase mb-2">Get In Touch</h3>
            <h2 className="text-4xl font-bold mb-8">Your Next Adventure Awaits</h2>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <span className="text-xl">📞</span>
                </div>
                <div>
                  <p className="text-xs text-white/70">Call Us</p>
                  <p className="font-semibold">+1 (800) FLYGGO-TRAVEL</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <span className="text-xl">✉</span>
                </div>
                <div>
                  <p className="text-xs text-white/70">Email Address</p>
                  <p className="font-semibold">concierge@flyggo.travel</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <span className="text-xl">📍</span>
                </div>
                <div>
                  <p className="text-xs text-white/70">Main Office</p>
                  <p className="font-semibold">42 Horizon Drive, Azure Coast, FL</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-xl border border-white/40 flex flex-col justify-center"
        >
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Plan Your Journey</h2>
          <p className="text-sm text-slate-500 mb-8">Tell us about your dream destination and our travel experts will handle the rest.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="John Doe"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-shadow"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="john@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-shadow"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Dream Destination</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Bali, Maldives, Amalfi Coast"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-shadow"
                value={formData.destination}
                onChange={(e) => setFormData({...formData, destination: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Message</label>
              <textarea 
                required
                rows="4"
                placeholder="Tell us more about your travel style and preferences..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-shadow resize-none"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>
            
            <button 
              type="submit"
              disabled={!!status}
              className="px-8 py-3 rounded-xl text-white font-medium transition-transform hover:scale-[1.02] shadow-md flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(to right, #ea580c, #f97316)' }}
            >
              {status || 'Send Enquiry ➔'}
            </button>
          </form>
        </motion.div>

      </div>
    </div>
  );
};

export default Contact;
