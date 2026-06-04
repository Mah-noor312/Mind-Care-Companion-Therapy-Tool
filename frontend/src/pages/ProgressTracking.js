import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProgressTracking = () => {
  const navigate = useNavigate();

  const trackingFeatures = [
    {
      icon: "📊",
      title: "Mood Charts",
      description: "Visualize emotional patterns with interactive charts and graphs"
    },
    {
      icon: "🎯",
      title: "Goal Setting",
      description: "Set and track personal mental health goals with milestones"
    },
    {
      icon: "📝",
      title: "Journal Insights",
      description: "AI-powered analysis of your journal entries and reflections"
    },
    {
      icon: "🏆",
      title: "Achievement Badges",
      description: "Celebrate consistency and progress with motivational rewards"
    },
    {
      icon: "📈",
      title: "Trend Analysis",
      description: "Identify improvement patterns and areas needing attention"
    },
    {
      icon: "🔄",
      title: "Progress Reports",
      description: "Weekly and monthly summaries of your mental health journey"
    }
  ];

  return (
    <div className="font-[Poppins] min-h-screen flex flex-col bg-gradient-to-b from-pink-50 to-rose-50 text-gray-800">
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
            <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center text-3xl text-white mx-auto mb-6">
              📈
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-pink-800 mb-4">
              Progress Tracking
            </h1>
            <p className="text-xl text-pink-600 max-w-3xl mx-auto">
              Visualize your mental health journey and celebrate every step forward
            </p>
          </motion.section>

          {/* Benefits Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg p-8 mb-16"
          >
            <h2 className="text-3xl font-semibold text-pink-800 mb-6">Why Track Your Progress?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-pink-700 mb-4">Motivation & Awareness</h3>
                <p className="text-gray-700 mb-4">
                  Seeing tangible progress provides motivation and helps you recognize patterns 
                  that might otherwise go unnoticed in daily life.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-2">•</span>
                    Builds self-awareness of emotional triggers
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-2">•</span>
                    Provides motivation through visible improvement
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-2">•</span>
                    Helps identify effective coping strategies
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-lg p-6 text-center">
                <div className="text-6xl mb-4">📊</div>
                <p className="text-pink-700 font-semibold">"What gets measured gets managed"</p>
                <p className="text-pink-600 text-sm mt-2">Track your journey to better mental health</p>
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
            <h2 className="text-3xl font-semibold text-pink-800 mb-8 text-center">Tracking Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trackingFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-pink-500"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="font-bold text-xl mb-3 text-pink-700">{feature.title}</h3>
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
            className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl p-8 text-white text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Start Tracking Your Mental Health Journey</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Gain valuable insights into your emotional patterns and celebrate your progress along the way.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/mood-tracker")}
              className="bg-white text-pink-600 font-semibold py-3 px-8 rounded-full transition shadow-lg"
            >
              View Progress Dashboard
            </motion.button>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProgressTracking;