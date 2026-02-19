
import React from 'react';
import { Users, BookOpen, GraduationCap, Clock, ArrowRight, MessageSquare, TrendingUp, DollarSign, Activity, FileText, PieChart } from 'lucide-react';
import StatCard from '../components/StatCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { User } from '../types';

interface DashboardProps {
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

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const isAdmin = user.role === 'ADMIN';

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Welcome back, {user.name.split(' ')[0]}!
          </h1>
          <p className="text-slate-500">
            {isAdmin ? "Financial overview and institutional health metrics." : "Track your academic progress and upcoming deadlines."}
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
            {isAdmin ? "Audit Logs" : "View Transcript"}
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
            {isAdmin ? "Manage Fees" : "Enrollment Hub"}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isAdmin ? (
          <>
            <StatCard label="Collected (YTD)" value="$284,500" icon={<DollarSign size={20} />} trend="14%" trendUp={true} />
            <StatCard label="Outstanding" value="$42,120" icon={<PieChart size={20} />} trend="5%" trendUp={false} />
            <StatCard label="Active Students" value="1,284" icon={<Users size={20} />} trend="24" trendUp={true} />
            <StatCard label="System Status" value="Online" icon={<Activity size={20} />} />
          </>
        ) : (
          <>
            <StatCard label="Current GPA" value="3.84" icon={<GraduationCap size={20} />} trend="0.2" trendUp={true} />
            <StatCard label="Credits" value="48 / 120" icon={<FileText size={20} />} />
            <StatCard label="Attendance" value="94%" icon={<Clock size={20} />} trend="2%" trendUp={false} />
            <StatCard label="My Courses" value="5" icon={<BookOpen size={20} />} />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800">
              {isAdmin ? "Monthly Revenue (CAD)" : "Study Activity (Hours)"}
            </h3>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              {isAdmin ? (
                <BarChart data={adminData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)'}}
                  />
                  <Bar dataKey="revenue" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40}>
                    {adminData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === adminData.length - 1 ? '#4f46e5' : '#e2e8f0'} />
                    ))}
                  </Bar>
                </BarChart>
              ) : (
                <AreaChart data={studentData}>
                  <defs>
                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip contentStyle={{borderRadius: '12px', border: 'none'}} />
                  <Area type="monotone" dataKey="hours" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">Quick Actions</h3>
          <div className="space-y-3">
            {(isAdmin ? [
              { label: 'Verify Payments', icon: <TrendingUp size={18} />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { label: 'Faculty Payroll', icon: <DollarSign size={18} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'System Backup', icon: <Activity size={18} />, color: 'text-amber-600', bg: 'bg-amber-50' }
            ] : [
              { label: 'Register Course', icon: <FileText size={18} />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { label: 'Contact Support', icon: <MessageSquare size={18} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Class Schedule', icon: <Clock size={18} />, color: 'text-amber-600', bg: 'bg-amber-50' }
            ]).map((action, idx) => (
              <button key={idx} className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${action.bg} ${action.color}`}>
                    {action.icon}
                  </div>
                  <span className="text-sm font-medium text-slate-700">{action.label}</span>
                </div>
                <ArrowRight size={16} className="text-slate-300 group-hover:text-indigo-600 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
