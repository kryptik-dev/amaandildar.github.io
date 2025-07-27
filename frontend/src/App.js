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
        // Minimum loading time for smooth experience
        setTimeout(() => setLoading(false), 3000);
      }
    };

    fetchPortfolioData();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className="App relative min-h-screen bg-primary text-white overflow-x-hidden">
        <BackgroundEffects />
        
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
              >
                <Navigation />
                <main>
                  <Hero />
                  <About />
                  <Projects projects={portfolioData.projects} />
                  <Research research={portfolioData.research} />
                  <Skills skills={portfolioData.skills} />
                  <section id="apps" className="py-32">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                      <div className="inline-flex items-center space-x-2 glass-morphism px-6 py-3 rounded-full mb-6">
                        <span className="font-jetbrains text-accent-green tracking-wider text-sm">APPLICATIONS</span>
                      </div>
                      <h2 className="text-display-2 font-space-grotesk font-bold mb-8">
                        <span className="text-white">Educational </span>
                        <span className="gradient-text-green">Software</span>
                      </h2>
                      <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
                        Download essential development tools and educational software for your programming journey.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <motion.div
                          whileHover={{ scale: 1.05, y: -5 }}
                          className="glass-morphism-strong rounded-2xl p-8 interactive-card"
                        >
                          <div className="flex items-center mb-6">
                            <img src="/apps/delphi-2010/delphi-2010.png" alt="Delphi 2010" className="w-12 h-12 mr-4" />
                            <h3 className="text-2xl font-space-grotesk font-bold text-white">Delphi 2010</h3>
                          </div>
                          <p className="text-gray-300 mb-6">
                            The default IDE used in South African schools according to the CAPS curriculum. 
                            Lightweight version for educational purposes.
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-accent-green font-jetbrains">~105MB</span>
                            <button className="btn-primary">
                              Download →
                            </button>
                          </div>
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.05, y: -5 }}
                          className="glass-morphism-strong rounded-2xl p-8 interactive-card"
                        >
                          <div className="flex items-center mb-6">
                            <img src="/apps/delphi-12/delphi-12.png" alt="Delphi 12" className="w-12 h-12 mr-4" />
                            <h3 className="text-2xl font-space-grotesk font-bold text-white">Delphi 12</h3>
                          </div>
                          <p className="text-gray-300 mb-6">
                            The latest version of Delphi for modern development with enhanced features 
                            and improved performance.
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-accent-blue font-jetbrains">~1.5GB</span>
                            <button className="btn-primary">
                              Download →
                            </button>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </section>
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
                className="relative z-10"
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
                className="relative z-10"
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
  <div className="min-h-screen pt-32 px-6">
    <div className="max-w-4xl mx-auto">
      <div className="glass-morphism-strong rounded-2xl p-8">
        <h1 className="text-display-3 font-space-grotesk font-bold gradient-text-green mb-6">
          Project Detail
        </h1>
        <p className="text-gray-300">Project detail page coming soon...</p>
      </div>
    </div>
  </div>
);

const ResearchDetail = () => (
  <div className="min-h-screen pt-32 px-6">
    <div className="max-w-4xl mx-auto">
      <div className="glass-morphism-strong rounded-2xl p-8">
        <h1 className="text-display-3 font-space-grotesk font-bold gradient-text-green mb-6">
          Research Detail
        </h1>
        <p className="text-gray-300">Research detail page coming soon...</p>
      </div>
    </div>
  </div>
);

export default App;