import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AIEmotionAnalysis = () => {
  const navigate = useNavigate();

  const analysisFeatures = [
    {
      icon: "🔍",
      title: "Real-time Analysis",
      description: "Instant emotion detection from your text with advanced NLP algorithms"
    },
    {
      icon: "📊",
      title: "Pattern Recognition",
      description: "Identifies recurring emotional patterns and triggers over time"
    },
    {
      icon: "🎯",
      title: "Personalized Insights",
      description: "Tailored recommendations based on your unique emotional landscape"
    },
    {
      icon: "📈",
      title: "Progress Metrics",
      description: "Tracks emotional wellbeing trends and improvement areas"
    },
    {
      icon: "🛡️",
      title: "Early Detection",
      description: "Flags potential mental health concerns for proactive care"
    },
    {
      icon: "💫",
      title: "Adaptive Learning",
      description: "Continuously improves understanding of your communication style"
    }
  ];

  return (
    <div className="font-[Poppins] min-h-screen flex flex-col bg-gradient-to-b from-amber-50 to-orange-50 text-gray-800">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-6 py-12">
          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-3xl text-white mx-auto mb-6">
              🤖
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-amber-800 mb-4">
              AI Emotion Analysis
            </h1>
            <p className="text-xl text-amber-600 max-w-3xl mx-auto">
              Advanced artificial intelligence that understands and responds to your emotional needs
            </p>
          </motion.section>

          {/* How It Works */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg p-8 mb-16"
          >
            <h2 className="text-3xl font-semibold text-amber-800 mb-6">How Our AI Understands You</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="font-semibold text-lg mb-2">Text Analysis</h3>
                <p className="text-gray-700">Analyzes word choice, sentence structure, and writing patterns</p>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl mb-4">🎭</div>
                <h3 className="font-semibold text-lg mb-2">Emotion Detection</h3>
                <p className="text-gray-700">Identifies subtle emotional cues and underlying sentiments</p>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl mb-4">📅</div>
                <h3 className="font-semibold text-lg mb-2">Context Awareness</h3>
                <p className="text-gray-700">Considers conversation history and temporal patterns</p>
              </div>
            </div>
          </motion.section>

          {/* Features Grid */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-semibold text-amber-800 mb-8 text-center">Analysis Capabilities</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {analysisFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-amber-500"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="font-bold text-xl mb-3 text-amber-700">{feature.title}</h3>
                  <p className="text-gray-700">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-8 text-white text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Experience Intelligent Emotional Support</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Let our AI understand your emotions and provide meaningful, personalized support.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/chatbot")}
              className="bg-white text-amber-600 font-semibold py-3 px-8 rounded-full transition shadow-lg"
            >
              Try AI Chat
            </motion.button>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AIEmotionAnalysis;