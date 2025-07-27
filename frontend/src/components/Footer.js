import React from 'react';
import { motion } from 'framer-motion';
import { HiHeart, HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Research', href: '#research' },
    { name: 'Apps', href: '#apps' },
    { name: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    {
      icon: FaGithub,
      href: 'https://github.com/lilpizzaro',
      label: 'GitHub',
      color: 'hover:text-accent-green'
    },
    {
      icon: FaLinkedin,
      href: 'https://linkedin.com/in/amaandildar',
      label: 'LinkedIn',
      color: 'hover:text-accent-blue'
    },
    {
      icon: FaTwitter,
      href: 'https://twitter.com/amaandildar',
      label: 'Twitter',
      color: 'hover:text-accent-green'
    }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-green to-transparent" />
        <div className="absolute top-20 left-1/4 w-64 h-64 opacity-5">
          <div className="w-full h-full bg-accent-green rounded-full animate-pulse-glow" style={{ filter: 'blur(60px)' }} />
        </div>
        <div className="absolute top-40 right-1/4 w-80 h-80 opacity-5">
          <div className="w-full h-full bg-accent-blue rounded-full animate-pulse-glow" style={{ filter: 'blur(80px)' }} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-space-grotesk font-bold gradient-text-green mb-4">
                КЯУΡТΙК
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
                Student Software Developer and AI Innovator, crafting exceptional digital experiences 
                that transform brands and captivate audiences through cutting-edge technology.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <HiMail className="text-accent-green" />
                  <a href="mailto:the360unity@gmail.com" className="hover:text-accent-green transition-colors">
                    the360unity@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <HiLocationMarker className="text-accent-blue" />
                  <span>Durban, South Africa</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-space-grotesk font-bold text-white mb-6">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-300 hover:text-accent-green transition-colors duration-300 hover:translate-x-2 transform"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Services */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-space-grotesk font-bold text-white mb-6">
                Services
              </h4>
              <ul className="space-y-3 text-gray-300">
                <li>Web Development</li>
                <li>Mobile App Development</li>
                <li>AI/ML Solutions</li>
                <li>UI/UX Design</li>
                <li>Technical Consulting</li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="glass-morphism-strong rounded-2xl p-8 mb-16"
        >
          <div className="text-center">
            <h4 className="text-2xl font-space-grotesk font-bold gradient-text-blue mb-4">
              Stay Updated
            </h4>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Get the latest updates on my projects, research, and insights into the world of 
              software development and AI innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-glass-light border border-glass-medium rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-green transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary px-6 py-3 whitespace-nowrap"
              >
                Subscribe →
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-glass-medium"
        >
          {/* Copyright */}
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mb-6 md:mb-0">
            <p className="text-gray-400 text-sm flex items-center">
              © {currentYear} КЯУΡТΙК. Made with
              <HiHeart className="text-red-500 mx-2 animate-pulse" />
              in South Africa
            </p>
            <div className="flex items-center space-x-2">
              <img src="/images/za.png" alt="South Africa" className="w-5 h-5" />
              <span className="text-gray-400 text-sm">Proudly South African</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className={`text-gray-400 ${social.color} transition-colors duration-300`}
                aria-label={social.label}
              >
                <social.icon size={24} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Legal Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-8 pt-8 border-t border-glass-medium"
        >
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-gray-500">
            <button className="hover:text-accent-green transition-colors">
              Privacy Policy
            </button>
            <button className="hover:text-accent-green transition-colors">
              Terms of Service
            </button>
            <button className="hover:text-accent-green transition-colors">
              Cookie Policy
            </button>
          </div>
          <p className="text-xs text-gray-600 mt-4">
            All referenced sites, logos, and associated files are the property of their respective owners and organizations.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;