import React from 'react';
import { Trophy, Award, Medal } from 'lucide-react';

const achievements = [
  {
    title: 'Amazon Nova Trusted AI Challenge',
    detail: '1st place (Tournament 2) and 2nd place (Tournament 1)',
    year: '2025',
    icon: Trophy,
    color: 'text-yellow-400',
    border: 'border-yellow-800/30 hover:border-yellow-600/50',
    bg: 'from-yellow-900/20 to-yellow-800/10'
  },
  {
    title: 'Codefest 2025 (Marriott)',
    detail: '4th Place + Honorable Mention — CareRoute',
    year: '2025',
    icon: Award,
    color: 'text-blue-400',
    border: 'border-blue-800/30 hover:border-blue-600/50',
    bg: 'from-blue-900/20 to-blue-800/10'
  },
  {
    title: 'HackViolet 2026',
    detail: 'Participant — LunaFlow',
    year: '2026',
    icon: Medal,
    color: 'text-purple-400',
    border: 'border-purple-800/30 hover:border-purple-600/50',
    bg: 'from-purple-900/20 to-purple-800/10'
  }
];

const Achievements = () => {
  return (
    <section id="achievements" className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Achievements <span className="text-yellow-400">&amp; Awards</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((a, i) => {
            const Icon = a.icon;
            return (
              <div
                key={i}
                className={`p-6 bg-gradient-to-br ${a.bg} rounded-xl border ${a.border} transition-all duration-300`}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-2 rounded-full bg-white/5`}>
                    <Icon className={`w-6 h-6 ${a.color}`} />
                  </div>
                  <span className="text-sm text-gray-400">{a.year}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{a.title}</h3>
                <p className={`text-sm font-medium ${a.color}`}>{a.detail}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
