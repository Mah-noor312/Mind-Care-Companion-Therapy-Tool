import React from 'react';
import { motion } from 'framer-motion';

const CookiePolicy = () => {
  const cookieTypes = [
    {
      name: "Essential Cookies",
      purpose: "Necessary for the website to function properly",
      examples: "Session management, security features"
    },
    {
      name: "Analytics Cookies",
      purpose: "Help us understand how visitors interact with our site",
      examples: "Page visits, traffic sources"
    },
    {
      name: "Preference Cookies",
      purpose: "Remember your settings and preferences",
      examples: "Language preferences, font size"
    },
    {
      name: "Marketing Cookies",
      purpose: "Used to track visitors across websites",
      examples: "Advertising, remarketing"
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
          Cookie Policy
        </h1>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="prose max-w-none">
            <p className="text-[#5A3921]/90 mb-6">
              This Cookie Policy explains how MindCare uses cookies and similar technologies when 
              you visit our website. By using our site, you consent to our use of cookies in 
              accordance with this policy.
            </p>
            
            <h2 className="text-xl font-semibold mb-4 text-[#5A3921]">What Are Cookies?</h2>
            <p className="text-[#5A3921]/90 mb-6">
              Cookies are small text files stored on your device when you visit websites. They 
              help the site remember information about your visit, which can make it easier to 
              visit again and make the site more useful to you.
            </p>
            
            <h2 className="text-xl font-semibold mb-4 text-[#5A3921]">How We Use Cookies</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#E3D5CA]">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-[#5A3921]">Cookie Type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-[#5A3921]">Purpose</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-[#5A3921]">Examples</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E3D5CA]">
                  {cookieTypes.map((cookie, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm text-[#5A3921] font-medium">{cookie.name}</td>
                      <td className="px-4 py-3 text-sm text-[#5A3921]/90">{cookie.purpose}</td>
                      <td className="px-4 py-3 text-sm text-[#5A3921]/90">{cookie.examples}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <h2 className="text-xl font-semibold mb-4 mt-8 text-[#5A3921]">Managing Cookies</h2>
            <p className="text-[#5A3921]/90 mb-4">
              You can control and/or delete cookies as you wish. Most web browsers allow some 
              control of cookies through browser settings. However, if you disable essential 
              cookies, some parts of our site may not work properly.
            </p>
            
            <div className="mt-8 bg-[#F5F0E8] p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2 text-[#5A3921]">Changes to This Policy</h3>
              <p className="text-[#5A3921]/90">
                We may update this Cookie Policy from time to time. The "Last Updated" date at 
                the top of this page indicates when this policy was last revised.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CookiePolicy;