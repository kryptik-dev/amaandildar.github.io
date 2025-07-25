import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Database, Brain, Palette, Server, Smartphone, Shield, Zap } from 'lucide-react';

const Skills = ({ skills = [] }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const defaultSkills = [
    { name: 'Frontend Development', category: 'Development', level: 90, icon: Code, color: 'text-neon-cyan' },
    { name: 'React/Next.js', category: 'Development', level: 85, icon: Code, color: 'text-neon-cyan' },
    { name: 'JavaScript/TypeScript', category: 'Development', level: 85, icon: Code, color: 'text-neon-cyan' },
    { name: 'Python', category: 'Development', level: 80, icon: Code, color: 'text-neon-cyan' },
    { name: 'Database Design', category: 'Backend', level: 70, icon: Database, color: 'text-neon-purple' },
    { name: 'FastAPI/Flask', category: 'Backend', level: 75, icon: Server, color: 'text-neon-purple' },
    { name: 'MongoDB/PostgreSQL', category: 'Backend', level: 70, icon: Database, color: 'text-neon-purple' },
    { name: 'AI/ML', category: 'AI', level: 75, icon: Brain, color: 'text-neon-pink' },
    { name: 'Natural Language Processing', category: 'AI', level: 70, icon: Brain, color: 'text-neon-pink' },
    { name: 'Computer Vision', category: 'AI', level: 65, icon: Brain, color: 'text-neon-pink' },
    { name: 'UI/UX Design', category: 'Design', level: 80, icon: Palette, color: 'text-neon-blue' },
    { name: 'Figma/Adobe Suite', category: 'Design', level: 75, icon: Palette, color: 'text-neon-blue' },
    { name: 'Cybersecurity', category: 'Security', level: 65, icon: Shield, color: 'text-neon-green' },
    { name: 'Performance Optimization', category: 'Performance', level: 80, icon: Zap, color: 'text-yellow-400' },
  ];

  const skillsToDisplay = skills.length > 0 ? skills : defaultSkills;

  const categories = [...new Set(skillsToDisplay.map(skill => skill.category))];

  const iconMap = {
    Development: Code,
    Backend: Database,
    AI: Brain,
    Design: Palette,
    Security: Shield,
    Performance: Zap,
    Mobile: Smartphone,
  };

  const colorMap = {
    Development: 'text-neon-cyan',
    Backend: 'text-neon-purple',
    AI: 'text-neon-pink',
    Design: 'text-neon-blue',
    Security: 'text-neon-green',
    Performance: 'text-yellow-400',
    Mobile: 'text-orange-400',
  };

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-orbitron font-bold gradient-text mb-6">
            Skills & Expertise
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Mastering the tools and technologies that shape the future
          </p>
        </motion.div>

        {/* Skills by Category */}
        <div className="space-y-12">
          {categories.map((category, categoryIndex) => {
            const categorySkills = skillsToDisplay.filter(skill => skill.category === category);
            const CategoryIcon = iconMap[category] || Code;
            const categoryColor = colorMap[category] || 'text-neon-cyan';

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="glass-card p-8"
              >
                <div className="flex items-center mb-8">
                  <CategoryIcon className={`w-8 h-8 ${categoryColor} mr-4`} />
                  <h3 className="text-3xl font-orbitron font-bold text-white">
                    {category}
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {categorySkills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {skill.icon && (
                            <skill.icon className={`w-5 h-5 ${skill.color || categoryColor}`} />
                          )}
                          <span className="text-white font-medium">{skill.name}</span>
                        </div>
                        <span className={`text-sm font-bold ${skill.color || categoryColor}`}>
                          {skill.level}%
                        </span>
                      </div>

                      <div className="relative">
                        <div className="h-2 bg-glass-dark rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${
                              skill.color === 'text-neon-cyan' ? 'from-neon-cyan to-neon-blue' :
                              skill.color === 'text-neon-purple' ? 'from-neon-purple to-neon-pink' :
                              skill.color === 'text-neon-pink' ? 'from-neon-pink to-neon-purple' :
                              skill.color === 'text-neon-blue' ? 'from-neon-blue to-neon-cyan' :
                              'from-neon-cyan to-neon-purple'
                            }`}
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${skill.level}%` } : {}}
                            transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.5 }}
                          />
                        </div>
                        
                        {/* Skill level indicator */}
                        <motion.div
                          className={`absolute top-0 h-2 w-1 bg-white rounded-full shadow-neon`}
                          initial={{ left: 0 }}
                          animate={inView ? { left: `${skill.level}%` } : {}}
                          transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.5 }}
                          style={{ transform: 'translateX(-50%)' }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Overall Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: 'Technologies', value: '20+', color: 'text-neon-cyan' },
            { label: 'Years Experience', value: '3+', color: 'text-neon-purple' },
            { label: 'Projects Completed', value: '50+', color: 'text-neon-pink' },
            { label: 'Lines of Code', value: '100K+', color: 'text-neon-blue' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="glass-card p-6 text-center group hover:shadow-neon transition-all duration-300"
            >
              <div className={`text-4xl font-orbitron font-bold ${stat.color} mb-2 group-hover:animate-pulse`}>
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Continuous Learning */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="glass-card p-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Brain className="w-12 h-12 text-neon-pink animate-pulse" />
            </div>
            <h3 className="text-2xl font-orbitron font-bold gradient-text mb-4">
              Continuous Learning
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Technology evolves rapidly, and so do I. I'm constantly exploring new frameworks, 
              languages, and methodologies to stay at the forefront of innovation. Currently 
              diving deep into advanced AI architectures, quantum computing concepts, and 
              next-generation web technologies.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;