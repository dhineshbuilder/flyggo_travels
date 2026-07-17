import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Search, Filter, MailOpen, Clock, CheckCircle } from 'lucide-react';

const EnquiriesTable = () => {
  const [enquiries, setEnquiries] = useState([]);
  
  useEffect(() => {
    const q = query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setEnquiries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const total = enquiries.length;
  const pending = enquiries.filter(e => e.status !== 'Responded').length;
  const rate = total === 0 ? 100 : Math.round(((total - pending) / total) * 100);

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Responded' ? 'Pending' : 'Responded';
    await updateDoc(doc(db, 'enquiries', id), { status: newStatus });
  };

  const getInitials = (name) => {
    if (!name) return '??';
    const parts = name.split(' ');
    return parts.length > 1 ? parts[0][0] + parts[1][0] : parts[0].substring(0, 2).toUpperCase();
  };

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Customer Enquiries</h1>
          <p className="text-slate-500 text-sm">Manage and respond to incoming travel requests from your website.</p>
        </div>
        
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search enquiries..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-full text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 w-64"
            />
          </div>
          <button className="bg-sky-700 text-white px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-sm hover:bg-sky-800 transition-colors">
            <Filter size={16} /> Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center"><MailOpen size={24} /></div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Received</p>
            <p className="text-2xl font-bold text-slate-900">{total.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center"><Clock size={24} /></div>
          <div>
            <p className="text-sm font-medium text-slate-500">Pending Response</p>
            <p className="text-2xl font-bold text-slate-900">{pending}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><CheckCircle size={24} /></div>
          <div>
            <p className="text-sm font-medium text-slate-500">Resolution Rate</p>
            <p className="text-2xl font-bold text-slate-900">{rate}%</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Email Address</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Message Preview</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {enquiries.map(enq => {
              const dateObj = enq.createdAt?.toDate();
              const formattedDate = dateObj ? dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Unknown';
              const isPending = enq.status !== 'Responded';
              
              return (
                <tr key={enq.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-sky-700 text-white flex items-center justify-center text-xs font-bold">
                        {getInitials(enq.name)}
                      </div>
                      <div className="font-semibold text-sm text-slate-900">{enq.name || 'Unknown User'}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{enq.email}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 truncate max-w-[200px]">{enq.message}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{formattedDate}</td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => handleStatusToggle(enq.id, enq.status)}
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        isPending 
                          ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                          : 'bg-sky-50 text-sky-600 hover:bg-sky-100'
                      } transition-colors`}
                    >
                      {isPending ? 'Pending' : 'Responded'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {/* Pagination Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center text-sm text-slate-500">
          <span>Showing {enquiries.length} of {total} enquiries</span>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-400">{'<'}</button>
            <button className="w-8 h-8 rounded-lg bg-sky-700 text-white font-bold flex items-center justify-center">1</button>
            <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50">2</button>
            <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-400">{'>'}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquiriesTable;
