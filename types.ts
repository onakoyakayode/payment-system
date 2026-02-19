
// Import React to provide the React namespace for React.ReactNode used in StatCard
import React from 'react';

export type Role = 'ADMIN' | 'TEACHER' | 'STUDENT';
export type Level = '100L' | '200L' | '300L' | '400L' | '500L' | 'ND1' | 'ND2' | 'HND1' | 'HND2';
export type Gender = 'Male' | 'Female' | 'Other';

export interface User {
  id: string;
  name: string;
  role: Role;
  email: string;
  avatar: string;
  department?: string;
  studentId?: string;
  matricNumber?: string;
  level?: Level;
  gender?: Gender;
  phoneNumber?: string;
  address?: string;
  enrollmentDate?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  category: string;
  enrolled: number;
  duration: string;
  lessons: Lesson[];
  quizzes: Quiz[];
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  type: 'VIDEO' | 'TEXT' | 'PDF';
  duration: string;
  completed?: boolean;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface StatCard {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
}

export interface FeeItem {
  id: string;
  name: string;
  amount: number;
  description: string;
  category: 'TUITION' | 'ACCEPTANCE' | 'FACULTY' | 'ACCOMMODATION';
}

export interface Transaction {
  id: string;
  reference: string;
  amount: number;
  date: string;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  feeType: string;
}

export interface PaymentRecord {
  id: string;
  studentName: string;
  studentId: string;
  feeName: string;
  totalAmount: number;
  amountPaid: number;
  balance: number;
  status: 'PAID' | 'PARTIAL' | 'UNPAID';
  lastPaymentDate: string;
}

export type View = 'DASHBOARD' | 'COURSES' | 'SCHEDULE' | 'GRADES' | 'STUDENTS' | 'REPORTS' | 'QUIZ_MAKER' | 'COURSE_DETAILS' | 'SETTINGS' | 'PAYMENTS';
