import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  FiArrowLeft,
  FiBookmark,
  FiShare2,
  FiChevronRight,
  FiTrash2,
  FiPlus,
  FiX
} from 'react-icons/fi';
import { BsLightbulb, BsStars } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import './Suggestions.css';

const Suggestions = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({
    age: '',
    concern: '',
    duration: '',
    currentFeeling: '',
    severity: '',
    preference: ''
  });
  const [personalizedSuggestions, setPersonalizedSuggestions] = useState([]);
  const [savedSuggestions, setSavedSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  // Options data
  const ageOptions = ['Under 18', '18-24', '25-34', '35-44', '45-54', '55-64', '65+'];
  const concernOptions = ['Anger', 'Stress', 'Anxiety', 'Sadness', 'Sleep problems', 'Relationship issues', 'Other'];
  const durationOptions = {
    'Anger': ['Less than a day', 'Few days', 'Few weeks', 'Months', 'Years'],
    'Stress': ['Few days', 'Few weeks', 'Months', 'Years'],
    'Anxiety': ['Few days', 'Few weeks', 'Months', 'Years'],
    'Sadness': ['Few weeks', 'Months', 'Years'],
    'Sleep problems': ['Few days', 'Few weeks', 'Months', 'Years'],
    'Relationship issues': ['Few weeks', 'Months', 'Years'],
    'Other': ['Few days', 'Few weeks', 'Months', 'Years']
  };
  const feelingOptions = ['Feeling it now', 'Not now but often', 'Comes and goes', 'Not sure'];
  const severityOptions = [
    'Mild - can handle it',
    'Medium - affects daily life',
    'Strong - hard to manage',
    'Very strong - can\'t cope'
  ];

  // Initialize dark mode and saved suggestions
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialMode = savedMode !== null ? savedMode : systemPrefersDark;
    
    setDarkMode(initialMode);
    document.body.classList.toggle('dark-mode', initialMode);

    const loadedSuggestions = localStorage.getItem('savedSuggestions');
    if (loadedSuggestions) {
      try {
        const parsed = JSON.parse(loadedSuggestions);
        if (Array.isArray(parsed)) {
          setSavedSuggestions(parsed);
        }
      } catch (e) {
        console.error('Failed to parse saved suggestions', e);
      }
    }
  }, []);

  // Save suggestions to localStorage
  useEffect(() => {
    localStorage.setItem('savedSuggestions', JSON.stringify(savedSuggestions));
  }, [savedSuggestions]);

  // Toggle dark mode
  const toggleDarkMode = useCallback(() => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle('dark-mode', newMode);
    localStorage.setItem('darkMode', newMode.toString());
  }, [darkMode]);

  // Handle input change
  const handleInputChange = useCallback((field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  // Generate personalized suggestions based on user input
  const generateSuggestions = useCallback(() => {
    let suggestions = [];
    
    if (userData.preference === 'exercise') {
      switch(userData.concern) {
        case 'Anger':
          suggestions = [
            "Anger breathing: Breathe in for 4 seconds, hold for 7, breathe out for 8",
            "Quick exercise: Do 10 jumping jacks to release energy",
            "Write it down: Write what made you angry, then tear it up",
            "Cool down: Splash cold water on your face",
            "Muscle relaxation: Tighten then relax each muscle group"
          ];
          break;
        case 'Stress':
          suggestions = [
            "Quick stress relief: Breathe in 4s, hold 4s, out 4s",
            "Walk it out: 5-minute walk outside",
            "List making: Write down tasks in order of importance",
            "Stretch break: Do 3 simple stretches",
            "Gratitude: Think of 3 good things in your life"
          ];
          break;
        case 'Anxiety':
          suggestions = [
            "5-4-3-2-1 method: Name 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste",
            "Worry time: Set aside 10 minutes later to worry",
            "Grounding: Hold an ice cube in your hand",
            "Self-talk: Say 'This will pass' 3 times",
            "Tense and relax: Squeeze fists tight then release"
          ];
          break;
        case 'Sadness':
          suggestions = [
            "Small win: Do one easy task to feel accomplished",
            "Sunlight: Sit near a window for 10 minutes",
            "Kindness: Do something nice for someone",
            "Movement: Dance to one favorite song",
            "Memory: Look at old happy photos"
          ];
          break;
        case 'Sleep problems':
          suggestions = [
            "Wind down: Read a book for 15 minutes",
            "4-7-8 breathing: Breathe in 4s, hold 7s, out 8s",
            "Bedtime routine: Same sleep time every night",
            "Screen break: No phones 30 mins before bed",
            "Relaxing: Imagine walking in peaceful place"
          ];
          break;
        case 'Relationship issues':
          suggestions = [
            "Active listening: Repeat what you heard before responding",
            "Appreciation: Tell partner one thing you like about them",
            "Alone time: Spend 15 minutes doing something you enjoy",
            "Walk together: Go for short walk side by side",
            "Letter writing: Write feelings down instead of saying them"
          ];
          break;
        default:
          suggestions = [
            "Deep breathing: 5 slow breaths",
            "Stretching: Reach up high then touch toes",
            "Journal: Write how you feel in 3 sentences",
            "Music: Listen to calming song",
            "Nature: Look at something green"
          ];
      }
    } else {
      switch(userData.concern) {
        case 'Anger':
          suggestions = [
            "Consider: Chamomile tea (calming herb)",
            "Consider: Magnesium supplement (may help with irritability)",
            "Note: For frequent anger, consult doctor about options",
            "Avoid: Caffeine which can increase irritability",
            "Hydration: Drink enough water daily"
          ];
          break;
        case 'Stress':
          suggestions = [
            "Consider: L-theanine (found in green tea)",
            "Consider: Valerian root (natural relaxant)",
            "Consider: B-complex vitamins",
            "Helpful: Warm milk with turmeric before bed",
            "Avoid: Too much sugar and processed foods"
          ];
          break;
        case 'Anxiety':
          suggestions = [
            "Consider: Lavender oil (inhale or apply diluted)",
            "Consider: Passionflower tea",
            "Consider: Omega-3 supplements",
            "Helpful: Limit caffeine and alcohol",
            "Note: For ongoing anxiety, see a doctor"
          ];
          break;
        case 'Sadness':
          suggestions = [
            "Consider: St. John's Wort (check for interactions)",
            "Consider: SAM-e supplement",
            "Consider: Vitamin D (if low sunlight exposure)",
            "Helpful: Balanced meals with protein",
            "Important: If sadness lasts weeks, see doctor"
          ];
          break;
        case 'Sleep problems':
          suggestions = [
            "Consider: Melatonin (short-term use)",
            "Consider: Magnesium before bed",
            "Consider: Warm milk with nutmeg",
            "Avoid: Screen time before bed",
            "Note: For ongoing sleep issues, consult doctor"
          ];
          break;
        case 'Relationship issues':
          suggestions = [
            "Consider: Chamomile tea before difficult talks",
            "Helpful: Stay hydrated to manage emotions",
            "Avoid: Alcohol during conflicts",
            "Consider: Omega-3s for mood support",
            "Important: Counseling can help with ongoing issues"
          ];
          break;
        default:
          suggestions = [
            "General: Stay hydrated and eat balanced meals",
            "Consider: Multivitamin if diet is poor",
            "Helpful: Limit caffeine and alcohol",
            "Consider: Herbal teas like chamomile",
            "Note: For ongoing issues, see healthcare provider"
          ];
      }
      
      suggestions.push("Remember: These are general suggestions only. Always consult with a doctor before starting any new medicine or supplement, especially if you take other medications or have health conditions.");
    }
    
    if (userData.duration.includes('day') || userData.duration.includes('week')) {
      suggestions.unshift("Quick help: Try this first for fast relief");
    } else if (userData.duration.includes('month') || userData.duration.includes('year')) {
      suggestions.unshift("Long-term help: This may work better over time");
    }
    
    if (userData.currentFeeling.includes('now')) {
      suggestions.unshift("Right now: Try this to feel calmer");
    }
    
    if (userData.severity.includes('Strong') || userData.severity.includes('Very strong')) {
      suggestions.unshift("Professional help may be best for this level. Consider talking to a doctor or counselor.");
    }
    
    setPersonalizedSuggestions(suggestions);
    
    const newSuggestion = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      concern: userData.concern,
      suggestions: suggestions,
      userData: {...userData}
    };
    
    setSavedSuggestions(prev => [newSuggestion, ...prev]);
    setActiveSuggestion(newSuggestion.id);
  }, [userData]);

  // Handle next step
  const handleNext = useCallback(() => {
    if (currentStep === 1 && !userData.age) return;
    if (currentStep === 2 && !userData.concern) return;
    if (currentStep === 3 && !userData.duration) return;
    if (currentStep === 4 && !userData.currentFeeling) return;
    if (currentStep === 5 && !userData.severity) return;
    if (currentStep === 6 && !userData.preference) return;
    
    setCurrentStep(prev => prev + 1);
    
    if (currentStep === 6) {
      generateSuggestions();
    }
  }, [currentStep, userData, generateSuggestions]);

  // Handle previous step
  const handlePrevious = useCallback(() => {
    setCurrentStep(prev => prev - 1);
  }, []);

  // Handle key press (Enter key)
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      handleNext();
    }
  }, [handleNext]);

  // Add event listener for Enter key
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  // Reset the questionnaire
  const startOver = useCallback(() => {
    setCurrentStep(1);
    setUserData({
      age: '',
      concern: '',
      duration: '',
      currentFeeling: '',
      severity: '',
      preference: ''
    });
    setPersonalizedSuggestions([]);
  }, []);

  // Start a new suggestion session
  const startNewSession = useCallback(() => {
    startOver();
    setActiveSuggestion(null);
  }, [startOver]);

  // Delete a saved suggestion
  const deleteSuggestion = useCallback((id) => {
    setSavedSuggestions(prev => prev.filter(item => item.id !== id));
    if (activeSuggestion === id) {
      setActiveSuggestion(null);
      startOver();
    }
  }, [activeSuggestion, startOver]);

  // Load a saved suggestion
  const loadSuggestion = useCallback((suggestion) => {
    setUserData(suggestion.userData);
    setPersonalizedSuggestions(suggestion.suggestions);
    setCurrentStep(7);
    setActiveSuggestion(suggestion.id);
    setShowHistory(false);
  }, []);

  return (
    <div className={`suggestions-page ${darkMode ? 'dark-mode' : ''}`}>
      <header className="suggestions-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FiArrowLeft />
        </button>
        <div className="header-content">
          <BsLightbulb className="header-icon" />
          <h1>MindCare Suggestions</h1>
        </div>
        <button 
          className="theme-toggle"
          onClick={toggleDarkMode}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>

      <div className="suggestions-main">
        <div className={`history-sidebar ${showHistory ? 'visible' : ''}`}>
          <div className="sidebar-header">
            <h3>Your Suggestions</h3>
            <div className="sidebar-header-buttons">
              <button 
                className="new-session-btn"
                onClick={startNewSession}
              >
                <FiPlus /> New
              </button>
              <button 
                className="close-sidebar-btn"
                onClick={() => setShowHistory(false)}
              >
                <FiX />
              </button>
            </div>
          </div>
          
          <div className="suggestion-history">
            {savedSuggestions.length === 0 ? (
              <p className="empty-history">No saved suggestions yet</p>
            ) : (
              savedSuggestions.map(suggestion => (
                <div 
                  key={suggestion.id}
                  className={`history-item ${activeSuggestion === suggestion.id ? 'active' : ''}`}
                  onClick={() => loadSuggestion(suggestion)}
                >
                  <div className="item-content">
                    <h4>{suggestion.concern || 'General'}</h4>
                    <p>{suggestion.date}</p>
                  </div>
                  <button 
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSuggestion(suggestion.id);
                    }}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="content-area">
          <button 
            className="history-toggle"
            onClick={() => setShowHistory(!showHistory)}
          >
            {showHistory ? 'Hide History' : 'Show History'}
          </button>
          
          <div className="questionnaire-container">
            {currentStep <= 6 ? (
              <>
                <div className="progress-bar">
                  <div 
                    className="progress" 
                    style={{ width: `${(currentStep / 6) * 100}%` }}
                  ></div>
                </div>
                
                <div className="question-step">
                  {currentStep === 1 && (
                    <div className="question">
                      <h2>First, tell us about yourself</h2>
                      <p>What is your age group?</p>
                      <div className="options-grid">
                        {ageOptions.map(age => (
                          <motion.button
                            key={age}
                            className={`option-btn ${userData.age === age ? 'selected' : ''}`}
                            onClick={() => handleInputChange('age', age)}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {age}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {currentStep === 2 && (
                    <div className="question">
                      <h2>What are you feeling?</h2>
                      <p>Select what matches how you feel</p>
                      <div className="options-grid">
                        {concernOptions.map(concern => (
                          <motion.button
                            key={concern}
                            className={`option-btn ${userData.concern === concern ? 'selected' : ''}`}
                            onClick={() => handleInputChange('concern', concern)}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {concern}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {currentStep === 3 && (
                    <div className="question">
                      <h2>How long have you felt this way?</h2>
                      <div className="options-grid">
                        {durationOptions[userData.concern]?.map(duration => (
                          <motion.button
                            key={duration}
                            className={`option-btn ${userData.duration === duration ? 'selected' : ''}`}
                            onClick={() => handleInputChange('duration', duration)}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {duration}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {currentStep === 4 && (
                    <div className="question">
                      <h2>Are you feeling this now?</h2>
                      <div className="options-grid">
                        {feelingOptions.map(feeling => (
                          <motion.button
                            key={feeling}
                            className={`option-btn ${userData.currentFeeling === feeling ? 'selected' : ''}`}
                            onClick={() => handleInputChange('currentFeeling', feeling)}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {feeling}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {currentStep === 5 && (
                    <div className="question">
                      <h2>How strong are these feelings?</h2>
                      <div className="options-grid">
                        {severityOptions.map(severity => (
                          <motion.button
                            key={severity}
                            className={`option-btn ${userData.severity === severity ? 'selected' : ''}`}
                            onClick={() => handleInputChange('severity', severity)}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {severity}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {currentStep === 6 && (
                    <div className="question">
                      <h2>What kind of help would you prefer?</h2>
                      <div className="options-grid">
                        <motion.button
                          className={`option-btn big-btn ${userData.preference === 'exercise' ? 'selected' : ''}`}
                          onClick={() => handleInputChange('preference', 'exercise')}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="preference-option">
                            <div className="preference-icon">💪</div>
                            <h3>Exercises & Activities</h3>
                            <p>Physical and mental exercises to help you feel better</p>
                          </div>
                        </motion.button>
                        
                        <motion.button
                          className={`option-btn big-btn ${userData.preference === 'medicine' ? 'selected' : ''}`}
                          onClick={() => handleInputChange('preference', 'medicine')}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="preference-option">
                            <div className="preference-icon">💊</div>
                            <h3>Medicine Options</h3>
                            <p>Common medicines and supplements that might help</p>
                          </div>
                        </motion.button>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="navigation-buttons">
                  {currentStep > 1 && (
                    <button className="nav-btn previous" onClick={handlePrevious}>
                      Back
                    </button>
                  )}
                  
                  <button 
                    className="nav-btn next" 
                    onClick={handleNext}
                    disabled={
                      (currentStep === 1 && !userData.age) ||
                      (currentStep === 2 && !userData.concern) ||
                      (currentStep === 3 && !userData.duration) ||
                      (currentStep === 4 && !userData.currentFeeling) ||
                      (currentStep === 5 && !userData.severity) ||
                      (currentStep === 6 && !userData.preference)
                    }
                  >
                    {currentStep === 6 ? 'Get Help' : 'Next'}
                    <FiChevronRight />
                  </button>
                </div>
              </>
            ) : (
              <div className="results-container">
                <div className="results-header">
                  <h2>Help Suggestions for You</h2>
                  <p>Based on your answers, here are some things that might help:</p>
                </div>
                
                <div className="personalized-suggestions">
                  {personalizedSuggestions.map((suggestion, index) => (
                    <motion.div 
                      key={index}
                      className="suggestion-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="card-content">
                        <BsStars className="card-icon" />
                        <h3>{suggestion}</h3>
                      </div>
                      <div className="card-actions">
                        <button className="action-btn">
                          <FiBookmark />
                        </button>
                        <button className="action-btn">
                          <FiShare2 />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="results-footer">
                  <button className="start-over-btn" onClick={startNewSession}>
                    Start Over
                  </button>
                  <p className="disclaimer">
                    Note: These are general suggestions only. For serious or ongoing issues, please consult a healthcare professional.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;