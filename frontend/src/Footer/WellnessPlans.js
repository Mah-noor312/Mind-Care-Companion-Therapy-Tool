import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaCalendarAlt, 
  FaChartLine, 
  FaBook, 
  FaUsers, 
  FaTimes, 
  FaArrowRight, 
  FaCheck,
  FaHeart,
  FaLeaf,
  FaLaugh,
  FaComments,
  FaHome,
  FaArrowLeft
} from 'react-icons/fa';

const WellnessPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentStep, setCurrentStep] = useState(0);
  const [currentPage, setCurrentPage] = useState('plans');
  const navigate = useNavigate();

  const plans = [
    {
      id: 1,
      icon: <FaCalendarAlt className="text-2xl text-[#8B5A2B]" />,
      title: "Daily Check-In Plan",
      duration: "30 days",
      description: "Establish a daily mental health check-in routine",
      features: ["Mood tracking", "Daily prompts", "Progress insights"],
      overview: "This 30-day plan helps you develop the habit of daily self-reflection and mood tracking. You'll receive daily prompts to check in with yourself and track your emotional wellbeing over time.",
      benefits: [
        "Increased self-awareness",
        "Better emotional regulation",
        "Early detection of mood patterns"
      ],
      steps: [
        {
          title: "Set Up Your Profile",
          content: "Answer a few questions about your current mood and goals to personalize your experience."
        },
        {
          title: "Daily Check-Ins",
          content: "Spend 5 minutes each morning answering simple questions about your mood and expectations for the day."
        },
        {
          title: "Weekly Reflections",
          content: "Review your weekly patterns and insights every Sunday to identify trends."
        }
      ],
      resources: [
        "Mood tracking guide PDF",
        "Sample check-in questions",
        "Video tutorials"
      ],
      actionButton: {
        text: "Start Tracking",
        action: () => setCurrentPage('mood-tracker'),
        icon: <FaHeart className="ml-2" />
      },
      colorScheme: {
        bg: "#FFF5EE",
        border: "#FFDAB9",
        primary: "#8B5A2B",
        secondary: "#FFA07A"
      }
    },
    {
      id: 2,
      icon: <FaChartLine className="text-2xl text-[#8B5A2B]" />,
      title: "Stress Reduction",
      duration: "8 weeks",
      description: "Learn and practice stress management techniques",
      features: ["Guided exercises", "Weekly challenges", "Community support"],
      overview: "This 8-week program teaches evidence-based stress reduction techniques through guided exercises and weekly challenges. You'll build a toolkit of strategies to manage daily stressors.",
      benefits: [
        "Reduced anxiety levels",
        "Improved coping skills",
        "Better work-life balance"
      ],
      steps: [
        {
          title: "Assessment",
          content: "Complete our stress assessment to identify your main stressors and current coping mechanisms."
        },
        {
          title: "Weekly Modules",
          content: "Each week focuses on a different technique like deep breathing, progressive muscle relaxation, or cognitive restructuring."
        },
        {
          title: "Practice Sessions",
          content: "Daily 10-minute practice sessions to reinforce what you've learned."
        }
      ],
      resources: [
        "Stress reduction workbook",
        "Guided audio exercises",
        "Community forum access"
      ],
      actionButton: {
        text: "Begin Stress Assessment",
        action: () => setCurrentPage('stress-assessment'),
        icon: <FaLeaf className="ml-2" />
      },
      colorScheme: {
        bg: "#F0FFF0",
        border: "#98FB98",
        primary: "#2E8B57",
        secondary: "#3CB371"
      }
    },
    {
      id: 3,
      icon: <FaBook className="text-2xl text-[#8B5A2B]" />,
      title: "Mindfulness Journey",
      duration: "12 weeks",
      description: "Develop a consistent mindfulness practice",
      features: ["Daily meditations", "Educational content", "Skill-building"],
      overview: "This 12-week progressive program introduces mindfulness concepts and helps you build a sustainable meditation practice, starting with just 5 minutes a day and gradually increasing.",
      benefits: [
        "Improved focus and concentration",
        "Reduced rumination",
        "Greater emotional resilience"
      ],
      steps: [
        {
          title: "Foundation Week",
          content: "Learn the basics of mindfulness and simple breathing techniques."
        },
        {
          title: "Building Consistency",
          content: "Establish a daily practice with guided meditations of increasing length."
        },
        {
          title: "Integration",
          content: "Learn how to apply mindfulness in daily activities beyond formal meditation."
        }
      ],
      resources: [
        "Meditation timer",
        "Progress tracker",
        "Mindfulness exercises PDF"
      ],
      actionButton: {
        text: "Start Meditating",
        action: () => setCurrentPage('meditation'),
        icon: <FaLaugh className="ml-2" />
      },
      colorScheme: {
        bg: "#F5F5F5",
        border: "#D3D3D3",
        primary: "#4682B4",
        secondary: "#87CEEB"
      }
    },
    {
      id: 4,
      icon: <FaUsers className="text-2xl text-[#8B5A2B]" />,
      title: "Social Connection",
      duration: "6 weeks",
      description: "Improve your social wellbeing and connections",
      features: ["Community activities", "Communication tips", "Support groups"],
      overview: "This 6-week program focuses on building meaningful social connections through structured activities and communication skill-building. Perfect for those looking to expand their social circle or deepen existing relationships.",
      benefits: [
        "Reduced feelings of loneliness",
        "Improved communication skills",
        "Stronger support network"
      ],
      steps: [
        {
          title: "Self-Assessment",
          content: "Identify your current social habits and areas for improvement."
        },
        {
          title: "Weekly Challenges",
          content: "Practical challenges to gradually expand your comfort zone in social situations."
        },
        {
          title: "Group Activities",
          content: "Participate in virtual or in-person meetups with others in the program."
        }
      ],
      resources: [
        "Conversation starters guide",
        "Social anxiety tips",
        "Event planning toolkit"
      ],
      actionButton: {
        text: "Join Community",
        action: () => setCurrentPage('community'),
        icon: <FaComments className="ml-2" />
      },
      colorScheme: {
        bg: "#FFF0F5",
        border: "#FFC0CB",
        primary: "#DB7093",
        secondary: "#FF69B4"
      }
    }
  ];

  const openPlan = (plan, action) => {
    setSelectedPlan(plan);
    setActiveTab('overview');
    setCurrentStep(0);
    if (action === 'start') {
      setActiveTab('getStarted');
    }
  };

  const closePlan = () => {
    setSelectedPlan(null);
  };

  const nextStep = () => {
    if (currentStep < selectedPlan.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBeginPlan = () => {
    selectedPlan.actionButton.action();
  };

  const renderCurrentPage = () => {
    switch(currentPage) {
      case 'mood-tracker':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <button 
              onClick={() => setCurrentPage('plans')}
              className="flex items-center mb-4 text-[#8B5A2B] hover:text-[#5A3921]"
            >
              <FaArrowLeft className="mr-2" /> Back to Plans
            </button>
            <h2 className="text-2xl font-bold text-[#8B5A2B] mb-4">Mood Tracker</h2>
            <p className="text-[#5A3921]/90 mb-4">
              Track your daily mood and emotions to identify patterns and improve your wellbeing.
            </p>
            <div className="bg-[#FFF5EE] p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-[#8B5A2B] mb-3">How are you feeling today?</h3>
              <div className="grid grid-cols-5 gap-4 mb-4">
                {['😢', '😞', '😐', '😊', '😁'].map((emoji, i) => (
                  <button 
                    key={i}
                    className="text-3xl p-4 rounded-full hover:bg-[#FFDAB9] transition-colors"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              <textarea 
                className="w-full p-3 border border-[#E3D5CA] rounded-lg mb-4" 
                placeholder="Any notes about your mood today?"
                rows={4}
              />
              <button className="px-6 py-2 bg-[#8B5A2B] text-white rounded-lg hover:bg-[#5A3921]">
                Save Entry
              </button>
            </div>
          </div>
        );

      case 'stress-assessment':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <button 
              onClick={() => setCurrentPage('plans')}
              className="flex items-center mb-4 text-[#2E8B57] hover:text-[#1E5A37]"
            >
              <FaArrowLeft className="mr-2" /> Back to Plans
            </button>
            <h2 className="text-2xl font-bold text-[#2E8B57] mb-4">Stress Assessment</h2>
            <div className="bg-[#F0FFF0] p-6 rounded-lg">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#2E8B57] mb-2">1. How often do you feel stressed?</h3>
                <div className="flex flex-wrap gap-2">
                  {['Never', 'Rarely', 'Sometimes', 'Often', 'Always'].map((opt, i) => (
                    <button key={i} className="px-4 py-2 border border-[#98FB98] rounded-lg hover:bg-[#98FB98]">
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#2E8B57] mb-2">2. What are your main stressors?</h3>
                <div className="grid grid-cols-2 gap-2">
                  {['Work', 'Relationships', 'Finances', 'Health', 'Family', 'Other'].map((opt, i) => (
                    <button key={i} className="px-4 py-2 border border-[#98FB98] rounded-lg hover:bg-[#98FB98]">
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              
              <button className="px-6 py-3 bg-[#2E8B57] text-white rounded-lg hover:bg-[#1E5A37]">
                Submit Assessment
              </button>
            </div>
          </div>
        );

      case 'meditation':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <button 
              onClick={() => setCurrentPage('plans')}
              className="flex items-center mb-4 text-[#4682B4] hover:text-[#2E5A8B]"
            >
              <FaArrowLeft className="mr-2" /> Back to Plans
            </button>
            <h2 className="text-2xl font-bold text-[#4682B4] mb-4">Mindfulness Meditation</h2>
            <div className="bg-[#F5F5F5] p-6 rounded-lg">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">5:00</div>
                <div className="flex justify-center gap-4">
                  <button className="px-6 py-2 bg-[#4682B4] text-white rounded-lg">Start</button>
                  <button className="px-6 py-2 border border-[#4682B4] text-[#4682B4] rounded-lg">Pause</button>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-[#4682B4] mb-2">Guided Meditations</h3>
                <div className="space-y-2">
                  {['5-Minute Breathing', 'Body Scan', 'Loving Kindness', 'Sleep Meditation'].map((med, i) => (
                    <div key={i} className="p-3 border border-[#D3D3D3] rounded-lg hover:bg-[#E5E5E5] cursor-pointer">
                      {med}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'community':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <button 
              onClick={() => setCurrentPage('plans')}
              className="flex items-center mb-4 text-[#DB7093] hover:text-[#BB5073]"
            >
              <FaArrowLeft className="mr-2" /> Back to Plans
            </button>
            <h2 className="text-2xl font-bold text-[#DB7093] mb-4">Community Connection</h2>
            <div className="bg-[#FFF0F5] p-6 rounded-lg">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#DB7093] mb-3">Upcoming Events</h3>
                <div className="space-y-3">
                  {['Virtual Coffee Chat - Tomorrow 10AM', 'Support Group - Wednesday', 'Mindfulness Walk - Saturday'].map((event, i) => (
                    <div key={i} className="p-3 border border-[#FFC0CB] rounded-lg bg-white">
                      <div className="font-medium">{event}</div>
                      <button className="mt-2 px-3 py-1 text-sm bg-[#DB7093] text-white rounded hover:bg-[#BB5073]">
                        Join
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-[#DB7093] mb-3">Discussion Topics</h3>
                <div className="space-y-3">
                  {['Tips for social anxiety', 'Making friends as an adult', 'Dealing with loneliness'].map((topic, i) => (
                    <div key={i} className="p-3 border border-[#FFC0CB] rounded-lg bg-white hover:bg-[#FFE5EB] cursor-pointer">
                      {topic}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'assessment':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <button 
              onClick={() => setCurrentPage('plans')}
              className="flex items-center mb-4 text-[#8B5A2B] hover:text-[#5A3921]"
            >
              <FaArrowLeft className="mr-2" /> Back to Plans
            </button>
            <h2 className="text-2xl font-bold text-[#8B5A2B] mb-4">Personalized Assessment</h2>
            <div className="bg-[#F5F0E8] p-6 rounded-lg">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#8B5A2B] mb-2">What are your main wellness goals?</h3>
                <div className="grid grid-cols-2 gap-3">
                  {['Reduce stress', 'Improve mood', 'Better sleep', 'More energy', 
                    'Increase focus', 'Build habits', 'Social connection', 'Other'].map((goal, i) => (
                    <button key={i} className="p-3 border border-[#E3D5CA] rounded-lg hover:bg-[#E3D5CA]">
                      {goal}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#8B5A2B] mb-2">How much time can you commit daily?</h3>
                <div className="flex flex-wrap gap-2">
                  {['5-10 mins', '15-20 mins', '30 mins', '1 hour', 'More'].map((time, i) => (
                    <button key={i} className="px-4 py-2 border border-[#E3D5CA] rounded-lg hover:bg-[#E3D5CA]">
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={() => {
                  setCurrentPage('plans');
                  alert('Based on your answers, we recommend the Daily Check-In Plan and Mindfulness Journey!');
                }}
                className="px-6 py-3 bg-[#8B5A2B] text-white rounded-lg hover:bg-[#5A3921]"
              >
                Get Recommendations
              </button>
            </div>
          </div>
        );

      case 'plans':
      default:
        return (
          <>
            <div className="flex justify-between items-center mb-8">
              <button 
                onClick={() => navigate('/')}
                className="flex items-center px-4 py-2 bg-[#8B5A2B] text-white rounded-lg hover:bg-[#5A3921] transition-colors"
              >
                <FaHome className="mr-2" />
                Back to Main
              </button>
              <h1 className="text-3xl md:text-4xl font-bold text-[#8B5A2B]">
                Wellness Plans
              </h1>
              <div className="w-24"></div>
            </div>
            
            <div className="grid gap-6">
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.01 }}
                  className="bg-white p-6 rounded-lg shadow-sm border border-[#E3D5CA]"
                  style={{ borderColor: plan.colorScheme.border }}
                >
                  <div className="flex items-start mb-4">
                    <div className="mr-4 mt-1" style={{ color: plan.colorScheme.primary }}>
                      {plan.icon}
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                        <div>
                          <h2 className="text-xl font-semibold" style={{ color: plan.colorScheme.primary }}>
                            {plan.title}
                          </h2>
                          <p className="text-[#5A3921]/90">{plan.description}</p>
                        </div>
                        <span 
                          className="text-sm px-3 py-1 rounded-full mt-2 md:mt-0"
                          style={{ 
                            backgroundColor: plan.colorScheme.border,
                            color: plan.colorScheme.primary
                          }}
                        >
                          {plan.duration}
                        </span>
                      </div>
                      
                      <div className="mt-4">
                        <h3 className="font-medium text-[#5A3921] mb-2">Includes:</h3>
                        <ul className="list-disc pl-5 space-y-1 text-[#5A3921]/90">
                          {plan.features.map((feature, i) => (
                            <li key={i}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-4 space-x-3">
                    <button 
                      onClick={() => openPlan(plan, 'learn')}
                      className="px-4 py-2 border rounded-lg transition-colors"
                      style={{
                        borderColor: plan.colorScheme.primary,
                        color: plan.colorScheme.primary,
                        backgroundColor: 'transparent'
                      }}
                    >
                      Learn More
                    </button>
                    <button 
                      onClick={() => openPlan(plan, 'start')}
                      className="px-4 py-2 rounded-lg text-white transition-colors"
                      style={{
                        backgroundColor: plan.colorScheme.primary,
                        borderColor: plan.colorScheme.primary
                      }}
                    >
                      Start Plan
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-[#5A3921]">Personalized Plans</h2>
              <p className="text-[#5A3921]/90 mb-4">
                Our wellness plans are designed by mental health professionals to help you build 
                sustainable habits for better mental wellbeing.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setCurrentPage('assessment')}
                  className="px-6 py-3 bg-[#8B5A2B] text-white rounded-lg hover:bg-[#5A3921] transition-colors"
                >
                  Take Assessment
                </button>
                <button 
                  onClick={() => navigate('/')}
                  className="flex items-center px-6 py-3 border border-[#8B5A2B] text-[#8B5A2B] rounded-lg hover:bg-[#8B5A2B] hover:text-white transition-colors"
                >
                  <FaHome className="mr-2" />
                  Back to Main Page
                </button>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#F5F0E8] text-[#5A3921] p-6"
    >
      <div className="max-w-4xl mx-auto py-12">
        {renderCurrentPage()}
      </div>

      {/* Plan Detail Modal */}
      <AnimatePresence>
        {currentPage === 'plans' && selectedPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={closePlan}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              style={{ backgroundColor: selectedPlan.colorScheme.bg }}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 
                      className="text-2xl font-bold"
                      style={{ color: selectedPlan.colorScheme.primary }}
                    >
                      {selectedPlan.title}
                    </h2>
                    <p className="text-[#5A3921]/80">{selectedPlan.duration} plan</p>
                  </div>
                  <button 
                    onClick={closePlan}
                    style={{ color: selectedPlan.colorScheme.primary }}
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>

                <div className="border-b mb-6" style={{ borderColor: selectedPlan.colorScheme.border }}>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setActiveTab('overview')}
                      className={`pb-2 px-1 ${activeTab === 'overview' ? 'border-b-2 font-medium' : ''}`}
                      style={{
                        borderColor: activeTab === 'overview' ? selectedPlan.colorScheme.primary : '',
                        color: activeTab === 'overview' ? selectedPlan.colorScheme.primary : '#5A392180'
                      }}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => setActiveTab('benefits')}
                      className={`pb-2 px-1 ${activeTab === 'benefits' ? 'border-b-2 font-medium' : ''}`}
                      style={{
                        borderColor: activeTab === 'benefits' ? selectedPlan.colorScheme.primary : '',
                        color: activeTab === 'benefits' ? selectedPlan.colorScheme.primary : '#5A392180'
                      }}
                    >
                      Benefits
                    </button>
                    <button
                      onClick={() => setActiveTab('getStarted')}
                      className={`pb-2 px-1 ${activeTab === 'getStarted' ? 'border-b-2 font-medium' : ''}`}
                      style={{
                        borderColor: activeTab === 'getStarted' ? selectedPlan.colorScheme.primary : '',
                        color: activeTab === 'getStarted' ? selectedPlan.colorScheme.primary : '#5A392180'
                      }}
                    >
                      Get Started
                    </button>
                    <button
                      onClick={() => setActiveTab('resources')}
                      className={`pb-2 px-1 ${activeTab === 'resources' ? 'border-b-2 font-medium' : ''}`}
                      style={{
                        borderColor: activeTab === 'resources' ? selectedPlan.colorScheme.primary : '',
                        color: activeTab === 'resources' ? selectedPlan.colorScheme.primary : '#5A392180'
                      }}
                    >
                      Resources
                    </button>
                  </div>
                </div>

                {activeTab === 'overview' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4" style={{ color: selectedPlan.colorScheme.primary }}>
                      About This Plan
                    </h3>
                    <p className="text-[#5A3921]/90 mb-6">{selectedPlan.overview}</p>
                    
                    <h3 className="text-xl font-semibold mb-4" style={{ color: selectedPlan.colorScheme.primary }}>
                      What's Included
                    </h3>
                    <ul className="space-y-2 mb-6">
                      {selectedPlan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <FaCheck 
                            className="mt-1 mr-2 flex-shrink-0" 
                            style={{ color: selectedPlan.colorScheme.primary }}
                          />
                          <span className="text-[#5A3921]/90">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex justify-end">
                      <button
                        onClick={() => setActiveTab('getStarted')}
                        className="px-6 py-2 text-white rounded-lg transition-colors flex items-center"
                        style={{ backgroundColor: selectedPlan.colorScheme.primary }}
                      >
                        Start This Plan <FaArrowRight className="ml-2" />
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'benefits' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4" style={{ color: selectedPlan.colorScheme.primary }}>
                      Expected Benefits
                    </h3>
                    <ul className="space-y-3 mb-6">
                      {selectedPlan.benefits.map((benefit, index) => (
                        <li 
                          key={index} 
                          className="flex items-start p-4 rounded-lg"
                          style={{ backgroundColor: selectedPlan.colorScheme.border }}
                        >
                          <div 
                            className="rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0"
                            style={{ backgroundColor: selectedPlan.colorScheme.primary, color: 'white' }}
                          >
                            {index + 1}
                          </div>
                          <span className="text-[#5A3921]/90">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'getStarted' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4" style={{ color: selectedPlan.colorScheme.primary }}>
                      Getting Started
                    </h3>
                    
                    <div className="mb-6">
                      <div className="flex items-center mb-4">
                        {selectedPlan.steps.map((step, index) => (
                          <React.Fragment key={index}>
                            <div 
                              className={`flex flex-col items-center ${index <= currentStep ? '' : 'text-[#5A3921]/50'}`}
                              style={{ color: index <= currentStep ? selectedPlan.colorScheme.primary : '' }}
                            >
                              <div 
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${index <= currentStep ? 'text-white' : ''}`}
                                style={{ 
                                  backgroundColor: index <= currentStep ? 
                                    selectedPlan.colorScheme.primary : 
                                    selectedPlan.colorScheme.border 
                                }}
                              >
                                {index + 1}
                              </div>
                              <span className="text-xs mt-1 text-center w-20">{step.title}</span>
                            </div>
                            {index < selectedPlan.steps.length - 1 && (
                              <div 
                                className={`h-1 w-16`}
                                style={{ 
                                  backgroundColor: index < currentStep ? 
                                    selectedPlan.colorScheme.primary : 
                                    selectedPlan.colorScheme.border 
                                }}
                              ></div>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                      
                      <div 
                        className="p-6 rounded-lg"
                        style={{ backgroundColor: selectedPlan.colorScheme.border }}
                      >
                        <h4 
                          className="font-semibold text-lg mb-2"
                          style={{ color: selectedPlan.colorScheme.primary }}
                        >
                          {selectedPlan.steps[currentStep].title}
                        </h4>
                        <p className="text-[#5A3921]/90">
                          {selectedPlan.steps[currentStep].content}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <button
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className={`px-4 py-2 rounded-lg ${currentStep === 0 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : ''}`}
                        style={{ 
                          backgroundColor: currentStep === 0 ? '' : selectedPlan.colorScheme.border,
                          color: currentStep === 0 ? '' : selectedPlan.colorScheme.primary
                        }}
                      >
                        Previous
                      </button>
                      
                      {currentStep < selectedPlan.steps.length - 1 ? (
                        <button
                          onClick={nextStep}
                          className="px-4 py-2 text-white rounded-lg flex items-center"
                          style={{ backgroundColor: selectedPlan.colorScheme.primary }}
                        >
                          Next Step <FaArrowRight className="ml-2" />
                        </button>
                      ) : (
                        <button 
                          onClick={handleBeginPlan}
                          className="px-6 py-2 text-white rounded-lg flex items-center"
                          style={{ backgroundColor: selectedPlan.colorScheme.secondary }}
                        >
                          {selectedPlan.actionButton.text} {selectedPlan.actionButton.icon}
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'resources' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4" style={{ color: selectedPlan.colorScheme.primary }}>
                      Plan Resources
                    </h3>
                    <p className="text-[#5A3921]/90 mb-6">These resources will help you get the most out of your plan:</p>
                    
                    <ul className="space-y-3">
                      {selectedPlan.resources.map((resource, index) => (
                        <li 
                          key={index} 
                          className="flex items-start border-b pb-3"
                          style={{ borderColor: selectedPlan.colorScheme.border }}
                        >
                          <div 
                            className="rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0"
                            style={{ backgroundColor: selectedPlan.colorScheme.primary, color: 'white' }}
                          >
                            {index + 1}
                          </div>
                          <span className="text-[#5A3921]/90">{resource}</span>
                          <button 
                            className="ml-auto underline"
                            style={{ color: selectedPlan.colorScheme.primary }}
                          >
                            Download
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default WellnessPlans;