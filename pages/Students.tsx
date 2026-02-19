
import React, { useState } from 'react';
import { MOCK_STUDENTS } from '../constants';
// Added 'Users' to imports
import { Search, Filter, MoreVertical, Mail, Phone, MapPin, Calendar, CreditCard, ChevronRight, Users } from 'lucide-react';
import { User } from '../types';

const Students: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<User | null>(null);

  const filteredStudents = MOCK_STUDENTS.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.studentId?.toLowerCase().includes(search.toLowerCase()) ||
    s.matricNumber?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Student Directory</h1>
          <p className="text-slate-500">Access full records, academic levels, and contact information.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by ID or Name..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 w-full md:w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50">
            <Filter size={18} /> Filter
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Student Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-fit">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase tracking-widest border-b border-slate-100">
                  <th className="px-6 py-4 font-bold">Student</th>
                  <th className="px-6 py-4 font-bold">Matric No.</th>
                  <th className="px-6 py-4 font-bold">Department</th>
                  <th className="px-6 py-4 font-bold">Level</th>
                  <th className="px-6 py-4 font-bold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((student) => (
                  <tr 
                    key={student.id} 
                    onClick={() => setSelectedStudent(student)}
                    className={`cursor-pointer transition-colors ${selectedStudent?.id === student.id ? 'bg-indigo-50/50' : 'hover:bg-slate-50/50'}`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-full object-cover border border-white shadow-sm" />
                        <div>
                          <p className="text-sm font-bold text-slate-800">{student.name}</p>
                          <p className="text-[10px] text-slate-400">{student.studentId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-slate-600">{student.matricNumber}</td>
                    <td className="px-6 py-4 text-xs text-slate-500">{student.department}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold">
                        {student.level}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="p-1 hover:bg-indigo-100 rounded-lg text-indigo-600 transition-colors">
                        <ChevronRight size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Student Detail View */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 sticky top-24 h-fit">
          {selectedStudent ? (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="text-center">
                <img src={selectedStudent.avatar} alt={selectedStudent.name} className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-indigo-50 shadow-lg" />
                <h3 className="mt-4 text-xl font-bold text-slate-900">{selectedStudent.name}</h3>
                <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest">{selectedStudent.role}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Matric Number</p>
                  <p className="text-sm font-mono font-bold text-slate-700">{selectedStudent.matricNumber}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Current Level</p>
                  <p className="text-sm font-bold text-slate-700">{selectedStudent.level}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Contact Details</h4>
                <div className="flex items-center gap-3 text-slate-600">
                  <Mail size={16} className="text-indigo-600" />
                  <span className="text-sm">{selectedStudent.email}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Phone size={16} className="text-indigo-600" />
                  <span className="text-sm">{selectedStudent.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Calendar size={16} className="text-indigo-600" />
                  <span className="text-sm">Enrolled: {selectedStudent.enrollmentDate}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <CreditCard size={16} className="text-indigo-600" />
                  <span className="text-sm">Gender: {selectedStudent.gender}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <button className="flex-1 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
                  Edit Profile
                </button>
                <button className="flex-1 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors">
                  Message
                </button>
              </div>
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-center space-y-4 text-slate-400">
              <Users size={48} className="opacity-20" />
              <p className="text-sm font-medium">Select a student to view full profile details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Students;
