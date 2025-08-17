import React, { useState, useEffect } from 'react';

const NetflixLoader = ({ onComplete }) => {
  const [currentPhase, setCurrentPhase] = useState('initial'); // initial, logo, tudum, complete
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeline = [
      { phase: 'logo', delay: 800 },
      { phase: 'tudum', delay: 2500 },
      // Keep ROHAN.DEV visible for ~2 seconds before completing
      { phase: 'complete', delay: 4500 }
    ];

    timeline.forEach(({ phase, delay }) => {
      setTimeout(() => {
        setCurrentPhase(phase);
      }, delay);
    });

    // Complete loading sequence
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 600); // Wait for fade out
    }, 4500);
  }, [onComplete]);

  if (!isVisible) {
    return (
      <div className="fixed inset-0 bg-black z-50 opacity-0 transition-opacity duration-600"></div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-900/20 via-blue-800/10 to-transparent rounded-full animate-pulse"></div>
      </div>

      {/* Logo Phase */}
      {currentPhase === 'logo' && (
        <div className="relative z-10 text-center animate-fade-in">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto border-4 border-blue-500 rounded-full flex items-center justify-center animate-spin-slow">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          <h1 className="text-2xl font-mono text-white tracking-widest opacity-70 animate-pulse">
            LOADING...
          </h1>
        </div>
      )}

      {/* TUDUM Phase - ROHAN text now properly contained within larger brackets */}
      {currentPhase === 'tudum' && (
        <div className="relative z-10 text-center">
          {/* Main ROHAN.DEV text with Netflix-style animation - balanced sizing for aesthetics */}
          <div className="relative">
            <h1 className="text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-cyan-100 tracking-wider animate-netflix-reveal">
              ROHAN
            </h1>
            <div className="mt-3">
              <span className="text-3xl lg:text-4xl font-mono text-blue-400 tracking-[0.3em] animate-netflix-reveal-delayed">
                .DEV
              </span>
            </div>
          </div>

          {/* Subtitle */}
          <div className="mt-8 animate-fade-in-up-delayed">
            <p className="text-xl text-gray-400 font-light tracking-wide">
              AI/ML Engineer Portfolio
            </p>
          </div>

          {/* Animated bars/lines effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-slide-across"></div>
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-slide-across-reverse"></div>
          </div>

          {/* Corner accents - larger brackets for better text spacing */}
          <div className="absolute top-4 left-4 w-44 h-44 border-l-4 border-t-4 border-blue-500 animate-fade-in"></div>
          <div className="absolute top-4 right-4 w-44 h-44 border-r-4 border-t-4 border-blue-500 animate-fade-in"></div>
          <div className="absolute bottom-4 left-4 w-44 h-44 border-l-4 border-b-4 border-cyan-500 animate-fade-in"></div>
          <div className="absolute bottom-4 right-4 w-44 h-44 border-r-4 border-b-4 border-cyan-500 animate-fade-in"></div>
        </div>
      )}

      {/* Particle effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-blue-400 rounded-full animate-float-particle opacity-30`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      {/* Progress bar at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-900">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 ease-out"
          style={{
            width: currentPhase === 'initial' ? '0%' : 
                   currentPhase === 'logo' ? '30%' : 
                   currentPhase === 'tudum' ? '80%' : '100%'
          }}
        ></div>
      </div>
    </div>
  );
};

export default NetflixLoader;