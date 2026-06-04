import React from 'react';
import { motion } from 'framer-motion';
import { FaUniversalAccess, FaWheelchair, FaAssistiveListeningSystems, FaBraille } from 'react-icons/fa';

const Accessibility = () => {
  const features = [
    {
      icon: <FaUniversalAccess className="text-2xl text-[#8B5A2B]" />,
      title: "Keyboard Navigation",
      description: "Our site can be fully navigated using only a keyboard"
    },
    {
      icon: <FaWheelchair className="text-2xl text-[#8B5A2B]" />,
      title: "Screen Reader Compatible",
      description: "Compatible with major screen readers like JAWS and NVDA"
    },
    {
      icon: <FaAssistiveListeningSystems className="text-2xl text-[#8B5A2B]" />,
      title: "Text-to-Speech",
      description: "Content can be read aloud using browser tools"
    },
    {
      icon: <FaBraille className="text-2xl text-[#8B5A2B]" />,
      title: "High Contrast Mode",
      description: "Toggle available for improved visibility"
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
          Accessibility Statement
        </h1>
        
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-[#5A3921]">Our Commitment</h2>
          <p className="text-[#5A3921]/90 mb-4">
            MindCare is committed to ensuring digital accessibility for people with disabilities. 
            We are continually improving the user experience for everyone and applying the 
            relevant accessibility standards.
          </p>
          <p className="text-[#5A3921]/90">
            We aim to conform to WCAG 2.1 Level AA standards and follow best practices for 
            accessible design.
          </p>
        </div>
        
        <h2 className="text-2xl font-semibold mb-6 text-[#5A3921]">Accessibility Features</h2>
        
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-lg shadow-sm border border-[#E3D5CA]"
            >
              <div className="flex items-start">
                <div className="mr-4">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#5A3921] mb-1">{feature.title}</h3>
                  <p className="text-[#5A3921]/90">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-[#5A3921]">Feedback & Assistance</h2>
          <p className="text-[#5A3921]/90 mb-4">
            We welcome your feedback on the accessibility of MindCare. Please let us know if you 
            encounter accessibility barriers:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-[#5A3921]/90 mb-6">
            <li>Email: <a href="mailto:accessibility@mindcare.com" className="text-[#8B5A2B]">accessibility@mindcare.com</a></li>
            <li>Phone: 1-800-MIND-CARE</li>
            <li>Feedback form on our Contact page</li>
          </ul>
          <p className="text-[#5A3921]/90">
            We try to respond to feedback within 3 business days.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Accessibility;