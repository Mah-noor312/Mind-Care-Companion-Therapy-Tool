import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop"; // ✅ Added

// Pages
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Main from "./pages/Main";
import Chatbot from "./pages/Chatbot";
import MoodTracker from "./pages/MoodTracker";
import Helplines from "./pages/Helplines";
import Profile from "./pages/Profile";
import Suggestions from "./components/Suggestions";
import Resources from "./pages/Resources";
import Blogs from "./pages/blogs";


// New Pages for Feature Items
import EmotionallyAwareAI from "./pages/EmotionallyAwareAI";
import Support24_7 from "./pages/Support24_7";
import HealingTools from "./pages/HealingTools";
import PrivacyPolicy from "./pages/PrivacyPolicy";

// Footer Pages
import MentalHealthGuides from "./Footer/MentalHealthGuides";
import TherapistDirectory from "./Footer/TherapistDirectory";
import MindfulnessExercises from "./Footer/MindfulnessExercises";
import CrisisResources from "./Footer/CrisisResources";
import CommunityForums from "./Footer/CommunityForums";
import LiveChat from "./Footer/LiveChat";
import WellnessPlans from "./Footer/WellnessPlans";
import FAQs from "./Footer/FAQs";
import OurTherapists from "./Footer/OurTherapists";
import Careers from "./Footer/Careers";
import Press from "./Footer/Press";
import TermsOfService from "./Footer/TermsOfService";
import CookiePolicy from "./Footer/CookiePolicy";
import Accessibility from "./Footer/Accessibility";

// New Feature Pages Imports about section
import HolisticWellness from "./pages/HolisticWellness";
import AIEmotionAnalysis from "./pages/AIEmotionAnalysis";
import PrivacyFirst from "./pages/PrivacyFirst";
import ProgressTracking from "./pages/ProgressTracking";
import CommunitySupport from "./pages/CommunitySupport";
import CrisisIntervention from "./pages/CrisisIntervention";

// CBT Pages Imports
import CBTRoom from "./pages/CBTRoom";
import CBTThoughtReframing from "./pages/CBTThoughtReframing";
import CBTThoughtRecord from "./pages/CBTThoughtRecord";
import CBTBehaviorActivation from "./pages/CBTBehaviorActivation";
import CBTCopingStrategies from "./pages/CBTCopingStrategies";

const App = () => {
  return (
    <Router>
      {/* ✅ This ensures every new page opens from the top */}
      <ScrollToTop />

      <Routes>
        {/* Core Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/main" element={<Main />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/mood-tracker" element={<MoodTracker />} />
        <Route path="/helplines" element={<Helplines />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/suggestions" element={<Suggestions />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/blogs" element={<Blogs />} />


        {/* About Section Feature Pages */}
        <Route path="/holistic-wellness" element={<HolisticWellness />} />
        <Route path="/ai-emotion-analysis" element={<AIEmotionAnalysis />} />
        <Route path="/privacy-first" element={<PrivacyFirst />} />
        <Route path="/progress-tracking" element={<ProgressTracking />} />
        <Route path="/community-support" element={<CommunitySupport />} />
        <Route path="/crisis-intervention" element={<CrisisIntervention />} />

        {/* Main Feature Pages */}
        <Route path="/emotionally-aware-ai" element={<EmotionallyAwareAI />} />
        <Route path="/24-7-support" element={<Support24_7 />} />
        <Route path="/healing-tools" element={<HealingTools />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />

        {/* CBT Therapy Room Pages */}
        <Route path="/cbt-room" element={<CBTRoom />} />
        <Route path="/cbt/thought-reframing" element={<CBTThoughtReframing />} />
        <Route path="/cbt/thought-record" element={<CBTThoughtRecord />} />
        <Route path="/cbt/behavior-activation" element={<CBTBehaviorActivation />} />
        <Route path="/cbt/coping-strategies" element={<CBTCopingStrategies />} />

        {/* Footer Resource Routes */}
        <Route path="/mental-health-guides" element={<MentalHealthGuides />} />
        <Route path="/therapist-directory" element={<TherapistDirectory />} />
        <Route path="/mindfulness-exercises" element={<MindfulnessExercises />} />
        <Route path="/crisis-resources" element={<CrisisResources />} />

        {/* Footer Support Routes */}
        <Route path="/community-forums" element={<CommunityForums />} />
        <Route path="/live-chat" element={<LiveChat />} />
        <Route path="/wellness-plans" element={<WellnessPlans />} />
        <Route path="/faqs" element={<FAQs />} />

        {/* Footer Organization Routes */}
        <Route path="/our-therapists" element={<OurTherapists />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/press" element={<Press />} />

        {/* Footer Legal Routes */}
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/accessibility" element={<Accessibility />} />
      </Routes>
    </Router>
  );
};

export default App;