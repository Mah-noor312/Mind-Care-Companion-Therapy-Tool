import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createGlobalStyle } from "styled-components";
import { auth, db } from "../firebaseConfig";
import { collection, addDoc, query, where, getDocs, orderBy, serverTimestamp, doc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #f5e9dd;
  }
  ::-webkit-scrollbar-thumb {
    background: #6F4F28;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #5A3E21;
  }
`;

// Color palette
const colors = {
  primary: "#6F4F28",
  primaryLight: "#8B6A42",
  primaryDark: "#5A3E21",
  secondary: "#A68863",
  accent: "#D4B896",
  background: "#fefaf6",
  text: "#5A3E21",
  gradient: "linear-gradient(135deg, #6F4F28 0%, #8B6A42 25%, #A68863 50%, #C19E76 75%, #D4B896 100%)"
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

const CBTCopingStrategies = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [practiceSession, setPracticeSession] = useState({
    strategyId: "",
    duration: 10,
    effectiveness: 5,
    notes: "",
    challenges: "",
    timestamp: new Date().toISOString().split('T')[0]
  });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userProgress, setUserProgress] = useState([]);
  const [favoriteStrategies, setFavoriteStrategies] = useState([]);

  // Coping Strategies Data
  const copingStrategies = [
    {
      id: "deep-breathing",
      title: "Deep Breathing",
      category: "relaxation",
      icon: "🌬️",
      difficulty: "Beginner",
      duration: "5-10 mins",
      description: "Calm your nervous system through controlled breathing patterns",
      steps: [
        "Find a comfortable seated position",
        "Place one hand on your chest and one on your belly",
        "Inhale slowly through your nose for 4 seconds",
        "Hold your breath for 4 seconds",
        "Exhale slowly through your mouth for 6 seconds",
        "Repeat for 5-10 cycles"
      ],
      benefits: [
        "Reduces anxiety immediately",
        "Lowers blood pressure",
        "Improves focus and clarity",
        "Activates parasympathetic nervous system"
      ],
      whenToUse: ["When feeling anxious", "Before stressful events", "When overwhelmed", "To improve sleep"],
      tips: [
        "Practice regularly, not just when stressed",
        "Focus on making your exhales longer than inhales",
        "Use the 4-7-8 technique for sleep: inhale 4s, hold 7s, exhale 8s"
      ]
    },
    {
      id: "progressive-muscle",
      title: "Progressive Muscle Relaxation",
      category: "relaxation",
      icon: "💆‍♂️",
      difficulty: "Beginner",
      duration: "10-15 mins",
      description: "Systematically tense and relax muscle groups to release physical tension",
      steps: [
        "Find a quiet, comfortable place to sit or lie down",
        "Start with your feet - tense muscles for 5 seconds",
        "Release tension completely and notice the difference",
        "Move up to calves, thighs, glutes",
        "Continue with hands, arms, shoulders",
        "Finish with facial muscles and scalp",
        "Rest for 2 minutes, noticing the relaxation"
      ],
      benefits: [
        "Reduces muscle tension and pain",
        "Improves body awareness",
        "Helps with insomnia",
        "Reduces physical symptoms of anxiety"
      ],
      whenToUse: ["Muscle tension", "Before bed", "After stressful days", "With headaches"],
      tips: [
        "Don't tense to the point of pain",
        "Focus on the contrast between tension and relaxation",
        "Practice in a warm, comfortable environment"
      ]
    },
    {
      id: "thought-challenging",
      title: "Thought Challenging",
      category: "cognitive",
      icon: "💭",
      difficulty: "Intermediate",
      duration: "10-15 mins",
      description: "Identify and reframe negative or distorted thinking patterns",
      steps: [
        "Identify the troubling thought or situation",
        "Rate your belief in the thought (0-100%)",
        "Look for evidence that supports the thought",
        "Look for evidence against the thought",
        "Consider alternative explanations",
        "Develop a balanced, realistic thought",
        "Re-rate your belief in the original thought"
      ],
      benefits: [
        "Reduces negative thinking patterns",
        "Improves problem-solving skills",
        "Increases emotional resilience",
        "Promotes realistic thinking"
      ],
      whenToUse: ["Negative self-talk", "Catastrophic thinking", "Rumination", "Perfectionism"],
      tips: [
        "Write down your thoughts for better clarity",
        "Ask 'What would I tell a friend in this situation?'",
        "Look for cognitive distortions like all-or-nothing thinking"
      ]
    },
    {
      id: "behavioral-activation",
      title: "Behavioral Activation",
      category: "behavioral",
      icon: "🚶‍♂️",
      difficulty: "Beginner",
      duration: "Ongoing",
      description: "Increase engagement in meaningful activities to improve mood",
      steps: [
        "Identify activities you used to enjoy",
        "Start with small, achievable goals",
        "Schedule activities in your calendar",
        "Break tasks into smaller steps if needed",
        "Engage in the activity mindfully",
        "Notice any positive changes in mood",
        "Gradually increase activity level"
      ],
      benefits: [
        "Breaks cycle of depression",
        "Increases sense of accomplishment",
        "Improves motivation over time",
        "Builds positive routines"
      ],
      whenToUse: ["Low motivation", "Depression", "Isolation", "Lack of pleasure"],
      tips: [
        "Start with just 5 minutes of an activity",
        "Focus on the process, not the outcome",
        "Pair activities with pleasant stimuli (music, nature)"
      ]
    },
    {
      id: "mindful-grounding",
      title: "5-4-3-2-1 Grounding",
      category: "mindfulness",
      icon: "🌍",
      difficulty: "Beginner",
      duration: "2-5 mins",
      description: "Use your senses to anchor yourself in the present moment",
      steps: [
        "Notice 5 things you can see around you",
        "Notice 4 things you can touch or feel",
        "Notice 3 things you can hear",
        "Notice 2 things you can smell",
        "Notice 1 thing you can taste",
        "Take a deep breath and return to the present"
      ],
      benefits: [
        "Reduces anxiety and panic quickly",
        "Brings attention to present moment",
        "Interrupts rumination cycles",
        "Can be done anywhere, anytime"
      ],
      whenToUse: ["Anxiety attacks", "Panic symptoms", "Dissociation", "Stressful moments"],
      tips: [
        "Be as specific as possible with observations",
        "Use this technique when feeling overwhelmed",
        "Practice regularly to make it more effective"
      ]
    },
    {
      id: "gratitude-journaling",
      title: "Gratitude Journaling",
      category: "cognitive",
      icon: "📔",
      difficulty: "Beginner",
      duration: "5-10 mins",
      description: "Focus on positive aspects of life to shift perspective",
      steps: [
        "Set aside dedicated time each day",
        "Write down 3-5 things you're grateful for",
        "Be specific and detailed",
        "Include both big and small things",
        "Reflect on why you're grateful for each",
        "Notice any positive emotions that arise"
      ],
      benefits: [
        "Increases positive emotions",
        "Improves sleep quality",
        "Enhances relationships",
        "Reduces stress and anxiety"
      ],
      whenToUse: ["Negative mindset", "Stressful periods", "Relationship issues", "Life transitions"],
      tips: [
        "Make it a daily habit for best results",
        "Be consistent with timing",
        "Try to find new things each day"
      ]
    },
    {
      id: "problem-solving",
      title: "Structured Problem-Solving",
      category: "cognitive",
      icon: "🧩",
      difficulty: "Intermediate",
      duration: "15-30 mins",
      description: "Systematic approach to breaking down and solving problems",
      steps: [
        "Define the problem clearly and specifically",
        "Brainstorm all possible solutions without judgment",
        "Evaluate the pros and cons of each solution",
        "Choose the best solution to implement",
        "Create an action plan with specific steps",
        "Implement the solution",
        "Review and adjust if necessary"
      ],
      benefits: [
        "Reduces feeling overwhelmed",
        "Improves decision-making",
        "Increases sense of control",
        "Builds confidence in problem-solving"
      ],
      whenToUse: ["Complex decisions", "Feeling stuck", "Multiple options", "Overwhelming problems"],
      tips: [
        "Break large problems into smaller parts",
        "Set a time limit for decision-making",
        "Consider seeking input from others"
      ]
    },
    {
      id: "self-compassion",
      title: "Self-Compassion Break",
      category: "emotional",
      icon: "💝",
      difficulty: "Beginner",
      duration: "3-5 mins",
      description: "Practice kindness and understanding toward yourself in difficult moments",
      steps: [
        "Acknowledge your suffering: 'This is a moment of suffering'",
        "Recognize common humanity: 'Suffering is part of being human'",
        "Offer yourself kindness: Place hand on heart and say 'May I be kind to myself'",
        "Add any other compassionate phrases you need to hear",
        "Breathe and let the compassion sink in"
      ],
      benefits: [
        "Reduces self-criticism",
        "Increases emotional resilience",
        "Improves self-esteem",
        "Reduces anxiety and depression"
      ],
      whenToUse: ["Self-criticism", "Mistakes or failures", "Painful emotions", "Personal shortcomings"],
      tips: [
        "Use a gentle, caring tone with yourself",
        "Remember that everyone struggles sometimes",
        "Practice regularly to build self-compassion habit"
      ]
    }
  ];

  const categories = [
    { id: "all", name: "All Strategies", icon: "🌟", count: copingStrategies.length },
    { id: "relaxation", name: "Relaxation", icon: "😌", count: copingStrategies.filter(s => s.category === "relaxation").length },
    { id: "cognitive", name: "Cognitive", icon: "🧠", count: copingStrategies.filter(s => s.category === "cognitive").length },
    { id: "behavioral", name: "Behavioral", icon: "🚀", count: copingStrategies.filter(s => s.category === "behavioral").length },
    { id: "mindfulness", name: "Mindfulness", icon: "🌱", count: copingStrategies.filter(s => s.category === "mindfulness").length },
    { id: "emotional", name: "Emotional", icon: "💖", count: copingStrategies.filter(s => s.category === "emotional").length }
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        loadUserProgress(currentUser.uid);
        loadFavorites(currentUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const loadUserProgress = async (userId) => {
    try {
      const q = query(
        collection(db, "CBTCopingStrategies"),
        where("userId", "==", userId),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(q);
      const progress = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUserProgress(progress);
    } catch (error) {
      console.error("Error loading user progress:", error);
    }
  };

  const loadFavorites = async (userId) => {
    try {
      const userDoc = await getDocs(query(collection(db, "users"), where("userId", "==", userId)));
      if (!userDoc.empty) {
        const userData = userDoc.docs[0].data();
        setFavoriteStrategies(userData.favoriteStrategies || []);
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  };

  const toggleFavorite = async (strategyId) => {
    if (!user) return;

    try {
      const newFavorites = favoriteStrategies.includes(strategyId)
        ? favoriteStrategies.filter(id => id !== strategyId)
        : [...favoriteStrategies, strategyId];

      setFavoriteStrategies(newFavorites);

      // Update in Firebase
      const userDoc = await getDocs(query(collection(db, "users"), where("userId", "==", user.uid)));
      if (!userDoc.empty) {
        const docId = userDoc.docs[0].id;
        await setDoc(doc(db, "users", docId), { favoriteStrategies: newFavorites }, { merge: true });
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  const savePracticeSession = async () => {
    if (!user || !practiceSession.strategyId) {
      alert("Please select a strategy and sign in to save your practice");
      return;
    }

    setLoading(true);
    
    try {
      const sessionData = {
        ...practiceSession,
        userId: user.uid,
        userName: user.displayName || user.email,
        userEmail: user.email,
        timestamp: new Date().toISOString().split('T')[0],
        completedAt: serverTimestamp(),
        sessionDate: new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      };

      await addDoc(collection(db, "CBTCopingStrategies"), sessionData);

      // Reload progress
      await loadUserProgress(user.uid);

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      
      // Reset practice session
      setPracticeSession({
        strategyId: "",
        duration: 10,
        effectiveness: 5,
        notes: "",
        challenges: "",
        timestamp: new Date().toISOString().split('T')[0]
      });

      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'fixed top-20 right-8 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50';
      successMsg.innerHTML = `
        <div class="flex items-center gap-2">
          <ion-icon name="checkmark-circle" class="text-xl"></ion-icon>
          <span>Practice session saved successfully!</span>
        </div>
      `;
      document.body.appendChild(successMsg);
      
      setTimeout(() => {
        successMsg.remove();
      }, 3000);
      
    } catch (error) {
      console.error("Error saving practice session:", error);
      alert("Failed to save your practice session. Please check your internet connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredStrategies = activeCategory === "all" 
    ? copingStrategies 
    : copingStrategies.filter(strategy => strategy.category === activeCategory);

  const getProgressStats = () => {
    const totalSessions = userProgress.length;
    const thisWeekSessions = userProgress.filter(session => {
      const sessionDate = new Date(session.timestamp);
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return sessionDate >= oneWeekAgo;
    }).length;

    const averageEffectiveness = userProgress.length > 0 
      ? userProgress.reduce((acc, session) => acc + (session.effectiveness || 0), 0) / userProgress.length 
      : 0;

    return {
      totalSessions,
      thisWeekSessions,
      averageEffectiveness: averageEffectiveness.toFixed(1)
    };
  };

  const stats = getProgressStats();

  const getCategoryColor = (category) => {
    const colors = {
      relaxation: "from-blue-500 to-cyan-500",
      cognitive: "from-purple-500 to-pink-500",
      behavioral: "from-green-500 to-emerald-500",
      mindfulness: "from-teal-500 to-blue-500",
      emotional: "from-rose-500 to-red-500"
    };
    return colors[category] || "from-gray-500 to-gray-600";
  };

  return (
    <div className="font-[Poppins] min-h-screen flex flex-col overflow-hidden" style={{ color: colors.text }}>
      <GlobalStyles />
      
      {/* Floating Background Elements */}
      <FloatingShape top={10} left={5} size={80} delay={0} color1={colors.primary} color2={colors.secondary} />
      <FloatingShape top={80} left={90} size={100} delay={4} color1={colors.primaryLight} color2={colors.accent} />
      <FloatingShape top={30} left={85} size={60} delay={8} color1={colors.secondary} color2={colors.accent} />
      <FloatingShape top={75} left={10} size={90} delay={2} color1={colors.primaryDark} color2={colors.primaryLight} />
      
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-4 sm:px-6 mb-8"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: colors.primary }}>
            CBT Coping Strategies
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Build your toolkit of evidence-based techniques to manage stress, anxiety, and challenging emotions
          </p>
        </motion.section>

        {/* Progress Stats */}
        {userProgress.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto px-4 sm:px-6 mb-8"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-opacity-20">
              <h3 className="text-xl font-bold mb-4 text-center" style={{ color: colors.primary }}>
                Your Practice Progress
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-xl bg-blue-50">
                  <div className="text-2xl font-bold text-blue-600">{stats.totalSessions}</div>
                  <div className="text-sm text-gray-600">Total Sessions</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-green-50">
                  <div className="text-2xl font-bold text-green-600">{stats.thisWeekSessions}</div>
                  <div className="text-sm text-gray-600">This Week</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-purple-50">
                  <div className="text-2xl font-bold text-purple-600">{stats.averageEffectiveness}/10</div>
                  <div className="text-sm text-gray-600">Avg. Effectiveness</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Category Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-3 rounded-2xl font-semibold transition-all flex items-center gap-2 ${
                    activeCategory === category.id 
                      ? 'text-white transform scale-105' 
                      : 'text-gray-700 bg-white border border-gray-200 hover:border-gray-300'
                  }`}
                  style={{
                    background: activeCategory === category.id 
                      ? `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`
                      : undefined
                  }}
                >
                  <span className="text-lg">{category.icon}</span>
                  <span>{category.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    activeCategory === category.id ? 'bg-white text-gray-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Strategies List */}
            <div className="lg:col-span-2">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-2 gap-6"
              >
                {filteredStrategies.map((strategy, index) => (
                  <motion.div
                    key={strategy.id}
                    variants={itemVariants}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`bg-white rounded-2xl p-6 shadow-lg border border-opacity-20 cursor-pointer transition-all ${
                      selectedStrategy?.id === strategy.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setSelectedStrategy(strategy)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{strategy.icon}</div>
                        <div>
                          <h3 className="font-bold text-lg" style={{ color: colors.primaryDark }}>
                            {strategy.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getCategoryColor(strategy.category)} text-white`}>
                              {strategy.category}
                            </span>
                            <span className="text-xs text-gray-500">{strategy.difficulty}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(strategy.id);
                        }}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <ion-icon 
                          name={favoriteStrategies.includes(strategy.id) ? "heart" : "heart-outline"}
                          style={{ 
                            color: favoriteStrategies.includes(strategy.id) ? '#EF4444' : colors.text 
                          }}
                        ></ion-icon>
                      </button>
                    </div>

                    <p className="text-gray-600 mb-4">{strategy.description}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>⏱️ {strategy.duration}</span>
                      <div className="flex items-center gap-4">
                        {strategy.benefits.slice(0, 2).map((benefit, i) => (
                          <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {benefit.split(' ')[0]}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Strategy Details & Practice */}
            <div className="space-y-6">
              {selectedStrategy ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-opacity-20 sticky top-24"
                >
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-2">{selectedStrategy.icon}</div>
                    <h2 className="text-2xl font-bold" style={{ color: colors.primary }}>
                      {selectedStrategy.title}
                    </h2>
                    <p className="text-gray-600">{selectedStrategy.description}</p>
                  </div>

                  {/* Steps */}
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <ion-icon name="list-outline"></ion-icon>
                      Practice Steps
                    </h3>
                    <ol className="space-y-2">
                      {selectedStrategy.steps.map((step, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm">
                          <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center font-semibold">
                            {index + 1}
                          </span>
                          <span className="text-gray-700">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Benefits */}
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <ion-icon name="checkmark-circle-outline"></ion-icon>
                      Benefits
                    </h3>
                    <ul className="grid grid-cols-2 gap-2">
                      {selectedStrategy.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <ion-icon name="checkmark" class="text-green-500"></ion-icon>
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* When to Use */}
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <ion-icon name="time-outline"></ion-icon>
                      When to Use
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedStrategy.whenToUse.map((useCase, index) => (
                        <span key={index} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                          {useCase}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Practice Session Form */}
                  <div className="border-t pt-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <ion-icon name="play-circle-outline"></ion-icon>
                      Practice This Strategy
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Practice Duration (minutes)
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="60"
                          value={practiceSession.duration}
                          onChange={(e) => setPracticeSession(prev => ({ 
                            ...prev, 
                            duration: parseInt(e.target.value),
                            strategyId: selectedStrategy.id
                          }))}
                          className="w-full"
                        />
                        <div className="text-center text-sm text-gray-600">
                          {practiceSession.duration} minutes
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Effectiveness (1-10)
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={practiceSession.effectiveness}
                          onChange={(e) => setPracticeSession(prev => ({ 
                            ...prev, 
                            effectiveness: parseInt(e.target.value) 
                          }))}
                          className="w-full"
                        />
                        <div className="text-center text-sm text-gray-600">
                          {practiceSession.effectiveness}/10
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Notes & Reflections
                        </label>
                        <textarea
                          value={practiceSession.notes}
                          onChange={(e) => setPracticeSession(prev => ({ ...prev, notes: e.target.value }))}
                          placeholder="How did this practice help? What did you notice?"
                          className="w-full h-20 p-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:border-transparent"
                          style={{ focusRingColor: colors.primary + '40' }}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Challenges Faced
                        </label>
                        <textarea
                          value={practiceSession.challenges}
                          onChange={(e) => setPracticeSession(prev => ({ ...prev, challenges: e.target.value }))}
                          placeholder="Any difficulties or distractions during practice?"
                          className="w-full h-16 p-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:border-transparent"
                          style={{ focusRingColor: colors.primary + '40' }}
                        />
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={savePracticeSession}
                        disabled={loading || saved}
                        className="w-full py-3 rounded-xl font-semibold text-white disabled:opacity-50 flex items-center justify-center gap-2"
                        style={{ 
                          background: saved 
                            ? '#10B981' 
                            : `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`
                        }}
                      >
                        {loading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Saving...
                          </>
                        ) : saved ? (
                          <>
                            <ion-icon name="checkmark-circle"></ion-icon>
                            Practice Saved!
                          </>
                        ) : (
                          <>
                            <ion-icon name="play-circle"></ion-icon>
                            Save Practice Session
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-2xl p-8 text-center shadow-lg border border-opacity-20"
                >
                  <div className="text-6xl mb-4" style={{ color: colors.primaryLight }}>
                    <ion-icon name="book-outline"></ion-icon>
                  </div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: colors.primaryDark }}>
                    Select a Strategy
                  </h3>
                  <p className="text-gray-600">
                    Choose a coping strategy from the list to view detailed instructions and practice it.
                  </p>
                </motion.div>
              )}

              {/* Quick Tips */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200"
              >
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <ion-icon name="bulb-outline"></ion-icon>
                  Practice Tips
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <ion-icon name="checkmark" class="text-blue-500 mt-0.5"></ion-icon>
                    <span>Practice regularly, not just when you're stressed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ion-icon name="checkmark" class="text-blue-500 mt-0.5"></ion-icon>
                    <span>Start with shorter sessions and gradually increase</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ion-icon name="checkmark" class="text-blue-500 mt-0.5"></ion-icon>
                    <span>Be patient - skills develop over time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ion-icon name="checkmark" class="text-blue-500 mt-0.5"></ion-icon>
                    <span>Combine different strategies for best results</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Emergency Coping Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, margin: "-50px" }}
          className="py-16 sm:py-20 relative mt-16"
        >
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <motion.h2 
              variants={itemVariants}
              className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16"
              style={{ color: colors.primary }}
            >
              Emergency Coping Strategies
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: "🌬️",
                  title: "Breathing Space",
                  description: "3-minute breathing exercise for immediate relief",
                  steps: ["1 min: Acknowledge thoughts/feelings", "1 min: Focus on breath", "1 min: Expand awareness"]
                },
                {
                  icon: "🌍",
                  title: "Grounding Techniques",
                  description: "Connect with present moment quickly",
                  steps: ["5-4-3-2-1 method", "Hold something cold", "Focus on physical sensations"]
                },
                {
                  icon: "🚶‍♂️",
                  title: "Change Scenery",
                  description: "Physical movement to shift mental state",
                  steps: ["Take a short walk", "Change rooms", "Step outside briefly"]
                },
                {
                  icon: "💧",
                  title: "Temperature Change",
                  description: "Use temperature to regulate emotions",
                  steps: ["Splash cold water", "Hold ice cube", "Warm beverage"]
                }
              ].map((strategy, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-opacity-20 text-center"
                >
                  <div className="text-4xl mb-4">{strategy.icon}</div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: colors.primaryDark }}>
                    {strategy.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{strategy.description}</p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    {strategy.steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default CBTCopingStrategies;