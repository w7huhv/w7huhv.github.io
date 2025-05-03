import React, { createContext, useContext, useState, ReactNode } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'teacher' | 'student';
};

type AuthContextType = {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock login function - in a real app, this would connect to a backend
  async function login(email: string, password: string) {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo teacher user
      if (email === 'teacher@example.com' && password === 'password') {
        setCurrentUser({
          id: '1',
          name: 'Анна Петрова',
          email: 'teacher@example.com',
          role: 'teacher'
        });
      } 
      // Demo student user
      else if (email === 'student@example.com' && password === 'password') {
        setCurrentUser({
          id: '2',
          name: 'Иван Смирнов',
          email: 'student@example.com',
          role: 'student'
        });
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  function logout() {
    setCurrentUser(null);
  }

  const value = {
    currentUser,
    login,
    logout,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}