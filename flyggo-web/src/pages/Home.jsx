import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/90 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1600&q=80" 
            alt="Travel Background" 
            className="w-full h-full object-cover opacity-25 select-none pointer-events-none"
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 tracking-tight mb-4">
            Escape to Extraordinary
          </h1>
          <p className="text-lg text-slate-600 mb-12">
            Discover the world's most breathtaking destinations curated for the luxury explorer.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <Link 
              to="/contact" 
              className="px-8 py-4 rounded-full text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all text-sm w-full sm:w-auto text-center"
              style={{ background: 'linear-gradient(to right, #ea580c, #f97316)' }}
            >
              Plan Your Journey
            </Link>
            <Link 
              to="/gallery" 
              className="px-8 py-4 rounded-full bg-white/80 hover:bg-white text-slate-800 font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all border border-slate-200 text-sm w-full sm:w-auto text-center"
            >
              Explore Gallery
            </Link>
          </div>

          {/* Highlights */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><span className="text-sky-700">✦</span> Tailored Itineraries</span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5"><span className="text-sky-700">✦</span> Premium Stays</span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5"><span className="text-sky-700">✦</span> 24/7 Concierge</span>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
