import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaPhone, FaGlobeAmericas, FaInfoCircle, FaSearch, FaChevronDown, FaMapMarkerAlt, FaExclamationTriangle, FaHeart, FaShieldAlt, FaAmbulance, FaUserMd } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { createGlobalStyle } from "styled-components";
import {  FaTimes } from "react-icons/fa";


// Global styles using styled-components
const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    overflow-x: hidden;
    background: 
      radial-gradient(ellipse at top left, rgba(111, 79, 40, 0.1) 0%, transparent 50%),
      radial-gradient(ellipse at top right, rgba(139, 108, 66, 0.08) 0%, transparent 50%),
      radial-gradient(ellipse at bottom left, rgba(166, 133, 92, 0.06) 0%, transparent 50%),
      radial-gradient(ellipse at bottom right, rgba(193, 158, 118, 0.04) 0%, transparent 50%),
      linear-gradient(135deg, #fefaf6 0%, #f9f2ea 50%, #f5e9dd 100%);
    background-attachment: fixed;
    position: relative;
    font-family: 'Poppins', sans-serif;
    color: #5A3E21;
    transition: all 0.3s ease;
  }

  body.dark {
    background: 
      radial-gradient(ellipse at top left, rgba(30, 30, 30, 0.3) 0%, transparent 50%),
      radial-gradient(ellipse at top right, rgba(50, 50, 50, 0.2) 0%, transparent 50%),
      radial-gradient(ellipse at bottom left, rgba(70, 70, 70, 0.15) 0%, transparent 50%),
      radial-gradient(ellipse at bottom right, rgba(90, 90, 90, 0.1) 0%, transparent 50%),
      linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a2a 100%);
    color: #e0e0e0;
  }

  body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%236F4F28' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: -1;
    transition: all 0.3s ease;
  }

  body.dark::before {
    background: 
      url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23e0e0e0' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #f5e9dd;
    transition: all 0.3s ease;
  }
  body.dark ::-webkit-scrollbar-track {
    background: #1a1a1a;
  }
  ::-webkit-scrollbar-thumb {
    background: #6F4F28;
    border-radius: 10px;
    transition: all 0.3s ease;
  }
  body.dark ::-webkit-scrollbar-thumb {
    background: #404040;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #5A3E21;
  }
  body.dark ::-webkit-scrollbar-thumb:hover {
    background: #505050;
  }

  /* Unique animations */
  @keyframes morph {
    0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
    33% { transform: translateY(-20px) rotate(120deg) scale(1.1); }
    66% { transform: translateY(10px) rotate(240deg) scale(0.9); }
  }

  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(111, 79, 40, 0.3); }
    50% { box-shadow: 0 0 40px rgba(111, 79, 40, 0.6); }
  }

  @keyframes textShine {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  }

  .morphing-element {
    animation: morph 8s ease-in-out infinite;
  }

  .floating-3d {
    animation: float 12s ease-in-out infinite;
  }

  .pulse-glow {
    animation: pulse-glow 4s ease-in-out infinite;
  }

  .text-shine {
    background: linear-gradient(90deg, #6F4F28, #8B6A42, #A68863, #8B6A42, #6F4F28);
    background-size: 200% auto;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: textShine 3s linear infinite;
  }

  body.dark .text-shine {
    background: linear-gradient(90deg, #e0e0e0, #a0a0a0, #808080, #a0a0a0, #e0e0e0);
    background-size: 200% auto;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: textShine 3s linear infinite;
  }
`;

// Light mode colors - Same as Home page
const lightColors = {
  primary: "#6F4F28",
  primaryLight: "#8B6A42",
  primaryDark: "#5A3E21",
  secondary: "#A68863",
  accent: "#D4B896",
  background: "#fefaf6",
  text: "#5A3E21",
  cardBackground: "#ffffff",
  cardBorder: "#e5e5e5",
  mutedText: "#666666",
  gradient: "linear-gradient(135deg, #6F4F28 0%, #8B6A42 25%, #A68863 50%, #C19E76 75%, #D4B896 100%)"
};

// Dark mode colors - Same as Home page
const darkColors = {
  primary: "#e0e0e0",
  primaryLight: "#a0a0a0",
  primaryDark: "#c0c0c0",
  secondary: "#808080",
  accent: "#404040",
  background: "#0a0a0a",
  text: "#e0e0e0",
  cardBackground: "#1a1a1a",
  cardBorder: "#333333",
  mutedText: "#b0b0b0",
  gradient: "linear-gradient(135deg, #e0e0e0 0%, #a0a0a0 25%, #808080 50%, #606060 75%, #404040 100%)"
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const FloatingShape = ({ top, left, size, delay, color1, color2 }) => (
  <div 
    className="morphing-element floating-3d fixed pointer-events-none"
    style={{
      top: `${top}%`,
      left: `${left}%`,
      width: `${size}px`,
      height: `${size}px`,
      background: `linear-gradient(45deg, ${color1}, ${color2})`,
      opacity: 0.1,
      animationDelay: `${delay}s`,
      zIndex: -1
    }}
  />
);

const Helplines = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCard, setExpandedCard] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [countrySearchTerm, setCountrySearchTerm] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [nearbyHelplines, setNearbyHelplines] = useState([]);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or prefer OS theme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.body.classList.add('dark');
    } else {
      setDarkMode(false);
      document.body.classList.remove('dark');
    }

    // Listen for theme changes
    const handleStorageChange = () => {
      const currentTheme = localStorage.getItem('theme');
      if (currentTheme === 'dark') {
        setDarkMode(true);
        document.body.classList.add('dark');
      } else {
        setDarkMode(false);
        document.body.classList.remove('dark');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check periodically (in case of same-tab changes)
    const interval = setInterval(() => {
      const currentTheme = localStorage.getItem('theme');
      if ((currentTheme === 'dark') !== darkMode) {
        handleStorageChange();
      }
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [darkMode]);

  const currentColors = darkMode ? darkColors : lightColors;

  // All countries with their ISO codes and names
  const countries = [
    // North America
    { code: "US", name: "United States" },
    { code: "CA", name: "Canada" },
    { code: "MX", name: "Mexico" },
    
    // South America
    { code: "BR", name: "Brazil" },
    { code: "AR", name: "Argentina" },
    { code: "CO", name: "Colombia" },
    { code: "PE", name: "Peru" },
    { code: "CL", name: "Chile" },
    { code: "EC", name: "Ecuador" },
    { code: "VE", name: "Venezuela" },
    { code: "BO", name: "Bolivia" },
    { code: "PY", name: "Paraguay" },
    { code: "UY", name: "Uruguay" },
    
    // Europe
    { code: "GB", name: "United Kingdom" },
    { code: "DE", name: "Germany" },
    { code: "FR", name: "France" },
    { code: "IT", name: "Italy" },
    { code: "ES", name: "Spain" },
    { code: "PT", name: "Portugal" },
    { code: "NL", name: "Netherlands" },
    { code: "BE", name: "Belgium" },
    { code: "CH", name: "Switzerland" },
    { code: "AT", name: "Austria" },
    { code: "SE", name: "Sweden" },
    { code: "NO", name: "Norway" },
    { code: "FI", name: "Finland" },
    { code: "DK", name: "Denmark" },
    { code: "PL", name: "Poland" },
    { code: "RU", name: "Russia" },
    { code: "UA", name: "Ukraine" },
    { code: "RO", name: "Romania" },
    { code: "HU", name: "Hungary" },
    { code: "CZ", name: "Czech Republic" },
    { code: "GR", name: "Greece" },
    { code: "TR", name: "Turkey" },
    
    // Asia
    { code: "PK", name: "Pakistan" },
    { code: "IN", name: "India" },
    { code: "CN", name: "China" },
    { code: "JP", name: "Japan" },
    { code: "KR", name: "South Korea" },
    { code: "TH", name: "Thailand" },
    { code: "VN", name: "Vietnam" },
    { code: "PH", name: "Philippines" },
    { code: "MY", name: "Malaysia" },
    { code: "SG", name: "Singapore" },
    { code: "ID", name: "Indonesia" },
    { code: "BD", name: "Bangladesh" },
    { code: "LK", name: "Sri Lanka" },
    { code: "NP", name: "Nepal" },
    { code: "BT", name: "Bhutan" },
    { code: "MV", name: "Maldives" },
    { code: "AF", name: "Afghanistan" },
    { code: "IR", name: "Iran" },
    { code: "IQ", name: "Iraq" },
    { code: "SA", name: "Saudi Arabia" },
    { code: "AE", name: "United Arab Emirates" },
    { code: "IL", name: "Israel" },
    { code: "LB", name: "Lebanon" },
    { code: "JO", name: "Jordan" },
    { code: "KW", name: "Kuwait" },
    { code: "QA", name: "Qatar" },
    { code: "OM", name: "Oman" },
    { code: "YE", name: "Yemen" },
    { code: "SY", name: "Syria" },
    { code: "KZ", name: "Kazakhstan" },
    { code: "UZ", name: "Uzbekistan" },
    
    // Africa
    { code: "NG", name: "Nigeria" },
    { code: "ZA", name: "South Africa" },
    { code: "EG", name: "Egypt" },
    { code: "KE", name: "Kenya" },
    { code: "ET", name: "Ethiopia" },
    { code: "GH", name: "Ghana" },
    { code: "TZ", name: "Tanzania" },
    { code: "UG", name: "Uganda" },
    { code: "DZ", name: "Algeria" },
    { code: "MA", name: "Morocco" },
    { code: "SD", name: "Sudan" },
    { code: "AO", name: "Angola" },
    { code: "MZ", name: "Mozambique" },
    { code: "MG", name: "Madagascar" },
    { code: "CM", name: "Cameroon" },
    { code: "CI", name: "Côte d'Ivoire" },
    { code: "SN", name: "Senegal" },
    { code: "ML", name: "Mali" },
    { code: "BF", name: "Burkina Faso" },
    { code: "NE", name: "Niger" },
    { code: "ZW", name: "Zimbabwe" },
    
    // Oceania
    { code: "AU", name: "Australia" },
    { code: "NZ", name: "New Zealand" },
    { code: "FJ", name: "Fiji" },
    { code: "PG", name: "Papua New Guinea" },
    { code: "SB", name: "Solomon Islands" },
    { code: "VU", name: "Vanuatu" },
    { code: "WS", name: "Samoa" },
    { code: "TO", name: "Tonga" }
  ];

  // Comprehensive helpline data for ALL countries
  const helplineData = {
    // North America
    US: [
      { id: 1, name: "National Suicide Prevention Lifeline", number: "988", description: "24/7 free and confidential support for people in distress.", website: "https://988lifeline.org", tags: ["suicide", "crisis", "depression"] },
      { id: 2, name: "Crisis Text Line", number: "Text HOME to 741741", description: "Free 24/7 support for those in crisis. Text from anywhere in the US.", website: "https://www.crisistextline.org", tags: ["text", "crisis", "anxiety"] },
      { id: 3, name: "SAMHSA National Helpline", number: "1-800-662-HELP (4357)", description: "Treatment referral and information service for mental health and substance use disorders.", website: "https://www.samhsa.gov", tags: ["substance abuse", "addiction", "treatment"] },
      { id: 4, name: "Emergency Services", number: "911", description: "General emergency number for police, fire, and medical emergencies.", website: "", tags: ["emergency", "police", "medical", "fire"] }
    ],
    CA: [
      { id: 5, name: "Canada Suicide Prevention Service", number: "1-833-456-4566", description: "24/7 support for suicide prevention across Canada.", website: "https://www.crisisservicescanada.ca", tags: ["suicide", "crisis", "depression"] },
      { id: 6, name: "Kids Help Phone", number: "1-800-668-6868", description: "24/7 counseling for Canadian youth.", website: "https://kidshelpphone.ca", tags: ["children", "teens", "counseling"] },
      { id: 7, name: "Hope for Wellness Helpline", number: "1-855-242-3310", description: "Support for Indigenous peoples across Canada.", website: "https://www.hopeforwellness.ca", tags: ["indigenous", "mental health", "support"] },
      { id: 8, name: "Emergency Services", number: "911", description: "General emergency number in Canada.", website: "", tags: ["emergency", "police", "medical"] }
    ],
    MX: [
      { id: 9, name: "SAPTEL Crisis Line", number: "55 5259-8121", description: "Mexican emotional support and suicide prevention hotline.", website: "http://www.saptel.org.mx", tags: ["suicide", "crisis", "emotional support"] },
      { id: 10, name: "Línea de la Vida", number: "800 911 2000", description: "24/7 support for addictions and mental health.", website: "https://www.gob.mx/salud", tags: ["addiction", "mental health", "support"] },
      { id: 11, name: "Emergency Services", number: "911", description: "General emergency number in Mexico.", website: "", tags: ["emergency", "police", "medical"] }
    ],
    
    // South America
    BR: [
      { id: 12, name: "CVV - Centro de Valorização da Vida", number: "188", description: "Brazilian suicide prevention hotline.", website: "https://www.cvv.org.br", tags: ["suicide", "depression", "emotional support"] },
      { id: 13, name: "Emergency Services", number: "190", description: "General emergency number in Brazil.", website: "", tags: ["emergency", "police", "medical"] }
    ],
    AR: [
      { id: 14, name: "Centro de Asistencia al Suicida", number: "135", description: "Argentinian suicide prevention hotline.", website: "http://www.asistenciaalsuicida.org.ar", tags: ["suicide", "depression", "emotional support"] },
      { id: 15, name: "Emergency Services", number: "911", description: "General emergency number in Argentina.", website: "", tags: ["emergency", "police", "medical"] }
    ],
    CO: [
      { id: 16, name: "Línea de Atención a la Conducta Suicida", number: "018000 113 113", description: "Colombian suicide prevention line.", website: "https://www.minsalud.gov.co", tags: ["suicide", "prevention", "support"] },
      { id: 17, name: "Emergency Services", number: "123", description: "General emergency number in Colombia.", website: "", tags: ["emergency", "police", "medical"] }
    ],

    // Europe
    GB: [
      { id: 18, name: "Samaritans UK", number: "116 123", description: "24/7 emotional support for anyone in distress.", website: "https://www.samaritans.org", tags: ["suicide", "crisis", "depression"] },
      { id: 19, name: "Emergency Services", number: "999", description: "General emergency number in the UK.", website: "", tags: ["emergency", "police", "medical"] }
    ],
    DE: [
      { id: 20, name: "Telefonseelsorge", number: "0800 1110111", description: "German emotional support hotline.", website: "https://www.telefonseelsorge.de", tags: ["suicide", "depression", "emotional support"] },
      { id: 21, name: "Emergency Services", number: "112", description: "General emergency number in Germany.", website: "", tags: ["emergency", "police", "medical"] }
    ],
    FR: [
      { id: 22, name: "SOS Amitié", number: "09 72 39 40 50", description: "French emotional support hotline.", website: "https://www.sos-amitie.org", tags: ["suicide", "depression", "emotional support"] },
      { id: 23, name: "Emergency Services", number: "112", description: "General emergency number in France.", website: "", tags: ["emergency", "police", "medical"] }
    ],

    // Asia - Pakistan (extensive)
    PK: [
      { id: 24, name: "Pakistan Mental Health Helpline", number: "0311 7786264", description: "24/7 mental health support and counseling services across Pakistan.", website: "", tags: ["mental health", "counseling", "support", "national"] },
      { id: 25, name: "Punjab Emergency Service (Rescue 1122)", number: "1122", description: "Emergency services for medical, fire and rescue across Punjab province.", website: "http://rescue.gov.pk", tags: ["emergency", "medical", "rescue", "Punjab"] },
      { id: 26, name: "Sindh Mental Health Authority", number: "021-99215700", description: "Mental health support and crisis intervention in Sindh province.", website: "", tags: ["mental health", "Sindh", "crisis"] },
      { id: 27, name: "KP Emergency Service (Rescue 1122)", number: "1122", description: "Emergency services for medical, fire and rescue in Khyber Pakhtunkhwa.", website: "", tags: ["emergency", "medical", "rescue", "KP"] },
      { id: 28, name: "Balochistan Emergency Service", number: "1122", description: "Emergency services for medical, fire and rescue in Balochistan.", website: "", tags: ["emergency", "medical", "rescue", "Balochistan"] },
      { id: 29, name: "Islamabad Emergency Service", number: "1122", description: "Emergency services for medical, fire and rescue in Islamabad.", website: "", tags: ["emergency", "medical", "rescue", "Islamabad"] }
    ],

    IN: [
      { id: 30, name: "Vandrevala Foundation Helpline", number: "1860 2662 345 / 1800 2333 330", description: "24/7 mental health support and counseling across India.", website: "https://www.vandrevalafoundation.com", tags: ["mental health", "counseling", "depression"] },
      { id: 31, name: "Emergency Services", number: "112", description: "General emergency number in India.", website: "", tags: ["emergency", "police", "medical"] }
    ],

    // Generate basic emergency helplines for all other countries
    ...Object.fromEntries(
      countries
        .filter(country => !["US", "CA", "MX", "BR", "AR", "CO", "GB", "DE", "FR", "PK", "IN"].includes(country.code))
        .map(country => [
          country.code,
          [
            {
              id: 1000 + countries.indexOf(country),
              name: "Emergency Services",
              number: getDefaultEmergencyNumber(country.code),
              description: `General emergency number for ${country.name}. Call for police, fire, or medical emergencies.`,
              website: "",
              tags: ["emergency", "police", "medical", "fire", "rescue"]
            },
            {
              id: 2000 + countries.indexOf(country),
              name: "Mental Health Support",
              number: getDefaultMentalHealthNumber(country.code),
              description: `Mental health and crisis support services in ${country.name}.`,
              website: "",
              tags: ["mental health", "crisis", "support", "counseling"]
            },
            {
              id: 3000 + countries.indexOf(country),
              name: "Suicide Prevention",
              number: getDefaultSuicidePreventionNumber(country.code),
              description: `Suicide prevention and emotional support services in ${country.name}.`,
              website: "",
              tags: ["suicide", "prevention", "emotional support", "crisis"]
            }
          ]
        ])
    )
  };

  // Helper functions to generate appropriate numbers for each country
  function getDefaultEmergencyNumber(countryCode) {
    const emergencyNumbers = {
      "AU": "000", "NZ": "111", "JP": "110", "KR": "112", "CN": "110", 
      "SG": "999", "MY": "999", "TH": "191", "VN": "113", "PH": "117",
      "ID": "112", "BD": "999", "LK": "119", "NP": "100", "BT": "112",
      "MV": "119", "AF": "119", "IR": "110", "IQ": "104", "SA": "999",
      "AE": "999", "IL": "100", "LB": "112", "JO": "911", "KW": "112",
      "QA": "999", "OM": "9999", "YE": "199", "SY": "110", "KZ": "112",
      "UZ": "102", "ZA": "10111", "NG": "112", "EG": "122", "KE": "999",
      "ET": "991", "GH": "999", "TZ": "112", "UG": "999", "DZ": "17",
      "MA": "19", "SD": "999", "AO": "113", "MZ": "119", "MG": "117",
      "CM": "112", "CI": "170", "SN": "17", "ML": "17", "BF": "17",
      "NE": "17", "ZW": "995", "FJ": "911", "PG": "000", "SB": "999",
      "VU": "112", "WS": "999", "TO": "911"
    };
    return emergencyNumbers[countryCode] || "112";
  }

  function getDefaultMentalHealthNumber(countryCode) {
    return "112";
  }

  function getDefaultSuicidePreventionNumber(countryCode) {
    return "112";
  }

  // Get user location using browser's Geolocation API
  const getUserLocation = () => {
    setLocationLoading(true);
    setShowLocationModal(true);
    
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          
          if (data && data.address) {
            const countryCode = data.address.country_code?.toUpperCase();
            if (countryCode) {
              setSelectedCountry(countryCode);
              findNearbyEmergencyServices(latitude, longitude, countryCode);
            }
          }
        } catch (error) {
          console.error("Error getting location info:", error);
          setLocationLoading(false);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to get your location. Please allow location access or select your country manually.");
        setLocationLoading(false);
      }
    );
  };

  // Find nearby emergency services
  const findNearbyEmergencyServices = async (lat, lng, countryCode) => {
    try {
      const radius = 5000;
      const overpassQuery = `
        [out:json][timeout:25];
        (
          node["amenity"="police"](around:${radius},${lat},${lng});
          node["amenity"="hospital"](around:${radius},${lat},${lng});
          node["amenity"="fire_station"](around:${radius},${lat},${lng});
        );
        out body;
        >;
        out skel qt;
      `;

      const response = await fetch(
        `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`
      );
      const data = await response.json();
      
      const nearbyServices = data.elements.map((element, index) => {
        const serviceType = element.tags?.amenity;
        let name = element.tags?.name || `Local ${serviceType}`;
        let description = "";
        
        switch(serviceType) {
          case "police": description = "Local police station"; break;
          case "hospital": description = "Medical emergency services"; break;
          case "fire_station": description = "Fire and rescue services"; break;
          default: description = "Emergency service";
        }

        return {
          id: `nearby-${index}`,
          name,
          number: getEmergencyNumberByType(serviceType, countryCode),
          description,
          website: "",
          tags: [serviceType, "nearby", "emergency"],
          distance: calculateDistance(lat, lng, element.lat, element.lon),
          type: serviceType
        };
      });

      setNearbyHelplines(nearbyServices);
      setLocationLoading(false);
    } catch (error) {
      console.error("Error finding nearby services:", error);
      setLocationLoading(false);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(1);
  };

  const getEmergencyNumberByType = (type, countryCode) => {
    const emergencyNumbers = {
      US: { police: "911", hospital: "911", fire_station: "911" },
      GB: { police: "999", hospital: "999", fire_station: "999" },
      CA: { police: "911", hospital: "911", fire_station: "911" },
      AU: { police: "000", hospital: "000", fire_station: "000" },
      IN: { police: "100", hospital: "102", fire_station: "101" },
      PK: { police: "15", hospital: "1122", fire_station: "16" },
    };
    return emergencyNumbers[countryCode]?.[type] || "112";
  };

  // Filter countries based on search term
  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(countrySearchTerm.toLowerCase())
  );

  const filteredHelplines = helplineData[selectedCountry]?.filter(helpline =>
    helpline.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    helpline.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    helpline.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  const allHelplines = [...filteredHelplines, ...nearbyHelplines];

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const getCountryName = (code) => {
    const country = countries.find(c => c.code === code);
    return country ? country.name : "";
  };

  useEffect(() => {
    const askForLocation = () => {
      setShowLocationModal(true);
    };
    
    const timer = setTimeout(askForLocation, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Get icon based on service type
  const getServiceIcon = (tags) => {
    if (tags.includes("medical") || tags.includes("hospital")) return <FaAmbulance />;
    if (tags.includes("police") || tags.includes("emergency")) return <FaShieldAlt />;
    if (tags.includes("mental") || tags.includes("counseling")) return <FaHeart />;
    if (tags.includes("fire")) return <FaExclamationTriangle />;
    return <FaUserMd />;
  };

  // Get gradient based on service type
  const getServiceGradient = (tags) => {
    if (tags.includes("medical") || tags.includes("hospital")) return `linear-gradient(135deg, ${currentColors.primary}, ${currentColors.primaryLight})`;
    if (tags.includes("police") || tags.includes("emergency")) return `linear-gradient(135deg, #dc2626, #ef4444)`;
    if (tags.includes("mental") || tags.includes("counseling")) return `linear-gradient(135deg, #7c3aed, #a855f7)`;
    if (tags.includes("fire")) return `linear-gradient(135deg, #ea580c, #f97316)`;
    return `linear-gradient(135deg, ${currentColors.primary}, ${currentColors.primaryLight})`;
  };

  return (
    <div className="font-[Poppins] min-h-screen flex flex-col overflow-hidden" style={{ 
      color: currentColors.text,
      background: currentColors.background
    }}>
      <GlobalStyles />
      
      {/* Floating Background Elements */}
      <FloatingShape top={20} left={10} size={80} delay={0} color1={currentColors.primary} color2={currentColors.secondary} />
      <FloatingShape top={70} left={85} size={100} delay={4} color1={currentColors.primaryLight} color2={currentColors.accent} />
      <FloatingShape top={40} left={80} size={60} delay={8} color1={currentColors.secondary} color2={currentColors.accent} />
      <FloatingShape top={80} left={15} size={90} delay={2} color1={currentColors.primaryDark} color2={currentColors.primaryLight} />
      
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      
      {/* Location Access Modal */}
      <AnimatePresence>
        {showLocationModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="rounded-2xl p-8 max-w-md w-full border-2 shadow-2xl"
              style={{ 
                background: currentColors.cardBackground,
                borderColor: currentColors.cardBorder
              }}
            >
              
<div className="text-center relative p-6 bg-white rounded-xl shadow-lg">
  {/* Close Icon */}
  <button
    onClick={() => setShowLocationModal(false)}
    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
  >
    <FaTimes />
  </button>

  <div 
    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
    style={{ background: getServiceGradient(["emergency"]) }}
  >
    <FaMapMarkerAlt className="text-3xl text-white" />
  </div>

  <h3 
    className="text-2xl font-bold mb-3"
    style={{ color: currentColors.primary }}
  >
    Find Help Nearby
  </h3>

  <p 
    className="mb-6 text-lg"
    style={{ color: currentColors.mutedText }}
  >
    Allow location access to discover emergency services closest to you for immediate assistance.
  </p>

  <div className="flex flex-col gap-4">
    <button
      onClick={getUserLocation}
      disabled={locationLoading}
      className="w-full font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
      style={{ 
        background: `linear-gradient(135deg, ${currentColors.primary}, ${currentColors.primaryLight})`,
        color: darkMode ? currentColors.background : 'white'
      }}
    >
      {locationLoading ? (
        <>
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
          Finding Your Location...
        </>
      ) : (
        <>
          <FaMapMarkerAlt className="mr-3 text-xl" />
          Use My Current Location
        </>
      )}
    </button>

    <button
      onClick={() => setShowLocationModal(false)}
      className="w-full font-semibold py-4 px-6 rounded-xl transition-all duration-300 border-2"
      style={{ 
        background: darkMode ? 'rgba(26, 26, 26, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        borderColor: currentColors.primary,
        color: currentColors.primary
      }}
    >
      Choose Country Manually
    </button>
  </div>

  <p 
    className="text-xs mt-6"
    style={{ color: currentColors.mutedText }}
  >
    🔒 Your location is used only to find nearby services and is never stored.
  </p>
</div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow px-4 py-8 md:px-10 lg:px-20 xl:px-32">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
<div className="mb-6">
  <h1 className="text-5xl md:text-6xl font-bold">
    Emergency Helplines
  </h1>
</div>

          <p 
            className="text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: currentColors.mutedText }}
          >
            Immediate confidential support when you need it most. 
            <span className="block font-semibold mt-2" style={{ color: currentColors.primary }}>All services are free and available 24/7 worldwide.</span>
          </p>
          
          {/* Location Status */}
          {userLocation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 inline-flex items-center px-6 py-3 rounded-full shadow-sm"
              style={{ 
                background: darkMode ? 'rgba(34, 197, 94, 0.1)' : '#dcfce7',
                border: `2px solid ${darkMode ? '#166534' : '#bbf7d0'}`,
                color: darkMode ? '#86efac' : '#166534'
              }}
            >
              <FaMapMarkerAlt className="mr-3" />
              <span className="font-semibold">Showing services near your location in {getCountryName(selectedCountry)}</span>
              <button 
                onClick={() => setShowLocationModal(true)}
                className="ml-4 underline font-medium text-sm"
                style={{ color: darkMode ? '#86efac' : '#166534' }}
              >
                Change
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Search and Filter Section */}
        <div className="max-w-6xl mx-auto mb-16">
          {/* Country Selector and Search Bar */}
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            {/* Country Selector */}
            <motion.div 
              className="relative flex-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div 
                className="rounded-2xl p-1 shadow-lg border-2"
                style={{ 
                  background: currentColors.cardBackground,
                  borderColor: currentColors.cardBorder
                }}
              >
                <button 
                  className="w-full flex justify-between items-center px-6 py-4 rounded-xl text-left"
                  style={{ background: currentColors.cardBackground }}
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                >
                  <div>
                    <div 
                      className="text-sm font-medium"
                      style={{ color: currentColors.mutedText }}
                    >Country</div>
                    <div 
                      className="text-xl font-bold"
                      style={{ color: currentColors.text }}
                    >{getCountryName(selectedCountry)}</div>
                  </div>
                  <FaChevronDown 
                    className={`transition-transform ${showCountryDropdown ? 'transform rotate-180' : ''}`}
                    style={{ color: currentColors.primary }}
                  />
                </button>
                
                <AnimatePresence>
                  {showCountryDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute z-10 mt-2 w-full rounded-2xl shadow-2xl border-2 overflow-hidden"
                      style={{ 
                        background: currentColors.cardBackground,
                        borderColor: currentColors.cardBorder
                      }}
                    >
                      <div className="p-4 border-b" style={{ borderColor: currentColors.cardBorder }}>
                        <div className="relative">
                          <FaSearch 
                            className="absolute left-4 top-1/2 transform -translate-y-1/2"
                            style={{ color: currentColors.primary }}
                          />
                          <input
                            type="text"
                            placeholder="Search countries..."
                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 focus:outline-none font-medium"
                            style={{ 
                              background: currentColors.cardBackground,
                              borderColor: currentColors.cardBorder,
                              color: currentColors.text
                            }}
                            value={countrySearchTerm}
                            onChange={(e) => setCountrySearchTerm(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="overflow-y-auto max-h-80">
                        {filteredCountries.length > 0 ? (
                          filteredCountries.map(country => (
                            <div 
                              key={country.code}
                              className={`px-6 py-4 cursor-pointer border-b last:border-b-0 ${
                                selectedCountry === country.code ? 'font-bold' : ''
                              }`}
                              style={{ 
                                background: selectedCountry === country.code ? 
                                  (darkMode ? 'rgba(111, 79, 40, 0.2)' : 'rgba(111, 79, 40, 0.1)') : 
                                  'transparent',
                                borderColor: currentColors.cardBorder,
                                color: selectedCountry === country.code ? currentColors.primary : currentColors.text
                              }}
                              onClick={() => {
                                setSelectedCountry(country.code);
                                setShowCountryDropdown(false);
                                setCountrySearchTerm("");
                              }}
                            >
                              <div className="font-medium text-lg">{country.name}</div>
                            </div>
                          ))
                        ) : (
                          <div 
                            className="px-6 py-4 text-center"
                            style={{ color: currentColors.mutedText }}
                          >
                            No countries found
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Helpline Search Bar */}
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div 
                className="rounded-2xl p-1 shadow-lg border-2"
                style={{ 
                  background: currentColors.cardBackground,
                  borderColor: currentColors.cardBorder
                }}
              >
                <div className="relative">
                  <FaSearch 
                    className="absolute left-6 top-1/2 transform -translate-y-1/2 text-xl"
                    style={{ color: currentColors.primary }}
                  />
                  <input
                    type="text"
                    placeholder="Search helplines, services, or emergencies..."
                    className="w-full pl-16 pr-12 py-4 rounded-xl border-2 focus:outline-none text-lg font-medium"
                    style={{ 
                      background: currentColors.cardBackground,
                      borderColor: 'transparent',
                      color: currentColors.text
                    }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button 
                      onClick={() => setSearchTerm("")}
                      className="absolute right-6 top-1/2 transform -translate-y-1/2 text-2xl"
                      style={{ color: currentColors.mutedText }}
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Location Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              onClick={() => setShowLocationModal(true)}
              className="font-bold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl min-w-[200px]"
              style={{ 
                background: `linear-gradient(135deg, ${currentColors.primary}, ${currentColors.primaryLight})`,
                color: darkMode ? currentColors.background : 'white'
              }}
            >
              <FaMapMarkerAlt className="mr-3 text-xl" />
              Use My Location
            </motion.button>
          </div>

          {/* Emergency Quick Actions */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {[
              { icon: <FaShieldAlt />, label: "Police", search: "police" },
              { icon: <FaAmbulance />, label: "Medical", search: "medical" },
              { icon: <FaExclamationTriangle />, label: "Fire", search: "fire" },
              { icon: <FaHeart />, label: "Mental Health", search: "mental health" }
            ].map((action, index) => (
              <motion.button
                key={action.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchTerm(action.search)}
                className="p-6 rounded-2xl text-center transition-all duration-300 shadow-lg hover:shadow-xl text-white"
                style={{ background: getServiceGradient([action.search]) }}
              >
                <div className="text-3xl mb-3">{action.icon}</div>
                <div className="font-bold text-lg">{action.label}</div>
                <div className="text-sm opacity-90 mt-1">Emergency</div>
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Helpline Cards Section */}
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div>
              <h2 
                className="text-3xl font-bold mb-2"
                style={{ color: currentColors.text }}
              >
                Available Helplines in <span className="text-shine">{getCountryName(selectedCountry)}</span>
              </h2>
              <p style={{ color: currentColors.mutedText }}>
                {allHelplines.length} service{allHelplines.length !== 1 ? 's' : ''} available • 24/7 Support
              </p>
            </div>
            {nearbyHelplines.length > 0 && (
              <div 
                className="flex items-center px-4 py-2 rounded-full mt-4 md:mt-0"
                style={{ 
                  background: darkMode ? 'rgba(59, 130, 246, 0.1)' : '#dbeafe',
                  color: darkMode ? '#93c5fd' : '#1d4ed8'
                }}
              >
                <FaMapMarkerAlt className="mr-2" />
                {nearbyHelplines.length} nearby service{nearbyHelplines.length !== 1 ? 's' : ''}
              </div>
            )}
          </motion.div>

          {/* Helpline Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">
            {allHelplines.length > 0 ? (
              allHelplines.map((helpline) => (
                <motion.div
                  key={helpline.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-l-4 ${
                    expandedCard === helpline.id ? "shadow-2xl" : ""
                  }`}
                  style={{ 
                    borderLeftColor: expandedCard === helpline.id ? currentColors.primary : 
                                   helpline.distance ? '#10b981' : 'transparent',
                    background: currentColors.cardBackground
                  }}
                >
                  {/* Card Header with Gradient */}
                  <div 
                    className="p-6 text-white relative"
                    style={{ background: getServiceGradient(helpline.tags) }}
                  >
                    {helpline.distance && (
                      <div 
                        className="absolute top-4 right-4 text-sm font-bold px-3 py-1 rounded-full flex items-center shadow-lg"
                        style={{ 
                          background: currentColors.cardBackground,
                          color: currentColors.primary
                        }}
                      >
                        <FaMapMarkerAlt className="mr-1" />
                        {helpline.distance} km
                      </div>
                    )}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="text-2xl mr-4">
                          {getServiceIcon(helpline.tags)}
                        </div>
                        <h3 className="text-xl font-bold pr-12">{helpline.name}</h3>
                      </div>
                      <button 
                        className="text-white hover:opacity-80 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(helpline.id);
                        }}
                      >
                        <FaInfoCircle size={20} />
                      </button>
                    </div>
                    
                    <div className="flex items-center mt-4">
                      <FaPhone className="mr-3 text-xl" />
                      <span className="font-bold text-2xl">{helpline.number}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div 
                    className="p-6 cursor-pointer"
                    style={{ background: currentColors.cardBackground }}
                    onClick={() => toggleExpand(helpline.id)}
                  >
                    <AnimatePresence>
                      {expandedCard === helpline.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p 
                            className="mb-4 leading-relaxed"
                            style={{ color: currentColors.mutedText }}
                          >{helpline.description}</p>
                          
                          {helpline.website && (
                            <div className="flex items-center mb-4">
                              <FaGlobeAmericas 
                                className="mr-3"
                                style={{ color: currentColors.primary }}
                              />
                              <a 
                                href={helpline.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="font-medium hover:underline"
                                style={{ color: currentColors.primary }}
                                onClick={(e) => e.stopPropagation()}
                              >
                                Visit Official Website
                              </a>
                            </div>
                          )}

                          <div className="flex flex-wrap gap-2">
                            {helpline.tags.map((tag, index) => (
                              <span 
                                key={index} 
                                className="px-3 py-1 text-sm rounded-full font-medium"
                                style={{ 
                                  background: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                                  color: currentColors.mutedText
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Call Button */}
                  <div 
                    className="px-6 py-4 border-t"
                    style={{ 
                      background: darkMode ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
                      borderColor: currentColors.cardBorder
                    }}
                  >
                    <a 
                      href={`tel:${helpline.number.replace(/\D/g, '')}`}
                      className="w-full font-bold py-4 px-6 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
                      style={{ 
                        background: `linear-gradient(135deg, ${currentColors.primary}, ${currentColors.primaryLight})`,
                        color: darkMode ? currentColors.background : 'white'
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaPhone className="mr-3 text-lg" />
                      Call Now - Free Service
                    </a>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                className="col-span-full text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div 
                  className="text-8xl mb-6"
                  style={{ color: currentColors.mutedText }}
                >📞</div>
                <h3 
                  className="text-2xl font-bold mb-4"
                  style={{ color: currentColors.text }}
                >
                  No Helplines Found
                </h3>
                <p 
                  className="text-lg mb-8 max-w-md mx-auto"
                  style={{ color: currentColors.mutedText }}
                >
                  {searchTerm ? 
                    "Try a different search term or browse all available helplines." : 
                    "We're continuously adding more helplines. Try using your location to find nearby services."
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => setSearchTerm("")}
                    className="font-bold py-3 px-8 rounded-xl transition-all duration-300"
                    style={{ 
                      background: `linear-gradient(135deg, ${currentColors.primary}, ${currentColors.primaryLight})`,
                      color: darkMode ? currentColors.background : 'white'
                    }}
                  >
                    Show All Helplines
                  </button>
                  <button 
                    onClick={() => setShowLocationModal(true)}
                    className="font-bold py-3 px-8 rounded-xl transition-all duration-300 border-2"
                    style={{ 
                      background: currentColors.cardBackground,
                      borderColor: currentColors.primary,
                      color: currentColors.primary
                    }}
                  >
                    <FaMapMarkerAlt className="inline mr-2" />
                    Find Nearby Services
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Global Resources Section */}
        <motion.div 
          className="max-w-6xl mx-auto rounded-3xl p-8 md:p-12 text-center shadow-2xl"
          style={{ background: `linear-gradient(135deg, ${currentColors.primary}, ${currentColors.primaryLight})` }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Global Emergency Resources</h2>
          <p className="text-white text-opacity-90 text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Immediate help is available worldwide. These international resources are here for you 24/7, no matter where you are.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { name: "International Emergency", number: "112", desc: "Works in most countries worldwide" },
              { name: "Suicide Prevention", number: "Available locally", desc: "Contact local mental health services" },
              { name: "Medical Emergency", number: "Local numbers", desc: "Hospital and ambulance services" }
            ].map((resource, index) => (
              <div 
                key={index} 
                className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20"
              >
                <div className="text-2xl font-bold mb-2 text-white">{resource.number}</div>
                <div className="font-semibold mb-2 text-white">{resource.name}</div>
                <div className="text-white text-opacity-80 text-sm">{resource.desc}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setShowLocationModal(true)}
              className="bg-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center shadow-lg hover:shadow-xl"
              style={{ color: currentColors.primary }}
            >
              <FaMapMarkerAlt className="mr-3" />
              Find Local Emergency Services
            </button>
            
            <a 
              href="https://www.who.int/mental_health/mental-health-resources/en/"
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:bg-opacity-10 font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center"
            >
              <FaGlobeAmericas className="mr-3" />
              WHO Mental Health Resources
            </a>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Helplines;