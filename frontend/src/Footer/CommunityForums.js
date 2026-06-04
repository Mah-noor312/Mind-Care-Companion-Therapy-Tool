import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaEnvelope, 
  FaGithub, 
  FaCode,
  FaRobot,
  FaGlobe,
  FaArrowLeft,
  FaUniversity,
  FaLaptopCode
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CommunityForums = () => {
  const navigate = useNavigate();

  const teamMembers = [
    {
      id: 1,
      name: "Azizullah Hazrati",
      role: "Backend Developer",
      email: "azizullah.cs21@numl.edu.pk",
      github: "azizullah-dev",
      semester: "8th Semester BS Computer Science",
      specialization: "Chatbot Development & API Integration",
      skills: ["Python", "NLP", "Dialogflow", "Flask"],
      contributions: [
        "Developed chatbot conversation flows",
        "Integrated chatbot with website backend",
        "Implemented sentiment analysis"
      ],
      avatarColor: "bg-blue-100 text-blue-800",
      icon: <FaRobot className="text-2xl" />
    },
    {
      id: 2,
      name: "Syed Arifullah",
      role: "Full Stack Developer",
      email: "arifullah.cs21@numl.edu.pk",
      github: "arifullah-code",
      semester: "8th Semester BS Computer Science",
      specialization: "Database & Frontend Integration",
      skills: ["React", "Firebase", "SQL", "API Development"],
      contributions: [
        "Built mental health assessment forms",
        "Connected chatbot to database",
        "Developed user authentication"
      ],
      avatarColor: "bg-green-100 text-green-800",
      icon: <FaCode className="text-2xl" />
    },
    {
      id: 3,
      name: "Mahnoor Waheed",
      role: "Frontend Developer",
      email: "mahnoor.cs21@numl.edu.pk",
      github: "mahnoor-ui",
      semester: "8th Semester BS Computer Science",
      specialization: "UI/UX Design",
      skills: ["React", "CSS", "Figma", "User Testing"],
      contributions: [
        "Designed chatbot interface",
        "Created responsive layouts",
        "Implemented accessibility features"
      ],
      avatarColor: "bg-purple-100 text-purple-800",
      icon: <FaGlobe className="text-2xl" />
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-[#F5F0E8] to-[#E3D5CA] text-[#5A3921] p-6"
    >
      <div className="max-w-6xl mx-auto py-12">
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center bg-[#8B5A2B] text-white px-4 py-2 rounded-lg hover:bg-[#5A3921] transition-colors shadow-md"
          >
            <FaArrowLeft className="mr-2" />
            Back to Main
          </button>
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-[#8B5A2B]">
              NUML Mental Health Project
            </h1>
            <p className="text-[#5A3921] mt-2">BS Computer Science - 8th Semester</p>
          </div>
          <div className="w-24"></div>
        </div>

        {/* Project Overview */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-12 border-l-8 border-[#8B5A2B]">
          <h2 className="text-2xl font-bold text-[#5A3921] mb-4">
            Chatbot + Website for Mental Health
          </h2>
          <p className="text-[#5A3921]/90 mb-4">
            Under the supervision of <span className="font-semibold">Ma'am Sara Mazhar</span>, 
            our team is developing an innovative mental health solution combining an AI chatbot 
            with a supportive website platform. This is our final year project at NUML University.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-[#8B5A2B] mb-2">Chatbot Features:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Emotional support conversations</li>
                <li>Mental health assessments</li>
                <li>Resource recommendations</li>
                <li>Crisis detection</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[#8B5A2B] mb-2">Website Features:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Therapist matching system</li>
                <li>Mental health resources</li>
                <li>Progress tracking</li>
                <li>Community support</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Team Members Grid */}
        <h2 className="text-2xl font-bold text-[#8B5A2B] mb-6 flex items-center">
          <FaUniversity className="mr-3" />
          Development Team
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              whileHover={{ y: -8, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
              className="bg-white p-6 rounded-xl shadow-md border-t-4 border-[#8B5A2B] hover:border-[#5A3921] transition-all"
            >
              <div className="text-center mb-4">
                <div className={`${member.avatarColor} w-24 h-24 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl font-bold`}>
                  {member.icon}
                </div>
                <h2 className="text-xl font-bold text-[#5A3921]">{member.name}</h2>
                <p className="text-[#8B5A2B] font-medium">{member.role}</p>
                <p className="text-sm text-gray-600">{member.semester}</p>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">Specialization:</h3>
                <p className="text-sm bg-[#F5F0E8] p-2 rounded">{member.specialization}</p>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">Project Contributions:</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {member.contributions.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">Skills:</h3>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill, index) => (
                    <span key={index} className="bg-[#F5F0E8] text-[#5A3921] px-2 py-1 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <FaEnvelope className="text-[#8B5A2B] mr-2" />
                  <a href={`mailto:${member.email}`} className="hover:underline">{member.email}</a>
                </div>
                <div className="flex items-center">
                  <FaGithub className="text-[#8B5A2B] mr-2" />
                  <a 
                    href={`https://github.com/${member.github}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {member.github}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Stack */}
        <div className="mt-12 bg-white p-6 rounded-xl shadow-lg border-l-8 border-[#8B5A2B]">
          <h2 className="text-2xl font-bold text-[#5A3921] mb-4">Our Project Stack</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-semibold text-[#8B5A2B] mb-2 flex items-center">
                <FaRobot className="mr-2" />
                Chatbot
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Python with NLTK</li>
                <li>Dialogflow integration</li>
                <li>Sentiment analysis</li>
                <li>Flask API</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[#8B5A2B] mb-2 flex items-center">
                <FaGlobe className="mr-2" />
                Frontend
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>React.js</li>
                <li>Tailwind CSS</li>
                <li>Framer Motion</li>
                <li>Axios for API calls</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[#8B5A2B] mb-2 flex items-center">
                <FaCode className="mr-2" />
                Backend
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Node.js with Express</li>
                <li>Firebase/Firestore</li>
                <li>JWT Authentication</li>
                <li>RESTful APIs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CommunityForums;