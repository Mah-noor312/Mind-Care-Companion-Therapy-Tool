import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaBook, FaHeadset, FaYoutube, FaEnvelope, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';

const MentalHealthGuides = () => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const guides = [
    {
      title: "Understanding Anxiety",
      description: "Learn about symptoms, causes, and coping strategies for anxiety disorders.",
      youtubeLink: "https://www.youtube.com/embed/JOKS9Bx8-Sw",
      resourceLink: "https://www.nimh.nih.gov/health/topics/anxiety-disorders",
      keyPoints: [
        "Recognizing physical and emotional symptoms",
        "Cognitive-behavioral techniques",
        "Breathing exercises for immediate relief"
      ]
    },
    {
      title: "Depression Handbook",
      description: "Comprehensive guide to recognizing and managing depression.",
      youtubeLink: "https://www.youtube.com/embed/XiCrniLQGYc",
      resourceLink: "https://www.nimh.nih.gov/health/topics/depression",
      keyPoints: [
        "Understanding different types of depression",
        "Building a support system",
        "Daily routines to improve mood"
      ]
    },
    {
      title: "Stress Management",
      description: "Techniques to reduce stress and improve resilience.",
      youtubeLink: "https://www.youtube.com/embed/0fL-pn80s-c",
      resourceLink: "https://www.cdc.gov/mentalhealth/stress-coping/index.html",
      keyPoints: [
        "Identifying stress triggers",
        "Time management strategies",
        "Mind-body connection techniques"
      ]
    },
    {
      title: "Mindfulness Practices",
      description: "Beginner to advanced mindfulness exercises.",
      youtubeLink: "https://www.youtube.com/embed/ssss7V1_eyA",
      resourceLink: "https://www.mindful.org/meditation/mindfulness-getting-started/",
      keyPoints: [
        "Basic meditation techniques",
        "Mindful eating and walking",
        "Advanced visualization methods"
      ]
    }
  ];

  const contactEmail = "azizalone665@gmail.com";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  const openEmailForm = () => {
    setShowEmailForm(true);
    setSubmitStatus(null);
  };

  const closeEmailForm = () => {
    setShowEmailForm(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#F5F0E8] text-[#5A3921] p-6 relative"
    >
      {/* Email Form Modal */}
      {showEmailForm && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={closeEmailForm}
        >
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-lg shadow-lg w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#8B5A2B]">Contact Our Team</h3>
              <button 
                onClick={closeEmailForm}
                className="text-[#5A3921] hover:text-[#8B5A2B]"
              >
                <FaTimes />
              </button>
            </div>

            {submitStatus === 'success' ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                <p>Your message has been sent successfully!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-[#5A3921] mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-[#E3D5CA] rounded focus:outline-none focus:ring-1 focus:ring-[#8B5A2B]"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-[#5A3921] mb-2">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-[#E3D5CA] rounded focus:outline-none focus:ring-1 focus:ring-[#8B5A2B]"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="message" className="block text-[#5A3921] mb-2">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    className="w-full px-3 py-2 border border-[#E3D5CA] rounded focus:outline-none focus:ring-1 focus:ring-[#8B5A2B]"
                    required
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-4 py-2 rounded text-white ${isSubmitting ? 'bg-[#8B5A2B]/70' : 'bg-[#8B5A2B] hover:bg-[#5A3921]'}`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-8">
        {/* Header with back button */}
        <div className="flex items-center mb-8">
          <Link 
            to="/" 
            className="flex items-center text-[#8B5A2B] hover:text-[#5A3921] transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Main Page
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mx-auto text-center text-[#8B5A2B]">
            Mental Health Resource Center
          </h1>
        </div>

        {/* Introduction */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-[#E3D5CA]">
          <h2 className="text-2xl font-semibold mb-4 text-[#8B5A2B]">Professional Mental Health Resources</h2>
          <p className="text-[#5A3921]/90 mb-4">
            Access expert-curated videos and guides from leading mental health organizations.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <Link 
              to="/chatbot" 
              className="flex items-center px-4 py-2 bg-[#8B5A2B] text-white rounded-lg hover:bg-[#5A3921] transition-colors"
            >
              <FaHeadset className="mr-2" />
              Chat with Support Bot
            </Link>
            <button 
              onClick={openEmailForm}
              className="flex items-center px-4 py-2 border border-[#8B5A2B] text-[#8B5A2B] rounded-lg hover:bg-[#8B5A2B] hover:text-white transition-colors"
            >
              <FaEnvelope className="mr-2" />
              Email Our Team
            </button>
          </div>
        </div>

        {/* Guides Section */}
        <h2 className="text-2xl font-bold mb-6 text-[#5A3921] flex items-center">
          <FaBook className="mr-2 text-[#8B5A2B]" />
          Video Guides & Resources
        </h2>
        
        <div className="grid gap-8">
          {guides.map((guide, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-lg shadow-sm border border-[#E3D5CA]"
            >
              <h2 className="text-xl font-semibold mb-3 text-[#5A3921]">{guide.title}</h2>
              <p className="mb-4 text-[#5A3921]/90">{guide.description}</p>
              
              <div className="mb-4">
                <h3 className="font-medium text-[#5A3921] mb-2">Key Topics Covered:</h3>
                <ul className="list-disc pl-5 space-y-1 text-[#5A3921]/90">
                  {guide.keyPoints.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>

              {/* Embedded YouTube Video */}
              <div className="mb-6 aspect-w-16 aspect-h-9">
                <iframe 
                  src={guide.youtubeLink}
                  title={`${guide.title} Video`}
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="w-full h-64 rounded-lg"
                ></iframe>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <a
                  href={guide.resourceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-[#8B5A2B] text-white rounded-lg hover:bg-[#5A3921] transition-colors"
                >
                  <FaExternalLinkAlt className="mr-2" />
                  Read Official Guide
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-sm border border-[#E3D5CA]">
          <h2 className="text-2xl font-bold mb-4 text-[#8B5A2B]">Need Personalized Help?</h2>
          <p className="text-[#5A3921]/90 mb-4">
            Contact our support team directly for assistance or to suggest additional resources:
          </p>
          <button 
            onClick={openEmailForm}
            className="inline-flex items-center px-6 py-3 bg-[#8B5A2B] text-white rounded-lg hover:bg-[#5A3921] transition-colors"
          >
            <FaEnvelope className="mr-2" />
            Contact via Email Form
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MentalHealthGuides;