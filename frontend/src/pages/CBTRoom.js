import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createGlobalStyle } from "styled-components";
import { auth, db } from "../firebaseConfig";
import { collection, addDoc, query, where, getDocs, orderBy, serverTimestamp, doc, setDoc, getDoc } from "firebase/firestore";
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

  .morphing-element {
    animation: morph 8s ease-in-out infinite;
  }

  .floating-3d {
    animation: float 12s ease-in-out infinite;
  }

  @keyframes textShine {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  }

  .text-shine {
    background: linear-gradient(90deg, #6F4F28, #8B6A42, #A68863, #8B6A42, #6F4F28);
    background-size: 200% auto;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: textShine 3s linear infinite;
  }

  @keyframes breathe {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }

  .breathing-animation {
    animation: breathe 4s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }

  .pulse-animation {
    animation: pulse 2s ease-in-out infinite;
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

// Daily quotes
const dailyQuotes = [
  "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.",
  "It's okay to not be okay. What matters is that you don't give up.",
  "Every day is a new beginning. Take a deep breath and start again.",
  "You are stronger than you think, braver than you believe, and smarter than you know.",
  "Progress, not perfection. Small steps still move you forward.",
  "Your current situation is not your final destination. Better days are coming."
];

// Mood-specific CBT Questions
const moodSpecificQuestions = {
  happy: [
    "What made you feel happy today?",
    "How can you continue this positive feeling?",
    "What are you grateful for right now?",
    "How can you share your happiness with others?",
    "What positive qualities did you notice in yourself today?",
    "What made you smile or laugh recently?"
  ],
  neutral: [
    "What's currently on your mind?",
    "How are you feeling about your current situation?",
    "What would help you feel more engaged or motivated?",
    "What small change could improve your day?",
    "What are you looking forward to?",
    "How can you practice self-care today?"
  ],
  sad: [
    "What's causing you to feel sad?",
    "What comforting activities would help right now?",
    "Who can you reach out to for support?",
    "What would you tell a friend feeling this way?",
    "What small thing could lift your mood?",
    "What's one thing you're still grateful for?"
  ],
  anxious: [
    "What specific thoughts are making you anxious?",
    "What's the evidence for and against these worries?",
    "What's the worst that could happen and how would you cope?",
    "What's a more balanced way to view this situation?",
    "What can you control right now?",
    "What calming techniques have helped you before?"
  ],
  angry: [
    "What triggered your anger?",
    "What underlying need or value feels threatened?",
    "How can you express this feeling constructively?",
    "What would help you feel heard or understood?",
    "What's a healthier way to channel this energy?",
    "What can you learn from this situation?"
  ],
  tired: [
    "What's draining your energy?",
    "What would help you rest and recharge?",
    "What can you let go of or postpone?",
    "What small act of self-care can you do?",
    "What gives you energy when you feel drained?",
    "How can you be kinder to yourself right now?"
  ]
};

// Mood options
const moodOptions = [
  { emoji: "😊", label: "Happy", value: "happy" },
  { emoji: "😐", label: "Neutral", value: "neutral" },
  { emoji: "😔", label: "Sad", value: "sad" },
  { emoji: "😰", label: "Anxious", value: "anxious" },
  { emoji: "😡", label: "Angry", value: "angry" },
  { emoji: "😴", label: "Tired", value: "tired" }
];

// Mood-specific affirmations
const moodSpecificAffirmations = {
  happy: [
    "I deserve to feel happy and content.",
    "My joy radiates and inspires others.",
    "I attract positive energy and experiences.",
    "I am grateful for this moment of happiness.",
    "My happiness grows each day."
  ],
  neutral: [
    "I am exactly where I need to be.",
    "I accept myself in this moment.",
    "Peace and balance are within me.",
    "I am open to whatever comes my way.",
    "I trust the process of life."
  ],
  sad: [
    "It's okay to feel sad sometimes.",
    "This feeling is temporary and will pass.",
    "I am strong enough to handle this.",
    "I give myself permission to feel and heal.",
    "Better days are coming."
  ],
  anxious: [
    "I am safe in this moment.",
    "I can handle whatever comes my way.",
    "My anxiety does not control me.",
    "I breathe in calm and breathe out fear.",
    "I am stronger than my anxiety."
  ],
  angry: [
    "I acknowledge my anger without judgment.",
    "I can express my feelings constructively.",
    "My feelings are valid and important.",
    "I choose peace over conflict.",
    "I release what I cannot control."
  ],
  tired: [
    "I honor my need for rest.",
    "My body deserves care and compassion.",
    "It's okay to take things slow.",
    "I recharge my energy with self-care.",
    "I listen to what my body needs."
  ]
};

// Mood-specific breathing exercises
const moodSpecificBreathing = {
  happy: [
    { name: "Joyful Breathing", steps: ["Breathe in joy for 4 seconds", "Hold the happiness for 4 seconds", "Exhale positivity for 6 seconds", "Pause and smile for 2 seconds"], duration: 90, description: "Amplify your happy feelings" },
    { name: "Energy Flow", steps: ["Quick inhale for 2 seconds", "Powerful exhale for 3 seconds", "Repeat 10 times", "Feel the energy surge"], duration: 60, description: "Boost your positive energy" },
    { name: "Gratitude Breath", steps: ["Inhale gratitude for 5 seconds", "Hold appreciation for 3 seconds", "Exhale sharing for 6 seconds", "Receive goodness for 2 seconds"], duration: 100, description: "Deepen your grateful state" }
  ],
  neutral: [
    { name: "Balanced Breathing", steps: ["Equal inhale for 4 seconds", "Equal exhale for 4 seconds", "Smooth transition between breaths", "Maintain steady rhythm"], duration: 120, description: "Find your center and balance" },
    { name: "Mindful Awareness", steps: ["Notice your natural breath", "Observe without changing", "Follow the breath flow", "Return to awareness"], duration: 90, description: "Cultivate present moment awareness" },
    { name: "Grounding Breath", steps: ["Inhale stability for 4 seconds", "Feel grounded during hold", "Exhale release for 4 seconds", "Connect with the present"], duration: 100, description: "Anchor yourself in the now" }
  ],
  sad: [
    { name: "Comfort Breathing", steps: ["Gentle inhale for 4 seconds", "Hold comfort for 4 seconds", "Soothing exhale for 6 seconds", "Receive compassion for 2 seconds"], duration: 100, description: "Bring comfort to your heart" },
    { name: "Healing Rhythm", steps: ["Breathe in healing for 5 seconds", "Hold transformation for 3 seconds", "Release sadness for 6 seconds", "Make space for peace"], duration: 110, description: "Support your healing process" },
    { name: "Gentle Wave", steps: ["Soft inhale like a gentle wave", "Natural pause at the top", "Smooth exhale like receding water", "Peaceful rest between waves"], duration: 90, description: "Flow with gentle compassion" }
  ],
  anxious: [
    { name: "Calming Breath", steps: ["Slow inhale for 4 seconds", "Calm hold for 4 seconds", "Long exhale for 6 seconds", "Peaceful pause for 2 seconds"], duration: 120, description: "Activate relaxation response" },
    { name: "4-7-8 Anxiety Relief", steps: ["Inhale quietly for 4 seconds", "Hold breath for 7 seconds", "Exhale completely for 8 seconds", "Repeat calming cycle"], duration: 120, description: "Immediate anxiety reduction" },
    { name: "Safety Breathing", steps: ["Breathe in safety for 4 seconds", "Hold security for 4 seconds", "Release fear for 6 seconds", "Embrace peace for 2 seconds"], duration: 100, description: "Create feelings of safety" }
  ],
  angry: [
    { name: "Cooling Breath", steps: ["Inhale cooling energy for 4 seconds", "Hold transformation for 4 seconds", "Exhale heat and tension for 6 seconds", "Create space for clarity"], duration: 100, description: "Cool and transform anger" },
    { name: "Release Valve", steps: ["Quick powerful inhale for 2 seconds", "Strong controlled exhale for 4 seconds", "Release built-up tension", "Find inner stillness"], duration: 80, description: "Release anger safely" },
    { name: "Peaceful Channel", steps: ["Breathe in understanding for 4 seconds", "Hold compassion for 4 seconds", "Exhale reactivity for 6 seconds", "Choose peaceful response"], duration: 110, description: "Channel energy constructively" }
  ],
  tired: [
    { name: "Energizing Breath", steps: ["Quick sharp inhale for 2 seconds", "Brief powerful hold for 1 second", "Active exhale for 3 seconds", "Build energy with repetition"], duration: 80, description: "Boost energy and alertness" },
    { name: "Revitalizing Flow", steps: ["Deep energizing inhale for 4 seconds", "Hold vitality for 2 seconds", "Complete refreshing exhale for 4 seconds", "Feel renewed with each breath"], duration: 90, description: "Restore mental clarity" },
    { name: "Gentle Awakening", steps: ["Gradual inhale to awaken senses", "Gentle hold to center yourself", "Smooth exhale to release fatigue", "Progressive energy building"], duration: 100, description: "Gentle energy restoration" }
  ]
};

// Mood-specific writing prompts
const moodSpecificWriting = {
  happy: "What specific moments brought you joy today? How can you create more of these moments? What does this happiness teach you about yourself?",
  neutral: "What would help you feel more engaged or inspired? What small changes could bring more meaning to your day? What are you curious about exploring?",
  sad: "What comfort do you need right now? What would feel supportive? What small step could you take toward feeling better? What strength can you find in this moment?",
  anxious: "What's one thing within your control right now? What evidence suggests things might be okay? What calming thought can you hold onto?",
  angry: "What boundary needs to be honored? What constructive action can you take? What would help you feel heard and respected?",
  tired: "What rest do you truly need? What can you let go of today? What small act of self-care would feel nourishing?"
};

// CBT Tools Data
const cbtTools = [
  {
    icon: "💡",
    title: "Thought Reframing",
    description: "Identify and challenge negative thought patterns with guided exercises to develop healthier thinking habits.",
    gradient: "from-purple-100 to-blue-100",
    path: "/cbt/thought-reframing"
  },
  {
    icon: "📝",
    title: "Thought Record",
    description: "Track your thoughts, emotions, and behaviors to identify patterns and gain valuable insights.",
    gradient: "from-amber-100 to-orange-100",
    path: "/cbt/thought-record"
  },
  {
    icon: "📈",
    title: "Behavior Activation",
    description: "Engage in positive activities to improve mood and break negative cycles through structured planning.",
    gradient: "from-green-100 to-teal-100",
    path: "/cbt/behavior-activation"
  },
  {
    icon: "🛡️",
    title: "Coping Strategies",
    description: "Learn and practice effective coping mechanisms for managing stressful situations and emotions.",
    gradient: "from-pink-100 to-rose-100",
    path: "/cbt/coping-strategies"
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

const CBTRoom = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [dailyData, setDailyData] = useState({
    mood: "",
    cbtAnswers: [],
    breathingCompleted: false,
    positiveWriting: "",
    dailyAffirmation: "",
    timestamp: new Date().toISOString().split('T')[0]
  });
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentBreathingExercises, setCurrentBreathingExercises] = useState([]);
  const [currentWritingPrompt, setCurrentWritingPrompt] = useState("");
  const [breathingTime, setBreathingTime] = useState(0);
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [saved, setSaved] = useState(false);
  const [todaysEntry, setTodaysEntry] = useState(null);
  const [userProgress, setUserProgress] = useState([]);
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        loadTodaysEntry(currentUser.uid);
        loadUserProgress(currentUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let interval;
    if (isBreathingActive && breathingTime > 0) {
      interval = setInterval(() => {
        setBreathingTime(time => time - 1);
      }, 1000);
    } else if (breathingTime === 0 && isBreathingActive) {
      setIsBreathingActive(false);
      setDailyData(prev => ({ ...prev, breathingCompleted: true }));
    }
    return () => clearInterval(interval);
  }, [isBreathingActive, breathingTime]);

  // Update content when mood changes
  useEffect(() => {
    if (dailyData.mood) {
      const mood = dailyData.mood;
      const questions = moodSpecificQuestions[mood] || [];
      const breathing = moodSpecificBreathing[mood] || [];
      const writingPrompt = moodSpecificWriting[mood] || "";
      const affirmations = moodSpecificAffirmations[mood] || [];
      const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)] || "You are doing your best.";
      
      setCurrentQuestions(questions);
      setCurrentBreathingExercises(breathing);
      setCurrentWritingPrompt(writingPrompt);
      setDailyData(prev => ({ 
        ...prev, 
        cbtAnswers: Array(questions.length).fill(""),
        dailyAffirmation: randomAffirmation
      }));
    }
  }, [dailyData.mood]);

  const loadTodaysEntry = async (userId) => {
    try {
      const q = query(
        collection(db, "CBTRoom"),
        where("userId", "==", userId),
        where("timestamp", "==", today)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const entry = querySnapshot.docs[0].data();
        setTodaysEntry(entry);
        setDailyData(entry);
        
        // Also load the mood-specific content for existing entry
        if (entry.mood) {
          const mood = entry.mood;
          const questions = moodSpecificQuestions[mood] || [];
          const breathing = moodSpecificBreathing[mood] || [];
          const writingPrompt = moodSpecificWriting[mood] || "";
          
          setCurrentQuestions(questions);
          setCurrentBreathingExercises(breathing);
          setCurrentWritingPrompt(writingPrompt);
        }
      }
    } catch (error) {
      console.error("Error loading today's entry:", error);
    }
  };

  const loadUserProgress = async (userId) => {
    try {
      const q = query(
        collection(db, "CBTRoom"),
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

  const startBreathingExercise = (exercise) => {
    setBreathingTime(exercise.duration);
    setIsBreathingActive(true);
  };

  const handleMoodSelect = (mood) => {
    setDailyData(prev => ({ ...prev, mood }));
  };

  const handleCBTAnswer = (index, answer) => {
    const newAnswers = [...dailyData.cbtAnswers];
    newAnswers[index] = answer;
    setDailyData(prev => ({ ...prev, cbtAnswers: newAnswers }));
  };

  const handlePositiveWriting = (text) => {
    setDailyData(prev => ({ ...prev, positiveWriting: text }));
  };

  const saveDailyEntry = async () => {
    if (!user) {
      alert("Please sign in to save your progress");
      return;
    }

    setLoading(true);
    
    try {
      const entryData = {
        ...dailyData,
        userId: user.uid,
        userName: user.displayName || user.email,
        userEmail: user.email,
        timestamp: today,
        completedAt: serverTimestamp(),
        progress: getProgressStats().percentage,
        sessionDate: new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      };

      console.log("Saving data:", entryData);

      // Check if entry already exists for today
      const q = query(
        collection(db, "CBTRoom"),
        where("userId", "==", user.uid),
        where("timestamp", "==", today)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Create new entry
        await addDoc(collection(db, "CBTRoom"), entryData);
        console.log("New entry created");
      } else {
        // Update existing entry
        const docId = querySnapshot.docs[0].id;
        await setDoc(doc(db, "CBTRoom", docId), entryData, { merge: true });
        console.log("Existing entry updated");
      }

      // Also update user's mood history in their profile
      if (dailyData.mood) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);
          
          const moodEntry = { 
            date: today, 
            mood: dailyData.mood,
            sessionType: "CBTRoom"
          };
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const moodHistory = userData.moodHistory || [];
            
            // Check if mood entry already exists for today
            const existingMoodIndex = moodHistory.findIndex(entry => entry.date === today);
            
            if (existingMoodIndex >= 0) {
              moodHistory[existingMoodIndex] = moodEntry;
            } else {
              moodHistory.push(moodEntry);
            }
            
            await setDoc(userDocRef, { moodHistory }, { merge: true });
          } else {
            // Create user document if it doesn't exist
            await setDoc(userDocRef, {
              moodHistory: [moodEntry],
              name: user.displayName || user.email,
              email: user.email,
              joinDate: serverTimestamp()
            }, { merge: true });
          }
          console.log("Mood history updated");
        } catch (moodError) {
          console.error("Error updating mood history:", moodError);
          // Continue even if mood history update fails
        }
      }

      // Reload progress
      await loadUserProgress(user.uid);
      await loadTodaysEntry(user.uid);

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'fixed top-20 right-8 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50';
      successMsg.innerHTML = `
        <div class="flex items-center gap-2">
          <ion-icon name="checkmark-circle" class="text-xl"></ion-icon>
          <span>Daily CBT session saved successfully!</span>
        </div>
      `;
      document.body.appendChild(successMsg);
      
      setTimeout(() => {
        successMsg.remove();
      }, 3000);
      
    } catch (error) {
      console.error("Error saving daily entry:", error);
      console.error("Error details:", error.message);
      alert("Failed to save your progress. Please check your internet connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const sections = [
    {
      title: "🏠 Welcome",
      subtitle: "Start your daily mental health journey"
    },
    {
      title: "😊 Mood Check",
      subtitle: "How are you feeling today?"
    },
    {
      title: "💬 CBT Questions",
      subtitle: "Reflect on your thoughts and feelings"
    },
    {
      title: "🧘 Daily Workout",
      subtitle: "Calm your mind and uplift your spirit"
    },
    {
      title: "📊 Progress Summary",
      subtitle: "Review and save your daily entry"
    }
  ];

  const getProgressStats = () => {
    const completed = [
      dailyData.mood !== "",
      dailyData.cbtAnswers.some(answer => answer && answer.trim() !== ""),
      dailyData.breathingCompleted,
      dailyData.positiveWriting.trim() !== ""
    ].filter(Boolean).length;

    return {
      completed,
      total: 4,
      percentage: (completed / 4) * 100
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
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-shine">
            CBT Therapy Room
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Your personal space for cognitive behavioral therapy and daily mental wellness
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
                Your CBT Progress
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
                  <div className="text-sm text-gray-600">Total Sessions</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-orange-50">
                  <div className="text-2xl font-bold text-orange-600">{weeklyStats.averageProgress}%</div>
                  <div className="text-sm text-gray-600">Avg. Progress</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Progress Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 mb-8"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-opacity-20">
            <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
              <div className="flex-1 min-w-[200px]">
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span>Daily Progress</span>
                  <span>{progress.completed}/{progress.total} completed</span>
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
                {sections.map((section, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSection(index)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      currentSection === index 
                        ? 'text-white' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                    style={{
                      background: currentSection === index 
                        ? `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`
                        : 'rgba(255, 255, 255, 0.8)',
                      border: currentSection === index ? 'none' : `2px solid ${colors.primaryLight}`
                    }}
                  >
                    {section.title.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Section Content */}
            <div className="min-h-[400px]">
              {currentSection === 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-center py-8"
                >
                  <div className="text-6xl mb-6">🌅</div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: colors.primary }}>
                    Welcome to Your CBT Therapy Session
                  </h2>
                  <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                    {dailyQuotes[Math.floor(Math.random() * dailyQuotes.length)]}
                  </p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 max-w-2xl mx-auto">
                    <h3 className="font-semibold text-lg mb-3" style={{ color: colors.primaryDark }}>
                      Today's CBT Focus Areas:
                    </h3>
                    <ul className="text-left space-y-2 text-gray-700">
                      <li>• Check in with your current mood</li>
                      <li>• Reflect through guided CBT questions</li>
                      <li>• Practice breathing exercises</li>
                      <li>• Write positive thoughts</li>
                      <li>• Receive daily affirmation</li>
                    </ul>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentSection(1)}
                    className="mt-8 px-8 py-3 rounded-full font-semibold text-white"
                    style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})` }}
                  >
                    Start CBT Session
                  </motion.button>
                </motion.div>
              )}

              {currentSection === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="py-6"
                >
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-center" style={{ color: colors.primary }}>
                    How are you feeling today?
                  </h2>
                  <p className="text-gray-600 text-center mb-8">Select your current mood to personalize your session</p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-2xl mx-auto">
                    {moodOptions.map((mood) => (
                      <motion.button
                        key={mood.value}
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleMoodSelect(mood.value)}
                        className={`p-4 rounded-2xl border-2 transition-all ${
                          dailyData.mood === mood.value 
                            ? 'border-blue-500 bg-blue-50 transform scale-105' 
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className="text-3xl mb-2">{mood.emoji}</div>
                        <div className="font-medium text-sm">{mood.label}</div>
                      </motion.button>
                    ))}
                  </div>

                  {dailyData.mood && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center mt-8"
                    >
                      <p className="text-lg mb-4">
                        You're feeling <span className="font-semibold" style={{ color: colors.primary }}>
                          {moodOptions.find(m => m.value === dailyData.mood)?.label}
                        </span> today
                      </p>
                      <p className="text-gray-600 mb-4 text-sm">
                        Your session will be tailored to support this mood
                      </p>
                      <button
                        onClick={() => setCurrentSection(2)}
                        className="px-6 py-2 rounded-full font-semibold text-white text-sm"
                        style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})` }}
                      >
                        Continue to Personalized CBT Reflection
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {currentSection === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="py-6"
                >
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-center" style={{ color: colors.primary }}>
                    Personalized CBT Reflection
                  </h2>
                  <p className="text-gray-600 text-center mb-8">
                    {dailyData.mood ? `Questions tailored for when you're feeling ${dailyData.mood}` : "Reflect on these CBT questions"}
                  </p>
                  
                  <div className="space-y-6 max-w-3xl mx-auto">
                    {currentQuestions.map((question, index) => (
                      <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200">
                        <h3 className="font-semibold mb-3 text-lg flex items-start">
                          <span className="text-2xl mr-3 mt-1" style={{ color: colors.primary }}>•</span>
                          {question}
                        </h3>
                        <textarea
                          value={dailyData.cbtAnswers[index] || ""}
                          onChange={(e) => handleCBTAnswer(index, e.target.value)}
                          placeholder="Type your thoughts here..."
                          className="w-full h-24 p-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2"
                          style={{ focusBorderColor: colors.primary }}
                        />
                      </div>
                    ))}
                    {currentQuestions.length === 0 && dailyData.mood && (
                      <div className="text-center py-8 text-gray-500">
                        <p>Select your mood first to see personalized questions</p>
                      </div>
                    )}
                  </div>

                  <div className="text-center mt-8">
                    <button
                      onClick={() => setCurrentSection(3)}
                      className="px-6 py-2 rounded-full font-semibold text-white text-sm"
                      style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})` }}
                    >
                      Continue to Mind Workout
                    </button>
                  </div>
                </motion.div>
              )}

              {currentSection === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="py-6"
                >
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-center" style={{ color: colors.primary }}>
                    {dailyData.mood ? `${dailyData.mood.charAt(0).toUpperCase() + dailyData.mood.slice(1)}-Focused Mind Workout` : "Daily Mind Workout"}
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Breathing Exercise */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                      <h3 className="font-semibold text-xl mb-4 flex items-center">
                        <span className="text-2xl mr-3">🌬️</span>
                        Mood-Specific Breathing
                      </h3>
                      
                      {!isBreathingActive ? (
                        <div>
                          <p className="text-gray-600 mb-4">
                            {dailyData.mood ? `Breathing exercises for ${dailyData.mood} feelings` : "Choose a breathing technique:"}
                          </p>
                          <div className="space-y-3">
                            {currentBreathingExercises.map((exercise, index) => (
                              <motion.button
                                key={index}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => startBreathingExercise(exercise)}
                                disabled={dailyData.breathingCompleted}
                                className={`w-full p-4 rounded-xl text-left border-2 transition-all ${
                                  dailyData.breathingCompleted 
                                    ? 'bg-green-50 border-green-200' 
                                    : 'bg-white border-gray-200 hover:border-blue-300'
                                }`}
                              >
                                <div className="font-semibold">{exercise.name}</div>
                                <div className="text-sm text-gray-600 mt-1">
                                  {exercise.description}
                                </div>
                                <div className="text-xs text-gray-500 mt-2">
                                  {exercise.duration} seconds • {exercise.steps.join(' → ')}
                                </div>
                              </motion.button>
                            ))}
                            {currentBreathingExercises.length === 0 && (
                              <p className="text-gray-500 text-center py-4">Select your mood to see breathing exercises</p>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <div className="text-6xl breathing-animation mb-4">🌊</div>
                          <div className="text-3xl font-bold mb-4">{breathingTime}s</div>
                          <p className="text-gray-600">Breathe deeply and focus on the present moment</p>
                          <button
                            onClick={() => setIsBreathingActive(false)}
                            className="mt-4 px-4 py-2 rounded-full text-sm font-semibold border-2"
                            style={{ borderColor: colors.primary, color: colors.primary }}
                          >
                            Stop Exercise
                          </button>
                        </div>
                      )}

                      {dailyData.breathingCompleted && (
                        <div className="text-center text-green-600 font-semibold mt-4">
                          ✓ Breathing exercise completed!
                        </div>
                      )}
                    </div>

                    {/* Positive Writing */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                      <h3 className="font-semibold text-xl mb-4 flex items-center">
                        <span className="text-2xl mr-3">✨</span>
                        Mood-Specific Writing
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {currentWritingPrompt || "Write about something positive from today or something you're grateful for:"}
                      </p>
                      <textarea
                        value={dailyData.positiveWriting}
                        onChange={(e) => handlePositiveWriting(e.target.value)}
                        placeholder={currentWritingPrompt || "Today I'm grateful for..."}
                        className="w-full h-48 p-4 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2"
                        style={{ focusBorderColor: colors.primary }}
                      />
                    </div>
                  </div>

                  {/* Daily Affirmation */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mt-6 max-w-4xl mx-auto border border-purple-200">
                    <h3 className="font-semibold text-xl mb-3 text-center">🌞 Daily Affirmation</h3>
                    <p className="text-lg text-center italic text-gray-700">
                      "{dailyData.dailyAffirmation || "You are doing your best."}"
                    </p>
                    <div className="text-center mt-4">
                      <button
                        onClick={() => {
                          // Simple sound play
                          const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmUgBjiP1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmUgBjiP1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmUgBjiP1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmUgBjiP1/LMeSw=');
                          audio.play().catch(() => {/* Ignore errors */});
                        }}
                        className="px-4 py-2 rounded-full text-sm font-semibold border-2 flex items-center gap-2 mx-auto"
                        style={{ borderColor: colors.primary, color: colors.primary }}
                      >
                        <ion-icon name="volume-medium-outline"></ion-icon>
                        Play Calm Sound
                      </button>
                    </div>
                  </div>

                  <div className="text-center mt-8">
                    <button
                      onClick={() => setCurrentSection(4)}
                      className="px-6 py-2 rounded-full font-semibold text-white text-sm"
                      style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})` }}
                    >
                      Review and Save
                    </button>
                  </div>
                </motion.div>
              )}

              {currentSection === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="py-6"
                >
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-center" style={{ color: colors.primary }}>
                    CBT Session Summary
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                      <h3 className="font-semibold text-lg mb-4">Today's CBT Session</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span>Mood:</span>
                          <span className="font-semibold">
                            {dailyData.mood ? moodOptions.find(m => m.value === dailyData.mood)?.label : 'Not set'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>CBT Reflection:</span>
                          <span className="font-semibold">
                            {dailyData.cbtAnswers.filter(a => a && a.trim() !== '').length}/{currentQuestions.length}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Breathing Exercise:</span>
                          <span className="font-semibold">
                            {dailyData.breathingCompleted ? 'Completed' : 'Not completed'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Positive Writing:</span>
                          <span className="font-semibold">
                            {dailyData.positiveWriting ? 'Completed' : 'Not started'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Overall Progress:</span>
                          <span className="font-semibold">
                            {progress.percentage.toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                      <h3 className="font-semibold text-lg mb-4">Session History</h3>
                      <div className="space-y-3 max-h-40 overflow-y-auto">
                        {userProgress.slice(0, 5).map((entry, index) => (
                          <div key={entry.id || index} className="flex justify-between items-center text-sm">
                            <span>{entry.timestamp}</span>
                            <span className={`px-2 py-1 rounded-full ${
                              entry.progress > 75 ? 'bg-green-100 text-green-800' :
                              entry.progress > 50 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {entry.progress}%
                            </span>
                          </div>
                        ))}
                        {userProgress.length === 0 && (
                          <p className="text-gray-500 text-center">No previous sessions</p>
                        )}
                      </div>
                      <button
                        onClick={() => navigate('/profile')}
                        className="w-full mt-4 px-4 py-2 rounded-full text-sm font-semibold border-2 text-center"
                        style={{ borderColor: colors.primary, color: colors.primary }}
                      >
                        View Full History in Profile
                      </button>
                    </div>
                  </div>

                  <div className="text-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={saveDailyEntry}
                      disabled={saved || loading}
                      className="px-8 py-3 rounded-full font-semibold text-white text-lg mx-2 mb-4 disabled:opacity-50"
                      style={{ 
                        background: saved 
                          ? '#10B981' 
                          : `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`
                      }}
                    >
                      {loading ? 'Saving...' : saved ? '✓ Session Saved!' : 'Save CBT Session'}
                    </motion.button>
                    
                    <button
                      onClick={() => setCurrentSection(0)}
                      className="px-6 py-3 rounded-full font-semibold border-2 mx-2"
                      style={{ 
                        borderColor: colors.primary,
                        color: colors.primary,
                        background: 'rgba(255, 255, 255, 0.8)'
                      }}
                    >
                      Start New Session
                    </button>
                  </div>

                  {todaysEntry && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mt-6 max-w-2xl mx-auto"
                    >
                      <p className="text-blue-700 text-center">
                        ✓ You've already completed today's CBT session. You can update it or continue tomorrow.
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* CBT Tools Information */}
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
              CBT Techniques & Tools
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
              {cbtTools.map((tool, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="relative group cursor-pointer"
                  onClick={() => navigate(tool.path)}
                >
                  {/* Background Shape */}
                  <div className={`absolute inset-0 rounded-3xl transform transition-transform duration-500 group-hover:scale-105 bg-gradient-to-br ${tool.gradient} rotate-3`} />
                  
                  {/* Card Content */}
                  <div className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-opacity-20 backdrop-blur-sm h-full transform transition-all duration-500 group-hover:shadow-2xl">
                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {tool.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4" style={{ color: colors.primary }}>
                      {tool.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-6">
                      {tool.description}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-3 rounded-xl font-semibold transition-all duration-300 group-hover:shadow-lg text-sm sm:text-base"
                      style={{ 
                        background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`,
                        color: 'white'
                      }}
                    >
                      Learn More
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Quick Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-4xl mx-auto px-4 sm:px-6"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-opacity-20">
            <h3 className="font-semibold text-lg mb-4 text-center">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => navigate('/profile')}
                className="p-4 rounded-xl border-2 text-center hover:border-blue-300 transition-all"
                style={{ borderColor: colors.primaryLight }}
              >
                <div className="text-2xl mb-2">📈</div>
                <div className="text-sm font-medium">View Reports</div>
              </button>
              <button
                onClick={() => navigate('/Chatbot')}
                className="p-4 rounded-xl border-2 text-center hover:border-blue-300 transition-all"
                style={{ borderColor: colors.primaryLight }}
              >
                <div className="text-2xl mb-2">💬</div>
                <div className="text-sm font-medium">Talk to AI</div>
              </button>
              <button
                onClick={() => navigate('/Resources')}
                className="p-4 rounded-xl border-2 text-center hover:border-blue-300 transition-all"
                style={{ borderColor: colors.primaryLight }}
              >
                <div className="text-2xl mb-2">📚</div>
                <div className="text-sm font-medium">Resources</div>
              </button>
              <button
                onClick={() => window.location.reload()}
                className="p-4 rounded-xl border-2 text-center hover:border-blue-300 transition-all"
                style={{ borderColor: colors.primaryLight }}
              >
                <div className="text-2xl mb-2">🔄</div>
                <div className="text-sm font-medium">New Day</div>
              </button>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default CBTRoom;