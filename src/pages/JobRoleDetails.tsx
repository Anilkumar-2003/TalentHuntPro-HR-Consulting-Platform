import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import { MapPin, Users, DollarSign, Calendar } from 'lucide-react';

const JobRoleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [jobData, setJobData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobRole = async () => {
      try {
        const data = await api.jobRoles.getById(id!);
        setJobData(data);
      } catch (error) {
        console.error('Error fetching job role:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobRole();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!jobData) {
    return <div>Job role not found</div>;
  }

  const { role, applications } = jobData;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{role.title}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">{role.department}</p>
          </div>
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">
            {role.openings} {role.openings === 1 ? 'opening' : 'openings'}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <MapPin size={18} className="mr-2" />
            {role.location}
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Users size={18} className="mr-2" />
            {role.applicants} applicants
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <DollarSign size={18} className="mr-2" />
            {role.salary.currency}{role.salary.min.toLocaleString()} - {role.salary.currency}{role.salary.max.toLocaleString()}
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Calendar size={18} className="mr-2" />
            {role.experience}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Applied Candidates</h2>
          <div className="space-y-4">
            {applications.map((app: any) => (
              <div key={app.id} className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <img 
                  src={app.candidate.image} 
                  alt={app.candidate.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{app.candidate.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{app.candidate.role}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {app.candidate.skills.slice(0, 3).map((skill: string, index: number) => (
                      <span 
                        key={index}
                        className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Required Skills</h2>
          <div className="flex flex-wrap gap-2">
            {role.skills.map((skill: string, index: number) => (
              <span 
                key={index}
                className="px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobRoleDetails;