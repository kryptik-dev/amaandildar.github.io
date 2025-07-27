import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { HiArrowRight, HiCode, HiLightningBolt, HiSparkles } from 'react-icons/hi';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentWord, setCurrentWord] = useState('INNOVATIVE');
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true });
  const controls = useAnimation();

  const words = ['INNOVATIVE', 'CREATIVE', 'GROUNDBREAKING', 'REVOLUTIONARY'];

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord(prev => {
        const currentIndex = words.indexOf(prev);
        return words[(currentIndex + 1) % words.length];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Interactive Background Elements */}
      <div className="absolute inset-0">
        {/* Dynamic gradient that follows mouse */}
        <div 
          className="absolute w-96 h-96 opacity-30 transition-all duration-1000 ease-out pointer-events-none"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(0, 255, 136, 0.3) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
        />

        {/* Floating geometric shapes */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute opacity-10"
              animate={{
                y: [0, -30, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }}
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 30}%`,
                width: `${40 + i * 5}px`,
                height: `${40 + i * 5}px`
              }}
            >
              <div className={`w-full h-full ${i % 3 === 0 ? 'bg-accent-green rounded-lg' : i % 3 === 1 ? 'bg-accent-blue rounded-full' : 'bg-metal-light rounded-lg'}`} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="relative z-10 text-center max-w-6xl mx-auto px-6"
      >
        {/* Subtitle */}
        <motion.div
          variants={itemVariants}
          className="mb-6"
        >
          <div className="inline-flex items-center space-x-2 glass-morphism px-6 py-3 rounded-full">
            <HiSparkles className="text-accent-green text-xl" />
            <span className="font-jetbrains text-accent-green tracking-wider text-sm">
              NEXT-GEN DEVELOPER & AI INNOVATOR
            </span>
            <HiSparkles className="text-accent-green text-xl" />
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-display-1 font-space-grotesk font-black leading-none mb-4">
            <span className="block text-white">BUILDING</span>
            <motion.span
              key={currentWord}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="block gradient-text-green"
            >
              {currentWord}
            </motion.span>
            <span className="block text-white">DIGITAL</span>
            <span className="block metallic-text">EXPERIENCES</span>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed"
        >
          Student Software Developer crafting exceptional digital experiences that transform brands 
          and captivate audiences. I'm the strategic partner that brings your vision to life through 
          cutting-edge technology and innovative design.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(0, 255, 136, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('projects')}
            className="group relative overflow-hidden btn-primary text-lg px-8 py-4 flex items-center space-x-3"
          >
            <span>Start a Project</span>
            <HiArrowRight className="text-xl transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('about')}
            className="group btn-secondary text-lg px-8 py-4 flex items-center space-x-3"
          >
            <span>Learn More</span>
            <HiCode className="text-xl transition-transform group-hover:rotate-12" />
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
            { number: '15+', label: 'Projects Completed', icon: HiCode },
            { number: '3+', label: 'Years Experience', icon: HiLightningBolt },
            { number: '100%', label: 'Client Satisfaction', icon: HiSparkles }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.05 }}
              className="glass-morphism rounded-2xl p-6 text-center group cursor-pointer"
            >
              <stat.icon className="text-3xl text-accent-green mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-3xl font-bold gradient-text-green mb-2">{stat.number}</div>
              <div className="text-gray-300 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center space-y-2 cursor-pointer"
            onClick={() => scrollToSection('about')}
          >
            <span className="text-sm text-gray-400 font-jetbrains tracking-wider">SCROLL</span>
            <div className="w-6 h-10 border-2 border-accent-green rounded-full flex justify-center">
              <div className="w-1 h-3 bg-accent-green rounded-full mt-2 animate-pulse" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Side Elements */}
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col space-y-6"
        >
          <div className="w-1 h-20 bg-green-gradient" />
          <div className="transform -rotate-90 whitespace-nowrap">
            <span className="text-sm font-jetbrains tracking-[0.3em] text-accent-green">
              STUDENT DEVELOPER
            </span>
          </div>
        </motion.div>
      </div>

      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col space-y-6 items-end"
        >
          <div className="w-1 h-20 bg-blue-gradient" />
          <div className="transform rotate-90 whitespace-nowrap">
            <span className="text-sm font-jetbrains tracking-[0.3em] text-accent-blue">
              AI INNOVATOR
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;