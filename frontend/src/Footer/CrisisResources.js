import React from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaGlobe, FaInfoCircle, FaMapMarkerAlt, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CrisisResources = () => {
  const navigate = useNavigate();

  const resources = [
    {
      name: "National Suicide Prevention Lifeline (US)",
      phone: "988",
      website: "https://988lifeline.org",
      description: "24/7 free and confidential support",
      region: "International"
    },
    {
      name: "Crisis Text Line (US)",
      phone: "Text HOME to 741741",
      website: "https://www.crisistextline.org",
      description: "Free 24/7 support via text message",
      region: "International"
    },
    {
      name: "Umang (India)",
      phone: "+91-22-2556 3291",
      website: "https://www.umangfoundation.org",
      description: "Mental health support for India",
      region: "India"
    },
    {
      name: "Koshish (Pakistan)",
      phone: "+92-21-111-273-273",
      website: "https://www.koshish.org.pk",
      description: "Mental health helpline Pakistan",
      region: "Pakistan"
    },
    {
      name: "AASRA (India)",
      phone: "+91-98204-66726",
      website: "https://www.aasra.info",
      description: "24/7 suicide prevention helpline",
      region: "India"
    },
    {
      name: "Befrienders Karachi (Pakistan)",
      phone: "+92-21-111-247-247",
      website: "https://befrienderspk.org",
      description: "Emotional support helpline",
      region: "Pakistan"
    },
    {
      name: "Mental Health Afghanistan",
      phone: "+93 79 985 5300",
      website: "https://www.mhah.org",
      description: "Mental health support in Dari/Pashto",
      region: "Afghanistan"
    },
    {
      name: "Lifeline Foundation (Bangladesh)",
      phone: "+880-1737-015949",
      website: "https://lifelinebd.org",
      description: "Suicide prevention helpline",
      region: "Bangladesh"
    },
    {
      name: "Befrienders Sri Lanka",
      phone: "+94 11 2 682 535",
      website: "https://www.befrienders.lk",
      description: "Emotional support in Sinhala/English",
      region: "Sri Lanka"
    },
    {
      name: "Nepal Mental Health Helpline",
      phone: "+977-1-4412308",
      website: "https://www.cns.org.np",
      description: "Mental health support in Nepali",
      region: "Nepal"
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
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center bg-[#8B5A2B] text-white px-4 py-2 rounded-lg hover:bg-[#5A3921] transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Main
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-[#8B5A2B]">
            Crisis Resources
          </h1>
          <div className="w-24"></div> {/* Spacer for alignment */}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="mb-6 bg-[#F5F0E8] p-4 rounded-lg">
            <div className="flex items-start">
              <FaInfoCircle className="text-[#8B5A2B] text-xl mr-3 mt-1" />
              <p className="text-[#5A3921]/90">
                If you're in immediate danger or experiencing a medical emergency, 
                please call your local emergency number (112 in most countries, 911 in US) 
                or go to the nearest emergency room.
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            {resources.map((resource, index) => (
              <motion.div 
                key={index}
                whileHover={{ x: 5 }}
                className="border-b border-[#E3D5CA] pb-6 last:border-0"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold mb-1 text-[#5A3921]">{resource.name}</h2>
                    <div className="flex items-center text-sm text-[#5A3921]/80 mb-3">
                      <FaMapMarkerAlt className="mr-1" />
                      {resource.region}
                    </div>
                  </div>
                </div>
                <p className="mb-4 text-[#5A3921]/90">{resource.description}</p>
                
                <div className="flex flex-wrap gap-4">
                  {resource.phone && (
                    <a 
                      href={`tel:${resource.phone.replace(/\D/g, '')}`}
                      className="flex items-center bg-[#F5F0E8] px-3 py-2 rounded hover:bg-[#E3D5CA] transition-colors"
                    >
                      <FaPhone className="mr-2 text-[#8B5A2B]" />
                      <span className="font-medium">{resource.phone}</span>
                    </a>
                  )}
                  {resource.website && (
                    <a 
                      href={resource.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center bg-[#F5F0E8] px-3 py-2 rounded hover:bg-[#E3D5CA] transition-colors"
                    >
                      <FaGlobe className="mr-2 text-[#8B5A2B]" />
                      <span className="font-medium">Visit Website</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CrisisResources;