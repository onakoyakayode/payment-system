
import React, { useState } from 'react';
import { AVAILABLE_FEES, MOCK_PAYMENT_RECORDS } from '../constants';
import { FeeItem, Transaction, User, PaymentRecord } from '../types';
import { CheckCircle2, ShieldCheck, CreditCard, ChevronRight, Receipt, Loader2, Info, AlertTriangle, Printer, Download, Search, Filter, MoreHorizontal, UserCheck } from 'lucide-react';

interface PaymentsProps {
  user: User;
}

type PaymentStep = 'SELECTION' | 'SUMMARY' | 'PROCESSING' | 'SUCCESS';

const Payments: React.FC<PaymentsProps> = ({ user }) => {
  const isAdmin = user.role === 'ADMIN';
  
  // Student state
  const [step, setStep] = useState<PaymentStep>('SELECTION');
  const [selectedFees, setSelectedFees] = useState<Set<string>>(new Set());
  const [currentReference, setCurrentReference] = useState('');
  
  // Admin state
  const [searchTerm, setSearchTerm] = useState('');

  // Common formatting
  const formatCAD = (amount: number) => 
    amount.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' });

  // Student specific logic
  const toggleFee = (id: string) => {
    const newSelected = new Set(selectedFees);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedFees(newSelected);
  };

  const selectedFeeItems = AVAILABLE_FEES.filter(f => selectedFees.has(f.id));
  const totalAmount = selectedFeeItems.reduce((sum, f) => sum + f.amount, 0);

  const handlePayNow = () => {
    setStep('PROCESSING');
    const ref = `CAD-${Math.floor(Math.random() * 9000000 + 1000000)}`;
    setCurrentReference(ref);
    setTimeout(() => setStep('SUCCESS'), 2500);
  };

  // Admin Ledger View
  if (isAdmin) {
    const filteredRecords = MOCK_PAYMENT_RECORDS.filter(r => 
      r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.studentId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Payment Ledger</h1>
            <p className="text-slate-500">Overview of student fee transactions and outstanding balances.</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search Student ID or Name..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none w-64"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50">
              <Filter size={18} /> Filters
            </button>
          </div>
        </header>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-400 text-xs uppercase tracking-widest border-b border-slate-100">
                  <th className="px-6 py-4 font-bold">Student</th>
                  <th className="px-6 py-4 font-bold">Fee Description</th>
                  <th className="px-6 py-4 font-bold text-right">Total Due</th>
                  <th className="px-6 py-4 font-bold text-right">Paid</th>
                  <th className="px-6 py-4 font-bold text-right">Balance</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800">{record.studentName}</span>
                        <span className="text-[10px] font-mono text-slate-400">{record.studentId}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{record.feeName}</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-700 text-right">{formatCAD(record.totalAmount)}</td>
                    <td className="px-6 py-4 text-sm font-bold text-emerald-600 text-right">{formatCAD(record.amountPaid)}</td>
                    <td className="px-6 py-4 text-sm font-bold text-rose-500 text-right">{formatCAD(record.balance)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        record.status === 'PAID' ? 'bg-emerald-50 text-emerald-600' :
                        record.status === 'PARTIAL' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-slate-50 text-center border-t border-slate-100">
            <p className="text-xs text-slate-400">Showing {filteredRecords.length} records • Real-time database sync active</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-xl shadow-indigo-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/20 rounded-lg"><UserCheck size={20} /></div>
              <h3 className="font-bold">Recent Verification</h3>
            </div>
            <p className="text-indigo-100 text-sm mb-6 opacity-80">Check the validity of manual bank teller uploads or mobile transfer receipts.</p>
            <button className="w-full py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-all text-sm">
              Open Verification Queue
            </button>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">Revenue Breakdown</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Tuition Fees</span>
                <span className="text-sm font-bold text-slate-800">{formatCAD(210500)}</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-[75%]"></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Housing & Dining</span>
                <span className="text-sm font-bold text-slate-800">{formatCAD(74000)}</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[25%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Student Payment View
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Finance Portal</h1>
          <p className="text-slate-500">Securely settle your tuition and track your payment history.</p>
        </div>
        <div className="flex items-center gap-3 bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100">
          <ShieldCheck size={20} className="text-indigo-600" />
          <span className="text-sm font-bold text-indigo-700 uppercase tracking-tighter">CAD Secure Channel</span>
        </div>
      </header>

      {step === 'SELECTION' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-800">Available Fees</h3>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Items</span>
              </div>
              <div className="divide-y divide-slate-100">
                {AVAILABLE_FEES.map((fee) => (
                  <label key={fee.id} className={`flex items-start gap-4 p-6 cursor-pointer hover:bg-slate-50 transition-colors ${selectedFees.has(fee.id) ? 'bg-indigo-50/20' : ''}`}>
                    <input 
                      type="checkbox" 
                      checked={selectedFees.has(fee.id)}
                      onChange={() => toggleFee(fee.id)}
                      className="mt-1 w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-800">{fee.name}</span>
                        <span className="text-lg font-black text-slate-900">{formatCAD(fee.amount)}</span>
                      </div>
                      <p className="text-sm text-slate-500">{fee.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit sticky top-24">
            <h3 className="font-bold text-slate-800 mb-6">Payment Summary</h3>
            {selectedFees.size === 0 ? (
              <div className="text-center py-10 opacity-40">
                <Receipt size={40} className="mx-auto mb-4" />
                <p className="text-xs font-bold uppercase tracking-widest">Cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedFeeItems.map(f => (
                  <div key={f.id} className="flex justify-between text-sm">
                    <span className="text-slate-500">{f.name}</span>
                    <span className="font-bold text-slate-800">{formatCAD(f.amount)}</span>
                  </div>
                ))}
                <div className="pt-4 border-t border-slate-200 flex justify-between items-end">
                  <span className="text-sm font-bold text-slate-900">Total Payable</span>
                  <span className="text-2xl font-black text-indigo-600">{formatCAD(totalAmount)}</span>
                </div>
                <button 
                  onClick={() => setStep('SUMMARY')}
                  className="w-full mt-6 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2"
                >
                  Confirm & Checkout <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {step === 'SUMMARY' && (
        <div className="max-w-2xl mx-auto animate-in zoom-in-95 duration-300">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-8 space-y-8">
            <div className="flex justify-between items-start pb-6 border-b border-slate-50">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Authorization</h2>
                <p className="text-sm text-slate-500">Student ID: {user.studentId}</p>
              </div>
              <div className="bg-slate-50 px-4 py-2 rounded-xl text-xs font-mono font-bold text-slate-500 border border-slate-100">
                {Date.now()}
              </div>
            </div>

            <div className="space-y-4">
              {selectedFeeItems.map(f => (
                <div key={f.id} className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">{f.name}</span>
                  <span className="text-sm font-bold text-slate-900">{formatCAD(f.amount)}</span>
                </div>
              ))}
              <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                <span className="text-lg font-bold text-slate-900">Total Amount (CAD)</span>
                <span className="text-3xl font-black text-indigo-600">{formatCAD(totalAmount)}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setStep('SELECTION')}
                className="flex-1 py-4 border border-slate-200 rounded-xl text-slate-600 font-bold hover:bg-slate-50 transition-all"
              >
                Back
              </button>
              <button 
                onClick={handlePayNow}
                className="flex-[2] py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-indigo-100"
              >
                <CreditCard size={20} /> Authorize Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 'PROCESSING' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white rounded-3xl p-10 max-w-sm w-full text-center space-y-6 animate-in zoom-in-95">
            <Loader2 className="animate-spin mx-auto text-indigo-600" size={48} />
            <div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">Processing Payment</h3>
              <p className="text-sm text-slate-500 mt-2">Communicating with international banking gateway. Do not refresh.</p>
            </div>
          </div>
        </div>
      )}

      {step === 'SUCCESS' && (
        <div className="max-w-xl mx-auto text-center space-y-8 animate-in zoom-in-95 duration-500">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-10 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={40} />
            </div>
            <h2 className="text-3xl font-black text-slate-900">Payment Confirmed!</h2>
            <p className="text-slate-500">Your tuition status has been updated to <strong>Paid</strong>. A digital receipt has been dispatched to your institutional email.</p>
            
            <div className="flex gap-4">
              <button className="flex-1 py-4 bg-slate-50 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                <Download size={18} /> Receipt
              </button>
              <button 
                onClick={() => setStep('SELECTION')}
                className="flex-1 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
