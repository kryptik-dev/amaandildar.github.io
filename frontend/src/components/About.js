import React, { useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { HiAcademicCap, HiCode, HiLightningBolt, HiSparkles, HiBrain, HiCog } from 'react-icons/hi';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

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

  const skills = [
    { name: 'Frontend Development', level: 90, color: 'accent-green' },
    { name: 'React/Next.js', level: 85, color: 'accent-blue' },
    { name: 'JavaScript/TypeScript', level: 85, color: 'accent-green' },
    { name: 'UI/UX Design', level: 80, color: 'accent-blue' },
    { name: 'Software Development', level: 85, color: 'accent-green' },
    { name: 'AI/ML Research', level: 75, color: 'accent-blue' }
  ];

  const achievements = [
    {
      icon: HiAcademicCap,
      title: 'Student at Wingen Heights',
      description: 'Currently studying while building cutting-edge projects',
      color: 'accent-green'
    },
    {
      icon: HiBrain,
      title: 'AI Research Pioneer',
      description: 'Pioneering research in AI systems and automation',
      color: 'accent-blue'
    },
    {
      icon: HiCode,
      title: 'Full-Stack Developer',
      description: 'Creating end-to-end digital solutions',
      color: 'accent-green'
    },
    {
      icon: HiLightningBolt,
      title: 'Innovation Leader',
      description: 'Leading next-generation development practices',
      color: 'accent-blue'
    }
  ];

  return (
    <section id="about" ref={ref} className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 opacity-10">
          <div className="w-full h-full bg-accent-green rounded-full animate-pulse-glow" style={{ filter: 'blur(60px)' }} />
        </div>
        <div className="absolute bottom-20 right-10 w-96 h-96 opacity-10">
          <div className="w-full h-full bg-accent-blue rounded-full animate-pulse-glow" style={{ filter: 'blur(80px)' }} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 glass-morphism px-6 py-3 rounded-full mb-6">
              <HiSparkles className="text-accent-green" />
              <span className="font-jetbrains text-accent-green tracking-wider text-sm">ABOUT ME</span>
            </div>
            <h2 className="text-display-2 font-space-grotesk font-bold mb-6">
              <span className="text-white">Crafting the </span>
              <span className="gradient-text-green">Future</span>
              <span className="text-white"> of </span>
              <span className="metallic-text">Technology</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              I'm a self-taught software developer and frontend engineer currently studying at Wingen Heights Secondary School. 
              My journey in tech started with curiosity and has evolved into a deep passion for creating revolutionary digital experiences.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Story */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="glass-morphism-strong rounded-2xl p-8">
                <h3 className="text-2xl font-space-grotesk font-bold gradient-text-green mb-6">
                  My Journey
                </h3>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    My passion for technology ignited with a simple question: "How can we make digital experiences 
                    more human?" This curiosity led me down a path of continuous learning and innovation.
                  </p>
                  <p>
                    Currently working on groundbreaking projects including AI systems, community platforms, 
                    and pushing the boundaries of what's possible in web and app development. My work spans 
                    from frontend engineering to AI research, always with a focus on creating meaningful impact.
                  </p>
                  <p>
                    When I'm not coding, you'll find me researching emerging technologies, contributing to 
                    open-source projects, or mentoring other young developers in my community.
                  </p>
                </div>
              </div>

              {/* Achievements Grid */}
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="glass-morphism rounded-xl p-6 text-center group cursor-pointer"
                  >
                    <achievement.icon 
                      className={`text-3xl text-${achievement.color} mx-auto mb-3 group-hover:scale-110 transition-transform`} 
                    />
                    <h4 className="font-semibold text-white mb-2">{achievement.title}</h4>
                    <p className="text-sm text-gray-400">{achievement.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Column - Skills */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="glass-morphism-strong rounded-2xl p-8">
                <h3 className="text-2xl font-space-grotesk font-bold gradient-text-blue mb-8">
                  Skills & Expertise
                </h3>
                <div className="space-y-6">
                  {skills.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-white">{skill.name}</span>
                        <span className={`text-${skill.color} font-jetbrains text-sm`}>{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-${skill.color} rounded-full relative`}
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 1.5, delay: index * 0.1 }}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-20 animate-pulse`} />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Current Focus */}
              <div className="glass-morphism-strong rounded-2xl p-8">
                <h3 className="text-2xl font-space-grotesk font-bold metallic-text mb-6">
                  Current Focus
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      icon: HiBrain,
                      text: 'Developing AI-powered applications and research',
                      color: 'accent-green'
                    },
                    {
                      icon: HiCode,
                      text: 'Building next-generation web experiences',
                      color: 'accent-blue'
                    },
                    {
                      icon: HiCog,
                      text: 'Researching automation and system optimization',
                      color: 'accent-green'
                    },
                    {
                      icon: HiSparkles,
                      text: 'Contributing to open-source communities',
                      color: 'accent-blue'
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 10 }}
                      className="flex items-center space-x-4 p-4 rounded-lg hover:bg-glass-light transition-colors cursor-pointer"
                    >
                      <item.icon className={`text-2xl text-${item.color} flex-shrink-0`} />
                      <span className="text-gray-300">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-20"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.getElementById('projects');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary text-lg px-8 py-4"
            >
              View My Work →
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;