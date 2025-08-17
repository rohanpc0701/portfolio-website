import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="relative flex items-center justify-between h-16 lg:h-20">
          <div className="font-mono text-lg font-medium tracking-wider text-white">
            ROHAN.DEV
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-white hover:text-blue-400 transition-colors duration-200 font-medium"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('experience')}
              className="text-white hover:text-blue-400 transition-colors duration-200 font-medium"
            >
              Experience
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className="text-white hover:text-blue-400 transition-colors duration-200 font-medium"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('skills')}
              className="text-white hover:text-blue-400 transition-colors duration-200 font-medium"
            >
              Skills
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-white hover:text-blue-400 transition-colors duration-200 font-medium"
            >
              Contact
            </button>
            <a
              href="/Rohan_Resume_Latex.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-400 transition-colors duration-200 font-medium"
            >
              Resume
            </a>
          </nav>

          {/* Social Links */}
          <div className="hidden lg:flex items-center space-x-6 absolute right-6 top-1/2 -translate-y-1/2">
            <a
              href="https://github.com/RohanChavan0701"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-400 transition-colors duration-200"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/rohan-chavan-708532200/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-400 transition-colors duration-200"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:rohanchavan0701@gmail.com"
              className="text-white hover:text-blue-400 transition-colors duration-200"
            >
              <Mail size={20} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white hover:text-blue-400 transition-colors duration-200"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-md border-t border-gray-800">
            <nav className="flex flex-col space-y-4 py-6">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-white hover:text-blue-400 transition-colors duration-200 font-medium text-left px-4"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('experience')}
                className="text-white hover:text-blue-400 transition-colors duration-200 font-medium text-left px-4"
              >
                Experience
              </button>
              <button 
                onClick={() => scrollToSection('projects')}
                className="text-white hover:text-blue-400 transition-colors duration-200 font-medium text-left px-4"
              >
                Projects
              </button>
              <button 
                onClick={() => scrollToSection('skills')}
                className="text-white hover:text-blue-400 transition-colors duration-200 font-medium text-left px-4"
              >
                Skills
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-white hover:text-blue-400 transition-colors duration-200 font-medium text-left px-4"
              >
                Contact
              </button>
                <a 
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-400 transition-colors duration-200 font-medium text-left px-4"
                >
                  Resume
                </a>
              
                            {/* Mobile Social Links */}
              <div className="flex items-center space-x-6 px-4 pt-4 border-t border-gray-800">
                <a
                  href="https://github.com/RohanChavan0701"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-400 transition-colors duration-200"
                  aria-label="GitHub Profile"
                  title="View GitHub Profile"
                >
                  <Github size={20} aria-hidden="true" />
                </a>
                <a
                  href="https://www.linkedin.com/in/rohan-chavan-708532200/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-400 transition-colors duration-200"
                  aria-label="LinkedIn Profile"
                  title="View LinkedIn Profile"
                >
                  <Linkedin size={20} aria-hidden="true" />
                </a>
                <a
                  href="mailto:rohanchavan0701@gmail.com"
                  className="text-white hover:text-blue-400 transition-colors duration-200"
                  aria-label="Send Email"
                  title="Send Email to rohanchavan0701@gmail.com"
                >
                  <Mail size={20} aria-hidden="true" />
                </a>
              </div>
              
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;