import React, { useState } from 'react';
import SplitText from './components/SplitText.js';
import GlitchText from './components/GlitchText.js';
import CircuitText from './components/CircuitText.js';
import HolographicText from './components/HolographicText.js';

// A simplified version of the app without the 3D model
function SimplifiedApp() {
  const [textEffect, setTextEffect] = useState('circuit'); // 'glitch', 'circuit', or 'holographic'
  
  const TextComponent = () => {
    switch(textEffect) {
      case 'glitch':
        return <GlitchText text="IRIS" />;
      case 'circuit':
        return <CircuitText text="IRIS" />;
      case 'holographic':
        return <HolographicText text="IRIS" />;
      default:
        return <CircuitText text="IRIS" />;
    }
  };

  return (
    <div style={{ 
      backgroundColor: '#000000', 
      height: '100vh', 
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden'
    }}>
      {/* Text effect selector */}
      <div style={{ 
        position: 'absolute', 
        bottom: '20px', 
        left: '50%', 
        transform: 'translateX(-50%)',
        zIndex: 10,
        display: 'flex',
        gap: '15px'
      }}>
        <button 
          onClick={() => setTextEffect('glitch')}
          style={{ 
            background: textEffect === 'glitch' ? '#ffffff' : '#222',
            color: textEffect === 'glitch' ? '#000000' : '#ffffff',
            border: 'none',
            padding: '8px 15px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Glitch
        </button>
        <button 
          onClick={() => setTextEffect('circuit')}
          style={{ 
            background: textEffect === 'circuit' ? '#ffffff' : '#222',
            color: textEffect === 'circuit' ? '#000000' : '#ffffff',
            border: 'none',
            padding: '8px 15px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Circuit
        </button>
        <button 
          onClick={() => setTextEffect('holographic')}
          style={{ 
            background: textEffect === 'holographic' ? '#ffffff' : '#222',
            color: textEffect === 'holographic' ? '#000000' : '#ffffff',
            border: 'none',
            padding: '8px 15px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Hologram
        </button>
      </div>
      
      {/* IRIS text */}
      <div style={{ 
        textAlign: 'center',
        width: '100%',
      }}>
        <h1 style={{
          fontSize: 'clamp(180px, 40vw, 1200px)',
          fontWeight: '700',
          margin: 0,
          padding: 0,
          lineHeight: '1'
        }}>
          <TextComponent />
        </h1>
      </div>
      
      <div style={{ position: 'absolute', top: '20px', left: '20px', color: 'white', fontSize: '32px', fontWeight: 'bold', zIndex: 10 }}>
        <SplitText
          text="Hello!"
          className="text-center"
          delay={50}
          animationFrom={{ opacity: 0, transform: 'translate3d(0,30px,0)' }}
          animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
          easing="cubic-bezier(0.215, 0.61, 0.355, 1)"
          threshold={0.1}
          rootMargin="-20px"
        />
      </div>
    </div>
  );
}

export default SimplifiedApp; 