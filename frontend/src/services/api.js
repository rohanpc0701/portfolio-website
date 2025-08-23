import axios from 'axios';
import { db, firebaseReady } from './firebase';
import { collection, getDocs, query, where, orderBy, addDoc } from 'firebase/firestore';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : '');
const API_BASE = BACKEND_URL ? `${BACKEND_URL}/api` : '/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// API service functions
export const portfolioAPI = {
  // Get personal information
  async getPersonalInfo() {
    try {
      const response = await apiClient.get('/portfolio/personal');
      return response.data;
    } catch (error) {
      console.error('Error fetching personal info:', error);
      throw error;
    }
  },

  // Get education details
  async getEducation() {
    try {
      const response = await apiClient.get('/portfolio/education');
      return response.data;
    } catch (error) {
      console.error('Error fetching education:', error);
      throw error;
    }
  },

  // Get work experience
  async getExperience() {
    try {
      const response = await apiClient.get('/portfolio/experience');
      return response.data;
    } catch (error) {
      console.error('Error fetching experience:', error);
      throw error;
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
      // Use a shorter timeout specifically for skills to avoid long spinners
      const response = await apiClient.get('/portfolio/skills', { timeout: 1500 });
      return response.data;
    } catch (error) {
      console.error('Error fetching skills:', error);
      throw error;
    }
  },

  // Get complete portfolio data
  async getCompletePortfolio() {
    try {
      const response = await apiClient.get('/portfolio/complete');
      return response.data;
    } catch (error) {
      console.error('Error fetching complete portfolio:', error);
      throw error;
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