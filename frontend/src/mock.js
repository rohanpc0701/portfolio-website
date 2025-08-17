// Mock data for Rohan's portfolio

export const portfolioData = {
  personalInfo: {
    name: "Rohan",
    title: "AI/ML Engineer & Full-Stack Developer",
    email: "rohanchavan0701@gmail.com",
    github: "https://github.com/rohan",
    linkedin: "https://www.linkedin.com/in/rohan-chavan-708532200/",
    location: "Blacksburg, VA",
    bio: "MS Computer Engineering student at Virginia Tech specializing in AI/ML, with hands-on experience in building production-grade systems, LLM applications, and cutting-edge research in artificial intelligence."
  },

  education: [
    {
      id: 1,
      degree: "M.S. Computer Engineering",
      institution: "Virginia Polytechnic Institute and State University",
      location: "Blacksburg, VA, USA",
      period: "Aug 2024 – May 2026",
      gpa: "3.68/4.0",
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
      title: "SentiMint – AI Stock Analyzer",
      description: "LangChain-powered multi-agent system simulating investor personas that analyze Yahoo Finance indicators and debate stock recommendations using GPT-based reasoning.",
      longDescription: "Built a sophisticated LangChain-powered multi-agent system that simulates different investor personas ('bold' and 'cautious') to analyze Yahoo Finance indicators and debate stock recommendations. The system uses GPT-based reasoning modules and symbolic heuristics to weigh financial risks, enabling decision reconciliation via token-wise confidence scoring.",
      tech: ["LangChain", "GPT-3.5", "Selenium", "Next.js", "Flask", "Yahoo Finance API", "BeautifulSoup"],
      category: "AI/ML",
      featured: true,
      github: "https://github.com/rohan/sentimint",
      demo: "https://sentimint.demo.com",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop",
      status: "completed",
      highlights: [
        "Multi-agent system with persona-based decision making",
        "Real-time financial data analysis and processing", 
        "Advanced GPT-based reasoning and confidence scoring",
        "Framework adaptable to reinforcement learning environments"
      ]
    },
    {
      id: 2,
      title: "LLM Defender Bot",
      description: "Real-time AI safety system using GPT-4 and Claude for detecting and neutralizing adversarial prompts in Amazon Bedrock models.",
      longDescription: "Developed and deployed a real-time LLM Defender Bot as part of the Amazon Nova AI Challenge, achieving 56s average response latency for detecting and neutralizing adversarial prompts. The system implements advanced red teaming techniques and adversarial severity classification.",
      tech: ["Amazon Bedrock", "GPT-4", "Claude", "DeepSeek", "Python", "AI Safety", "Red Teaming"],
      category: "AI Safety",
      featured: true,
      github: "https://github.com/rohan/llm-defender",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
      status: "in-progress",
      highlights: [
        "56s average response latency for threat detection",
        "Advanced prompt-based attack taxonomy design",
        "Real-time adversarial prompt neutralization",
        "Contribution to LLM alignment and safety protocols"
      ]
    },
    {
      id: 3,
      title: "TypeSpec API Generator",
              description: "Production-grade TypeSpec models and evaluation pipeline using Google Cloud (Vertex AI + Gemini) for automated schema generation and validation.",
              longDescription: "Spearheaded the design of 25+ production-grade TypeSpec models for CDK Repair APIs at AutoUnify, reducing schema duplication by 40%. Built an evaluation pipeline on Google Cloud (Vertex AI + Gemini) for automated schema generation from unstructured input.",
      tech: ["TypeSpec", "Vertex AI", "Gemini", "OpenAPI", "Google Cloud", "REST APIs", "CI/CD"],
      category: "DevOps/API",
      featured: true,
      github: "https://github.com/rohan/typespec-generator",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
      status: "completed",
      highlights: [
        "40% reduction in schema duplication",
        "Automated TypeSpec schema generation",
        "Production-grade API type safety improvements",
        "Org-wide adoption of documentation workflow"
      ]
    },
    {
      id: 4,
      title: "NLP Chatbot Suite",
      description: "Three production NLP-enabled chatbots for process automation, reducing manual queries by 70% using ChatGPT API and custom intent recognition.",
      longDescription: "Designed and deployed three NLP-enabled chatbots at Colgate-Palmolive that automated FAQ handling for O2I and S2P processes. Integrated ChatGPT-based REST API with custom intent recognition using machine learning algorithms, achieving sub-10s response latency.",
      tech: ["Python", "NLP", "ChatGPT API", "BERT", "React.js", "PyTorch", "TensorFlow", "Logistic Regression"],
      category: "NLP",
      featured: false,
      github: "https://github.com/rohan/nlp-chatbots",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=400&fit=crop",
      status: "completed",
      highlights: [
        "70% reduction in manual query handling",
        "Sub-10s average response latency",
        "Full-stack chatbot development",
        "Custom intent recognition system"
      ]
    },
    {
      id: 5,
      title: "Computer Vision Pipeline",
      description: "Advanced computer vision system using CLIP, DINOv2, and Vision-Language-Action systems for robotics applications.",
      longDescription: "Built a comprehensive computer vision pipeline leveraging state-of-the-art models including CLIP and DINOv2 for robotics applications. The system incorporates Vision-Language-Action frameworks and simulation environments for real-world deployment.",
      tech: ["OpenCV", "CLIP", "DINOv2", "PyBullet", "OpenAI Gym", "Isaac Gym", "Python", "Computer Vision"],
      category: "Computer Vision",
      featured: false,
      github: "https://github.com/rohan/cv-pipeline",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
      status: "completed",
      highlights: [
        "State-of-the-art vision model integration",
        "Robotics simulation environment setup",
        "Vision-Language-Action system implementation",
        "Real-world deployment optimization"
      ]
    },
    {
      id: 6,
      title: "CANI – AI Blogging Platform",
      description: "Web platform to explore and share AI-related content with secure auth, category-based posts, admin dashboard, and modern UI/UX.",
      longDescription: "CANI is a full-stack blogging platform focused on AI content. It provides user authentication, category-wise browsing, and an admin dashboard for managing posts and categories. The UI is responsive and modern, using Owl Carousel for featured content, Font Awesome for icons, and AOS for smooth animations. The backend is powered by PHP and MySQL with session-based auth, and integrates OpenAI API for AI features.",
      tech: ["PHP", "MySQL", "HTML", "CSS", "JavaScript", "Owl Carousel", "Font Awesome", "AOS", "OpenAI API"],
      category: "AI/ML",
      featured: true,
      github: "https://github.com/RohanChavan0701/CANI-AI-Blogging-Website",
      image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=800&h=400&fit=crop",
      status: "completed",
      highlights: [
        "Secure login and registration",
        "Category-based blog posts and featured carousels",
        "Admin panel for content management",
        "Responsive UI with Owl Carousel and AOS animations",
        "OpenAI API integration for AI features"
      ]
    }
  ],

  skills: {
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
  },

  testimonials: [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      role: "Research Supervisor",
      company: "Virginia Tech",
      content: "Rohan's work on adversarial AI and LLM safety has been exceptional. His ability to combine theoretical understanding with practical implementation is remarkable.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b9c3?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Tech Lead",
      company: "AutoUnify",
      content: "Rohan's contributions to our TypeSpec API pipeline were game-changing. His attention to detail and system design skills significantly improved our development workflow.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Priya Sharma",
      role: "AI Engineering Manager",
      company: "Colgate-Palmolive",
      content: "The NLP chatbots Rohan developed transformed our customer service operations. His technical expertise and problem-solving approach are outstanding.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ],

  achievements: [
    {
      id: 1,
      title: "Amazon Nova AI Challenge Participant",
      description: "Leading red teaming initiatives for LLM safety evaluation",
      year: "2025",
      category: "competition"
    },
    {
      id: 2,
      title: "Production API Schema Optimization",
      description: "Reduced schema duplication by 40% in enterprise systems",
      year: "2025", 
      category: "achievement"
    },
    {
      id: 3,
      title: "NLP Automation Success",
      description: "Achieved 70% reduction in manual query handling",
      year: "2024",
      category: "achievement"
    }
  ]
};

export default portfolioData;