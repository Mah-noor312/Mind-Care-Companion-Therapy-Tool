// src/pages/HealingTools.js
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HealingTools = () => {
  const navigate = useNavigate();

  const tools = [
    {
      icon: "🧘",
      title: "Guided Meditation",
      description: "Audio-guided sessions for relaxation and mindfulness"
    },
    {
      icon: "📓",
      title: "Journal Prompts",
      description: "Thought-provoking questions for self-reflection"
    },
    {
      icon: "🌿",
      title: "Breathing Exercises",
      description: "Techniques to calm your mind and body"
    },
    {
      icon: "💭",
      title: "Cognitive Exercises",
      description: "Activities to reframe negative thought patterns"
    },
    {
      icon: "🎨",
      title: "Creative Therapy",
      description: "Art and expression-based healing activities"
    },
    {
      icon: "📱",
      title: "Daily Reminders",
      description: "Personalized prompts for consistent practice"
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
              Tools for Real Healing
            </h1>
            <p className="text-xl text-[#8C5D36] max-w-3xl mx-auto">
              Discover therapeutic resources designed to support your mental wellness journey
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
            <h2 className="text-3xl font-semibold text-[#8C5D36] mb-6">Therapeutic Resources</h2>
            <p className="mb-6 text-lg">
              Our collection of guided exercises, journaling prompts, and mindfulness activities 
              are designed by mental health professionals to support your healing journey.
            </p>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <div className="bg-gradient-to-r from-[#f5e9dd] to-[#f8f1e9] h-64 flex items-center justify-center">
                <p className="text-xl text-[#8C5D36]">Healing Tools Visualization</p>
              </div>
            </div>
          </motion.section>

          {/* Tools Grid */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16"
          >
            <h2 className="text-3xl font-semibold text-[#8C5D36] mb-8 text-center">Our Healing Tools</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-[#A47148]"
                >
                  <div className="text-4xl mb-4">{tool.icon}</div>
                  <h3 className="font-bold text-xl mb-3 text-[#8C5D36]">{tool.title}</h3>
                  <p className="text-gray-700">{tool.description}</p>
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
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Begin Your Healing Journey?</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Our AI companion can guide you through these therapeutic tools and recommend 
              the most suitable ones based on your current needs.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleTryNow}
              className="bg-white text-[#8C5D36] font-semibold py-3 px-8 rounded-full transition shadow-lg"
            >
              Start Healing Now
            </motion.button>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HealingTools;