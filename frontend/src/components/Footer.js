import React from 'react';
import { Heart, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/RohanChavan0701',
      icon: Github,
      color: 'hover:text-gray-300'
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/rohan-chavan-708532200/',
      icon: Linkedin,
      color: 'hover:text-blue-400'
    },
    {
      name: 'Email',
        href: 'mailto:rohanchavan0701@gmail.com',
      icon: Mail,
      color: 'hover:text-green-400'
    }
  ];

  const handleLinkClick = (href) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative bg-black border-t border-gray-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Rohan</h3>
              <p className="text-blue-400 font-medium mb-4">AI/ML Engineer & Full-Stack Developer</p>
              <p className="text-gray-400 leading-relaxed max-w-md">
                Passionate about building innovative AI solutions and full-stack applications 
                that solve real-world problems. Currently pursuing MS in Computer Engineering 
                at Virginia Tech.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-white/5 rounded-full border border-gray-800 hover:border-gray-600 text-gray-400 ${social.color} transition-all duration-300 hover:transform hover:scale-110`}
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Contact</h4>
            <div className="space-y-3 text-gray-400">
              <div>
                <p className="text-sm">Email</p>
                <a 
                  href="mailto:rohanchavan0701@gmail.com" 
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  rohanchavan0701@gmail.com 
                </a>
              </div>
              <div>
                <p className="text-sm">Location</p>
                <p className="text-gray-300">Blacksburg, VA, USA</p>
              </div>
              <div>
                <p className="text-sm">Status</p>
                <p className="text-green-400">Available for opportunities</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 text-gray-400 mb-4 sm:mb-0">
            <span>&copy; {currentYear} Rohan. Made with</span>
            <Heart className="w-4 h-4 text-red-400 fill-current" />
            <span>and lots of ☕</span>
          </div>
          
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-all duration-300 hover:transform hover:scale-105"
          >
            <ArrowUp className="w-4 h-4" />
            <span className="text-sm">Back to top</span>
          </button>
        </div>

        {/* Tech Stack Credit */}
        <div className="py-4 border-t border-gray-900 text-center">
          <p className="text-xs text-gray-500">
            Built with React.js, Tailwind CSS, and deployed with modern web technologies
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl"></div>
    </footer>
  );
};

export default Footer;