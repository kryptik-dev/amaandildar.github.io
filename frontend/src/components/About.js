import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { User, Heart, Target, Lightbulb, Code2, Cpu, Palette, Database } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const skills = [
    {
      category: 'Frontend',
      icon: Code2,
      color: 'text-neon-cyan',
      skills: ['React/Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion']
    },
    {
      category: 'Backend',
      icon: Database,
      color: 'text-neon-purple',
      skills: ['FastAPI', 'Python', 'MongoDB', 'PostgreSQL']
    },
    {
      category: 'AI/ML',
      icon: Cpu,
      color: 'text-neon-pink',
      skills: ['Machine Learning', 'NLP', 'Computer Vision', 'TensorFlow']
    },
    {
      category: 'Design',
      icon: Palette,
      color: 'text-neon-blue',
      skills: ['UI/UX Design', 'Figma', 'Adobe Creative Suite', 'Glassmorphism']
    }
  ];

  const achievements = [
    {
      number: '50+',
      label: 'Projects Completed',
      icon: Target,
      color: 'text-neon-cyan'
    },
    {
      number: '3+',
      label: 'Years Experience',
      icon: User,
      color: 'text-neon-purple'
    },
    {
      number: '100+',
      label: 'Research Hours',
      icon: Lightbulb,
      color: 'text-neon-pink'
    },
    {
      number: '∞',
      label: 'Passion Level',
      icon: Heart,
      color: 'text-neon-blue'
    }
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-orbitron font-bold gradient-text mb-6">
            About Me
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Passionate developer pushing the boundaries of what's possible in web development and AI
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card p-8">
              <h3 className="text-3xl font-orbitron font-bold text-white mb-6 flex items-center">
                <User className="w-8 h-8 text-neon-cyan mr-3" />
                My Journey
              </h3>
              <div className="space-y-4 text-gray-300">
                <p className="leading-relaxed">
                  I'm a self-taught developer and AI innovator with an insatiable curiosity for creating 
                  the impossible. My journey began with a simple fascination for how things work, 
                  which evolved into a deep passion for building next-generation digital experiences.
                </p>
                <p className="leading-relaxed">
                  From developing AI assistants inspired by science fiction to creating immersive 
                  web applications with cutting-edge technologies, I continuously push the boundaries 
                  of what's possible in the digital realm.
                </p>
                <p className="leading-relaxed">
                  My expertise spans across full-stack development, artificial intelligence, and 
                  innovative user experience design. I believe in the power of technology to 
                  transform lives and shape the future.
                </p>
              </div>
            </div>

            {/* Achievements */}
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="glass-card p-6 text-center group hover:shadow-neon transition-all duration-300"
                >
                  <achievement.icon className={`w-8 h-8 ${achievement.color} mx-auto mb-2 group-hover:animate-pulse`} />
                  <div className={`text-3xl font-bold ${achievement.color} mb-1`}>
                    {achievement.number}
                  </div>
                  <div className="text-gray-400 text-sm">{achievement.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="glass-card p-8">
              <h3 className="text-3xl font-orbitron font-bold text-white mb-6 flex items-center">
                <Code2 className="w-8 h-8 text-neon-purple mr-3" />
                Tech Stack
              </h3>
              
              <div className="space-y-6">
                {skills.map((category, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="group"
                  >
                    <div className="flex items-center mb-3">
                      <category.icon className={`w-6 h-6 ${category.color} mr-3 group-hover:animate-pulse`} />
                      <h4 className="text-xl font-semibold text-white">{category.category}</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skillIndex}
                          whileHover={{ scale: 1.05 }}
                          className="bg-glass-dark backdrop-blur-sm border border-white/10 rounded-lg p-3 text-center cursor-pointer hover:border-neon-cyan/30 transition-all duration-300"
                        >
                          <span className="text-gray-300 text-sm font-medium">{skill}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <div className="glass-card p-8 text-center">
            <Lightbulb className="w-12 h-12 text-neon-pink mx-auto mb-6 animate-pulse" />
            <h3 className="text-3xl font-orbitron font-bold gradient-text mb-6">
              Philosophy
            </h3>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              "Innovation distinguishes between a leader and a follower. I believe in creating 
              technology that doesn't just solve problems, but reimagines possibilities. 
              Every line of code is an opportunity to build something extraordinary."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;