import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Briefcase, DollarSign, Award } from 'lucide-react';
import MetricCard from '../components/common/MetricCard';
import ChartCard from '../components/common/ChartCard';
import CandidateCard from '../components/common/CandidateCard';
import { mockMetrics, mockCandidates, talentTrendsData, skillDemandData, salaryTrendsData } from '../data/mockData';
import { exportDashboardAsPDF } from '../utils/pdfExport';
import toast from 'react-hot-toast';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users':
        return <Users size={20} />;
      case 'Briefcase':
        return <Briefcase size={20} />;
      case 'DollarSign':
        return <DollarSign size={20} />;
      case 'Award':
        return <Award size={20} />;
      default:
        return null;
    }
  };

  const handleExport = async () => {
    toast.promise(exportDashboardAsPDF(), {
      loading: 'Generating PDF...',
      success: 'Dashboard exported successfully!',
      error: 'Failed to export dashboard'
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Welcome back! Here's what's happening with your talent pipeline.
          </p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleExport}
            className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white transition-colors"
          >
            Export data
          </button>
          {/* <button className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white transition-colors">
            View Reports
          </button> */}
        </div>
      </div>

      <div id="dashboard-metrics" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockMetrics.map((metric, index) => (
            <MetricCard 
              key={index} 
              metric={{
                ...metric,
                icon: renderIcon(metric.icon)
              }} 
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ChartCard
            title="Talent Acquisition Trends"
            subtitle="Applications and hires over the last 6 months"
            type="line"
            data={talentTrendsData}
            className="lg:col-span-2"
          />
          <ChartCard
            title="Skill Demand"
            subtitle="Most sought-after skills"
            type="bar"
            data={skillDemandData}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard
          title="Salary Trends by Department"
          subtitle="Average salaries over the last 6 months"
          type="bar"
          data={salaryTrendsData}
        />
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-card p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Candidates</h3>
          <button
            className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline"
            onClick={() => navigate('/candidates')}
          >
            View all
          </button>
        </div>
        <div className="space-y-4">
          {/* Static candidate 1 */}
          <CandidateCard
            candidate={{
              id: "static1",
              name: "Ananya Roy",
              role: "UI/UX Designer",
              location: "Delhi, India",
              experience: 2,
              skills: ["Figma", "Adobe XD", "User Research"],
              availability: "immediate",
              rating: 4.6,
              salary: 72000,
              image: ""
            }}
          />
          {/* Static candidate 2 */}
          <CandidateCard
            candidate={{
          id: "static2",
          name: "Rajesh Kumar", 
          role: "Full Stack Developer",
          location: "Bangalore, India",
          experience: 5,
          skills: ["React", "Node.js", "MongoDB"],
          availability: "1-month",
          rating: 4.8,
          salary: 95000,
          image: ""
            }}
          />
        </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-card p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
          <button className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline">
            View all
          </button>
        </div>
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
          <div className="space-y-6">
            {[
              { 
                title: 'New candidate applied', 
                description: 'Michael Chen applied for UI/UX Designer position', 
                time: '2 hours ago',
                icon: <Users size={16} className="text-primary-600" /> 
              },
              { 
                title: 'Salary benchmark updated', 
                description: 'Engineering roles in San Francisco increased by 4.5%', 
                time: '5 hours ago',
                icon: <DollarSign size={16} className="text-secondary-600" /> 
              },
              { 
                title: 'New job role added', 
                description: 'Product Manager position opened in London office', 
                time: '1 day ago',
                icon: <Briefcase size={16} className="text-accent-600" /> 
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-start ml-4 pl-6 relative">
                <div className="absolute -left-6 mt-1 rounded-full w-5 h-5 bg-white dark:bg-gray-800 flex items-center justify-center z-10 border-2 border-gray-200 dark:border-gray-700">
                  {activity.icon}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">{activity.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{activity.description}</p>
                  <span className="text-xs text-gray-500 dark:text-gray-500 mt-1">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
