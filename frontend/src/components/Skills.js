import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiSparkles, HiCode, HiDesktopComputer, HiColorSwatch, HiDatabase } from 'react-icons/hi';

const Skills = ({ skills = [] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {});

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'development':
        return HiCode;
      case 'frontend':
        return HiDesktopComputer;
      case 'ai':
        return HiBrain;
      case 'design':
        return HiColorSwatch;
      case 'backend':
        return HiDatabase;
      default:
        return HiCode;
    }
  };

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'development':
        return 'accent-green';
      case 'frontend':
        return 'accent-blue';
      case 'ai':
        return 'accent-green';
      case 'design':
        return 'accent-blue';
      case 'backend':
        return 'accent-green';
      default:
        return 'accent-green';
    }
  };

  return (
    <section id="skills" ref={ref} className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 opacity-10">
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
              <span className="font-jetbrains text-accent-green tracking-wider text-sm">CAPABILITIES</span>
            </div>
            <h2 className="text-display-2 font-space-grotesk font-bold mb-6">
              <span className="text-white">Technical </span>
              <span className="gradient-text-green">Arsenal</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A comprehensive toolkit of technologies, frameworks, and methodologies that enable me 
              to build exceptional digital experiences from concept to deployment.
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {Object.entries(skillsByCategory).map(([category, categorySkills], categoryIndex) => {
              const Icon = getCategoryIcon(category);
              const colorClass = getCategoryColor(category);

              return (
                <motion.div
                  key={category}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="glass-morphism-strong rounded-2xl p-8 interactive-card"
                >
                  {/* Category Header */}
                  <div className="flex items-center space-x-3 mb-8">
                    <div className={`p-3 bg-${colorClass}/20 rounded-xl`}>
                      <Icon className={`text-2xl text-${colorClass}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-space-grotesk font-bold text-white">
                        {category}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {categorySkills.length} skill{categorySkills.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-6">
                    {categorySkills
                      .sort((a, b) => (b.level || 0) - (a.level || 0))
                      .map((skill, skillIndex) => (
                        <div key={skillIndex} className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-white">
                              {skill.name}
                            </span>
                            <span className={`text-${colorClass} font-jetbrains text-sm font-bold`}>
                              {skill.level || 0}%
                            </span>
                          </div>
                          
                          {/* Progress Bar */}
                          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full bg-${colorClass} rounded-full relative`}
                              initial={{ width: 0 }}
                              animate={isInView ? { width: `${skill.level || 0}%` } : { width: 0 }}
                              transition={{ 
                                duration: 1.2, 
                                delay: categoryIndex * 0.2 + skillIndex * 0.1,
                                ease: "easeOut"
                              }}
                            >
                              {/* Animated shimmer effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                            </motion.div>
                          </div>

                          {/* Skill Description */}
                          {skill.description && (
                            <p className="text-sm text-gray-400 leading-relaxed">
                              {skill.description}
                            </p>
                          )}
                        </div>
                      ))}
                  </div>

                  {/* Category Stats */}
                  <div className="mt-8 pt-6 border-t border-glass-medium">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Average Proficiency</span>
                      <span className={`text-${colorClass} font-jetbrains font-bold`}>
                        {Math.round(
                          categorySkills.reduce((sum, skill) => sum + (skill.level || 0), 0) / categorySkills.length
                        )}%
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Additional Info */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <div className="glass-morphism-strong rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-space-grotesk font-bold gradient-text-blue mb-6">
                Always Learning
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Technology evolves rapidly, and so do I. I'm constantly exploring new frameworks, 
                languages, and methodologies to stay at the forefront of innovation. Currently diving 
                deep into emerging AI technologies, advanced React patterns, and next-generation development tools.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  'Next.js 14',
                  'Artificial Intelligence',
                  'WebAssembly',
                  'Edge Computing',
                  'Blockchain Development',
                  'Quantum Computing'
                ].map((tech, index) => (
                  <motion.span
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    className="px-4 py-2 bg-glass-light rounded-full text-sm font-jetbrains text-accent-green border border-accent-green/30 cursor-pointer"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;