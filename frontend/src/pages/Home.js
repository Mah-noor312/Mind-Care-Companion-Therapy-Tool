import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import ReviewsSection from "../components/ReviewsSection.js";
import Card from "../components/Card.js";
import { useNavigate } from "react-router-dom";
import HeroImage from "../assets/Card.png";
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
      url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%236F4F28' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: -1;
    transition: all 0.3s ease;
  }

  body.dark::before {
    background: 
      url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23e0e0e0' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
  }
  
  .card-img img {
    transition: transform 0.5s ease, filter 0.5s ease;
    filter: brightness(0.9);
  }
  
  .card-img:hover img {
    transform: scale(1.1);
    filter: brightness(1);
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

  /* Unique animations */
  @keyframes morph {
    0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
    33% { transform: translateY(-20px) rotate(120deg) scale(1.1); }
    66% { transform: translateY(10px) rotate(240deg) scale(0.9); }
  }

  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(111, 79, 40, 0.3); }
    50% { box-shadow: 0 0 40px rgba(111, 79, 40, 0.6); }
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

  .pulse-glow {
    animation: pulse-glow 4s ease-in-out infinite;
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

// Light mode colors
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

// Card Data
const cardData = [
  {
    title: "Emotional Support",
    description: "Talk with our friendly AI chatbot to share your feelings and get immediate emotional support.",
    imgSrc: "https://img.freepik.com/premium-vector/mental-health-awareness-with-meditation-background_659844-391.jpg",
    route: "/live-chat",
    icon: "💬",
    lightColor: "from-purple-100 to-blue-100",
    darkColor: "from-gray-800 to-gray-700"
  },
  {
    title: "Mood Tracking",
    description: "Track your emotional patterns and gain insights into your mental wellbeing over time.",
    imgSrc: "https://img.freepik.com/free-vector/mental-health-concept-illustration_114360-1316.jpg",
    route: "/signin",
    icon: "📊",
    lightColor: "from-amber-100 to-orange-100",
    darkColor: "from-gray-800 to-gray-700"
  },
  {
    title: "Emergency Helplines",
    description: "Immediate connection with professional support when you need it most.",
    imgSrc: "https://img.freepik.com/free-vector/mental-health-awareness-concept_23-2148736631.jpg",
    route: "/helplines",
    icon: "🆘",
    lightColor: "from-green-100 to-teal-100",
    darkColor: "from-gray-800 to-gray-700"
  },
];

// Animation Variants
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

// Feature Items from your old code
const featureItems = [
  { 
    icon: "🤖", 
    title: "Emotionally Aware AI", 
    text: "Understands tone, patterns, and provides compassionate replies.",
    link: "/emotionally-aware-ai"
  },
  { 
    icon: "🕒", 
    title: "24/7 Support", 
    text: "Be it 2 AM anxiety or mid-day stress — MindCare is always listening.",
    link: "/24-7-support"
  },
  { 
    icon: "🧘", 
    title: "Tools for Real Healing", 
    text: "Includes guided breathing, journaling, and personalized exercises.",
    link: "/healing-tools"
  },
  { 
    icon: "🔒", 
    title: "Privacy First", 
    text: "Your thoughts stay between you and your digital confidant.",
    link: "/privacy"
  }
];

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

const Home = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

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

  return (
    <div className="font-[Poppins] min-h-screen flex flex-col overflow-hidden" style={{ 
      color: currentColors.text
    }}>
      <GlobalStyles />
      
      {/* Floating Background Elements */}
      <FloatingShape top={20} left={10} size={80} delay={0} color1={currentColors.primary} color2={currentColors.secondary} />
      <FloatingShape top={70} left={85} size={100} delay={4} color1={currentColors.primaryLight} color2={currentColors.accent} />
      <FloatingShape top={40} left={80} size={60} delay={8} color1={currentColors.secondary} color2={currentColors.accent} />
      <FloatingShape top={80} left={15} size={90} delay={2} color1={currentColors.primaryDark} color2={currentColors.primaryLight} />
      
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 rounded-full pulse-glow" 
                 style={{ background: `radial-gradient(circle, ${currentColors.primary}15, transparent 70%)` }} />
            <div className="absolute top-1/3 left-1/4 w-48 sm:w-64 h-48 sm:h-64 morphing-element" 
                 style={{ background: `linear-gradient(45deg, ${currentColors.accent}20, ${currentColors.primary}10)`, filter: 'blur(40px)' }} />
            <div className="absolute bottom-1/3 right-1/4 w-56 sm:w-80 h-56 sm:h-80 morphing-element" 
                 style={{ background: `linear-gradient(45deg, ${currentColors.primary}10, ${currentColors.accent}20)`, filter: 'blur(50px)' }} />
          </div>

          <div className="text-center relative z-10 max-w-4xl mx-auto w-full">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold mb-4 sm:mb-6 tracking-tight">
                <span className="block text-shine">Mind Care</span>
              </h1>
              <div className="w-24 sm:w-32 h-1 mx-auto mb-4 sm:mb-6 rounded-full" style={{ background: currentColors.gradient }} />
            </motion.div>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl sm:text-2xl md:text-3xl font-light mb-4 sm:mb-6 leading-relaxed px-4"
              style={{ color: currentColors.primaryDark }}
            >
              Your journey to <span className="italic font-medium">mental wellness</span> begins here
            </motion.p>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4"
              style={{ color: currentColors.mutedText }}
            >
              Experience compassionate AI support that understands your emotions and guides you towards healing, available 24/7 whenever you need it.
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/signin")}
                className="px-8 sm:px-12 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg relative overflow-hidden group w-full sm:w-auto"
                style={{ 
                  background: `linear-gradient(135deg, ${currentColors.primary}, ${currentColors.primaryLight})`,
                  color: darkMode ? currentColors.background : 'white'
                }}
              >
                <span className="relative z-10">Start Healing Journey</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/about")}
                className="px-8 sm:px-12 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg border-2 w-full sm:w-auto transition-colors duration-300"
                style={{ 
                  borderColor: currentColors.primary,
                  color: currentColors.primary,
                  background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'rgba(255, 255, 255, 0.8)'
                }}
              >
                Learn More
              </motion.button>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-6 h-10 border-2 rounded-full flex justify-center"
                style={{ borderColor: currentColors.primary }}
              >
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1 h-3 rounded-full mt-2"
                  style={{ background: currentColors.primary }}
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Why MindCare is Different Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center px-4 sm:px-8 md:px-16 lg:px-32 mt-16 mb-20 relative"
        >
          {/* Background elements */}
          <div className="absolute top-1/2 left-0 w-60 h-60 rounded-full" style={{ background: `radial-gradient(circle, ${currentColors.accent}15, transparent 70%)`, filter: 'blur(30px)' }}></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full" style={{ background: `radial-gradient(circle, ${currentColors.secondary}10, transparent 70%)`, filter: 'blur(35px)' }}></div>
          
          <motion.h3 
            variants={itemVariants}
            className="text-3xl font-bold mb-12 relative inline-block"
            style={{ color: currentColors.primary }}
          >
            Why MindCare is Different
            <span className="absolute bottom-0 left-0 w-full h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" style={{ background: `linear-gradient(90deg, ${currentColors.primary}, ${currentColors.primaryLight})` }}></span>
          </motion.h3>
          
          <motion.div 
            variants={containerVariants}
            className="mt-6 grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10"
          >
            {featureItems.map((item, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border transition-colors duration-300"
                style={{ 
                  background: currentColors.cardBackground,
                  borderColor: currentColors.cardBorder
                }}
                onClick={() => navigate(item.link)}
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h4 className="font-bold text-lg mb-2" style={{ color: currentColors.primaryDark }}>{item.title}</h4>
                <p className="text-sm md:text-base" style={{ color: currentColors.mutedText }}>{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Services Section - Asymmetric Layout */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, margin: "-50px" }}
          className="py-16 sm:py-20 relative overflow-hidden"
        >
          <div className="container mx-auto px-4 sm:px-6 w-full">
            <motion.h2 
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 px-4"
              style={{ color: currentColors.primary }}
            >
              How We Can Help
            </motion.h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {cardData.map((card, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -10, rotate: index % 2 === 0 ? -1 : 1 }}
                  className={`relative group cursor-pointer ${
                    index === 1 ? 'lg:transform lg:translate-y-8' : ''
                  }`}
                  onClick={() => navigate(card.route)}
                >
                  {/* Background Shape */}
                  <div 
                    className={`absolute inset-0 rounded-3xl transform transition-transform duration-500 group-hover:scale-105 ${
                      darkMode ? card.darkColor : card.lightColor
                    } rotate-3`} 
                  />
                  
                  {/* Card Content */}
                  <div 
                    className="relative rounded-3xl p-6 sm:p-8 shadow-xl border h-full transform transition-all duration-500 group-hover:shadow-2xl"
                    style={{ 
                      background: currentColors.cardBackground,
                      borderColor: currentColors.cardBorder
                    }}
                  >
                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {card.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4" style={{ color: currentColors.primary }}>
                      {card.title}
                    </h3>
                    <p className="mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base" style={{ color: currentColors.mutedText }}>
                      {card.description}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-3 rounded-xl font-semibold transition-all duration-300 group-hover:shadow-lg text-sm sm:text-base"
                      style={{ 
                        background: `linear-gradient(135deg, ${currentColors.primary}, ${currentColors.primaryLight})`,
                        color: darkMode ? currentColors.background : 'white'
                      }}
                    >
                      Explore Service
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-16 sm:py-20 relative"
          style={{ 
            background: darkMode 
              ? 'linear-gradient(135deg, #1a1a1a, #2a2a2a)' 
              : `linear-gradient(135deg, ${lightColors.primary}05, ${lightColors.accent}10)`
          }}
        >
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {[
                { number: "10K+", label: "Users Helped" },
                { number: "24/7", label: "Availability" },
                { number: "98%", label: "Satisfaction Rate" },
                { number: "50+", label: "Countries" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-4 sm:p-6 rounded-2xl border"
                  style={{ 
                    background: currentColors.cardBackground,
                    borderColor: currentColors.cardBorder
                  }}
                >
                  <div className="text-2xl sm:text-3xl font-bold mb-2 text-shine">{stat.number}</div>
                  <div className="text-sm sm:text-base font-medium" style={{ color: currentColors.primaryDark }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Final CTA Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="min-h-80 flex items-center justify-center py-16 sm:py-20 relative overflow-hidden"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b to-transparent"
              style={{ 
                background: `linear-gradient(to bottom, ${currentColors.background}, transparent)`
              }}
            />
            <div 
              className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t to-transparent"
              style={{ 
                background: `linear-gradient(to top, ${currentColors.background}, transparent)`
              }}
            />
            <div className="absolute inset-0 opacity-5">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 sm:w-4 sm:h-4 rounded-full"
                  style={{
                    background: currentColors.primary,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="text-center relative z-10 max-w-2xl mx-auto px-4 sm:px-6 w-full">
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8"
              style={{ color: currentColors.primary }}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              Ready to Begin Your Healing Journey?
            </motion.h2>
            
            <motion.p 
              className="text-lg sm:text-xl mb-8 sm:mb-12 leading-relaxed"
              style={{ color: currentColors.mutedText }}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Join thousands who have found peace and support through MindCare's compassionate AI technology. 
              Take the first step towards better mental health today.
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/signin")}
                className="px-8 sm:px-16 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg relative overflow-hidden group pulse-glow w-full sm:w-auto"
                style={{ 
                  background: `linear-gradient(135deg, ${currentColors.primary}, ${currentColors.primaryLight})`,
                  color: darkMode ? currentColors.background : 'white'
                }}
              >
                <span className="relative z-10">Get Started Free</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/live-chat")}
                className="px-8 sm:px-12 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg border-2 w-full sm:w-auto transition-colors duration-300"
                style={{ 
                  borderColor: currentColors.primary,
                  color: currentColors.primary,
                  background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'rgba(255, 255, 255, 0.8)'
                }}
              >
                Watch Demo
              </motion.button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-sm mt-6 sm:mt-8"
              style={{ color: currentColors.mutedText }}
            >
              No credit card required • Free forever plan • 5-minute setup
            </motion.p>
          </div>
        </motion.section>

        {/* Reviews Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-16 sm:py-20 relative"
        >
          <ReviewsSection />
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;