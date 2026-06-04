import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyFirst = () => {
  const navigate = useNavigate();

  const privacyFeatures = [
    {
      icon: "🔐",
      title: "End-to-End Encryption",
      description: "All conversations are encrypted and inaccessible to anyone but you"
    },
    {
      icon: "🗑️",
      title: "Automatic Deletion",
      description: "Chat history is automatically deleted after your session ends"
    },
    {
      icon: "👤",
      title: "Anonymous Usage",
      description: "Use our services without providing personal identification"
    },
    {
      icon: "📊",
      title: "No Data Selling",
      description: "We never sell, share, or monetize your personal information"
    },
    {
      icon: "🔍",
      title: "Transparent Policies",
      description: "Clear, understandable privacy policies with no hidden clauses"
    },
    {
      icon: "🛡️",
      title: "Security Audits",
      description: "Regular security assessments and vulnerability testing"
    }
  ];

  return (
    <div className="font-[Poppins] min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-teal-50 text-gray-800">
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
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center text-3xl text-white mx-auto mb-6">
              🔒
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
              Privacy First
            </h1>
            <p className="text-xl text-green-600 max-w-3xl mx-auto">
              Your confidentiality is our highest priority. Share freely, knowing your privacy is protected.
            </p>
          </motion.section>

          {/* Privacy Commitment */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg p-8 mb-16"
          >
            <h2 className="text-3xl font-semibold text-green-800 mb-6">Our Privacy Commitment</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-green-700 mb-4">What We Protect</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Conversation content and emotional disclosures
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Personal identifiers and contact information
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Usage patterns and behavioral data
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-green-700 mb-4">Your Rights</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Right to complete data deletion
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Control over what information is stored
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Transparency about data usage
                  </li>
                </ul>
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
            <h2 className="text-3xl font-semibold text-green-800 mb-8 text-center">Privacy Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {privacyFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-green-500"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="font-bold text-xl mb-3 text-green-700">{feature.title}</h3>
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
            className="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl p-8 text-white text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Your Privacy, Protected</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Speak freely about your mental health journey with complete confidence in your privacy.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/chatbot")}
              className="bg-white text-green-600 font-semibold py-3 px-8 rounded-full transition shadow-lg"
            >
              Start Private Conversation
            </motion.button>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyFirst;