import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import EnquiriesTable from '../components/EnquiriesTable';
import GalleryManager from '../components/GalleryManager';
import { LogOut, Mail, Image, Settings } from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) navigate('/login');
      else setUser(currentUser);
    });
    return () => unsubscribe();
  }, [navigate]);

  if (!user) return null;

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const navItems = [
    { name: 'View Enquiries', path: '/dashboard', icon: <Mail size={18} /> },
    { name: 'Manage Gallery', path: '/dashboard/gallery', icon: <Image size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-8 flex items-center gap-3">
          <div className="w-8 h-8 bg-sky-700 rounded-lg flex items-center justify-center text-white font-bold text-lg">✈</div>
          <h2 className="text-xl font-bold text-sky-800">Flyggo</h2>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map(item => (
            <Link 
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                (location.pathname === item.path) 
                  ? 'bg-sky-700 text-white shadow-md' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 space-y-2">
          <button className="flex items-center gap-3 px-4 py-2 w-full text-left text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
            <Settings size={16} />
            Settings
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 w-full text-left text-sm font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        <div className="p-6 m-4 bg-slate-100 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-300 overflow-hidden">
             <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" alt="Admin" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">Admin User</p>
            <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Super Admin</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-10 overflow-y-auto">
        <Routes>
          <Route path="/" element={<EnquiriesTable />} />
          <Route path="/gallery" element={<GalleryManager />} />
        </Routes>
      </main>

    </div>
  );
};

export default Dashboard;
