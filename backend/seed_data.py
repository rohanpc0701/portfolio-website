from models import *

# Seed data based on the mock.js content
PERSONAL_INFO = {
    "name": "Rohan",
    "title": "AI/ML Engineer & Full-Stack Developer",
    "email": "rohanchavan0701@gmail.com",
    "github": "https://github.com/rohan",
    "linkedin": "https://www.linkedin.com/in/rohan-chavan-708532200/",
    "location": "Blacksburg, VA",
    "bio": "MS Computer Engineering student at Virginia Tech specializing in AI/ML, with hands-on experience in building production-grade systems, LLM applications, and cutting-edge research in artificial intelligence."
}

EDUCATION_DATA = [
    {
        "degree": "M.S. Computer Engineering",
        "institution": "Virginia Polytechnic Institute and State University",
        "location": "Blacksburg, VA, USA",
        "period": "Aug 2024 – May 2026",
        "gpa": "3.68/4.0",
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
        "title": "Generative AI Intern",
        "company": "AutoUnify",
        "location": "Remote",
        "period": "May 2025 – Present",
        "type": "Internship",
        "color": "blue",
        "achievements": [
            "Spearheaded the design of 25+ production-grade TypeSpec models for CDK Repair APIs, reducing schema duplication by 40% and aligning with OpenAPI/YAML specs",
            "Refactored legacy field types and enforced strict naming conventions to improve API type safety, downstream SDK generation, and maintainability",
            "Engineered a model evaluation pipeline using Vertex AI + Gemini to auto-generate and validate TypeSpec schemas from unstructured input via REST APIs",
            "Resolved critical deployment blockers (auth flows, emulator bugs), enabling seamless cloud-to-local LLM testing; documented workflow in EVALUATION.md adopted org-wide",
            "Streamlined collaboration by driving GitOps best practices (branching, PR reviews, modular refactoring), boosting merge velocity and QA confidence",
            "Implemented CI gates to lint/validate TypeSpec against canonical OpenAPI, cutting PR review time by 35% and eliminating spec drift",
            "Standardized API versioning and deprecation policy; enabled zero-downtime releases across 3 services",
            "Introduced SDK code-generation guardrails that reduced client integration defects by 25%"
        ],
        "tech": ["TypeSpec", "Vertex AI", "Gemini", "OpenAPI", "Google Cloud", "Firestore Emulator", "REST APIs", "LLM Evaluation", "Git", "CI/CD"],
        "order": 1
    },
    {
        "title": "Intelligent Process Automation Intern", 
        "company": "Colgate-Palmolive GBS",
        "location": "Remote",
        "period": "Previous Experience",
        "type": "Internship",
        "color": "purple",
        "achievements": [
            "Designed and deployed three NLP-enabled chatbots that automated FAQ handling for O2I and S2P processes, reducing manual queries by 70%",
            "Integrated a ChatGPT-based REST API with custom intent recognition using Logistic Regression and Decision Trees, lowering average latency to <10s",
            "Led full-stack development of a React.js chatbot integrated with BERT, PyTorch, and TensorFlow, deployed with GitHub Actions for CI/CD",
            "Containerized services and rolled out blue/green deployments on AWS, achieving 99.9% service uptime",
            "Added observability with structured logging and Grafana dashboards; reduced mean time to resolution by 40%",
            "Implemented multilingual i18n pipeline which expanded coverage to 4 locales and increased adoption by 30%"
        ],
        "tech": ["Python", "NLP", "ChatGPT API", "BERT", "React.js", "PyTorch", "TensorFlow", "GitHub Actions"],
        "order": 2
    },
    {
        "title": "Team Member - Amazon Nova AI Challenge",
        "company": "Virginia Tech (Team HokieTokie)",
        "location": "Blacksburg, VA",
        "period": "Jan 2025 – Present",
        "type": "Research",
        "color": "cyan",
        "achievements": [
            "Led red teaming initiatives to design a prompt-based attack taxonomy (e.g., insecure cryptography, code injection) for evaluating large language models (LLMs) in safety-critical applications",
            "Developed and deployed a real-time LLM Defender Bot using GPT-4 and Claude, achieving a 56s avg. response latency for detecting and neutralizing adversarial prompts in Amazon Bedrock-based models",
            "Implemented adversarial severity classification using DeepSeek and prompt trajectory modeling, contributing insights to alignment protocols and LLM deployment risk assessments",
            "Built an evaluation harness executing 5k+ adversarial prompts nightly; improved attack detection F1 by 11%",
            "Co-authored an internal whitepaper and presented results to a cross-lab forum; recommendations adopted in the deployment checklist"
        ],
        "tech": ["Amazon Bedrock", "Red Teaming", "Prompt Engineering", "Claude", "GPT-4", "DeepSeek", "LLM Alignment", "AI Safety"],
        "order": 3
    }
]

PROJECTS_DATA = [
    {
        "title": "SentiMint – AI Stock Analyzer",
        "description": "LangChain-powered multi-agent system simulating investor personas that analyze Yahoo Finance indicators and debate stock recommendations using GPT-based reasoning.",
        "long_description": "Built a sophisticated LangChain-powered multi-agent system that simulates different investor personas ('bold' and 'cautious') to analyze Yahoo Finance indicators and debate stock recommendations. The system uses GPT-based reasoning modules and symbolic heuristics to weigh financial risks, enabling decision reconciliation via token-wise confidence scoring.",
        "tech": ["LangChain", "GPT-3.5", "Selenium", "Next.js", "Flask", "Yahoo Finance API", "BeautifulSoup"],
        "category": "AI/ML",
        "featured": True,
        "github": "https://github.com/rohan/sentimint",
        "demo": "https://sentimint.demo.com",
        "image": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop",
        "status": "completed",
        "highlights": [
            "Multi-agent system with persona-based decision making",
            "Real-time financial data analysis and processing", 
            "Advanced GPT-based reasoning and confidence scoring",
            "Framework adaptable to reinforcement learning environments"
        ],
        "order": 1
    },
    {
        "title": "LLM Defender Bot",
        "description": "Real-time AI safety system using GPT-4 and Claude for detecting and neutralizing adversarial prompts in Amazon Bedrock models.",
        "long_description": "Developed and deployed a real-time LLM Defender Bot as part of the Amazon Nova AI Challenge, achieving 56s average response latency for detecting and neutralizing adversarial prompts. The system implements advanced red teaming techniques and adversarial severity classification.",
        "tech": ["Amazon Bedrock", "GPT-4", "Claude", "DeepSeek", "Python", "AI Safety", "Red Teaming"],
        "category": "AI Safety",
        "featured": True,
        "github": "https://github.com/rohan/llm-defender",
        "image": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
        "status": "in-progress",
        "highlights": [
            "56s average response latency for threat detection",
            "Advanced prompt-based attack taxonomy design",
            "Real-time adversarial prompt neutralization",
            "Contribution to LLM alignment and safety protocols"
        ],
        "order": 2
    },
    {
        "title": "TypeSpec API Generator",
        "description": "Production-grade TypeSpec models and evaluation pipeline using Vertex AI and Gemini for automated schema generation and validation.",
        "long_description": "Spearheaded the design of 25+ production-grade TypeSpec models for CDK Repair APIs at AutoUnify, reducing schema duplication by 40%. Engineered a comprehensive model evaluation pipeline using Vertex AI and Gemini for automated schema generation from unstructured input.",
        "tech": ["TypeSpec", "Vertex AI", "Gemini", "OpenAPI", "Google Cloud", "REST APIs", "CI/CD"],
        "category": "DevOps/API",
        "featured": True,
        "github": "https://github.com/rohan/typespec-generator",
        "image": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
        "status": "completed",
        "highlights": [
            "40% reduction in schema duplication",
            "Automated TypeSpec schema generation",
            "Production-grade API type safety improvements",
            "Org-wide adoption of documentation workflow"
        ],
        "order": 3
    },
    {
        "title": "NLP Chatbot Suite",
        "description": "Three production NLP-enabled chatbots for process automation, reducing manual queries by 70% using ChatGPT API and custom intent recognition.",
        "long_description": "Designed and deployed three NLP-enabled chatbots at Colgate-Palmolive that automated FAQ handling for O2I and S2P processes. Integrated ChatGPT-based REST API with custom intent recognition using machine learning algorithms, achieving sub-10s response latency.",
        "tech": ["Python", "NLP", "ChatGPT API", "BERT", "React.js", "PyTorch", "TensorFlow", "Logistic Regression"],
        "category": "NLP",
        "featured": False,
        "github": "https://github.com/rohan/nlp-chatbots",
        "image": "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=400&fit=crop",
        "status": "completed",
        "highlights": [
            "70% reduction in manual query handling",
            "Sub-10s average response latency",
            "Full-stack chatbot development",
            "Custom intent recognition system"
        ],
        "order": 4
    },
    {
        "title": "Computer Vision Pipeline",
        "description": "Advanced computer vision system using CLIP, DINOv2, and Vision-Language-Action systems for robotics applications.",
        "long_description": "Built a comprehensive computer vision pipeline leveraging state-of-the-art models including CLIP and DINOv2 for robotics applications. The system incorporates Vision-Language-Action frameworks and simulation environments for real-world deployment.",
        "tech": ["OpenCV", "CLIP", "DINOv2", "PyBullet", "OpenAI Gym", "Isaac Gym", "Python", "Computer Vision"],
        "category": "Computer Vision",
        "featured": False,
        "github": "https://github.com/rohan/cv-pipeline",
        "image": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
        "status": "completed",
        "highlights": [
            "State-of-the-art vision model integration",
            "Robotics simulation environment setup",
            "Vision-Language-Action system implementation",
            "Real-world deployment optimization"
        ],
        "order": 5
    },
    {
        "title": "CANI – AI Blogging Platform",
        "description": "Web platform to explore and share AI-related content with secure auth, category-based posts, admin dashboard, and modern UI/UX.",
        "long_description": "CANI is a full-stack blogging platform focused on AI content. It provides user authentication, category-wise browsing, and an admin dashboard for managing posts and categories. The UI is responsive and modern, using Owl Carousel for featured content, Font Awesome for icons, and AOS for smooth animations. The backend is powered by PHP and MySQL with session-based auth, and integrates OpenAI API for AI features.",
        "tech": ["PHP", "MySQL", "HTML", "CSS", "JavaScript", "Owl Carousel", "Font Awesome", "AOS", "OpenAI API"],
        "category": "AI/ML",
        "featured": True,
        "github": "https://github.com/RohanChavan0701/CANI-AI-Blogging-Website",
        "image": "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=800&h=400&fit=crop",
        "status": "completed",
        "highlights": [
            "Secure login and registration",
            "Category-based blog posts and featured carousels",
            "Admin panel for content management",
            "Responsive UI with Owl Carousel and AOS animations",
            "OpenAI API integration for AI features"
        ],
        "order": 6
    }
]

SKILLS_DATA = [
    # Languages
    {"name": "Python", "level": 95, "category": "programming", "skill_group": "languages", "order": 1},
    {"name": "JavaScript", "level": 90, "category": "programming", "skill_group": "languages", "order": 2},
    {"name": "Java", "level": 85, "category": "programming", "skill_group": "languages", "order": 3},
    {"name": "SQL", "level": 80, "category": "database", "skill_group": "languages", "order": 4},
    {"name": "HTML/CSS", "level": 85, "category": "web", "skill_group": "languages", "order": 5},
    {"name": "Node.js", "level": 80, "category": "backend", "skill_group": "languages", "order": 6},
    
    # Frameworks
    {"name": "React.js", "level": 90, "category": "frontend", "skill_group": "frameworks", "order": 1},
    {"name": "Django", "level": 85, "category": "backend", "skill_group": "frameworks", "order": 2},
    {"name": "FastAPI", "level": 80, "category": "backend", "skill_group": "frameworks", "order": 3},
    {"name": "PyTorch", "level": 90, "category": "ai-ml", "skill_group": "frameworks", "order": 4},
    {"name": "TensorFlow", "level": 85, "category": "ai-ml", "skill_group": "frameworks", "order": 5},
    {"name": "LangChain", "level": 85, "category": "ai-ml", "skill_group": "frameworks", "order": 6},
    {"name": "OpenCV", "level": 80, "category": "cv", "skill_group": "frameworks", "order": 7},
    {"name": "HuggingFace", "level": 85, "category": "ai-ml", "skill_group": "frameworks", "order": 8},
    
    # Tools
    {"name": "Git/GitHub", "level": 95, "category": "development", "skill_group": "tools", "order": 1},
    {"name": "Docker", "level": 80, "category": "devops", "skill_group": "tools", "order": 2},
    {"name": "Kubernetes", "level": 75, "category": "devops", "skill_group": "tools", "order": 3},
    {"name": "AWS", "level": 85, "category": "cloud", "skill_group": "tools", "order": 4},
    {"name": "GCP", "level": 80, "category": "cloud", "skill_group": "tools", "order": 5},
    {"name": "Terraform", "level": 70, "category": "devops", "skill_group": "tools", "order": 6},
    {"name": "MongoDB", "level": 80, "category": "database", "skill_group": "tools", "order": 7},
    {"name": "PostgreSQL", "level": 85, "category": "database", "skill_group": "tools", "order": 8},
    
    # AI/ML
    {"name": "Machine Learning", "level": 90, "category": "core", "skill_group": "aiMl", "order": 1},
    {"name": "Deep Learning", "level": 85, "category": "core", "skill_group": "aiMl", "order": 2},
    {"name": "Natural Language Processing", "level": 90, "category": "domain", "skill_group": "aiMl", "order": 3},
    {"name": "Computer Vision", "level": 85, "category": "domain", "skill_group": "aiMl", "order": 4},
    {"name": "Large Language Models", "level": 95, "category": "specialized", "skill_group": "aiMl", "order": 5},
    {"name": "Reinforcement Learning", "level": 75, "category": "specialized", "skill_group": "aiMl", "order": 6},
    {"name": "MLOps", "level": 80, "category": "engineering", "skill_group": "aiMl", "order": 7},
    {"name": "Model Evaluation", "level": 85, "category": "engineering", "skill_group": "aiMl", "order": 8}
]