import React, { useEffect, useState } from 'react';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';
import { portfolioAPI } from '../services/api';

const About = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: "Rohan Praveen Chavan",
    bio: "AI/ML Engineer building production systems with LLMs, multi-agent orchestration, and full-stack development. Experienced in building and deploying intelligent systems from hackathon to production. Currently pursuing MS Computer Engineering at Virginia Tech."
  });
  const [education, setEducation] = useState([
    {
      id: "1",
      degree: "M.S. Computer Engineering",
      institution: "Virginia Polytechnic Institute and State University",
      location: "Blacksburg, VA, USA",
      period: "Aug 2024 – May 2026",
      gpa: "3.71/4.0",
      type: "masters"
    },
    {
      id: "2",
      degree: "B.Tech Information Technology",
      institution: "K.J. Somaiya College of Engineering",
      location: "Mumbai, India",
      period: "Jan 2020 – Dec 2024",
      gpa: "3.5/4.0",
      type: "bachelors"
    }
  ]);
  const [loading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [personalData, educationData] = await Promise.all([
          portfolioAPI.getPersonalInfo(),
          portfolioAPI.getEducation()
        ]);
        setPersonalInfo(personalData);
        setEducation(educationData);
      } catch (error) {
        console.error('Failed to fetch about data:', error);
      }
    };

    fetchData();
  }, []);

  // No blocking spinner; content renders immediately and updates after fetch

  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            About <span className="text-blue-400">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              AI/ML Engineer building production systems with LLMs, multi-agent orchestration, and full-stack development.
              Experienced in building and deploying intelligent systems from hackathon to production.
              Currently pursuing MS Computer Engineering at Virginia Tech.
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              I've won competitions building real products under pressure — 1st and 2nd place in the Amazon Nova
              Trusted AI Competition, 4th place at Codefest 2025 with CareRoute, and built LunaFlow in 24 hours
              at HackViolet 2026. My internships at AutoUnify and Colgate-Palmolive focused on deploying AI systems
              that delivered measurable impact.
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              I specialize in multi-agent systems, LLM integration, and building full-stack applications
              that go from prototype to production quickly.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="p-4 bg-white/5 rounded-xl border border-gray-800">
                <h4 className="text-blue-400 font-semibold mb-2">Focus Areas</h4>
                <p className="text-gray-300 text-sm">LLMs, Multi-Agent Systems, Full-Stack, AI Safety</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-gray-800">
                <h4 className="text-purple-400 font-semibold mb-2">Interests</h4>
                <p className="text-gray-300 text-sm">Generative AI, Agent Orchestration, Production Systems</p>
              </div>
            </div>
          </div>

          {/* Right Column - Education & Location */}
          <div className="space-y-8">
            {/* Education Cards */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-white mb-6">Education</h3>
              
              {education.map((edu, index) => (
                <div 
                  key={edu.id}
                  className={`p-6 bg-gradient-to-br rounded-xl border transition-all duration-300 ${
                    edu.type === 'masters' 
                      ? 'from-blue-900/20 to-blue-800/10 border-blue-800/30 hover:border-blue-600/50'
                      : 'from-purple-900/20 to-purple-800/10 border-purple-800/30 hover:border-purple-600/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        edu.type === 'masters' ? 'bg-blue-500/20' : 'bg-purple-500/20'
                      }`}>
                        <GraduationCap className={`w-5 h-5 ${
                          edu.type === 'masters' ? 'text-blue-400' : 'text-purple-400'
                        }`} />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">{edu.degree}</h4>
                        <p className={`font-medium ${
                          edu.type === 'masters' ? 'text-blue-400' : 'text-purple-400'
                        }`}>
                          {edu.institution}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{edu.period}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{edu.location}</span>
                      </span>
                    </div>
                    <span className={`font-medium ${
                      edu.type === 'masters' ? 'text-blue-400' : 'text-purple-400'
                    }`}>
                      GPA: {edu.gpa}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Personal Touch */}
            <div className="p-6 bg-gradient-to-br from-cyan-900/20 to-cyan-800/10 rounded-xl border border-cyan-800/30">
              <h4 className="text-cyan-400 font-semibold mb-3">Beyond Code</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                I believe in continuous learning and staying at the forefront of AI innovation. 
                My goal is to contribute to the advancement of artificial intelligence while building 
                practical solutions that solve real-world problems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;