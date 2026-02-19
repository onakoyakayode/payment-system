
import React, { useState } from 'react';
import { User } from '../types';
// Added 'Lock' to imports
import { Shield, Bell, User as UserIcon, Building2, Globe, Database, Save, Eye, EyeOff, Lock } from 'lucide-react';

interface SettingsProps {
  user: User;
}

const Settings: React.FC<SettingsProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'institution' | 'notifications'>('profile');
  const isAdmin = user.role === 'ADMIN';

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">System Settings</h1>
        <p className="text-slate-500">Manage your account preferences and enterprise configuration.</p>
      </header>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Navigation Sidebar */}
        <div className="w-full md:w-64 space-y-1">
          {[
            { id: 'profile', label: 'My Profile', icon: <UserIcon size={18} /> },
            { id: 'security', label: 'Security & Privacy', icon: <Shield size={18} /> },
            { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
            ...(isAdmin ? [{ id: 'institution', label: 'Institutional Config', icon: <Building2 size={18} /> }] : [])
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-600 hover:bg-white hover:text-indigo-600'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-in slide-in-from-bottom-2">
              <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
                <div className="relative group">
                  <img src={user.avatar} className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-100" />
                  <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Globe size={20} className="text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{user.name}</h3>
                  <p className="text-xs font-semibold text-indigo-600 uppercase">{user.role}</p>
                  <p className="text-xs text-slate-400 mt-1">{user.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                  <input type="text" defaultValue={user.name} className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                  <input type="email" defaultValue={user.email} className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Phone Number</label>
                  <input type="text" placeholder="+1..." className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Department</label>
                  <input type="text" defaultValue={user.department} className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none" />
                </div>
              </div>

              <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                <Save size={18} /> Update Profile
              </button>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-8 animate-in slide-in-from-bottom-2">
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 flex items-center gap-2"><Lock size={18} className="text-indigo-600"/> Password Management</h3>
                <div className="space-y-3">
                  <input type="password" placeholder="Current Password" className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none" />
                  <input type="password" placeholder="New Password" className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none" />
                </div>
                <button className="text-sm font-bold text-indigo-600 hover:underline">Change Password</button>
              </div>

              <div className="pt-8 border-t border-slate-100 space-y-4">
                <h3 className="font-bold text-slate-900 flex items-center gap-2"><Shield size={18} className="text-indigo-600"/> Two-Factor Authentication</h3>
                <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <p className="text-sm text-emerald-800 font-medium">Extra layer of security is currently enabled via email.</p>
                  <button className="px-4 py-2 bg-white text-emerald-600 font-bold rounded-lg text-xs shadow-sm">Disable</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'institution' && isAdmin && (
            <div className="space-y-8 animate-in slide-in-from-bottom-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Institution Name</label>
                  <input type="text" defaultValue="EduSphere University" className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Base Currency</label>
                  <select className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none">
                    <option>CAD ($)</option>
                    <option>USD ($)</option>
                    <option>NGN (₦)</option>
                  </select>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100 space-y-4">
                <h3 className="font-bold text-slate-900 flex items-center gap-2"><Database size={18} className="text-indigo-600"/> Session Management</h3>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div>
                    <p className="text-sm font-bold text-slate-800">Current Academic Year</p>
                    <p className="text-xs text-slate-500">2024 / 2025 Session</p>
                  </div>
                  <button className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg text-xs shadow-sm">Roll Over Session</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6 animate-in slide-in-from-bottom-2">
              <h3 className="font-bold text-slate-900">Communication Preferences</h3>
              <div className="space-y-4">
                {[
                  { label: 'Tuition Payment Alerts', desc: 'Notify when fee payments are processed.' },
                  { label: 'Course Announcements', desc: 'Updates from your course instructors.' },
                  { label: 'Security Alerts', desc: 'Login attempts from new devices.' },
                ].map((pref, i) => (
                  <div key={i} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-bold text-slate-800">{pref.label}</p>
                      <p className="text-xs text-slate-400">{pref.desc}</p>
                    </div>
                    <div className="w-12 h-6 bg-indigo-600 rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
