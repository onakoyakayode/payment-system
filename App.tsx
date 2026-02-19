"use client";

import React, { useState, useEffect } from "react";
import RootLayout from "./app/layout";
import DashboardPage from "./app/dashboard/page";
import Courses from "./pages/Courses";
import QuizMaker from "./pages/QuizMaker";
import Payments from "./pages/Payments";
import Login from "./pages/Login";
import Students from "./pages/Students";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import { View, User } from "./types";
import { HelpCircle } from "lucide-react";
import "./globals.css";

const App: React.FC = () => {
  const [view, setView] = useState<View>("DASHBOARD");
  const [user, setUser] = useState<User | null>(null);

  // Persistence simulation
  useEffect(() => {
    const savedUser = localStorage.getItem("edusphere_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem("edusphere_user", JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("edusphere_user");
    setView("DASHBOARD");
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (view) {
      case "DASHBOARD":
        return <DashboardPage user={user} />;
      case "COURSES":
        return <Courses />;
      case "QUIZ_MAKER":
        return <QuizMaker />;
      case "PAYMENTS":
        return <Payments user={user} />;
      case "STUDENTS":
        return <Students />;
      case "REPORTS":
        return <Reports />;
      case "SETTINGS":
        return <Settings user={user} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center p-12 bg-white rounded-3xl border border-dashed border-slate-200">
            <div className="bg-indigo-50 p-6 rounded-full text-indigo-600 mb-6">
              <HelpCircle size={48} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">
              Under Construction
            </h2>
            <p className="text-slate-500 max-w-sm mb-8">
              The {view.toLowerCase()} module is being prepared for the
              2024/2025 academic session.
            </p>
            <button
              onClick={() => setView("DASHBOARD")}
              className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
            >
              Return Home
            </button>
          </div>
        );
    }
  };

  return (
    <RootLayout
      view={view}
      setView={setView}
      user={user}
      onLogout={handleLogout}
    >
      {renderContent()}
    </RootLayout>
  );
};

export default App;
