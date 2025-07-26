import axios from 'axios';
import { Candidate } from '../types';

// const API_URL = 'http://localhost:5000/api';


const API_URL = 'https://flask-talentpro.onrender.com/api';

const CANDIDATES_API_URL = 'https://candidates-api-ydrv.onrender.com/api/candidates';

// Create axios instance for non-candidate endpoints
const apiClient = axios.create({
  baseURL: API_URL,
});

// Handle auth errors

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const api = {
  auth: {
    login: async (email: string, password: string) => {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    },
    register: async (userData: { name: string; email: string; password: string; role: string }) => {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data;
    },
    getProfile: async (email: string, password: string) => {
      const response = await apiClient.post('/profile', { email, password });
      return response.data;
    }
  },
  candidates: {
    getAll: async (email: string, password: string) => {
      const response = await fetch(CANDIDATES_API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(`${email}:${password}`)
        }
      });
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        throw new Error('Failed to fetch candidates');
      }
      return response.json();
    },
    getById: async (id: string, email: string, password: string) => {
      const response = await fetch(`${CANDIDATES_API_URL}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(`${email}:${password}`)
        }
      });
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        throw new Error('Failed to fetch candidate');
      }
      return response.json();
    },
    add: async (candidate: Omit<Candidate, 'id'>, email: string, password: string) => {
      const response = await fetch(CANDIDATES_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(`${email}:${password}`)
        },
        body: JSON.stringify(candidate)
      });
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        throw new Error('Failed to add candidate');
      }
      return response.json();
    }
  },
  jobRoles: {
    getAll: async (email: string, password: string) => {
      const response = await apiClient.post('/job-roles', { email, password });
      return response.data;
    },
    getById: async (id: string, email: string, password: string) => {
      const response = await apiClient.post(`/job-roles/${id}`, { email, password });
      return response.data;
    }
  },
  dashboard: {
    getMetrics: async (email: string, password: string) => {
      const response = await apiClient.post('/dashboard/metrics', { email, password });
      return response.data;
    }
  }
};

export const apiClientInstance = apiClient;
export default api;