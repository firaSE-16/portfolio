"use client"
import { useEffect } from 'react';

const SciFiUI = () => {
  useEffect(() => {
    // This ensures the UI elements are only rendered on client side
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 grid grid-cols-12 grid-rows-6 h-screen w-full">
      {/* Border elements */}
      <div className="row-span-6 border-l border-purple-400/30 relative">
        <div className="absolute -left-1 top-1/4 w-2 h-2 border-l border-t border-red-500"></div>
        <div className="absolute -left-1 bottom-1/4 w-2 h-2 border-l border-b border-red-500"></div>
      </div>
      
      <div className="row-span-6 border-r border-purple-400/30 relative">
        <div className="absolute -right-1 top-1/4 w-2 h-2 border-r border-t border-red-500"></div>
        <div className="absolute -right-1 bottom-1/4 w-2 h-2 border-r border-b border-red-500"></div>
      </div>
      
      {/* Top and bottom borders */}
      <div className="col-span-12 border-t border-purple-400/30 relative">
        <div className="absolute left-1/4 -top-1 w-2 h-2 border-t border-l border-red-500"></div>
        <div className="absolute right-1/4 -top-1 w-2 h-2 border-t border-r border-red-500"></div>
      </div>
      
      <div className="col-span-12 border-b border-purple-400/30 relative">
        <div className="absolute left-1/4 -bottom-1 w-2 h-2 border-b border-l border-red-500"></div>
        <div className="absolute right-1/4 -bottom-1 w-2 h-2 border-b border-r border-red-500"></div>
      </div>
      
      {/* UI text elements */}
      <div className="absolute bottom-8 left-8 text-purple-400 text-xs tracking-widest">
        <div className="overflow-hidden h-6">
          <div className="animate-[slideUp_8s_infinite]">
            <div>STATUS: ONLINE</div>
            <div>LOCATION: ETHIOPIA</div>
            <div>SPECIALTY: FULLSTACK</div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 right-8 text-purple-400 text-xs tracking-widest">
        <div className="overflow-hidden h-6">
          <div className="animate-[slideUp_10s_infinite]">
            <div>PYTHON | JAVASCRIPT</div>
            <div>REACT | NEXT.JS</div>
            <div>NODE | EXPRESS</div>
          </div>
        </div>
      </div>
      
      {/* Crosshair */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16">
        <div className="absolute top-0 left-1/2 w-px h-full bg-purple-400/30"></div>
        <div className="absolute left-0 top-1/2 w-full h-px bg-purple-400/30"></div>
        <div className="absolute w-2 h-2 rounded-full bg-purple-400/50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </div>
  );
};

export default SciFiUI;