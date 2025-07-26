import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { MetricCard as MetricCardType } from '../../types';

interface MetricCardProps {
  metric: MetricCardType;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  const { title, value, change, icon, color } = metric;
  
  const isPositive = change >= 0;
  const IconComponent = isPositive ? ArrowUpRight : ArrowDownRight;
  const changeColor = isPositive ? 'text-success-600' : 'text-error-600';
  const bgColorClass = `bg-${color}-50 dark:bg-${color}-900/20`;
  const textColorClass = `text-${color}-600 dark:text-${color}-400`;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-card hover:shadow-cardHover p-6 transition-all duration-300 cursor-pointer">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <h3 className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">{value}</h3>
          
          <div className="mt-2 flex items-center">
            <IconComponent className={`${changeColor} mr-1`} size={16} />
            <span className={`text-sm font-medium ${changeColor}`}>
              {Math.abs(change)}%
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
              vs last month
            </span>
          </div>
        </div>
        
        <div className={`p-3 rounded-lg ${bgColorClass}`}>
          <span className={textColorClass}>
            {/* Here we would render the icon based on icon name */}
            {icon}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;