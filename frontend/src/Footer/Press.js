import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaNewspaper, FaMicrophone, FaAward, FaHome, FaTimes, FaDownload, FaExternalLinkAlt } from 'react-icons/fa';

const Press = () => {
  const navigate = useNavigate();
  const [showPressKitModal, setShowPressKitModal] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const pressItems = [
    {
      id: 1,
      icon: <FaNewspaper className="text-2xl text-[#8B5A2B]" />,
      title: "MindCare Featured in TechHealth Magazine",
      date: "March 15, 2023",
      excerpt: "How digital mental health platforms are changing access to care",
      link: "https://techhealth.com/mindcare-digital-mental-health",
      fullContent: "TechHealth Magazine's in-depth look at how MindCare is revolutionizing mental health access through technology. The article highlights our innovative platform and user success stories.",
      publication: "TechHealth Magazine",
      author: "Sarah Johnson"
    },
    {
      id: 2,
      icon: <FaMicrophone className="text-2xl text-[#8B5A2B]" />,
      title: "CEO Interview on Mental Health Innovation Podcast",
      date: "January 28, 2023",
      excerpt: "Founder discusses the future of teletherapy and AI-assisted care",
      link: "https://www.mentalhealthinnovation.org/podcast/mindcare-ceo",
      fullContent: "Our CEO shares insights on the future of mental health technology, including how AI can support (but not replace) human therapists, and our vision for global mental health accessibility.",
      publication: "Mental Health Innovation Podcast",
      author: "David Chen"
    },
    {
      id: 3,
      icon: <FaAward className="text-2xl text-[#8B5A2B]" />,
      title: "MindCare Wins Digital Health Innovation Award",
      date: "November 5, 2022",
      excerpt: "Recognized for outstanding contribution to mental health accessibility",
      link: "https://digitalhealthawards.org/2022-winners/mindcare",
      fullContent: "MindCare received the prestigious Digital Health Innovation Award for our work in breaking down barriers to mental health care. The award recognizes our unique approach to combining technology with human-centered design.",
      publication: "Digital Health Awards",
      author: "Priya Patel"
    }
  ];

  const handleDownloadPressKit = () => {
    setShowPressKitModal(true);
    setDownloadProgress(0);
    
    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const closePressKitModal = () => {
    setShowPressKitModal(false);
    setDownloadProgress(0);
  };

  const openArticleModal = (article) => {
    setSelectedArticle(article);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#F5F0E8] text-[#5A3921] p-6"
    >
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center px-4 py-2 bg-[#8B5A2B] text-white rounded-lg hover:bg-[#5A3921] transition-colors"
          >
            <FaHome className="mr-2" />
            Back to Main
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-[#8B5A2B]">
            Press & Media
          </h1>
          <div className="w-24"></div>
        </div>
        
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-[#5A3921]">Media Inquiries</h2>
          <p className="text-[#5A3921]/90 mb-4">
            For press inquiries, interview requests, or media partnerships, please contact our 
            communications team:
          </p>
          <p className="text-[#8B5A2B] font-medium">
            <a href="mailto:press@mindcare.com" className="hover:underline">
              press@mindcare.com
            </a> | (555) 123-4567
          </p>
        </div>
        
        <h2 className="text-2xl font-semibold mb-6 text-[#5A3921]">Recent Coverage</h2>
        
        <div className="space-y-6">
          {pressItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -3 }}
              className="bg-white p-6 rounded-lg shadow-sm border border-[#E3D5CA]"
            >
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  {item.icon}
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-[#5A3921]">{item.title}</h3>
                  <p className="text-sm text-[#5A3921]/80 mb-2">{item.date}</p>
                  <p className="text-[#5A3921]/90 mb-3">{item.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => openArticleModal(item)}
                      className="text-[#8B5A2B] font-medium hover:underline inline-flex items-center"
                    >
                      View Details
                    </button>
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#8B5A2B] font-medium hover:underline inline-flex items-center"
                    >
                      Visit Site <FaExternalLinkAlt className="ml-1 text-sm" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-semibold mb-2 text-[#5A3921]">Press Kit</h2>
              <p className="text-[#5A3921]/90">
                Download our brand assets, logos, and company information.
              </p>
            </div>
            <button 
              onClick={handleDownloadPressKit}
              className="flex items-center px-6 py-3 bg-[#8B5A2B] text-white rounded-lg hover:bg-[#5A3921] transition-colors"
            >
              <FaDownload className="mr-2" />
              Download Press Kit
            </button>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center px-6 py-3 border border-[#8B5A2B] text-[#8B5A2B] rounded-lg hover:bg-[#8B5A2B] hover:text-white transition-colors"
          >
            <FaHome className="mr-2" />
            Back to Main Page
          </button>
        </div>
      </div>

      {/* Press Kit Download Modal */}
      <AnimatePresence>
        {showPressKitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={closePressKitModal}
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              exit={{ y: 50 }}
              className="bg-white rounded-lg max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-[#8B5A2B]">
                  Download Press Kit
                </h2>
                <button 
                  onClick={closePressKitModal}
                  className="text-[#5A3921] hover:text-[#8B5A2B]"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="mb-4">
                <p className="text-[#5A3921]/90 mb-4">
                  The press kit contains high-resolution logos, brand guidelines, 
                  executive bios, and product screenshots.
                </p>
                
                {downloadProgress < 100 ? (
                  <div className="w-full bg-[#E3D5CA] rounded-full h-2.5">
                    <motion.div 
                      className="bg-[#8B5A2B] h-2.5 rounded-full" 
                      initial={{ width: 0 }}
                      animate={{ width: `${downloadProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <div className="text-green-600 font-bold text-lg mb-2">
                      Download Complete!
                    </div>
                    <p className="text-[#5A3921]/90">
                      Press kit has been downloaded to your device.
                    </p>
                  </div>
                )}
              </div>

              {downloadProgress < 100 && (
                <p className="text-sm text-[#5A3921]/80 text-center">
                  {downloadProgress}% downloaded...
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Article Detail Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              exit={{ y: 50 }}
              className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-[#8B5A2B]">
                  {selectedArticle.title}
                </h2>
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="text-[#5A3921] hover:text-[#8B5A2B]"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="mb-4">
                <p className="text-sm text-[#5A3921]/80 mb-2">
                  Published on {selectedArticle.date} | {selectedArticle.publication} | By {selectedArticle.author}
                </p>
                <div className="flex items-center mb-4">
                  {selectedArticle.icon}
                  <span className="ml-2 text-[#5A3921] font-medium">{selectedArticle.publication}</span>
                </div>
                <p className="text-[#5A3921]/90 mb-4 whitespace-pre-line">
                  {selectedArticle.fullContent}
                </p>
                <a 
                  href={selectedArticle.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-[#8B5A2B] text-white rounded-lg hover:bg-[#5A3921] transition-colors"
                >
                  <FaExternalLinkAlt className="mr-2" />
                  Read Full Article on {selectedArticle.publication}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Press;