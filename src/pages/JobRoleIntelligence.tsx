import React from 'react';
import JobRoleCard from '../components/common/JobRoleCard';
import ChartCard from '../components/common/ChartCard';
import { mockJobRoles, skillDemandData, salaryTrendsData } from '../data/mockData';

const JobRoleIntelligence: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Job Role Intelligence</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Analyze job roles, requirements, and market demand.
          </p>
        </div>
        <div className="flex space-x-3">
          {/* <button className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            Download report
          </button> */}
          {/* <button className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white transition-colors">
            Create job role
          </button> */}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Skill Demand"
          subtitle="Most sought-after skills across all roles"
          type="bar"
          data={skillDemandData}
        />
        <ChartCard
          title="Salary Trends by Department"
          subtitle="Average salaries over the last 6 months"
          type="bar"
          data={salaryTrendsData}
        />
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-card p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Active Job Roles</h3>
          <div className="flex items-center">
            <div className="relative">
              <select className="appearance-none pl-3 pr-8 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                <option>All Departments</option>
                <option>Engineering</option>
                <option>Design</option>
                <option>Product</option>
                <option>Analytics</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <div className="relative ml-3">
              <select className="appearance-none pl-3 pr-8 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                <option>All Locations</option>
                <option>Remote</option>
                <option>United States</option>
                <option>Europe</option>
                <option>Asia</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockJobRoles.map((role) => (
            <JobRoleCard key={role.id} jobRole={role} />
          ))}
          {Array(3).fill(0).map((_, index) => (
            <JobRoleCard 
              key={`additional-${index}`} 
              jobRole={{
                id: `additional-${index}`,
                title: ['Backend Engineer', 'Marketing Manager', 'Customer Success Specialist'][index],
                department: ['Engineering', 'Marketing', 'Customer Success'][index],
                location: ['Berlin, Germany', 'Paris, France', 'Remote'][index],
                experience: ['4-6 years', '5-7 years', '2-4 years'][index],
                salary: {
                  min: [90000, 80000, 65000][index],
                  max: [120000, 110000, 85000][index],
                  currency: ['€', '€', '$'][index]
                },
                skills: [
                  ['Java', 'Spring Boot', 'Microservices', 'AWS', 'Docker'],
                  ['Content Strategy', 'SEO', 'Social Media', 'Analytics', 'Campaign Management'],
                  ['Customer Retention', 'Relationship Management', 'Problem Solving', 'Onboarding', 'CRM']
                ][index],
                openings: [2, 1, 3][index],
                applicants: [34, 27, 41][index]
              }} 
            />
          ))}
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-card p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Role Insights</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">Time to Fill</h4>
            <div className="flex items-end">
              <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">32</span>
              <span className="text-gray-600 dark:text-gray-400 ml-1 mb-1">days</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              12% faster than industry average
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">Candidate Quality</h4>
            <div className="flex items-end">
              <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">76%</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Top candidates meeting all requirements
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">Market Availability</h4>
            <div className="flex items-end">
              <span className="text-3xl font-bold text-warning-600 dark:text-warning-400">Low</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              High competition for qualified candidates
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobRoleIntelligence;