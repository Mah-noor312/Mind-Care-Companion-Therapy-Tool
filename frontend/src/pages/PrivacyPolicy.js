// src/pages/PrivacyPolicy.js
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const privacySections = [
    {
      title: "Data Collection",
      icon: "📝",
      content: "We only collect necessary information to provide our services. This includes your account details and conversation history with our AI, which helps improve your personalized experience."
    },
    {
      title: "Data Usage",
      icon: "🔍",
      content: "Your data is used solely to deliver and improve our services. We never sell your information to third parties. Conversation data may be analyzed anonymously to enhance our AI's emotional intelligence."
    },
    {
      title: "Data Protection",
      icon: "🔒",
      content: "We employ industry-standard encryption for data in transit and at rest. Regular security audits ensure your information remains protected against unauthorized access."
    },
    {
      title: "Your Rights",
      icon: "👤",
      content: "You have the right to access, correct, or delete your personal data at any time through your account settings or by contacting our support team."
    },
    {
      title: "Third Parties",
      icon: "🤝",
      content: "We only share data with essential service providers under strict confidentiality agreements. These include hosting services and analytics providers that help maintain our platform."
    },
    {
      title: "Policy Changes",
      icon: "🔄",
      content: "We'll notify you of any significant changes to this policy. Continued use of our services after updates constitutes acceptance of the revised policy."
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
              Privacy Policy
            </h1>
            <p className="text-xl text-[#8C5D36] max-w-3xl mx-auto">
              Your trust is important to us. Learn how we protect your information and respect your privacy.
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
            <h2 className="text-3xl font-semibold text-[#8C5D36] mb-6">Your Data is Secure With Us</h2>
            <p className="mb-6 text-lg">
              We prioritize your privacy and implement strict measures to protect your personal 
              information and conversations. This policy explains how we collect, use, and safeguard 
              your data when you use our services.
            </p>
            <div className="bg-[#f8f1e9] p-6 rounded-lg">
              <h3 className="font-bold text-xl mb-3 text-[#8C5D36]">Last Updated: {new Date().toLocaleDateString()}</h3>
              <p>By using our services, you agree to the collection and use of information in accordance with this policy.</p>
            </div>
          </motion.section>

          {/* Privacy Principles Grid */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16"
          >
            <h2 className="text-3xl font-semibold text-[#8C5D36] mb-8 text-center">Our Privacy Principles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {privacySections.map((section, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-[#A47148]"
                >
                  <div className="text-4xl mb-4">{section.icon}</div>
                  <h3 className="font-bold text-xl mb-3 text-[#8C5D36]">{section.title}</h3>
                  <p className="text-gray-700">{section.content}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Detailed Policy Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white rounded-xl shadow-lg p-8 mb-16"
          >
            <h2 className="text-3xl font-semibold text-[#8C5D36] mb-6">Detailed Policy Information</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-xl mb-2 text-[#8C5D36]">1. Information We Collect</h3>
                <p className="text-gray-700">
                  We collect information you provide directly, including account registration details, 
                  conversation history with our AI, and any feedback you submit. We also automatically 
                  collect certain technical data like IP addresses and device information.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-xl mb-2 text-[#8C5D36]">2. How We Use Your Information</h3>
                <p className="text-gray-700">
                  Your information helps us provide, maintain, and improve our services, develop new features, 
                  communicate with you, and ensure platform security. Conversation data is anonymized and 
                  aggregated for AI training purposes.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-xl mb-2 text-[#8C5D36]">3. Data Security Measures</h3>
                <p className="text-gray-700">
                  We implement SSL encryption, regular security audits, access controls, and data minimization 
                  practices. While we strive to protect your data, no method of electronic transmission or 
                  storage is 100% secure.
                </p>
              </div>
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
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Have Questions About Privacy?</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Our AI companion can answer general questions about our privacy practices, 
              or you can contact our support team for specific concerns.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleTryNow}
              className="bg-white text-[#8C5D36] font-semibold py-3 px-8 rounded-full transition shadow-lg"
            >
              Ask Our AI
            </motion.button>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;