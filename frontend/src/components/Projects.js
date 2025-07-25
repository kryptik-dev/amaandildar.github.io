import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, Eye, Star, AlertCircle, Clock, CheckCircle } from 'lucide-react';

const Projects = ({ projects = [] }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filters = [
    { key: 'all', label: 'All Projects' },
    { key: 'Web Development', label: 'Web Dev' },
    { key: 'AI/ML', label: 'AI/ML' },
    { key: 'Mobile', label: 'Mobile' },
  ];

  const statusConfig = {
    active: { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-400/10' },
    coming_soon: { icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    discontinued: { icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-400/10' },
  };

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const defaultProjects = [
    {
      _id: 'the360unity',
      title: 'The360Unity',
      description: 'A community platform for developers to share projects and collaborate.',
      long_description: 'The360Unity is a comprehensive platform designed to bring developers together in a collaborative environment. It features project sharing, code reviews, learning resources, and community discussions.',
      technologies: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'MongoDB'],
      status: 'coming_soon',
      category: 'Web Development',
      featured: true,
      github_url: '',
      demo_url: '',
      image_url: '/api/placeholder/600/400'
    },
    {
      _id: 'jarvis',
      title: 'JARVIS AI',
      description: 'An AI assistant inspired by Tony Stark\'s JARVIS with advanced capabilities.',
      long_description: 'JARVIS was an ambitious AI project featuring email automation, voice recognition, and custom training capabilities. Development was discontinued due to copyright concerns.',
      technologies: ['Python', 'AI/ML', 'Voice Recognition', 'Email API'],
      status: 'discontinued',
      category: 'AI/ML',
      featured: true,
      github_url: '',
      demo_url: '',
      image_url: '/api/placeholder/600/400'
    },
    {
      _id: 'synthora',
      title: 'Synthora',
      description: 'A white-label ChatGPT solution for customizable AI chat interfaces.',
      long_description: 'Synthora is a white-label ChatGPT solution that provides customizable AI chat interfaces for integration into various platforms.',
      technologies: ['Python', 'Flask', 'JavaScript', 'AI Integration'],
      status: 'active',
      category: 'AI/ML',
      featured: true,
      github_url: 'https://github.com/lilpizzaro/synthora',
      demo_url: '',
      image_url: '/api/placeholder/600/400'
    }
  ];

  const projectsToDisplay = filteredProjects.length > 0 ? filteredProjects : defaultProjects;

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-orbitron font-bold gradient-text mb-6">
            Projects
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Showcasing innovative solutions and cutting-edge technologies
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filterOption) => (
            <motion.button
              key={filterOption.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(filterOption.key)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                filter === filterOption.key
                  ? 'bg-gradient-to-r from-neon-cyan to-neon-purple text-white shadow-neon'
                  : 'glass-effect text-gray-300 hover:text-white hover:shadow-glass'
              }`}
            >
              {filterOption.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {projectsToDisplay.map((project, index) => {
              const StatusIcon = statusConfig[project.status]?.icon || CheckCircle;
              const statusColor = statusConfig[project.status]?.color || 'text-green-400';
              const statusBg = statusConfig[project.status]?.bg || 'bg-green-400/10';

              return (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card p-6 group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Project image/placeholder */}
                  <div className="relative mb-6 h-48 rounded-lg overflow-hidden bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-4xl font-orbitron font-bold text-white/30">
                        {project.title.charAt(0)}
                      </div>
                    </div>
                    
                    {/* Status badge */}
                    <div className={`absolute top-4 right-4 ${statusBg} backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-2`}>
                      <StatusIcon className={`w-4 h-4 ${statusColor}`} />
                      <span className={`text-sm font-medium ${statusColor} capitalize`}>
                        {project.status.replace('_', ' ')}
                      </span>
                    </div>

                    {/* Featured badge */}
                    {project.featured && (
                      <div className="absolute top-4 left-4 bg-neon-pink/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-2">
                        <Star className="w-4 h-4 text-neon-pink" />
                        <span className="text-sm font-medium text-neon-pink">Featured</span>
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Project info */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-orbitron font-bold text-white group-hover:text-neon-cyan transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-400 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-glass-dark rounded-full text-sm text-gray-300 border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-3 py-1 bg-glass-dark rounded-full text-sm text-gray-400 border border-white/10">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-4 pt-4">
                      {project.github_url && (
                        <motion.a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-full glass-effect hover:shadow-neon transition-all duration-300"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="w-5 h-5 text-gray-400 hover:text-neon-cyan transition-colors duration-300" />
                        </motion.a>
                      )}
                      {project.demo_url && (
                        <motion.a
                          href={project.demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-full glass-effect hover:shadow-neon transition-all duration-300"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-5 h-5 text-gray-400 hover:text-neon-cyan transition-colors duration-300" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="glass-card p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-3xl font-orbitron font-bold gradient-text">
                    {selectedProject.title}
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedProject(null)}
                    className="p-2 rounded-full glass-effect hover:shadow-neon transition-all duration-300"
                  >
                    <span className="text-xl text-gray-400">×</span>
                  </motion.button>
                </div>

                <div className="space-y-6">
                  <p className="text-gray-300 leading-relaxed">
                    {selectedProject.long_description}
                  </p>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-glass-dark rounded-full text-sm text-gray-300 border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    {selectedProject.github_url && (
                      <motion.a
                        href={selectedProject.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="glow-button flex items-center space-x-2"
                      >
                        <Github className="w-5 h-5" />
                        <span>View Code</span>
                      </motion.a>
                    )}
                    {selectedProject.demo_url && (
                      <motion.a
                        href={selectedProject.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="border border-neon-cyan/30 bg-transparent hover:bg-neon-cyan/10 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
                      >
                        <ExternalLink className="w-5 h-5" />
                        <span>Live Demo</span>
                      </motion.a>
                    )}
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

export default Projects;