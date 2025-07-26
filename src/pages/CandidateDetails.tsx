import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import { Candidate } from '../types';
import { MapPin, Mail, Phone, Calendar, Star, Briefcase } from 'lucide-react';

const CandidateDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const data = await api.candidates.getById(id!);
        setCandidate(data);
      } catch (error) {
        console.error('Error fetching candidate:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidate();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!candidate) {
    return <div>Candidate not found</div>;
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <img 
            src={candidate.image}
            alt={candidate.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
          />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{candidate.name}</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">{candidate.role}</p>
              </div>
              <div className="flex items-center">
                <Star className="text-yellow-400 fill-yellow-400" size={20} />
                <span className="ml-1 font-medium">{candidate.rating.toFixed(1)}</span>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <MapPin size={18} className="mr-2" />
                {candidate.location}
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Briefcase size={18} className="mr-2" />
                {candidate.experience} years experience
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Calendar size={18} className="mr-2" />
                {candidate.availability} availability
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Mail size={18} className="mr-2" />
                {candidate.name.toLowerCase().replace(' ', '.')}@example.com
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {candidate.skills.map((skill, index) => (
              <span 
                key={index}
                className="px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Experience Details</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Current Role</h3>
              <p className="text-gray-600 dark:text-gray-400">{candidate.role}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Expected Salary</h3>
              <p className="text-gray-600 dark:text-gray-400">${candidate.salary.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetails;