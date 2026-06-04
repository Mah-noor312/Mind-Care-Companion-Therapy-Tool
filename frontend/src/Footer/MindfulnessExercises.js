import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MindfulnessExercises = () => {
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [activeExercise, setActiveExercise] = useState(null);
  const [exerciseInProgress, setExerciseInProgress] = useState(false);
  const navigate = useNavigate();

  const mentalHealthIssues = [
    { id: 'anxiety', name: "Anxiety", icon: "🧘‍♂️" },
    { id: 'depression', name: "Depression", icon: "🌧️" },
    { id: 'stress', name: "Stress", icon: "😫" },
    { id: 'sleeplessness', name: "Sleeplessness", icon: "🌙" },
    { id: 'focus', name: "Lack of Focus", icon: "🧠" },
    { id: 'anger', name: "Anger Management", icon: "🔥" },
  ];

  const exercisesByIssue = {
    anxiety: [
      {
        id: 'anxiety-1',
        title: "4-7-8 Breathing",
        duration: "5 min",
        level: "Beginner",
        description: "Calms the nervous system quickly",
        video: "https://www.youtube.com/embed/z6X5oEIg6Ak", // Working 4-7-8 breathing video
        image: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0",
        steps: [
          "Empty your lungs completely",
          "Breathe in quietly through your nose for 4 seconds",
          "Hold your breath for 7 seconds",
          "Exhale completely through your mouth for 8 seconds",
          "Repeat this cycle 4 times"
        ]
      }
    ],
    depression: [
      {
        id: 'depression-1',
        title: "Loving-Kindness Meditation",
        duration: "10 min",
        level: "Intermediate",
        description: "Cultivate compassion for yourself and others",
        video: "https://www.youtube.com/embed/sz7cpV7ERsM", // Working loving-kindness video
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
        steps: [
          "Sit comfortably and close your eyes",
          "Repeat positive phrases for yourself",
          "Extend these wishes to loved ones",
          "Include neutral people and difficult people",
          "Finally extend to all beings"
        ]
      },
      {
        id: 'depression-2',
        title: "Gratitude Journaling",
        duration: "5 min",
        level: "Beginner",
        description: "Focus on positive aspects of your life",
        video: "https://www.youtube.com/embed/WPPPFqsECz0", // Working gratitude video
        image: "https://images.unsplash.com/photo-1542435503-956c469947f6",
        steps: [
          "Write down 3 things you're grateful for",
          "Be specific and descriptive",
          "Reflect on why you're grateful",
          "Notice how your body feels",
          "Repeat daily"
        ]
      }
    ],
    focus: [
      {
        id: 'focus-1',
        title: "Mindful Focus Exercise",
        duration: "7 min",
        level: "Beginner",
        description: "Improve concentration and attention span",
        video: "https://www.youtube.com/embed/w6T02g5hnT4", // Working focus video
        image: "https://images.unsplash.com/photo-1511376777868-611b54f68947",
        steps: [
          "Choose an object to focus on",
          "Set a timer for 5 minutes",
          "Focus all attention on the object",
          "When mind wanders, gently return focus",
          "Increase duration over time"
        ]
      },
      {
        id: 'focus-2',
        title: "Pomodoro Technique",
        duration: "25 min",
        level: "Intermediate",
        description: "Time management for better focus",
        video: "https://www.youtube.com/embed/mNBmG24djoY", // Working pomodoro video
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
        steps: [
          "Set timer for 25 minutes",
          "Work with full focus",
          "Take 5 minute break",
          "Repeat 4 times",
          "Then take longer 15-30 minute break"
        ]
      }
    ],
    anger: [
      {
        id: 'anger-1',
        title: "Counting Breath Technique",
        duration: "3 min",
        level: "Beginner",
        description: "Cool down technique for anger",
        video: "https://www.youtube.com/embed/9mQ7kRJPt6U", // Working anger management video
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
        steps: [
          "Inhale deeply for 4 counts",
          "Hold for 4 counts",
          "Exhale for 8 counts",
          "Focus only on counting",
          "Repeat until calm"
        ]
      },
      {
        id: 'anger-2',
        title: "Progressive Muscle Relaxation",
        duration: "10 min",
        level: "Beginner",
        description: "Release tension from anger",
        video: "https://www.youtube.com/embed/1nZEdqcGVzo", // Working PMR video
        image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597",
        steps: [
          "Tense each muscle group for 5 seconds",
          "Release suddenly and feel the relaxation",
          "Move from feet to face progressively",
          "Focus on the contrast between tension and relaxation",
          "Breathe deeply throughout"
        ]
      }
    ],
    stress: [
      {
        id: 'stress-1',
        title: "Box Breathing",
        duration: "5 min",
        level: "Beginner",
        description: "Military technique for stress relief",
        video: "https://www.youtube.com/embed/tEmt1Znux58", // Working box breathing video
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a",
        steps: [
          "Inhale for 4 seconds",
          "Hold for 4 seconds",
          "Exhale for 4 seconds",
          "Hold for 4 seconds",
          "Repeat 5-10 cycles"
        ]
      }
    ],
    sleeplessness: [
      {
        id: 'sleep-1',
        title: "Body Scan Meditation",
        duration: "15 min",
        level: "Beginner",
        description: "Progressive relaxation for sleep",
        video: "https://www.youtube.com/embed/FVlmTkgiMY8",// Working body scan video
        image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2",
        steps: [
          "Lie down comfortably",
          "Start at toes and move upward",
          "Notice sensations without judgment",
          "Consciously relax each body part",
          "Finish with deep breaths"
        ]
      }
    ]
  };

  const startExercise = (exercise) => {
    setActiveExercise(exercise);
    setExerciseInProgress(true);
  };

  const stopExercise = () => {
    setExerciseInProgress(false);
    setActiveExercise(null);
  };

  const handleBackToMain = () => {
    setSelectedIssue(null);
    setExerciseInProgress(false);
    setActiveExercise(null);
  };

  const ExercisePlayer = ({ exercise }) => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      >
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-[#5A3921]">{exercise.title}</h2>
              <button 
                onClick={stopExercise}
                className="text-gray-500 hover:text-gray-700 text-2xl"
                aria-label="Close exercise"
              >
                ✕
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="aspect-w-16 aspect-h-9">
                  <iframe 
                    src={`${exercise.video}?autoplay=1&rel=0`}
                    className="w-full h-64 rounded-lg"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={`${exercise.title} video`}
                  ></iframe>
                </div>
                
                <img 
                  src={exercise.image} 
                  alt={exercise.title}
                  className="w-full h-auto rounded-lg object-cover"
                  loading="lazy"
                />
              </div>
              
              <div className="space-y-4">
                <div className="bg-[#F5F0E8] p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-lg">Exercise Details</h3>
                  <div className="flex gap-4 mb-2">
                    <span className="text-sm bg-[#E3D5CA] text-[#5A3921] px-2 py-1 rounded">
                      {exercise.duration}
                    </span>
                    <span className="text-sm bg-[#E3D5CA] text-[#5A3921] px-2 py-1 rounded">
                      {exercise.level}
                    </span>
                  </div>
                  <p className="text-[#5A3921]/90">{exercise.description}</p>
                </div>
                
                <div className="bg-[#F5F0E8] p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-lg">Step-by-Step Guide</h3>
                  <ol className="list-decimal pl-5 space-y-2">
                    {exercise.steps.map((step, i) => (
                      <li key={i} className="text-[#5A3921]/90">{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
              <button 
                onClick={stopExercise}
                className="bg-[#8B5A2B] text-white px-6 py-3 rounded-lg hover:bg-[#5A3921] transition-colors"
              >
                Finish Exercise
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#F5F0E8] text-[#5A3921] p-6 relative"
    >
      <div className="max-w-6xl mx-auto py-12">
        {exerciseInProgress ? (
          <ExercisePlayer exercise={activeExercise} />
        ) : selectedIssue ? (
          <div>
            <div className="flex items-center mb-8">
              <button 
                onClick={handleBackToMain}
                className="mr-4 bg-[#8B5A2B] text-white px-4 py-2 rounded-lg hover:bg-[#5A3921] transition-colors flex items-center"
              >
                ← All Categories
              </button>
              <h1 className="text-3xl md:text-4xl font-bold text-[#8B5A2B]">
                {mentalHealthIssues.find(i => i.id === selectedIssue).icon} 
                {mentalHealthIssues.find(i => i.id === selectedIssue).name} Exercises
              </h1>
            </div>
            
            <div className="grid gap-8">
              {exercisesByIssue[selectedIssue]?.map((exercise) => (
                <motion.div
                  key={exercise.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#8B5A2B]"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold mb-2 text-[#5A3921]">{exercise.title}</h2>
                      <div className="flex gap-4 mb-3">
                        <span className="text-sm bg-[#E3D5CA] text-[#5A3921] px-2 py-1 rounded">
                          {exercise.duration}
                        </span>
                        <span className="text-sm bg-[#E3D5CA] text-[#5A3921] px-2 py-1 rounded">
                          {exercise.level}
                        </span>
                      </div>
                      <p className="text-[#5A3921]/90 mb-4">{exercise.description}</p>
                      
                      <div className="mb-4">
                        <h3 className="font-medium mb-2">Key Steps:</h3>
                        <ul className="list-disc pl-5 space-y-1">
                          {exercise.steps.slice(0, 3).map((step, i) => (
                            <li key={i} className="text-sm">{step}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <button 
                        onClick={() => startExercise(exercise)}
                        className="bg-[#8B5A2B] text-white px-4 py-2 rounded-lg hover:bg-[#5A3921] transition-colors"
                      >
                        Start Exercise
                      </button>
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <img 
                        src={exercise.image} 
                        alt={exercise.title}
                        className="w-full h-48 object-cover rounded-lg"
                        loading="lazy"
                      />
                      <div className="aspect-w-16 aspect-h-9">
                        <iframe 
                          src={exercise.video}
                          className="w-full h-48 rounded-lg"
                          frameBorder="0"
                          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={`${exercise.title} preview`}
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-[#8B5A2B]">
                Mindfulness Exercises
              </h1>
              <button 
                onClick={() => navigate('/')}
                className="bg-[#8B5A2B] text-white px-4 py-2 rounded-lg hover:bg-[#5A3921] transition-colors"
              >
                ← Back to Home
              </button>
            </div>
            
            <div className="mb-10">
              <h2 className="text-2xl font-semibold mb-6 text-[#5A3921]">
                What would you like to work on today?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {mentalHealthIssues.map((issue) => (
                  <motion.button
                    key={issue.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedIssue(issue.id)}
                    className="bg-white p-6 rounded-lg shadow-sm border border-[#E3D5CA] hover:border-[#8B5A2B] transition-colors text-center flex flex-col items-center"
                  >
                    <span className="text-3xl mb-3">{issue.icon}</span>
                    <span className="font-medium">{issue.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-[#5A3921]">
                Recommended Exercises
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[
                  exercisesByIssue.anxiety[0],
                  exercisesByIssue.depression[0],
                  exercisesByIssue.focus[0],
                  exercisesByIssue.anger[0],
                  exercisesByIssue.stress[0],
                  exercisesByIssue.sleeplessness[0]
                ].map((exercise) => (
                  <motion.div
                    key={exercise.id}
                    whileHover={{ y: -5 }}
                    className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-[#8B5A2B] flex flex-col h-full"
                  >
                    <div className="aspect-w-16 aspect-h-9 mb-4">
                      <img 
                        src={exercise.image} 
                        alt={exercise.title}
                        className="w-full h-40 object-cover rounded-lg"
                        loading="lazy"
                      />
                    </div>
                    <h2 className="text-lg font-semibold mb-2 text-[#5A3921]">{exercise.title}</h2>
                    <div className="flex gap-3 mb-3">
                      <span className="text-xs bg-[#E3D5CA] text-[#5A3921] px-2 py-1 rounded">
                        {exercise.duration}
                      </span>
                      <span className="text-xs bg-[#E3D5CA] text-[#5A3921] px-2 py-1 rounded">
                        {exercise.level}
                      </span>
                    </div>
                    <p className="text-sm text-[#5A3921]/90 mb-4 flex-grow">{exercise.description}</p>
                    <button 
                      onClick={() => startExercise(exercise)}
                      className="bg-[#8B5A2B] text-white px-4 py-2 rounded-lg hover:bg-[#5A3921] transition-colors text-sm mt-auto"
                    >
                      Start Now
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MindfulnessExercises;