import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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

// Feature data
const features = [
  {
    icon: "🧠",
    title: "Holistic Wellness",
    description: "Our platform combines emotional tracking with wellness recommendations including meditation, breathing exercises, and sleep tips.",
    lightGradient: "linear-gradient(135deg, #6F4F28, #8B6A42)",
    darkGradient: "linear-gradient(135deg, #404040, #606060)",
    path: "/holistic-wellness"
  },
  {
    icon: "🤖",
    title: "AI Emotion Analysis",
    description: "Our advanced AI detects emotional patterns and provides personalized insights to help you understand your mental state better.",
    lightGradient: "linear-gradient(135deg, #8B6A42, #A68863)",
    darkGradient: "linear-gradient(135deg, #505050, #707070)",
    path: "/ai-emotion-analysis"
  },
  {
    icon: "🔒",
    title: "Privacy First",
    description: "Your conversations are encrypted and never stored permanently. We prioritize your confidentiality above all else.",
    lightGradient: "linear-gradient(135deg, #A68863, #C19E76)",
    darkGradient: "linear-gradient(135deg, #606060, #808080)",
    path: "/privacy-first"
  },
  {
    icon: "📈",
    title: "Progress Tracking",
    description: "Visualize your emotional journey with our mood charts and progress reports to celebrate your mental health milestones.",
    lightGradient: "linear-gradient(135deg, #C19E76, #D4B896)",
    darkGradient: "linear-gradient(135deg, #707070, #909090)",
    path: "/progress-tracking"
  },
  {
    icon: "👥",
    title: "Community Support",
    description: "Connect with others in our moderated support forums, or find professional help through our verified therapist network.",
    lightGradient: "linear-gradient(135deg, #5A3E21, #6F4F28)",
    darkGradient: "linear-gradient(135deg, #303030, #404040)",
    path: "/community-support"
  },
  {
    icon: "⚡",
    title: "Crisis Intervention",
    description: "Immediate access to crisis resources and emergency contacts when you need them most, available 24/7.",
    lightGradient: "linear-gradient(135deg, #8B4513, #A0522D)",
    darkGradient: "linear-gradient(135deg, #505050, #606060)",
    path: "/crisis-intervention"
  }
];

// Team members data
const teamMembers = [
  {
    name: "Dr. Sarah Johnson",
    role: "Clinical Psychologist",
    description: "Specializing in cognitive behavioral therapy with 15+ years of experience in mental health.",
    image: "👩‍⚕️",
    gradient: "linear-gradient(135deg, #6F4F28, #8B6A42)"
  },
  {
    name: "Michael Chen",
    role: "AI Research Lead",
    description: "PhD in Machine Learning with focus on natural language processing and emotional AI.",
    image: "👨‍💻",
    gradient: "linear-gradient(135deg, #8B6A42, #A68863)"
  },
  {
    name: "Dr. Emily Rodriguez",
    role: "Wellness Director",
    description: "Expert in mindfulness practices and holistic approaches to mental wellness.",
    image: "🧘‍♀️",
    gradient: "linear-gradient(135deg, #A68863, #C19E76)"
  },
  {
    name: "Alex Thompson",
    role: "Product Designer",
    description: "Creating intuitive and accessible user experiences for mental health applications.",
    image: "🎨",
    gradient: "linear-gradient(135deg, #C19E76, #D4B896)"
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

const About = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false); // Default to light mode (your original theme)

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
      <FloatingShape 
        top={15} left={8} size={70} delay={0} 
        color1={currentColors.primary} color2={currentColors.secondary}
      />
      <FloatingShape 
        top={75} left={88} size={90} delay={4} 
        color1={currentColors.primaryLight} color2={currentColors.accent}
      />
      <FloatingShape 
        top={35} left={82} size={50} delay={8} 
        color1={currentColors.secondary} color2={currentColors.accent}
      />
      <FloatingShape 
        top={85} left={12} size={80} delay={2} 
        color1={currentColors.primaryDark} color2={currentColors.primaryLight}
      />
      
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="min-h-[60vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden pt-24">
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
                <span className="block text-shine">About Mind Care</span>
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
              Your compassionate partner in mental well-being
            </motion.p>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-base sm:text-lg max-w-3xl mx-auto mb-8 leading-relaxed px-4"
              style={{ color: currentColors.mutedText }}
            >
              Mind Care Companion is your supportive partner in mental well-being. 
              Our AI-powered chatbot helps you express your emotions, track your mood,
              and connect to emergency resources when you need it most.
            </motion.p>
          </div>
        </section>

        {/* Mission Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, margin: "-50px" }}
          className="py-16 sm:py-20 relative"
        >
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <motion.div 
              variants={itemVariants}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-shine">
                Our Mission
              </h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-lg sm:text-xl leading-relaxed mb-6" style={{ color: currentColors.mutedText }}>
                  We believe everyone deserves easy access to mental health support— 
                  confidential, compassionate, and always here for you.
                </p>
                <p className="text-lg sm:text-xl leading-relaxed" style={{ color: currentColors.mutedText }}>
                  Through innovative technology and human-centered design, we're breaking down barriers 
                  to mental health care and creating a world where emotional well-being is accessible to all.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Features Grid */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, margin: "-50px" }}
          className="py-16 sm:py-20 relative"
        >
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
            <motion.h2 
              variants={itemVariants}
              className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 text-shine"
            >
              Why Choose MindCare?
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`relative group cursor-pointer ${
                    index % 2 === 0 ? 'lg:transform lg:translate-y-4' : ''
                  }`}
                  onClick={() => navigate(feature.path)}
                >
                  {/* Background Shape */}
                  <div 
                    className="absolute inset-0 rounded-3xl transform transition-transform duration-500 group-hover:scale-105 rotate-3"
                    style={{ 
                      background: darkMode ? feature.darkGradient : feature.lightGradient,
                      opacity: darkMode ? 0.3 : 0.2
                    }}
                  />
                  
                  {/* Card Content */}
                  <div 
                    className="relative rounded-3xl p-6 sm:p-8 shadow-xl h-full transform transition-all duration-500 group-hover:shadow-2xl border"
                    style={{ 
                      background: currentColors.cardBackground,
                      borderColor: currentColors.cardBorder
                    }}
                  >
                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 
                      className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4"
                      style={{ color: currentColors.primary }}
                    >
                      {feature.title}
                    </h3>
                    <p 
                      className="leading-relaxed text-sm sm:text-base"
                      style={{ color: currentColors.mutedText }}
                    >
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, margin: "-50px" }}
          className="py-16 sm:py-20 relative"
          style={{ 
            background: darkMode 
              ? 'linear-gradient(135deg, #1a1a1a, #2a2a2a)' 
              : `linear-gradient(135deg, ${lightColors.primary}05, ${lightColors.accent}10)`
          }}
        >
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
            <motion.h2 
              variants={itemVariants}
              className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 text-shine"
            >
              Meet Our Team
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="relative group cursor-pointer"
                >
                  {/* Background Shape */}
                  <div 
                    className="absolute inset-0 rounded-3xl transform transition-transform duration-500 group-hover:scale-105 rotate-3"
                    style={{ 
                      background: member.gradient,
                      opacity: darkMode ? 0.3 : 0.2
                    }}
                  />
                  
                  {/* Card Content */}
                  <div 
                    className="relative rounded-3xl p-6 sm:p-8 shadow-xl h-full transform transition-all duration-500 group-hover:shadow-2xl border flex flex-col items-center text-center"
                    style={{ 
                      background: currentColors.cardBackground,
                      borderColor: currentColors.cardBorder
                    }}
                  >
                    <div 
                      className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300"
                    >
                      {member.image}
                    </div>
                    <h3 
                      className="text-xl sm:text-2xl font-bold mb-2"
                      style={{ color: currentColors.primary }}
                    >
                      {member.name}
                    </h3>
                    <div 
                      className="text-sm sm:text-base font-medium mb-3 px-3 py-1 rounded-full"
                      style={{ 
                        background: darkMode 
                          ? 'rgba(255, 255, 255, 0.1)' 
                          : 'rgba(111, 79, 40, 0.1)',
                        color: currentColors.primary
                      }}
                    >
                      {member.role}
                    </div>
                    <p 
                      className="leading-relaxed text-sm sm:text-base mt-2"
                      style={{ color: currentColors.mutedText }}
                    >
                      {member.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Approach Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, margin: "-50px" }}
          className="py-16 sm:py-20 relative"
        >
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <motion.h2 
              variants={itemVariants}
              className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 text-shine"
            >
              Our Approach
            </motion.h2>
            
            <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 items-start">
              <motion.div 
                variants={itemVariants}
                className="flex-1"
              >
                <h3 
                  className="text-2xl sm:text-3xl font-semibold mb-6"
                  style={{ color: currentColors.primary }}
                >
                  Combining Technology with Compassion
                </h3>
                <div className="space-y-4">
                  <p className="text-lg leading-relaxed" style={{ color: currentColors.mutedText }}>
                    Mind Care Companion bridges the gap between technology and human-centered care. Our team of psychologists, 
                    AI specialists, and mental health advocates work together to create a tool that's both scientifically 
                    validated and deeply empathetic.
                  </p>
                  <p className="text-lg leading-relaxed" style={{ color: currentColors.mutedText }}>
                    We continuously improve our algorithms based on the latest psychological research and user feedback, 
                    ensuring our support remains relevant and effective for your unique needs.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="flex-1 w-full"
              >
                <div 
                  className="rounded-3xl p-6 sm:p-8 shadow-xl border"
                  style={{ 
                    background: currentColors.cardBackground,
                    borderColor: currentColors.cardBorder
                  }}
                >
                  <h3 
                    className="text-2xl sm:text-3xl font-semibold mb-6"
                    style={{ color: currentColors.primary }}
                  >
                    Our Commitment
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "Never replacing human therapists, but complementing professional care",
                      "Prioritizing ethical AI that avoids bias and promotes inclusivity",
                      "Making mental health support accessible to all, regardless of location or financial means",
                      "Continuously expanding our resource library with evidence-based content"
                    ].map((item, index) => (
                      <motion.li 
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-start"
                        style={{ color: currentColors.mutedText }}
                      >
                        <span 
                          className="text-2xl mr-3 mt-1" 
                          style={{ color: currentColors.primary }}
                        >
                          ✓
                        </span>
                        <span className="text-lg flex-1">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
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
                { number: "50K+", label: "Lives Touched" },
                { number: "24/7", label: "Support Available" },
                { number: "95%", label: "User Satisfaction" },
                { number: "60+", label: "Countries Served" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-6 sm:p-8 rounded-3xl border shadow-lg"
                  style={{ 
                    background: currentColors.cardBackground,
                    borderColor: currentColors.cardBorder
                  }}
                >
                  <div className="text-2xl sm:text-3xl font-bold mb-2 text-shine">{stat.number}</div>
                  <div 
                    className="text-sm sm:text-base font-medium"
                    style={{ color: currentColors.primaryDark }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Final CTA */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="py-16 sm:py-20 relative overflow-hidden"
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
          </div>

          <div className="text-center relative z-10 max-w-2xl mx-auto px-4 sm:px-6 w-full">
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-shine"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              Join Our Mission
            </motion.h2>
            
            <motion.p 
              className="text-lg sm:text-xl mb-8 sm:mb-12 leading-relaxed"
              style={{ color: currentColors.mutedText }}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Be part of the movement to make mental health support accessible to everyone, everywhere.
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
                className="px-8 sm:px-12 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg relative overflow-hidden group w-full sm:w-auto"
                style={{ 
                  background: `linear-gradient(135deg, ${currentColors.primary}, ${currentColors.primaryLight})`,
                  color: darkMode ? currentColors.background : 'white'
                }}
              >
                <Link to="/signin" className="relative group inline-block w-full block">
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                </Link>
              </motion.button>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default About;