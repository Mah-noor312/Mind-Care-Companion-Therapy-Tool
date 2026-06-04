import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSend, FiCheckCircle, FiUser, FiMessageSquare, 
  FiPlus, FiTrash2, FiArrowDown, FiMoon, FiSun, FiX,
  FiMic, FiVolume2, FiHeart, FiSmile, FiStar
} from 'react-icons/fi';
import { BsStars, BsLightbulb, BsEmojiSmile, BsEmojiHeartEyes } from 'react-icons/bs';
import { GiBrain, GiMeditation, GiFlowerEmblem } from 'react-icons/gi';
import axios from 'axios';
import { saveChatSession, getChatHistory, clearChatHistory, deleteChatSession } from '../services/chatStorage';
import './Chatbot.css';

// Enhanced Sticker components with mental health themes
const Sticker = ({ type, size = 'medium' }) => {
  const stickerStyles = {
    small: { width: '40px', height: '40px' },
    medium: { width: '60px', height: '60px' },
    large: { width: '80px', height: '80px' }
  };

  const stickers = {
    welcome: {
      emoji: '👋',
      color: '#FFD700',
      text: 'Welcome!',
      gradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
    },
    heart: {
      emoji: '💖',
      color: '#FF6B6B',
      text: 'Sending love',
      gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)'
    },
    star: {
      emoji: '⭐',
      color: '#FFD93D',
      text: 'You\'re amazing!',
      gradient: 'linear-gradient(135deg, #FFD93D 0%, #FFB347 100%)'
    },
    brain: {
      emoji: '🧠',
      color: '#6BCF7F',
      text: 'Mindful thoughts',
      gradient: 'linear-gradient(135deg, #6BCF7F 0%, #4CAF50 100%)'
    },
    flower: {
      emoji: '🌸',
      color: '#FF9ED8',
      text: 'Growth & peace',
      gradient: 'linear-gradient(135deg, #FF9ED8 0%, #FF6B9D 100%)'
    },
    meditation: {
      emoji: '🧘',
      color: '#4ECDC4',
      text: 'Stay centered',
      gradient: 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)'
    },
    sparkle: {
      emoji: '✨',
      color: '#C8A2C8',
      text: 'Magical moments',
      gradient: 'linear-gradient(135deg, #C8A2C8 0%, #A267AC 100%)'
    },
    sun: {
      emoji: '☀️',
      color: '#FFA500',
      text: 'Bright days ahead',
      gradient: 'linear-gradient(135deg, #FFA500 0%, #FFD700 100%)'
    },
    moon: {
      emoji: '🌙',
      color: '#95B8D1',
      text: 'Peaceful nights',
      gradient: 'linear-gradient(135deg, #95B8D1 0%, #6A8DA8 100%)'
    },
    growth: {
      emoji: '🌱',
      color: '#7CB518',
      text: 'Personal growth',
      gradient: 'linear-gradient(135deg, #7CB518 0%, #5A8C2A 100%)'
    },
    calm: {
      emoji: '🌊',
      color: '#1E90FF',
      text: 'Stay calm',
      gradient: 'linear-gradient(135deg, #1E90FF 0%, #0077BE 100%)'
    },
    success: {
      emoji: '🎯',
      color: '#32CD32',
      text: 'Success!',
      gradient: 'linear-gradient(135deg, #32CD32 0%, #228B22 100%)'
    },
    support: {
      emoji: '🤝',
      color: '#FFA500',
      text: 'I\'m here for you',
      gradient: 'linear-gradient(135deg, #FFA500 0%, #FF8C00 100%)'
    },
    mind: {
      emoji: '💭',
      color: '#9C27B0',
      text: 'Deep thoughts',
      gradient: 'linear-gradient(135deg, #9C27B0 0%, #6A1B9A 100%)'
    },
    energy: {
      emoji: '⚡',
      color: '#FFD700',
      text: 'Boost energy',
      gradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
    },
    sleep: {
      emoji: '😴',
      color: '#95B8D1',
      text: 'Sweet dreams',
      gradient: 'linear-gradient(135deg, #95B8D1 0%, #6A8DA8 100%)'
    },
    anger: {
      emoji: '🌋',
      color: '#FF6B6B',
      text: 'Release anger',
      gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF5252 100%)'
    },
    tension: {
      emoji: '💆',
      color: '#4ECDC4',
      text: 'Relax tension',
      gradient: 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)'
    }
  };

  const sticker = stickers[type] || stickers.welcome;

  return (
    <motion.div 
      className="sticker"
      style={stickerStyles[size]}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
    >
      <div 
        className="sticker-emoji"
        style={{ background: sticker.gradient }}
      >
        {sticker.emoji}
      </div>
      {size !== 'small' && (
        <div className="sticker-text">{sticker.text}</div>
      )}
    </motion.div>
  );
};

const ReactionSticker = ({ reaction, onReaction }) => {
  const reactions = {
    like: { emoji: '👍', color: '#4CAF50', gradient: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)' },
    love: { emoji: '❤️', color: '#E91E63', gradient: 'linear-gradient(135deg, #E91E63 0%, #C2185B 100%)' },
    star: { emoji: '⭐', color: '#FFC107', gradient: 'linear-gradient(135deg, #FFC107 0%, #FF8C00 100%)' },
    flower: { emoji: '🌸', color: '#FF9ED8', gradient: 'linear-gradient(135deg, #FF9ED8 0%, #FF6B9D 100%)' },
    clap: { emoji: '👏', color: '#2196F3', gradient: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)' }
  };

  return (
    <motion.button
      className="reaction-sticker"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => onReaction(reaction)}
      style={{ background: reactions[reaction]?.gradient }}
    >
      {reactions[reaction]?.emoji}
    </motion.button>
  );
};

const MemoizedFollowUp = React.memo(({ followUp, onClick, isLoading }) => (
  <motion.button
    className={`follow-up-btn ${isLoading ? 'loading' : ''}`}
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    disabled={isLoading}
    aria-label={`Follow-up question: ${followUp.text || followUp}`}
  >
    <span className="follow-up-emoji">💭</span>
    {followUp.text || followUp}
    {isLoading && (
      <div className="follow-up-loader">
        <div className="typing-dot"></div>
        <div className="typing-dot"></div>
        <div className="typing-dot"></div>
      </div>
    )}
  </motion.button>
));

// Enhanced Message Bubble Component
const MessageBubble = ({ message, index, sticker, reactions, onReaction, showReactionPicker, setShowReactionPicker, speakMessage, isSpeaking, speechSupported, addReaction }) => {
  const wordCount = message.text.split(' ').length;
  const isLongResponse = wordCount > 5;
  
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: message.isUser ? 20 : -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`message ${message.isUser ? 'user' : 'bot'} ${message.isWelcome ? 'welcome' : ''} ${isLongResponse ? 'long-response' : 'short-response'}`}
    >
      <div className="message-icon">
        {message.isUser ? <FiUser /> : <FiMessageSquare />}
      </div>
      <div className="message-content">
        {/* API Response Badge for long responses */}
        {!message.isUser && isLongResponse && (
          <div className="api-badge">
            <BsStars className="api-badge-icon" />
            <span>Mind Care Response</span>
          </div>
        )}

        {/* Sticker for bot messages */}
        {!message.isUser && sticker && (
          <div className="message-sticker">
            <Sticker type={sticker} size="small" />
          </div>
        )}
        
        <div className="message-text">
          {message.text}
          
          {/* Reactions */}
          {reactions && reactions.length > 0 && (
            <div className="message-reactions">
              {reactions.map((reaction, idx) => (
                <span key={idx} className="reaction">
                  {reaction === 'like' && '👍'}
                  {reaction === 'love' && '❤️'}
                  {reaction === 'star' && '⭐'}
                  {reaction === 'flower' && '🌸'}
                  {reaction === 'clap' && '👏'}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="message-footer">
          <div className="message-timestamp">{message.timestamp}</div>
          <div className="message-actions">
            {!message.isUser && speechSupported && (
              <button 
                className="speak-button"
                onClick={() => speakMessage(message.text)}
                aria-label={isSpeaking ? "Stop speaking" : "Speak message"}
              >
                <FiVolume2 className={isSpeaking ? 'speaking' : ''} />
              </button>
            )}
            {!message.isUser && (
              <button 
                className="reaction-picker-trigger"
                onClick={() => setShowReactionPicker(showReactionPicker === index ? null : index)}
              >
                <BsEmojiSmile />
              </button>
            )}
          </div>
        </div>

        {/* Response Type Indicator */}
        {!message.isUser && (
          <div className="response-type">
            {isLongResponse ? (
              <div className="response-tag ai-response">
               
              </div>
            ) : (
              <div className="response-tag quick-response">
                <FiMessageSquare /> Quick Reply
              </div>
            )}
          </div>
        )}

        {/* Reaction Picker */}
        {showReactionPicker === index && (
          <motion.div 
            className="reaction-picker"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <ReactionSticker reaction="like" onReaction={(reaction) => addReaction(index, reaction)} />
            <ReactionSticker reaction="love" onReaction={(reaction) => addReaction(index, reaction)} />
            <ReactionSticker reaction="star" onReaction={(reaction) => addReaction(index, reaction)} />
            <ReactionSticker reaction="flower" onReaction={(reaction) => addReaction(index, reaction)} />
            <ReactionSticker reaction="clap" onReaction={(reaction) => addReaction(index, reaction)} />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const Chatbot = () => {
  // State management
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [showHistoryPanel, setShowHistoryPanel] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [followUps, setFollowUps] = useState([]);
  const [activeFollowUp, setActiveFollowUp] = useState(null);
  const [toast, setToast] = useState(null);
  
  // Enhanced states for stickers and reactions
  const [messageStickers, setMessageStickers] = useState({});
  const [messageReactions, setMessageReactions] = useState({});
  const [showReactionPicker, setShowReactionPicker] = useState(null);
  const [suggestionRotation, setSuggestionRotation] = useState(0);
  const [conversationContext, setConversationContext] = useState('general');
  
  // Voice recognition states
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Refs
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const recognitionRef = useRef(null);
  const speechSynthesisRef = useRef(null);

  // API configuration
  const API_BASE_URL = 'http://localhost:5000';

  // Dynamic suggestion sets for different mental health topics

  // Get sticker based on message content and intent - Enhanced for mental health
  const getStickerForMessage = useCallback((text, intentTag, isUser = false) => {
    if (isUser) return null;

    const lowerText = text.toLowerCase();
    
    // Enhanced mapping for mental health context
    const stickerMap = {
      greeting: 'welcome',
      welcome: 'welcome',
      love: 'heart',
      appreciation: 'star',
      mental_health: 'brain',
      mindfulness: 'meditation',
      meditation: 'meditation',
      growth: 'growth',
      calm: 'calm',
      success: 'success',
      sleep: 'sleep',
      energy: 'sun',
      support: 'support',
      thoughts: 'mind',
      anger: 'anger',
      tension: 'tension',
      stress: 'calm',
      breathing: 'calm',
      exercise: 'energy'
    };

    // Enhanced keyword-based fallback for mental health
    if (lowerText.includes('love') || lowerText.includes('care') || lowerText.includes('compassion')) {
      return 'heart';
    }
    if (lowerText.includes('amazing') || lowerText.includes('great') || lowerText.includes('excellent') || lowerText.includes('proud')) {
      return 'star';
    }
    if (lowerText.includes('growth') || lowerText.includes('progress') || lowerText.includes('improve') || lowerText.includes('healing')) {
      return 'growth';
    }
    if (lowerText.includes('calm') || lowerText.includes('peace') || lowerText.includes('relax') || lowerText.includes('breathe')) {
      return 'calm';
    }
    if (lowerText.includes('mindful') || lowerText.includes('meditation') || lowerText.includes('present')) {
      return 'meditation';
    }
    if (lowerText.includes('sleep') || lowerText.includes('rest') || lowerText.includes('night') || lowerText.includes('dream') || lowerText.includes('insomnia')) {
      return 'sleep';
    }
    if (lowerText.includes('energy') || lowerText.includes('morning') || lowerText.includes('day') || lowerText.includes('vital') || lowerText.includes('exercise')) {
      return 'energy';
    }
    if (lowerText.includes('support') || lowerText.includes('help') || lowerText.includes('here for you')) {
      return 'support';
    }
    if (lowerText.includes('think') || lowerText.includes('thought') || lowerText.includes('mind') || lowerText.includes('cognitive')) {
      return 'mind';
    }
    if (lowerText.includes('anxious') || lowerText.includes('stress') || lowerText.includes('worry') || lowerText.includes('overwhelmed')) {
      return 'calm';
    }
    if (lowerText.includes('sad') || lowerText.includes('depress') || lowerText.includes('low') || lowerText.includes('hopeless')) {
      return 'heart';
    }
    if (lowerText.includes('angry') || lowerText.includes('mad') || lowerText.includes('frustrated') || lowerText.includes('irritated')) {
      return 'anger';
    }
    if (lowerText.includes('tension') || lowerText.includes('tight') || lowerText.includes('stiff') || lowerText.includes('pressure')) {
      return 'tension';
    }

    return stickerMap[intentTag] || (Math.random() > 0.5 ? 'sparkle' : null);
  }, []);

  // Rotate suggestions every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSuggestionRotation(prev => (prev + 1) % 4);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Get current suggestions based on rotation and context


  // Generate response-based suggestions

  // Update suggestions when rotation changes or after response
  
  // Check if response should come from API (more than 5 words)
  const shouldUseAPI = useCallback((text) => {
    const wordCount = text.trim().split(/\s+/).length;
    return wordCount > 5;
  }, []);

  // Initialize speech recognition and synthesis
  useEffect(() => {
    // Check for speech recognition support
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setVoiceSupported(true);
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        showToast(`Voice recognition error: ${event.error}`, 'error');
      };

      recognitionRef.current.onend = () => {
        if (isListening) {
          setIsListening(false);
        }
      };
    }

    // Check for speech synthesis support
    if ('speechSynthesis' in window) {
      setSpeechSupported(true);
      speechSynthesisRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (speechSynthesisRef.current) {
        speechSynthesisRef.current.cancel();
      }
    };
  }, []);

  // Add reaction to message
  const addReaction = useCallback((messageIndex, reaction) => {
    setMessageReactions(prev => ({
      ...prev,
      [messageIndex]: [...(prev[messageIndex] || []), reaction]
    }));
    setShowReactionPicker(null);
    showToast('Reaction added! ✨', 'success');
  }, []);

  // Navigation to suggestions page
  const navigateToSuggestions = () => {
    const suggestionBtn = document.createElement("button");
    suggestionBtn.innerHTML = "💡 Go to Suggestions";
    suggestionBtn.style.position = "fixed";
    suggestionBtn.style.bottom = "80px";
    suggestionBtn.style.right = "20px";
    suggestionBtn.style.background = "linear-gradient(135deg, #dea75f 0%, #d18e2a 100%)";
    suggestionBtn.style.color = "#333";
    suggestionBtn.style.border = "none";
    suggestionBtn.style.padding = "12px 18px";
    suggestionBtn.style.borderRadius = "12px";
    suggestionBtn.style.fontWeight = "600";
    suggestionBtn.style.cursor = "move";
    suggestionBtn.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
    suggestionBtn.style.zIndex = "9999";
    suggestionBtn.style.userSelect = "none";

    let isDragging = false;
    let offsetX, offsetY;

    suggestionBtn.addEventListener("mousedown", (e) => {
      isDragging = true;
      offsetX = e.clientX - suggestionBtn.getBoundingClientRect().left;
      offsetY = e.clientY - suggestionBtn.getBoundingClientRect().top;
      suggestionBtn.style.transition = "none";
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      suggestionBtn.style.left = e.clientX - offsetX + "px";
      suggestionBtn.style.top = e.clientY - offsetY + "px";
      suggestionBtn.style.bottom = "auto";
      suggestionBtn.style.right = "auto";
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
      suggestionBtn.style.transition = "0.2s ease";
    });

    suggestionBtn.addEventListener("click", (e) => {
      if (!isDragging) {
        window.location.href = "/suggestions";
      }
    });

    document.body.appendChild(suggestionBtn);
  };

  // Initialize chat
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/chat/history`);
        if (response.data?.length > 0) {
          setChatHistory(response.data);
          response.data.forEach(session => {
            saveChatSession(session.messages, session.id, session.timestamp);
          });
        } else {
          setChatHistory(getChatHistory());
        }
        
        if (!activeSession && messages.length === 0) {
          setWelcomeMessage();
        }
      } catch (error) {
        console.error("Error loading history:", error);
        setChatHistory(getChatHistory());
        if (!activeSession && messages.length === 0) {
          setWelcomeMessage();
        }
      }
    };
    
    loadHistory();
  }, [activeSession, messages.length]);

  const setWelcomeMessage = () => {
    const welcomeMessage = {
      text: "Hello! I'm your MindCare assistant. How can I help you today? 🌟",
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isWelcome: true,
      sticker: 'welcome'
    };
    setMessages([welcomeMessage]);
    setMessageStickers({ 0: 'welcome' });
  };

  // Save messages to history
  useEffect(() => {
    const saveMessages = async () => {
      if (messages.length > 0 && !messages[messages.length - 1].isWelcome) {
        const sessionId = activeSession || Date.now().toString();
        const timestamp = new Date().toISOString();
        
        try {
          await axios.post(`${API_BASE_URL}/chat/save`, {
            sessionId,
            messages,
            timestamp
          });
        } catch (error) {
          console.error("Error saving to backend:", error);
        }
        
        saveChatSession(messages, sessionId, timestamp);
        
        if (!activeSession) {
          setActiveSession(sessionId);
        }
        
        setChatHistory(getChatHistory());
      }
    };
    
    saveMessages();
  }, [messages, activeSession]);

  // Dark mode toggle with localStorage persistence
  const toggleDarkMode = useCallback(() => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle('dark-mode', newMode);
    localStorage.setItem('darkMode', newMode.toString());
  }, [darkMode]);

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    if (savedMode) {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  // Scroll handling
  const scrollToBottom = useCallback((behavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
    setShowScrollButton(false);
  }, []);

  useEffect(() => {
    const container = messagesContainerRef.current;
    const handleScroll = () => {
      if (container) {
        const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
        setShowScrollButton(!isNearBottom);
      }
    };

    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    scrollToBottom('auto');
  }, [messages, scrollToBottom]);

  // Toast notifications
  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // Voice recognition handlers
  const toggleListening = useCallback(() => {
    if (!voiceSupported) {
      showToast("Voice recognition not supported in your browser", 'error');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error("Error starting voice recognition:", error);
        showToast("Error starting voice recognition", 'error');
      }
    }
  }, [isListening, voiceSupported, showToast]);

  // Speech synthesis handler
  const speakMessage = useCallback((text) => {
    if (!speechSupported) {
      showToast("Text-to-speech not supported in your browser", 'info');
      return;
    }

    if (isSpeaking) {
      speechSynthesisRef.current.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event);
      setIsSpeaking(false);
      showToast("Error speaking message", 'error');
    };

    speechSynthesisRef.current.speak(utterance);
    setIsSpeaking(true);
  }, [isSpeaking, speechSupported, showToast]);

  // Update suggestions based on conversation context
  
  // Enhanced Message handling with API condition and response-based suggestions
 // State to track current follow-up node
const [currentFollowUpNode, setCurrentFollowUpNode] = useState(null);

const handleSend = async (messageText, followUpObj = null) => {
  const textToSend = messageText || input;
  if (!textToSend.trim()) return;

  const userMessage = {
    text: textToSend,
    isUser: true,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  setMessages(prev => [...prev, userMessage]);
  setInput('');
  setIsTyping(true);
  setActiveFollowUp(null);

  try {
    let botMessage = null;

    if (followUpObj) {
      // === Handling clicked follow-up ===
      botMessage = {
        text: followUpObj.response,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        intentTag: followUpObj.intentTag || null
      };
      setMessages(prev => [...prev, botMessage]);

      // Update followUps to nested ones
      setFollowUps(followUpObj.follow_ups || []);
    } else {
      const wordCount = textToSend.trim().split(/\s+/).length;

      if (wordCount > 5) {
        // === API call ===
        const response = await axios.post(`${API_BASE_URL}/chat`, {
          message: textToSend,
          sessionId: activeSession || undefined
        });
        botMessage = {
          text: response.data.botResponse,
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          intentTag: response.data.intent_tag
        };
        setMessages(prev => [...prev, botMessage]);
        setFollowUps(response.data.follow_ups || []);
      } else {
        // === Python server / intents.json ===
        const response = await axios.post(`http://localhost:5001/chat`, { message: textToSend }, { timeout: 10000 });
        botMessage = {
          text: response.data.response || response.data.botResponse,
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          intentTag: response.data.intent_tag
        };
        setMessages(prev => [...prev, botMessage]);
        setFollowUps(response.data.follow_ups || []);
      }
    }

    // Stickers
    const stickerType = getStickerForMessage(botMessage.text, botMessage.intentTag);
    if (stickerType) {
      setMessageStickers(prev => ({ ...prev, [messages.length]: stickerType }));
    }

    

  } catch (error) {
    console.error(error);
  } finally {
    setIsTyping(false);
  }
};



  const handleFollowUp = async (followUp) => {
  // 1. Add user follow-up selection
  const userMessage = {
    text: followUp.text,
    isUser: true,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
  setMessages(prev => [...prev, userMessage]);
  setIsTyping(true);
  setActiveFollowUp(followUp.text);

  try {
    let botResponse = followUp.response;
    let newFollowUps = followUp.follow_ups || [];

    // 2. Use API only if follow-up has intentTag or follow_up_chain
    if (followUp.intentTag) {
      const response = await axios.post(`${API_BASE_URL}/chat/followup`, {
        message: followUp.text,
        intent_tag: followUp.intentTag,
        follow_up_chain: [...(followUp.follow_up_chain || []), followUp.text]
      }, { timeout: 10000 });

      botResponse = response.data.response || followUp.response;
      newFollowUps = response.data.follow_ups || newFollowUps;

      // Add sticker for API response
      const stickerType = getStickerForMessage(botResponse, response.data.intent_tag);
      if (stickerType) {
        setMessageStickers(prev => ({
          ...prev,
          [prev.length]: stickerType
        }));
      }
    } else {
      // Local sticker for intents.json response
      const stickerType = getStickerForMessage(botResponse, followUp.intentTag);
      if (stickerType) {
        setMessageStickers(prev => ({
          ...prev,
          [prev.length]: stickerType
        }));
      }
    }

    // 3. Add bot response message
    const botMessage = {
      text: botResponse,
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      intentTag: followUp.intentTag || null
    };
    setMessages(prev => [...prev, botMessage]);

    // 4. Update follow-ups to nested ones (or clear if none)
    if (newFollowUps.length > 0) {
      setFollowUps(newFollowUps.map(fu => ({
        ...fu,
        intentTag: followUp.intentTag || null
      })));
    } else {
      setFollowUps([]);
    }

    

  } catch (error) {
    console.error("❌ Error handling follow-up:", error);

    // Fallback message
    const fallbackMessage = {
      text: followUp.response || "I'm not sure how to respond to that.",
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, fallbackMessage]);
    setFollowUps([]);
  } finally {
    setIsTyping(false);
    setActiveFollowUp(null);
  }
};


  const handleQuickReply = (suggestion) => {
    setInput(suggestion);
  };

  const handleNewChat = async () => {
    if (messages.length > 1) {
      const sessionId = activeSession || Date.now().toString();
      try {
        await axios.post(`${API_BASE_URL}/chat/save`, {
          sessionId,
          messages,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        console.error("Error saving session:", error);
      }
      saveChatSession(messages, sessionId, new Date().toISOString());
    }
    
    const welcomeMessage = {
      text: "Hello! I'm your MindCare assistant. What would you like to talk about today? 🌟",
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isWelcome: true
    };
    
    setMessages([welcomeMessage]);
    setActiveSession(Date.now().toString());
    setFollowUps([]);
    setMessageStickers({ 0: 'welcome' });
    setMessageReactions({});
    setChatHistory(getChatHistory());
    
    // Reset to initial suggestions
    
  };

  const loadSession = async (sessionId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/chat/history/${sessionId}`);
      if (response.data) {
        setMessages(response.data.messages);
        setActiveSession(sessionId);
        setShowHistoryPanel(false);
        return;
      }
    } catch (error) {
      console.error("Error loading session:", error);
    }
    
    const session = chatHistory.find(s => s.id === sessionId);
    if (session) {
      setMessages(session.messages);
      setActiveSession(sessionId);
      setShowHistoryPanel(false);
    }
  };

  const deleteSession = async (sessionId, e) => {
    e.stopPropagation();
    try {
      await axios.delete(`${API_BASE_URL}/chat/history/${sessionId}`);
    } catch (error) {
      console.error("Error deleting session:", error);
    }
    
    deleteChatSession(sessionId);
    setChatHistory(getChatHistory());
    if (activeSession === sessionId) handleNewChat();
  };

  const clearAllHistory = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/chat/history`);
    } catch (error) {
      console.error("Error clearing history:", error);
    }
    
    clearChatHistory();
    setChatHistory([]);
    handleNewChat();
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const memoizedFollowUps = useMemo(() => (
    followUps.map((followUp, index) => (
      <MemoizedFollowUp
        key={index}
        followUp={followUp}
        onClick={() => handleFollowUp(followUp)}
        isLoading={activeFollowUp === followUp.text}
      />
    ))
  ), [followUps, activeFollowUp, handleFollowUp]);

  return (
    <div className={`mindcare-chatbot ${darkMode ? 'dark-mode' : ''} ${showHistoryPanel ? 'history-visible' : ''}`}>
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className={`toast ${toast.type}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="toast-emoji">
              {toast.type === 'success' ? '✅' : toast.type === 'error' ? '❌' : 'ℹ️'}
            </div>
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* History Sidebar */}
      <div className={`history-sidebar ${showHistoryPanel ? 'visible' : ''}`}>
        <div className="sidebar-header">
          <button className="new-chat-btn" onClick={handleNewChat}>
            <FiPlus /> New Chat 🌟
          </button>
          <button className="close-sidebar" onClick={() => setShowHistoryPanel(false)}>
            <FiX />
          </button>
        </div>
        <div className="history-list">
          {chatHistory.map(session => (
            <div 
              key={session.id} 
              className={`history-item ${activeSession === session.id ? 'active' : ''}`}
              onClick={() => loadSession(session.id)}
            >
              <div className="history-emoji">💭</div>
              <div className="history-content">
                <div className="history-title">
                  {session.messages.find(m => m.isUser)?.text || "New Conversation"}
                </div>
                <div className="history-date">
                  {formatDate(session.timestamp)}
                </div>
              </div>
              <button 
                className="delete-history" 
                onClick={(e) => deleteSession(session.id, e)}
              >
                <FiTrash2 />
              </button>
            </div>
          ))}
        </div>
        {chatHistory.length > 0 && (
          <div className="sidebar-footer">
            <button className="clear-history" onClick={clearAllHistory}>
              <FiTrash2 /> Clear All History 🗑️
            </button>
          </div>
        )}
      </div>

      {/* Main Chat Area */}
      <div className="main-chat-area">
        <div className="chat-header">
          <button 
            className="menu-btn"
            onClick={() => setShowHistoryPanel(!showHistoryPanel)}
            aria-label={showHistoryPanel ? "Close history" : "Open history"}
          >
            ☰
          </button>
          <div className="header-content">
            <div className="logo">
              <BsStars className="logo-icon" />
              <span>MindCare Chatbot</span>
              <GiBrain className="logo-brain" />
            </div>
            <div className="header-actions">
              <button 
                className="theme-toggle"
                onClick={toggleDarkMode}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <FiSun /> : <FiMoon />}
              </button>
              <div className="connection-status ready">
                <FiCheckCircle className="status-icon connected" />
                <span>Mind Care Ready 🧠</span>
              </div>
            </div>
          </div>
        </div>

        <div className="chat-container">
          <div className="messages-area" ref={messagesContainerRef}>
            <AnimatePresence>
              {messages.map((msg, i) => (
                <MessageBubble
                  key={i}
                  message={msg}
                  index={i}
                  sticker={messageStickers[i]}
                  reactions={messageReactions[i]}
                  onReaction={addReaction}
                  showReactionPicker={showReactionPicker}
                  setShowReactionPicker={setShowReactionPicker}
                  speakMessage={speakMessage}
                  isSpeaking={isSpeaking}
                  speechSupported={speechSupported}
                  addReaction={addReaction}
                />
              ))}
            </AnimatePresence>

            {/* Follow-up Questions */}
            {followUps.length > 0 && !isTyping && (
              <motion.div 
                className="follow-ups-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="follow-ups-title">
                  <GiFlowerEmblem className="follow-ups-icon" />
                  Continue exploring:
                </div>
                <div className="follow-ups-list">
                  {memoizedFollowUps}
                </div>
              </motion.div>
            )}

            {isTyping && (
              <motion.div
                className="typing-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="typing-sticker">
                  <Sticker type="brain" size="small" />
                </div>
                <div className="typing-text">MindCare AI is thinking</div>
                <div className="typing-dots">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {showScrollButton && (
            <button 
              className="scroll-to-bottom"
              onClick={() => scrollToBottom()}
              aria-label="Scroll to bottom"
            >
              <FiArrowDown />
            </button>
          )}

          <div className="input-area">
            <motion.div 
              className="input-wrapper"
              whileHover={{ boxShadow: '0 0 0 2px rgba(164, 113, 72, 0.2)' }}
            >
              {voiceSupported && (
                <button
                  className={`voice-button ${isListening ? 'listening' : ''}`}
                  onClick={toggleListening}
                  aria-label={isListening ? "Stop listening" : "Start voice input"}
                >
                  <FiMic />
                  {isListening && <div className="pulse-ring"></div>}
                </button>
              )}
              <input
                className="message-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Share your thoughts... 🌟"
                aria-label="Type your message"
              />
              <motion.button
                className="send-button"
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Send message"
              >
                {isTyping ? (
                  <div className="sending-loader"></div>
                ) : (
                  <FiSend />
                )}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Toggle Buttons */}
      <button 
        className={`sidebar-toggle history-toggle ${showHistoryPanel ? 'hidden' : ''}`}
        onClick={() => setShowHistoryPanel(true)}
        aria-label="Open chat history"
      >
        <BsStars />
      </button>

      <button 
        className="sidebar-toggle suggestions-toggle"
        onClick={navigateToSuggestions}
        aria-label="Open suggestions page"
      >
        <BsLightbulb />
      </button>
    </div>
  );
};

export default Chatbot;