import React, { useState, useEffect } from 'react';
import SplitText from './components/SplitText.js';
import Spline from '@splinetool/react-spline';
import GlitchText from './components/GlitchText.js';
import CircuitText from './components/CircuitText.js';
import HolographicText from './components/HolographicText.js';

function App() {
  const [textEffect, setTextEffect] = useState('circuit'); // 'glitch', 'circuit', or 'holographic'
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [splineError, setSplineError] = useState(false);
  
  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };

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

  const handleSplineLoad = () => {
    console.log("Spline scene loaded successfully");
    setSplineLoaded(true);
  };

  const handleSplineError = (err) => {
    console.error("Failed to load Spline scene:", err);
    setSplineError(true);
  };

  // Add a timeout to handle cases where Spline might be causing issues
  useEffect(() => {
    // If Spline doesn't load within 3 seconds (reduced from 5), mark it as errored to show the fallback
    const timeoutId = setTimeout(() => {
      if (!splineLoaded) {
        console.log("Spline load timeout - falling back to basic UI");
        setSplineError(true);
      }
    }, 3000);
    
    // Check for WebGL support
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && 
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch (e) {
        return false;
      }
    };
    
    if (!checkWebGL()) {
      console.log("WebGL not supported - falling back to basic UI");
      setSplineError(true);
    }
    
    return () => clearTimeout(timeoutId);
  }, [splineLoaded]);

  return (
    <div 
      data-testid="app-loaded"
      style={{ 
        backgroundColor: '#000000', 
        height: '100vh', 
        position: 'relative',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Text effect selector */}
      <div style={{ 
        position: 'absolute', 
        bottom: '20px', 
        left: '50%', 
        transform: 'translateX(-50%)',
        zIndex: 20,
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
      
      {/* IRIS text - behind model */}
      <div style={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        width: '100%',
        zIndex: 0
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
      
      {/* Spline 3D background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 5
      }}>
        {splineError ? (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100%', 
            color: 'rgba(255,255,255,0.5)',
            fontSize: '16px' 
          }}>
            3D model failed to load
          </div>
        ) : (
          <Spline 
            scene="https://prod.spline.design/uWRbcbqqtpDWPjaM/scene.splinecode" 
            onLoad={handleSplineLoad}
            onError={handleSplineError}
            style={{ width: '100%', height: '100%' }}
            renderOnDemand={false}
            preventAutoLoad={false}
          />
        )}
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
          onLetterAnimationComplete={handleAnimationComplete}
        />
      </div>
    </div>
  );
}

export default App;
