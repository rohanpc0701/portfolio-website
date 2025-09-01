import axios from 'axios';
import { db, firebaseReady } from './firebase';
import { collection, getDocs, query, where, orderBy, addDoc } from 'firebase/firestore';
import experienceJson from '../data/experience.json';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : '');
const API_BASE = BACKEND_URL ? `${BACKEND_URL}/api` : '/api';
const BACKEND_CONFIGURED = Boolean(BACKEND_URL);

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Local fallbacks to keep the site functional when backend is unavailable
const fallbackPersonal = {
  name: 'Rohan Praveen Chavan',
  bio: 'MS Computer Engineering student at Virginia Tech specializing in AI/ML, with hands-on experience in building production-grade systems, LLM applications, and cutting-edge research in artificial intelligence.'
};

const fallbackEducation = [
  {
    id: '1',
    degree: 'M.S. Computer Engineering',
    institution: 'Virginia Polytechnic Institute and State University',
    location: 'Blacksburg, VA, USA',
    period: 'Aug 2024 – May 2026',
    gpa: '3.68/4.0',
    type: 'masters'
  },
  {
    id: '2',
    degree: 'B.Tech Information Technology',
    institution: 'K.J. Somaiya College of Engineering',
    location: 'Mumbai, India',
    period: 'Jan 2020 – Dec 2024',
    gpa: '3.5/4.0',
    type: 'bachelors'
  }
];

const fallbackSkills = {
  languages: [
    { name: 'Python', level: 95, category: 'programming' },
    { name: 'JavaScript', level: 90, category: 'programming' },
    { name: 'Java', level: 85, category: 'programming' },
    { name: 'SQL', level: 80, category: 'database' },
    { name: 'HTML/CSS', level: 85, category: 'web' },
    { name: 'Node.js', level: 80, category: 'backend' }
  ],
  frameworks: [
    { name: 'React.js', level: 90, category: 'frontend' },
    { name: 'Django', level: 85, category: 'backend' },
    { name: 'FastAPI', level: 80, category: 'backend' },
    { name: 'PyTorch', level: 90, category: 'ai-ml' },
    { name: 'TensorFlow', level: 85, category: 'ai-ml' },
    { name: 'LangChain', level: 85, category: 'ai-ml' },
    { name: 'OpenCV', level: 80, category: 'cv' },
    { name: 'HuggingFace', level: 85, category: 'ai-ml' }
  ],
  tools: [
    { name: 'Git/GitHub', level: 95, category: 'development' },
    { name: 'Docker', level: 80, category: 'devops' },
    { name: 'Kubernetes', level: 75, category: 'devops' },
    { name: 'AWS', level: 85, category: 'cloud' },
    { name: 'GCP', level: 80, category: 'cloud' },
    { name: 'Terraform', level: 70, category: 'devops' },
    { name: 'MongoDB', level: 80, category: 'database' },
    { name: 'PostgreSQL', level: 85, category: 'database' }
  ],
  aiMl: [
    { name: 'Machine Learning', level: 90, category: 'core' },
    { name: 'Deep Learning', level: 85, category: 'core' },
    { name: 'Natural Language Processing', level: 90, category: 'domain' },
    { name: 'Computer Vision', level: 85, category: 'domain' },
    { name: 'Large Language Models', level: 95, category: 'specialized' },
    { name: 'Reinforcement Learning', level: 75, category: 'specialized' },
    { name: 'MLOps', level: 80, category: 'engineering' },
    { name: 'Model Evaluation', level: 85, category: 'engineering' }
  ]
};

const mapExperienceFromJson = () => {
  const roles = Array.isArray(experienceJson?.roles) ? experienceJson.roles : [];
  return roles.map((r, idx) => ({
    id: r.id || String(idx + 1),
    company: r.company,
    title: r.title,
    location: r.location,
    period: r.dates,
    achievements: r.bullets || [],
    metrics: r.metrics || [],
    tech: r.stack || [],
    color: r.color || 'blue',
    logo: r.logo || null,
    type: 'professional'
  }));
};

// API service functions
export const portfolioAPI = {
  // Get personal information
  async getPersonalInfo() {
    try {
      if (!BACKEND_CONFIGURED && process.env.NODE_ENV === 'production') {
        return fallbackPersonal;
      }
      const response = await apiClient.get('/portfolio/personal');
      return response.data;
    } catch (error) {
      console.error('Error fetching personal info:', error);
      // Fallback to local content
      return fallbackPersonal;
    }
  },

  // Get education details
  async getEducation() {
    try {
      if (!BACKEND_CONFIGURED && process.env.NODE_ENV === 'production') {
        return fallbackEducation;
      }
      const response = await apiClient.get('/portfolio/education');
      return response.data;
    } catch (error) {
      console.error('Error fetching education:', error);
      // Fallback to local content
      return fallbackEducation;
    }
  },

  // Get work experience
  async getExperience() {
    try {
      if (!BACKEND_CONFIGURED && process.env.NODE_ENV === 'production') {
        return mapExperienceFromJson();
      }
      const response = await apiClient.get('/portfolio/experience');
      return response.data;
    } catch (error) {
      console.error('Error fetching experience:', error);
      // Fallback to local content
      return mapExperienceFromJson();
    }
  },

  // Get projects with optional category filter
  async getProjects(category = null, featuredOnly = false) {
    // If Firebase env is present, read from Firestore directly
    if (process.env.REACT_APP_FIREBASE_PROJECT_ID) {
      const col = collection(db, 'projects');
      const constraints = [];
      if (category && category !== 'all') constraints.push(where('category', '==', category));
      if (featuredOnly) constraints.push(where('featured', '==', true));
      constraints.push(orderBy('order', 'asc'));
      const snap = await getDocs(query(col, ...constraints));
      return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    }

    // Default: use backend API
    const params = new URLSearchParams();
    if (category && category !== 'all') params.append('category', category);
    if (featuredOnly) params.append('featured_only', 'true');
    const response = await apiClient.get(`/portfolio/projects?${params}`);
    return response.data;
  },

  // Bulk create projects (admin/import)
  async createProjectsBulk(projects) {
    // If Firebase is configured, write directly to Firestore
    if (process.env.REACT_APP_FIREBASE_PROJECT_ID) {
      const col = collection(db, 'projects');
      const writes = [];
      for (const p of projects) {
        writes.push(addDoc(col, p));
      }
      await Promise.all(writes);
      return projects; // echo back
    }

    const response = await apiClient.post('/portfolio/projects/bulk', projects);
    return response.data;
  },

  // Get featured projects only
  async getFeaturedProjects() {
    try {
      const response = await apiClient.get('/portfolio/projects/featured');
      return response.data;
    } catch (error) {
      console.error('Error fetching featured projects:', error);
      throw error;
    }
  },

  // Get skills grouped by category
  async getSkills() {
    try {
      if (!BACKEND_CONFIGURED && process.env.NODE_ENV === 'production') {
        return fallbackSkills;
      }
      // Use a shorter timeout specifically for skills to avoid long spinners
      const response = await apiClient.get('/portfolio/skills', { timeout: 1500 });
      return response.data;
    } catch (error) {
      console.error('Error fetching skills:', error);
      // Fallback to local content
      return fallbackSkills;
    }
  },

  // Get complete portfolio data
  async getCompletePortfolio() {
    try {
      if (!BACKEND_CONFIGURED && process.env.NODE_ENV === 'production') {
        return {
          personal: fallbackPersonal,
          education: fallbackEducation,
          experience: mapExperienceFromJson(),
          skills: fallbackSkills
        };
      }
      const response = await apiClient.get('/portfolio/complete');
      return response.data;
    } catch (error) {
      console.error('Error fetching complete portfolio:', error);
      // Fallback to local content
      return {
        personal: fallbackPersonal,
        education: fallbackEducation,
        experience: mapExperienceFromJson(),
        skills: fallbackSkills
      };
    }
  },

  // Submit contact form
  async submitContactForm(formData) {
    // Try backend first
    try {
      const response = await apiClient.post('/contact', formData);
      return response.data;
    } catch (error) {
      console.warn('Backend contact submission failed, considering Firebase fallback...', error?.response?.status || error?.message);
      // If Firebase is configured, write to Firestore as fallback
      if (firebaseReady && process.env.REACT_APP_FIREBASE_PROJECT_ID) {
        try {
          const col = collection(db, 'contact_messages');
          const payload = {
            ...formData,
            status: 'new',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
          const docRef = await addDoc(col, payload);
          return { id: docRef.id, ...payload };
        } catch (fbErr) {
          console.error('Firebase fallback failed:', fbErr);
          throw error; // bubble up original backend error
        }
      }
      throw error;
    }
  },

  // Get contact messages (admin)
  async getContactMessages() {
    try {
      const response = await apiClient.get('/contact/messages');
      return response.data;
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      throw error;
    }
  }
};

// Export default for backwards compatibility
export default portfolioAPI;