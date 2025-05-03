import { Student, Class, Assignment, StudentTask, ProgressData } from '../types';

// Mock classes
export const classes: Class[] = [
  {
    id: '1',
    name: '5А класс',
    description: 'Базовый курс русского языка',
    studentCount: 22,
    level: 'Начальный',
  },
  {
    id: '2',
    name: '7Б класс',
    description: 'Средний курс грамматики и письма',
    studentCount: 18,
    level: 'Средний',
  },
  {
    id: '3',
    name: '9В класс',
    description: 'Подготовка к выпускным экзаменам',
    studentCount: 20,
    level: 'Продвинутый',
  },
  {
    id: '4',
    name: '10А класс',
    description: 'Углубленное изучение литературы',
    studentCount: 15,
    level: 'Продвинутый',
  },
];

// Mock students
export const students: Student[] = [
  {
    id: '1',
    name: 'Иван Смирнов',
    email: 'ivan@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    classIds: ['1', '3'],
  },
  {
    id: '2',
    name: 'Мария Попова',
    email: 'maria@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=5',
    classIds: ['1'],
  },
  {
    id: '3',
    name: 'Алексей Кузнецов',
    email: 'alex@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
    classIds: ['2'],
  },
  {
    id: '4',
    name: 'Екатерина Соколова',
    email: 'kate@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=9',
    classIds: ['2', '4'],
  },
  {
    id: '5',
    name: 'Дмитрий Новиков',
    email: 'dmitry@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=8',
    classIds: ['3'],
  },
  {
    id: '6',
    name: 'Анна Морозова',
    email: 'anna@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=4',
    classIds: ['3', '4'],
  },
  {
    id: '7',
    name: 'Сергей Волков',
    email: 'sergey@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=6',
    classIds: ['1'],
  },
  {
    id: '8',
    name: 'Ольга Павлова',
    email: 'olga@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=10',
    classIds: ['4'],
  },
];

// Mock assignments
export const assignments: Assignment[] = [
  {
    id: '1',
    title: 'Правописание гласных в корне',
    description: 'Упражнения на правописание безударных гласных в корне слова.',
    dueDate: '2025-02-15',
    classId: '1',
    className: '5А класс',
    status: 'published',
    type: 'grammar',
  },
  {
    id: '2',
    title: 'Анализ стихотворения А.С. Пушкина',
    description: 'Прочитать и сделать анализ стихотворения "Я вас любил".',
    dueDate: '2025-02-20',
    classId: '3',
    className: '9В класс',
    status: 'published',
    type: 'reading',
  },
  {
    id: '3',
    title: 'Сочинение на тему "Мой город"',
    description: 'Написать сочинение о своем городе объемом не менее 300 слов.',
    dueDate: '2025-02-28',
    classId: '2',
    className: '7Б класс',
    status: 'draft',
    type: 'writing',
  },
  {
    id: '4',
    title: 'Подготовка к диктанту',
    description: 'Повторить правила и потренироваться перед итоговым диктантом.',
    dueDate: '2025-03-05',
    classId: '1',
    className: '5А класс',
    status: 'published',
    type: 'grammar',
  },
  {
    id: '5',
    title: 'Разбор романа Толстого "Война и мир"',
    description: 'Подготовить анализ основных персонажей и их взаимоотношений.',
    dueDate: '2025-03-15',
    classId: '4',
    className: '10А класс',
    status: 'published',
    type: 'reading',
  },
];

// Mock student tasks
export const studentTasks: StudentTask[] = [
  {
    id: '1',
    assignmentId: '1',
    studentId: '1',
    status: 'submitted',
    submittedAt: '2025-02-10',
  },
  {
    id: '2',
    assignmentId: '1',
    studentId: '2',
    status: 'graded',
    grade: 85,
    feedback: 'Хорошая работа, но есть несколько ошибок.',
    submittedAt: '2025-02-12',
  },
  {
    id: '3',
    assignmentId: '2',
    studentId: '5',
    status: 'in_progress',
  },
  {
    id: '4',
    assignmentId: '4',
    studentId: '1',
    status: 'pending',
  },
  {
    id: '5',
    assignmentId: '5',
    studentId: '8',
    status: 'submitted',
    submittedAt: '2025-03-02',
  },
];

// Mock progress data
export const progressData: ProgressData[] = [
  {
    classId: '1',
    className: '5А класс',
    completionRate: 75,
    averageGrade: 82,
  },
  {
    classId: '2',
    className: '7Б класс',
    completionRate: 60,
    averageGrade: 78,
  },
  {
    classId: '3',
    className: '9В класс',
    completionRate: 85,
    averageGrade: 88,
  },
  {
    classId: '4',
    className: '10А класс',
    completionRate: 90,
    averageGrade: 92,
  },
];