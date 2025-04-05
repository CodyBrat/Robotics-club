import React, { useEffect, useState } from 'react';
import './GlitchText.css';

const GlitchText = ({ text, className = '' }) => {
  const [isGlitching, setIsGlitching] = useState(false);
  
  useEffect(() => {
    // Initial animation
    setTimeout(() => setIsGlitching(true), 500);
    
    // Random glitch intervals
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), Math.random() * 200 + 50);
    }, Math.random() * 3000 + 2000);
    
    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className={`glitch-container ${className}`}>
      <div 
        className="glitch-text glitch-main"
        style={{ fontSize: 'inherit' }}
      >
        {text}
      </div>
      <div 
        className="glitch-text glitch-layer-1" 
        style={{ 
          opacity: isGlitching ? 0.8 : 0,
          transform: isGlitching ? 'translate3d(-5px, 2px, 0)' : 'translate3d(0, 0, 0)',
          transition: 'transform 0.05s linear, opacity 0.05s linear',
          animation: isGlitching ? 'scanlines 0.2s linear infinite' : 'none',
          clipPath: isGlitching ? 'polygon(0 15%, 100% 15%, 100% 30%, 0 30%, 0 60%, 100% 60%, 100% 75%, 0 75%)' : 'none',
          fontSize: 'inherit'
        }}
      >
        {text}
      </div>
      <div 
        className="glitch-text glitch-layer-2"
        style={{ 
          opacity: isGlitching ? 0.8 : 0,
          transform: isGlitching ? 'translate3d(5px, -2px, 0)' : 'translate3d(0, 0, 0)',
          transition: 'transform 0.05s linear, opacity 0.05s linear',
          animation: isGlitching ? 'glitch2 0.3s infinite' : 'none',
          clipPath: isGlitching ? 'polygon(0 5%, 100% 5%, 100% 20%, 0 20%, 0 40%, 100% 40%, 100% 55%, 0 55%, 0 70%, 100% 70%, 100% 85%, 0 85%)' : 'none',
          fontSize: 'inherit'
        }}
      >
        {text}
      </div>
      <div 
        className="scan"
        style={{
          opacity: isGlitching ? 0.75 : 0,
          animation: isGlitching ? 'scanning 3s linear infinite' : 'none'
        }}
      ></div>
      <div 
        className="connections"
        style={{
          opacity: isGlitching ? 0.3 : 0
        }}
      ></div>
    </div>
  );
};

export default GlitchText; 