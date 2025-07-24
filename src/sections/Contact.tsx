"use client"
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLinkedin, FiSend, FiPhone, FiMessageSquare } from "react-icons/fi";
import { FaTelegram } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/mrblpwvn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#0a011a] to-[#1a0134] text-white px-4 py-12 md:px-8 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300"
            whileHover={{ scale: 1.02 }}
          >
            Get In Touch
          </motion.h1>
          <motion.p 
            className="text-lg text-white/70 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Have a project in mind or want to collaborate? Reach out and let&apos;s create something amazing together.
          </motion.p>
        </motion.div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Side - Quote */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-gradient-to-br from-[#1a0134]/80 to-[#0a011a]/80 rounded-2xl border border-white/10 p-8 h-full backdrop-blur-sm">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <motion.h2 
                    className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.02 }}
                  >
                    Let&apos;s Connect
                  </motion.h2>
                  
                  <motion.blockquote 
                    className="text-xl md:text-2xl italic mb-8 text-white/90"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    &quot;Speed is the currency of business.&quot;
                    <footer className="mt-4 text-lg not-italic text-purple-300">—  Marc Benioff, CEO of Salesforce</footer>
                  </motion.blockquote>
                </div>

                {/* Contact Methods */}
                <div className="space-y-6 mt-8">
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-4"
                  >
                    <div className="p-3 rounded-lg bg-purple-500/20 border border-purple-500/30">
                      <FiMail className="text-purple-300 text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-white/70">Email me at</p>
                      <a 
                        href="mailto:loariftech@gmail.com" 
                        className="text-white hover:text-purple-300 transition-colors"
                      >
                        loariftech@gmail.com
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-4"
                  >
                    <div className="p-3 rounded-lg bg-blue-500/20 border border-blue-500/30">
                      <FiLinkedin className="text-blue-300 text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-white/70">Connect on</p>
                      <a 
                        href="https://www.linkedin.com/in/firaol-ayana-8aba05265" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-300 transition-colors"
                      >
                        LinkedIn
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-4"
                  >
                    <div className="p-3 rounded-lg bg-sky-500/20 border border-sky-500/30">
                      <FaTelegram className="text-sky-300 text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-white/70">Message me on</p>
                      <a 
                        href="https://t.me/loarif12" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-sky-300 transition-colors"
                      >
                        Telegram
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-4"
                  >
                    <div className="p-3 rounded-lg bg-green-500/20 border border-green-500/30">
                      <FiPhone className="text-green-300 text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-white/70">Call me at</p>
                      <a 
                        href="tel:+251909644116" 
                        className="text-white hover:text-green-300 transition-colors"
                      >
                        +251 909 644 116
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form 
              onSubmit={handleSubmit}
              className="bg-gradient-to-br from-[#1a0134]/80 to-[#0a011a]/80 rounded-2xl border border-white/10 p-8 backdrop-blur-sm"
            >
              <motion.h3 
                className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-300 bg-clip-text text-transparent"
                whileHover={{ scale: 1.02 }}
              >
                Send Me a Message
              </motion.h3>

              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                    placeholder="Hi Firaol, I'd like to talk about..."
                  />
                </div>

                <div className="pt-2">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                      isSubmitting
                        ? "bg-purple-500/50 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/30"
                    }`}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <FiSend />
                        Send Message
                      </>
                    )}
                  </motion.button>

                  {submitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-3 bg-green-500/10 border border-green-500/30 text-green-300 rounded-lg text-center"
                    >
                      Message sent successfully! I&apos;ll get back to you soon.
                    </motion.div>
                  )}
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Floating particles background */}
    
    </div>
  );
};

export default Contact;