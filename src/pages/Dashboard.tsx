import React from 'react';
import { ChevronRight, BookOpen, Users, ClipboardList, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { assignments, progressData, classes } from '../data/mockData';

// Components
import ClassProgressCard from '../components/dashboard/ClassProgressCard';
import RecentAssignmentCard from '../components/dashboard/RecentAssignmentCard';
import StatCard from '../components/dashboard/StatCard';

const Dashboard: React.FC = () => {
  // Get recent assignments (published only, sorted by due date)
  const recentAssignments = [...assignments]
    .filter(a => a.status === 'published')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Панель управления</h1>
        <span className="text-sm text-gray-500">
          {new Date().toLocaleDateString('ru-RU', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </span>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Всего классов" 
          value={classes.length} 
          icon={<Users className="h-8 w-8 text-blue-700" />} 
          change={"+1 за последний месяц"} 
          changeType="positive"
        />
        <StatCard 
          title="Всего учеников" 
          value={26} 
          icon={<BookOpen className="h-8 w-8 text-green-600" />} 
          change={"+3 за последний месяц"} 
          changeType="positive"
        />
        <StatCard 
          title="Активных заданий" 
          value={assignments.filter(a => a.status === 'published').length} 
          icon={<ClipboardList className="h-8 w-8 text-amber-600" />} 
          change={"2 скоро истекают"} 
          changeType="warning"
        />
        <StatCard 
          title="Средняя успеваемость" 
          value="85%" 
          icon={<BarChart3 className="h-8 w-8 text-purple-600" />} 
          change={"+2% к прошлому семестру"} 
          changeType="positive"
        />
      </div>
      
      {/* Recent Activities and Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Assignments */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Недавние задания</h2>
            <Link 
              to="/assignments" 
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
            >
              Все задания
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentAssignments.map((assignment) => (
              <RecentAssignmentCard key={assignment.id} assignment={assignment} />
            ))}
            
            {recentAssignments.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Нет активных заданий
              </div>
            )}
          </div>
        </div>
        
        {/* Class Progress */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Успеваемость классов</h2>
            <Link 
              to="/classes" 
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
            >
              Все классы
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {progressData.map((progress) => (
              <ClassProgressCard key={progress.classId} progress={progress} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;