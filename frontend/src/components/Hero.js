import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { portfolioAPI } from '../services/api';
import profileImg from '../PXL_20250111_214532171 (2)-min.jpg';

const Hero = () => {
  const [currentText, setCurrentText] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    name: 'Rohan',
    bio: 'MS Computer Engineering student at Virginia Tech specializing in AI/ML, with hands-on experience in building production-grade systems, LLM applications, and cutting-edge research in artificial intelligence.'
  });
  const [loading, setLoading] = useState(false);

  const dynamicTexts = [
    "Engineer · Innovator · AI Safety Advocate",
    "AI/ML Engineer",
    "Full-Stack Developer" 
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % dynamicTexts.length);
    }, 3000);

    // Fetch personal information (non-blocking; render immediately with fallback)
    const fetchPersonalInfo = async () => {
      try {
        const data = await portfolioAPI.getPersonalInfo();
        setPersonalInfo(data);
      } catch (error) {
        console.error('Failed to fetch personal info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalInfo();

    return () => clearInterval(interval);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400"></div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 lg:px-8 text-center pt-16 md:pt-24">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Hero grid: text left, image right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="lg:text-left">
              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 lg:mb-5 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent leading-snug tracking-tight">
                Hi, I'm <span className="text-blue-400">{personalInfo?.name || 'Rohan'}</span>
              </h1>

              {/* Dynamic Subtitle */}
              <div className="h-12 lg:h-16 flex items-center justify-center lg:justify-start mb-5 lg:mb-7">
                <h2 className="text-xl lg:text-3xl font-semibold text-gray-300">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-500">
                    {dynamicTexts[currentText]}
                  </span>
                </h2>
              </div>

              {/* Quick facts badges */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-4">
                {['3+ internships', 'AI/ML', 'Cloud-Native', 'LLM Safety'].map((b) => (
                  <span key={b} className="px-3 py-1 rounded-full text-sm bg-white/10 text-gray-300 border border-gray-700">
                    {b}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-base lg:text-lg text-gray-400 max-w-3xl mx-auto lg:mx-0 mb-7 lg:mb-10 leading-relaxed">
                {personalInfo?.bio || "MS Computer Engineering student at Virginia Tech specializing in AI/ML, with hands-on experience in building production-grade systems, LLM applications, and cutting-edge research in artificial intelligence."}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-10 lg:mb-12">
                <button 
                  onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-full 
                           hover:from-blue-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300 
                           shadow-lg hover:shadow-blue-500/25 min-w-[200px]"
                >
                  View My Work
                </button>
                <a 
                  href="/images/projects/Rohan_Chavan_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 border-2 border-gray-600 text-gray-300 font-medium rounded-full 
                           hover:border-blue-400 hover:text-blue-400 transform hover:scale-105 transition-all duration-300 
                           backdrop-blur-sm min-w-[200px] text-center whitespace-nowrap"
                >
                  Download Resume
                </a>
                <button 
                  onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 border-2 border-gray-600 text-gray-300 font-medium rounded-full 
                           hover:border-blue-400 hover:text-blue-400 transform hover:scale-105 transition-all duration-300 
                           backdrop-blur-sm min-w-[200px] text-center whitespace-nowrap"
                >
                  Contact Me
                </button>
              </div>
            </div>

            {/* Profile Image */}
            <div className="flex justify-center lg:justify-end">
              <img
                src={profileImg}
                alt="Headshot of Rohan Praveen Chavan, AI/ML Engineer"
                loading="eager"
                fetchpriority="high"
                decoding="async"
                width="288"
                height="288"
                className="w-40 h-40 md:w-72 md:h-72 rounded-full object-cover border border-white/10 shadow-xl ring-2 ring-blue-500/20"
              />
            </div>
          </div>

          {/* Experience Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300">
              <div className="text-3xl font-bold text-blue-400 mb-2">3+</div>
              <div className="text-gray-300">Years Experience</div>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-purple-500/50 transition-all duration-300">
              <div className="text-3xl font-bold text-purple-400 mb-2">5+</div>
              <div className="text-gray-300">AI/ML Projects</div>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-cyan-500/50 transition-all duration-300">
              <div className="text-3xl font-bold text-cyan-400 mb-2">2+</div>
              <div className="text-gray-300">Tech Internships</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button 
          onClick={scrollToAbout}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-white transition-colors duration-300 animate-bounce"
        >
          <ChevronDown size={32} />
        </button>
      </div>
    </section>
  );
};

export default Hero;