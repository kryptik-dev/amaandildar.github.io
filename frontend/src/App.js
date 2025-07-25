import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

// Components
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Research from './components/Research';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackgroundEffects from './components/BackgroundEffects';
import LoadingScreen from './components/LoadingScreen';

// API Configuration
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

function App() {
  const [loading, setLoading] = useState(true);
  const [portfolioData, setPortfolioData] = useState({
    projects: [],
    research: [],
    skills: [],
    experience: [],
    stats: {}
  });

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const [projectsRes, researchRes, skillsRes, experienceRes, statsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/projects`),
          axios.get(`${API_BASE_URL}/api/research`),
          axios.get(`${API_BASE_URL}/api/skills`),
          axios.get(`${API_BASE_URL}/api/experience`),
          axios.get(`${API_BASE_URL}/api/portfolio-stats`)
        ]);

        setPortfolioData({
          projects: projectsRes.data.projects || [],
          research: researchRes.data.research || [],
          skills: skillsRes.data.skills || [],
          experience: experienceRes.data.experience || [],
          stats: statsRes.data || {}
        });
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
        // Set default data if API fails
        setPortfolioData({
          projects: [],
          research: [],
          skills: [],
          experience: [],
          stats: {}
        });
      } finally {
        setTimeout(() => setLoading(false), 2000); // Minimum loading time for effect
      }
    };

    fetchPortfolioData();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className="App relative min-h-screen bg-dark-900 text-white overflow-x-hidden">
        <BackgroundEffects />
        
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Navigation />
                <main>
                  <Hero />
                  <About />
                  <Projects projects={portfolioData.projects} />
                  <Research research={portfolioData.research} />
                  <Skills skills={portfolioData.skills} />
                  <Contact />
                </main>
                <Footer />
              </motion.div>
            } />
            
            <Route path="/project/:id" element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Navigation />
                <ProjectDetail />
                <Footer />
              </motion.div>
            } />
            
            <Route path="/research/:id" element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Navigation />
                <ResearchDetail />
                <Footer />
              </motion.div>
            } />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

// Placeholder components for detailed views
const ProjectDetail = () => (
  <div className="min-h-screen pt-20 px-6">
    <div className="max-w-4xl mx-auto">
      <div className="glass-card p-8">
        <h1 className="text-4xl font-orbitron font-bold gradient-text mb-6">Project Detail</h1>
        <p className="text-gray-300">Project detail page coming soon...</p>
      </div>
    </div>
  </div>
);

const ResearchDetail = () => (
  <div className="min-h-screen pt-20 px-6">
    <div className="max-w-4xl mx-auto">
      <div className="glass-card p-8">
        <h1 className="text-4xl font-orbitron font-bold gradient-text mb-6">Research Detail</h1>
        <p className="text-gray-300">Research detail page coming soon...</p>
      </div>
    </div>
  </div>
);

export default App;