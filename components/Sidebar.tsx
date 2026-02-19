
import React from 'react';
import { NAV_ITEMS } from '../constants';
import { View, User } from '../types';
import { LogOut, GraduationCap } from 'lucide-react';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
  user: User;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, user, onLogout }) => {
  return (
    <div className="w-64 h-full bg-white border-r border-slate-200 flex flex-col fixed left-0 top-0 overflow-y-auto z-20">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-indigo-600 p-2 rounded-lg text-white">
          <GraduationCap size={24} />
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-800">EduSphere</span>
      </div>

      <nav className="flex-1 px-4 mt-4">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2">Main Menu</p>
        <ul className="space-y-1">
          {NAV_ITEMS.filter(item => item.roles.includes(user.role)).map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setView(item.id as View)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                  currentView === item.id 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'
                }`}
              >
                <span className={`${currentView === item.id ? 'text-white' : 'text-slate-400 group-hover:text-indigo-600'}`}>
                  {item.icon}
                </span>
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-100">
          <div className="flex items-center gap-3 mb-3">
            <img src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-full border border-white shadow-sm object-cover" />
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-slate-900 truncate">{user.name}</p>
              <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-tight">{user.role}</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-red-500 bg-white border border-red-100 rounded-lg hover:bg-red-50 transition-colors"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
