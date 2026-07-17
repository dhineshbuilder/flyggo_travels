import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-panel" 
      style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '1rem 2rem', 
        margin: '1rem',
        position: 'sticky',
        top: '1rem',
        zIndex: 1000
      }}
    >
      <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
        Flyggo<span style={{ color: '#00C9FF' }}>.</span>
      </Link>
      
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontWeight: 500 }}>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/gallery" className="nav-link">Gallery</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
        <Link to="/admin" className="nav-link" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Admin</Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;
