import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { createGlobalStyle } from 'styled-components';

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

// Cognitive Distortions Data
const cognitiveDistortions = [
  {
    value: "all-or-nothing",
    label: "All-or-Nothing Thinking",
    description: "Seeing things in black and white categories"
  },
  {
    value: "overgeneralization",
    label: "Overgeneralization",
    description: "Seeing a single negative event as a never-ending pattern"
  },
  {
    value: "mental-filter",
    label: "Mental Filter",
    description: "Picking out a single negative detail and dwelling on it"
  },
  {
    value: "catastrophizing",
    label: "Catastrophizing",
    description: "Expecting the worst-case scenario to happen"
  },
  {
    value: "should-statements",
    label: "\"Should\" Statements",
    description: "Trying to motivate yourself with 'shoulds' and 'musts'"
  },
  {
    value: "emotional-reasoning",
    label: "Emotional Reasoning",
    description: "Assuming that negative emotions reflect reality"
  },
  {
    value: "personalization",
    label: "Personalization",
    description: "Seeing yourself as the cause of negative external events"
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

const CBTThoughtReframing = () => {
  const navigate = useNavigate();
  const [thoughts, setThoughts] = useState([
    { 
      automaticThought: '', 
      cognitiveDistortion: '', 
      rationalResponse: '',
      emotion: '',
      intensity: 50
    }
  ]);

  const addThought = () => {
    setThoughts([...thoughts, { 
      automaticThought: '', 
      cognitiveDistortion: '', 
      rationalResponse: '',
      emotion: '',
      intensity: 50
    }]);
  };

  const updateThought = (index, field, value) => {
    const newThoughts = [...thoughts];
    newThoughts[index][field] = value;
    setThoughts(newThoughts);
  };

  const removeThought = (index) => {
    if (thoughts.length > 1) {
      const newThoughts = thoughts.filter((_, i) => i !== index);
      setThoughts(newThoughts);
    }
  };

  const saveProgress = () => {
    localStorage.setItem('cbt-thought-records', JSON.stringify(thoughts));
    alert('Progress saved successfully!');
  };

  const loadProgress = () => {
    const saved = localStorage.getItem('cbt-thought-records');
    if (saved) {
      setThoughts(JSON.parse(saved));
      alert('Progress loaded successfully!');
    }
  };

  return (
    <div className="font-[Poppins] min-h-screen flex flex-col overflow-hidden" style={{ color: colors.text }}>
      <GlobalStyles />
      
      {/* Floating Background Elements */}
      <FloatingShape top={15} left={8} size={70} delay={0} color1={colors.primary} color2={colors.secondary} />
      <FloatingShape top={75} left={88} size={90} delay={4} color1={colors.primaryLight} color2={colors.accent} />
      <FloatingShape top={35} left={82} size={50} delay={8} color1={colors.secondary} color2={colors.accent} />
      <FloatingShape top={85} left={12} size={80} delay={2} color1={colors.primaryDark} color2={colors.primaryLight} />
      
      <Navbar />
      
      <main className="flex-grow py-8">
        {/* Header Section */}
        <section className="relative overflow-hidden py-12">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
             

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-shine">
                Thought Reframing Exercise
              </h1>
              
              <div className="w-24 h-1 bg-gradient-to-r from-[#6F4F28] to-[#8B6A42] rounded-full mx-auto mb-6"></div>

              <p className="text-xl sm:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Identify automatic negative thoughts and reframe them with balanced, rational thinking
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true }}
          className="py-8"
        >
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            {/* Action Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4 justify-center mb-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={saveProgress}
                className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3"
                style={{ 
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`,
                  color: 'white'
                }}
              >
                <ion-icon name="save"></ion-icon>
                Save Progress
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={loadProgress}
                className="px-6 py-3 rounded-xl font-semibold border-2 backdrop-blur-sm transition-all duration-300 flex items-center gap-3"
                style={{ 
                  borderColor: colors.primary,
                  color: colors.primary,
                  background: 'rgba(255, 255, 255, 0.8)'
                }}
              >
                <ion-icon name="download"></ion-icon>
                Load Progress
              </motion.button>
            </motion.div>

            {/* Thought Records */}
            <AnimatePresence>
              {thoughts.map((thought, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-8"
                >
                  <div className="bg-white rounded-3xl shadow-xl border border-[#6F4F28]/10 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#6F4F28] to-[#8B6A42] p-6 text-white">
                      <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-bold">Thought Record #{index + 1}</h3>
                        {thoughts.length > 1 && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeThought(index)}
                            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                          >
                            <ion-icon name="close" class="text-lg"></ion-icon>
                          </motion.button>
                        )}
                      </div>
                    </div>

                    {/* Form Content */}
                    <div className="p-6 space-y-6">
                      {/* Emotion and Intensity */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-group">
                          <label className="block text-lg font-semibold mb-3" style={{ color: colors.primary }}>
                            Primary Emotion
                          </label>
                          <input
                            type="text"
                            value={thought.emotion}
                            onChange={(e) => updateThought(index, 'emotion', e.target.value)}
                            placeholder="e.g., Anxiety, Sadness, Anger"
                            className="w-full px-4 py-3 rounded-xl border-2 border-[#6F4F28]/20 focus:border-[#6F4F28] focus:ring-2 focus:ring-[#6F4F28]/20 transition-all duration-300"
                          />
                        </div>

                        <div className="form-group">
                          <label className="block text-lg font-semibold mb-3" style={{ color: colors.primary }}>
                            Intensity: {thought.intensity}%
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={thought.intensity}
                            onChange={(e) => updateThought(index, 'intensity', parseInt(e.target.value))}
                            className="w-full h-3 bg-[#6F4F28]/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#6F4F28]"
                          />
                        </div>
                      </div>

                      {/* Automatic Thought */}
                      <div className="form-group">
                        <label className="block text-lg font-semibold mb-3" style={{ color: colors.primary }}>
                          Automatic Negative Thought
                        </label>
                        <textarea
                          value={thought.automaticThought}
                          onChange={(e) => updateThought(index, 'automaticThought', e.target.value)}
                          placeholder="What's going through your mind? What are you telling yourself?"
                          rows="4"
                          className="w-full px-4 py-3 rounded-xl border-2 border-[#6F4F28]/20 focus:border-[#6F4F28] focus:ring-2 focus:ring-[#6F4F28]/20 transition-all duration-300 resize-none"
                        />
                      </div>

                      {/* Cognitive Distortion */}
                      <div className="form-group">
                        <label className="block text-lg font-semibold mb-3" style={{ color: colors.primary }}>
                          Cognitive Distortion
                        </label>
                        <select
                          value={thought.cognitiveDistortion}
                          onChange={(e) => updateThought(index, 'cognitiveDistortion', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border-2 border-[#6F4F28]/20 focus:border-[#6F4F28] focus:ring-2 focus:ring-[#6F4F28]/20 transition-all duration-300 bg-white"
                        >
                          <option value="">Select the type of thinking error</option>
                          {cognitiveDistortions.map((distortion) => (
                            <option key={distortion.value} value={distortion.value}>
                              {distortion.label} - {distortion.description}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Rational Response */}
                      <div className="form-group">
                        <label className="block text-lg font-semibold mb-3" style={{ color: colors.primary }}>
                          Rational Response
                        </label>
                        <textarea
                          value={thought.rationalResponse}
                          onChange={(e) => updateThought(index, 'rationalResponse', e.target.value)}
                          placeholder="What's a more balanced way to think about this? What evidence supports this new perspective?"
                          rows="4"
                          className="w-full px-4 py-3 rounded-xl border-2 border-[#6F4F28]/20 focus:border-[#6F4F28] focus:ring-2 focus:ring-[#6F4F28]/20 transition-all duration-300 resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Add Thought Button */}
            <motion.div
              variants={itemVariants}
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={addThought}
                className="px-8 py-4 rounded-full font-semibold text-lg relative overflow-hidden group"
                style={{ 
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`,
                  color: 'white'
                }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  <ion-icon name="add-circle" class="text-xl"></ion-icon>
                  Add Another Thought Record
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              </motion.button>
            </motion.div>
          </div>
        </motion.section>

        {/* Tips Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true }}
          className="py-16"
          style={{ background: `linear-gradient(135deg, ${colors.primary}05, ${colors.accent}10)` }}
        >
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <motion.h2 
              variants={itemVariants}
              className="text-3xl sm:text-4xl font-bold text-center mb-12 text-shine"
            >
              Tips for Effective Thought Reframing
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: "🎯",
                  title: "Be Specific",
                  description: "Write down exact thoughts, not general feelings. The more specific you are, the easier it is to challenge them."
                },
                {
                  icon: "🔍",
                  title: "Look for Evidence",
                  description: "Ask yourself: What evidence supports this thought? What evidence contradicts it?"
                },
                {
                  icon: "💭",
                  title: "Consider Alternatives",
                  description: "What are other ways to look at this situation? How would someone else see it?"
                },
                {
                  icon: "⚖️",
                  title: "Find Balance",
                  description: "Aim for balanced thinking, not just positive thinking. The truth is usually somewhere in the middle."
                }
              ].map((tip, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-[#6F4F28]/10"
                >
                  <div className="text-3xl mb-4">{tip.icon}</div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: colors.primary }}>
                    {tip.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {tip.description}
                  </p>
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

export default CBTThoughtReframing;