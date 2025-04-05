import React, { useEffect, useRef, useState } from 'react';

const SplitText = ({
  text,
  className = '',
  delay = 100,
  animationFrom = { opacity: 0, transform: 'translate3d(0,50px,0)' },
  animationTo = { opacity: 1, transform: 'translate3d(0,0,0)' },
  easing = 'ease-out',
  threshold = 0.1,
  rootMargin = '0px',
  onLetterAnimationComplete = () => {}
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const animatedChars = useRef(0);
  const totalChars = text.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.disconnect();
      }
    };
  }, [threshold, rootMargin]);

  const handleTransitionEnd = () => {
    animatedChars.current += 1;
    if (animatedChars.current === totalChars) {
      onLetterAnimationComplete();
    }
  };

  const getStyle = (index) => {
    if (!isVisible) {
      return {
        ...convertStyleObjectToReact(animationFrom),
        transition: `all 0ms ${easing}`
      };
    }

    return {
      ...convertStyleObjectToReact(animationTo),
      transition: `all 600ms ${easing}`,
      transitionDelay: `${index * delay}ms`
    };
  };

  // Helper to convert CSS style object to React style object
  const convertStyleObjectToReact = (styleObj) => {
    const result = {};
    Object.keys(styleObj).forEach(key => {
      result[key] = styleObj[key];
    });
    return result;
  };

  return (
    <div ref={containerRef} className={className}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          style={{ 
            ...getStyle(index),
            display: 'inline-block',
            willChange: 'transform, opacity'
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
};

export default SplitText; 