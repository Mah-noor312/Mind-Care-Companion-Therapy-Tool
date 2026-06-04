import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaHeadset, FaRobot, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const LiveChat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Welcome! I can help with information about our mental health chatbot and general mental health. You can ask up to 5 questions. What would you like to know about?",
      sender: 'support',
      questionOptions: {
        category: 'main',
        options: [
          "Tell me about the chatbot",
          "I have a mental health question",
          "What can the chatbot do?"
        ]
      }
    }
  ]);
  const [questionCount, setQuestionCount] = useState(0);
  const [chatEnded, setChatEnded] = useState(false);
  const navigate = useNavigate();

  // Response templates organized by category
  const responseTemplates = {
    chatbotInfo: {
      response: "Our mental health chatbot is an AI-powered tool that provides 24/7 support, resources, and coping strategies. It's not a replacement for professional help but can offer immediate assistance.",
      followUp: {
        category: 'chatbotInfo',
        options: [
          "How does the chatbot protect my privacy?",
          "Is the chatbot free to use?",
          "What languages does it support?"
        ]
      }
    },
    mentalHealth: {
      response: "I can provide general mental health information. Remember, for personal advice please consult a professional. What would you like to know?",
      followUp: {
        category: 'mentalHealth',
        options: [
          "Signs of anxiety",
          "Coping with stress",
          "Improving sleep"
        ]
      }
    },
    chatbotFeatures: {
      response: "Our chatbot can: 1) Provide coping strategies 2) Offer relaxation exercises 3) Suggest resources 4) Help track mood 5) Connect you with professionals if needed.",
      followUp: {
        category: 'chatbotFeatures',
        options: [
          "How does mood tracking work?",
          "What kind of exercises does it offer?",
          "Can it connect me to a therapist?"
        ]
      }
    },
    // More specific responses
    privacy: {
      response: "All conversations are encrypted and you can remain anonymous. We don't store personally identifiable information without consent.",
      followUp: null
    },
    freeUse: {
      response: "Yes, the basic chatbot service is completely free. Some premium features may be added in the future.",
      followUp: null
    },
    languages: {
      response: "Currently supports English and Urdu, with more languages coming soon.",
      followUp: null
    },
    anxietySigns: {
      response: "Common signs include excessive worry, restlessness, fatigue, difficulty concentrating, irritability, muscle tension, and sleep problems.",
      followUp: null
    },
    stressCoping: {
      response: "Try: 1) Deep breathing 2) Regular exercise 3) Time management 4) Talking to friends/family 5) Mindfulness exercises.",
      followUp: null
    },
    sleepImprovement: {
      response: "Tips: 1) Consistent sleep schedule 2) Limit screen time before bed 3) Avoid caffeine late 4) Create a restful environment 5) Relaxation techniques.",
      followUp: null
    },
    moodTracking: {
      response: "The chatbot can help you log daily moods, identify patterns, and suggest coping strategies based on your trends.",
      followUp: null
    },
    exercises: {
      response: "It offers: 1) Breathing exercises 2) Progressive muscle relaxation 3) Guided imagery 4) Mindfulness meditations 5) Quick stress relievers.",
      followUp: null
    },
    therapistConnection: {
      response: "It can provide contact information for mental health professionals in your area and help you understand what to expect from therapy.",
      followUp: null
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && !chatEnded && questionCount < 5) {
      sendMessage(message);
    }
  };

  const handleQuickQuestion = (question) => {
    if (chatEnded || questionCount >= 5) return;
    sendMessage(question);
  };

  const sendMessage = (msg) => {
    // Add user message
    const newMessage = {
      id: messages.length + 1,
      text: msg,
      sender: 'user'
    };
    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    setQuestionCount(prev => prev + 1);

    // Generate response after 1 second
    setTimeout(() => {
      let responseKey = 'default';
      let responseData = { response: "Thank you for your question. How else can I help?", followUp: null };

      // Determine response based on question
      if (msg.toLowerCase().includes('chatbot') || msg.toLowerCase().includes('features')) {
        responseKey = 'chatbotFeatures';
      } else if (msg.toLowerCase().includes('mental health') || msg.toLowerCase().includes('anxiety') || 
                 msg.toLowerCase().includes('stress') || msg.toLowerCase().includes('sleep')) {
        responseKey = 'mentalHealth';
      } else if (msg.toLowerCase().includes('privacy')) {
        responseKey = 'privacy';
      } else if (msg.toLowerCase().includes('free')) {
        responseKey = 'freeUse';
      } else if (msg.toLowerCase().includes('language')) {
        responseKey = 'languages';
      } else if (msg.toLowerCase().includes('sign') || msg.toLowerCase().includes('anxiety')) {
        responseKey = 'anxietySigns';
      } else if (msg.toLowerCase().includes('coping') || msg.toLowerCase().includes('stress')) {
        responseKey = 'stressCoping';
      } else if (msg.toLowerCase().includes('sleep')) {
        responseKey = 'sleepImprovement';
      } else if (msg.toLowerCase().includes('mood')) {
        responseKey = 'moodTracking';
      } else if (msg.toLowerCase().includes('exercise')) {
        responseKey = 'exercises';
      } else if (msg.toLowerCase().includes('therapist')) {
        responseKey = 'therapistConnection';
      } else if (msg.toLowerCase().includes('tell me about') || msg.toLowerCase().includes('what can')) {
        responseKey = 'chatbotInfo';
      }

      if (responseTemplates[responseKey]) {
        responseData = responseTemplates[responseKey];
      }

      const responseMessage = {
        id: messages.length + 2,
        text: responseData.response,
        sender: 'support'
      };

      // Check if we've reached the question limit
      if (questionCount >= 4) {
        const endMessage = {
          id: messages.length + 3,
          text: "You've reached your 5 question limit. I'm now connecting you to our AI chatbot for further assistance...",
          sender: 'support'
        };
        setMessages(prev => [...prev, responseMessage, endMessage]);
        setChatEnded(true);
        
        // Redirect to chatbot after 3 seconds
        setTimeout(() => {
          navigate('/chatbot');
        }, 3000);
      } else {
        // Add follow-up questions if available
        if (responseData.followUp) {
          const questionPrompt = {
            id: messages.length + 3,
            text: "What would you like to know next?",
            sender: 'support',
            questionOptions: responseData.followUp
          };
          setMessages(prev => [...prev, responseMessage, questionPrompt]);
        } else {
          // Default follow-up if no specific options
          const questionPrompt = {
            id: messages.length + 3,
            text: "How else can I help you?",
            sender: 'support',
            questionOptions: {
              category: 'main',
              options: [
                "More about the chatbot",
                "Another mental health question",
                "Chatbot features"
              ]
            }
          };
          setMessages(prev => [...prev, responseMessage, questionPrompt]);
        }
      }
    }, 1000);
  };

  // Auto-scroll to bottom of chat
  useEffect(() => {
    const chatContainer = document.querySelector('.chat-messages');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#F5F0E8] text-[#5A3921] p-6"
    >
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center bg-[#8B5A2B] text-white px-4 py-2 rounded-lg hover:bg-[#5A3921] transition-colors shadow-md"
          >
            <FaArrowLeft className="mr-2" />
            Back to Main
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-[#8B5A2B]">
            Live Mental Health Support
          </h1>
          <div className="w-24"></div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-[#8B5A2B] text-white p-4 flex items-center">
            <FaHeadset className="text-xl mr-3" />
            <div>
              <h2 className="font-semibold">MindCare Support</h2>
              <p className="text-sm opacity-80">
                {chatEnded ? 'Connecting to chatbot...' : `Questions remaining: ${5 - questionCount}`}
              </p>
            </div>
          </div>
          
          <div className="chat-messages h-96 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-xs md:max-w-md rounded-lg p-3 ${msg.sender === 'user' 
                      ? 'bg-[#8B5A2B] text-white' 
                      : 'bg-[#E3D5CA] text-[#5A3921]'}`}
                  >
                    <p>{msg.text}</p>
                    {msg.questionOptions && !chatEnded && questionCount < 5 && (
                      <div className="mt-3 space-y-2">
                        {msg.questionOptions.options.map((option, i) => (
                          <button
                            key={i}
                            onClick={() => handleQuickQuestion(option)}
                            className="block w-full text-left p-2 bg-white bg-opacity-20 rounded hover:bg-opacity-30 transition"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {!chatEnded && questionCount < 5 && (
            <form onSubmit={handleSendMessage} className="border-t border-[#E3D5CA] p-4">
              <div className="flex">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={questionCount === 0 ? 
                    "Type your question or select one above" : 
                    "Ask another question..."}
                  className="flex-grow px-4 py-2 border border-[#E3D5CA] rounded-l-lg focus:outline-none focus:ring-1 focus:ring-[#8B5A2B]"
                  disabled={chatEnded || questionCount >= 5}
                />
                <button 
                  type="submit"
                  className="bg-[#8B5A2B] text-white px-4 py-2 rounded-r-lg hover:bg-[#5A3921] transition-colors"
                  disabled={chatEnded || questionCount >= 5 || !message.trim()}
                >
                  <FaPaperPlane />
                </button>
              </div>
              {questionCount > 0 && (
                <p className="text-xs text-[#5A3921]/70 mt-2">
                  Questions left: {5 - questionCount}
                </p>
              )}
            </form>
          )}
        </div>
        
        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-start">
            <FaRobot className="text-[#8B5A2B] text-xl mr-3 mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-[#5A3921]">About This Service</h2>
              <p className="text-[#5A3921]/90 mt-2">
                You can ask up to 5 questions in this live chat. After that, you'll be automatically 
                connected to our AI chatbot for more comprehensive support. For immediate crisis help, 
                please visit our <a href="/crisis-resources" className="text-[#8B5A2B] hover:underline">crisis resources</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LiveChat;