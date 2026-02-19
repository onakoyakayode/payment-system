
'use client';

import React from 'react';
import { Users, BookOpen, GraduationCap, Clock, ArrowRight, MessageSquare, TrendingUp, DollarSign, Activity, FileText, PieChart } from 'lucide-react';
import StatCard from '../../components/StatCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { User } from '../../types';

interface DashboardPageProps {
  user: User;
}

const adminData = [
  { name: 'Jan', revenue: 45000 },
  { name: 'Feb', revenue: 52000 },
  { name: 'Mar', revenue: 48000 },
  { name: 'Apr', revenue: 61000 },
  { name: 'May', revenue: 55000 },
  { name: 'Jun', revenue: 67000 },
];

const studentData = [
  { name: 'Week 1', hours: 12 },
  { name: 'Week 2', hours: 18 },
  { name: 'Week 3', hours: 15 },
  { name: 'Week 4', hours: 22 },
  { name: 'Week 5', hours: 28 },
  { name: 'Week 6', hours: 20 },
];

const DashboardPage: React.FC<DashboardPageProps> = ({ user }) => {
  const isAdmin = user.role === 'ADMIN';

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Greetings, {user.name.split(' ')[0]}
          </h1>
          <p className="text-slate-500 text-sm">
            {isAdmin ? "Global oversight and financial performance metrics." : "Your academic journey, progress, and upcoming milestones."}
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
            {isAdmin ? "Export Reports" : "View Transcript"}
          </button>
          <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
            {isAdmin ? "System Audit" : "Enrollment Center"}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isAdmin ? (
          <>
            <StatCard label="Collected (CAD)" value="$284,500" icon={<DollarSign size={20} />} trend="14%" trendUp={true} />
            <StatCard label="Outstanding" value="$42,120" icon={<PieChart size={20} />} trend="5%" trendUp={false} />
            <StatCard label="Students" value="1,284" icon={<Users size={20} />} trend="24" trendUp={true} />
            <StatCard label="Uptime" value="99.9%" icon={<Activity size={20} />} />
          </>
        ) : (
          <>
            <StatCard label="CGPA" value="3.84" icon={<GraduationCap size={20} />} trend="0.2" trendUp={true} />
            <StatCard label="Credits" value="48 / 120" icon={<FileText size={20} />} />
            <StatCard label="Attendance" value="94%" icon={<Clock size={20} />} trend="2%" trendUp={false} />
            <StatCard label="Courses" value="5" icon={<BookOpen size={20} />} />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">
              {isAdmin ? "Financial Inflow" : "Study Intensity (Weekly Hours)"}
            </h3>
            <select className="bg-slate-50 border border-slate-200 text-[10px] font-black uppercase tracking-widest rounded-lg px-3 py-1.5 outline-none">
              <option>Last 6 Months</option>
              <option>Full Academic Year</option>
            </select>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              {isAdmin ? (
                <BarChart data={adminData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', padding: '12px'}}
                  />
                  <Bar dataKey="revenue" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={32}>
                    {adminData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === adminData.length - 1 ? '#4f46e5' : '#e2e8f0'} />
                    ))}
                  </Bar>
                </BarChart>
              ) : (
                <AreaChart data={studentData}>
                  <defs>
                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} />
                  <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)'}} />
                  <Area type="monotone" dataKey="hours" stroke="#4f46e5" strokeWidth={4} fillOpacity={1} fill="url(#colorHours)" />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm h-fit">
          <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs mb-8">Quick Management</h3>
          <div className="space-y-4">
            {(isAdmin ? [
              { label: 'Verify Student Fees', icon: <TrendingUp size={18} />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { label: 'Payroll Approval', icon: <DollarSign size={18} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Server Maintenance', icon: <Activity size={18} />, color: 'text-amber-600', bg: 'bg-amber-50' }
            ] : [
              { label: 'Add New Course', icon: <FileText size={18} />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { label: 'Institutional Help', icon: <MessageSquare size={18} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Exam Timetable', icon: <Clock size={18} />, color: 'text-amber-600', bg: 'bg-amber-50' }
            ]).map((action, idx) => (
              <button key={idx} className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all group border border-transparent hover:border-slate-100">
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-xl ${action.bg} ${action.color}`}>
                    {action.icon}
                  </div>
                  <span className="text-sm font-bold text-slate-700">{action.label}</span>
                </div>
                <ArrowRight size={16} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
