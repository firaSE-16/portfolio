"use client"
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

const services = [
  {
    title: "SaaS Development",
    description: "Build scalable, cloud-based software solutions with subscription models, multi-tenancy, and seamless integrations.",
    coverImage: "/saas.jpg",
    icon: "☁️",
    color: "from-cyan-500 to-blue-500"
  },
  {
    title: "Mobile App Development",
    description: "Create cross-platform mobile applications with Flutter or native solutions for iOS and Android with premium UX.",
    coverImage: "/mobile.jpg",
    icon: "📱",
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Software Architecture",
    description: "Design robust system architectures with microservices, clean code principles, and scalable infrastructure planning.",
    coverImage: "/software.jpg",
    icon: "🏛️",
    color: "from-amber-500 to-orange-500"
  },
  {
    title: "Frontend Development",
    description: "Craft beautiful, responsive interfaces with React, Next.js and modern CSS frameworks for optimal user experience.",
    coverImage: "/front.jpg",
    icon: "🎨",
    color: "from-emerald-500 to-teal-500"
  },
  {
    title: "Backend Development",
    description: "Develop high-performance APIs and server logic with Node.js, databases, caching, and security best practices.",
    coverImage: "/backend.png",
    icon: "⚙️",
    color: "from-violet-500 to-indigo-500"
  }
];

const ServiceCard = ({ service, isActive, onClick }: { service: typeof services[0]; isActive: boolean; onClick: () => void }) => {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl border border-white/10 shadow-xl cursor-pointer ${isActive ? 'ring-2 ring-white/30' : ''}`}
      whileHover={{ y: -5 }}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative h-48 w-full">
        <Image
          src={service.coverImage}
          alt={service.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{service.icon}</span>
            <h3 className="text-xl font-bold text-white">{service.title}</h3>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-gradient-to-br from-[#1a0134] to-[#0a011a]">
              <p className="text-white/80">{service.description}</p>
              <button className="mt-4 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/90 hover:text-white transition-all">
                Learn More
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ServiceHighlight = ({ service }: { service: typeof services[0] }) => {
  return (
    <motion.div 
      className="relative rounded-3xl overflow-hidden h-96 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${service.color}`} />
      <div className="relative z-10 h-full flex flex-col justify-center p-12">
        <motion.div 
          className="mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-5xl mb-4">{service.icon}</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">{service.title}</h2>
        </motion.div>
        
        <motion.p 
          className="text-xl md:text-2xl text-white/90 max-w-2xl mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {service.description}
        </motion.p>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button className="px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-all flex items-center gap-2">
            Get Started
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute right-0 bottom-0 w-1/2 h-full"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Image
          src={service.coverImage}
          alt={service.title}
          fill
          className="object-cover object-left"
        />
      </motion.div>
    </motion.div>
  );
};

const Service = () => {
  const [selectedService, setSelectedService] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: false });

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#0a011a] to-[#1a0134] text-white px-4 py-12 md:px-8 lg:px-20">
      {/* Hero Section */}
      <motion.section 
        className="flex flex-col items-center mb-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300"
          whileHover={{ scale: 1.02 }}
        >
          My Services
        </motion.h1>
        
        <motion.p 
          className="text-center text-white/70 max-w-2xl mx-auto text-lg mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          I deliver comprehensive digital solutions tailored to your business needs, from concept to deployment.
        </motion.p>
      </motion.section>

      {/* Services Highlight */}
      <motion.section 
        className="mb-24 max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <ServiceHighlight service={services[selectedService]} />
      </motion.section>

      {/* All Services */}
      <motion.section 
        ref={ref}
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
          whileInView={{ scale: 1.05 }}
          viewport={{ once: true }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
            All Services
          </span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.title}
              service={service}
              isActive={selectedService === index}
              onClick={() => setSelectedService(index)}
            />
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="mt-24 max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-8 rounded-3xl border border-white/10 backdrop-blur-sm"
          whileHover={{ scale: 1.01 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to start your project?</h3>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Let's discuss how I can help bring your ideas to life with cutting-edge technology and exceptional user experiences.
          </p>
          <button className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all">
            Contact Me
          </button>
        </motion.div>
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

export default Service;