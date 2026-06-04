import React from 'react';
import { motion } from 'framer-motion';

const TermsOfService = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing or using the MindCare platform, you agree to be bound by these Terms of Service. If you do not agree to all the terms, you may not access or use our services."
    },
    {
      title: "2. Description of Service",
      content: "MindCare provides digital mental health resources, including informational content, self-help tools, and community features. Our services are not a substitute for professional medical advice, diagnosis, or treatment."
    },
    {
      title: "3. User Responsibilities",
      content: "You agree to use the service only for lawful purposes and in a way that does not infringe the rights of others. You are responsible for maintaining the confidentiality of your account information."
    },
    {
      title: "4. Privacy Policy",
      content: "Your use of our services is also governed by our Privacy Policy, which explains how we collect, use, and protect your personal information."
    },
    {
      title: "5. Limitation of Liability",
      content: "MindCare shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service."
    },
    {
      title: "6. Changes to Terms",
      content: "We may modify these terms at any time. We will notify users of significant changes, and continued use of the service constitutes acceptance of the modified terms."
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
          Terms of Service
        </h1>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="prose max-w-none">
            <p className="text-[#5A3921]/90 mb-8">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
            
            {sections.map((section, index) => (
              <section key={index} className="mb-8">
                <h2 className="text-xl font-semibold mb-3 text-[#5A3921]">{section.title}</h2>
                <p className="text-[#5A3921]/90">{section.content}</p>
              </section>
            ))}
            
            <div className="mt-8 bg-[#F5F0E8] p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2 text-[#5A3921]">Contact Us</h3>
              <p className="text-[#5A3921]/90">
                If you have any questions about these Terms, please contact us at:
              </p>
              <p className="text-[#8B5A2B] font-medium mt-2">
                <a href="mailto:legal@mindcare.com" className="hover:underline">
                  legal@mindcare.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TermsOfService;