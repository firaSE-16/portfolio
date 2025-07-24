"use client"
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Poppins } from "next/font/google";
import { poppins } from "@/app/page";

const hobbies = [
  {
    title: "I like Coding",
    image: "/coding.jpg",
    description: "Building things from scratch gives me a real sense of achievement",
    color: "bg-indigo-500"
  },
  {
    title: "I like playing sports",
    image: "/sport.jpg",
    description: "It keeps me active, focused, and refreshed",
    color: "bg-emerald-500"
  },
  {
    title: "I like going to church",
    image: "/church.jpg",
    description: "It gives me peace, purpose, and community",
    color: "bg-amber-500"
  },
  {
    title: "I like reading books",
    image: "/books.jpg",
    description: "It expands my thinking and inspires new ideas",
    color: "bg-rose-500"
  },
  {
    title: "I like listening to podcasts",
    image: "/podcast.jpg",
    description: "They help me learn while on the go and stay updated",
    color: "bg-violet-500"
  },
];

const education = [
  {
    id: 1,
    title: "OHBD CS Bootcamp (2020 – 2021)",
    icon: "💻",
    description: "Completed a one-year intensive program hosted by American Corner, focused on full-stack web development and an introduction to machine learning."
  },
  {
    id: 2,
    title: "Self-Taught Developer (2021 – 2024)",
    icon: "🧠",
    description: "Continued learning full-stack development independently through Udemy and YouTube, building various personal and collaborative projects."
  },
  {
    id: 3,
    title: "Software Engineering at AAU (2022 – Present)",
    icon: "🎓",
    description: "Currently a 4th-year Software Engineering student at Addis Ababa University, gaining strong academic knowledge alongside practical experience."
  }
];

const About = () => {
  const [currentHobbyIndex, setCurrentHobbyIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate hobbies
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentHobbyIndex((prev) => (prev + 1) % hobbies.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextHobby = () => {
    setIsAutoPlaying(false);
    setDirection(1);
    setCurrentHobbyIndex((prev) => (prev + 1) % hobbies.length);
  };

  const prevHobby = () => {
    setIsAutoPlaying(false);
    setDirection(-1);
    setCurrentHobbyIndex((prev) => (prev - 1 + hobbies.length) % hobbies.length);
  };

  // Intersection observer animations
  const [ref1, inView1] = useInView({ threshold: 0.1, triggerOnce: false });
  const [ref2, inView2] = useInView({ threshold: 0.1, triggerOnce: false });
  const [ref3, inView3] = useInView({ threshold: 0.1, triggerOnce: false });

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#0a011a] to-[#1a0134] text-white px-4 py-12 md:px-8 lg:px-20">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center mb-24"
      >
        <motion.h1 
          className="text-4xl md:text-7xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300"
          whileHover={{ scale: 1.02 }}
        >
          About Me
        </motion.h1>
        
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 w-full max-w-6xl">
          <motion.div 
            className="relative w-30 h-30 md:w-40 md:h-40 lg:w-60 lg:h-60 rounded-full overflow-hidden border-4 border-purple-300 shadow-lg shadow-purple-500/30"
            whileHover={{ scale: 1.05 }}
            initial={{ rotate: -5 }}
            animate={{ rotate: 5 }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "reverse", 
              duration: 8,
              ease: "easeInOut"
            }}
          >
            <Image 
              src='/profile2.jpg' 
              layout="fill" 
              objectFit="cover" 
              alt="Profile Image" 
              className="hover:scale-105 transition-transform duration-500 w-30 h-30"
            />
            <div className="absolute inset-0 bg-purple-500  opacity-10 transition-opacity duration-300"></div>
          </motion.div>
          
          <motion.div 
            className={`${poppins.className} max-w-xl bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-xl`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <p className="text-lg md:text-xl leading-relaxed">
              I'm a <span className="font-bold text-purple-300">Full-Stack Developer</span> (React, Next.js, Node.js) with strong software architecture skills. I build <span className="font-bold text-pink-300">fast, scalable, SEO-friendly</span> web apps with clean UI, solid backend, and <span className="font-bold text-cyan-300">real business impact</span>.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Education Section */}
      <motion.section 
        ref={ref1}
        className="mb-24 max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={inView1 ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
          whileInView={{ scale: 1.05 }}
          viewport={{ once: true }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            Education Journey
          </span>
        </motion.h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 h-full w-1 bg-gradient-to-b from-purple-500 to-pink-500 -translate-x-1/2"></div>
          
          <div className="space-y-12">
            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                className={`relative flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView1 ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                {/* Timeline dot */}
                <div className={`absolute left-4 md:left-1/2 w-6 h-6 rounded-full ${['bg-purple-400', 'bg-pink-400', 'bg-cyan-400'][index % 3]} -translate-x-1/2 z-10`}></div>
                
                <div className={`ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <motion.div 
                    className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{edu.icon}</span>
                      <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                        {edu.title}
                      </h3>
                    </div>
                    <p className="text-white/80">{edu.description}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Hobbies Section */}
      <motion.section 
        ref={ref2}
        className="mb-24 max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={inView2 ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
          whileInView={{ scale: 1.05 }}
          viewport={{ once: true }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">
            My Passions
          </span>
        </motion.h2>
        
        <div className="relative h-96 md:h-[32rem] w-full rounded-3xl overflow-hidden">
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={currentHobbyIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className={`absolute inset-0 ${hobbies[currentHobbyIndex].color} flex flex-col md:flex-row items-center justify-center p-8`}
            >
              <div className="md:w-1/2 flex justify-center">
                <motion.div 
                  className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.05 }}
                  initial={{ rotate: -5 }}
                  animate={{ rotate: 5 }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    duration: 10,
                    ease: "easeInOut"
                  }}
                >
                  <Image 
                    src={hobbies[currentHobbyIndex].image} 
                    layout="fill" 
                    objectFit="cover" 
                    alt={hobbies[currentHobbyIndex].title}
                  />
                </motion.div>
              </div>
              
              <div className="md:w-1/2 mt-8 md:mt-0 md:pl-12">
                <motion.h3 
                  className="text-3xl md:text-4xl font-bold mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {hobbies[currentHobbyIndex].title}
                </motion.h3>
                <motion.p 
                  className="text-xl md:text-2xl"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {hobbies[currentHobbyIndex].description}
                </motion.p>
                
                <div className="flex gap-2 mt-8">
                  {hobbies.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setDirection(index > currentHobbyIndex ? 1 : -1);
                        setCurrentHobbyIndex(index);
                        setIsAutoPlaying(false);
                      }}
                      className={`w-3 h-3 rounded-full transition-all ${index === currentHobbyIndex ? 'bg-white scale-125' : 'bg-white/50'}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <button 
            onClick={prevHobby}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/30 transition-all"
            whileHover={{ scale: 1.1 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={nextHobby}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/30 transition-all"
            whileHover={{ scale: 1.1 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </motion.section>

        
      {/* Floating particles background */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              width: Math.random() * 10 + 2,
              height: Math.random() * 10 + 2,
              opacity: Math.random() * 0.5 + 0.1
            }}
            animate={{
              y: [null, (Math.random() - 0.5) * 100],
              x: [null, (Math.random() - 0.5) * 100],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default About;