import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Send, User, MessageCircle, Check, AlertCircle, Github, Linkedin, Twitter, MapPin } from 'lucide-react';
import axios from 'axios';

const Contact = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState({
    type: '', // 'success', 'error', 'loading'
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        type: 'error',
        message: 'Please fill in all fields'
      });
      return;
    }

    setStatus({
      type: 'loading',
      message: 'Sending message...'
    });

    try {
      const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
      await axios.post(`${API_BASE_URL}/api/contact`, formData);
      
      setStatus({
        type: 'success',
        message: 'Message sent successfully! I\'ll get back to you soon.'
      });
      
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again or contact me directly.'
      });
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: process.env.REACT_APP_EMAIL || 'contact@kryptik.dev',
      href: `mailto:${process.env.REACT_APP_EMAIL || 'contact@kryptik.dev'}`,
      color: 'text-neon-cyan'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: '@kryptik-dev',
      href: process.env.REACT_APP_GITHUB || 'https://github.com/kryptik-dev',
      color: 'text-neon-purple'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Durban, South Africa',
      href: '#',
      color: 'text-neon-pink'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: process.env.REACT_APP_GITHUB || 'https://github.com/kryptik-dev',
      color: 'hover:text-neon-cyan'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: '#',
      color: 'hover:text-neon-purple'
    },
    {
      icon: Twitter,
      label: 'Twitter',
      href: '#',
      color: 'hover:text-neon-pink'
    }
  ];

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-orbitron font-bold gradient-text mb-6">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Ready to bring your ideas to life? Let's collaborate and create something extraordinary
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card p-8"
          >
            <div className="flex items-center mb-8">
              <MessageCircle className="w-8 h-8 text-neon-cyan mr-4" />
              <h3 className="text-3xl font-orbitron font-bold text-white">
                Send a Message
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 glass-effect rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 focus:border-neon-cyan/50 transition-all duration-300"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 glass-effect rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 focus:border-neon-cyan/50 transition-all duration-300"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Message
                </label>
                <div className="relative">
                  <MessageCircle className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 glass-effect rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 focus:border-neon-cyan/50 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project or ask any questions..."
                  />
                </div>
              </div>

              {/* Status Message */}
              {status.message && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg flex items-center space-x-3 ${
                    status.type === 'success' ? 'bg-green-400/10 border border-green-400/30' :
                    status.type === 'error' ? 'bg-red-400/10 border border-red-400/30' :
                    'bg-blue-400/10 border border-blue-400/30'
                  }`}
                >
                  {status.type === 'success' && <Check className="w-5 h-5 text-green-400" />}
                  {status.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400" />}
                  {status.type === 'loading' && <div className="loading-spinner w-5 h-5" />}
                  <span className={`text-sm ${
                    status.type === 'success' ? 'text-green-400' :
                    status.type === 'error' ? 'text-red-400' :
                    'text-blue-400'
                  }`}>
                    {status.message}
                  </span>
                </motion.div>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={status.type === 'loading'}
                className="w-full glow-button flex items-center justify-center space-x-3 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status.type === 'loading' ? (
                  <>
                    <div className="loading-spinner w-5 h-5" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div className="glass-card p-8">
              <h3 className="text-3xl font-orbitron font-bold text-white mb-8">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="flex items-center space-x-4 group"
                  >
                    <div className="p-3 rounded-full glass-effect group-hover:shadow-neon transition-all duration-300">
                      <info.icon className={`w-6 h-6 ${info.color}`} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 font-medium">
                        {info.label}
                      </div>
                      <a
                        href={info.href}
                        target={info.href.startsWith('mailto') ? '_self' : '_blank'}
                        rel="noopener noreferrer"
                        className="text-white hover:text-neon-cyan transition-colors duration-300"
                      >
                        {info.value}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <h4 className="text-lg font-semibold text-white mb-4">
                  Connect with me
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-3 rounded-full glass-effect text-gray-400 ${social.color} transition-all duration-300 hover:shadow-neon`}
                    >
                      <social.icon className="w-6 h-6" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Response */}
            <div className="glass-card p-8">
              <h3 className="text-2xl font-orbitron font-bold gradient-text mb-4">
                Quick Response
              </h3>
              <p className="text-gray-300 leading-relaxed">
                I typically respond to messages within 24 hours. For urgent inquiries, 
                feel free to reach out directly via email or connect with me on social media.
              </p>
              <div className="mt-6 flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">
                  Currently available for new projects
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;