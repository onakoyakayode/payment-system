
import React from 'react';
import { LayoutDashboard, BookOpen, Calendar, GraduationCap, Users, BarChart3, Settings, PenTool, CreditCard } from 'lucide-react';
import { Course, User, FeeItem, PaymentRecord } from './types';

export const MOCK_USERS: Record<string, User> = {
  student: {
    id: 's1',
    name: 'Alex Thompson',
    role: 'STUDENT',
    email: 'alex.t@university.ca',
    avatar: 'https://i.pravatar.cc/150?u=alex',
    department: 'Computer Engineering',
    studentId: 'STU-2024-001',
    matricNumber: 'ENG/2024/001',
    level: '100L',
    gender: 'Male',
    phoneNumber: '+1 (555) 012-3456',
    enrollmentDate: '2024-09-01'
  },
  admin: {
    id: 'a1',
    name: 'Dr. Sarah Miller',
    role: 'ADMIN',
    email: 'admin@university.ca',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    department: 'Administration',
  }
};

export const MOCK_STUDENTS: User[] = [
  { ...MOCK_USERS.student },
  {
    id: 's2',
    name: 'Maria Garcia',
    role: 'STUDENT',
    email: 'm.garcia@university.ca',
    avatar: 'https://i.pravatar.cc/150?u=maria',
    department: 'Architecture',
    studentId: 'STU-2024-002',
    matricNumber: 'ARC/2024/002',
    level: '200L',
    gender: 'Female',
    phoneNumber: '+1 (555) 012-3457',
    enrollmentDate: '2023-09-01'
  },
  {
    id: 's3',
    name: 'Jordan Lee',
    role: 'STUDENT',
    email: 'j.lee@university.ca',
    avatar: 'https://i.pravatar.cc/150?u=jordan',
    department: 'Economics',
    studentId: 'STU-2024-003',
    matricNumber: 'ECN/2024/003',
    level: '400L',
    gender: 'Male',
    phoneNumber: '+1 (555) 012-3458',
    enrollmentDate: '2021-09-01'
  },
  {
    id: 's4',
    name: 'Sophie Chen',
    role: 'STUDENT',
    email: 's.chen@university.ca',
    avatar: 'https://i.pravatar.cc/150?u=sophie',
    department: 'Computer Engineering',
    studentId: 'STU-2024-004',
    matricNumber: 'ENG/2024/004',
    level: '100L',
    gender: 'Female',
    phoneNumber: '+1 (555) 012-3459',
    enrollmentDate: '2024-09-01'
  },
  {
    id: 's5',
    name: 'Marcus Vane',
    role: 'STUDENT',
    email: 'm.vane@university.ca',
    avatar: 'https://i.pravatar.cc/150?u=marcus',
    department: 'Economics',
    studentId: 'STU-2024-005',
    matricNumber: 'ECN/2024/005',
    level: '300L',
    gender: 'Male',
    phoneNumber: '+1 (555) 012-3460',
    enrollmentDate: '2022-09-01'
  },
  {
    id: 's6',
    name: 'Elena Rodriguez',
    role: 'STUDENT',
    email: 'e.rod@university.ca',
    avatar: 'https://i.pravatar.cc/150?u=elena',
    department: 'Mechanical Engineering',
    studentId: 'STU-2024-006',
    matricNumber: 'MEC/2024/006',
    level: '400L',
    gender: 'Female',
    phoneNumber: '+1 (555) 012-3461',
    enrollmentDate: '2021-09-01'
  }
];

export const COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Advanced Neural Networks',
    description: 'Explore deep learning architectures and optimization techniques.',
    instructor: 'Prof. Julian Sterling',
    thumbnail: 'https://picsum.photos/seed/nn/400/225',
    category: 'Computer Science',
    enrolled: 124,
    duration: '12 Weeks',
    lessons: [
      { id: 'l1', title: 'Introduction to CNNs', content: '...', type: 'VIDEO', duration: '15:00' },
      { id: 'l2', title: 'Recurrent Neural Networks', content: '...', type: 'TEXT', duration: '30:00' }
    ],
    quizzes: []
  },
  {
    id: 'c2',
    title: 'Modern Architecture',
    description: 'A study of sustainable urban development in the 21st century.',
    instructor: 'Dr. Sarah Chen',
    thumbnail: 'https://picsum.photos/seed/arch/400/225',
    category: 'Architecture',
    enrolled: 86,
    duration: '10 Weeks',
    lessons: [],
    quizzes: []
  }
];

export const AVAILABLE_FEES: FeeItem[] = [
  { id: 'f1', name: 'Tuition Fees (Semester 1)', amount: 4500.00, description: 'Mandatory tuition for the Fall 2024 session.', category: 'TUITION' },
  { id: 'f2', name: 'Campus Facilities Fee', amount: 250.00, description: 'Access to gym, library, and lab facilities.', category: 'ACCEPTANCE' },
  { id: 'f3', name: 'Student Union Dues', amount: 85.50, description: 'Supports student associations and events.', category: 'FACULTY' },
  { id: 'f4', name: 'Residence & Housing', amount: 3200.00, description: 'On-campus accommodation for the semester.', category: 'ACCOMMODATION' }
];

export const MOCK_PAYMENT_RECORDS: PaymentRecord[] = [
  { id: 'r1', studentName: 'Alex Thompson', studentId: 'STU-2024-001', feeName: 'Tuition Fees', totalAmount: 4500.00, amountPaid: 2500.00, balance: 2000.00, status: 'PARTIAL', lastPaymentDate: '2024-10-01' },
  { id: 'r2', studentName: 'Maria Garcia', studentId: 'STU-2024-002', feeName: 'Tuition Fees', totalAmount: 4500.00, amountPaid: 4500.00, balance: 0, status: 'PAID', lastPaymentDate: '2024-09-15' },
  { id: 'r3', studentName: 'Jordan Lee', studentId: 'STU-2024-003', feeName: 'Residence & Housing', totalAmount: 3200.00, amountPaid: 0, balance: 3200.00, status: 'UNPAID', lastPaymentDate: 'N/A' },
  { id: 'r4', studentName: 'Sophie Chen', studentId: 'STU-2024-004', feeName: 'Tuition Fees', totalAmount: 4500.00, amountPaid: 4500.00, balance: 0, status: 'PAID', lastPaymentDate: '2024-09-20' },
  { id: 'r5', studentName: 'Marcus Vane', studentId: 'STU-2024-005', feeName: 'Campus Facilities Fee', totalAmount: 250.00, amountPaid: 250.00, balance: 0, status: 'PAID', lastPaymentDate: '2024-10-05' },
];

export const NAV_ITEMS = [
  { id: 'DASHBOARD', label: 'Dashboard', icon: <LayoutDashboard size={20} />, roles: ['ADMIN', 'TEACHER', 'STUDENT'] },
  { id: 'COURSES', label: 'Courses', icon: <BookOpen size={20} />, roles: ['ADMIN', 'TEACHER', 'STUDENT'] },
  { id: 'PAYMENTS', label: 'Finance', icon: <CreditCard size={20} />, roles: ['STUDENT', 'ADMIN'] },
  { id: 'STUDENTS', label: 'Student Directory', icon: <Users size={20} />, roles: ['ADMIN', 'TEACHER'] },
  { id: 'REPORTS', label: 'Analytics', icon: <BarChart3 size={20} />, roles: ['ADMIN'] },
  { id: 'QUIZ_MAKER', label: 'Quiz Center', icon: <PenTool size={20} />, roles: ['TEACHER'] },
  { id: 'SETTINGS', label: 'Settings', icon: <Settings size={20} />, roles: ['ADMIN', 'TEACHER', 'STUDENT'] },
];
