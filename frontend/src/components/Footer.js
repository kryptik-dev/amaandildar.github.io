import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Code, Coffee, Github, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Research', href: '#research' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: process.env.REACT_APP_GITHUB || 'https://github.com/kryptik-dev',
      label: 'GitHub'
    },
    {
      icon: Mail,
      href: `mailto:${process.env.REACT_APP_EMAIL || 'contact@kryptik.dev'}`,
      label: 'Email'
    }
  ];

  return (
    <footer className="relative bg-dark-900 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <h3 className="text-3xl font-orbitron font-bold gradient-text mb-4">
              кяуρтιк
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              Next-generation developer and AI innovator, crafting the future through code, 
              creativity, and cutting-edge technology. Always pushing boundaries and 
              exploring new possibilities.
            </p>
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-full glass-effect hover:shadow-neon transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-neon-cyan transition-colors duration-300" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector(link.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    whileHover={{ x: 5 }}
                    className="text-gray-400 hover:text-neon-cyan transition-colors duration-300 block py-1"
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Current Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">Current Status</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-400">Available for projects</span>
              </div>
              <div className="flex items-center space-x-3">
                <Code className="w-4 h-4 text-neon-cyan" />
                <span className="text-sm text-gray-400">Building the future</span>
              </div>
              <div className="flex items-center space-x-3">
                <Coffee className="w-4 h-4 text-neon-purple" />
                <span className="text-sm text-gray-400">Fueled by coffee</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center"
        >
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <span>© {currentYear} кяуρтιк. Made with</span>
            <Heart className="w-4 h-4 text-neon-pink animate-pulse" />
            <span>and</span>
            <Code className="w-4 h-4 text-neon-cyan" />
            <span>in Durban, South Africa</span>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="mt-4 md:mt-0 p-3 rounded-full glass-effect hover:shadow-neon transition-all duration-300 group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 text-gray-400 group-hover:text-neon-cyan transition-colors duration-300" />
          </motion.button>
        </motion.div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-neon-cyan rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </footer>
  );
};

export default Footer;