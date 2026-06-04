import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaUserMd, FaGraduationCap, FaComment, FaStar, FaHome, FaMapMarkerAlt, FaCalendarAlt, FaTimes } from 'react-icons/fa';

const OurTherapists = () => {
  const navigate = useNavigate();
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const therapists = [
    {
      id: 1,
      name: "Dr. Ayesha Khan",
      credentials: "PhD, Clinical Psychologist",
      specialty: "Anxiety & Depression, CBT",
      bio: "Specializing in cognitive behavioral therapy with 12 years of experience in Islamabad. Fluent in Urdu and English.",
      rating: 4.9,
      location: "Islamabad",
      clinic: "Islamabad Mental Health Center, F-8",
      availableDates: ["2023-06-15", "2023-06-16", "2023-06-17"],
      availableTimes: ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"]
    },
    {
      id: 2,
      name: "Dr. Ali Raza",
      credentials: "PsyD, Licensed Psychologist",
      specialty: "Trauma & PTSD",
      bio: "Expert in trauma-focused therapies with special training in EMDR. Practices in Blue Area, Islamabad.",
      rating: 4.8,
      location: "Islamabad",
      clinic: "Blue Area Psychological Services",
      availableDates: ["2023-06-15", "2023-06-18", "2023-06-19"],
      availableTimes: ["10:00 AM", "01:00 PM", "03:00 PM", "05:00 PM"]
    },
    {
      id: 3,
      name: "Dr. Sarah Ahmed",
      credentials: "LCSW, Licensed Clinical Social Worker",
      specialty: "Marriage & Family Therapy",
      bio: "Specializes in relationship counseling and family therapy. Available in G-9 and online sessions.",
      rating: 4.7,
      location: "Islamabad",
      clinic: "Harmony Family Counseling Center",
      availableDates: ["2023-06-16", "2023-06-17", "2023-06-20"],
      availableTimes: ["09:30 AM", "11:30 AM", "02:30 PM"]
    },
    {
      id: 4,
      name: "Dr. Farhan Malik",
      credentials: "MD, Psychiatrist",
      specialty: "Medication Management",
      bio: "Board-certified psychiatrist with clinic in F-10. Specializes in pharmacological approaches to mental health.",
      rating: 4.8,
      location: "Islamabad",
      clinic: "Islamabad Psychiatry Associates",
      availableDates: ["2023-06-15", "2023-06-17", "2023-06-18"],
      availableTimes: ["08:00 AM", "12:00 PM", "03:00 PM", "06:00 PM"]
    }
  ];

  const handleBookSession = (therapist) => {
    setSelectedTherapist(therapist);
    setSelectedDate('');
    setSelectedTime('');
    setBookingSuccess(false);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log(`Booked session with ${selectedTherapist.name} on ${selectedDate} at ${selectedTime}`);
    setBookingSuccess(true);
    setTimeout(() => {
      setSelectedTherapist(null);
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
            Islamabad Therapists
          </h1>
          <div className="w-24"></div>
        </div>
        
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-[#5A3921]">About Our Islamabad Team</h2>
          <p className="text-[#5A3921]/90 mb-4">
            Our Islamabad-based therapists are licensed professionals with specialized training 
            in culturally-sensitive approaches to mental health care.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          {therapists.map((therapist) => (
            <motion.div
              key={therapist.id}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-lg shadow-sm border border-[#E3D5CA]"
            >
              <div className="flex items-start mb-4">
                <div className="bg-[#E3D5CA] text-[#5A3921] rounded-full w-16 h-16 flex items-center justify-center mr-4">
                  <FaUserMd className="text-2xl" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[#5A3921]">{therapist.name}</h2>
                  <p className="text-[#5A3921]/80 flex items-center">
                    <FaGraduationCap className="mr-1" />
                    {therapist.credentials}
                  </p>
                  <p className="text-[#5A3921]/80 flex items-center mt-1">
                    <FaComment className="mr-1" />
                    {therapist.specialty}
                  </p>
                  <p className="text-[#5A3921]/80 flex items-center mt-1">
                    <FaStar className="mr-1 text-yellow-500" />
                    {therapist.rating}/5.0
                  </p>
                  <p className="text-[#5A3921]/80 flex items-center mt-1">
                    <FaMapMarkerAlt className="mr-1" />
                    {therapist.clinic}
                  </p>
                </div>
              </div>
              
              <p className="text-[#5A3921]/90 mb-4">{therapist.bio}</p>
              
              <button 
                onClick={() => handleBookSession(therapist)}
                className="w-full px-4 py-2 bg-[#8B5A2B] text-white rounded-lg hover:bg-[#5A3921] transition-colors"
              >
                Book Session
              </button>
            </motion.div>
          ))}
        </div>
        
        {/* Booking Modal */}
        <AnimatePresence>
          {selectedTherapist && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedTherapist(null)}
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
                    Book Session with {selectedTherapist.name}
                  </h2>
                  <button 
                    onClick={() => setSelectedTherapist(null)}
                    className="text-[#5A3921] hover:text-[#8B5A2B]"
                  >
                    <FaTimes />
                  </button>
                </div>
                
                {bookingSuccess ? (
                  <div className="text-center py-8">
                    <div className="text-green-600 font-bold text-lg mb-2">
                      Booking Confirmed!
                    </div>
                    <p className="text-[#5A3921]/90">
                      Your session with {selectedTherapist.name} on {selectedDate} at {selectedTime} has been booked.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit}>
                    <div className="mb-4">
                      <label className="block text-[#5A3921]/90 mb-2">Select Date</label>
                      <select
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full p-2 border border-[#E3D5CA] rounded-lg"
                        required
                      >
                        <option value="">Choose a date</option>
                        {selectedTherapist.availableDates.map((date) => (
                          <option key={date} value={date}>
                            {new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-[#5A3921]/90 mb-2">Select Time</label>
                      <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full p-2 border border-[#E3D5CA] rounded-lg"
                        required
                        disabled={!selectedDate}
                      >
                        <option value="">Choose a time</option>
                        {selectedDate && selectedTherapist.availableTimes.map((time) => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-[#8B5A2B] text-white rounded-lg hover:bg-[#5A3921] transition-colors mt-4"
                      disabled={!selectedDate || !selectedTime}
                    >
                      Confirm Booking
                    </button>
                  </form>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
      </div>
    </motion.div>
  );
};

export default OurTherapists;