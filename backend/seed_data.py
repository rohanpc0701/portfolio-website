from models import *

# Seed data based on the mock.js content
PERSONAL_INFO = {
    "name": "Rohan",
    "title": "AI/ML Engineer & Full-Stack Developer",
    "email": "rohanchavan0701@gmail.com",
    "github": "https://github.com/RohanChavan0701",
    "linkedin": "https://www.linkedin.com/in/rohanpraveenchavan",
    "location": "Blacksburg, VA",
    "bio": "AI/ML Engineer building production systems with LLMs, multi-agent orchestration, and full-stack development. Experienced in building and deploying intelligent systems from hackathon to production. Currently pursuing MS Computer Engineering at Virginia Tech."
}

EDUCATION_DATA = [
    {
        "degree": "M.S. Computer Engineering",
        "institution": "Virginia Polytechnic Institute and State University",
        "location": "Blacksburg, VA, USA",
        "period": "Aug 2024 – May 2026",
        "gpa": "3.71/4.0",
        "type": "masters",
        "order": 1
    },
    {
        "degree": "B.Tech Information Technology",
        "institution": "K.J. Somaiya College of Engineering",
        "location": "Mumbai, India",
        "period": "Jan 2020 – Dec 2024",
        "gpa": "3.5/4.0",
        "type": "bachelors",
        "order": 2
    }
]

EXPERIENCE_DATA = [
    {
        "title": "Software Engineering Intern (AI/ML)",
        "company": "AutoUnify",
        "location": "Remote",
        "period": "May 2025 – Aug 2025",
        "type": "Internship",
        "color": "blue",
        "achievements": [
            "Built model scoring microservice for automated evaluation of AI-generated outputs",
            "Leveraged Cursor for AI-assisted development, accelerating feature delivery",
            "Achieved 25% reduction in manual corrections through automated quality checks",
            "Spearheaded the design of 25+ production-grade TypeSpec models for CDK Repair APIs, reducing schema duplication by 40%",
            "Engineered a model evaluation pipeline using Vertex AI + Gemini to auto-generate and validate TypeSpec schemas from unstructured input via REST APIs",
            "Implemented CI gates to lint/validate TypeSpec against canonical OpenAPI, cutting PR review time by 35%"
        ],
        "tech": ["TypeSpec", "Vertex AI", "Gemini", "OpenAPI", "Google Cloud", "Cursor", "REST APIs", "CI/CD"],
        "order": 1
    },
    {
        "title": "ML Research Team Member",
        "company": "Amazon Nova AI Challenge — Virginia Tech (Team HokieTokie)",
        "location": "Blacksburg, VA",
        "period": "Jan 2025 – Jun 2025",
        "type": "Research",
        "color": "cyan",
        "achievements": [
            "Won 1st Place (Tournament 2) and 2nd Place (Tournament 1) in the Amazon Nova Trusted AI Competition",
            "Achieved 46% jailbreak reduction through advanced red teaming and adversarial prompt techniques",
            "Developed and deployed a real-time LLM Defender Bot using GPT-4 and Claude for detecting and neutralizing adversarial prompts",
            "Built an evaluation harness executing 5k+ adversarial prompts nightly; improved attack detection F1 by 11%",
            "Co-authored an internal whitepaper and presented results to a cross-lab forum"
        ],
        "tech": ["Amazon Bedrock", "Red Teaming", "Prompt Engineering", "Claude", "GPT-4", "DeepSeek", "LLM Alignment", "AI Safety"],
        "order": 2
    },
    {
        "title": "Intelligent Process Automation Intern",
        "company": "Colgate-Palmolive GBS",
        "location": "Mumbai, India",
        "period": "Jan 2024 – Jun 2024",
        "type": "Internship",
        "color": "purple",
        "achievements": [
            "Designed and deployed 3 production NLP-enabled chatbots that automated FAQ handling for O2I and S2P processes",
            "Achieved 70% automation of manual queries with custom intent recognition",
            "Saved 200+ hours/month in manual processing time across departments",
            "Integrated a ChatGPT-based REST API with custom intent recognition using Logistic Regression and Decision Trees, lowering average latency to <10s",
            "Led full-stack development of a React.js chatbot integrated with BERT, PyTorch, and TensorFlow"
        ],
        "tech": ["Python", "NLP", "ChatGPT API", "BERT", "React.js", "PyTorch", "TensorFlow", "GitHub Actions"],
        "order": 3
    }
]

PROJECTS_DATA = [
    {
        "title": "LunaFlow — Cycle-Aware Planning Platform",
        "description": "Context-aware planning system with 4 integrated views (calendar, Kanban board, brainstorm, vision board). Built in 24 hours with bidirectional Google Calendar/Tasks sync.",
        "long_description": "Context-aware planning system with 4 integrated views (calendar, Kanban board, brainstorm, vision board). Built and deployed in 24 hours at HackViolet 2026 with bidirectional Google Calendar/Tasks sync. Multi-service architecture with React frontend, Node.js backend, and Python/FastAPI AI service. Features voice-to-text input with ElevenLabs and AI task extraction with Google Gemini.",
        "tech": ["React", "Node.js", "Python/FastAPI", "Docker", "Google Gemini", "ElevenLabs", "OAuth 2.0"],
        "category": "Full-Stack",
        "featured": True,
        "github": "https://github.com/RohanChavan0701/period_cycle_planner",
        "demo": "https://lunaflow.work",
        "image": "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop",
        "status": "completed",
        "highlights": [
            "Built and deployed in 24 hours at HackViolet 2026",
            "4 integrated planning views (calendar, Kanban, brainstorm, vision board)",
            "Bidirectional Google Calendar/Tasks sync via OAuth 2.0",
            "Voice-to-text input with ElevenLabs",
            "AI task extraction with Google Gemini",
            "Production deployment with CI/CD"
        ],
        "order": 1
    },
    {
        "title": "CareRoute — Multi-Agent Medical Tourism Orchestrator",
        "description": "Multi-agent orchestration system coordinating 6 specialized agents via JSON-RPC 2.0 protocol. Built in 36 hours at Codefest 2025.",
        "long_description": "Multi-agent orchestration system coordinating 6 specialized agents (flight monitoring, voice calls, notifications, hotel, hospital, accessibility) via JSON-RPC 2.0 protocol. Built in 36 hours at Codefest 2025 (Marriott). Won 4th Place + Honorable Mention. Features HIPAA-compliant audit logging, automated workflow triggering, and retry logic with exponential backoff. Deployed on AWS EC2 with PostgreSQL.",
        "tech": ["FastAPI", "PostgreSQL", "A2A SDK", "Docker", "AWS EC2", "Flutter", "APScheduler"],
        "category": "AI/ML",
        "featured": True,
        "github": "https://github.com/RohanChavan0701/CareRoute",
        "image": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop",
        "status": "completed",
        "highlights": [
            "4th Place + Honorable Mention at Codefest 2025",
            "6 specialized agents with JSON-RPC 2.0 communication",
            "Successfully processed 12 end-to-end test bookings",
            "HIPAA-compliant audit logging",
            "Deployed on AWS EC2 with PostgreSQL",
            "Automated workflow triggering and retry logic"
        ],
        "order": 2
    }
]

SKILLS_DATA = [
    # Languages
    {"name": "Python", "level": 95, "category": "programming", "skill_group": "languages", "order": 1},
    {"name": "TypeScript", "level": 88, "category": "programming", "skill_group": "languages", "order": 2},
    {"name": "SQL", "level": 85, "category": "database", "skill_group": "languages", "order": 3},
    {"name": "C++", "level": 80, "category": "programming", "skill_group": "languages", "order": 4},

    # Frameworks
    {"name": "FastAPI", "level": 90, "category": "backend", "skill_group": "frameworks", "order": 1},
    {"name": "Node.js", "level": 85, "category": "backend", "skill_group": "frameworks", "order": 2},
    {"name": "React", "level": 88, "category": "frontend", "skill_group": "frameworks", "order": 3},
    {"name": "REST APIs", "level": 90, "category": "backend", "skill_group": "frameworks", "order": 4},
    {"name": "Microservices", "level": 85, "category": "backend", "skill_group": "frameworks", "order": 5},

    # Tools
    {"name": "AWS (EC2, Lambda, S3)", "level": 85, "category": "cloud", "skill_group": "tools", "order": 1},
    {"name": "Docker", "level": 85, "category": "devops", "skill_group": "tools", "order": 2},
    {"name": "PostgreSQL", "level": 85, "category": "database", "skill_group": "tools", "order": 3},
    {"name": "Redis", "level": 80, "category": "database", "skill_group": "tools", "order": 4},
    {"name": "Cursor", "level": 90, "category": "development", "skill_group": "tools", "order": 5},
    {"name": "GitHub Actions", "level": 85, "category": "devops", "skill_group": "tools", "order": 6},
    {"name": "Pytest", "level": 85, "category": "testing", "skill_group": "tools", "order": 7},

    # AI/ML
    {"name": "PyTorch", "level": 90, "category": "core", "skill_group": "aiMl", "order": 1},
    {"name": "OpenAI/Claude APIs", "level": 95, "category": "specialized", "skill_group": "aiMl", "order": 2},
    {"name": "RAG Pipelines", "level": 88, "category": "specialized", "skill_group": "aiMl", "order": 3},
    {"name": "Prompt Engineering", "level": 95, "category": "specialized", "skill_group": "aiMl", "order": 4},
    {"name": "LangChain", "level": 85, "category": "specialized", "skill_group": "aiMl", "order": 5},
    {"name": "Multi-Agent Systems", "level": 88, "category": "specialized", "skill_group": "aiMl", "order": 6}
]
