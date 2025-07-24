"use client"
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FiExternalLink, FiChevronDown, FiChevronUp, FiGithub } from "react-icons/fi";
import { FaReact, FaNodeJs, FaDatabase, FaTools } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiMongodb, SiPostgresql, SiDocker } from "react-icons/si";

const skills = [
  {
    category: "Frontend Development",
    icon: <FaReact className="text-blue-400" size={24} />,
    items: [
      { name: "React.js", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Flutter", level: 75 },
      { name: "Kotlin", level: 70 }
    ]
  },
  {
    category: "Backend Development",
    icon: <FaNodeJs className="text-green-500" size={24} />,
    items: [
      { name: "Node.js", level: 90 },
      { name: "Express.js", level: 85 },
      { name: "NestJS", level: 80 },
      { name: "RESTful APIs", level: 85 },
      { name: "GraphQL", level: 75 }
    ]
  },
  {
    category: "Database & ORM",
    icon: <FaDatabase className="text-purple-400" size={24} />,
    items: [
      { name: "MongoDB", level: 85 },
      { name: "PostgreSQL", level: 80 },
      { name: "Prisma ORM", level: 85 },
      { name: "Mongoose", level: 80 }
    ]
  },
  {
    category: "DevOps & Tools",
    icon: <FaTools className="text-yellow-400" size={24} />,
    items: [
      { name: "Docker", level: 80 },
      { name: "AWS", level: 75 },
      { name: "Git & GitHub", level: 90 },
      { name: "CI/CD", level: 80 },
      { name: "Agile Methodologies", level: 85 }
    ]
  }
];

const projects = [
  {
    title: "Medi-Connect",
    imgUrl: "/medi.png",
    description: "MediConnect is a scalable multi-hospital management system that streamlines coordination among hospitals, doctors, lab technicians, and administrative staff. It covers the full patient treatment flow — from registration and triage to prescriptions and lab results — with secure, role-based access. Built with React, Node.js, MongoDB, and Tailwind CSS, the system features dynamic dashboards, PDF export, and audit logging. Each user role experiences a customized interface, enabling efficient workflows and centralized control.",
    link: "https://medi-front.vercel.app/",
    github: "https://github.com/yourusername/medi-connect",
    tags: ["React", "Node.js", "MongoDB", "Healthcare"],
    features: [
      "Role-based access control",
      "Real-time updates",
      "PDF report generation",
      "Audit logging",
      "Responsive dashboards"
    ]
  },
  {
    title: "Zyntra AI SaaS",
    imgUrl: "/zyntra.png",
    description: "Zyntra AI is an advanced, all-in-one AI platform offering intelligent chat, image generation, video creation, music composition, coding assistance, and content writing. Powered by Next.js, PostgreSQL, Supabase, and Clerk, it delivers seamless performance and secure user management across features. With a modern UI built using ShadCN, Tailwind CSS, and Framer Motion, Zyntra ensures a responsive and visually engaging experience.",
    link: "https://zyntra-kj5m.vercel.app/",
    github: "https://github.com/yourusername/zyntra-ai",
    tags: ["Next.js", "AI", "PostgreSQL", "SaaS"],
    features: [
      "Multi-AI services integration",
      "Stripe payment processing",
      "User authentication",
      "Rate limiting",
      "Responsive design"
    ]
  },
  {
    title: "Pinggo Social Media",
    imgUrl: "/pinggo.png",
    description: "Pinggo is a modern, full-featured social media platform that supports real-time chat, story sharing, reels, and responsive search for a smooth user experience. Built with Next.js 15, PostgreSQL, Prisma, and Socket.IO, it delivers dynamic features like live updates, animations, and seamless user interactions. Authentication and user management are handled via Clerk, ensuring secure and personalized access.",
    link: "https://pinggo-t3jz.onrender.com/",
    github: "https://github.com/yourusername/pinggo",
    tags: ["Next.js", "Social", "PostgreSQL", "Realtime"],
    features: [
      "Real-time messaging",
      "Story sharing",
      "Infinite scroll",
      "Content recommendations",
      "Dark/light mode"
    ]
  },
  {
    title: "Spotify Clone",
    imgUrl: "/spotify.png",
    description: "Spotify Clone is a sleek music streaming web app that replicates the core features of Spotify, including playlists, music playback, and user libraries. Built with modern web technologies, it offers a responsive UI, real-time playback controls, and smooth navigation. Users can browse, play, and manage tracks while enjoying a clean and intuitive interface.",
    link: "https://spotify-clone-hw8q.vercel.app/",
    github: "https://github.com/yourusername/spotify-clone",
    tags: ["React", "Music", "API", "Clone"],
    features: [
      "Audio playback controls",
      "Playlist management",
      "User authentication",
      "Responsive design",
      "API integration"
    ]
  },
  {
    title: "Arada Hospital",
    imgUrl: "/arada.png",
    description: "Adrada Hospital Management System is a streamlined web-based application designed to manage hospital operations efficiently. It supports core functionalities such as patient registration, doctor assignment, medical records, and billing management. Built with modern technologies, the system ensures secure access, real-time updates, and role-based functionality.",
    link: "https://arada-front.onrender.com",
    github: "https://github.com/yourusername/arada-hospital",
    tags: ["React", "Healthcare", "Management"],
    features: [
      "Patient management",
      "Appointment scheduling",
      "Medical records",
      "Billing system",
      "Role-based access"
    ]
  },
  {
    title: "E-Commerce Platform",
    imgUrl: "/ecommerce.png",
    description: "A full-featured e-commerce platform with product listings, shopping cart, checkout process, and admin dashboard. Includes payment integration, user authentication, and inventory management. Built with Next.js for server-side rendering and optimized performance.",
    link: "#",
    github: "https://github.com/yourusername/ecommerce-platform",
    tags: ["Next.js", "E-commerce", "Payments"],
    features: [
      "Product catalog",
      "Shopping cart",
      "Checkout process",
      "Payment integration",
      "Admin dashboard"
    ]
  }
];

const SkillProgress = ({ name, level }: { name: string; level: number }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-white/90">{name}</span>
        <span className="text-xs text-white/70">{level}%</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </div>
    </div>
  );
};

const ProjectCard = ({ project, expanded, onClick }: { project: typeof projects[0]; expanded: boolean; onClick: () => void }) => {
  return (
    <motion.div 
      className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-[#1a0134]/80 to-[#0a011a]/80 backdrop-blur-sm shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-60 w-full overflow-hidden group">
        <Image
          src={project.imgUrl}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white">{project.title}</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tags.map(tag => (
              <span key={tag} className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/90 backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <div className="p-6">
              <p className="text-white/80 mb-4">{project.description}</p>
              
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-white/90 mb-2">Key Features:</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-purple-400 mr-2">✓</span>
                      <span className="text-sm text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/90 hover:text-white transition-all"
                >
                  <FiExternalLink className="mr-2" />
                  Live Demo
                </a>
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/90 hover:text-white transition-all"
                  >
                    <FiGithub className="mr-2" />
                    View Code
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <button 
        onClick={onClick}
        className="w-full py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white/90 hover:text-white transition-colors flex items-center justify-center group"
      >
        {expanded ? (
          <>
            <span className="group-hover:-translate-y-0.5 transition-transform">Show Less</span>
            <FiChevronUp className="ml-2 group-hover:-translate-y-0.5 transition-transform" />
          </>
        ) : (
          <>
            <span className="group-hover:-translate-y-0.5 transition-transform">Show More</span>
            <FiChevronDown className="ml-2 group-hover:-translate-y-0.5 transition-transform" />
          </>
        )}
      </button>
    </motion.div>
  );
};

const SkillCategory = ({ category, icon, items }: { category: string; icon: React.ReactNode; items: { name: string; level: number }[] }) => {
  return (
    <motion.div 
      className="bg-gradient-to-br from-[#1a0134]/80 to-[#0a011a]/80 rounded-xl border border-white/10 shadow-xl p-6 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-6">
        <div className="p-2 rounded-lg bg-white/5 border border-white/10 mr-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
          {category}
        </h3>
      </div>
      
      <div className="space-y-4">
        {items.map((item) => (
          <SkillProgress key={item.name} name={item.name} level={item.level} />
        ))}
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [visibleProjects, setVisibleProjects] = useState(3);
  
  const toggleProject = (index: number) => {
    setExpandedProject(expandedProject === index ? null : index);
  };
  
  const loadMoreProjects = () => {
    setVisibleProjects(prev => Math.min(prev + 3, projects.length));
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {projects.slice(0, visibleProjects).map((project, index) => (
          <ProjectCard 
            key={project.title}
            project={project}
            expanded={expandedProject === index}
            onClick={() => toggleProject(index)}
          />
        ))}
      </div>

      {visibleProjects < projects.length && (
        <div className="text-center">
          <motion.button
            onClick={loadMoreProjects}
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Load More Projects
            <FiChevronDown className="ml-2" />
          </motion.button>
        </div>
      )}
    </div>
  );
};

const Project = () => {
  const skillsRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="w-full min-h-max bg-gradient-to-br from-[#0a011a] to-[#1a0134] text-white px-4 py-12 md:px-8 lg:px-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating gradient circles */}
        <motion.div
          className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-purple-500/10 blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-pink-500/10 blur-[120px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-white/10"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              opacity: Math.random() * 0.3 + 0.1
            }}
            animate={{
              y: [null, (Math.random() - 0.5) * 40],
              x: [null, (Math.random() - 0.5) * 40],
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

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Title */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            My Skills & Projects
          </motion.h2>
          <motion.p 
            className="text-center text-white/70 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Here&apos;s a showcase of my technical expertise and the projects I&apos;ve built to demonstrate these skills in action.
          </motion.p>
        </motion.div>

        {/* Skills section */}
        <motion.div 
          className="mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            ref={skillsRef}
          >
            {skills.map((skill) => (
              <SkillCategory 
                key={skill.category}
                category={skill.category}
                icon={skill.icon}
                items={skill.items}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Projects section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.div className="mb-12">
            <motion.h3 
              className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Featured Projects
            </motion.h3>
            <motion.p 
              className="text-white/70 mb-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Here are some of my recent projects. Click on any project to see more details.
            </motion.p>
            
            <ProjectsSection />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Project;