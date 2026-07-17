import React from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  const destinations = [
    { id: 1, name: 'Santorini, Greece', image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80&w=800', price: '$1200' },
    { id: 2, name: 'Bali, Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800', price: '$850' },
    { id: 3, name: 'Swiss Alps', image: 'https://images.unsplash.com/photo-1531366936337-775698b67b5e?auto=format&fit=crop&q=80&w=800', price: '$1500' },
  ];

  return (
    <div style={{ padding: '0 2rem' }}>
      {/* Hero Section */}
      <section style={{ 
        textAlign: 'center', 
        padding: '6rem 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem'
      }}>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ 
            fontSize: '4rem', 
            fontWeight: 800,
            background: 'var(--gradient-ocean)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent',
            margin: 0
          }}
        >
          Discover Your Next Adventure
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '600px' }}
        >
          Explore the world's most beautiful destinations with Flyggo. We curate the best travel experiences just for you.
        </motion.p>
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="btn-primary" 
          style={{ marginTop: '1rem', fontSize: '1.1rem' }}
        >
          Start Exploring
        </motion.button>
      </section>

      {/* Featured Destinations */}
      <section style={{ padding: '4rem 0' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>Featured Destinations</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem' 
        }}>
          {destinations.map((dest, index) => (
            <motion.div 
              key={dest.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 * index }}
              className="glass-panel"
              style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ height: '200px', overflow: 'hidden' }}>
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }} 
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{dest.name}</h3>
                <span style={{ fontWeight: 'bold', color: '#00C9FF' }}>{dest.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
