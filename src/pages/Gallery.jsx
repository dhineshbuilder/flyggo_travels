import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for real-time updates from Firestore
    const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const imgData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setImages(imgData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '3rem', background: 'var(--gradient-ocean)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Travel Gallery
      </h2>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem' }}>Loading beautiful destinations...</div>
      ) : images.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
          No images in the gallery yet. Check back soon!
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '1.5rem' 
        }}>
          {images.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel"
              style={{ overflow: 'hidden', height: '300px', position: 'relative' }}
            >
              <img 
                src={img.url} 
                alt={img.title || 'Travel destination'} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
              />
              {img.title && (
                <div style={{
                  position: 'absolute',
                  bottom: 0, left: 0, right: 0,
                  padding: '1rem',
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                  color: 'white',
                  fontWeight: 500
                }}>
                  {img.title}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
