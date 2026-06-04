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
      url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%236F4F28' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
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

const CBTThoughtRecord = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userProgress, setUserProgress] = useState([]);

  // Thought Record Data
  const [thoughtRecord, setThoughtRecord] = useState({
    situation: "",
    emotions: [
      { name: "", intensity: 50 }
    ],
    automaticThoughts: [
      { thought: "", belief: 50 }
    ],
    evidenceFor: [""],
    evidenceAgainst: [""],
    alternativeThoughts: [
      { thought: "", belief: 50 }
    ],
    outcome: {
      emotionsAfter: [
        { name: "", intensity: 50 }
      ],
      insights: ""
    },
    timestamp: new Date().toISOString().split('T')[0]
  });

  const steps = [
    {
      title: "📝 Situation",
      subtitle: "Describe the triggering situation",
      description: "What happened? Where were you? Who was involved?"
    },
    {
      title: "💔 Emotions",
      subtitle: "Identify your feelings",
      description: "What emotions did you experience? How intense were they?"
    },
    {
      title: "🤔 Automatic Thoughts",
      subtitle: "Capture your initial thoughts",
      description: "What immediately went through your mind?"
    },
    {
      title: "✅ Evidence For",
      subtitle: "Supporting evidence",
      description: "What evidence supports your automatic thoughts?"
    },
    {
      title: "❌ Evidence Against",
      subtitle: "Contradictory evidence",
      description: "What evidence contradicts your automatic thoughts?"
    },
    {
      title: "💡 Alternative Thoughts",
      subtitle: "Develop balanced thinking",
      description: "What's a more balanced or realistic perspective?"
    },
    {
      title: "📊 Outcome",
      subtitle: "Review and reflect",
      description: "How do you feel now? What did you learn?"
    }
  ];

  // Common emotions for quick selection
  const commonEmotions = [
    "Anxious", "Sad", "Angry", "Frustrated", "Worried", "Guilty",
    "Ashamed", "Hopeless", "Overwhelmed", "Lonely", "Inadequate", "Jealous"
  ];

  // Common cognitive distortions
  const cognitiveDistortions = [
    {
      name: "All-or-Nothing Thinking",
      description: "Seeing things in black-and-white categories",
      example: "If I'm not perfect, I'm a failure"
    },
    {
      name: "Overgeneralization",
      description: "Seeing a single negative event as a never-ending pattern",
      example: "I always mess things up"
    },
    {
      name: "Mental Filter",
      description: "Picking out a single negative detail and dwelling on it",
      example: "Focusing only on what went wrong"
    },
    {
      name: "Disqualifying the Positive",
      description: "Rejecting positive experiences",
      example: "That doesn't count because anyone could have done it"
    },
    {
      name: "Jumping to Conclusions",
      description: "Making negative interpretations without facts",
      example: "They probably hate me"
    },
    {
      name: "Magnification or Minimization",
      description: "Exaggerating importance or shrinking importance",
      example: "My mistake was catastrophic / My success was nothing"
    },
    {
      name: "Emotional Reasoning",
      description: "Assuming feelings reflect reality",
      example: "I feel stupid, so I must be stupid"
    },
    {
      name: "Should Statements",
      description: "Using 'should', 'must', or 'ought' statements",
      example: "I should never make mistakes"
    },
    {
      name: "Labeling",
      description: "Identifying with your shortcomings",
      example: "I'm a loser instead of 'I made a mistake'"
    },
    {
      name: "Personalization",
      description: "Taking responsibility for events outside your control",
      example: "It's my fault the team failed"
    }
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        loadUserProgress(currentUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const loadUserProgress = async (userId) => {
    try {
      const q = query(
        collection(db, "CBTThoughtRecords"),
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

  const handleSituationChange = (value) => {
    setThoughtRecord(prev => ({ ...prev, situation: value }));
  };

  const handleEmotionChange = (index, field, value) => {
    const newEmotions = [...thoughtRecord.emotions];
    newEmotions[index][field] = value;
    setThoughtRecord(prev => ({ ...prev, emotions: newEmotions }));
  };

  const addEmotion = () => {
    setThoughtRecord(prev => ({
      ...prev,
      emotions: [...prev.emotions, { name: "", intensity: 50 }]
    }));
  };

  const removeEmotion = (index) => {
    if (thoughtRecord.emotions.length > 1) {
      const newEmotions = thoughtRecord.emotions.filter((_, i) => i !== index);
      setThoughtRecord(prev => ({ ...prev, emotions: newEmotions }));
    }
  };

  const handleAutomaticThoughtChange = (index, field, value) => {
    const newThoughts = [...thoughtRecord.automaticThoughts];
    newThoughts[index][field] = value;
    setThoughtRecord(prev => ({ ...prev, automaticThoughts: newThoughts }));
  };

  const addAutomaticThought = () => {
    setThoughtRecord(prev => ({
      ...prev,
      automaticThoughts: [...prev.automaticThoughts, { thought: "", belief: 50 }]
    }));
  };

  const removeAutomaticThought = (index) => {
    if (thoughtRecord.automaticThoughts.length > 1) {
      const newThoughts = thoughtRecord.automaticThoughts.filter((_, i) => i !== index);
      setThoughtRecord(prev => ({ ...prev, automaticThoughts: newThoughts }));
    }
  };

  const handleEvidenceForChange = (index, value) => {
    const newEvidence = [...thoughtRecord.evidenceFor];
    newEvidence[index] = value;
    setThoughtRecord(prev => ({ ...prev, evidenceFor: newEvidence }));
  };

  const addEvidenceFor = () => {
    setThoughtRecord(prev => ({
      ...prev,
      evidenceFor: [...prev.evidenceFor, ""]
    }));
  };

  const removeEvidenceFor = (index) => {
    if (thoughtRecord.evidenceFor.length > 1) {
      const newEvidence = thoughtRecord.evidenceFor.filter((_, i) => i !== index);
      setThoughtRecord(prev => ({ ...prev, evidenceFor: newEvidence }));
    }
  };

  const handleEvidenceAgainstChange = (index, value) => {
    const newEvidence = [...thoughtRecord.evidenceAgainst];
    newEvidence[index] = value;
    setThoughtRecord(prev => ({ ...prev, evidenceAgainst: newEvidence }));
  };

  const addEvidenceAgainst = () => {
    setThoughtRecord(prev => ({
      ...prev,
      evidenceAgainst: [...prev.evidenceAgainst, ""]
    }));
  };

  const removeEvidenceAgainst = (index) => {
    if (thoughtRecord.evidenceAgainst.length > 1) {
      const newEvidence = thoughtRecord.evidenceAgainst.filter((_, i) => i !== index);
      setThoughtRecord(prev => ({ ...prev, evidenceAgainst: newEvidence }));
    }
  };

  const handleAlternativeThoughtChange = (index, field, value) => {
    const newThoughts = [...thoughtRecord.alternativeThoughts];
    newThoughts[index][field] = value;
    setThoughtRecord(prev => ({ ...prev, alternativeThoughts: newThoughts }));
  };

  const addAlternativeThought = () => {
    setThoughtRecord(prev => ({
      ...prev,
      alternativeThoughts: [...prev.alternativeThoughts, { thought: "", belief: 50 }]
    }));
  };

  const removeAlternativeThought = (index) => {
    if (thoughtRecord.alternativeThoughts.length > 1) {
      const newThoughts = thoughtRecord.alternativeThoughts.filter((_, i) => i !== index);
      setThoughtRecord(prev => ({ ...prev, alternativeThoughts: newThoughts }));
    }
  };

  const handleOutcomeChange = (field, value) => {
    setThoughtRecord(prev => ({
      ...prev,
      outcome: { ...prev.outcome, [field]: value }
    }));
  };

  const handleOutcomeEmotionChange = (index, field, value) => {
    const newEmotions = [...thoughtRecord.outcome.emotionsAfter];
    newEmotions[index][field] = value;
    setThoughtRecord(prev => ({
      ...prev,
      outcome: { ...prev.outcome, emotionsAfter: newEmotions }
    }));
  };

  const addOutcomeEmotion = () => {
    setThoughtRecord(prev => ({
      ...prev,
      outcome: {
        ...prev.outcome,
        emotionsAfter: [...prev.outcome.emotionsAfter, { name: "", intensity: 50 }]
      }
    }));
  };

  const removeOutcomeEmotion = (index) => {
    if (thoughtRecord.outcome.emotionsAfter.length > 1) {
      const newEmotions = thoughtRecord.outcome.emotionsAfter.filter((_, i) => i !== index);
      setThoughtRecord(prev => ({
        ...prev,
        outcome: { ...prev.outcome, emotionsAfter: newEmotions }
      }));
    }
  };

  const saveThoughtRecord = async () => {
    if (!user) {
      alert("Please sign in to save your thought record");
      return;
    }

    setLoading(true);
    
    try {
      const recordData = {
        ...thoughtRecord,
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
        }),
        progress: getProgressStats().percentage
      };

      // Check if entry already exists for today
      const q = query(
        collection(db, "CBTThoughtRecords"),
        where("userId", "==", user.uid),
        where("timestamp", "==", thoughtRecord.timestamp)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Create new entry
        await addDoc(collection(db, "CBTThoughtRecords"), recordData);
      } else {
        // Update existing entry
        const docId = querySnapshot.docs[0].id;
        await setDoc(doc(db, "CBTThoughtRecords", docId), recordData, { merge: true });
      }

      // Reload progress
      await loadUserProgress(user.uid);

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'fixed top-20 right-8 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50';
      successMsg.innerHTML = `
        <div class="flex items-center gap-2">
          <ion-icon name="checkmark-circle" class="text-xl"></ion-icon>
          <span>Thought record saved successfully!</span>
        </div>
      `;
      document.body.appendChild(successMsg);
      
      setTimeout(() => {
        successMsg.remove();
      }, 3000);
      
    } catch (error) {
      console.error("Error saving thought record:", error);
      alert("Failed to save your thought record. Please check your internet connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const getProgressStats = () => {
    const completed = [
      thoughtRecord.situation.trim() !== "",
      thoughtRecord.emotions.some(emotion => emotion.name.trim() !== ""),
      thoughtRecord.automaticThoughts.some(thought => thought.thought.trim() !== ""),
      thoughtRecord.evidenceFor.some(evidence => evidence.trim() !== ""),
      thoughtRecord.evidenceAgainst.some(evidence => evidence.trim() !== ""),
      thoughtRecord.alternativeThoughts.some(thought => thought.thought.trim() !== ""),
      thoughtRecord.outcome.insights.trim() !== ""
    ].filter(Boolean).length;

    return {
      completed,
      total: 7,
      percentage: Math.round((completed / 7) * 100)
    };
  };

  const progress = getProgressStats();

  const getWeeklyStats = () => {
    const last7Days = userProgress.slice(0, 7);
    const completedDays = last7Days.filter(entry => entry.progress > 50).length;
    const averageProgress = last7Days.reduce((acc, entry) => acc + (entry.progress || 0), 0) / last7Days.length || 0;

    return {
      completedDays,
      totalDays: last7Days.length,
      averageProgress: averageProgress.toFixed(0),
      streak: calculateStreak(userProgress)
    };
  };

  const calculateStreak = (progress) => {
    if (progress.length === 0) return 0;
    
    let streak = 0;
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    // Check if today's entry exists
    const hasToday = progress.some(entry => entry.timestamp === todayStr);
    if (hasToday) streak = 1;
    
    // Check consecutive previous days
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      if (progress.some(entry => entry.timestamp === dateStr)) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const weeklyStats = getWeeklyStats();

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
            CBT Thought Record
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Identify, examine, and reframe negative thought patterns using cognitive behavioral techniques
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
                Your Thought Record Progress
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-xl bg-blue-50">
                  <div className="text-2xl font-bold text-blue-600">{weeklyStats.streak}</div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-green-50">
                  <div className="text-2xl font-bold text-green-600">{weeklyStats.completedDays}/{weeklyStats.totalDays}</div>
                  <div className="text-sm text-gray-600">This Week</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-purple-50">
                  <div className="text-2xl font-bold text-purple-600">{userProgress.length}</div>
                  <div className="text-sm text-gray-600">Total Records</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-orange-50">
                  <div className="text-2xl font-bold text-orange-600">{weeklyStats.averageProgress}%</div>
                  <div className="text-sm text-gray-600">Avg. Progress</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-6xl mx-auto px-4 sm:px-6"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-opacity-20">
            {/* Progress Navigation */}
            <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
              <div className="flex-1 min-w-[200px]">
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span>Record Progress</span>
                  <span>{progress.completed}/{progress.total} steps</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="h-3 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${progress.percentage}%`,
                      background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`
                    }}
                  />
                </div>
              </div>
              
              <div className="flex gap-2 flex-wrap">
                {steps.map((step, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      currentStep === index 
                        ? 'text-white' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                    style={{
                      background: currentStep === index 
                        ? `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`
                        : 'rgba(255, 255, 255, 0.8)',
                      border: currentStep === index ? 'none' : `2px solid ${colors.primaryLight}`
                    }}
                  >
                    {step.title.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Step Content */}
            <div className="min-h-[500px]">
              {currentStep === 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: colors.primary }}>
                      {steps[0].title}
                    </h2>
                    <p className="text-gray-600">{steps[0].subtitle}</p>
                    <p className="text-sm text-gray-500 mt-2">{steps[0].description}</p>
                  </div>

                  <div className="max-w-3xl mx-auto">
                    <label className="block text-lg font-semibold mb-4" style={{ color: colors.primaryDark }}>
                      Describe the situation that triggered your negative thoughts:
                    </label>
                    <textarea
                      value={thoughtRecord.situation}
                      onChange={(e) => handleSituationChange(e.target.value)}
                      placeholder="Example: I was at work and my manager criticized my presentation in front of colleagues..."
                      className="w-full h-48 p-4 border-2 border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:border-transparent"
                      style={{ 
                        focusBorderColor: colors.primary,
                        focusRingColor: colors.primary + '40'
                      }}
                    />
                    <div className="text-sm text-gray-500 mt-2">
                      Be specific about what happened, when, where, and who was involved.
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: colors.primary }}>
                      {steps[1].title}
                    </h2>
                    <p className="text-gray-600">{steps[1].subtitle}</p>
                    <p className="text-sm text-gray-500 mt-2">{steps[1].description}</p>
                  </div>

                  <div className="max-w-3xl mx-auto">
                    <label className="block text-lg font-semibold mb-4" style={{ color: colors.primaryDark }}>
                      What emotions did you feel? (Rate intensity 0-100%)
                    </label>
                    
                    {/* Quick emotion selection */}
                    <div className="mb-6">
                      <p className="text-sm text-gray-600 mb-3">Quick select common emotions:</p>
                      <div className="flex flex-wrap gap-2">
                        {commonEmotions.map((emotion, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              const newEmotions = [...thoughtRecord.emotions];
                              if (newEmotions[0].name === "") {
                                newEmotions[0].name = emotion;
                              } else {
                                newEmotions.push({ name: emotion, intensity: 50 });
                              }
                              setThoughtRecord(prev => ({ ...prev, emotions: newEmotions }));
                            }}
                            className="px-3 py-2 rounded-full text-sm border transition-all hover:scale-105"
                            style={{ 
                              borderColor: colors.primaryLight,
                              color: colors.primary,
                              background: 'rgba(255, 255, 255, 0.8)'
                            }}
                          >
                            {emotion}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Emotion inputs */}
                    {thoughtRecord.emotions.map((emotion, index) => (
                      <div key={index} className="flex gap-4 items-start mb-4 p-4 rounded-xl border border-gray-200">
                        <div className="flex-1">
                          <input
                            type="text"
                            value={emotion.name}
                            onChange={(e) => handleEmotionChange(index, 'name', e.target.value)}
                            placeholder="Emotion (e.g., Anxious, Sad, Angry)"
                            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent"
                            style={{ focusRingColor: colors.primary + '40' }}
                          />
                        </div>
                        <div className="w-48">
                          <label className="block text-sm text-gray-600 mb-2">
                            Intensity: {emotion.intensity}%
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={emotion.intensity}
                            onChange={(e) => handleEmotionChange(index, 'intensity', parseInt(e.target.value))}
                            className="w-full"
                          />
                        </div>
                        {thoughtRecord.emotions.length > 1 && (
                          <button
                            onClick={() => removeEmotion(index)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                          >
                            <ion-icon name="trash-outline"></ion-icon>
                          </button>
                        )}
                      </div>
                    ))}

                    <button
                      onClick={addEmotion}
                      className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-dashed border-gray-300 text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-all"
                    >
                      <ion-icon name="add-circle-outline"></ion-icon>
                      Add Another Emotion
                    </button>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: colors.primary }}>
                      {steps[2].title}
                    </h2>
                    <p className="text-gray-600">{steps[2].subtitle}</p>
                    <p className="text-sm text-gray-500 mt-2">{steps[2].description}</p>
                  </div>

                  <div className="max-w-3xl mx-auto">
                    <label className="block text-lg font-semibold mb-4" style={{ color: colors.primaryDark }}>
                      What automatic thoughts went through your mind? (Rate belief 0-100%)
                    </label>

                    {thoughtRecord.automaticThoughts.map((thought, index) => (
                      <div key={index} className="mb-6 p-4 rounded-xl border border-gray-200">
                        <textarea
                          value={thought.thought}
                          onChange={(e) => handleAutomaticThoughtChange(index, 'thought', e.target.value)}
                          placeholder="Example: I'm a failure and everyone thinks I'm incompetent..."
                          className="w-full h-24 p-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:border-transparent mb-4"
                          style={{ focusRingColor: colors.primary + '40' }}
                        />
                        <div className="flex items-center justify-between">
                          <label className="text-sm text-gray-600">
                            Belief in this thought: {thought.belief}%
                          </label>
                          <div className="flex items-center gap-4">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={thought.belief}
                              onChange={(e) => handleAutomaticThoughtChange(index, 'belief', parseInt(e.target.value))}
                              className="w-32"
                            />
                            {thoughtRecord.automaticThoughts.length > 1 && (
                              <button
                                onClick={() => removeAutomaticThought(index)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                              >
                                <ion-icon name="trash-outline"></ion-icon>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={addAutomaticThought}
                      className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-dashed border-gray-300 text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-all"
                    >
                      <ion-icon name="add-circle-outline"></ion-icon>
                      Add Another Thought
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Steps 3-6 follow similar patterns */}

              {currentStep === 6 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: colors.primary }}>
                      {steps[6].title}
                    </h2>
                    <p className="text-gray-600">{steps[6].subtitle}</p>
                    <p className="text-sm text-gray-500 mt-2">{steps[6].description}</p>
                  </div>

                  <div className="max-w-3xl mx-auto space-y-8">
                    {/* Outcome Emotions */}
                    <div>
                      <label className="block text-lg font-semibold mb-4" style={{ color: colors.primaryDark }}>
                        How do you feel now? (Rate intensity 0-100%)
                      </label>
                      {thoughtRecord.outcome.emotionsAfter.map((emotion, index) => (
                        <div key={index} className="flex gap-4 items-start mb-4 p-4 rounded-xl border border-gray-200">
                          <div className="flex-1">
                            <input
                              type="text"
                              value={emotion.name}
                              onChange={(e) => handleOutcomeEmotionChange(index, 'name', e.target.value)}
                              placeholder="Emotion (e.g., Calm, Hopeful, Relieved)"
                              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent"
                              style={{ focusRingColor: colors.primary + '40' }}
                            />
                          </div>
                          <div className="w-48">
                            <label className="block text-sm text-gray-600 mb-2">
                              Intensity: {emotion.intensity}%
                            </label>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={emotion.intensity}
                              onChange={(e) => handleOutcomeEmotionChange(index, 'intensity', parseInt(e.target.value))}
                              className="w-full"
                            />
                          </div>
                          {thoughtRecord.outcome.emotionsAfter.length > 1 && (
                            <button
                              onClick={() => removeOutcomeEmotion(index)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                            >
                              <ion-icon name="trash-outline"></ion-icon>
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={addOutcomeEmotion}
                        className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-dashed border-gray-300 text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-all"
                      >
                        <ion-icon name="add-circle-outline"></ion-icon>
                        Add Another Emotion
                      </button>
                    </div>

                    {/* Insights */}
                    <div>
                      <label className="block text-lg font-semibold mb-4" style={{ color: colors.primaryDark }}>
                        What insights did you gain from this exercise?
                      </label>
                      <textarea
                        value={thoughtRecord.outcome.insights}
                        onChange={(e) => handleOutcomeChange('insights', e.target.value)}
                        placeholder="Example: I realized that my automatic thoughts were exaggerated and that I have evidence of my competence..."
                        className="w-full h-32 p-4 border-2 border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:border-transparent"
                        style={{ 
                          focusBorderColor: colors.primary,
                          focusRingColor: colors.primary + '40'
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                disabled={currentStep === 0}
                className="px-6 py-3 rounded-full font-semibold border-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                style={{ 
                  borderColor: colors.primary,
                  color: colors.primary
                }}
              >
                <ion-icon name="arrow-back-outline"></ion-icon>
                Previous
              </button>

              {currentStep < steps.length - 1 ? (
                <button
                  onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
                  className="px-6 py-3 rounded-full font-semibold text-white flex items-center gap-2"
                  style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})` }}
                >
                  Next
                  <ion-icon name="arrow-forward-outline"></ion-icon>
                </button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={saveThoughtRecord}
                  disabled={saved || loading}
                  className="px-8 py-3 rounded-full font-semibold text-white text-lg disabled:opacity-50 flex items-center gap-2"
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
                      Saved!
                    </>
                  ) : (
                    <>
                      <ion-icon name="save-outline"></ion-icon>
                      Save Thought Record
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Cognitive Distortions Info */}
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
              className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16"
              style={{ color: colors.primary }}
            >
              Common Cognitive Distortions
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {cognitiveDistortions.map((distortion, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white rounded-3xl p-6 shadow-xl border border-opacity-20 backdrop-blur-sm h-full transform transition-all duration-500 hover:shadow-2xl"
                >
                  <h3 className="text-xl font-bold mb-3" style={{ color: colors.primary }}>
                    {distortion.name}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {distortion.description}
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-700 italic">
                      "{distortion.example}"
                    </p>
                  </div>
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

export default CBTThoughtRecord;