import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#F5F0E8] text-[#5A3921] p-6"
    >
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#8B5A2B]">
          About MindCare
        </h1>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-[#5A3921]">Our Mission</h2>
              <p className="mb-6 text-[#5A3921]/90">
                MindCare was founded with the vision to make mental health support accessible to everyone. 
                We believe in compassionate, evidence-based care that empowers individuals to take 
                control of their mental wellbeing.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-[#5A3921]">Our Approach</h2>
              <p className="mb-6 text-[#5A3921]/90">
                Combining the latest psychological research with user-friendly technology, 
                we create resources that are both effective and easy to use.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#5A3921]">Contact Us</h2>
              <p className="text-[#5A3921]/90">
                Email: <a href="mailto:info@mindcare.com" className="text-[#8B5A2B]">info@mindcare.com</a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;