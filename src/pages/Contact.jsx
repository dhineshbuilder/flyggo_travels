import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', destination: '', message: '' });
  const [status, setStatus] = useState(''); // 'submitting', 'success', 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await addDoc(collection(db, 'enquiries'), {
        ...formData,
        createdAt: serverTimestamp(),
        status: 'new'
      });
      setStatus('success');
      setFormData({ name: '', email: '', destination: '', message: '' });
      setTimeout(() => setStatus(''), 5000);
    } catch (error) {
      console.error('Error submitting form: ', error);
      setStatus('error');
    }
  };

  return (
    <div style={{ padding: '4rem 2rem', display: 'flex', justifyContent: 'center' }}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel"
        style={{ width: '100%', maxWidth: '600px', padding: '3rem' }}
      >
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>Get in Touch</h2>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2rem' }}>
          Ready to plan your next trip? Send us an enquiry and our travel experts will reach out to you.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Full Name</label>
            <input 
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text" 
              style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', outline: 'none' }} 
              placeholder="John Doe" 
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email Address</label>
            <input 
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email" 
              style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', outline: 'none' }} 
              placeholder="john@example.com" 
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Dream Destination</label>
            <input 
              required
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              type="text" 
              style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', outline: 'none' }} 
              placeholder="e.g. Kyoto, Japan" 
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Message</label>
            <textarea 
              required
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', outline: 'none', resize: 'vertical' }} 
              placeholder="Tell us about your travel plans..." 
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={status === 'submitting'}
            style={{ marginTop: '1rem', opacity: status === 'submitting' ? 0.7 : 1 }}
          >
            {status === 'submitting' ? 'Sending...' : 'Send Enquiry'}
          </button>

          {status === 'success' && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: '#10b981', textAlign: 'center', marginTop: '1rem', fontWeight: 500 }}>
              Your enquiry has been sent successfully!
            </motion.p>
          )}
          {status === 'error' && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: '#ef4444', textAlign: 'center', marginTop: '1rem', fontWeight: 500 }}>
              There was an error sending your enquiry. Please try again.
            </motion.p>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default Contact;
