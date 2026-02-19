
import React, { useState } from 'react';
import { COURSES } from '../constants';
import { Search, Filter, MoreVertical, Star, Users, Clock } from 'lucide-react';

const Courses: React.FC = () => {
  const [search, setSearch] = useState('');

  const filteredCourses = COURSES.filter(c => 
    c.title.toLowerCase().includes(search.toLowerCase()) || 
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Course Catalog</h1>
          <p className="text-slate-500">Manage and explore all available educational programs.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search courses..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all w-full md:w-64"
            />
          </div>
          <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
            <Filter size={20} />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="relative h-48">
              <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-indigo-600 text-xs font-bold rounded-full shadow-sm">
                  {course.category}
                </span>
              </div>
              <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-lg text-slate-600 hover:text-indigo-600 transition-colors shadow-sm">
                <MoreVertical size={18} />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-1 mb-2">
                {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-amber-400 text-amber-400" />)}
                <span className="text-xs text-slate-400 font-medium ml-1">(4.8)</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{course.title}</h3>
              <p className="text-sm text-slate-500 line-clamp-2 mb-6">{course.description}</p>
              
              <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-6">
                <div className="flex items-center gap-1.5">
                  <Users size={14} />
                  <span>{course.enrolled} Enrolled</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} />
                  <span>{course.duration}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-100 border border-white shadow-sm overflow-hidden">
                    <img src={`https://picsum.photos/seed/${course.instructor}/50/50`} alt="Instructor" />
                  </div>
                  <span className="text-xs font-bold text-slate-700">{course.instructor}</span>
                </div>
                <button className="px-4 py-2 bg-slate-50 text-indigo-600 text-xs font-bold rounded-lg hover:bg-indigo-600 hover:text-white transition-all">
                  Manage Course
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
