export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'consultant' | 'manager';
  avatar: string;
}

export interface Candidate {
  id: string;
  name: string;
  role: string;
  location: string;
  experience: number;
  skills: string[];
  salary: number;
  availability: 'immediate' | '1-month' | '2-month' | '3-month';
  rating: number;
  image?: string;
}

export interface JobRole {
  id: string;
  title: string;
  department: string;
  location: string;
  experience: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  skills: string[];
  openings: number;
  applicants: number;
}

export interface CompetitorData {
  name: string;
  hiringVolume: number;
  averageSalary: number;
  locations: {
    name: string;
    value: number;
  }[];
}

export interface MetricCard {
  title: string;
  value: string | number;
  change: number;
  icon: string;
  color: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  timestamp: Date;
}