import React, { useEffect, useState, useRef } from 'react';
import './HolographicText.css';

const HolographicText = ({ text, className = '' }) => {
  const [isActive, setIsActive] = useState(false);
  const scanLines = Array(10).fill(0).map((_, i) => ({ 
    id: i, 
    opacity: Math.random() * 0.7 + 0.3,
    speed: Math.random() * 2 + 1,
    delay: Math.random() * 3
  }));
  const containerRef = useRef(null);
  
  useEffect(() => {
    // Activate the hologram
    const timer = setTimeout(() => {
      setIsActive(true);
    }, 1000);
    
    // Simulate hologram flicker
    const flickerInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsActive(false);
        setTimeout(() => setIsActive(true), Math.random() * 200);
      }
    }, 2000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(flickerInterval);
    };
  }, []);
  
  const letters = text.split('');
  
  return (
    <div 
      className={`holographic-container ${className} ${isActive ? 'active' : ''}`}
      ref={containerRef}
    >
      {/* Main text */}
      <div className="holographic-text">
        {letters.map((letter, i) => (
          <span 
            key={i} 
            className="holographic-letter"
            style={{
              animationDelay: `${0.1 * i}s`,
              animationDuration: `${Math.random() * 1 + 3}s`
            }}
          >
            {letter}
          </span>
        ))}
      </div>
      
      {/* Blurred copy for glow effect */}
      <div className="holographic-blur">
        {text}
      </div>
      
      {/* Scan lines */}
      <div className="scan-lines">
        {scanLines.map(line => (
          <div 
            key={line.id} 
            className="scan-line" 
            style={{
              opacity: line.opacity,
              animationDuration: `${line.speed}s`,
              animationDelay: `${line.delay}s`
            }}
          />
        ))}
      </div>
      
      {/* Hologram projectors */}
      <div className="projector-left"></div>
      <div className="projector-right"></div>
      
      {/* Projection beams */}
      <div className="beam-left"></div>
      <div className="beam-right"></div>
      
      {/* Holographic UI elements */}
      <div className="holo-ui">
        <div className="ui-circle ui-circle-1"></div>
        <div className="ui-circle ui-circle-2"></div>
        <div className="ui-line ui-line-1"></div>
        <div className="ui-line ui-line-2"></div>
        <div className="ui-line ui-line-3"></div>
      </div>
      
      {/* Hologram base platform */}
      <div className="holo-platform">
        <div className="platform-light"></div>
      </div>
    </div>
  );
};

export default HolographicText; 