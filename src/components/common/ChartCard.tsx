import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartData,
  ChartOptions
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ChartCardProps {
  title: string;
  subtitle?: string;
  type: 'line' | 'bar' | 'doughnut';
  data: ChartData<'line' | 'bar' | 'doughnut', number[], string>;
  options?: ChartOptions<'line' | 'bar' | 'doughnut'>;
  className?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  type,
  data,
  options,
  className = ''
}) => {
  const defaultOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            family: 'Inter, sans-serif',
            size: 12
          },
          color: '#6B7280',
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1F2937',
        bodyColor: '#4B5563',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        padding: 12,
        bodyFont: {
          family: 'Inter, sans-serif'
        },
        titleFont: {
          family: 'Inter, sans-serif',
          weight: 'bold'
        },
        boxWidth: 10,
        boxHeight: 10,
        usePointStyle: true
      }
    },
    scales: type !== 'doughnut' ? {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: 'Inter, sans-serif',
            size: 12
          },
          color: '#9CA3AF'
        }
      },
      y: {
        grid: {
          borderDash: [2, 4],
          color: '#E5E7EB'
        },
        ticks: {
          font: {
            family: 'Inter, sans-serif',
            size: 12
          },
          color: '#9CA3AF',
          padding: 10
        }
      }
    } : undefined
  };

  const mergedOptions = { ...defaultOptions, ...options };

  const renderChart = () => {
    switch (type) {
      case 'line':
        return <Line data={data} options={mergedOptions} />;
      case 'bar':
        return <Bar data={data} options={mergedOptions} />;
      case 'doughnut':
        return <Doughnut data={data} options={mergedOptions} />;
      default:
        return null;
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-card p-6 ${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
      </div>
      <div className="h-64">
        {renderChart()}
      </div>
    </div>
  );
};

export default ChartCard;