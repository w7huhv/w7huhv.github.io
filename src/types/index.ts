// Types for the application data

export type Student = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  classIds: string[];
};

export type Class = {
  id: string;
  name: string;
  description: string;
  studentCount: number;
  level: string;
};

export type Assignment = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  classId: string;
  className: string;
  status: 'draft' | 'published' | 'closed';
  type: 'grammar' | 'reading' | 'writing' | 'speaking' | 'vocabulary';
};

export type StudentTask = {
  id: string;
  assignmentId: string;
  studentId: string;
  status: 'pending' | 'in_progress' | 'submitted' | 'graded';
  grade?: number;
  feedback?: string;
  submittedAt?: string;
};

export type ProgressData = {
  classId: string;
  className: string;
  completionRate: number;
  averageGrade: number;
};