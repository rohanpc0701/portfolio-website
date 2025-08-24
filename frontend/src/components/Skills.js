import React, { useState, useEffect } from 'react';
import { Code, Database, Cloud, Brain, Wrench, Globe } from 'lucide-react';
import { portfolioAPI } from '../services/api';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('aiMl');
  const [animatedSkills, setAnimatedSkills] = useState(new Set());
  // Show immediately with sensible defaults; update in background when API succeeds
  const defaultSkills = {
    languages: [
      { name: "Python", level: 95, category: "programming" },
      { name: "JavaScript", level: 90, category: "programming" },
      { name: "Java", level: 85, category: "programming" },
      { name: "SQL", level: 80, category: "database" },
      { name: "HTML/CSS", level: 85, category: "web" },
      { name: "Node.js", level: 80, category: "backend" }
    ],
    frameworks: [
      { name: "React.js", level: 90, category: "frontend" },
      { name: "Django", level: 85, category: "backend" },
      { name: "FastAPI", level: 80, category: "backend" },
      { name: "PyTorch", level: 90, category: "ai-ml" },
      { name: "TensorFlow", level: 85, category: "ai-ml" },
      { name: "LangChain", level: 85, category: "ai-ml" },
      { name: "OpenCV", level: 80, category: "cv" },
      { name: "HuggingFace", level: 85, category: "ai-ml" }
    ],
    tools: [
      { name: "Git/GitHub", level: 95, category: "development" },
      { name: "Docker", level: 80, category: "devops" },
      { name: "Kubernetes", level: 75, category: "devops" },
      { name: "AWS", level: 85, category: "cloud" },
      { name: "GCP", level: 80, category: "cloud" },
      { name: "Terraform", level: 70, category: "devops" },
      { name: "MongoDB", level: 80, category: "database" },
      { name: "PostgreSQL", level: 85, category: "database" }
    ],
    aiMl: [
      { name: "Machine Learning", level: 90, category: "core" },
      { name: "Deep Learning", level: 85, category: "core" },
      { name: "Natural Language Processing", level: 90, category: "domain" },
      { name: "Computer Vision", level: 85, category: "domain" },
      { name: "Large Language Models", level: 95, category: "specialized" },
      { name: "Reinforcement Learning", level: 75, category: "specialized" },
      { name: "MLOps", level: 80, category: "engineering" },
      { name: "Model Evaluation", level: 85, category: "engineering" }
    ]
  };
  const [skillsData, setSkillsData] = useState(defaultSkills);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await portfolioAPI.getSkills();
        // Ensure structure is complete; fallback to defaults if missing or empty
        const safe = {
          languages: Array.isArray(data?.languages) && data.languages.length > 0 ? data.languages : defaultSkills.languages,
          frameworks: Array.isArray(data?.frameworks) && data.frameworks.length > 0 ? data.frameworks : defaultSkills.frameworks,
          tools: Array.isArray(data?.tools) && data.tools.length > 0 ? data.tools : defaultSkills.tools,
          aiMl: Array.isArray(data?.aiMl) && data.aiMl.length > 0 ? data.aiMl : defaultSkills.aiMl,
        };
        setSkillsData(safe);
      } catch (error) {
        console.error('Failed to fetch skills:', error);
        // Keep showing defaults on error
        setSkillsData(defaultSkills);
      }
    };

    fetchSkills();
  }, []);

  const skillCategories = {
    aiMl: {
      title: 'AI/ML & Data Science',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-900/20 to-pink-900/20',
      borderColor: 'border-purple-500/30',
      skills: skillsData?.aiMl || []
    },
    languages: {
      title: 'Programming Languages',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-900/20 to-cyan-900/20',
      borderColor: 'border-blue-500/30',
      skills: skillsData?.languages || []
    },
    frameworks: {
      title: 'Frameworks & Libraries',
      icon: Globe,
      color: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-900/20 to-emerald-900/20',
      borderColor: 'border-green-500/30',
      skills: skillsData?.frameworks || []
    },
    tools: {
      title: 'Tools & Technologies',
      icon: Wrench,
      color: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-900/20 to-red-900/20',
      borderColor: 'border-orange-500/30',
      skills: skillsData?.tools || []
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const skillNames = skillCategories[activeCategory].skills.map((skill, index) => `${activeCategory}-${index}`);
      setAnimatedSkills(new Set(skillNames));
    }, 100);

    return () => clearTimeout(timer);
  }, [activeCategory, skillsData]);

  const SkillBar = ({ skill, index, category }) => {
    const skillId = `${category}-${index}`;
    const isAnimated = animatedSkills.has(skillId);

    return (
      <div className="group hover:transform hover:scale-[1.02] transition-all duration-300">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white font-medium">{skill.name}</span>
          <span className="text-gray-400 text-sm">{skill.level}%</span>
        </div>
        <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${skillCategories[category].color} rounded-full transition-all duration-1000 ease-out ${
              isAnimated ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ 
              width: isAnimated ? `${skill.level}%` : '0%',
              transition: 'width 1s ease-out, opacity 0.3s ease-in-out'
            }}
          />
        </div>
      </div>
    );
  };

  // No blocking spinner; content renders immediately with defaults

  return (
    <section id="skills" className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Technical <span className="text-blue-400">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Comprehensive expertise across the AI/ML stack and modern software development technologies
          </p>
        </div>

        {/* Category Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {Object.entries(skillCategories).map(([key, category]) => {
            const Icon = category.icon;
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  activeCategory === key
                    ? `bg-gradient-to-br ${category.bgGradient} ${category.borderColor} border-opacity-50`
                    : 'bg-gray-900/50 border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className={`p-3 rounded-full ${
                    activeCategory === key 
                      ? `bg-gradient-to-r ${category.color}` 
                      : 'bg-gray-700'
                  }`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`text-sm font-medium text-center ${
                    activeCategory === key ? 'text-white' : 'text-gray-400'
                  }`}>
                    {category.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Skills Content */}
        <div className={`bg-gradient-to-br ${skillCategories[activeCategory].bgGradient} rounded-2xl border ${skillCategories[activeCategory].borderColor} p-8`}>
          <div className="flex items-center space-x-4 mb-8">
            <div className={`p-3 rounded-full bg-gradient-to-r ${skillCategories[activeCategory].color}`}>
              {React.createElement(skillCategories[activeCategory].icon, { className: "w-7 h-7 text-white" })}
            </div>
            <h3 className="text-2xl font-bold text-white">
              {skillCategories[activeCategory].title}
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {skillCategories[activeCategory].skills.map((skill, index) => (
              <SkillBar 
                key={`${activeCategory}-${skill.name}-${index}`}
                skill={skill} 
                index={index} 
                category={activeCategory}
              />
            ))}
          </div>

          {/* Skill Categories Summary */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-white mb-1">
                  {skillCategories[activeCategory].skills.length}
                </div>
                <div className="text-gray-400 text-sm">Technologies</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">
                  {Math.round(skillCategories[activeCategory].skills.reduce((acc, skill) => acc + skill.level, 0) / skillCategories[activeCategory].skills.length) || 0}%
                </div>
                <div className="text-gray-400 text-sm">Avg. Proficiency</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">
                  {skillCategories[activeCategory].skills.filter(skill => skill.level >= 90).length}
                </div>
                <div className="text-gray-400 text-sm">Expert Level</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">
                  {skillCategories[activeCategory].skills.filter(skill => skill.level >= 80).length}
                </div>
                <div className="text-gray-400 text-sm">Advanced+</div>
              </div>
            </div>
          </div>
        </div>

        {/* Overall Tech Stack Highlights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-br from-blue-900/20 to-blue-800/10 rounded-xl border border-blue-800/30">
            <div className="flex items-center space-x-3 mb-4">
              <Brain className="w-8 h-8 text-blue-400" />
              <h4 className="text-xl font-semibold text-white">AI/ML Specialization</h4>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Deep expertise in machine learning, natural language processing, and large language models 
              with hands-on experience in production deployments.
            </p>
          </div>

          <div className="p-6 bg-gradient-to-br from-purple-900/20 to-purple-800/10 rounded-xl border border-purple-800/30">
            <div className="flex items-center space-x-3 mb-4">
              <Code className="w-8 h-8 text-purple-400" />
              <h4 className="text-xl font-semibold text-white">Full-Stack Development</h4>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Comprehensive full-stack capabilities from React frontends to Python/Node.js backends, 
              with strong API design and database management skills.
            </p>
          </div>

          <div className="p-6 bg-gradient-to-br from-cyan-900/20 to-cyan-800/10 rounded-xl border border-cyan-800/30">
            <div className="flex items-center space-x-3 mb-4">
              <Cloud className="w-8 h-8 text-cyan-400" />
              <h4 className="text-xl font-semibold text-white">Cloud & DevOps</h4>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Proficient in cloud platforms (AWS, GCP, Azure) and modern DevOps practices 
              including containerization, CI/CD, and infrastructure as code.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;