import React, { useState } from 'react';
import { Plus, Search, Users, BookOpen, GraduationCap } from 'lucide-react';
import { classes } from '../data/mockData';
import { Class } from '../types';

const ClassesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  
  const filteredClasses = classes.filter(
    (c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Управление классами</h1>
        
        <button 
          onClick={() => setShowAddClassModal(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          <Plus className="h-5 w-5 mr-2" />
          Добавить класс
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Поиск классов..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2">
            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="all">Все уровни</option>
              <option value="beginner">Начальный</option>
              <option value="intermediate">Средний</option>
              <option value="advanced">Продвинутый</option>
            </select>
            
            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="all">Сортировка</option>
              <option value="name">По названию</option>
              <option value="students">По кол-ву учеников</option>
            </select>
          </div>
        </div>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((classItem) => (
          <ClassCard key={classItem.id} classItem={classItem} />
        ))}
        
        {filteredClasses.length === 0 && (
          <div className="col-span-full text-center py-12">
            <div className="mx-auto flex justify-center">
              <BookOpen className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Классы не найдены</h3>
            <p className="mt-2 text-gray-500">
              Попробуйте изменить параметры поиска или создайте новый класс.
            </p>
          </div>
        )}
      </div>
      
      {/* Add Class Modal */}
      {showAddClassModal && (
        <AddClassModal onClose={() => setShowAddClassModal(false)} />
      )}
    </div>
  );
};

type ClassCardProps = {
  classItem: Class;
};

const ClassCard: React.FC<ClassCardProps> = ({ classItem }) => {
  // Different background colors based on level
  const getBgColor = () => {
    switch (classItem.level) {
      case 'Начальный':
        return 'bg-green-50 border-green-200';
      case 'Средний':
        return 'bg-blue-50 border-blue-200';
      case 'Продвинутый':
        return 'bg-purple-50 border-purple-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className={`rounded-xl border ${getBgColor()} overflow-hidden transition-all duration-200 hover:shadow-md`}>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800">{classItem.name}</h3>
          <span className="text-xs px-2 py-1 bg-white rounded-full border border-gray-200 text-gray-600">
            {classItem.level}
          </span>
        </div>
        
        <p className="mt-2 text-gray-600 text-sm">{classItem.description}</p>
        
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <Users className="h-4 w-4 mr-1" />
          <span>{classItem.studentCount} учеников</span>
        </div>
      </div>
      
      <div className="border-t border-gray-200 bg-white px-6 py-3 flex justify-between">
        <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
          <Users className="h-4 w-4 mr-1" />
          Ученики
        </button>
        
        <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
          <GraduationCap className="h-4 w-4 mr-1" />
          Задания
        </button>
      </div>
    </div>
  );
};

type AddClassModalProps = {
  onClose: () => void;
};

const AddClassModal: React.FC<AddClassModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={onClose}
            >
              <span className="sr-only">Закрыть</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Добавить новый класс
              </h3>
              
              <div className="mt-4 space-y-4">
                <div>
                  <label htmlFor="class-name" className="block text-sm font-medium text-gray-700">
                    Название класса
                  </label>
                  <input
                    type="text"
                    id="class-name"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Например: 5А класс"
                  />
                </div>
                
                <div>
                  <label htmlFor="class-description" className="block text-sm font-medium text-gray-700">
                    Описание
                  </label>
                  <textarea
                    id="class-description"
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Краткое описание класса"
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="class-level" className="block text-sm font-medium text-gray-700">
                    Уровень
                  </label>
                  <select
                    id="class-level"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="beginner">Начальный</option>
                    <option value="intermediate">Средний</option>
                    <option value="advanced">Продвинутый</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Создать класс
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassesPage;