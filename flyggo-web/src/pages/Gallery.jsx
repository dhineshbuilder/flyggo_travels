import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  const getOptimizedUrl = (url) => {
    if (!url) return '';
    if (url.includes('res.cloudinary.com')) {
      return url.replace('/upload/', '/upload/f_auto,q_auto,w_800/');
    }
    return url;
  };

  return (
    <div className="pt-32 pb-20 px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-sky-800 tracking-tight mb-4"
        >
          Visual Horizons
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-600"
        >
          Immerse yourself in our curated collection of extraordinary moments. From sun-drenched coasts to neon-lit streets, witness the world through our lens.
        </motion.p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-700"></div>
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-20 text-slate-500 bg-white/50 backdrop-blur-sm rounded-3xl border border-white/40 shadow-sm">
          No images uploaded yet. Admin can upload images from the dashboard.
        </div>
      ) : (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img, index) => (
            <motion.div 
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 6) * 0.1 }}
              className="relative rounded-3xl overflow-hidden shadow-sm group break-inside-avoid"
            >
              <img 
                src={getOptimizedUrl(img.url)} 
                alt={img.title} 
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="text-white font-semibold text-lg drop-shadow-md">{img.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
