// src/pages/EmotionallyAwareAI.js
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const EmotionallyAwareAI = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: "🔍",
      title: "Tone Recognition",
      description: "Analyzes textual input to detect subtle emotional cues like happiness, sadness, frustration, and anxiety."
    },
    {
      icon: "📊",
      title: "Pattern Detection",
      description: "Learns your communication patterns over time to recognize recurring emotional states and triggers."
    },
    {
      icon: "💬",
      title: "Compassionate Responses",
      description: "Generates responses with appropriate emotional tone, providing validation and empathy when needed."
    },
    {
      icon: "🧠",
      title: "Contextual Understanding",
      description: "Maintains conversation context to provide relevant and meaningful support throughout your journey."
    },
    {
      icon: "🔒",
      title: "Privacy Focused",
      description: "All emotional data is processed securely and never shared without your consent."
    },
    {
      icon: "🔄",
      title: "Continuous Learning",
      description: "Improves its understanding of your unique communication style with each interaction."
    }
  ];

  const handleTryNow = () => {
    navigate("/chatbot");
  };

  return (
    <div className="font-[Poppins] min-h-screen flex flex-col text-[#5a3e21]">
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
            <h1 className="text-4xl md:text-5xl font-bold text-[#A47148] mb-4">
              Emotionally Aware AI
            </h1>
            <p className="text-xl text-[#8C5D36] max-w-3xl mx-auto">
              Your compassionate digital companion that understands not just what you say, but how you feel.
            </p>
          </motion.section>

          {/* Overview Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white rounded-xl shadow-lg p-8 mb-16"
          >
            <h2 className="text-3xl font-semibold text-[#8C5D36] mb-6">How It Works</h2>
            <p className="mb-6 text-lg">
              Our advanced AI analyzes your language patterns, word choices, and conversation history to understand your emotional state and respond with appropriate compassion and support.
            </p>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <div className="bg-gradient-to-r from-[#f5e9dd] to-[#f8f1e9] h-64 flex items-center justify-center">
                <p className="text-xl text-[#8C5D36]">AI Emotion Recognition Visualization</p>
              </div>
            </div>
          </motion.section>

          {/* Features Grid */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16"
          >
            <h2 className="text-3xl font-semibold text-[#8C5D36] mb-8 text-center">Key Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-[#A47148]"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="font-bold text-xl mb-3 text-[#8C5D36]">{feature.title}</h3>
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
            viewport={{ once: true, margin: "-100px" }}
            className="bg-gradient-to-r from-[#A47148] to-[#8C5D36] rounded-xl p-8 text-white text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Experience Compassionate AI?</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Start a conversation with our Emotionally Aware AI and discover how technology can understand and support your emotional wellbeing.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleTryNow}
              className="bg-white text-[#8C5D36] font-semibold py-3 px-8 rounded-full transition shadow-lg"
            >
              Try It Now
            </motion.button>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EmotionallyAwareAI;