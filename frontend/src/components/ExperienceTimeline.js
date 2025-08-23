import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, ExternalLink, Briefcase, ChevronDown } from 'lucide-react';
import experienceJson from '../data/experience.json';

const getColorClasses = (color) => {
  const colorMap = {
    blue: {
      bg: "from-blue-900/20 to-blue-800/10",
      border: "border-blue-800/30 hover:border-blue-600/50",
      iconBg: "bg-blue-500/20",
      iconText: "text-blue-400",
      companyText: "text-blue-400",
      tagBg: "bg-blue-500/20",
      tagText: "text-blue-300"
    },
    purple: {
      bg: "from-purple-900/20 to-purple-800/10", 
      border: "border-purple-800/30 hover:border-purple-600/50",
      iconBg: "bg-purple-500/20",
      iconText: "text-purple-400",
      companyText: "text-purple-400",
      tagBg: "bg-purple-500/20",
      tagText: "text-purple-300"
    },
    cyan: {
      bg: "from-cyan-900/20 to-cyan-800/10",
      border: "border-cyan-800/30 hover:border-cyan-600/50", 
      iconBg: "bg-cyan-500/20",
      iconText: "text-cyan-400",
      companyText: "text-cyan-400",
      tagBg: "bg-cyan-500/20",
      tagText: "text-cyan-300"
    }
  };
  return colorMap[color] || colorMap.blue;
};

const ViewToggle = () => {
  const [mode, setMode] = useState(() => (window.innerWidth < 768 ? 'cards' : 'timeline'));
  useEffect(() => {
    const handler = () => setMode(window.innerWidth < 768 ? 'cards' : 'timeline');
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return (
    <div className="inline-flex items-center gap-2 text-gray-300">
      <button
        onClick={() => setMode('timeline')}
        className={`px-3 py-1 rounded-full border ${mode === 'timeline' ? 'border-blue-500 text-white' : 'border-gray-700 hover:border-gray-600'}`}
        aria-pressed={mode === 'timeline'}
      >Timeline</button>
      <button
        onClick={() => setMode('cards')}
        className={`px-3 py-1 rounded-full border ${mode === 'cards' ? 'border-blue-500 text-white' : 'border-gray-700 hover:border-gray-600'}`}
        aria-pressed={mode === 'cards'}
      >Cards</button>
    </div>
  );
};

// IntersectionObserver reveal utility
if (typeof window !== 'undefined') {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('opacity-100', 'translate-y-0');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    requestAnimationFrame(() => {
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        el.classList.add('opacity-0', 'translate-y-4', 'transition-all', 'duration-500');
        io.observe(el);
      });
    });
  }
}

const ExperienceTimeline = () => {
  const [experiences, setExperiences] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    setExperiences(experienceJson.roles || []);
  }, []);

  const toggleExpand = (id) => setExpandedId((prev) => (prev === id ? null : id));

  return (
    <section id="experience" className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Professional <span className="text-blue-400">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Building cutting-edge AI systems and driving innovation across industry and research
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex justify-end mb-6">
          <ViewToggle />
        </div>

        <div className="relative">
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-800/40 via-gray-800 to-transparent"></div>

          <div className="space-y-8">
            {experiences.map((exp, idx) => {
              const colors = getColorClasses(exp.color);
              return (
                <div
                  key={`${exp.company}-${idx}`}
                  className={`relative pl-14 sm:pl-20 p-6 sm:p-8 bg-gradient-to-br ${colors.bg} rounded-xl border ${colors.border} transition-all duration-300 reveal-on-scroll`}
                  data-index={idx}
                >
                  <div className={`absolute left-3 sm:left-5 top-6 w-3 h-3 rounded-full ${colors.iconBg} ring-2 ring-gray-900`}></div>

                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-2">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 ${colors.iconBg} rounded-full flex-shrink-0`}>
                        <Briefcase className={`w-6 h-6 ${colors.iconText}`} />
                      </div>
                      <div>
                        <h3 className="text-xl lg:text-2xl font-semibold text-white mb-1">{exp.title}</h3>
                        <p className={`text-lg font-medium ${colors.companyText}`}>{exp.company}</p>
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-400">
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{exp.dates}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{exp.location}</span>
                          </span>
                          <span className={`px-3 py-1 ${colors.tagBg} ${colors.tagText} rounded-full text-xs font-medium`}>
                            Professional
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleExpand(exp.id || `${exp.company}-${idx}`)}
                      className="self-start inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                      aria-expanded={expandedId === (exp.id || `${exp.company}-${idx}`)}
                      aria-controls={`exp-${idx}`}
                    >
                      <span>{expandedId === (exp.id || `${exp.company}-${idx}`) ? 'Hide details' : 'View details'}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${expandedId === (exp.id || `${exp.company}-${idx}`) ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  {exp.summary && (
                    <p className="text-gray-300 mb-2">{exp.summary}</p>
                  )}

                  {expandedId === (exp.id || `${exp.company}-${idx}`) && (
                    <div id={`exp-${idx}`} className="overflow-hidden animate-fade-in">
                        <div className="mb-6">
                          <h4 className="text-white font-semibold mb-3">Key Achievements</h4>
                          <ul className="space-y-3">
                            {(exp.bullets || []).map((achievement, index) => (
                              <li key={index} className="flex items-start space-x-3 text-gray-300">
                                <span className={`w-2 h-2 ${colors.iconBg} rounded-full mt-2 flex-shrink-0`}></span>
                                <span className="leading-relaxed">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-white font-semibold mb-3">Technologies & Tools</h4>
                          <div className="flex flex-wrap gap-2">
                            {(exp.stack || []).map((tech, index) => (
                              <span
                                key={index}
                                className={`px-3 py-1 ${colors.tagBg} ${colors.tagText} rounded-full text-sm font-medium`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-full hover:from-blue-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
          >
            <span>Let's Work Together</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;


