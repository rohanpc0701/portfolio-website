// Mock data for Rohan's portfolio

export const portfolioData = {
  personalInfo: {
    name: "Rohan",
    title: "AI/ML Engineer & Full-Stack Developer",
    email: "rohanchavan0701@gmail.com",
    github: "https://github.com/RohanChavan0701",
    linkedin: "https://www.linkedin.com/in/rohanpraveenchavan",
    location: "Blacksburg, VA",
    bio: "AI/ML Engineer building production systems with LLMs, multi-agent orchestration, and full-stack development. Experienced in building and deploying intelligent systems from hackathon to production. Currently pursuing MS Computer Engineering at Virginia Tech."
  },

  education: [
    {
      id: 1,
      degree: "M.S. Computer Engineering",
      institution: "Virginia Polytechnic Institute and State University",
      location: "Blacksburg, VA, USA",
      period: "Aug 2024 – May 2026",
      gpa: "3.71/4.0",
      type: "masters"
    },
    {
      id: 2,
      degree: "B.Tech Information Technology", 
      institution: "K.J. Somaiya College of Engineering",
      location: "Mumbai, India",
      period: "Jan 2020 – Dec 2024",
      gpa: "3.5/4.0",
      type: "bachelors"
    }
  ],

  projects: [
    {
      id: 1,
      title: "LunaFlow — Cycle-Aware Planning Platform",
      description: "Context-aware planning system with 4 integrated views (calendar, Kanban board, brainstorm, vision board). Built in 24 hours with bidirectional Google Calendar/Tasks sync. Multi-service architecture with React, Node.js, and Python/FastAPI AI service.",
      longDescription: "Context-aware planning system with 4 integrated views (calendar, Kanban board, brainstorm, vision board). Built and deployed in 24 hours at HackViolet 2026 with bidirectional Google Calendar/Tasks sync. Multi-service architecture with React frontend, Node.js backend, and Python/FastAPI AI service. Features voice-to-text input with ElevenLabs and AI task extraction with Google Gemini.",
      tech: ["React", "Node.js", "Python/FastAPI", "Docker", "Google Gemini", "ElevenLabs", "OAuth 2.0"],
      category: "Full-Stack",
      featured: true,
      github: "https://github.com/RohanChavan0701/period_cycle_planner",
      demo: "https://lunaflow.work",
      video: "https://youtu.be/91-5FK8gVN8",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop",
      status: "completed",
      highlights: [
        "Built and deployed in 24 hours at HackViolet 2026",
        "4 integrated planning views (calendar, Kanban, brainstorm, vision board)",
        "Bidirectional Google Calendar/Tasks sync via OAuth 2.0",
        "Voice-to-text input with ElevenLabs",
        "AI task extraction with Google Gemini",
        "Production deployment with CI/CD"
      ]
    },
    {
      id: 2,
      title: "CareRoute — Multi-Agent Medical Tourism Orchestrator",
      description: "Multi-agent orchestration system coordinating 6 specialized agents (flight monitoring, voice calls, notifications, hotel, hospital, accessibility) via JSON-RPC 2.0 protocol. Built in 36 hours at Codefest 2025.",
      longDescription: "Multi-agent orchestration system coordinating 6 specialized agents (flight monitoring, voice calls, notifications, hotel, hospital, accessibility) via JSON-RPC 2.0 protocol. Built in 36 hours at Codefest 2025 (Marriott). Won 4th Place + Honorable Mention. Features HIPAA-compliant audit logging, automated workflow triggering, and retry logic with exponential backoff. Deployed on AWS EC2 with PostgreSQL.",
      tech: ["FastAPI", "PostgreSQL", "A2A SDK", "Docker", "AWS EC2", "Flutter", "APScheduler"],
      category: "AI/ML",
      featured: true,
      github: "https://github.com/RohanChavan0701/CareRoute",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop",
      status: "completed",
      highlights: [
        "4th Place + Honorable Mention at Codefest 2025",
        "6 specialized agents with JSON-RPC 2.0 communication",
        "Successfully processed 12 end-to-end test bookings",
        "HIPAA-compliant audit logging",
        "Deployed on AWS EC2 with PostgreSQL",
        "Automated workflow triggering and retry logic"
      ]
    }
  ],

  skills: {
    languages: [
      { name: "Python", level: 95, category: "programming" },
      { name: "TypeScript", level: 88, category: "programming" },
      { name: "SQL", level: 85, category: "database" },
      { name: "C++", level: 80, category: "programming" }
    ],
    frameworks: [
      { name: "FastAPI", level: 90, category: "backend" },
      { name: "Node.js", level: 85, category: "backend" },
      { name: "React", level: 88, category: "frontend" },
      { name: "REST APIs", level: 90, category: "backend" },
      { name: "Microservices", level: 85, category: "backend" }
    ],
    tools: [
      { name: "AWS (EC2, Lambda, S3)", level: 85, category: "cloud" },
      { name: "Docker", level: 85, category: "devops" },
      { name: "PostgreSQL", level: 85, category: "database" },
      { name: "Redis", level: 80, category: "database" },
      { name: "Cursor", level: 90, category: "development" },
      { name: "GitHub Actions", level: 85, category: "devops" },
      { name: "Pytest", level: 85, category: "testing" }
    ],
    aiMl: [
      { name: "PyTorch", level: 90, category: "core" },
      { name: "OpenAI/Claude APIs", level: 95, category: "specialized" },
      { name: "RAG Pipelines", level: 88, category: "specialized" },
      { name: "Prompt Engineering", level: 95, category: "specialized" },
      { name: "LangChain", level: 85, category: "specialized" },
      { name: "Multi-Agent Systems", level: 88, category: "specialized" }
    ]
  },

  testimonials: [],

  achievements: [
    {
      id: 1,
      title: "Amazon Nova Trusted AI Competition — 1st Place (Tournament 2)",
      description: "Won 1st place in Tournament 2 of the Amazon Nova Trusted AI Competition, achieving a 46% jailbreak reduction in LLM safety evaluation",
      year: "2025",
      category: "competition"
    },
    {
      id: 2,
      title: "Amazon Nova Trusted AI Competition — 2nd Place (Tournament 1)",
      description: "Won 2nd place in Tournament 1 of the Amazon Nova Trusted AI Competition with advanced red teaming techniques",
      year: "2025",
      category: "competition"
    },
    {
      id: 3,
      title: "Codefest 2025 (Marriott) — 4th Place + Honorable Mention",
      description: "Built CareRoute, a multi-agent medical tourism orchestrator, in 36 hours. Coordinated 6 specialized agents via JSON-RPC 2.0",
      year: "2025",
      category: "competition"
    },
    {
      id: 4,
      title: "HackViolet 2026 — LunaFlow",
      description: "Built and deployed LunaFlow, a cycle-aware planning platform with 4 integrated views, in 24 hours",
      year: "2026",
      category: "competition"
    }
  ]
};

export default portfolioData;