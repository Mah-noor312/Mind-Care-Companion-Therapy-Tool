import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CrisisIntervention = () => {
  const navigate = useNavigate();

  const crisisFeatures = [
    {
      icon: "🚨",
      title: "24/7 Hotlines",
      description: "Immediate access to trained crisis counselors anytime, anywhere"
    },
    {
      icon: "📍",
      title: "Local Resources",
      description: "Find nearby mental health services and emergency care facilities"
    },
    {
      icon: "🆘",
      title: "Emergency Protocols",
      description: "Step-by-step guidance during mental health emergencies"
    },
    {
      icon: "📞",
      title: "Direct Connection",
      description: "One-tap calling to emergency services and crisis lines"
    },
    {
      icon: "🛡️",
      title: "Safety Planning",
      description: "Create personalized safety plans for crisis situations"
    },
    {
      icon: "👨‍⚕️",
      title: "Professional Access",
      description: "Quick connection to mental health professionals when needed"
    }
  ];

  const emergencyContacts = [
    { name: "National Suicide Prevention Lifeline", number: "988", available: "24/7" },
    { name: "Crisis Text Line", number: "Text HOME to 741741", available: "24/7" },
    { name: "Emergency Services", number: "911", available: "24/7" },
    { name: "SAMHSA Helpline", number: "1-800-662-4357", available: "24/7" }
  ];

  return (
    <div className="font-[Poppins] min-h-screen flex flex-col bg-gradient-to-b from-red-50 to-orange-50 text-gray-800">
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
            <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-orange-500 rounded-full flex items-center justify-center text-3xl text-white mx-auto mb-6">
              ⚡
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-red-800 mb-4">
              Crisis Intervention
            </h1>
            <p className="text-xl text-red-600 max-w-3xl mx-auto">
              Immediate support when you need it most. We're here for you 24/7.
            </p>
          </motion.section>

          {/* Emergency Contacts */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg p-8 mb-16"
          >
            <h2 className="text-3xl font-semibold text-red-800 mb-6">Immediate Help Available</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-red-700 mb-4">Emergency Contacts</h3>
                <div className="space-y-4">
                  {emergencyContacts.map((contact, index) => (
                    <div key={index} className="border-l-4 border-red-500 pl-4 py-2">
                      <h4 className="font-semibold text-red-800">{contact.name}</h4>
                      <p className="text-lg font-bold text-red-600">{contact.number}</p>
                      <p className="text-sm text-gray-600">Available: {contact.available}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-red-50 rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-red-700 mb-4">When to Seek Immediate Help</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Thoughts of harming yourself or others
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Overwhelming anxiety or panic attacks
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Severe depression impacting daily function
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Substance abuse emergencies
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
            <h2 className="text-3xl font-semibold text-red-800 mb-8 text-center">Crisis Support Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {crisisFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-red-500"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="font-bold text-xl mb-3 text-red-700">{feature.title}</h3>
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
            className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-8 text-white text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Immediate Support When You Need It</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Don't wait in crisis. Access immediate help and resources right now.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/helplines")}
                className="bg-white text-red-600 font-semibold py-3 px-8 rounded-full transition shadow-lg"
              >
                View All Resources
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/crisis-resources")}
                className="bg-red-700 text-white font-semibold py-3 px-8 rounded-full transition shadow-lg border border-white"
              >
                Emergency Help
              </motion.button>
            </div>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CrisisIntervention;