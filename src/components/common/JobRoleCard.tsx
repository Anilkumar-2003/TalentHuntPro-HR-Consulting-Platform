import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Users, DollarSign } from 'lucide-react';
import { JobRole } from '../../types';

interface JobRoleCardProps {
  jobRole: JobRole;
}

const JobRoleCard: React.FC<JobRoleCardProps> = ({ jobRole }) => {
  const navigate = useNavigate();
  const { id, title, department, location, experience, salary, skills, openings, applicants } = jobRole;
  
  const handleViewDetails = () => {
    navigate(`/job-roles/${id}`);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-card hover:shadow-cardHover p-6 transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{department}</p>
        </div>
        
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">
          {openings} {openings === 1 ? 'opening' : 'openings'}
        </span>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-y-2">
        <div className="w-1/2 flex items-center text-sm text-gray-600 dark:text-gray-300">
          <MapPin size={14} className="mr-1" />
          <span>{location}</span>
        </div>
        
        <div className="w-1/2 flex items-center text-sm text-gray-600 dark:text-gray-300">
          <Users size={14} className="mr-1" />
          <span>{applicants} applicants</span>
        </div>
        
        <div className="w-1/2 flex items-center text-sm text-gray-600 dark:text-gray-300">
          <DollarSign size={14} className="mr-1" />
          <span>{salary.currency}{salary.min.toLocaleString()} - {salary.currency}{salary.max.toLocaleString()}</span>
        </div>
        
        <div className="w-1/2 flex items-center text-sm text-gray-600 dark:text-gray-300">
          <span>{experience}</span>
        </div>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
        {skills.slice(0, 4).map((skill, index) => (
          <span 
            key={index} 
            className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            {skill}
          </span>
        ))}
        {skills.length > 4 && (
          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            +{skills.length - 4} more
          </span>
        )}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div className="flex space-x-2">
          <button 
            onClick={handleViewDetails}
            className="px-3 py-1.5 text-sm rounded-md bg-primary-600 hover:bg-primary-700 text-white transition-colors"
          >
            View details
          </button>
          <button className="px-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors">
            Search candidates
          </button>
        </div>
        
        <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
          Share
        </button>
      </div>
    </div>
  );
};

export default JobRoleCard;