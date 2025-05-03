import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ClassesPage from './pages/ClassesPage';
import AssignmentsPage from './pages/AssignmentsPage';
import StudentsPage from './pages/StudentsPage';
import StudentView from './pages/StudentView';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/student" element={<StudentView />} />
          
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/classes" element={<ClassesPage />} />
              <Route path="/assignments" element={<AssignmentsPage />} />
              <Route path="/students" element={<StudentsPage />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>
          
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;