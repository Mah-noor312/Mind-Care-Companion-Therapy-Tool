import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { collection, addDoc, query, where, getDocs, orderBy, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { createGlobalStyle } from "styled-components";
import mainImage from "../assets/Main.png";
import './Main.css';

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

// Features Data
const features = [
  {
    icon: "💬",
    title: "Immediate Support",
    description: "Get instant help from our AI companion with 24/7 availability and compassionate responses.",
    lightGradient: "from-purple-100 to-blue-100",
    darkGradient: "from-gray-800 to-gray-700",
    path: "/Chatbot"
  },
  {
    icon: "📊",
    title: "Mood Tracking",
    description: "Monitor your emotional patterns and gain valuable insights into your mental wellbeing over time.",
    lightGradient: "from-amber-100 to-orange-100",
    darkGradient: "from-gray-800 to-gray-700",
    path: "/mood-tracker"
  },
  {
    icon: "👥",
    title: "Support Community",
    description: "Connect with our safe community spaces and share experiences with others who understand.",
    lightGradient: "from-green-100 to-teal-100",
    darkGradient: "from-gray-800 to-gray-700",
    path: "/community-forums"
  },
  {
    icon: "🧘",
    title: "Self-Care Tools",
    description: "Access guided meditations, breathing exercises, and mindfulness practices anytime.",
    lightGradient: "from-pink-100 to-rose-100",
    darkGradient: "from-gray-800 to-gray-700",
    path: "/24-7-support"
  },
  {
    icon: "📚",
    title: "Resource Library",
    description: "Explore curated articles, videos, and therapeutic resources for mental wellness.",
    lightGradient: "from-indigo-100 to-purple-100",
    darkGradient: "from-gray-800 to-gray-700",
    path: "/Resources"
  },
  {
    icon: "🆘",
    title: "Global Helplines",
    description: "Immediate confidential support and crisis resources when you need them most.",
    lightGradient: "from-red-100 to-orange-100",
    darkGradient: "from-gray-800 to-gray-700",
    path: "/helplines"
  }
];

// Stats Data
const stats = [
  { number: "10,000+", label: "Daily Conversations", icon: "💬" },
  { number: "24/7", label: "Availability", icon: "⏰" },
  { number: "95%", label: "User Satisfaction", icon: "⭐" },
  { number: "50+", label: "Therapeutic Techniques", icon: "🛠️" }
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

const Main = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);
  const [userReviews, setUserReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    name: "",
    email: "",
    rating: 5,
    comment: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
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

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      try {
        if (currentUser) {
          setUser(currentUser);
          setNewReview(prev => ({
            ...prev,
            email: currentUser.email || ""
          }));
          await loadUserReviews(currentUser.uid);
        }
        await loadAllReviews();
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
      unsubscribe();
    };
  }, [darkMode]);

  const currentColors = darkMode ? darkColors : lightColors;

  const loadUserReviews = async (userId) => {
    try {
      const q = query(
        collection(db, "reviews"),
        where("userId", "==", userId),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(q);
      const userReviewsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUserReviews(userReviewsData);
    } catch (error) {
      console.error("Error loading user reviews:", error);
    }
  };

  const loadAllReviews = async () => {
    try {
      const q = query(
        collection(db, "reviews"),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(q);
      const allReviews = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setReviews(allReviews);
    } catch (error) {
      console.error("Error loading all reviews:", error);
      alert("Failed to load reviews. Please refresh the page.");
    }
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value
    }));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.email.trim() || !newReview.comment.trim()) {
      alert("Please fill in all fields");
      return;
    }
    
    if (!newReview.email.includes('@')) {
      alert("Please enter a valid email address");
      return;
    }

    setLoading(true);
    
    try {
      const reviewData = {
        user: newReview.name,
        email: user ? user.email : "",
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        userId: user ? user.uid : null,
        timestamp: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "reviews"), reviewData);
      const review = { id: docRef.id, ...reviewData };
      
      setReviews(prev => [review, ...prev]);
      if (user) {
        setUserReviews(prev => [review, ...prev]);
      }
      
      setNewReview(prev => ({ 
        ...prev,
        name: "",
        comment: "",
        rating: 5
      }));
      
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error("Error adding review:", error);
      alert("Failed to submit review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleReviewSubmit(e);
    }
  };

  return (
    <div className="font-[Poppins] min-h-screen flex flex-col overflow-hidden" style={{ 
      color: currentColors.text
    }}>
      <GlobalStyles />
      
      {/* Floating Background Elements */}
      <FloatingShape top={15} left={8} size={70} delay={0} color1={currentColors.primary} color2={currentColors.secondary} />
      <FloatingShape top={75} left={88} size={90} delay={4} color1={currentColors.primaryLight} color2={currentColors.accent} />
      <FloatingShape top={35} left={82} size={50} delay={8} color1={currentColors.secondary} color2={currentColors.accent} />
      <FloatingShape top={85} left={12} size={80} delay={2} color1={currentColors.primaryDark} color2={currentColors.primaryLight} />
      
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden pt-24">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 rounded-full" 
                 style={{ background: `radial-gradient(circle, ${currentColors.primary}15, transparent 70%)` }} />
            <div className="absolute top-1/3 left-1/4 w-48 sm:w-64 h-48 sm:h-64 morphing-element" 
                 style={{ background: `linear-gradient(45deg, ${currentColors.accent}20, ${currentColors.primary}10)`, filter: 'blur(40px)' }} />
            <div className="absolute bottom-1/3 right-1/4 w-56 sm:w-80 h-56 sm:h-80 morphing-element" 
                 style={{ background: `linear-gradient(45deg, ${currentColors.primary}10, ${currentColors.accent}20)`, filter: 'blur(50px)' }} />
          </div>

          <div className="text-center relative z-10 max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 text-left"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
                Your Personal <span className="text-shine">Mental Health</span> Companion
              </h1>
              
              <motion.h2
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl sm:text-2xl md:text-3xl font-light mb-6 leading-relaxed"
                style={{ color: currentColors.primaryDark }}
              >
                Always Here, Always Caring
              </motion.h2>

              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl"
                style={{ color: currentColors.mutedText }}
              >
                A safe space where AI meets empathy. Whether you need someone to talk to, 
                practical self-care tools, or professional resources, we're here 24/7 to 
                support your mental wellness journey.
              </motion.p>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/Chatbot')}
                  className="px-8 sm:px-12 py-4 sm:py-5 rounded-full font-semibold text-lg sm:text-xl relative overflow-hidden group"
                  style={{ 
                    background: `linear-gradient(135deg, ${currentColors.primary}, ${currentColors.primaryLight})`,
                    color: darkMode ? currentColors.background : 'white'
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <ion-icon name="chatbubbles" class="text-xl"></ion-icon>
                    Start Chat Now
                  </span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/Resources')}
                  className="px-8 sm:px-12 py-4 sm:py-5 rounded-full font-semibold text-lg sm:text-xl border-2 transition-colors duration-300"
                  style={{ 
                    borderColor: currentColors.primary,
                    color: currentColors.primary,
                    background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'rgba(255, 255, 255, 0.8)'
                  }}
                >
                  <span className="flex items-center justify-center gap-3">
                    <ion-icon name="book" class="text-xl"></ion-icon>
                    Explore Resources
                  </span>
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex-1 flex justify-center"
            >
              <div className="relative">
                <div 
                  className="absolute -inset-4 rounded-3xl transform rotate-6 opacity-20"
                  style={{ 
                    background: darkMode 
                      ? 'linear-gradient(to right, #404040, #606060)' 
                      : 'linear-gradient(to right, #D4B896, #F5E9DD)'
                  }}
                ></div>
                <img 
                  src={mainImage} 
                  alt="Mental health support" 
                  className="relative rounded-2xl shadow-2xl max-w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, margin: "-50px" }}
          className="py-16 sm:py-20 relative"
        >
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center p-6 sm:p-8 rounded-3xl border shadow-lg transform transition-all duration-300 hover:scale-105"
                  style={{ 
                    background: currentColors.cardBackground,
                    borderColor: currentColors.cardBorder
                  }}
                >
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <div className="text-2xl sm:text-3xl font-bold mb-2 text-shine">{stat.number}</div>
                  <div className="text-sm sm:text-base font-medium" style={{ color: currentColors.primaryDark }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Features Section */}
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
              className="text-3xl sm:text-4xl font-bold text-center mb-4 text-shine"
            >
              How We Can Help You
            </motion.h2>
            
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-center mb-12 sm:mb-16 max-w-3xl mx-auto leading-relaxed"
              style={{ color: currentColors.mutedText }}
            >
              Comprehensive mental health support tailored to your unique needs and journey
            </motion.p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="relative group cursor-pointer"
                  onClick={() => navigate(feature.path)}
                >
                  {/* Background Shape */}
                  <div 
                    className={`absolute inset-0 rounded-3xl transform transition-transform duration-500 group-hover:scale-105 ${
                      darkMode ? feature.darkGradient : feature.lightGradient
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
                      {feature.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4" style={{ color: currentColors.primary }}>
                      {feature.title}
                    </h3>
                    <p className="leading-relaxed text-sm sm:text-base mb-6" style={{ color: currentColors.mutedText }}>
                      {feature.description}
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
                      Explore {feature.title.split(' ')[0]}
                    </motion.button>
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
              Ready to Begin Your Healing Journey?
            </motion.h2>
            
            <motion.p 
              className="text-lg sm:text-xl mb-8 sm:mb-12 leading-relaxed"
              style={{ color: currentColors.mutedText }}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Join thousands who have found peace and support through our compassionate AI technology. 
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
                onClick={() => navigate("/Chatbot")}
                className="px-8 sm:px-16 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg relative overflow-hidden group w-full sm:w-auto"
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
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default Main;