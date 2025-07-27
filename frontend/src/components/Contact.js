import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiSparkles, HiMail, HiPhone, HiLocationMarker, HiPaperAirplane, HiCheck, HiX } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import axios from 'axios';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
      await axios.post(`${API_BASE_URL}/api/contact`, formData);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const contactInfo = [
    {
      icon: HiMail,
      label: 'Email',
      value: 'the360unity@gmail.com',
      href: 'mailto:the360unity@gmail.com',
      color: 'accent-green'
    },
    {
      icon: HiLocationMarker,
      label: 'Location',
      value: 'Durban, South Africa',
      color: 'accent-blue'
    }
  ];

  const socialLinks = [
    {
      icon: FaGithub,
      label: 'GitHub',
      href: 'https://github.com/lilpizzaro',
      color: 'accent-green'
    },
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/amaandildar',
      color: 'accent-blue'
    },
    {
      icon: FaTwitter,
      label: 'Twitter',
      href: 'https://twitter.com/amaandildar',
      color: 'accent-green'
    }
  ];

  return (
    <section id="contact" ref={ref} className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-80 h-80 opacity-10">
          <div className="w-full h-full bg-accent-green rounded-full animate-pulse-glow" style={{ filter: 'blur(80px)' }} />
        </div>
        <div className="absolute bottom-20 right-20 w-96 h-96 opacity-10">
          <div className="w-full h-full bg-accent-blue rounded-full animate-pulse-glow" style={{ filter: 'blur(100px)' }} />
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
              <span className="font-jetbrains text-accent-green tracking-wider text-sm">GET IN TOUCH</span>
            </div>
            <h2 className="text-display-2 font-space-grotesk font-bold mb-6">
              <span className="text-white">Let's Create </span>
              <span className="gradient-text-green">Something </span>
              <span className="metallic-text">Amazing</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Ready to bring your vision to life? I'm always excited to discuss new projects, 
              innovative ideas, and opportunities to create exceptional digital experiences together.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <div className="glass-morphism-strong rounded-2xl p-8">
                <h3 className="text-2xl font-space-grotesk font-bold gradient-text-green mb-8">
                  Send a Message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-glass-light border border-glass-medium rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-green transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-glass-light border border-glass-medium rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-green transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Project Details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-glass-light border border-glass-medium rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-green transition-colors resize-none"
                      placeholder="Tell me about your project, goals, and how I can help bring your vision to life..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-primary text-lg py-4 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <HiPaperAirplane />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center space-x-2 text-accent-green bg-accent-green/10 border border-accent-green/30 rounded-lg p-4"
                    >
                      <HiCheck size={20} />
                      <span>Message sent successfully! I'll get back to you soon.</span>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center space-x-2 text-red-400 bg-red-400/10 border border-red-400/30 rounded-lg p-4"
                    >
                      <HiX size={20} />
                      <span>Failed to send message. Please try again or contact me directly.</span>
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Contact Info */}
              <div className="glass-morphism-strong rounded-2xl p-8">
                <h3 className="text-2xl font-space-grotesk font-bold gradient-text-blue mb-8">
                  Get In Touch
                </h3>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 10 }}
                      className="flex items-center space-x-4 p-4 rounded-lg hover:bg-glass-light transition-colors cursor-pointer"
                    >
                      <div className={`p-3 bg-${item.color}/20 rounded-xl`}>
                        <item.icon className={`text-xl text-${item.color}`} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{item.label}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-white hover:text-accent-green transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-white">{item.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="glass-morphism-strong rounded-2xl p-8">
                <h3 className="text-2xl font-space-grotesk font-bold metallic-text mb-8">
                  Connect Online
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -5, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-6 glass-morphism rounded-xl text-center group hover:bg-${social.color}/10 transition-colors`}
                    >
                      <social.icon className={`text-3xl text-${social.color} mx-auto mb-3 group-hover:scale-110 transition-transform`} />
                      <p className="text-sm text-gray-300">{social.label}</p>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="glass-morphism-strong rounded-2xl p-8">
                <h3 className="text-2xl font-space-grotesk font-bold gradient-text-green mb-6">
                  Availability
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-accent-green rounded-full animate-pulse"></div>
                    <span className="text-white font-medium">Open for new projects</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    I'm currently accepting new clients and excited to work on innovative projects. 
                    Typical response time is within 24 hours.
                  </p>
                  <div className="pt-4 border-t border-glass-medium">
                    <p className="text-sm text-gray-400">
                      <strong>Best time to reach me:</strong> Monday - Friday, 9 AM - 6 PM (SAST)
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;