"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";

interface AnimatedParticle {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  id: number | string | bigint | any;
  size: number;
  left: number;
  delay: number;
  duration: number;
  opacity: number;
  color: string;
  shape: 'circle' | 'triangle' | 'square';
  blur: number;
  initialY: number;
  initialX: number;
}

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Array<AnimatedParticle>>([]);
  const [bgParticles, setBgParticles] = useState<Array<AnimatedParticle>>([]);
  const [isMounted, setIsMounted] = useState(false);
  
  const heroRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [0, 1], [15, -15]);
  const rotateY = useTransform(mouseX, [0, 1], [-15, 15]);

  const getRandomParticleColor = () => {
    const colors = [
      "var(--primary)",
      "var(--secondary)",
      "var(--muted)",
      "rgba(123, 97, 255, 0.8)",
      "rgba(226, 179, 239, 0.8)",
      "rgba(218, 131, 242, 0.8)"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getRandomBgParticleColor = () => {
    const colors = [
      "rgba(226,179,239,0.8)",
      "rgba(218,131,242,0.8)",
      "rgba(123, 97, 255, 0.6)",
      "rgba(168, 85, 247, 0.6)",
      "rgba(192, 132, 252, 0.6)"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    setMounted(true);
    setIsMounted(true);
    
    // Generate consistent particles on both server and client
    const generatedParticles: AnimatedParticle[] = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      size: 2 + (i % 8), // More deterministic sizing
      left: (i * 2) % 100, // More deterministic positioning
      delay: (i % 15),
      duration: 15 + (i % 20),
      opacity: 0.2 + (i % 5) * 0.1,
      color: colors[i % colors.length],
      shape: i % 3 === 0 ? "circle" : i % 3 === 1 ? "triangle" : "square",
      blur: (i % 4),
      initialY: (i * 3) % 100 - 50,
      initialX: (i * 5) % 100 - 50,
    }));

    const generatedBgParticles: AnimatedParticle[] = Array.from({ length: 50 }).map((_, i) => ({
      id: i + 50, // Different IDs from main particles
      size: 2 + ((i + 5) % 8),
      left: ((i + 3) * 2) % 100,
      delay: ((i + 2) % 15),
      duration: 15 + ((i + 1) % 20),
      opacity: 0.2 + ((i + 2) % 5) * 0.1,
      color: bgColors[(i + 1) % bgColors.length],
      shape: (i + 1) % 3 === 0 ? "circle" : (i + 1) % 3 === 1 ? "triangle" : "square",
      blur: ((i + 1) % 4),
      initialY: ((i + 2) * 3) % 100 - 50,
      initialX: ((i + 3) * 5) % 100 - 50,
    }));

    setParticles(generatedParticles);
    setBgParticles(generatedBgParticles);

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Define colors arrays outside the effect for consistency
  const colors = [
    "var(--primary)",
    "var(--secondary)",
    "var(--muted)",
    "rgba(123, 97, 255, 0.8)",
    "rgba(226, 179, 239, 0.8)",
    "rgba(218, 131, 242, 0.8)"
  ];

  const bgColors = [
    "rgba(226,179,239,0.8)",
    "rgba(218,131,242,0.8)",
    "rgba(123, 97, 255, 0.6)",
    "rgba(168, 85, 247, 0.6)",
    "rgba(192, 132, 252, 0.6)"
  ];

  if (!mounted || !isMounted) return null;

  return (
    <motion.div
      ref={heroRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full flex items-center justify-center h-screen relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 20% 20%, rgba(123, 97, 255, 0.25) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 80%, rgba(226, 179, 239, 0.25) 0%, transparent 50%),
          linear-gradient(to bottom, #0a0615 0%, #140c24 100%)
        `,
        perspective: "1000px"
      }}
    >
      {/* Cosmic grid background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Dynamic cosmic rays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (360 / 8) * i;
          const duration = 20 + (i % 20);
          const delay = i % 10;
          
          return (
            <motion.div
              key={`ray-${i}`}
              className="absolute top-1/2 left-1/2 w-1 h-1 origin-center"
              style={{
                background: `linear-gradient(90deg, rgba(168, 85, 247, 0) 0%, rgba(168, 85, 247, 0.3) 50%, rgba(168, 85, 247, 0) 100%)`,
                transform: `rotate(${angle}deg) translateY(-50vh)`,
                height: "100vh",
                width: `${1 + (i % 2)}px`,
                opacity: 0.1 + (i % 3) * 0.1
              }}
              animate={{
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: duration,
                delay: delay,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          );
        })}
      </div>

      {/* Interactive cosmic flare effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full filter blur-[100px] opacity-30 bg-purple-500 mix-blend-screen"
          style={{
            rotateX,
            rotateY,
            x: "-50%",
            y: "-50%"
          }}
          animate={{
            opacity: [0.2, 0.3, 0.2],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full filter blur-[120px] opacity-20 bg-indigo-500 mix-blend-screen"
          style={{
            rotateX,
            rotateY,
            x: "-50%",
            y: "-50%"
          }}
          animate={{
            opacity: [0.15, 0.25, 0.15],
            scale: [1, 1.05, 1],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full filter blur-[80px] opacity-15 bg-blue-400 mix-blend-screen"
          style={{
            rotateX,
            rotateY,
            x: "-50%",
            y: "-50%"
          }}
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [0.9, 1.1, 0.9]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Floating particles with shapes */}
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className={`absolute pointer-events-none ${particle.shape === 'circle' ? 'rounded-full' : particle.shape === 'triangle' ? 'triangle' : ''}`}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            bottom: '0',
            backgroundColor: particle.color,
            opacity: particle.opacity,
            filter: `blur(${particle.blur}px)`,
            rotateX,
            rotateY
          }}
          animate={{
            y: [`${particle.initialY}vh`, `calc(100vh + ${particle.size}px)`],
            x: [`${particle.initialX}px`, `${particle.initialX + ((particle.id % 100) - 50)}px`],
            rotate: [0, 360],
            opacity: [particle.opacity, particle.opacity * 0.5, particle.opacity]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Background particles with parallax effect */}
      {bgParticles.map((particle) => (
        <motion.div
          key={`bg-particle-${particle.id}`}
          className={`absolute pointer-events-none ${particle.shape === 'circle' ? 'rounded-full' : ''}`}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            bottom: "-50px",
            backgroundColor: particle.color,
            opacity: particle.opacity,
            filter: `blur(${particle.blur}px)`,
          }}
          animate={{
            y: [`${particle.initialY}vh`, `calc(-100vh - ${particle.size}px)`],
            x: [`${particle.initialX}px`, `${particle.initialX + ((particle.id % 40) - 20)}px`],
            rotate: [0, 360],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Dynamic starfield with twinkling effect */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 200 }).map((_, i) => {
          const size = (i % 3);
          const left = (i * 0.5) % 100;
          const top = (i * 0.7) % 100;
          const opacity = 0.2 + (i % 6) * 0.1;
          const delay = i % 5;
          const duration = 2 + (i % 4);
          const twinkleDuration = 1 + (i % 3);
          
          return (
            <motion.div
              key={`star-${i}`}
              className="absolute rounded-full bg-white pointer-events-none"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${top}%`,
                opacity: opacity,
                rotateX,
                rotateY
              }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [opacity * 0.3, opacity, opacity * 0.3],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: twinkleDuration,
                delay: delay,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      {/* Nebula effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => {
          const size = 200 + (i * 60);
          const left = (i * 20) % 100;
          const top = (i * 25) % 100;
          const opacity = 0.05 + (i * 0.02);
          const duration = 30 + (i * 6);
          const color = i % 2 === 0 ? "rgba(123, 97, 255," : "rgba(226, 179, 239,";
          
          return (
            <motion.div
              key={`nebula-${i}`}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${top}%`,
                background: `radial-gradient(circle, ${color}${opacity}) 0%, ${color}0) 70%)`,
                filter: `blur(${40 + (i * 8)}px)`,
              }}
              animate={{
                x: [0, (i * 20 - 50)],
                y: [0, (i * 20 - 50)],
                opacity: [opacity, opacity * 1.5, opacity]
              }}
              transition={{
                duration: duration,
                delay: i * 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      {/* Main content with 3D perspective */}
      <motion.div 
        className="flex flex-col items-center justify-center min-h-screen relative top-40 font-mono gap-7 z-10"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, z: -50 }}
          animate={{ scale: 1, opacity: 1, z: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative"
          style={{
            transformStyle: "preserve-3d"
          }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/30 to-indigo-500/30 blur-md -z-10 animate-pulse" />
          <motion.div
            animate={{
              rotateY: [0, 15, 0],
              rotateX: [0, -10, 0]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            <Image 
              src="/profile.jpg" 
              width={150} 
              height={150} 
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-[#d33ee4a2] object-cover shadow-lg"
              alt="Firaol Ayana"
              priority
            />
          </motion.div>
          <motion.div 
            className="absolute -inset-4 rounded-full border-2 border-purple-500/30 pointer-events-none"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        <motion.div 
          className="flex flex-col items-center justify-center gap-3 text-center"
          initial={{ opacity: 0, y: 20, z: -50 }}
          animate={{ opacity: 1, y: 0, z: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          style={{
            transformStyle: "preserve-3d"
          }}
        >
          <h1 className="text-3xl sm:text-4xl font-semibold bg-gradient-to-r from-purple-200 to-indigo-200 bg-clip-text text-transparent">
            Firaol Ayana
          </h1>
          <p className="text-white/80 text-sm sm:text-base">
            Fullstack Developer & Creative Problem Solver
          </p>
        </motion.div>

        <motion.div 
          className="flex gap-4 font-sans"
          initial={{ opacity: 0, y: 20, z: -50 }}
          animate={{ opacity: 1, y: 0, z: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          style={{
            transformStyle: "preserve-3d"
          }}
        >
          <motion.button 
            className="relative overflow-hidden group bg-gradient-to-br from-[#78219ba0] to-[#a400e094] text-white font-medium w-32 py-2 rounded-xl shadow-lg hover:shadow-purple-700/50 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Hire Me</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full" />
          </motion.button>

          <motion.button 
            className="relative overflow-hidden group bg-white/10 text-white font-medium w-32 py-2 rounded-xl shadow-md hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Resume</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Interactive scroll indicator */}
      <motion.div 
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        style={{
          rotateX,
          rotateY
        }}
      >
        <motion.span 
          className="text-sm mb-2 font-mono text-white/70 tracking-wider"
          animate={{
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Scroll Down
        </motion.span>
        <motion.div
          animate={{ 
            y: [0, 10, 0],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          <svg
            className="w-6 h-6 text-white/80"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Add triangle shape for particles */}
      <style jsx>{`
        .triangle {
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 10px solid var(--color);
          background: transparent !important;
        }
      `}</style>
    </motion.div>
  );
};

export default Hero;