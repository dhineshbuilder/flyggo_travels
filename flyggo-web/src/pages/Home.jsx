import React from 'react';
import { motion } from 'framer-motion';

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

          {/* Search Widget */}
          <div className="bg-white/80 backdrop-blur-xl p-4 md:p-6 rounded-3xl shadow-xl border border-white/40 flex flex-col md:flex-row gap-4 items-center justify-between text-left">
            <div className="flex-1 px-4">
              <label className="block text-xs font-semibold text-sky-700 uppercase tracking-wider mb-1">Destination</label>
              <input type="text" placeholder="Where to?" className="w-full bg-transparent border-none outline-none font-medium text-slate-900 placeholder-slate-400" />
            </div>
            <div className="hidden md:block w-px h-12 bg-slate-200"></div>
            <div className="flex-1 px-4">
              <label className="block text-xs font-semibold text-sky-700 uppercase tracking-wider mb-1">Dates</label>
              <input type="text" placeholder="Select dates" className="w-full bg-transparent border-none outline-none font-medium text-slate-900 placeholder-slate-400" />
            </div>
            <div className="hidden md:block w-px h-12 bg-slate-200"></div>
            <div className="flex-1 px-4">
              <label className="block text-xs font-semibold text-sky-700 uppercase tracking-wider mb-1">Guests</label>
              <select className="w-full bg-transparent border-none outline-none font-medium text-slate-900 cursor-pointer">
                <option>2 Guests</option>
                <option>1 Guest</option>
                <option>3+ Guests</option>
              </select>
            </div>
            <button 
              className="w-full md:w-auto px-8 py-3 rounded-2xl text-white font-medium transition-transform hover:scale-105 shadow-md"
              style={{ background: 'linear-gradient(to right, #ea580c, #f97316)' }}
            >
              Search
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
