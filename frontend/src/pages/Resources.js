import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import './Resources.css';

const Resources = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Mental health resources data
  const resources = [
    {
      id: 1,
      title: "Understanding Anxiety Disorders",
      category: "articles",
      type: "Article",
      duration: "5 min read",
      description: "Learn about different types of anxiety disorders, their symptoms, and evidence-based treatment approaches.",
      image: "📝",
      link: "https://www.nimh.nih.gov/health/topics/anxiety-disorders",
      tags: ["anxiety", "mental-health", "education"]
    },
    {
      id: 2,
      title: "Mindfulness Meditation Guide",
      category: "videos",
      type: "Video",
      duration: "15 min",
      description: "A guided meditation session to help you practice mindfulness and reduce stress in daily life.",
      image: "🎥",
      link: "https://www.mindful.org/meditation/mindfulness-getting-started/",
      tags: ["meditation", "mindfulness", "stress-relief"]
    },
    {
      id: 3,
      title: "Crisis Text Line",
      category: "helplines",
      type: "Hotline",
      duration: "24/7",
      description: "Free, 24/7 support for those in crisis. Text HOME to 741741 to connect with a trained crisis counselor.",
      image: "📞",
      link: "https://www.crisistextline.org",
      tags: ["crisis", "support", "immediate-help"]
    },
    {
      id: 4,
      title: "Cognitive Behavioral Therapy Basics",
      category: "articles",
      type: "Article",
      duration: "8 min read",
      description: "Introduction to CBT techniques that can help you identify and change negative thought patterns.",
      image: "📝",
      link: "https://www.apa.org/ptsd-guideline/patients-and-families/cognitive-behavioral",
      tags: ["cbt", "therapy", "self-help"]
    },
    {
      id: 5,
      title: "Breathing Exercises for Panic Attacks",
      category: "videos",
      type: "Video",
      duration: "10 min",
      description: "Learn breathing techniques that can help manage panic attacks and anxiety symptoms in the moment.",
      image: "🎥",
      link: "https://www.anxietycanada.com/articles/calm-breathing/",
      tags: ["breathing", "panic", "anxiety", "techniques"]
    },
    {
      id: 6,
      title: "National Suicide Prevention Lifeline",
      category: "helplines",
      type: "Hotline",
      duration: "24/7",
      description: "Call 988 for free and confidential support for people in distress, prevention and crisis resources.",
      image: "📞",
      link: "https://988lifeline.org",
      tags: ["crisis", "suicide-prevention", "emergency"]
    },
    {
      id: 7,
      title: "Building Healthy Sleep Habits",
      category: "articles",
      type: "Article",
      duration: "6 min read",
      description: "How sleep affects mental health and practical tips for improving your sleep quality.",
      image: "📝",
      link: "https://www.sleepfoundation.org/mental-health",
      tags: ["sleep", "wellness", "self-care"]
    },
    {
      id: 8,
      title: "Yoga for Depression and Anxiety",
      category: "videos",
      type: "Video",
      duration: "20 min",
      description: "Gentle yoga sequence specifically designed to help alleviate symptoms of depression and anxiety.",
      image: "🎥",
      link: "https://www.youtube.com/watch?v=4pkb1q13I8Q",
      tags: ["yoga", "exercise", "depression", "anxiety"]
    },
    {
      id: 9,
      title: "SAMHSA National Helpline",
      category: "helplines",
      type: "Hotline",
      duration: "24/7",
      description: "1-800-662-HELP (4357) - Treatment referral and information service for mental health and substance use.",
      image: "📞",
      link: "https://www.samhsa.gov/find-help/national-helpline",
      tags: ["substance-abuse", "treatment", "referral"]
    },
    {
      id: 10,
      title: "Journaling for Emotional Wellness",
      category: "articles",
      type: "Article",
      duration: "4 min read",
      description: "Discover how journaling can help process emotions and improve mental clarity.",
      image: "📝",
      link: "https://psychcentral.com/lib/the-health-benefits-of-journaling",
      tags: ["journaling", "emotional-health", "self-reflection"]
    },
    {
      id: 11,
      title: "Progressive Muscle Relaxation",
      category: "videos",
      type: "Video",
      duration: "12 min",
      description: "Step-by-step guide to progressive muscle relaxation technique for stress and anxiety relief.",
      image: "🎥",
      link: "https://www.verywellmind.com/how-do-i-practice-progressive-muscle-relaxation-3024403",
      tags: ["relaxation", "stress", "techniques"]
    },
    {
      id: 12,
      title: "Trevor Project LGBTQ+ Support",
      category: "helplines",
      type: "Hotline",
      duration: "24/7",
      description: "1-866-488-7386 - Crisis intervention and suicide prevention services for LGBTQ young people.",
      image: "📞",
      link: "https://www.thetrevorproject.org",
      tags: ["lgbtq", "crisis", "youth", "support"]
    }
  ];

  const categories = [
    { id: "all", name: "All Resources", count: resources.length },
    { id: "articles", name: "Articles", count: resources.filter(r => r.category === "articles").length },
    { id: "videos", name: "Videos", count: resources.filter(r => r.category === "videos").length },
    { id: "helplines", name: "Helplines", count: resources.filter(r => r.category === "helplines").length }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = activeCategory === "all" || resource.category === activeCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleResourceClick = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="resources-container">
      <Navbar />
      
      {/* Hero Section */}
      <div className="resources-hero">
        <div className="resources-hero-content">
          <h1>Mental Health Resources</h1>
          <p className="hero-subtitle">
            Curated collection of articles, videos, and helplines to support your mental wellness journey
          </p>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search resources, topics, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="categories-section">
        <div className="categories-container">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span className="category-name">{category.name}</span>
              <span className="category-count">{category.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Resources Grid */}
      <div className="resources-section">
        <div className="resources-grid">
          {filteredResources.length > 0 ? (
            filteredResources.map(resource => (
              <div key={resource.id} className="resource-card" onClick={() => handleResourceClick(resource.link)}>
                <div className="resource-header">
                  <div className="resource-image">{resource.image}</div>
                  <div className="resource-meta">
                    <span className="resource-type">{resource.type}</span>
                    <span className="resource-duration">{resource.duration}</span>
                  </div>
                </div>
                
                <h3 className="resource-title">{resource.title}</h3>
                <p className="resource-description">{resource.description}</p>
                
                <div className="resource-tags">
                  {resource.tags.map((tag, index) => (
                    <span key={index} className="resource-tag">#{tag}</span>
                  ))}
                </div>
                
                <div className="resource-footer">
                  <button className="resource-link">
                    View Resource <span className="arrow">→</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No resources found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Emergency Section */}
      <div className="emergency-section">
        <div className="emergency-content">
          <div className="emergency-icon">🚨</div>
          <div className="emergency-text">
            <h2>Need Immediate Help?</h2>
            <p>If you're in crisis or experiencing thoughts of self-harm, please reach out to these emergency resources immediately:</p>
            <div className="emergency-contacts">
              <div className="emergency-contact">
                <strong>National Suicide Prevention Lifeline</strong>
                <span>Call or Text 988</span>
              </div>
              <div className="emergency-contact">
                <strong>Crisis Text Line</strong>
                <span>Text HOME to 741741</span>
              </div>
              <div className="emergency-contact">
                <strong>Emergency Services</strong>
                <span>Call 911</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2 className="section-title">Quick Access</h2>
        <div className="action-buttons">
          <button className="action-btn" onClick={() => navigate('/Chatbot')}>
            <span className="action-icon">💬</span>
            <span className="action-text">Talk to Our Chatbot</span>
          </button>
          <button className="action-btn" onClick={() => navigate('/healing-tools')}>
            <span className="action-icon">🧘‍♀️</span>
            <span className="action-text">Self-Care Tools</span>
          </button>
          <button className="action-btn" onClick={() => navigate('/main')}>
            <span className="action-icon">🏠</span>
            <span className="action-text">Back to Home</span>
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Resources;