import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CommunitySupport = () => {
  const navigate = useNavigate();

  const communityFeatures = [
    {
      icon: "👥",
      title: "Support Groups",
      description: "Join moderated groups for specific mental health topics and challenges"
    },
    {
      icon: "💬",
      title: "Peer Chat",
      description: "Real-time conversations with others who understand your journey"
    },
    {
      icon: "🛡️",
      title: "Safe Environment",
      description: "Strict moderation and community guidelines ensure respectful interactions"
    },
    {
      icon: "🎭",
      title: "Shared Experiences",
      description: "Connect with people facing similar mental health challenges"
    },
    {
      icon: "💡",
      title: "Collective Wisdom",
      description: "Learn from others' coping strategies and success stories"
    },
    {
      icon: "🤝",
      title: "Mutual Support",
      description: "Give and receive encouragement in a caring community"
    }
  ];

  return (
    <div className="font-[Poppins] min-h-screen flex flex-col bg-gradient-to-b from-indigo-50 to-purple-50 text-gray-800">
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
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-3xl text-white mx-auto mb-6">
              👥
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-indigo-800 mb-4">
              Community Support
            </h1>
            <p className="text-xl text-indigo-600 max-w-3xl mx-auto">
              You're not alone. Connect with others who understand and support your mental health journey.
            </p>
          </motion.section>

          {/* Community Benefits */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg p-8 mb-16"
          >
            <h2 className="text-3xl font-semibold text-indigo-800 mb-6">The Power of Community</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Why Community Matters</h3>
                <p className="text-gray-700 mb-4">
                  Social connection is fundamental to mental health. Our community provides:
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">✓</span>
                    Reduced feelings of isolation and loneliness
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">✓</span>
                    Shared experiences and validation
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">✓</span>
                    Practical advice from lived experience
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">✓</span>
                    Hope and inspiration from recovery stories
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <div className="text-6xl mb-4">💫</div>
                <p className="text-indigo-700 font-semibold text-lg">"Alone we can do so little; together we can do so much"</p>
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
            <h2 className="text-3xl font-semibold text-indigo-800 mb-8 text-center">Community Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communityFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-indigo-500"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="font-bold text-xl mb-3 text-indigo-700">{feature.title}</h3>
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
            className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-8 text-white text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Supportive Community</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Connect with others who understand your journey and discover the strength that comes from shared support.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/community-forums")}
              className="bg-white text-indigo-600 font-semibold py-3 px-8 rounded-full transition shadow-lg"
            >
              Join Community
            </motion.button>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CommunitySupport;