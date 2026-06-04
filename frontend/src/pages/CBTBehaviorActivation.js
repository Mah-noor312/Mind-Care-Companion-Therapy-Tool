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

const CBTBehaviorActivation = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("planning");
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({
    title: "",
    category: "self-care",
    difficulty: 3,
    scheduledDate: new Date().toISOString().split('T')[0],
    scheduledTime: "09:00",
    duration: 30,
    importance: 3,
    pleasure: 3
  });
  const [moodTracking, setMoodTracking] = useState({
    beforeActivity: 5,
    afterActivity: 5,
    notes: "",
    obstacles: "",
    accomplishments: ""
  });
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userProgress, setUserProgress] = useState([]);

  // Activity categories with icons and colors
  const activityCategories = [
    { id: "self-care", name: "Self Care", icon: "💆‍♀️", color: "from-pink-500 to-rose-500" },
    { id: "social", name: "Social", icon: "👥", color: "from-blue-500 to-cyan-500" },
    { id: "physical", name: "Physical", icon: "💪", color: "from-green-500 to-emerald-500" },
    { id: "creative", name: "Creative", icon: "🎨", color: "from-purple-500 to-pink-500" },
    { id: "productive", name: "Productive", icon: "📊", color: "from-orange-500 to-red-500" },
    { id: "leisure", name: "Leisure", icon: "🎮", color: "from-teal-500 to-blue-500" },
    { id: "learning", name: "Learning", icon: "📚", color: "from-indigo-500 to-purple-500" },
    { id: "mindfulness", name: "Mindfulness", icon: "🧘‍♀️", color: "from-lime-500 to-green-500" }
  ];

  // Sample activity ideas for inspiration
  const activityIdeas = {
    "self-care": [
      "Take a relaxing bath",
      "Practice skincare routine",
      "Read a book for pleasure",
      "Listen to calming music",
      "Make a healthy meal",
      "Take a nap",
      "Do a facial massage",
      "Drink herbal tea mindfully"
    ],
    "social": [
      "Call a friend or family member",
      "Send a thoughtful message",
      "Join an online community",
      "Schedule a video call",
      "Write a letter to someone",
      "Participate in a group activity",
      "Share something positive online",
      "Compliment someone genuinely"
    ],
    "physical": [
      "10-minute stretching routine",
      "Go for a short walk outside",
      "Dance to favorite music",
      "Do 5 minutes of yoga",
      "Take the stairs instead of elevator",
      "Gentle morning exercises",
      "Evening relaxation stretches",
      "Stand up and stretch every hour"
    ],
    "creative": [
      "Draw or doodle for 10 minutes",
      "Write in a journal",
      "Take creative photos",
      "Color in an adult coloring book",
      "Write a poem or short story",
      "DIY a small craft project",
      "Rearrange room decor",
      "Try a new recipe"
    ],
    "productive": [
      "Organize one small area",
      "Pay a bill online",
      "Make a to-do list for tomorrow",
      "Clear email inbox for 10 minutes",
      "Water plants",
      "Prepare clothes for tomorrow",
      "Clean one surface in your home",
      "Update your calendar"
    ],
    "leisure": [
      "Watch an episode of favorite show",
      "Listen to a podcast",
      "Play a casual game",
      "Browse inspiring content online",
      "Listen to an audiobook",
      "Watch comedy clips",
      "Explore new music",
      "Look at art or photography online"
    ],
    "learning": [
      "Read an educational article",
      "Watch a documentary segment",
      "Learn 5 words in another language",
      "Explore a topic of interest online",
      "Watch a tutorial video",
      "Listen to an educational podcast",
      "Try a brain teaser or puzzle",
      "Research a historical event"
    ],
    "mindfulness": [
      "5-minute meditation",
      "Practice deep breathing",
      "Body scan relaxation",
      "Mindful tea drinking",
      "Gratitude journaling",
      "Nature observation",
      "Sensory awareness exercise",
      "Progressive muscle relaxation"
    ]
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        loadUserProgress(currentUser.uid);
        // Load today's activities
        loadTodaysActivities(currentUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const loadUserProgress = async (userId) => {
    try {
      const q = query(
        collection(db, "CBTBehaviorActivation"),
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

  const loadTodaysActivities = async (userId) => {
    const today = new Date().toISOString().split('T')[0];
    try {
      const q = query(
        collection(db, "CBTBehaviorActivation"),
        where("userId", "==", userId),
        where("timestamp", "==", today)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const todayData = querySnapshot.docs[0].data();
        setActivities(todayData.activities || []);
      }
    } catch (error) {
      console.error("Error loading today's activities:", error);
    }
  };

  const addActivity = () => {
    if (!newActivity.title.trim()) return;

    const activity = {
      id: Date.now().toString(),
      ...newActivity,
      completed: false,
      moodBefore: null,
      moodAfter: null,
      notes: "",
      createdAt: new Date().toISOString()
    };

    setActivities(prev => [...prev, activity]);
    setNewActivity({
      title: "",
      category: "self-care",
      difficulty: 3,
      scheduledDate: new Date().toISOString().split('T')[0],
      scheduledTime: "09:00",
      duration: 30,
      importance: 3,
      pleasure: 3
    });
  };

  const updateActivity = (id, updates) => {
    setActivities(prev => prev.map(activity => 
      activity.id === id ? { ...activity, ...updates } : activity
    ));
  };

  const deleteActivity = (id) => {
    setActivities(prev => prev.filter(activity => activity.id !== id));
  };

  const completeActivity = (activity) => {
    setSelectedActivity(activity);
    setMoodTracking({
      beforeActivity: 5,
      afterActivity: 5,
      notes: "",
      obstacles: "",
      accomplishments: ""
    });
  };

  const saveActivityCompletion = () => {
    if (!selectedActivity) return;

    updateActivity(selectedActivity.id, {
      completed: true,
      completedAt: new Date().toISOString(),
      moodBefore: moodTracking.beforeActivity,
      moodAfter: moodTracking.afterActivity,
      notes: moodTracking.notes,
      obstacles: moodTracking.obstacles,
      accomplishments: moodTracking.accomplishments
    });

    setSelectedActivity(null);
  };

  const saveDailyPlan = async () => {
    if (!user) {
      alert("Please sign in to save your activity plan");
      return;
    }

    setLoading(true);
    
    try {
      const planData = {
        activities: activities,
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
        progress: getProgressStats().percentage,
        completedActivities: activities.filter(a => a.completed).length,
        totalActivities: activities.length
      };

      // Check if entry already exists for today
      const q = query(
        collection(db, "CBTBehaviorActivation"),
        where("userId", "==", user.uid),
        where("timestamp", "==", planData.timestamp)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Create new entry
        await addDoc(collection(db, "CBTBehaviorActivation"), planData);
      } else {
        // Update existing entry
        const docId = querySnapshot.docs[0].id;
        await setDoc(doc(db, "CBTBehaviorActivation", docId), planData, { merge: true });
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
          <span>Activity plan saved successfully!</span>
        </div>
      `;
      document.body.appendChild(successMsg);
      
      setTimeout(() => {
        successMsg.remove();
      }, 3000);
      
    } catch (error) {
      console.error("Error saving activity plan:", error);
      alert("Failed to save your activity plan. Please check your internet connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const getProgressStats = () => {
    const completed = activities.filter(activity => activity.completed).length;
    const total = activities.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      completed,
      total,
      percentage
    };
  };

  const getWeeklyStats = () => {
    const last7Days = userProgress.slice(0, 7);
    const totalActivities = last7Days.reduce((acc, day) => acc + (day.totalActivities || 0), 0);
    const completedActivities = last7Days.reduce((acc, day) => acc + (day.completedActivities || 0), 0);
    const completionRate = totalActivities > 0 ? Math.round((completedActivities / totalActivities) * 100) : 0;

    // Calculate streak
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      if (userProgress.some(entry => entry.timestamp === dateStr && entry.completedActivities > 0)) {
        streak++;
      } else if (i === 0) {
        // Today - check if we have activities planned
        if (activities.length > 0) streak++;
      } else {
        break;
      }
    }

    return {
      totalActivities,
      completedActivities,
      completionRate,
      streak,
      activityDays: last7Days.filter(day => day.completedActivities > 0).length
    };
  };

  const progress = getProgressStats();
  const weeklyStats = getWeeklyStats();

  const getCategoryColor = (categoryId) => {
    const category = activityCategories.find(cat => cat.id === categoryId);
    return category ? category.color : "from-gray-500 to-gray-600";
  };

  const getCategoryIcon = (categoryId) => {
    const category = activityCategories.find(cat => cat.id === categoryId);
    return category ? category.icon : "📝";
  };

  const getDifficultyText = (difficulty) => {
    const levels = ["Very Easy", "Easy", "Moderate", "Challenging", "Very Challenging"];
    return levels[difficulty - 1] || "Moderate";
  };

  const getMoodEmoji = (mood) => {
    if (mood >= 9) return "😄";
    if (mood >= 7) return "😊";
    if (mood >= 5) return "😐";
    if (mood >= 3) return "😔";
    return "😢";
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
            Behavior Activation
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Break the cycle of depression and low motivation by scheduling meaningful activities
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
                Your Activity Progress
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-xl bg-blue-50">
                  <div className="text-2xl font-bold text-blue-600">{weeklyStats.streak}</div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-green-50">
                  <div className="text-2xl font-bold text-green-600">{weeklyStats.completedActivities}</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-purple-50">
                  <div className="text-2xl font-bold text-purple-600">{weeklyStats.completionRate}%</div>
                  <div className="text-sm text-gray-600">Completion Rate</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-orange-50">
                  <div className="text-2xl font-bold text-orange-600">{weeklyStats.activityDays}/7</div>
                  <div className="text-sm text-gray-600">Active Days</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-opacity-20">
            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-4 mb-8 border-b border-gray-200 pb-4">
              {[
                { id: "planning", name: "📝 Activity Planning", icon: "create-outline" },
                { id: "tracking", name: "📊 Progress Tracking", icon: "stats-chart-outline" },
                { id: "insights", name: "💡 Insights", icon: "bulb-outline" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                    activeTab === tab.id 
                      ? 'text-white transform scale-105' 
                      : 'text-gray-700 bg-white border border-gray-200 hover:border-gray-300'
                  }`}
                  style={{
                    background: activeTab === tab.id 
                      ? `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`
                      : undefined
                  }}
                >
                  <ion-icon name={tab.icon}></ion-icon>
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Today's Progress */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold" style={{ color: colors.primary }}>
                  Today's Activity Plan
                </h2>
                <div className="text-right">
                  <div className="text-2xl font-bold" style={{ color: colors.primary }}>
                    {progress.completed}/{progress.total}
                  </div>
                  <div className="text-sm text-gray-600">Activities Completed</div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                <div 
                  className="h-4 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${progress.percentage}%`,
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`
                  }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{progress.percentage}% Complete</span>
                <span>{progress.total} Activities Planned</span>
              </div>
            </div>

            {activeTab === "planning" && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="grid lg:grid-cols-2 gap-8"
              >
                {/* Activity Planning Form */}
                <div className="space-y-6">
                  <h3 className="text-lg font-bold" style={{ color: colors.primaryDark }}>
                    Add New Activity
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Activity Description
                      </label>
                      <input
                        type="text"
                        value={newActivity.title}
                        onChange={(e) => setNewActivity(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="What would you like to do?"
                        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent"
                        style={{ focusRingColor: colors.primary + '40' }}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category
                        </label>
                        <select
                          value={newActivity.category}
                          onChange={(e) => setNewActivity(prev => ({ ...prev, category: e.target.value }))}
                          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent"
                          style={{ focusRingColor: colors.primary + '40' }}
                        >
                          {activityCategories.map(category => (
                            <option key={category.id} value={category.id}>
                              {category.icon} {category.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Duration (minutes)
                        </label>
                        <input
                          type="number"
                          min="5"
                          max="240"
                          value={newActivity.duration}
                          onChange={(e) => setNewActivity(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent"
                          style={{ focusRingColor: colors.primary + '40' }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Scheduled Time
                        </label>
                        <input
                          type="time"
                          value={newActivity.scheduledTime}
                          onChange={(e) => setNewActivity(prev => ({ ...prev, scheduledTime: e.target.value }))}
                          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent"
                          style={{ focusRingColor: colors.primary + '40' }}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Difficulty (1-5)
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="5"
                          value={newActivity.difficulty}
                          onChange={(e) => setNewActivity(prev => ({ ...prev, difficulty: parseInt(e.target.value) }))}
                          className="w-full"
                        />
                        <div className="text-center text-sm text-gray-600">
                          {getDifficultyText(newActivity.difficulty)}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Importance (1-5)
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="5"
                          value={newActivity.importance}
                          onChange={(e) => setNewActivity(prev => ({ ...prev, importance: parseInt(e.target.value) }))}
                          className="w-full"
                        />
                        <div className="text-center text-sm text-gray-600">
                          {newActivity.importance}/5
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expected Pleasure (1-5)
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="5"
                          value={newActivity.pleasure}
                          onChange={(e) => setNewActivity(prev => ({ ...prev, pleasure: parseInt(e.target.value) }))}
                          className="w-full"
                        />
                        <div className="text-center text-sm text-gray-600">
                          {newActivity.pleasure}/5
                        </div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={addActivity}
                      className="w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2"
                      style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})` }}
                    >
                      <ion-icon name="add-circle-outline"></ion-icon>
                      Add to Today's Plan
                    </motion.button>
                  </div>

                  {/* Activity Ideas */}
                  <div className="mt-8">
                    <h4 className="font-semibold mb-3" style={{ color: colors.primaryDark }}>
                      Need inspiration? Try these:
                    </h4>
                    <div className="space-y-2">
                      {activityIdeas[newActivity.category]?.slice(0, 4).map((idea, index) => (
                        <button
                          key={index}
                          onClick={() => setNewActivity(prev => ({ ...prev, title: idea }))}
                          className="w-full text-left p-3 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors text-sm text-gray-700"
                        >
                          {idea}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Activities List */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold" style={{ color: colors.primaryDark }}>
                    Today's Activities ({activities.length})
                  </h3>

                  {activities.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <div className="text-4xl mb-4">📝</div>
                      <p>No activities planned for today.</p>
                      <p className="text-sm">Add some activities to get started!</p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {activities.map((activity) => (
                        <motion.div
                          key={activity.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            activity.completed 
                              ? 'border-green-200 bg-green-50' 
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-xl">{getCategoryIcon(activity.category)}</span>
                                <h4 className={`font-semibold ${activity.completed ? 'line-through text-gray-500' : ''}`}>
                                  {activity.title}
                                </h4>
                              </div>
                              
                              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                <span>⏱️ {activity.duration}min</span>
                                <span>🕐 {activity.scheduledTime}</span>
                                <span>⚡ {getDifficultyText(activity.difficulty)}</span>
                              </div>

                              <div className="flex items-center gap-4 text-xs">
                                <span>Importance: {activity.importance}/5</span>
                                <span>Pleasure: {activity.pleasure}/5</span>
                              </div>

                              {activity.completed && activity.moodBefore && activity.moodAfter && (
                                <div className="mt-2 text-xs text-gray-500">
                                  Mood: {getMoodEmoji(activity.moodBefore)} → {getMoodEmoji(activity.moodAfter)}
                                  {activity.notes && ` • ${activity.notes}`}
                                </div>
                              )}
                            </div>

                            <div className="flex items-center gap-2 ml-4">
                              {!activity.completed ? (
                                <button
                                  onClick={() => completeActivity(activity)}
                                  className="p-2 text-green-600 hover:bg-green-100 rounded-full transition-colors"
                                  title="Mark as completed"
                                >
                                  <ion-icon name="checkmark-circle-outline"></ion-icon>
                                </button>
                              ) : (
                                <button
                                  onClick={() => updateActivity(activity.id, { completed: false })}
                                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                                  title="Mark as not completed"
                                >
                                  <ion-icon name="refresh-outline"></ion-icon>
                                </button>
                              )}
                              <button
                                onClick={() => deleteActivity(activity.id)}
                                className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                                title="Delete activity"
                              >
                                <ion-icon name="trash-outline"></ion-icon>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {activities.length > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={saveDailyPlan}
                      disabled={loading || saved}
                      className="w-full py-3 rounded-xl font-semibold text-white disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
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
                          Plan Saved!
                        </>
                      ) : (
                        <>
                          <ion-icon name="save-outline"></ion-icon>
                          Save Today's Plan
                        </>
                      )}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === "tracking" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Weekly Overview */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h3 className="font-semibold mb-4" style={{ color: colors.primaryDark }}>
                      Weekly Activity Distribution
                    </h3>
                    <div className="space-y-3">
                      {activityCategories.map(category => {
                        const categoryActivities = activities.filter(a => a.category === category.id);
                        const completed = categoryActivities.filter(a => a.completed).length;
                        const total = categoryActivities.length;
                        
                        return total > 0 ? (
                          <div key={category.id} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="flex items-center gap-2">
                                {category.icon} {category.name}
                              </span>
                              <span>{completed}/{total}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="h-2 rounded-full transition-all duration-500"
                                style={{ 
                                  width: `${total > 0 ? (completed / total) * 100 : 0}%`,
                                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`
                                }}
                              />
                            </div>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h3 className="font-semibold mb-4" style={{ color: colors.primaryDark }}>
                      Mood Impact Analysis
                    </h3>
                    <div className="space-y-4">
                      {activities.filter(a => a.completed && a.moodBefore && a.moodAfter).map(activity => {
                        const moodChange = activity.moodAfter - activity.moodBefore;
                        return (
                          <div key={activity.id} className="flex items-center justify-between text-sm">
                            <span className="truncate flex-1">{activity.title}</span>
                            <div className="flex items-center gap-2">
                              <span>{getMoodEmoji(activity.moodBefore)}</span>
                              <span>→</span>
                              <span>{getMoodEmoji(activity.moodAfter)}</span>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                moodChange > 0 ? 'bg-green-100 text-green-800' :
                                moodChange < 0 ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {moodChange > 0 ? '+' : ''}{moodChange}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                      {activities.filter(a => a.completed && a.moodBefore && a.moodAfter).length === 0 && (
                        <p className="text-gray-500 text-center py-4">
                          Complete some activities with mood tracking to see insights
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Recent Activity History */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="font-semibold mb-4" style={{ color: colors.primaryDark }}>
                    Recent Activity History
                  </h3>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {userProgress.slice(0, 7).map((day, index) => (
                      <div key={day.id || index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                        <div>
                          <div className="font-medium">{day.sessionDate || day.timestamp}</div>
                          <div className="text-sm text-gray-600">
                            {day.completedActivities || 0} of {day.totalActivities || 0} activities completed
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                            day.progress >= 75 ? 'bg-green-100 text-green-800' :
                            day.progress >= 50 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {day.progress || 0}%
                          </div>
                        </div>
                      </div>
                    ))}
                    {userProgress.length === 0 && (
                      <p className="text-gray-500 text-center py-4">
                        No activity history yet. Start planning and completing activities!
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "insights" && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Behavior Activation Principles */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <ion-icon name="flash-outline"></ion-icon>
                      How Behavior Activation Works
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <ion-icon name="checkmark" class="text-blue-500 mt-0.5"></ion-icon>
                        <span>Activities create positive reinforcement cycles</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ion-icon name="checkmark" class="text-blue-500 mt-0.5"></ion-icon>
                        <span>Breaking inactivity patterns improves mood</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ion-icon name="checkmark" class="text-blue-500 mt-0.5"></ion-icon>
                        <span>Small, consistent actions build momentum</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ion-icon name="checkmark" class="text-blue-500 mt-0.5"></ion-icon>
                        <span>Success breeds motivation and confidence</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <ion-icon name="bulb-outline"></ion-icon>
                      Tips for Success
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <ion-icon name="star" class="text-green-500 mt-0.5"></ion-icon>
                        <span>Start small - even 5 minutes counts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ion-icon name="star" class="text-green-500 mt-0.5"></ion-icon>
                        <span>Focus on action, not perfection</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ion-icon name="star" class="text-green-500 mt-0.5"></ion-icon>
                        <span>Schedule activities like important appointments</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ion-icon name="star" class="text-green-500 mt-0.5"></ion-icon>
                        <span>Notice mood changes after activities</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Common Patterns */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="font-semibold mb-4" style={{ color: colors.primaryDark }}>
                    Understanding Your Patterns
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3 text-sm text-gray-700">Common Barriers</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• "I don't have enough energy"</li>
                        <li>• "It won't make me feel better"</li>
                        <li>• "I can't concentrate right now"</li>
                        <li>• "I'll do it later"</li>
                        <li>• "It's too overwhelming"</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3 text-sm text-gray-700">Helpful Responses</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• "Just start with 5 minutes"</li>
                        <li>• "Action often comes before motivation"</li>
                        <li>• "Break it into smaller steps"</li>
                        <li>• "Schedule it for a specific time"</li>
                        <li>• "Remember past successes"</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Activity Completion Modal */}
        {selectedActivity && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
            >
              <h3 className="text-xl font-bold mb-4" style={{ color: colors.primary }}>
                Complete Activity
              </h3>
              <p className="text-gray-600 mb-6">How was your experience with "{selectedActivity.title}"?</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mood Before Activity (1-10)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={moodTracking.beforeActivity}
                    onChange={(e) => setMoodTracking(prev => ({ ...prev, beforeActivity: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                  <div className="text-center text-sm text-gray-600">
                    {getMoodEmoji(moodTracking.beforeActivity)} {moodTracking.beforeActivity}/10
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mood After Activity (1-10)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={moodTracking.afterActivity}
                    onChange={(e) => setMoodTracking(prev => ({ ...prev, afterActivity: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                  <div className="text-center text-sm text-gray-600">
                    {getMoodEmoji(moodTracking.afterActivity)} {moodTracking.afterActivity}/10
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes & Reflections
                  </label>
                  <textarea
                    value={moodTracking.notes}
                    onChange={(e) => setMoodTracking(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="What did you notice during this activity?"
                    className="w-full h-20 p-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:border-transparent"
                    style={{ focusRingColor: colors.primary + '40' }}
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setSelectedActivity(null)}
                    className="flex-1 py-3 rounded-xl font-semibold border-2 text-gray-600 hover:bg-gray-50 transition-colors"
                    style={{ borderColor: colors.primaryLight }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveActivityCompletion}
                    className="flex-1 py-3 rounded-xl font-semibold text-white transition-colors"
                    style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})` }}
                  >
                    Save Completion
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CBTBehaviorActivation;