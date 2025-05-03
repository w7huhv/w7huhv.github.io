import React from 'react';
import { Assignment } from '../../types';
import { BookOpen, GraduationCap, Pencil, MessageSquare, BookText } from 'lucide-react';

type RecentAssignmentCardProps = {
  assignment: Assignment;
};

const RecentAssignmentCard: React.FC<RecentAssignmentCardProps> = ({ assignment }) => {
  // Format the due date
  const formattedDueDate = new Date(assignment.dueDate).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long'
  });
  
  // Calculate days remaining
  const today = new Date();
  const dueDate = new Date(assignment.dueDate);
  const daysRemaining = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  // Determine status color and text
  const getStatusInfo = () => {
    if (daysRemaining < 0) {
      return { color: 'text-red-600 bg-red-50', text: 'Просрочено' };
    }
    if (daysRemaining <= 2) {
      return { color: 'text-amber-600 bg-amber-50', text: 'Скоро' };
    }
    return { color: 'text-green-600 bg-green-50', text: `${daysRemaining} дн.` };
  };
  
  // Get assignment type icon
  const getTypeIcon = () => {
    switch (assignment.type) {
      case 'grammar':
        return <GraduationCap className="h-5 w-5" />;
      case 'reading':
        return <BookOpen className="h-5 w-5" />;
      case 'writing':
        return <Pencil className="h-5 w-5" />;
      case 'speaking':
        return <MessageSquare className="h-5 w-5" />;
      case 'vocabulary':
        return <BookText className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };
  
  // Get assignment type color
  const getTypeColor = () => {
    switch (assignment.type) {
      case 'grammar':
        return 'text-purple-600 bg-purple-50';
      case 'reading':
        return 'text-blue-600 bg-blue-50';
      case 'writing':
        return 'text-green-600 bg-green-50';
      case 'speaking':
        return 'text-amber-600 bg-amber-50';
      case 'vocabulary':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const statusInfo = getStatusInfo();
  const typeColor = getTypeColor();

  return (
    <div className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className={`p-2 rounded-lg ${typeColor}`}>
            {getTypeIcon()}
          </div>
          
          <div>
            <h3 className="font-medium text-gray-800">{assignment.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{assignment.className}</p>
          </div>
        </div>
        
        <div className={`px-2 py-1 rounded-md text-xs font-medium ${statusInfo.color}`}>
          {statusInfo.text}
        </div>
      </div>
      
      <div className="mt-3 text-sm text-gray-600 line-clamp-2">
        {assignment.description}
      </div>
      
      <div className="mt-3 flex justify-between items-center text-sm">
        <span className="text-gray-500">Срок: {formattedDueDate}</span>
        
        <button className="text-blue-600 hover:text-blue-800 font-medium">
          Подробнее
        </button>
      </div>
    </div>
  );
};

export default RecentAssignmentCard;