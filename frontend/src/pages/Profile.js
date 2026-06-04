import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { auth, db } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Color palette (same as Main)
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
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
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

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newMood, setNewMood] = useState({
    date: new Date().toISOString().split("T")[0],
    mood: "happy",
  });
  const [profilePicPreview, setProfilePicPreview] = useState("");
  const [cbtRecords, setCbtRecords] = useState([]);
  const [cbtLoading, setCbtLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("cbt");
  const [indexError, setIndexError] = useState("");

  const fetchUserData = useCallback(async () => {
    try {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        console.log("Auth state changed:", currentUser);
        if (currentUser) {
          const userData = {
            uid: currentUser.uid,
            name: currentUser.displayName || "User",
            email: currentUser.email,
            joinDate: new Date(currentUser.metadata.creationTime).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            lastSession: new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            moodHistory: [],
            profilePic: currentUser.photoURL || "",
          };
          
          setUser(userData);
          setProfilePicPreview(currentUser.photoURL || "");
          
          // Load additional user data from localStorage if exists
          const storedUserData = localStorage.getItem(`userData_${currentUser.uid}`);
          if (storedUserData) {
            const parsedData = JSON.parse(storedUserData);
            setUser(prev => ({ ...prev, ...parsedData }));
          }

          // Load CBT records
          await fetchCBTRecords(currentUser.uid);
        } else {
          setUser(null);
        }
        setIsLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setIsLoading(false);
    }
  }, []);

  const fetchCBTRecords = async (userId) => {
    try {
      setCbtLoading(true);
      setIndexError("");
      
      console.log("Fetching CBT records for user:", userId);
      
      // First, try the query with ordering (requires composite index)
      let q;
      try {
        q = query(
          collection(db, "CBTRoom"),
          where("userId", "==", userId),
          orderBy("timestamp", "desc")
        );
        
        const querySnapshot = await getDocs(q);
        console.log("Query with ordering successful, found:", querySnapshot.docs.length, "records");
        
        const records = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data
          };
        });
        
        setCbtRecords(records);
        
      } catch (orderingError) {
        console.log("Ordering query failed, trying without ordering:", orderingError);
        
        // If ordering fails, try without ordering
        q = query(
          collection(db, "CBTRoom"),
          where("userId", "==", userId)
        );
        
        const querySnapshot = await getDocs(q);
        console.log("Query without ordering successful, found:", querySnapshot.docs.length, "records");
        
        let records = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data
          };
        });
        
        // Sort manually by timestamp (descending)
        records.sort((a, b) => {
          if (!a.timestamp || !b.timestamp) return 0;
          return b.timestamp.localeCompare(a.timestamp);
        });
        
        setCbtRecords(records);
        
        // Set index error message to inform user
        if (orderingError.code === 'failed-precondition') {
          setIndexError("Database index is being created. Some features may be limited temporarily.");
        }
      }
      
    } catch (error) {
      console.error("Error loading CBT records:", error);
      console.error("Error details:", error.code, error.message);
      
      if (error.code === 'failed-precondition') {
        setIndexError("Please create the composite index in Firebase Console. Click the link in the error message.");
      } else {
        setIndexError(`Error loading records: ${error.message}`);
      }
    } finally {
      setCbtLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleRefreshCBTRecords = () => {
    if (user?.uid) {
      fetchCBTRecords(user.uid);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match("image.*")) {
        alert("Please select an image file (jpg, png, gif)");
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        alert("Image size should be less than 2MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfilePic = () => {
    setProfilePicPreview("");
    setUser((prev) => ({
      ...prev,
      profilePic: "",
    }));
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      profilePic: profilePicPreview,
      lastSession: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };

    setUser(updatedUser);
    
    // Save to localStorage
    if (user?.uid) {
      localStorage.setItem(`userData_${user.uid}`, JSON.stringify({
        moodHistory: updatedUser.moodHistory,
        profilePic: updatedUser.profilePic,
        lastSession: updatedUser.lastSession
      }));
    }
    
    setIsEditing(false);
    
    // Show success message with animation
    const successMsg = document.createElement('div');
    successMsg.className = 'fixed top-20 right-8 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 transform translate-x-0';
    successMsg.innerHTML = `
      <div class="flex items-center gap-2">
        <ion-icon name="checkmark-circle" class="text-xl"></ion-icon>
        <span>Profile updated successfully!</span>
      </div>
    `;
    document.body.appendChild(successMsg);
    
    setTimeout(() => {
      successMsg.remove();
    }, 3000);
  };

  const addMoodEntry = () => {
    if (!newMood.date || !newMood.mood) return;

    setUser((prev) => ({
      ...prev,
      moodHistory: [
        ...(prev.moodHistory || []),
        {
          date: newMood.date,
          mood: newMood.mood,
        },
      ],
    }));

    setNewMood({
      date: new Date().toISOString().split("T")[0],
      mood: "happy",
    });
  };

  const removeMoodEntry = (index) => {
    setUser((prev) => {
      const updatedHistory = [...prev.moodHistory];
      updatedHistory.splice(index, 1);
      return {
        ...prev,
        moodHistory: updatedHistory,
      };
    });
  };

  const getMoodColor = (mood) => {
    const moodColors = {
      happy: "from-green-400 to-emerald-500",
      neutral: "from-blue-400 to-cyan-500",
      sad: "from-gray-400 to-gray-500",
      anxious: "from-yellow-400 to-orange-500",
      angry: "from-red-400 to-rose-500"
    };
    return moodColors[mood] || "from-gray-400 to-gray-500";
  };

  const getMoodIcon = (mood) => {
    const moodIcons = {
      happy: "happy-outline",
      neutral: "remove-outline",
      sad: "sad-outline",
      anxious: "alert-circle-outline",
      angry: "flash-outline"
    };
    return moodIcons[mood] || "help-outline";
  };

  const getProgressColor = (progress) => {
    if (progress >= 75) return "bg-green-500";
    if (progress >= 50) return "bg-yellow-500";
    if (progress >= 25) return "bg-orange-500";
    return "bg-red-500";
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  const getWeeklyStats = () => {
    const last7Days = cbtRecords.slice(0, 7);
    const completedDays = last7Days.filter(entry => entry.progress > 50).length;
    const averageProgress = last7Days.reduce((acc, entry) => acc + (entry.progress || 0), 0) / last7Days.length || 0;

    return {
      completedDays,
      totalDays: last7Days.length,
      averageProgress: averageProgress.toFixed(0),
      streak: calculateStreak(cbtRecords)
    };
  };

  const calculateStreak = (records) => {
    if (records.length === 0) return 0;
    
    let streak = 0;
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    // Check if today's entry exists
    const hasToday = records.some(entry => entry.timestamp === todayStr);
    if (hasToday) streak = 1;
    
    // Check consecutive previous days
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      if (records.some(entry => entry.timestamp === dateStr)) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const weeklyStats = getWeeklyStats();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col overflow-hidden" style={{ background: 'linear-gradient(135deg, #fefaf6 0%, #f9f2ea 50%, #f5e9dd 100%)' }}>
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-16 h-16 border-4 border-t-transparent border-primary rounded-full animate-spin mx-auto mb-4" 
                 style={{ borderColor: `${colors.primary} transparent transparent transparent` }} />
            <h2 className="text-xl font-semibold" style={{ color: colors.primary }}>
              Loading Profile...
            </h2>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col overflow-hidden" style={{ background: 'linear-gradient(135deg, #fefaf6 0%, #f9f2ea 50%, #f5e9dd 100%)' }}>
        <Navbar />
        <div className="flex-grow flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto"
          >
            <div className="text-6xl mb-4" style={{ color: colors.primaryLight }}>
              <ion-icon name="warning-outline" />
            </div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: colors.primaryDark }}>
              Profile Not Found
            </h2>
            <p className="text-gray-600 mb-8">
              No user data available. Please log in to access your profile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/login")}
                className="px-6 py-3 rounded-full font-semibold text-white flex items-center justify-center gap-2"
                style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})` }}
              >
                <ion-icon name="log-in-outline" />
                Go to Login
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/")}
                className="px-6 py-3 rounded-full font-semibold border-2 backdrop-blur-sm flex items-center justify-center gap-2"
                style={{ 
                  borderColor: colors.primary,
                  color: colors.primary,
                  background: 'rgba(255, 255, 255, 0.8)'
                }}
              >
                <ion-icon name="home-outline" />
                Go to Home
              </motion.button>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col overflow-hidden" style={{ 
      background: 'linear-gradient(135deg, #fefaf6 0%, #f9f2ea 50%, #f5e9dd 100%)',
      color: colors.text 
    }}>
      {/* Floating Background Elements */}
      <FloatingShape top={10} left={5} size={60} delay={0} color1={colors.primary} color2={colors.secondary} />
      <FloatingShape top={80} left={90} size={80} delay={3} color1={colors.primaryLight} color2={colors.accent} />
      <FloatingShape top={40} left={85} size={45} delay={6} color1={colors.secondary} color2={colors.accent} />
      
      <Navbar />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-shine">
              Your Profile
            </h1>
            <p className="text-lg text-gray-600">
              Manage your personal information and track your mental wellness journey
            </p>
            
            {/* Index Error Message */}
            {indexError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl"
              >
                <div className="flex items-start gap-3">
                  <ion-icon name="warning" class="text-yellow-600 text-xl mt-0.5"></ion-icon>
                  <div>
                    <p className="text-yellow-800 font-medium">{indexError}</p>
                    <p className="text-yellow-700 text-sm mt-1">
                      This should resolve automatically once the index is created. You can refresh the page.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* CBT Progress Stats */}
          {cbtRecords.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-opacity-20">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold" style={{ color: colors.primary }}>
                    Your CBT Progress
                  </h3>
                  <button
                    onClick={handleRefreshCBTRecords}
                    className="px-3 py-1 rounded-full text-sm font-semibold border flex items-center gap-1"
                    style={{ 
                      borderColor: colors.primary,
                      color: colors.primary
                    }}
                  >
                    <ion-icon name="refresh-outline" />
                    Refresh
                  </button>
                </div>
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
                    <div className="text-2xl font-bold text-purple-600">{cbtRecords.length}</div>
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

          {/* Profile Card */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-3xl shadow-xl border border-opacity-20 backdrop-blur-sm overflow-hidden"
          >
            {/* Profile Header */}
            <motion.div
              variants={itemVariants}
              className="relative p-8 text-center border-b border-opacity-10"
              style={{ borderColor: colors.primary }}
            >
              <div className="absolute top-6 right-6">
                {!isEditing ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2 rounded-full font-semibold text-white flex items-center gap-2 text-sm"
                    style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})` }}
                  >
                    <ion-icon name="create-outline" />
                    Edit Profile
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setIsEditing(false);
                      setProfilePicPreview(user.profilePic || "");
                    }}
                    className="px-6 py-2 rounded-full font-semibold border-2 backdrop-blur-sm flex items-center gap-2 text-sm"
                    style={{ 
                      borderColor: colors.primary,
                      color: colors.primary,
                      background: 'rgba(255, 255, 255, 0.8)'
                    }}
                  >
                    <ion-icon name="close-outline" />
                    Cancel
                  </motion.button>
                )}
              </div>

              {/* Profile Picture */}
              <div className="flex flex-col items-center">
                {isEditing ? (
                  <div className="mb-6">
                    <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4" 
                         style={{ borderColor: colors.accent }}>
                      {profilePicPreview ? (
                        <img 
                          src={profilePicPreview} 
                          alt="Profile Preview" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100" 
                             style={{ color: colors.primaryLight }}>
                          <ion-icon name="person-circle-outline" size="large" />
                        </div>
                      )}
                    </div>
                    <div className="flex gap-3 justify-center">
                      <label className="px-4 py-2 rounded-full font-semibold text-white text-sm cursor-pointer flex items-center gap-2"
                             style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})` }}>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleProfilePicChange}
                          className="hidden"
                        />
                        <ion-icon name="cloud-upload-outline" />
                        {profilePicPreview ? "Change" : "Upload"}
                      </label>
                      {profilePicPreview && (
                        <button
                          onClick={removeProfilePic}
                          className="px-4 py-2 rounded-full font-semibold border text-sm flex items-center gap-2"
                          style={{ 
                            borderColor: colors.primary,
                            color: colors.primary
                          }}
                        >
                          <ion-icon name="trash-outline" />
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4" 
                       style={{ borderColor: colors.accent }}>
                    {user.profilePic ? (
                      <img 
                        src={user.profilePic} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100" 
                           style={{ color: colors.primaryLight }}>
                        <ion-icon name="person-circle-outline" size="large" />
                      </div>
                    )}
                  </div>
                )}

                {/* Name */}
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleInputChange}
                    className="text-2xl font-bold text-center mb-2 p-2 rounded-xl border-2 w-64 mx-auto"
                    style={{ 
                      borderColor: colors.primaryLight,
                      color: colors.primaryDark
                    }}
                  />
                ) : (
                  <h2 className="text-2xl font-bold mb-2" style={{ color: colors.primaryDark }}>
                    {user.name}
                  </h2>
                )}
                
                <p className="text-gray-500 flex items-center justify-center gap-2">
                  <ion-icon name="calendar-outline" />
                  Member since {user.joinDate}
                </p>
              </div>
            </motion.div>

            {/* Profile Details */}
            <motion.div variants={itemVariants} className="p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Account Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2" 
                      style={{ color: colors.primary }}>
                    <ion-icon name="person-circle-outline" />
                    Account Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-opacity-50"
                         style={{ background: `${colors.accent}20` }}>
                      <ion-icon name="mail-outline" style={{ color: colors.primary }} />
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={user.email}
                          onChange={handleInputChange}
                          className="flex-1 bg-transparent outline-none"
                          style={{ color: colors.text }}
                        />
                      ) : (
                        <span className="text-gray-700">{user.email}</span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-opacity-50"
                         style={{ background: `${colors.accent}20` }}>
                      <ion-icon name="time-outline" style={{ color: colors.primary }} />
                      <span className="text-gray-700">Last active: {user.lastSession}</span>
                    </div>
                  </div>

                  {/* CBT Sessions Quick Stats */}
                  <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2" 
                        style={{ color: colors.primary }}>
                      <ion-icon name="stats-chart-outline" />
                      Quick Stats
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 rounded-xl bg-blue-50">
                        <div className="text-2xl font-bold" style={{ color: colors.primary }}>
                          {cbtRecords.length}
                        </div>
                        <div className="text-sm text-gray-600">CBT Sessions</div>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-green-50">
                        <div className="text-2xl font-bold" style={{ color: colors.primary }}>
                          {weeklyStats.streak}
                        </div>
                        <div className="text-sm text-gray-600">Day Streak</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CBT Records & Mood History Tabs */}
                <div className="space-y-6">
                  {/* Tab Navigation */}
                  <div className="flex border-b border-gray-200">
                    <button
                      onClick={() => setActiveTab("cbt")}
                      className={`flex-1 py-3 font-semibold text-center transition-all ${
                        activeTab === "cbt" 
                          ? "border-b-2 text-white" 
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      style={{ 
                        borderBottomColor: activeTab === "cbt" ? colors.primary : 'transparent',
                        background: activeTab === "cbt" ? `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})` : 'transparent'
                      }}
                    >
                      CBT Sessions
                    </button>
                    <button
                      onClick={() => setActiveTab("mood")}
                      className={`flex-1 py-3 font-semibold text-center transition-all ${
                        activeTab === "mood" 
                          ? "border-b-2 text-white" 
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      style={{ 
                        borderBottomColor: activeTab === "mood" ? colors.primary : 'transparent',
                        background: activeTab === "mood" ? `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})` : 'transparent'
                      }}
                    >
                      Mood History
                    </button>
                  </div>

                  {/* CBT Records Tab */}
                  {activeTab === "cbt" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold" style={{ color: colors.primaryDark }}>
                          CBT Session History
                        </h4>
                        <div className="flex items-center gap-2">
                          <div className="px-3 py-1 rounded-full text-sm font-semibold text-white"
                               style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})` }}>
                            {cbtRecords.length} records
                          </div>
                          <button
                            onClick={handleRefreshCBTRecords}
                            className="p-1 rounded-full hover:bg-gray-100"
                            title="Refresh records"
                          >
                            <ion-icon name="refresh-outline" />
                          </button>
                        </div>
                      </div>

                      {cbtLoading ? (
                        <div className="text-center py-8">
                          <div className="w-8 h-8 border-2 border-t-transparent border-primary rounded-full animate-spin mx-auto mb-2" 
                               style={{ borderColor: `${colors.primary} transparent transparent transparent` }} />
                          <p className="text-gray-500">Loading CBT records...</p>
                        </div>
                      ) : cbtRecords.length > 0 ? (
                        <div className="space-y-3 max-h-80 overflow-y-auto">
                          {cbtRecords.map((record, index) => (
                            <motion.div
                              key={record.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="p-4 rounded-xl bg-white border border-opacity-20 shadow-sm"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-gray-700">
                                  {formatDate(record.timestamp)}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getMoodColor(record.mood)}`}>
                                  {record.mood?.charAt(0).toUpperCase() + record.mood?.slice(1) || 'No mood'}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">
                                  Progress: {record.progress?.toFixed(0) || 0}%
                                </span>
                                <div className="w-20 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full ${getProgressColor(record.progress)}`}
                                    style={{ width: `${record.progress || 0}%` }}
                                  />
                                </div>
                              </div>
                              {record.positiveWriting && (
                                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                  "{record.positiveWriting.substring(0, 100)}..."
                                </p>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <ion-icon name="document-text-outline" size="large" className="mb-2" />
                          <p>No CBT sessions recorded yet.</p>
                          <button
                            onClick={() => navigate("/cbt-room")}
                            className="mt-2 px-4 py-2 rounded-full text-sm font-semibold text-white"
                            style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})` }}
                          >
                            Start Your First Session
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Mood History Tab */}
                  {activeTab === "mood" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold" style={{ color: colors.primaryDark }}>
                          Mood History
                        </h4>
                        <div className="px-3 py-1 rounded-full text-sm font-semibold text-white"
                             style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})` }}>
                          {user.moodHistory?.length || 0} records
                        </div>
                      </div>

                      {/* Add Mood Form */}
                      {isEditing && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="bg-gray-50 rounded-2xl p-4 space-y-4"
                        >
                          <h4 className="font-semibold" style={{ color: colors.primaryDark }}>
                            Add New Mood Entry
                          </h4>
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              type="date"
                              value={newMood.date}
                              onChange={(e) => setNewMood({ ...newMood, date: e.target.value })}
                              className="p-2 rounded-xl border-2 text-sm"
                              style={{ borderColor: colors.primaryLight }}
                            />
                            <select
                              value={newMood.mood}
                              onChange={(e) => setNewMood({ ...newMood, mood: e.target.value })}
                              className="p-2 rounded-xl border-2 text-sm"
                              style={{ borderColor: colors.primaryLight }}
                            >
                              <option value="happy">Happy</option>
                              <option value="neutral">Neutral</option>
                              <option value="sad">Sad</option>
                              <option value="anxious">Anxious</option>
                              <option value="angry">Angry</option>
                            </select>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={addMoodEntry}
                            className="w-full py-2 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2"
                            style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})` }}
                          >
                            <ion-icon name="add-circle-outline" />
                            Add Mood
                          </motion.button>
                        </motion.div>
                      )}

                      {/* Mood History List */}
                      <div className="space-y-3 max-h-80 overflow-y-auto">
                        {user.moodHistory?.map((entry, index) => (
                          <motion.div
                            key={`${entry.date}-${index}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-between p-3 rounded-xl bg-white border border-opacity-20 shadow-sm"
                          >
                            <span className="font-medium text-gray-700">{entry.date}</span>
                            <div className="flex items-center gap-3">
                              {isEditing ? (
                                <select
                                  value={entry.mood}
                                  onChange={(e) => {
                                    const updatedHistory = [...user.moodHistory];
                                    updatedHistory[index].mood = e.target.value;
                                    setUser((prev) => ({
                                      ...prev,
                                      moodHistory: updatedHistory,
                                    }));
                                  }}
                                  className="text-sm p-1 rounded border"
                                  style={{ borderColor: colors.primaryLight }}
                                >
                                  <option value="happy">Happy</option>
                                  <option value="neutral">Neutral</option>
                                  <option value="sad">Sad</option>
                                  <option value="anxious">Anxious</option>
                                  <option value="angry">Angry</option>
                                </select>
                              ) : (
                                <span className={`px-3 py-1 rounded-full text-white text-sm font-medium bg-gradient-to-r ${getMoodColor(entry.mood)} flex items-center gap-1`}>
                                  <ion-icon name={getMoodIcon(entry.mood)} />
                                  {entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}
                                </span>
                              )}
                              {isEditing && (
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => removeMoodEntry(index)}
                                  className="p-1 rounded-full text-red-500 hover:bg-red-50"
                                >
                                  <ion-icon name="trash-outline" />
                                </motion.button>
                              )}
                            </div>
                          </motion.div>
                        ))}
                        
                        {(!user.moodHistory || user.moodHistory.length === 0) && (
                          <div className="text-center py-8 text-gray-500">
                            <ion-icon name="stats-chart-outline" size="large" className="mb-2" />
                            <p>No mood entries yet. Start tracking your mood!</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Save Button */}
              {isEditing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mt-8 pt-6 border-t border-opacity-10"
                  style={{ borderColor: colors.primary }}
                >
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    className="px-8 py-3 rounded-full font-semibold text-white text-lg flex items-center gap-2 mx-auto"
                    style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})` }}
                  >
                    <ion-icon name="save-outline" />
                    Save Changes
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/")}
              className="px-6 py-3 rounded-full font-semibold border-2 backdrop-blur-sm flex items-center gap-2 mx-auto"
              style={{ 
                borderColor: colors.primary,
                color: colors.primary,
                background: 'rgba(255, 255, 255, 0.8)'
              }}
            >
              <ion-icon name="arrow-back-outline" />
              Back to Home
            </motion.button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

Profile.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      user: PropTypes.object,
    }),
  }),
};

export default Profile;