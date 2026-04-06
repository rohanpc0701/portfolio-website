import React from 'react';

const skillGroups = [
  {
    label: 'LLM & AI',
    colorClass: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    headerColor: 'text-blue-400',
    skills: ['LangChain', 'LangGraph', 'HuggingFace Transformers', 'OpenAI API', 'Anthropic API', 'AWS Bedrock'],
  },
  {
    label: 'Fine-tuning',
    colorClass: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    headerColor: 'text-purple-400',
    skills: ['SFT', 'DPO', 'RLHF', 'LoRA', 'QLoRA'],
  },
  {
    label: 'RAG & Agents',
    colorClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    headerColor: 'text-cyan-400',
    skills: ['RAG pipelines', 'pgvector', 'tool calling', 'agent orchestration', 'prompt engineering'],
  },
  {
    label: 'ML Frameworks',
    colorClass: 'bg-green-500/20 text-green-300 border-green-500/30',
    headerColor: 'text-green-400',
    skills: ['PyTorch', 'TensorFlow', 'scikit-learn'],
  },
  {
    label: 'Backend & Infra',
    colorClass: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    headerColor: 'text-orange-400',
    skills: ['FastAPI', 'Node.js', 'Docker', 'PostgreSQL', 'Redis', 'AWS (EC2, Lambda, S3)'],
  },
  {
    label: 'Languages',
    colorClass: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
    headerColor: 'text-pink-400',
    skills: ['Python', 'TypeScript', 'SQL', 'Java', 'C++'],
  },
];

const Skills = () => {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group) => (
            <div
              key={group.label}
              className="p-6 bg-white/5 rounded-xl border border-gray-800 hover:border-gray-700 transition-all duration-300"
            >
              <h3 className={`text-lg font-semibold mb-4 ${group.headerColor}`}>{group.label}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-3 py-1 rounded-full text-sm border ${group.colorClass}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
