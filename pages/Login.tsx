
import React, { useState } from 'react';
import { MOCK_USERS } from '../constants';
import { User } from '../types';
import { GraduationCap, ShieldCheck, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [loading, setLoading] = useState<string | null>(null);

  const simulateLogin = (role: 'admin' | 'student') => {
    setLoading(role);
    setTimeout(() => {
      onLogin(MOCK_USERS[role]);
      setLoading(null);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-100 mb-6 animate-bounce">
            <GraduationCap size={40} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">EduSphere Pro</h1>
          <p className="text-slate-500 mt-2">Next-generation School Management</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="email" 
                disabled
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="password" 
                disabled
                placeholder="Enter your password"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-medium text-slate-400">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600" />
              Remember me
            </label>
            <a href="#" className="text-indigo-600 hover:underline">Forgot password?</a>
          </div>

          <div className="grid grid-cols-1 gap-3 pt-4">
            <button 
              onClick={() => simulateLogin('student')}
              disabled={!!loading}
              className="group relative w-full py-3.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
            >
              {loading === 'student' ? <Loader2 className="animate-spin" /> : <>Login as Student <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>}
            </button>
            <button 
              onClick={() => simulateLogin('admin')}
              disabled={!!loading}
              className="w-full py-3.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
              {loading === 'admin' ? <Loader2 className="animate-spin text-indigo-600" /> : <><ShieldCheck size={18} className="text-indigo-600" /> Login as Admin</>}
            </button>
          </div>
        </div>

        <div className="mt-8 text-center space-y-4">
          <p className="text-sm text-slate-400">
            Don't have an account? <a href="#" className="text-indigo-600 font-bold hover:underline">Register here</a>
          </p>
          <div className="flex items-center justify-center gap-6">
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Enterprise Ready</span>
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">PCI-DSS Compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
