import React from 'react';
import { ProgressData } from '../../types';

type ClassProgressCardProps = {
  progress: ProgressData;
};

const ClassProgressCard: React.FC<ClassProgressCardProps> = ({ progress }) => {
  // Function to determine color based on completion rate
  const getProgressColor = (rate: number) => {
    if (rate >= 85) return 'bg-green-500';
    if (rate >= 70) return 'bg-blue-500';
    if (rate >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-gray-800">{progress.className}</h3>
        <span className="text-sm font-semibold text-gray-900">{progress.averageGrade}%</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
        <div 
          className={`h-2 rounded-full ${getProgressColor(progress.completionRate)}`} 
          style={{ width: `${progress.completionRate}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between text-xs text-gray-500">
        <span>Выполнение заданий</span>
        <span>{progress.completionRate}%</span>
      </div>
    </div>
  );
};

export default ClassProgressCard;