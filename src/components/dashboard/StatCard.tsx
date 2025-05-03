import React from 'react';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral' | 'warning';
};

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, changeType }) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      case 'warning':
        return 'text-amber-600';
      default:
        return 'text-gray-600';
    }
  };

  const getChangeIcon = () => {
    switch (changeType) {
      case 'positive':
        return <ArrowUp className="h-3 w-3" />;
      case 'negative':
        return <ArrowDown className="h-3 w-3" />;
      default:
        return <Minus className="h-3 w-3" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-200 hover:shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg">
          {icon}
        </div>
      </div>
      <div className={`mt-4 flex items-center text-sm ${getChangeColor()}`}>
        {getChangeIcon()}
        <span className="ml-1">{change}</span>
      </div>
    </div>
  );
};

export default StatCard;