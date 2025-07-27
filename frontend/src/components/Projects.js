import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { HiExternalLink, HiCode, HiSparkles, HiPlay, HiPause, HiX } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';

const Projects = ({ projects = [] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  const categories = ['all', 'Web Development', 'AI/ML', 'Mobile'];
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'accent-green';
      case 'discontinued': return 'red-500';
      case 'coming_soon': return 'accent-blue';
      default: return 'accent-green';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Active';
      case 'discontinued': return 'Discontinued';
      case 'coming_soon': return 'Coming Soon';
      default: return 'Active';
    }
  };

  const ProjectModal = ({ project, onClose }) => (
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
            <HiX size={24} />
          </button>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Project Image/Preview */}
            <div className="space-y-6">
              <div className="aspect-video bg-gradient-to-br from-accent-green/20 to-accent-blue/20 rounded-xl flex items-center justify-center relative overflow-hidden group">
                {project.image_url ? (
                  <img 
                    src={project.image_url} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <HiCode size={64} className="mx-auto mb-4 text-accent-green opacity-50" />
                    <p className="text-gray-400">Project Preview</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Technologies */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-glass-light rounded-full text-sm font-jetbrains text-accent-green border border-accent-green/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <h2 className="text-3xl font-space-grotesk font-bold text-white">
                    {project.title}
                  </h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-${getStatusColor(project.status)}/20 text-${getStatusColor(project.status)} border border-${getStatusColor(project.status)}/30`}>
                    {getStatusText(project.status)}
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {project.long_description || project.description}
                </p>
              </div>

              {/* Status Messages */}
              {project.status === 'discontinued' && (
                <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-sm">
                    <strong>PROJECT DISCONTINUED:</strong> This project has been discontinued 
                    but the concepts and learnings continue to influence other work.
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {project.demo_url && (
                  <motion.a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary flex items-center justify-center space-x-2"
                  >
                    <HiExternalLink />
                    <span>Live Demo</span>
                  </motion.a>
                )}
                
                {project.github_url && (
                  <motion.a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-secondary flex items-center justify-center space-x-2"
                  >
                    <FaGithub />
                    <span>View Code</span>
                  </motion.a>
                )}
              </div>

              {/* Additional Info */}
              <div className="pt-6 border-t border-glass-medium">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Category:</span>
                    <span className="text-white ml-2">{project.category}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Status:</span>
                    <span className={`text-${getStatusColor(project.status)} ml-2`}>
                      {getStatusText(project.status)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <section id="projects" ref={ref} className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-40 right-20 w-80 h-80 opacity-10">
          <div className="w-full h-full bg-accent-blue rounded-full animate-pulse-glow" style={{ filter: 'blur(80px)' }} />
        </div>
        <div className="absolute bottom-40 left-20 w-96 h-96 opacity-10">
          <div className="w-full h-full bg-accent-green rounded-full animate-pulse-glow" style={{ filter: 'blur(100px)' }} />
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
              <span className="font-jetbrains text-accent-green tracking-wider text-sm">FEATURED WORK</span>
            </div>
            <h2 className="text-display-2 font-space-grotesk font-bold mb-6">
              <span className="text-white">Selected </span>
              <span className="gradient-text-green">Projects</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A showcase of my latest work, featuring innovative solutions and cutting-edge technologies 
              that push the boundaries of digital experiences.
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div variants={itemVariants} className="flex justify-center mb-12">
            <div className="glass-morphism rounded-full p-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    filter === category
                      ? 'bg-accent-green text-black shadow-lg'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {category === 'all' ? 'All Projects' : category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={containerVariants}
            className="grid lg:grid-cols-2 gap-8"
          >
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project._id || project.id}
                  variants={itemVariants}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="glass-morphism-strong rounded-2xl overflow-hidden group cursor-pointer interactive-card"
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Project Image */}
                  <div className="aspect-video bg-gradient-to-br from-accent-green/20 to-accent-blue/20 relative overflow-hidden">
                    {project.image_url ? (
                      <img 
                        src={project.image_url} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <HiCode size={48} className="text-accent-green opacity-50" />
                      </div>
                    )}
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-${getStatusColor(project.status)}/90 text-white backdrop-blur-sm`}>
                        {getStatusText(project.status)}
                      </span>
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            {project.demo_url && (
                              <div className="p-2 bg-accent-green/20 rounded-lg backdrop-blur-sm">
                                <HiExternalLink className="text-accent-green" />
                              </div>
                            )}
                            {project.github_url && (
                              <div className="p-2 bg-accent-blue/20 rounded-lg backdrop-blur-sm">
                                <FaGithub className="text-accent-blue" />
                              </div>
                            )}
                          </div>
                          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                            <HiPlay className="text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-space-grotesk font-bold text-white group-hover:text-accent-green transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-xs font-jetbrains text-accent-green bg-accent-green/10 px-2 py-1 rounded">
                        {project.category}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies?.slice(0, 3).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-glass-light rounded text-xs font-jetbrains text-accent-green/80"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies?.length > 3 && (
                        <span className="px-2 py-1 bg-glass-light rounded text-xs font-jetbrains text-gray-400">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Action */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">
                        Click to view details
                      </span>
                      <HiExternalLink className="text-accent-green opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-16"
          >
            <p className="text-gray-300 mb-6">
              Interested in working together on your next project?
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
              Let's Collaborate →
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
};

export default Projects;