import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, LogOut, CheckCircle, AlertCircle, Clock, Menu, X, Bell } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { assignments } from '../data/mockData';

const StudentView: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'completed'>('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  // Filter assignments based on active tab
  const filteredAssignments = assignments.filter(assignment => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return assignment.status === 'published';
    if (activeTab === 'completed') return assignment.status === 'closed';
    return true;
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col">
      {/* Header */}
      <header className="bg-blue-900 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6" />
            <span className="text-xl font-semibold">РусУчитель</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-blue-800 relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center">2</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <span className="font-medium">{currentUser?.name}</span>
              <button 
                onClick={handleLogout}
                className="p-2 rounded-full hover:bg-blue-800"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
          
          <button className="md:hidden p-2" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={toggleMobileMenu}>
          <div className="absolute top-0 right-0 w-64 h-full bg-white shadow-lg" onClick={e => e.stopPropagation()}>
            <div className="p-4 flex flex-col h-full">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-6 w-6 text-blue-900" />
                  <span className="text-xl font-semibold text-blue-900">РусУчитель</span>
                </div>
                <button className="p-2" onClick={toggleMobileMenu}>
                  <X size={24} className="text-gray-700" />
                </button>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg mb-6">
                <div className="font-medium text-gray-800">{currentUser?.name}</div>
                <div className="text-sm text-gray-600">{currentUser?.email}</div>
              </div>
              
              <button 
                onClick={handleLogout}
                className="mt-auto flex items-center space-x-3 px-4 py-3 w-full text-left rounded-lg text-gray-700 hover:bg-gray-100"
              >
                <LogOut size={20} />
                <span>Выйти</span>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Привет, {currentUser?.name}!</h1>
          <p className="text-gray-600">
            Добро пожаловать в твой личный кабинет. Здесь ты можешь видеть все задания и отслеживать свой прогресс.
          </p>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('all')}
            className={`pb-4 px-6 font-medium ${
              activeTab === 'all'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Все задания
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`pb-4 px-6 font-medium ${
              activeTab === 'pending'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Ожидающие
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`pb-4 px-6 font-medium ${
              activeTab === 'completed'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Завершенные
          </button>
        </div>
        
        {/* Assignments */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssignments.map((assignment) => (
            <StudentAssignmentCard key={assignment.id} assignment={assignment} />
          ))}
          
          {filteredAssignments.length === 0 && (
            <div className="col-span-full text-center py-12">
              <div className="mx-auto flex justify-center">
                <BookOpen className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Нет заданий</h3>
              <p className="mt-2 text-gray-500">
                В данный момент у тебя нет активных заданий.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const StudentAssignmentCard: React.FC<{ assignment: any }> = ({ assignment }) => {
  // Random status for demonstration
  const statuses = ['pending', 'in_progress', 'submitted', 'graded'];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  
  // Format the due date
  const formattedDueDate = new Date(assignment.dueDate).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long'
  });
  
  // Get status icon and color
  const getStatusInfo = () => {
    switch (status) {
      case 'pending':
        return { 
          icon: <Clock className="h-5 w-5" />, 
          color: 'text-amber-600 bg-amber-50', 
          text: 'Ожидает выполнения' 
        };
      case 'in_progress':
        return { 
          icon: <AlertCircle className="h-5 w-5" />, 
          color: 'text-blue-600 bg-blue-50', 
          text: 'В процессе' 
        };
      case 'submitted':
        return { 
          icon: <CheckCircle className="h-5 w-5" />, 
          color: 'text-green-600 bg-green-50', 
          text: 'Отправлено' 
        };
      case 'graded':
        return { 
          icon: <CheckCircle className="h-5 w-5" />, 
          color: 'text-purple-600 bg-purple-50', 
          text: 'Оценено' 
        };
      default:
        return { 
          icon: <Clock className="h-5 w-5" />, 
          color: 'text-gray-600 bg-gray-50', 
          text: 'Неизвестно' 
        };
    }
  };
  
  const statusInfo = getStatusInfo();
  
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-200">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-800">{assignment.title}</h3>
          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
            {assignment.className}
          </span>
        </div>
        
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {assignment.description}
        </p>
        
        <div className="mt-4 flex items-center">
          <div className={`flex items-center px-3 py-1 rounded-full text-sm ${statusInfo.color}`}>
            {statusInfo.icon}
            <span className="ml-1">{statusInfo.text}</span>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-100 px-6 py-4 flex justify-between items-center bg-gray-50">
        <span className="text-sm text-gray-500">Срок: {formattedDueDate}</span>
        
        <button className="px-4 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors duration-200">
          {status === 'pending' || status === 'in_progress' ? 'Открыть' : 'Просмотреть'}
        </button>
      </div>
    </div>
  );
};

export default StudentView;