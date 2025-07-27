import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { HiSparkles, HiClock, HiEye, HiBookOpen, HiLightningBolt, HiTag } from 'react-icons/hi';

const Research = ({ research = [] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedResearch, setSelectedResearch] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  // Get unique categories
  const categories = ['all', ...new Set(research.map(item => item.category))];
  const filteredResearch = selectedCategory === 'all' 
    ? research 
    : research.filter(item => item.category === selectedCategory);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const ResearchModal = ({ research, onClose }) => (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-6"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative glass-morphism-strong rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 glass-morphism rounded-lg hover:bg-glass-medium transition-colors"
          >
            ✕
          </button>

          <div className="space-y-6">
            {/* Header */}
            <div className="border-b border-glass-medium pb-6">
              <div className="flex items-center space-x-3 mb-4">
                <span className="px-3 py-1 bg-accent-green/20 text-accent-green rounded-full text-sm font-jetbrains">
                  {research.category}
                </span>
                <span className="text-gray-400 text-sm">
                  {formatDate(research.date_published)}
                </span>
              </div>
              <h1 className="text-3xl font-space-grotesk font-bold text-white mb-4">
                {research.title}
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                {research.summary}
              </p>
            </div>

            {/* Tags */}
            {research.tags && research.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {research.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-glass-light rounded-full text-sm text-accent-blue border border-accent-blue/30"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Content */}
            <div className="prose prose-invert max-w-none">
              <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {research.content}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <section id="research" ref={ref} className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-60 left-40 w-64 h-64 opacity-10">
          <div className="w-full h-full bg-accent-green rounded-full animate-pulse-glow" style={{ filter: 'blur(60px)' }} />
        </div>
        <div className="absolute bottom-60 right-40 w-80 h-80 opacity-10">
          <div className="w-full h-full bg-accent-blue rounded-full animate-pulse-glow" style={{ filter: 'blur(80px)' }} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 glass-morphism px-6 py-3 rounded-full mb-6">
              <HiSparkles className="text-accent-green" />
              <span className="font-jetbrains text-accent-green tracking-wider text-sm">RESEARCH & INSIGHTS</span>
            </div>
            <h2 className="text-display-2 font-space-grotesk font-bold mb-6">
              <span className="text-white">Knowledge </span>
              <span className="gradient-text-green">Hub</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Open source research notes documenting my learning journey and insights gained from exploring 
              different areas of software development, AI, and emerging technologies.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="glass-morphism-strong rounded-2xl p-6 sticky top-32">
                <h3 className="text-xl font-space-grotesk font-bold gradient-text-blue mb-6">
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                        selectedCategory === category
                          ? 'bg-accent-green/20 text-accent-green border border-accent-green/30'
                          : 'text-gray-300 hover:text-white hover:bg-glass-light'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">
                          {category === 'all' ? 'All Research' : category}
                        </span>
                        <span className="text-xs bg-glass-light px-2 py-1 rounded">
                          {category === 'all' 
                            ? research.length 
                            : research.filter(item => item.category === category).length
                          }
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Research Articles */}
            <motion.div variants={containerVariants} className="lg:col-span-3">
              <div className="space-y-6">
                <AnimatePresence mode="wait">
                  {filteredResearch.map((item, index) => (
                    <motion.article
                      key={item._id || item.id}
                      variants={itemVariants}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      whileHover={{ y: -5, scale: 1.01 }}
                      className="glass-morphism-strong rounded-2xl p-6 cursor-pointer interactive-card group"
                      onClick={() => setSelectedResearch(item)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <span className="px-3 py-1 bg-accent-green/20 text-accent-green rounded-full text-sm font-jetbrains">
                              {item.category}
                            </span>
                            {item.featured && (
                              <span className="px-3 py-1 bg-accent-blue/20 text-accent-blue rounded-full text-sm font-jetbrains flex items-center space-x-1">
                                <HiLightningBolt size={14} />
                                <span>Featured</span>
                              </span>
                            )}
                          </div>
                          <h3 className="text-xl font-space-grotesk font-bold text-white group-hover:text-accent-green transition-colors mb-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-300 leading-relaxed line-clamp-2">
                            {item.summary}
                          </p>
                        </div>
                        <div className="ml-6 text-right">
                          <HiEye className="text-accent-green opacity-0 group-hover:opacity-100 transition-opacity ml-auto mb-2" size={20} />
                          <div className="text-sm text-gray-400 flex items-center space-x-1">
                            <HiClock size={14} />
                            <span>{formatDate(item.date_published)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Tags */}
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.tags.slice(0, 4).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 bg-glass-light rounded text-xs font-jetbrains text-accent-blue/80 flex items-center space-x-1"
                            >
                              <HiTag size={12} />
                              <span>{tag}</span>
                            </span>
                          ))}
                          {item.tags.length > 4 && (
                            <span className="px-2 py-1 bg-glass-light rounded text-xs font-jetbrains text-gray-400">
                              +{item.tags.length - 4} more
                            </span>
                          )}
                        </div>
                      )}

                      {/* Read More */}
                      <div className="flex items-center justify-between pt-4 border-t border-glass-medium">
                        <span className="text-sm text-gray-400">
                          Click to read full article
                        </span>
                        <div className="flex items-center space-x-2 text-accent-green opacity-0 group-hover:opacity-100 transition-opacity">
                          <HiBookOpen size={16} />
                          <span className="text-sm font-medium">Read More</span>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>

                {filteredResearch.length === 0 && (
                  <motion.div
                    variants={itemVariants}
                    className="text-center py-12"
                  >
                    <HiBookOpen size={48} className="mx-auto mb-4 text-gray-500" />
                    <p className="text-gray-400">No research articles found in this category.</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-16"
          >
            <p className="text-gray-300 mb-6">
              Want to collaborate on research or share insights?
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary text-lg px-8 py-4"
            >
              Get In Touch →
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Research Modal */}
      {selectedResearch && (
        <ResearchModal 
          research={selectedResearch} 
          onClose={() => setSelectedResearch(null)} 
        />
      )}
    </section>
  );
};

export default Research;