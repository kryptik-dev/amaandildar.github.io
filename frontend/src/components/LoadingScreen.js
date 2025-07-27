import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = () => {
  const [loadingText, setLoadingText] = useState('INITIALIZING');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const texts = [
      'INITIALIZING',
      'LOADING ASSETS',
      'CONNECTING SYSTEMS',
      'PREPARING EXPERIENCE',
      'READY TO LAUNCH'
    ];

    let textIndex = 0;
    let progressValue = 0;

    const textInterval = setInterval(() => {
      if (textIndex < texts.length - 1) {
        textIndex++;
        setLoadingText(texts[textIndex]);
      }
    }, 400);

    const progressInterval = setInterval(() => {
      if (progressValue < 100) {
        progressValue += Math.random() * 15;
        if (progressValue > 100) progressValue = 100;
        setProgress(Math.floor(progressValue));
      }
    }, 100);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-primary"
      >
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-10" />
          <div 
            className="absolute top-1/4 left-1/4 w-96 h-96 opacity-20 animate-pulse-glow"
            style={{
              background: 'radial-gradient(circle, rgba(0, 255, 136, 0.3) 0%, transparent 70%)',
              filter: 'blur(60px)'
            }}
          />
        </div>

        {/* Main Loading Content */}
        <div className="relative z-10 text-center">
          {/* Logo/Brand */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-6xl md:text-8xl font-space-grotesk font-bold metallic-text mb-4">
              КЯУΡТΙК
            </h1>
            <p className="text-xl text-accent-green font-jetbrains tracking-wider">
              NEXT-GEN DEVELOPER
            </p>
          </motion.div>

          {/* Loading Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-8"
          >
            {/* Progress Bar */}
            <div className="w-80 h-1 bg-glass-light rounded-full mx-auto mb-6 overflow-hidden">
              <motion.div
                className="h-full bg-green-gradient"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Loading Text */}
            <motion.p
              key={loadingText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-sm font-jetbrains tracking-widest text-accent-green mb-2"
            >
              {loadingText}
            </motion.p>

            {/* Progress Percentage */}
            <p className="text-2xl font-bold text-white">{progress}%</p>
          </motion.div>

          {/* Spinning Elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -right-20 w-40 h-40 opacity-20"
          >
            <div className="w-full h-full border-2 border-accent-green rounded-lg" />
          </motion.div>

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-20 -left-20 w-32 h-32 opacity-20"
          >
            <div className="w-full h-full border-2 border-accent-blue rounded-full" />
          </motion.div>

          {/* Floating Particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-accent-green rounded-full opacity-40"
              animate={{
                y: [0, -100, 0],
                x: [0, Math.sin(i) * 50, 0],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                left: `${20 + i * 10}%`,
                top: `${60 + Math.sin(i) * 20}%`
              }}
            />
          ))}
        </div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-8 font-jetbrains text-xs text-accent-green"
        >
          <div>SYSTEM STATUS: ONLINE</div>
          <div>VERSION: 2.0.0</div>
          <div>BUILD: {new Date().getFullYear()}.{String(new Date().getMonth() + 1).padStart(2, '0')}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;