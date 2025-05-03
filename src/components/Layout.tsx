import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, BookOpen, ClipboardList, 
  User, LogOut, Menu, X, Bell 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Layout: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigationItems = [
    { path: '/dashboard', label: 'Панель', icon: <LayoutDashboard size={20} /> },
    { path: '/classes', label: 'Классы', icon: <Users size={20} /> },
    { path: '/assignments', label: 'Задания', icon: <ClipboardList size={20} /> },
    { path: '/students', label: 'Ученики', icon: <BookOpen size={20} /> },
    { path: '/profile', label: 'Профиль', icon: <User size={20} /> },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-amber-50">
      {/* Header */}
      <header className="bg-blue-900 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6" />
            <span className="text-xl font-semibold">РусУчитель</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-blue-800 relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center">3</span>
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
      
      <div className="flex flex-1">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:block w-64 bg-white shadow-md">
          <nav className="p-4 flex flex-col h-full">
            <ul className="space-y-2 flex-1">
              {navigationItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
                      location.pathname === item.path
                        ? 'bg-blue-100 text-blue-900'
                        : 'text-gray-700 hover:bg-gray-100'
                    } transition-colors duration-200`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="pt-4 border-t border-gray-200">
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-3 px-4 py-3 w-full text-left rounded-lg text-gray-700 hover:bg-gray-100"
              >
                <LogOut size={20} />
                <span>Выйти</span>
              </button>
            </div>
          </nav>
        </aside>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={toggleMobileMenu}>
            <div className="absolute top-0 left-0 w-64 h-full bg-white shadow-lg" onClick={e => e.stopPropagation()}>
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
                
                <ul className="space-y-2 flex-1">
                  {navigationItems.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
                          location.pathname === item.path
                            ? 'bg-blue-100 text-blue-900'
                            : 'text-gray-700 hover:bg-gray-100'
                        } transition-colors duration-200`}
                        onClick={toggleMobileMenu}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                
                <div className="pt-4 border-t border-gray-200">
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-3 w-full text-left rounded-lg text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut size={20} />
                    <span>Выйти</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;