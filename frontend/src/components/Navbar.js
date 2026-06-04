import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    // Check for saved theme preference or prefer OS theme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      unsubscribe();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleTools = () => setToolsOpen(!toolsOpen);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/");
      setMenuOpen(false);
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const navLinks = [
    ...(user ? [{ path: "/", name: "" }] : []),
    { path: "/", name: "Home" },
    { path: "/about", name: "About Us" },
    { path: "/contact", name: "Contact Us" },
    { path: "/blogs", name: "Blogs" },
  ];

  const authLinks = user
    ? [{ action: handleLogout, name: "Logout" }]
    : [
        { path: "/signup", name: "Sign Up" },
        { path: "/signin", name: "Sign In", isButton: true },
      ];

  // Theme-aware colors
  const navBg = darkMode 
    ? "bg-gradient-to-r from-gray-900 to-gray-800" 
    : "bg-gradient-to-r from-[#A47148] to-[#D1A68E]";
  
  const textColor = darkMode ? "text-gray-100" : "text-white";
  const hoverTextColor = darkMode ? "hover:text-gray-300" : "hover:text-[#fff8e1]";
  const activeTextColor = darkMode ? "text-gray-300" : "text-[#fff8e1]";
  const mobileBg = darkMode ? "bg-gray-800" : "bg-[#D1A68E]";
  const mobileHoverBg = darkMode ? "hover:bg-gray-700" : "hover:bg-[#A47148]";
  const mobileActiveBg = darkMode ? "bg-gray-700" : "bg-[#A47148]";
  const dropdownBg = darkMode ? "bg-gray-800" : "bg-white";
  const dropdownText = darkMode ? "text-gray-100" : "text-[#A47148]";
  const dropdownHover = darkMode ? "hover:bg-gray-700" : "hover:bg-[#fff8e1]";
  const buttonBg = darkMode 
    ? "bg-gray-700 text-gray-100 hover:bg-gray-600" 
    : "bg-white text-[#A47148] hover:bg-[#fff8e1]";

  return (
    <>
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          scrolled ? "shadow-xl" : "shadow-md"
        }`}
      >
        <nav
          className={`${navBg} p-4 transition-all duration-300 ${
            scrolled ? "py-2" : "py-4"
          }`}
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              <Link to="/" className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-8 w-8 ${textColor}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                <span className={`ml-2 ${textColor} font-bold text-2xl`}>
                  MindCare
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <motion.div
                  key={link.path}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={link.path}
                    className={`relative px-3 py-2 ${textColor} font-medium transition-colors ${
                      location.pathname === link.path
                        ? `${activeTextColor} font-semibold`
                        : hoverTextColor
                    }`}
                  >
                    {link.name}
                    {location.pathname === link.path && (
                      <motion.span
                        layoutId="nav-underline"
                        className={`absolute left-0 top-full block h-0.5 w-full ${
                          darkMode ? "bg-gray-300" : "bg-[#fff8e1]"
                        }`}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}

              {/* Tools Dropdown (visible only if logged in) */}
              {user && (
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleTools}
                    className={`${textColor} font-semibold flex items-center gap-1 px-3 py-2 ${hoverTextColor} transition-colors`}
                  >
                    Tools
                    <ion-icon
                      name={toolsOpen ? "chevron-up" : "chevron-down"}
                    ></ion-icon>
                  </motion.button>

                  <AnimatePresence>
                    {toolsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.3 }}
                        className={`absolute right-0 mt-2 w-48 ${dropdownBg} shadow-lg rounded-lg overflow-hidden border ${
                          darkMode ? "border-gray-600" : "border-gray-200"
                        }`}
                      >
                        <button
                          onClick={() => {
                            navigate("/main");
                            setToolsOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 ${dropdownText} ${dropdownHover} transition-colors`}
                        >
                          🏠 Main Page
                        </button>




                        <button
                          onClick={() => {
                            navigate("/cbt-room");
                            setToolsOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 ${dropdownText} ${dropdownHover} transition-colors`}
                        >
                          🧠 CBT Room
                        </button>
                        <button
                          onClick={() => {
                            navigate("/cbt/thought-reframing");
                            setToolsOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 ${dropdownText} ${dropdownHover} transition-colors`}
                        >
                          💡 Thought Reframing
                        </button>
                        <button
                          onClick={() => {
                            navigate("/cbt/thought-record");
                            setToolsOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 ${dropdownText} ${dropdownHover} transition-colors`}
                        >
                          📝 Thought Record
                        </button>
                        <button
                          onClick={() => {
                            navigate("/cbt/behavior-activation");
                            setToolsOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 ${dropdownText} ${dropdownHover} transition-colors`}
                        >
                          📈 Behavior Activation
                        </button>
                        <button
                          onClick={() => {
                            navigate("/cbt/coping-strategies");
                            setToolsOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 ${dropdownText} ${dropdownHover} transition-colors`}
                        >
                          🛡️ Coping Strategies
                        </button>
                        <button
                          onClick={() => {
                            navigate("/Chatbot");
                            setToolsOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 ${dropdownText} ${dropdownHover} transition-colors`}
                        >
                          💬 AI Chatbot
                        </button>
                        <button
                          onClick={() => {
                            navigate("/profile");
                            setToolsOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 ${dropdownText} ${dropdownHover} transition-colors`}
                        >
                          👤 Profile
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Dark Mode Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDarkMode}
                className={`p-2 rounded-full ${buttonBg} transition-colors`}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? (
                  <ion-icon name="sunny" class="text-xl"></ion-icon>
                ) : (
                  <ion-icon name="moon" class="text-xl"></ion-icon>
                )}
              </motion.button>

              {/* Auth Buttons */}
              {authLinks.map((link, index) =>
                link.path ? (
                  <motion.div
                    key={link.path}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={link.path}
                      className={`px-3 py-2 ${
                        link.isButton
                          ? `${buttonBg} px-4 py-2 rounded-lg font-semibold transition-colors`
                          : `${textColor} ${hoverTextColor} transition-colors`
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={link.action}
                    className={`px-3 py-2 ${textColor} ${hoverTextColor} transition-colors`}
                  >
                    {link.name}
                  </motion.button>
                )
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 md:hidden">
              {/* Mobile Dark Mode Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDarkMode}
                className={`p-2 rounded-full ${buttonBg}`}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? (
                  <ion-icon name="sunny"></ion-icon>
                ) : (
                  <ion-icon name="moon"></ion-icon>
                )}
              </motion.button>

              <motion.button
                className="focus:outline-none"
                onClick={toggleMenu}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle menu"
              >
                <div className="space-y-2">
                  <motion.span
                    animate={{
                      rotate: menuOpen ? 45 : 0,
                      y: menuOpen ? 8 : 0,
                    }}
                    className={`block h-0.5 w-6 ${darkMode ? "bg-gray-100" : "bg-white"}`}
                  />
                  <motion.span
                    animate={{ opacity: menuOpen ? 0 : 1 }}
                    className={`block h-0.5 w-6 ${darkMode ? "bg-gray-100" : "bg-white"}`}
                  />
                  <motion.span
                    animate={{
                      rotate: menuOpen ? -45 : 0,
                      y: menuOpen ? -8 : 0,
                    }}
                    className={`block h-0.5 w-6 ${darkMode ? "bg-gray-100" : "bg-white"}`}
                  />
                </div>
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`md:hidden absolute left-0 right-0 ${mobileBg} shadow-lg mt-2`}
              >
                <div className="px-2 pt-2 pb-4 space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMenuOpen(false)}
                      className={`block px-3 py-2 rounded-md ${textColor} font-medium ${
                        location.pathname === link.path
                          ? `${mobileActiveBg}`
                          : `${mobileHoverBg}`
                      } transition-colors`}
                    >
                      {link.name}
                    </Link>
                  ))}

                  {/* Tools Dropdown for mobile */}
                  {user && (
                    <div className="pl-3">
                      <p className={`${textColor} font-semibold mb-2`}>Tools</p>
                      <div className="space-y-1 pl-2">
                        <button
                          onClick={() => {
                            navigate("/cbt-room");
                            setMenuOpen(false);
                          }}
                          className={`block w-full text-left px-3 py-2 rounded-md ${textColor} ${mobileHoverBg} transition-colors`}
                        >
                          🧠 CBT Room
                        </button>
                        <button
                          onClick={() => {
                            navigate("/cbt/thought-reframing");
                            setMenuOpen(false);
                          }}
                          className={`block w-full text-left px-3 py-2 rounded-md ${textColor} ${mobileHoverBg} transition-colors`}
                        >
                          💡 Thought Reframing
                        </button>
                        <button
                          onClick={() => {
                            navigate("/cbt/thought-record");
                            setMenuOpen(false);
                          }}
                          className={`block w-full text-left px-3 py-2 rounded-md ${textColor} ${mobileHoverBg} transition-colors`}
                        >
                          📝 Thought Record
                        </button>
                        <button
                          onClick={() => {
                            navigate("/cbt/behavior-activation");
                            setMenuOpen(false);
                          }}
                          className={`block w-full text-left px-3 py-2 rounded-md ${textColor} ${mobileHoverBg} transition-colors`}
                        >
                          📈 Behavior Activation
                        </button>
                        <button
                          onClick={() => {
                            navigate("/cbt/coping-strategies");
                            setMenuOpen(false);
                          }}
                          className={`block w-full text-left px-3 py-2 rounded-md ${textColor} ${mobileHoverBg} transition-colors`}
                        >
                          🛡️ Coping Strategies
                        </button>
                        <button
                          onClick={() => {
                            navigate("/Chatbot");
                            setMenuOpen(false);
                          }}
                          className={`block w-full text-left px-3 py-2 rounded-md ${textColor} ${mobileHoverBg} transition-colors`}
                        >
                          💬 AI Chatbot
                        </button>
                        <button
                          onClick={() => {
                            navigate("/profile");
                            setMenuOpen(false);
                          }}
                          className={`block w-full text-left px-3 py-2 rounded-md ${textColor} ${mobileHoverBg} transition-colors`}
                        >
                          👤 Profile
                        </button>
                      </div>
                    </div>
                  )}

                  {authLinks.map((link, index) =>
                    link.path ? (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setMenuOpen(false)}
                        className={`block px-3 py-2 rounded-md ${
                          link.isButton
                            ? `${buttonBg} font-semibold transition-colors`
                            : `${textColor} ${mobileHoverBg} transition-colors`
                        }`}
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <button
                        key={index}
                        onClick={() => {
                          link.action();
                          setMenuOpen(false);
                        }}
                        className={`block w-full text-left px-3 py-2 rounded-md ${textColor} ${mobileHoverBg} transition-colors`}
                      >
                        {link.name}
                      </button>
                    )
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Spacer */}
      <div className="h-24"></div>
    </>
  );
};

export default Navbar;