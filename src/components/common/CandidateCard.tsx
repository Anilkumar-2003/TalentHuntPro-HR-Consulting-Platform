import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Clock, MapPin } from 'lucide-react';
import { Candidate } from '../../types';

interface CandidateCardProps {
  candidate: Candidate;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  const navigate = useNavigate();
  const { id, name, role, location, experience, skills, availability, rating, image } = candidate;
  
  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'immediate':
        return 'text-success-600 bg-success-50 dark:bg-success-900/20';
      case '1-month':
        return 'text-primary-600 bg-primary-50 dark:bg-primary-900/20';
      default:
        return 'text-warning-600 bg-warning-50 dark:bg-warning-900/20';
    }
  };
  
  const avatarUrl = image || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff`;
  
  const handleViewProfile = () => {
    navigate(`/candidates/${id}`);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-card hover:shadow-cardHover p-6 transition-all duration-300">
      <div className="flex items-start gap-4">
        <img 
          src={avatarUrl}
          alt={name} 
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
        />
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{role}</p>
            </div>
            
            <div className="flex items-center">
              <Star className="text-yellow-400 fill-yellow-400 mr-1" size={16} />
              <span className="text-sm font-medium">{rating.toFixed(1)}</span>
            </div>
          </div>
          
          <div className="mt-4 flex items-center text-sm text-gray-600 dark:text-gray-300">
            <MapPin size={14} className="mr-1" />
            <span>{location}</span>
            <span className="mx-2">•</span>
            <span>{experience} years exp.</span>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-2">
            {skills.slice(0, 3).map((skill, index) => (
              <span 
                key={index} 
                className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              >
                {skill}
              </span>
            ))}
            {skills.length > 3 && (
              <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                +{skills.length - 3} more
              </span>
            )}
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <div className={`flex items-center px-2 py-1 rounded-full text-xs ${getAvailabilityColor(availability)}`}>
              <Clock size={12} className="mr-1" />
              <span>{availability === 'immediate' ? 'Immediate' : availability} availability</span>
            </div>
            
            <button 
              onClick={handleViewProfile}
              className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
            >
              View profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;