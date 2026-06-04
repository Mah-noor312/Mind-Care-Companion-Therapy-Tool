import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { db } from "../firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { motion } from "framer-motion";
import { createGlobalStyle } from "styled-components";

// Global styles using styled-components
const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    overflow-x: hidden;
    background: 
      radial-gradient(ellipse at top left, rgba(111, 79, 40, 0.1) 0%, transparent 50%),
      radial-gradient(ellipse at top right, rgba(139, 108, 66, 0.08) 0%, transparent 50%),
      radial-gradient(ellipse at bottom left, rgba(166, 133, 92, 0.06) 0%, transparent 50%),
      radial-gradient(ellipse at bottom right, rgba(193, 158, 118, 0.04) 0%, transparent 50%),
      linear-gradient(135deg, #fefaf6 0%, #f9f2ea 50%, #f5e9dd 100%);
    background-attachment: fixed;
    position: relative;
    font-family: 'Poppins', sans-serif;
    color: #5A3E21;
    transition: all 0.3s ease;
  }

  body.dark {
    background: 
      radial-gradient(ellipse at top left, rgba(30, 30, 30, 0.3) 0%, transparent 50%),
      radial-gradient(ellipse at top right, rgba(50, 50, 50, 0.2) 0%, transparent 50%),
      radial-gradient(ellipse at bottom left, rgba(70, 70, 70, 0.15) 0%, transparent 50%),
      radial-gradient(ellipse at bottom right, rgba(90, 90, 90, 0.1) 0%, transparent 50%),
      linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a2a 100%);
    color: #e0e0e0;
  }

  body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24-5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%236F4F28' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: -1;
    transition: all 0.3s ease;
  }

  body.dark::before {
    background: 
      url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24-5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23e0e0e0' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #f5e9dd;
    transition: all 0.3s ease;
  }
  body.dark ::-webkit-scrollbar-track {
    background: #1a1a1a;
  }
  ::-webkit-scrollbar-thumb {
    background: #6F4F28;
    border-radius: 10px;
    transition: all 0.3s ease;
  }
  body.dark ::-webkit-scrollbar-thumb {
    background: #404040;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #5A3E21;
  }
  body.dark ::-webkit-scrollbar-thumb:hover {
    background: #505050;
  }

  /* Animations */
  @keyframes morph {
    0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
    33% { transform: translateY(-20px) rotate(120deg) scale(1.1); }
    66% { transform: translateY(10px) rotate(240deg) scale(0.9); }
  }

  @keyframes textShine {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  }

  .morphing-element {
    animation: morph 8s ease-in-out infinite;
  }

  .floating-3d {
    animation: float 12s ease-in-out infinite;
  }

  .text-shine {
    background: linear-gradient(90deg, #6F4F28, #8B6A42, #A68863, #8B6A42, #6F4F28);
    background-size: 200% auto;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: textShine 3s linear infinite;
  }

  body.dark .text-shine {
    background: linear-gradient(90deg, #e0e0e0, #a0a0a0, #808080, #a0a0a0, #e0e0e0);
    background-size: 200% auto;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: textShine 3s linear infinite;
  }
`;

// Light mode colors (your original palette)
const lightColors = {
  primary: "#6F4F28",
  primaryLight: "#8B6A42",
  primaryDark: "#5A3E21",
  secondary: "#A68863",
  accent: "#D4B896",
  background: "#fefaf6",
  text: "#5A3E21",
  cardBackground: "#ffffff",
  cardBorder: "#e5e5e5",
  mutedText: "#666666",
  gradient: "linear-gradient(135deg, #6F4F28 0%, #8B6A42 25%, #A68863 50%, #C19E76 75%, #D4B896 100%)"
};

// Dark mode colors
const darkColors = {
  primary: "#e0e0e0",
  primaryLight: "#a0a0a0",
  primaryDark: "#c0c0c0",
  secondary: "#808080",
  accent: "#404040",
  background: "#0a0a0a",
  text: "#e0e0e0",
  cardBackground: "#1a1a1a",
  cardBorder: "#333333",
  mutedText: "#b0b0b0",
  gradient: "linear-gradient(135deg, #e0e0e0 0%, #a0a0a0 25%, #808080 50%, #606060 75%, #404040 100%)"
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const FloatingShape = ({ top, left, size, delay, color1, color2 }) => (
  <div 
    className="morphing-element floating-3d fixed pointer-events-none"
    style={{
      top: `${top}%`,
      left: `${left}%`,
      width: `${size}px`,
      height: `${size}px`,
      background: `linear-gradient(45deg, ${color1}, ${color2})`,
      opacity: 0.1,
      animationDelay: `${delay}s`,
      zIndex: -1
    }}
  />
);

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // Default to light mode

  useEffect(() => {
    // Check for saved theme preference or prefer OS theme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.body.classList.add('dark');
    } else {
      setDarkMode(false);
      document.body.classList.remove('dark');
    }

    // Listen for theme changes
    const handleStorageChange = () => {
      const currentTheme = localStorage.getItem('theme');
      if (currentTheme === 'dark') {
        setDarkMode(true);
        document.body.classList.add('dark');
      } else {
        setDarkMode(false);
        document.body.classList.remove('dark');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check periodically (in case of same-tab changes)
    const interval = setInterval(() => {
      const currentTheme = localStorage.getItem('theme');
      if ((currentTheme === 'dark') !== darkMode) {
        handleStorageChange();
      }
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [darkMode]);

  const currentColors = darkMode ? darkColors : lightColors;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      // ✅ Save to Firestore
      await addDoc(collection(db, "messages"), {
        ...form,
        createdAt: serverTimestamp(),
      });

      // ✅ Try backend request (ignore if it fails or not JSON)
      try {
        const response = await fetch("http://localhost:5000/send-message", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        const text = await response.text();
        try {
          const result = JSON.parse(text);
          if (!response.ok) {
            console.warn("⚠️ Backend error:", result.msg);
          }
        } catch {
          console.warn("⚠️ Backend did not return JSON:", text);
        }
      } catch (err) {
        console.warn("⚠️ Could not reach backend:", err.message);
      }

      // ✅ Always show success if Firestore worked
      setSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      console.error("❌ Firestore error:", err);
      setError(err.message || "Failed to save message. Please try again.");
    }

    setLoading(false);
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Our Location",
      details: ["H9/4 Islamabad PAK", "Kabul AFG"],
      lightGradient: "from-purple-100 to-blue-100",
      darkGradient: "from-gray-800 to-gray-700"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Phone Number",
      details: ["+92 (31) 49799254"],
      lightGradient: "from-amber-100 to-orange-100",
      darkGradient: "from-gray-800 to-gray-700"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email Address",
      details: ["mindcarecompanion@gmail.com"],
      lightGradient: "from-green-100 to-teal-100",
      darkGradient: "from-gray-800 to-gray-700"
    }
  ];

  return (
    <div className="font-[Poppins] min-h-screen flex flex-col overflow-hidden" style={{ 
      color: currentColors.text
    }}>
      <GlobalStyles />
      
      {/* Floating Background Elements */}
      <FloatingShape top={10} left={5} size={70} delay={0} color1={currentColors.primary} color2={currentColors.secondary} />
      <FloatingShape top={80} left={90} size={90} delay={4} color1={currentColors.primaryLight} color2={currentColors.accent} />
      <FloatingShape top={40} left={85} size={50} delay={8} color1={currentColors.secondary} color2={currentColors.accent} />
      <FloatingShape top={75} left={8} size={80} delay={2} color1={currentColors.primaryDark} color2={currentColors.primaryLight} />
      
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden py-12">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 rounded-full" 
                 style={{ background: `radial-gradient(circle, ${currentColors.primary}15, transparent 70%)` }} />
            <div className="absolute top-1/3 left-1/4 w-48 sm:w-64 h-48 sm:h-64 morphing-element" 
                 style={{ background: `linear-gradient(45deg, ${currentColors.accent}20, ${currentColors.primary}10)`, filter: 'blur(40px)' }} />
          </div>

          <div className="text-center relative z-10 max-w-4xl mx-auto w-full">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 tracking-tight">
                <span className="block text-shine">Get In Touch</span>
              </h1>
              <div className="w-24 sm:w-32 h-1 mx-auto mb-4 sm:mb-6 rounded-full" style={{ background: currentColors.gradient }} />
            </motion.div>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl font-light mb-4 sm:mb-6 leading-relaxed px-4 max-w-3xl mx-auto"
              style={{ color: currentColors.primaryDark }}
            >
              We're here to support your mental wellness journey
            </motion.p>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-base sm:text-lg max-w-3xl mx-auto leading-relaxed px-4"
              style={{ color: currentColors.mutedText }}
            >
              We're open for any suggestion or just to have a chat. Let's create something amazing together for your mental wellbeing.
            </motion.p>
          </div>
        </section>

        {/* Contact Content */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, margin: "-50px" }}
          className="py-12 sm:py-16 relative"
        >
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
              {/* Contact Information */}
              <motion.div variants={itemVariants} className="space-y-8">
                <div 
                  className="rounded-3xl p-6 sm:p-8 shadow-xl border transform transition-all duration-500 hover:shadow-2xl"
                  style={{ 
                    background: currentColors.cardBackground,
                    borderColor: currentColors.cardBorder
                  }}
                >
                  <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-shine">
                    Let's Connect
                  </h2>

                  <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                      <motion.div 
                        key={index}
                        whileHover={{ x: 5 }}
                        className="flex items-start space-x-4 group cursor-pointer"
                      >
                        <div 
                          className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 ${
                            darkMode ? info.darkGradient : info.lightGradient
                          }`}
                          style={{ color: currentColors.primary }}
                        >
                          {info.icon}
                        </div>
                        <div>
                          <h3 
                            className="font-semibold text-lg"
                            style={{ color: currentColors.primaryDark }}
                          >
                            {info.title}
                          </h3>
                          {info.details.map((detail, idx) => (
                            <p 
                              key={idx}
                              style={{ color: currentColors.mutedText }}
                            >
                              {detail}
                            </p>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Response Time Card */}
                <motion.div 
                  variants={itemVariants}
                  className="rounded-3xl p-6 sm:p-8 transform transition-all duration-500 hover:shadow-2xl"
                  style={{ background: currentColors.gradient, color: darkMode ? currentColors.background : 'white' }}
                >
                  <h3 className="text-xl font-bold mb-3">Response Time</h3>
                  <p className="opacity-90 text-sm sm:text-base">
                    We typically respond to all messages within 24 hours during business days. 
                    Your mental wellness is our priority.
                  </p>
                </motion.div>
              </motion.div>

              {/* Contact Form */}
              <motion.div variants={itemVariants} className="w-full">
                <div 
                  className="rounded-3xl p-6 sm:p-8 shadow-xl border transform transition-all duration-500 hover:shadow-2xl"
                  style={{ 
                    background: currentColors.cardBackground,
                    borderColor: currentColors.cardBorder
                  }}
                >
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="px-4 py-3 rounded-xl mb-6 flex items-center border"
                      style={{ 
                        background: darkMode ? '#2a1a1a' : '#fef2f2',
                        borderColor: darkMode ? '#5c2a2a' : '#fecaca',
                        color: darkMode ? '#fca5a5' : '#dc2626'
                      }}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {error}
                    </motion.div>
                  )}
                  {success && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="px-4 py-3 rounded-xl mb-6 flex items-center border"
                      style={{ 
                        background: darkMode ? '#1a2a1a' : '#f0fdf4',
                        borderColor: darkMode ? '#2a5c2a' : '#bbf7d0',
                        color: darkMode ? '#86efac' : '#16a34a'
                      }}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Message sent successfully! We'll reply soon.
                    </motion.div>
                  )}

                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label 
                          className="text-sm font-medium"
                          style={{ color: currentColors.mutedText }}
                        >
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          disabled={loading}
                          className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all duration-300 disabled:opacity-50"
                          style={{ 
                            background: currentColors.cardBackground,
                            borderColor: currentColors.cardBorder,
                            color: currentColors.text
                          }}
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label 
                          className="text-sm font-medium"
                          style={{ color: currentColors.mutedText }}
                        >
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          disabled={loading}
                          className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all duration-300 disabled:opacity-50"
                          style={{ 
                            background: currentColors.cardBackground,
                            borderColor: currentColors.cardBorder,
                            color: currentColors.text
                          }}
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label 
                        className="text-sm font-medium"
                        style={{ color: currentColors.mutedText }}
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all duration-300 disabled:opacity-50"
                        style={{ 
                          background: currentColors.cardBackground,
                          borderColor: currentColors.cardBorder,
                          color: currentColors.text
                        }}
                        placeholder="What's this about?"
                      />
                    </div>

                    <div className="space-y-2">
                      <label 
                        className="text-sm font-medium"
                        style={{ color: currentColors.mutedText }}
                      >
                        Message *
                      </label>
                      <textarea
                        name="message"
                        rows="6"
                        value={form.message}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all duration-300 resize-none disabled:opacity-50"
                        style={{ 
                          background: currentColors.cardBackground,
                          borderColor: currentColors.cardBorder,
                          color: currentColors.text
                        }}
                        placeholder="Tell us about your inquiry or how we can support your mental wellness journey..."
                      ></textarea>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2 relative overflow-hidden group"
                      style={{ 
                        background: `linear-gradient(135deg, ${currentColors.primary}, ${currentColors.primaryLight})`,
                        color: darkMode ? currentColors.background : 'white'
                      }}
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                          <span>Send Message</span>
                        </>
                      )}
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Additional Info Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-12 sm:py-16 relative"
          style={{ 
            background: darkMode 
              ? 'linear-gradient(135deg, #1a1a1a, #2a2a2a)' 
              : `linear-gradient(135deg, ${lightColors.primary}05, ${lightColors.accent}10)`
          }}
        >
          {/* You can add additional content here if needed */}
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;