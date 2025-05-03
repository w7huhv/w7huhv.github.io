import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Loader } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Неверный email или пароль');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <BookOpen className="h-12 w-12 text-blue-900" />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">РусУчитель</h1>
          <p className="mt-2 text-gray-600">Портал учителя русского языка</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 text-red-600 p-3 rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="teacher@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Пароль
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="password"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-900 text-white py-3 px-4 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-70"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Вход...
                </span>
              ) : (
                'Войти'
              )}
            </button>
          </div>

          <div className="text-center text-sm text-gray-600">
            <p>Демо аккаунты:</p>
            <p className="mt-1">Учитель: teacher@example.com / password</p>
            <p>Ученик: student@example.com / password</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;