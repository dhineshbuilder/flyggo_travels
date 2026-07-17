import React from 'react';

const Footer = () => {
  return (
    <footer style={{ 
      padding: '2rem', 
      textAlign: 'center', 
      marginTop: 'auto',
      borderTop: 'var(--border-color)',
      color: 'var(--text-secondary)',
      fontSize: '0.9rem'
    }}>
      <p>© {new Date().getFullYear()} Flyggo Travel. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
