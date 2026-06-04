// src/pages/Support24_7.js
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Support24_7 = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: "⏰",
      title: "Round-the-Clock Availability",
      description: "Access support whenever you need it, regardless of time zone or hour."
    },
    {
      icon: "🤝",
      title: "Immediate Response",
      description: "Get help when you need it most with our quick response system."
    },
    {
      icon: "🌎",
      title: "Global Support",
      description: "Available worldwide, providing help in multiple languages."
    },
    {
      icon: "🔗",
      title: "Seamless Connection",
      description: "Easy transition to human support when needed."
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
              24/7 Support
            </h1>
            <p className="text-xl text-[#8C5D36] max-w-3xl mx-auto">
              Always available when you need us - day or night, anytime, anywhere.
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
            <h2 className="text-3xl font-semibold text-[#8C5D36] mb-6">Always Here For You</h2>
            <p className="mb-6 text-lg">
              Our support system is available round the clock to provide assistance whenever you need it, 
              with seamless transition to human support when required.
            </p>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <div className="bg-gradient-to-r from-[#f5e9dd] to-[#f8f1e9] h-64 flex items-center justify-center">
                <p className="text-xl text-[#8C5D36]">24/7 Support Visualization</p>
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
            <h2 className="text-3xl font-semibold text-[#8C5D36] mb-8 text-center">Our Support Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Support Right Now?</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Our AI companion is always available to listen and help. For urgent matters, 
              we can connect you with human support when needed.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleTryNow}
              className="bg-white text-[#8C5D36] font-semibold py-3 px-8 rounded-full transition shadow-lg"
            >
              Get Support Now
            </motion.button>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Support24_7;