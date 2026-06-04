import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Information Collection",
      content: "We collect information you provide when using our services, including account creation and usage data."
    },
    {
      title: "Data Usage",
      content: "Your information helps us provide and improve our services, communicate with you, and ensure security."
    },
    {
      title: "Data Protection",
      content: "We implement industry-standard security measures to protect your personal information."
    },
    {
      title: "Your Rights",
      content: "You have the right to access, correct, or delete your personal data at any time."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#F5F0E8] text-[#5A3921] p-6"
    >
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#8B5A2B]">
          Privacy Policy
        </h1>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="prose max-w-none">
            {sections.map((section, index) => (
              <section key={index} className="mb-8">
                <h2 className="text-xl font-semibold mb-3 text-[#5A3921]">{section.title}</h2>
                <p className="text-[#5A3921]/90">{section.content}</p>
              </section>
            ))}
            <p className="text-sm text-[#5A3921]/70 mt-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;