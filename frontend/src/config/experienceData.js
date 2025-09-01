// Editable experience data used by the Experience component.
// Update this file to change content, metrics, and tech without touching component logic.

export const experienceData = [
  {
    id: 'vt-maintainer',
    company: 'Virginia Tech, Division of IT',
    role: 'Software Maintainer',
    period: 'Dec 2024 – Feb 2025',
    location: 'Blacksburg, VA, USA',
    blurb: 'Modernized ML workflows on Summit platform with cloud-native tooling and CI/CD.',
    achievements: [
      'Modernized ML workflows on Summit platform (Docker, AWS Lambda/S3/ECS).',
      'Reduced build errors by 35%, sped up deployments with IaC pipelines.'
    ],
    metrics: [
      '35% fewer build errors',
      'Faster deployments via IaC'
    ],
    tech: ['Docker', 'AWS Lambda', 'Amazon S3', 'Amazon ECS', 'IaC'],
    color: 'blue',
    logo: null
  },
  {
    id: 'vt-wage-grader',
    company: 'Virginia Tech',
    role: 'Wage Grader',
    period: 'Oct 2024 – Present',
    location: 'Blacksburg, VA, USA',
    blurb: 'Supported course operations with robust evaluation and automation for grading.',
    achievements: [
      'Evaluated 50+ projects, automated grading workflows, improved efficiency 40%.'
    ],
    metrics: [
      '50+ projects graded',
      '40% efficiency improvement'
    ],
    tech: ['Python', 'Automation', 'CI/CD'],
    color: 'purple',
    logo: null
  },
  {
    id: 'colgate-ipa-intern',
    company: 'Colgate-Palmolive',
    role: 'Intelligent Process Automation Intern',
    period: 'Jan 2024 – Jun 2024',
    location: 'Remote',
    blurb: 'Built LLM-powered assistants to automate common support queries and workflows.',
    achievements: [
      'Built AI chatbots (Python, GPT, Kore.ai), automated ~70% of queries.',
      'Reduced latency 30s → 10s, improved adoption by 50%.'
    ],
    metrics: [
      '70% automation rate',
      '30s → 10s latency',
      '50% adoption lift'
    ],
    tech: ['Python', 'OpenAI/GPT', 'Kore.ai', 'Observability'],
    color: 'cyan',
    logo: null
  }
];

export default experienceData;


