"use client";

import React from "react";
import Sidebar from "../components/Sidebar";
import { View, User } from "../types";
import { Bell, Search, MessageCircle, HelpCircle } from "lucide-react";

interface RootLayoutProps {
  children: React.ReactNode;
  view: View;
  setView: (view: View) => void;
  user: User;
  onLogout: () => void;
}

const RootLayout: React.FC<RootLayoutProps> = ({
  children,
  view,
  setView,
  user,
  onLogout,
}) => {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar - Fixed Position */}
      <Sidebar
        currentView={view}
        setView={setView}
        user={user}
        onLogout={onLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 min-h-screen">
        {/* Top Navbar */}
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="relative w-96 hidden md:block">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search resources, students, or documents..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
              </button>
              <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                <MessageCircle size={20} />
              </button>
              <div className="w-px h-6 bg-slate-200 mx-2"></div>
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-slate-900 leading-none">
                    {user.name}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium mt-1 uppercase tracking-tighter">
                    {user.role} • {user.department || "General"}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-indigo-100">
                  {user.name.charAt(0)}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="p-8 w-full mx-auto min-h-[calc(100vh-80px)]">
          {children}
        </main>

        {/* AI Helper Floating Button */}
        <button className="fixed bottom-8 right-8 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-2xl shadow-indigo-200 flex items-center justify-center hover:scale-110 active:scale-95 transition-all group z-50">
          <HelpCircle size={28} />
          <div className="absolute bottom-16 right-0 bg-slate-900 text-white text-[10px] px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity uppercase font-bold tracking-widest pointer-events-none">
            EduSphere Assistant
          </div>
        </button>
      </div>
    </div>
  );
};

export default RootLayout;
