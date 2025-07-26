import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Briefcase } from 'lucide-react';

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const getRoleDisplay = (role: string) => {
    return role === 'hr' ? 'HR Manager' : 'Guest User';
  };

  const getRoleDescription = (role: string) => {
    return role === 'hr' 
      ? 'Full access to candidate management and analytics' 
      : 'Limited access to job roles and market data';
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600 dark:text-gray-400">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <img 
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0D8ABC&color=fff&size=150`}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">{getRoleDisplay(user.role)}</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">{getRoleDescription(user.role)}</p>
            <div className="mt-4 flex flex-wrap gap-4">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Mail size={16} className="mr-2" />
                {user.email}
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Calendar size={16} className="mr-2" />
                Member since {new Date(user.created_at || Date.now()).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Account Information</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <User className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-1 mr-3" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Account Type</h3>
                <p className="text-gray-600 dark:text-gray-400">{getRoleDisplay(user.role)}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Briefcase className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-1 mr-3" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Access Level</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {user.role === 'hr' ? 'Full Platform Access' : 'Limited Access'}
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-1 mr-3" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Member Since</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {new Date(user.created_at || Date.now()).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Account Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Notifications
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-primary-600" defaultChecked />
                  <span className="ml-2 text-gray-600 dark:text-gray-400">
                    {user.role === 'hr' ? 'New candidate matches' : 'New job postings'}
                  </span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-primary-600" defaultChecked />
                  <span className="ml-2 text-gray-600 dark:text-gray-400">Report updates</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Theme Preference
              </label>
              <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white">
                <option>System default</option>
                <option>Light</option>
                <option>Dark</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            {
              action: user.role === 'hr' ? "Viewed candidate profiles" : "Browsed job roles",
              date: "2 hours ago",
              icon: <User className="text-primary-600" />
            },
            {
              action: user.role === 'hr' ? "Updated candidate status" : "Viewed job details",
              date: "Yesterday",
              icon: <Briefcase className="text-secondary-600" />
            },
            {
              action: "Updated profile settings",
              date: "3 days ago",
              icon: <Calendar className="text-accent-600" />
            }
          ].map((activity, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                {activity.icon}
              </div>
              <div>
                <p className="text-gray-900 dark:text-white font-medium">{activity.action}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;