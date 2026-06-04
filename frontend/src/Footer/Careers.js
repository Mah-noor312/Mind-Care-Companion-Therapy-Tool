import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaBriefcase, FaHandsHelping, FaUserGraduate, FaLaptopCode, FaHome, FaTimes } from 'react-icons/fa';

const Careers = () => {
  const navigate = useNavigate();
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resume: '',
    coverLetter: ''
  });
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  const positions = [
    {
      id: 1,
      icon: <FaBriefcase className="text-2xl text-[#8B5A2B]" />,
      title: "Licensed Therapist",
      type: "Full-time/Part-time",
      location: "Remote",
      description: "Provide teletherapy services through our platform",
      requirements: [
        "Active clinical license in your state",
        "2+ years of clinical experience",
        "Specialization in CBT or DBT preferred"
      ]
    },
    {
      id: 2,
      icon: <FaHandsHelping className="text-2xl text-[#8B5A2B]" />,
      title: "Support Counselor",
      type: "Full-time",
      location: "Remote",
      description: "Offer chat and email support to our community members",
      requirements: [
        "Bachelor's in Psychology or related field",
        "1+ year in mental health support role",
        "Excellent communication skills"
      ]
    },
    {
      id: 3,
      icon: <FaUserGraduate className="text-2xl text-[#8B5A2B]" />,
      title: "Clinical Supervisor",
      type: "Part-time",
      location: "Remote",
      description: "Provide oversight and guidance to our therapist team",
      requirements: [
        "Licensed psychologist or LCSW",
        "5+ years clinical experience",
        "Supervisory certification preferred"
      ]
    },
    {
      id: 4,
      icon: <FaLaptopCode className="text-2xl text-[#8B5A2B]" />,
      title: "UX Designer",
      type: "Full-time",
      location: "Remote",
      description: "Improve user experience for our mental health platform",
      requirements: [
        "3+ years UX design experience",
        "Portfolio demonstrating user-centered design",
        "Familiarity with accessibility standards"
      ]
    }
  ];

  const handleApplyClick = (position) => {
    setSelectedPosition(position);
    setFormData({
      name: '',
      email: '',
      resume: '',
      coverLetter: ''
    });
    setApplicationSubmitted(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log('Application submitted:', { position: selectedPosition.title, ...formData });
    setApplicationSubmitted(true);
    setTimeout(() => {
      setSelectedPosition(null);
    }, 3000);
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
            Careers at MindCare
          </h1>
          <div className="w-24"></div>
        </div>
        
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-[#5A3921]">Why Join Our Team?</h2>
          <p className="text-[#5A3921]/90 mb-4">
            At MindCare, we're building a future where mental health support is accessible to all. 
            Join our mission-driven team and make a real difference in people's lives.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-[#5A3921]/90">
            <li>Flexible remote work options</li>
            <li>Competitive compensation and benefits</li>
            <li>Ongoing professional development</li>
            <li>Supportive, collaborative culture</li>
          </ul>
        </div>
        
        <h2 className="text-2xl font-semibold mb-6 text-[#5A3921]">Current Openings</h2>
        
        <div className="grid gap-6">
          {positions.map((position) => (
            <motion.div
              key={position.id}
              whileHover={{ x: 5 }}
              className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#8B5A2B]"
            >
              <div className="flex items-start">
                <div className="mr-4">
                  {position.icon}
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-[#5A3921]">{position.title}</h3>
                  <div className="flex flex-wrap gap-4 mt-2 mb-3">
                    <span className="text-sm bg-[#E3D5CA] text-[#5A3921] px-3 py-1 rounded-full">
                      {position.type}
                    </span>
                    <span className="text-sm bg-[#E3D5CA] text-[#5A3921] px-3 py-1 rounded-full">
                      {position.location}
                    </span>
                  </div>
                  <p className="text-[#5A3921]/90 mb-3">{position.description}</p>
                  <div className="mb-4">
                    <h4 className="font-medium text-[#5A3921] mb-2">Requirements:</h4>
                    <ul className="list-disc pl-5 text-[#5A3921]/90">
                      {position.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <button 
                  onClick={() => handleApplyClick(position)}
                  className="px-4 py-2 bg-[#8B5A2B] text-white rounded-lg hover:bg-[#5A3921] transition-colors"
                >
                  Apply Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-center">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center px-6 py-3 border border-[#8B5A2B] text-[#8B5A2B] rounded-lg hover:bg-[#8B5A2B] hover:text-white transition-colors"
            >
              <FaHome className="mr-2" />
              Back to Main Page
            </button>
          </div>
        </div>

        {/* Application Modal */}
        <AnimatePresence>
          {selectedPosition && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedPosition(null)}
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
                    Apply for {selectedPosition.title}
                  </h2>
                  <button 
                    onClick={() => setSelectedPosition(null)}
                    className="text-[#5A3921] hover:text-[#8B5A2B]"
                  >
                    <FaTimes />
                  </button>
                </div>
                
                {applicationSubmitted ? (
                  <div className="text-center py-8">
                    <div className="text-green-600 font-bold text-lg mb-2">
                      Application Submitted!
                    </div>
                    <p className="text-[#5A3921]/90">
                      Thank you for applying to the {selectedPosition.title} position. 
                      Our team will review your application and contact you if there's a match.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitApplication}>
                    <div className="mb-4">
                      <label className="block text-[#5A3921]/90 mb-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-[#E3D5CA] rounded-lg"
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-[#5A3921]/90 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-[#E3D5CA] rounded-lg"
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-[#5A3921]/90 mb-1">Resume (URL)</label>
                      <input
                        type="url"
                        name="resume"
                        value={formData.resume}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-[#E3D5CA] rounded-lg"
                        required
                        placeholder="Link to your resume"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-[#5A3921]/90 mb-1">Cover Letter</label>
                      <textarea
                        name="coverLetter"
                        value={formData.coverLetter}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-[#E3D5CA] rounded-lg"
                        rows="4"
                        required
                        placeholder="Why are you interested in this position?"
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-[#8B5A2B] text-white rounded-lg hover:bg-[#5A3921] transition-colors mt-4"
                    >
                      Submit Application
                    </button>
                  </form>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Careers;