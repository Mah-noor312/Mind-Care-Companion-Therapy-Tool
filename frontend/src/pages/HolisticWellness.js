import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HolisticWellness = () => {
  const navigate = useNavigate();

  // ✅ Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const wellnessFeatures = [
    {
      icon: "🧘‍♀️",
      title: "Meditation Guides",
      description: "Guided meditation sessions for stress relief, focus, and sleep improvement."
    },
    {
      icon: "🌬️",
      title: "Breathing Exercises",
      description: "Science-backed breathing techniques to calm your nervous system instantly."
    },
    {
      icon: "💤",
      title: "Sleep Optimization",
      description: "Personalized sleep recommendations and bedtime routines for better rest."
    },
    {
      icon: "🏃‍♂️",
      title: "Physical Wellness",
      description: "Exercise routines and movement breaks tailored to your energy levels."
    },
    {
      icon: "🍎",
      title: "Nutrition Tips",
      description: "Food and hydration recommendations to support mental wellbeing."
    },
    {
      icon: "📝",
      title: "Daily Rituals",
      description: "Customizable morning and evening routines for consistent self-care."
    }
  ];

  return (
    <div className="font-[Poppins] min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-blue-50 text-gray-800">
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
            <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-3xl text-white mx-auto mb-6">
              🧠
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-4">
              Holistic Wellness
            </h1>
            <p className="text-xl text-purple-600 max-w-3xl mx-auto">
              Nurturing your mind, body, and spirit through integrated wellness practices
            </p>
          </motion.section>

          {/* Overview Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg p-8 mb-16"
          >
            <h2 className="text-3xl font-semibold text-purple-800 mb-6">Complete Wellbeing Approach</h2>
            <p className="mb-6 text-lg text-gray-700">
              True mental health encompasses more than just emotional state. Our holistic approach integrates 
              physical health, mindfulness practices, nutrition, and daily routines to support your complete wellbeing.
            </p>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-purple-700 mb-4">Why Holistic Care Matters</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">✓</span>
                    Physical health directly impacts mental clarity and emotional stability
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">✓</span>
                    Consistent routines create foundation for mental resilience
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">✓</span>
                    Mind-body connection enhances overall life satisfaction
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg p-6 text-center">
                <div className="text-6xl mb-4">🌱</div>
                <p className="text-purple-700 font-semibold">Nurturing Growth in All Areas of Life</p>
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
            <h2 className="text-3xl font-semibold text-purple-800 mb-8 text-center">Wellness Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wellnessFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-purple-500"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="font-bold text-xl mb-3 text-purple-700">{feature.title}</h3>
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
            className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Start Your Holistic Journey</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Discover how integrated wellness practices can transform your mental health and overall quality of life.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/main")}
              className="bg-white text-purple-600 font-semibold py-3 px-8 rounded-full transition shadow-lg"
            >
              Explore Wellness Tools
            </motion.button>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HolisticWellness;
