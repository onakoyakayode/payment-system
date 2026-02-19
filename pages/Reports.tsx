
import React from 'react';
import { MOCK_STUDENTS } from '../constants';
import StatCard from '../components/StatCard';
import { Users, GraduationCap, TrendingUp, UserCheck, PieChart as PieIcon, BarChart3 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Reports: React.FC = () => {
  // Compute analytics from mock students
  const totalStudents = MOCK_STUDENTS.length;
  const femaleCount = MOCK_STUDENTS.filter(s => s.gender === 'Female').length;
  const maleCount = MOCK_STUDENTS.filter(s => s.gender === 'Male').length;
  
  const genderData = [
    { name: 'Female', value: femaleCount },
    { name: 'Male', value: maleCount },
  ];

  const levels = ['100L', '200L', '300L', '400L'];
  const levelData = levels.map(lvl => ({
    name: lvl,
    count: MOCK_STUDENTS.filter(s => s.level === lvl).length
  }));

  const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#3b82f6'];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Institutional Analytics</h1>
        <p className="text-slate-500">Demographic distribution and enrollment trends across the campus.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Students" value={totalStudents} icon={<Users size={20} />} trend="New Session" trendUp={true} />
        <StatCard label="Final Year" value={MOCK_STUDENTS.filter(s => s.level === '400L').length} icon={<GraduationCap size={20} />} />
        <StatCard label="Freshers" value={MOCK_STUDENTS.filter(s => s.level === '100L').length} icon={<UserCheck size={20} />} />
        <StatCard label="Growth Rate" value="+12.4%" icon={<TrendingUp size={20} />} trendUp={true} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gender Distribution Pie Chart */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><PieIcon size={20} /></div>
            <h3 className="font-bold text-slate-800">Gender Distribution</h3>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Level Distribution Bar Chart */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><BarChart3 size={20} /></div>
            <h3 className="font-bold text-slate-800">Student Level Breakdown</h3>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={levelData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                />
                <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Automated Report Generator</h2>
            <p className="text-slate-400 max-w-lg">Generate comprehensive PDF summaries of academic performance, attendance records, and financial standing for any session.</p>
          </div>
          <button className="px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-slate-50 transition-all shadow-xl">
            Export Session Data
          </button>
        </div>
        <div className="absolute top-0 right-0 p-12 opacity-5 scale-150">
          <BarChart3 size={120} />
        </div>
      </div>
    </div>
  );
};

export default Reports;
