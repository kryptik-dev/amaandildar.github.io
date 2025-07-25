import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BookOpen, Calendar, Tag, Eye, Search, Filter } from 'lucide-react';

const Research = ({ research = [] }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const defaultResearch = [
    {
      _id: 'jarviss-ai-brain',
      title: 'JARVIS\'s AI BRAIN',
      content: 'Based on Google\'s Gemini FOR NOW. Plans on using custom trained models using footage and audio of the actual Iron Man\'s JARVIS. This research explores the implementation of advanced AI reasoning capabilities, natural language processing, and the integration of multi-modal AI systems. The goal is to create a truly intelligent assistant that can understand context, learn from interactions, and provide meaningful responses.',
      summary: 'Exploring the development of JARVIS\'s AI brain using Google\'s Gemini with plans for custom training.',
      category: 'J.A.R.V.I.S.',
      tags: ['AI', 'Machine Learning', 'Google Gemini', 'Custom Training', 'NLP'],
      date_published: '2025-04-21',
      featured: true,
    },
    {
      _id: 'jarvis-email-capability',
      title: 'Powerful Email Capability',
      content: 'JARVIS can now read emails and respond to them. He can also suggest email responses. This is a powerful tool that could change the way JARVIS can be used. The implementation involves sophisticated natural language understanding, context awareness, and automated response generation. This capability transforms JARVIS from a simple assistant to a proactive communication partner.',
      summary: 'JARVIS now has the ability to read and respond to emails with AI-powered suggestions.',
      category: 'J.A.R.V.I.S.',
      tags: ['Email', 'AI', 'Automation', 'Natural Language Processing', 'Communication'],
      date_published: '2025-04-22',
      featured: true,
    },
    {
      _id: 'jarvis-food-ordering',
      title: 'The most powerful tool I have ever created',
      content: 'JARVIS is now able to order food from a restaurant on his own from just a single command. This takes advantage of custom training the model by capturing audio from me actually ordering food, as well as order items from Takealot. Could he potentially replace a personal assistant? This breakthrough represents the convergence of voice recognition, natural language processing, and automated task execution.',
      summary: 'JARVIS can now autonomously order food and items online through custom voice training.',
      category: 'J.A.R.V.I.S.',
      tags: ['Voice Recognition', 'Automation', 'E-commerce', 'AI Assistant', 'Machine Learning'],
      date_published: '2025-04-23',
      featured: true,
    },
    {
      _id: 'xbox-360-exploit',
      title: 'Xbox 360 Hypervisor Vulnerabilities',
      content: 'Research into Xbox 360 hypervisor vulnerabilities and potential exploitation methods. This work explores the security architecture of gaming consoles and identifies potential attack vectors. The research contributes to understanding embedded system security and the importance of secure boot processes in gaming hardware.',
      summary: 'Deep dive into Xbox 360 security architecture and potential vulnerabilities.',
      category: 'Security Research',
      tags: ['Security', 'Hypervisor', 'Xbox 360', 'Vulnerabilities', 'Exploitation'],
      date_published: '2025-03-15',
      featured: false,
    }
  ];

  const researchToDisplay = research.length > 0 ? research : defaultResearch;

  const categories = ['all', ...new Set(researchToDisplay.map(note => note.category))];

  const filteredResearch = researchToDisplay.filter(note => {
    const matchesCategory = selectedCategory === 'all' || note.category === selectedCategory;
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section id="research" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-orbitron font-bold gradient-text mb-6">
            Research
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Exploring the frontiers of AI, security, and emerging technologies
          </p>
        </motion.div>

        {/* Search and Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search research notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 glass-effect rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 focus:border-neon-cyan/50"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-neon-cyan to-neon-purple text-white shadow-neon'
                      : 'glass-effect text-gray-300 hover:text-white hover:shadow-glass'
                  }`}
                >
                  {category === 'all' ? 'All' : category}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Research Notes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredResearch.map((note, index) => (
              <motion.div
                key={note._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 group cursor-pointer hover:shadow-neon transition-all duration-300"
                onClick={() => setSelectedNote(note)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-neon-cyan" />
                    <span className="text-sm font-medium text-neon-cyan">
                      {note.category}
                    </span>
                  </div>
                  {note.featured && (
                    <div className="px-2 py-1 bg-neon-pink/20 backdrop-blur-sm rounded-full">
                      <span className="text-xs font-medium text-neon-pink">Featured</span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-orbitron font-bold text-white mb-3 group-hover:text-neon-cyan transition-colors duration-300">
                  {note.title}
                </h3>

                {/* Summary */}
                <p className="text-gray-400 mb-4 line-clamp-3">
                  {note.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {note.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-glass-dark rounded-full text-xs text-gray-300 border border-white/10 flex items-center"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                  {note.tags.length > 3 && (
                    <span className="px-2 py-1 bg-glass-dark rounded-full text-xs text-gray-400 border border-white/10">
                      +{note.tags.length - 3} more
                    </span>
                  )}
                </div>

                {/* Date and Read More */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(note.date_published)}
                  </div>
                  <div className="flex items-center text-neon-cyan text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Eye className="w-4 h-4 mr-1" />
                    Read More
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No results message */}
        {filteredResearch.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Filter className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No research notes found matching your criteria.</p>
          </motion.div>
        )}

        {/* Research Detail Modal */}
        <AnimatePresence>
          {selectedNote && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedNote(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="glass-card p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <BookOpen className="w-5 h-5 text-neon-cyan" />
                      <span className="text-sm font-medium text-neon-cyan">
                        {selectedNote.category}
                      </span>
                    </div>
                    <h2 className="text-3xl font-orbitron font-bold gradient-text">
                      {selectedNote.title}
                    </h2>
                    <div className="flex items-center text-gray-500 text-sm mt-2">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(selectedNote.date_published)}
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedNote(null)}
                    className="p-2 rounded-full glass-effect hover:shadow-neon transition-all duration-300"
                  >
                    <span className="text-xl text-gray-400">×</span>
                  </motion.button>
                </div>

                <div className="space-y-6">
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 leading-relaxed text-lg">
                      {selectedNote.content}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedNote.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-glass-dark rounded-full text-sm text-gray-300 border border-white/10 flex items-center"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Research;