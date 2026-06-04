import React, { useState, useEffect } from "react";
import { 
  FaBrain, 
  FaLeaf, 
  FaHeartbeat,
  FaHandHoldingHeart,
  FaInstagram, 
  FaTwitter, 
  FaLinkedin,
  FaYoutube,
  FaRegCopyright
} from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

// Footer links data
const footerLinks = [
  {
    title: "Resources",
    links: [
      { name: "Mental Health Guides", url: "/mental-health-guides" },
      { name: "Therapist Directory", url: "/therapist-directory" },
      { name: "Mindfulness Exercises", url: "/mindfulness-exercises" },
      { name: "Crisis Resources", url: "/crisis-resources" },
    ]
  },
  {
    title: "Support",
    links: [
      { name: "Community Forums", url: "/community-forums" },
      { name: "Live Chat", url: "/live-chat" },
      { name: "Wellness Plans", url: "/wellness-plans" },
      { name: "FAQs", url: "/faqs" },
    ]
  },
  {
    title: "Organization",
    links: [
      { name: "About MindCare", url: "/about" },
      { name: "Our Therapists", url: "/our-therapists" },
      { name: "Careers", url: "/careers" },
      { name: "Press", url: "/press" },
    ]
  }
];

const legalLinks = [
  { name: "Privacy Policy", url: "/privacy-policy" },
  { name: "Terms of Service", url: "/terms-of-service" },
  { name: "Cookie Policy", url: "/cookie-policy" },
  { name: "Accessibility", url: "/accessibility" }
];

const socialLinks = [
  { icon: FaInstagram, url: "https://instagram.com/mindcare" },
  { icon: FaTwitter, url: "https://twitter.com/mindcare" },
  { icon: FaLinkedin, url: "https://linkedin.com/company/mindcare" },
  { icon: FaYoutube, url: "https://youtube.com/mindcare" }
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or prefer OS theme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }

    // Listen for theme changes
    const handleStorageChange = () => {
      const currentTheme = localStorage.getItem('theme');
      if (currentTheme === 'dark') {
        setDarkMode(true);
      } else {
        setDarkMode(false);
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

  // Color schemes for light and dark mode
  const lightColors = {
    background: "#F5F0E8",
    text: "#5A3921",
    border: "#E3D5CA",
    accent: "#8B5A2B",
    card: "#ffffff",
    mutedText: "#5A3921b3",
    hoverText: "#8B5A2B"
  };

  const darkColors = {
    background: "#0a0a0a",
    text: "#e0e0e0",
    border: "#333333",
    accent: "#a0a0a0",
    card: "#1a1a1a",
    mutedText: "#b0b0b0",
    hoverText: "#ffffff"
  };

  const colors = darkMode ? darkColors : lightColors;

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const wellnessFeatures = [
    { icon: <FaBrain style={{ color: colors.accent }} />, title: "Mindfulness" },
    { icon: <FaLeaf style={{ color: colors.accent }} />, title: "Nature Therapy" },
    { icon: <FaHeartbeat style={{ color: colors.accent }} />, title: "Self-Care" },
    { icon: <FaHandHoldingHeart style={{ color: colors.accent }} />, title: "Compassion" }
  ];

  return (
    <footer 
      className="px-6 py-12 relative overflow-hidden border-t-2 transition-colors duration-300"
      style={{ 
        background: colors.background,
        color: colors.text,
        borderColor: colors.border
      }}
    >
      {/* Organic wave shape at top */}
      {!darkMode && (
        <div className="absolute -top-1 left-0 right-0 h-4 overflow-hidden">
          <svg 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none" 
            className="w-full h-full"
          >
            <path 
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
              fill={colors.background}
              opacity=".25"
            ></path>
            <path 
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
              fill={colors.background}
              opacity=".5"
            ></path>
            <path 
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
              fill={colors.background}
            ></path>
          </svg>
        </div>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Wellness Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {wellnessFeatures.map((feature, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -5 }}
              className="p-4 rounded-xl shadow-sm flex flex-col items-center text-center transition-colors duration-300"
              style={{ 
                background: colors.card,
                border: `1px solid ${colors.border}`
              }}
            >
              <div className="text-2xl mb-2">{feature.icon}</div>
              <h4 className="font-medium" style={{ color: colors.text }}>{feature.title}</h4>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand & Newsletter */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="relative">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: colors.accent }}
                >
                  <FaBrain className="text-white text-xl" />
                </div>
                <div 
                  className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white"
                  style={{ background: colors.border }}
                ></div>
              </div>
              <h1 className="text-2xl font-bold ml-3">
                <span style={{ color: colors.text }}>Mind</span>
                <span style={{ color: colors.accent }}>Care</span>
              </h1>
            </div>
            
            <p 
              className="mb-6 leading-relaxed transition-colors duration-300"
              style={{ color: colors.mutedText }}
            >
              Nurturing mental wellness through compassionate care and evidence-based practices.
            </p>
            
            <div className="mb-8">
              <h3 className="font-medium mb-3" style={{ color: colors.text }}>Stay Updated</h3>
              <AnimatePresence mode="wait">
                {subscribed ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 rounded-lg flex items-center transition-colors duration-300"
                    style={{ 
                      background: colors.accent,
                      color: darkMode ? colors.background : 'white'
                    }}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 mr-2" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Thank you for joining our community!</span>
                  </motion.div>
                ) : (
                  <motion.form 
                    onSubmit={handleSubscribe}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="w-full px-4 py-3 pr-12 rounded-lg border focus:outline-none focus:ring-2 transition-colors duration-300"
                      style={{ 
                        background: colors.card,
                        borderColor: colors.border,
                        color: colors.text
                      }}
                      required
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-colors duration-300"
                      style={{ 
                        background: colors.accent,
                        color: darkMode ? colors.background : 'white'
                      }}
                      aria-label="Subscribe"
                    >
                      <IoMdSend />
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            <div>
              <h3 className="font-medium mb-3" style={{ color: colors.text }}>Connect With Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 border"
                      style={{ 
                        background: colors.card,
                        borderColor: colors.border,
                        color: colors.text
                      }}
                    >
                      <Icon />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Navigation Columns */}
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h3 
                className="font-semibold mb-4 text-lg relative inline-block transition-colors duration-300"
                style={{ color: colors.text }}
              >
                {column.title}
                <span 
                  className="absolute left-0 bottom-0 h-0.5 w-full transform origin-left scale-x-100 transition-colors duration-300"
                  style={{ background: colors.accent }}
                ></span>
              </h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <motion.li 
                    key={linkIndex}
                    onHoverStart={() => setActiveLink(`${index}-${linkIndex}`)}
                    onHoverEnd={() => setActiveLink(null)}
                  >
                    <a 
                      href={link.url} 
                      className="flex items-center transition-colors duration-300"
                      style={{ color: colors.mutedText }}
                    >
                      {activeLink === `${index}-${linkIndex}` && (
                        <motion.span 
                          layoutId="footer-link-indicator"
                          className="inline-block w-1.5 h-1.5 rounded-full mr-2 transition-colors duration-300"
                          style={{ background: colors.accent }}
                          transition={{ type: "spring", stiffness: 500 }}
                        />
                      )}
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div 
          className="border-t mt-12 pt-8 transition-colors duration-300"
          style={{ borderColor: colors.border }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div 
              className="flex items-center text-sm transition-colors duration-300"
              style={{ color: colors.mutedText }}
            >
              <FaRegCopyright className="mr-1" />
              <span>2025 MindCare. All rights reserved.</span>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
              {legalLinks.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.url}
                  whileHover={{ color: colors.hoverText }}
                  className="text-sm transition-colors duration-300"
                  style={{ color: colors.mutedText }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Mission Statement */}
          <motion.p 
            className="text-center mt-6 text-sm max-w-3xl mx-auto transition-colors duration-300"
            style={{ color: colors.mutedText }}
            initial={{ opacity: 0.7 }}
            whileHover={{ opacity: 1 }}
          >
            MindCare is committed to providing compassionate mental health resources. 
            Our content is reviewed by licensed professionals, but is not a substitute 
            for professional diagnosis or treatment.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;