import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaUserMd, FaMapMarkerAlt, FaEnvelope, FaPhone, FaStar, FaCalendarAlt, FaHistory, FaTimes, FaClinicMedical, FaLanguage } from 'react-icons/fa';

const TherapistDirectory = () => {
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('All');

  const therapists = [
    {
      id: 1,
      name: "Dr. Ayesha Khan",
      specialty: "Anxiety & Depression",
      location: "Blue Area, Islamabad",
      clinic: "Islamabad Mental Health Center",
      email: "ayesha.k@therapy.com",
      phone: "+92 300 1234567",
      rating: 4.8,
      experience: "8 years",
      languages: ["Urdu", "English", "Punjabi"],
      image: "https://randomuser.me/api/portraits/women/42.jpg",
      education: "PhD in Clinical Psychology, Quaid-i-Azam University",
      bio: "Specializes in cognitive behavioral therapy with extensive experience treating anxiety disorders. Provides both in-person and online sessions.",
      history: [
        "Senior Psychologist at Islamabad Mental Health Center (2018-Present)",
        "Clinical Supervisor at PIMS Hospital (2015-2018)",
        "Published 12 research papers on anxiety treatments"
      ],
      fee: "PKR 5,000 per session"
    },
    {
      id: 2,
      name: "Dr. Ali Ahmed",
      specialty: "Child & Adolescent",
      location: "F-7, Islamabad",
      clinic: "Child Wellness Center",
      email: "ali.a@therapy.com",
      phone: "+92 300 7654321",
      rating: 4.6,
      experience: "6 years",
      languages: ["Urdu", "English"],
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      education: "MSc in Child Psychology, NUML Islamabad",
      bio: "Specializes in play therapy and adolescent counseling with a gentle, patient-centered approach. Works extensively with school-related issues.",
      history: [
        "Child Psychologist at Roots School System (2019-Present)",
        "Consultant at Children's Hospital (2016-2019)",
        "Certified in Trauma-Focused CBT for Children"
      ],
      fee: "PKR 4,500 per session"
    },
    {
      id: 3,
      name: "Dr. Fatima Malik",
      specialty: "Marriage & Family",
      location: "G-9, Islamabad",
      clinic: "Family Harmony Clinic",
      email: "fatima.m@therapy.com",
      phone: "+92 300 9876543",
      rating: 4.9,
      experience: "10 years",
      languages: ["Urdu", "English", "Saraiki"],
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      education: "PhD in Family Therapy, University of Punjab",
      bio: "Experienced marriage counselor with expertise in relationship dynamics and family systems therapy. Offers couples counseling and pre-marital sessions.",
      history: [
        "Founder of Family Harmony Clinic (2015-Present)",
        "Lecturer at Riphah University (2012-2015)",
        "Certified Gottman Method Couples Therapist"
      ],
      fee: "PKR 6,000 per session"
    },
    {
      id: 4,
      name: "Dr. Usman Sheikh",
      specialty: "Trauma & PTSD",
      location: "E-11, Islamabad",
      clinic: "Trauma Recovery Institute",
      email: "usman.s@therapy.com",
      phone: "+92 300 4567890",
      rating: 4.7,
      experience: "7 years",
      languages: ["Urdu", "English", "Pashto"],
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      education: "MD Psychiatry, Rawalpindi Medical University",
      bio: "Specializes in trauma recovery using EMDR and other evidence-based approaches. Works with survivors of accidents, violence, and military trauma.",
      history: [
        "Director at Trauma Recovery Institute (2018-Present)",
        "Psychiatrist at Armed Forces Institute (2015-2018)",
        "Trained in EMDR at EMDR Institute USA"
      ],
      fee: "PKR 5,500 per session"
    },
    {
      id: 5,
      name: "Dr. Saima Riaz",
      specialty: "OCD & Phobias",
      location: "I-8, Islamabad",
      clinic: "Anxiety Solutions Center",
      email: "saima.r@therapy.com",
      phone: "+92 300 1122334",
      rating: 4.5,
      experience: "5 years",
      languages: ["Urdu", "English"],
      image: "https://randomuser.me/api/portraits/women/33.jpg",
      education: "MSc Clinical Psychology, Bahria University",
      bio: "Specialist in exposure therapy for phobias and OCD treatment. Provides structured, goal-oriented therapy programs.",
      history: [
        "Clinical Psychologist at Anxiety Solutions Center (2019-Present)",
        "Researcher at NIMH (2017-2019)",
        "Certified in ERP Therapy"
      ],
      fee: "PKR 4,800 per session"
    },
    {
      id: 6,
      name: "Dr. Haroon Siddiqui",
      specialty: "Addiction Recovery",
      location: "F-10, Islamabad",
      clinic: "Recover Right Center",
      email: "haroon.s@therapy.com",
      phone: "+92 300 5566778",
      rating: 4.8,
      experience: "9 years",
      languages: ["Urdu", "English"],
      image: "https://randomuser.me/api/portraits/men/55.jpg",
      education: "PhD in Addiction Psychology, University of Karachi",
      bio: "Specializes in substance abuse and behavioral addictions. Uses a holistic approach combining therapy and lifestyle changes.",
      history: [
        "Director at Recover Right Center (2016-Present)",
        "Addiction Specialist at NORI Hospital (2012-2016)",
        "Certified Addiction Professional (CAP)"
      ],
      fee: "PKR 5,200 per session"
    }
  ];

  const specialties = ['All', ...new Set(therapists.map(t => t.specialty))];

  const filteredTherapists = therapists.filter(therapist => {
    const matchesSearch = therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         therapist.clinic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = specialtyFilter === 'All' || therapist.specialty === specialtyFilter;
    return matchesSearch && matchesSpecialty;
  });

  const handleBookSession = (therapist) => {
    setSelectedTherapist(therapist);
    setShowBookingForm(true);
    setShowProfile(false);
    setMessage('');
    setSendStatus(null);
  };

  const handleViewProfile = (therapist) => {
    setSelectedTherapist(therapist);
    setShowProfile(true);
    setShowBookingForm(false);
  };

  const handleCloseModal = () => {
    setShowBookingForm(false);
    setShowProfile(false);
    setSelectedTherapist(null);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    setIsSending(true);
    
    // Simulate sending message
    setTimeout(() => {
      console.log('Message to:', selectedTherapist.email);
      console.log('Message content:', message);
      setIsSending(false);
      setSendStatus('success');
      setMessage('');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSendStatus(null);
        handleCloseModal();
      }, 3000);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#F5F0E8] text-[#5A3921] p-6 relative"
    >
      {/* Booking/Profile Modal */}
      {(showBookingForm || showProfile) && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleCloseModal}
        >
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-lg shadow-lg w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#8B5A2B]">
                {showBookingForm ? `Book Session with ${selectedTherapist.name}` : `${selectedTherapist.name}'s Profile`}
              </h3>
              <button 
                onClick={handleCloseModal}
                className="text-[#5A3921] hover:text-[#8B5A2B]"
              >
                <FaTimes />
              </button>
            </div>

            {showBookingForm ? (
              <>
                {sendStatus === 'success' ? (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    <p>Your message has been sent to {selectedTherapist.name}!</p>
                    <p>They will contact you shortly to confirm your appointment.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSendMessage}>
                    <div className="mb-4">
                      <label className="block text-[#5A3921] mb-2">Contacting: {selectedTherapist.name}</label>
                      <p className="text-sm text-[#5A3921]/80 mb-2">Email will be sent to: {selectedTherapist.email}</p>
                      <p className="text-sm font-medium text-[#8B5A2B]">Session Fee: {selectedTherapist.fee}</p>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="message" className="block text-[#5A3921] mb-2">Your Message</label>
                      <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows="5"
                        className="w-full px-3 py-2 border border-[#E3D5CA] rounded focus:outline-none focus:ring-1 focus:ring-[#8B5A2B]"
                        required
                        placeholder={`Please include:\n- Preferred dates/times\n- Session type (in-person/online)\n- Any specific concerns`}
                      ></textarea>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isSending}
                        className={`px-4 py-2 rounded text-white ${isSending ? 'bg-[#8B5A2B]/70' : 'bg-[#8B5A2B] hover:bg-[#5A3921]'}`}
                      >
                        {isSending ? 'Sending...' : 'Send Booking Request'}
                      </button>
                    </div>
                  </form>
                )}
              </>
            ) : (
              <div>
                <div className="flex items-start mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-[#8B5A2B]">
                    <img 
                      src={selectedTherapist.image} 
                      alt={selectedTherapist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{selectedTherapist.specialty}</h4>
                    <p className="text-sm flex items-center">
                      <FaMapMarkerAlt className="mr-1" />
                      {selectedTherapist.location}
                    </p>
                    <p className="text-sm flex items-center">
                      <FaClinicMedical className="mr-1" />
                      {selectedTherapist.clinic}
                    </p>
                    <p className="text-sm flex items-center">
                      <FaStar className="text-yellow-500 mr-1" />
                      {selectedTherapist.rating} ({selectedTherapist.experience})
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-[#8B5A2B] mb-2">Education</h4>
                  <p className="text-sm text-[#5A3921]/90">{selectedTherapist.education}</p>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-[#8B5A2B] mb-2">About</h4>
                  <p className="text-sm text-[#5A3921]/90">{selectedTherapist.bio}</p>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-[#8B5A2B] mb-2 flex items-center">
                    <FaLanguage className="mr-2" />
                    Languages Spoken
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTherapist.languages.map((lang, index) => (
                      <span key={index} className="px-2 py-1 bg-[#E3D5CA] text-[#5A3921] rounded-full text-xs">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-[#8B5A2B] mb-2">Session Fee</h4>
                  <p className="text-sm text-[#5A3921]/90">{selectedTherapist.fee}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#8B5A2B] mb-2 flex items-center">
                    <FaHistory className="mr-2" />
                    Professional History
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-[#5A3921]/90">
                    {selectedTherapist.history.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex justify-end">
                  <button 
                    onClick={() => {
                      setShowProfile(false);
                      setShowBookingForm(true);
                    }}
                    className="flex items-center px-4 py-2 bg-[#8B5A2B] text-white rounded-lg hover:bg-[#5A3921] transition-colors"
                  >
                    <FaCalendarAlt className="mr-2" />
                    Book Session
                  </button>
                </div>
              </div>
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
            Islamabad Therapist Directory
          </h1>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-[#E3D5CA]">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-[#5A3921] mb-1">Search</label>
              <input
                type="text"
                id="search"
                placeholder="Search by name or clinic..."
                className="w-full px-4 py-2 border border-[#E3D5CA] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8B5A2B]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="specialty" className="block text-sm font-medium text-[#5A3921] mb-1">Filter by Specialty</label>
              <select
                id="specialty"
                className="w-full px-4 py-2 border border-[#E3D5CA] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8B5A2B]"
                value={specialtyFilter}
                onChange={(e) => setSpecialtyFilter(e.target.value)}
              >
                {specialties.map((specialty, index) => (
                  <option key={index} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Therapists Grid */}
        {filteredTherapists.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredTherapists.map((therapist) => (
              <motion.div
                key={therapist.id}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-lg shadow-sm border border-[#E3D5CA] flex flex-col"
              >
                <div className="flex items-start mb-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden mr-4 border-2 border-[#8B5A2B]">
                    <img 
                      src={therapist.image} 
                      alt={therapist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-[#5A3921]">{therapist.name}</h2>
                    <p className="text-[#5A3921]/80 flex items-center">
                      <FaUserMd className="mr-1" />
                      {therapist.specialty}
                    </p>
                    <p className="text-[#5A3921]/80 flex items-center mt-1">
                      <FaMapMarkerAlt className="mr-1" />
                      {therapist.location}
                    </p>
                    <div className="flex items-center mt-1">
                      <FaStar className="text-yellow-500 mr-1" />
                      <span className="text-[#5A3921]">{therapist.rating}</span>
                      <span className="text-[#5A3921]/80 ml-2">({therapist.experience})</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 mt-4 mb-6">
                  <div className="flex items-center">
                    <FaClinicMedical className="text-[#8B5A2B] mr-2" />
                    <span className="text-[#5A3921] text-sm">{therapist.clinic}</span>
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope className="text-[#8B5A2B] mr-2" />
                    <span className="text-[#5A3921] text-sm">{therapist.email}</span>
                  </div>
                  <div className="flex items-center">
                    <FaPhone className="text-[#8B5A2B] mr-2" />
                    <span className="text-[#5A3921] text-sm">{therapist.phone}</span>
                  </div>
                </div>
                
                <div className="mt-auto flex justify-between">
                  <button 
                    onClick={() => handleViewProfile(therapist)}
                    className="px-4 py-2 border border-[#8B5A2B] text-[#8B5A2B] rounded-lg hover:bg-[#8B5A2B] hover:text-white transition-colors"
                  >
                    View Profile
                  </button>
                  <button 
                    onClick={() => handleBookSession(therapist)}
                    className="flex items-center px-4 py-2 bg-[#8B5A2B] text-white rounded-lg hover:bg-[#5A3921] transition-colors"
                  >
                    <FaCalendarAlt className="mr-2" />
                    Book Session
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-sm border border-[#E3D5CA] text-center">
            <h3 className="text-xl font-medium text-[#5A3921] mb-2">No therapists found</h3>
            <p className="text-[#5A3921]/80">Try adjusting your search or filters</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSpecialtyFilter('All');
              }}
              className="mt-4 px-4 py-2 bg-[#8B5A2B] text-white rounded-lg hover:bg-[#5A3921] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TherapistDirectory;