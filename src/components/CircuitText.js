import React, { useEffect, useState, useRef } from 'react';
import './CircuitText.css';

const CircuitText = ({ text, className = '' }) => {
  const [active, setActive] = useState(false);
  const [pulses, setPulses] = useState([]);
  const containerRef = useRef(null);
  
  useEffect(() => {
    // Delayed startup animation
    setTimeout(() => setActive(true), 800);
    
    // Create random circuit pulses
    const createPulse = () => {
      if (!containerRef.current) return;
      
      const bounds = containerRef.current.getBoundingClientRect();
      const xPos = Math.random() * 100; // percent-based position
      const duration = Math.random() * 2000 + 1000;
      const size = Math.random() * 6 + 3;
      
      setPulses(prev => [
        ...prev, 
        { 
          id: Date.now(), 
          x: xPos, 
          duration,
          size
        }
      ]);
      
      // Remove pulse after animation
      setTimeout(() => {
        setPulses(prev => prev.filter(p => p.id !== Date.now()));
      }, duration);
    };
    
    // Generate pulses periodically
    const pulseInterval = setInterval(() => {
      createPulse();
    }, 600);
    
    // Initial pulses
    for (let i = 0; i < 5; i++) {
      setTimeout(createPulse, i * 300);
    }
    
    return () => clearInterval(pulseInterval);
  }, []);

  const letters = text.split('');

  return (
    <div className={`circuit-container ${className} ${active ? 'active' : ''}`} ref={containerRef}>
      <div className="circuit-letters">
        {letters.map((letter, i) => (
          <div 
            key={i} 
            className="circuit-letter"
            style={{ 
              animationDelay: `${i * 0.15}s`,
              transitionDelay: `${i * 0.1}s`
            }}
          >
            <div className="letter-fill">{letter}</div>
            <div className="letter-outline">{letter}</div>
            
            {/* Circuit lines for each letter */}
            <div className="circuit-lines">
              <div className="h-line"></div>
              <div className="v-line"></div>
              <div className="h-line-2"></div>
              <div className="corner"></div>
              <div className="corner-2"></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Circuit pulses */}
      <div className="pulse-container">
        {pulses.map(pulse => (
          <div 
            key={pulse.id}
            className="pulse"
            style={{ 
              left: `${pulse.x}%`,
              animationDuration: `${pulse.duration}ms`,
              width: `${pulse.size}px`,
              height: `${pulse.size}px`
            }}
          />
        ))}
      </div>
      
      {/* Grid background */}
      <div className="circuit-grid"></div>
      
      {/* Scanner effect */}
      <div className="scanner"></div>
    </div>
  );
};

export default CircuitText; 