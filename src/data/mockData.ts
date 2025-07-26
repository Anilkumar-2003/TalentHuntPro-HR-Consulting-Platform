import { MetricCard, Candidate, JobRole, CompetitorData, Notification } from '../types';
import { Users, Briefcase, DollarSign, Award } from 'lucide-react';

// Mock Metrics
export const mockMetrics: MetricCard[] = [
  {
    title: 'Total Candidates',
    value: '4,738',
    change: 12.5,
    icon: 'Users',
    color: 'primary'
  },
  {
    title: 'Open Positions',
    value: '276',
    change: 5.2,
    icon: 'Briefcase',
    color: 'secondary'
  },
  {
    title: 'Average Salary',
    value: '$105,500',
    change: 3.7,
    icon: 'DollarSign',
    color: 'success'
  },
  {
    title: 'Talent Quality Score',
    value: '87.2%',
    change: -2.1,
    icon: 'Award',
    color: 'accent'
  }
];

// Mock Candidates
export const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Elena Rodriguez',
    role: 'Senior React Developer',
    location: 'New York, USA',
    experience: 7,
    skills: ['React', 'TypeScript', 'Redux', 'Node.js', 'GraphQL'],
    salary: 130000,
    availability: 'immediate',
    rating: 4.8,
    image: 'https://images.pexels.com/photos/3760856/pexels-photo-3760856.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'UI/UX Designer',
    location: 'San Francisco, USA',
    experience: 5,
    skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Design Systems'],
    salary: 110000,
    availability: '1-month',
    rating: 4.6,
    image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '3',
    name: 'Priya Sharma',
    role: 'Product Manager',
    location: 'London, UK',
    experience: 6,
    skills: ['Agile', 'Product Strategy', 'User Stories', 'A/B Testing', 'Analytics'],
    salary: 120000,
    availability: '2-month',
    rating: 4.7,
    image: 'https://images.pexels.com/photos/3772711/pexels-photo-3772711.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '4',
    name: 'James Wilson',
    role: 'DevOps Engineer',
    location: 'Berlin, Germany',
    experience: 4,
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
    salary: 105000,
    availability: 'immediate',
    rating: 4.3,
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150'
  }
];

// Mock Job Roles
export const mockJobRoles: JobRole[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Remote (US)',
    experience: '5-7 years',
    salary: {
      min: 120000,
      max: 150000,
      currency: '$'
    },
    skills: ['React', 'TypeScript', 'Redux', 'CSS-in-JS', 'Jest'],
    openings: 3,
    applicants: 47
  },
  {
    id: '2',
    title: 'Product Designer',
    department: 'Design',
    location: 'New York, USA',
    experience: '3-5 years',
    salary: {
      min: 95000,
      max: 125000,
      currency: '$'
    },
    skills: ['UI Design', 'UX Research', 'Figma', 'Design Systems', 'Prototyping'],
    openings: 1,
    applicants: 38
  },
  {
    id: '3',
    title: 'Data Scientist',
    department: 'Analytics',
    location: 'London, UK',
    experience: '4-6 years',
    salary: {
      min: 85000,
      max: 110000,
      currency: '£'
    },
    skills: ['Python', 'SQL', 'Machine Learning', 'Data Visualization', 'Statistics'],
    openings: 2,
    applicants: 29
  }
];

// Mock Competitor Data
export const mockCompetitors: CompetitorData[] = [
  {
    name: 'TechGiant Inc.',
    hiringVolume: 235,
    averageSalary: 135000,
    locations: [
      { name: 'San Francisco', value: 42 },
      { name: 'New York', value: 28 },
      { name: 'Seattle', value: 15 },
      { name: 'Remote', value: 15 }
    ]
  },
  {
    name: 'InnovateX',
    hiringVolume: 187,
    averageSalary: 115000,
    locations: [
      { name: 'Austin', value: 35 },
      { name: 'Boston', value: 25 },
      { name: 'Chicago', value: 15 },
      { name: 'Remote', value: 25 }
    ]
  },
  {
    name: 'FutureWorks',
    hiringVolume: 164,
    averageSalary: 118000,
    locations: [
      { name: 'Los Angeles', value: 30 },
      { name: 'Denver', value: 20 },
      { name: 'Toronto', value: 25 },
      { name: 'Remote', value: 25 }
    ]
  }
];

// Chart Data
export const talentTrendsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Applications',
      data: [1250, 1450, 1320, 1500, 1680, 1750],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
      fill: true
    },
    {
      label: 'Hires',
      data: [65, 85, 72, 95, 110, 125],
      borderColor: '#10B981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      tension: 0.4,
      fill: true
    }
  ]
};

export const skillDemandData = {
  labels: ['React', 'Python', 'AWS', 'Product', 'UX', 'DevOps'],
  datasets: [
    {
      label: 'Demand Score',
      data: [85, 78, 92, 65, 71, 88],
      backgroundColor: [
        'rgba(59, 130, 246, 0.7)',
        'rgba(16, 185, 129, 0.7)',
        'rgba(168, 85, 247, 0.7)',
        'rgba(249, 115, 22, 0.7)',
        'rgba(236, 72, 153, 0.7)',
        'rgba(245, 158, 11, 0.7)'
      ],
      borderWidth: 1
    }
  ]
};

export const salaryTrendsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Engineering',
      data: [105000, 107000, 108500, 110000, 112000, 115000],
      backgroundColor: 'rgba(59, 130, 246, 0.7)'
    },
    {
      label: 'Design',
      data: [95000, 96500, 98000, 99000, 101000, 103000],
      backgroundColor: 'rgba(168, 85, 247, 0.7)'
    },
    {
      label: 'Product',
      data: [110000, 112000, 113500, 115000, 118000, 120000],
      backgroundColor: 'rgba(16, 185, 129, 0.7)'
    }
  ]
};

export const locationDistributionData = {
  labels: ['Remote', 'San Francisco', 'New York', 'London', 'Berlin', 'Other'],
  datasets: [
    {
      label: 'Candidates',
      data: [35, 20, 15, 12, 8, 10],
      backgroundColor: [
        'rgba(59, 130, 246, 0.7)',
        'rgba(16, 185, 129, 0.7)',
        'rgba(168, 85, 247, 0.7)',
        'rgba(249, 115, 22, 0.7)',
        'rgba(236, 72, 153, 0.7)',
        'rgba(245, 158, 11, 0.7)'
      ],
      borderColor: '#FFFFFF',
      borderWidth: 2
    }
  ]
};

// Filter Options
export const candidateFilters = [
  {
    name: 'Role',
    options: [
      { label: 'Developer', value: 'developer' },
      { label: 'Designer', value: 'designer' },
      { label: 'Product Manager', value: 'product-manager' },
      { label: 'Data Scientist', value: 'data-scientist' },
      { label: 'DevOps', value: 'devops' }
    ]
  },
  {
    name: 'Location',
    options: [
      { label: 'Remote', value: 'remote' },
      { label: 'USA', value: 'usa' },
      { label: 'Europe', value: 'europe' },
      { label: 'Asia', value: 'asia' },
      { label: 'Other', value: 'other' }
    ]
  },
  {
    name: 'Experience',
    options: [
      { label: '0-2 years', value: '0-2' },
      { label: '3-5 years', value: '3-5' },
      { label: '6-8 years', value: '6-8' },
      { label: '9+ years', value: '9+' }
    ]
  },
  {
    name: 'Availability',
    options: [
      { label: 'Immediate', value: 'immediate' },
      { label: '1 month', value: '1-month' },
      { label: '2 months', value: '2-month' },
      { label: '3+ months', value: '3-month' }
    ]
  },
  {
    name: 'Skills',
    options: [
      { label: 'React', value: 'react' },
      { label: 'Python', value: 'python' },
      { label: 'AWS', value: 'aws' },
      { label: 'UI/UX', value: 'ui-ux' },
      { label: 'Agile', value: 'agile' }
    ]
  }
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Candidate Match',
    message: 'Elena Rodriguez matches 95% with your Senior React Developer role',
    type: 'info',
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 15) // 15 minutes ago
  },
  {
    id: '2',
    title: 'Talent Report Ready',
    message: 'Your quarterly talent market report is ready to view',
    type: 'success',
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
  },
  {
    id: '3',
    title: 'Hiring Trend Alert',
    message: 'Significant increase in React developer hiring in San Francisco',
    type: 'warning',
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
  },
  {
    id: '4',
    title: 'Salary Data Updated',
    message: 'Salary benchmarks for Design roles have been updated',
    type: 'info',
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2) // 2 days ago
  }
];