
import React from 'react';
import { StatCard as StatCardType } from '../types';

const StatCard: React.FC<StatCardType> = ({ label, value, icon, trend, trendUp }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
          {icon}
        </div>
        {trend && (
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
            {trendUp ? '↑' : '↓'} {trend}
          </span>
        )}
      </div>
      <div>
        <h3 className="text-slate-500 text-sm font-medium">{label}</h3>
        <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
