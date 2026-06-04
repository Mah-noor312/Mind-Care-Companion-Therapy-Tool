import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown, FaChevronUp, FaHome, FaRobot, FaTimes } from 'react-icons/fa';

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hello! I\'m your wellness assistant. How can I help you today?' }
  ]);
  const [userMessage, setUserMessage] = useState('');
  const navigate = useNavigate();

  const faqs = [
    {
      question: "How do I know if I need professional help?",
      answer: "If your symptoms persist for more than two weeks, significantly impact your daily functioning, or cause you distress, it may be time to seek professional help. Our self-assessment tools can help you evaluate, but a licensed professional can provide the most accurate evaluation."
    },
    {
      question: "What types of mental health services do you offer?",
      answer: "We offer a range of services including self-help resources, wellness plans, mood tracking tools, stress reduction techniques, mindfulness exercises, and community support. While we don't provide direct therapy, we can help connect you with licensed professionals if needed."
    },
    {
      question: "Is my personal information kept confidential?",
      answer: "Absolutely. We prioritize your privacy and all personal information is encrypted and stored securely. We never share your data without your explicit consent, except in cases where we're legally required to do so to prevent harm."
    },
    {
      question: "How often should I use the wellness tools?",
      answer: "For best results, we recommend daily check-ins with our mood tracker and consistent practice with our wellness plans (usually 5-7 days per week). However, even using the tools a few times a week can provide benefits. Start with what feels manageable and build from there."
    },
    {
      question: "Are these resources a substitute for therapy?",
      answer: "While our tools can be helpful for general wellbeing and mild symptoms, they're not a replacement for professional therapy when needed. Think of them as complementary resources that can support your mental health journey alongside professional care when appropriate."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleSendMessage = () => {
    if (userMessage.trim() === '') return;
    
    // Add user message
    const newMessages = [...chatMessages, { sender: 'user', text: userMessage }];
    setChatMessages(newMessages);
    setUserMessage('');
    
    // Simulate bot response after a delay
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        { 
          sender: 'bot', 
          text: getBotResponse(userMessage.toLowerCase()) 
        }
      ]);
    }, 1000);
  };

  const getBotResponse = (message) => {
    if (message.includes('help') || message.includes('support')) {
      return "I can help direct you to the right resources. Could you tell me more about what you're experiencing?";
    } else if (message.includes('contact') || message.includes('human')) {
      return "For direct support from our team, please email support@wellnessapp.com or call (555) 123-4567 during business hours.";
    } else if (message.includes('privacy') || message.includes('data')) {
      return "All your data is encrypted and protected. You can review our privacy policy in the app settings or on our website.";
    } else if (message.includes('feature') || message.includes('tool')) {
      return "We offer mood tracking, guided meditations, stress reduction exercises, and community forums. Which feature would you like to know more about?";
    } else {
      return "I'm here to help with any questions about our wellness resources. Could you please rephrase or provide more details?";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#F5F0E8] text-[#5A3921] p-6 relative"
    >
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center px-4 py-2 bg-[#8B5A2B] text-white rounded-lg hover:bg-[#5A3921] transition-colors"
          >
            <FaHome className="mr-2" />
            Back to Main
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-[#8B5A2B]">
            Frequently Asked Questions
          </h1>
          <div className="w-24"></div>
        </div>
        
        <motion.div 
          className="bg-white rounded-lg shadow-sm overflow-hidden"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              className="border-b border-[#E3D5CA] last:border-0"
              whileHover={{ backgroundColor: '#F5F0E8' }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center transition-colors"
              >
                <h2 className="font-medium text-lg text-[#5A3921]">{faq.question}</h2>
                {activeIndex === index ? (
                  <FaChevronUp className="text-[#8B5A2B] transition-transform" />
                ) : (
                  <FaChevronDown className="text-[#8B5A2B] transition-transform" />
                )}
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: 1, 
                      height: 'auto',
                      transition: { 
                        opacity: { duration: 0.3 },
                        height: { duration: 0.4 } 
                      }
                    }}
                    exit={{ 
                      opacity: 0, 
                      height: 0,
                      transition: { 
                        opacity: { duration: 0.2 },
                        height: { duration: 0.3 } 
                      }
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-[#5A3921]/90">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-[#5A3921]">Still have questions?</h2>
          <p className="text-[#5A3921]/90 mb-4">
            If you didn't find what you were looking for, our support team is here to help.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setShowChatbot(true)}
              className="flex items-center px-6 py-3 bg-[#8B5A2B] text-white rounded-lg hover:bg-[#5A3921] transition-colors"
            >
              <FaRobot className="mr-2" />
              Contact Support
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
      </div>

      {/* Chatbot Modal */}
      <AnimatePresence>
        {showChatbot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-6 right-6 w-96 bg-white rounded-lg shadow-xl border border-[#E3D5CA] overflow-hidden z-50"
          >
            <div className="bg-[#8B5A2B] text-white p-4 flex justify-between items-center">
              <div className="flex items-center">
                <FaRobot className="mr-2" />
                <h3 className="font-semibold">Wellness Assistant</h3>
              </div>
              <button 
                onClick={() => setShowChatbot(false)}
                className="text-white hover:text-[#FFDAB9]"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="h-96 overflow-y-auto p-4 bg-[#FFF5EE]">
              {chatMessages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-xs p-3 rounded-lg ${msg.sender === 'user' 
                      ? 'bg-[#8B5A2B] text-white' 
                      : 'bg-white border border-[#E3D5CA] text-[#5A3921]'}`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-[#E3D5CA] flex">
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-grow p-2 border border-[#E3D5CA] rounded-l-lg focus:outline-none focus:ring-1 focus:ring-[#8B5A2B]"
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-[#8B5A2B] text-white rounded-r-lg hover:bg-[#5A3921]"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FAQs;