import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import EnquiriesTable from '../components/EnquiriesTable';
import GalleryManager from '../components/GalleryManager';
import { LogOut, Mail, Image, Menu, X } from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      
      {/* Mobile Top Header */}
      <header className="lg:hidden bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-sky-700 rounded-lg flex items-center justify-center text-white font-bold text-lg">✈</div>
          <h2 className="text-xl font-bold text-sky-800">Flyggo</h2>
        </div>
        <button 
          onClick={() => setSidebarOpen(true)}
          className="text-slate-600 hover:text-slate-800 p-2 focus:outline-none"
        >
          <Menu size={24} />
        </button>
      </header>

      {/* Backdrop overlay for Mobile Sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar - Collapsible Drawer on Mobile, Statically Docked on Desktop */}
      <aside className={`w-64 bg-white border-r border-slate-200 flex flex-col fixed inset-y-0 left-0 z-50 transform lg:transform-none lg:static transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-8 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-sky-700 rounded-lg flex items-center justify-center text-white font-bold text-lg">✈</div>
            <h2 className="text-xl font-bold text-sky-800">Flyggo</h2>
          </div>
          {/* Close button inside sidebar on mobile */}
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-500 hover:text-slate-800 p-1"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map(item => (
            <Link 
              key={item.name}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
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
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 w-full text-left text-sm font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto w-full max-w-full">
        <Routes>
          <Route path="/" element={<EnquiriesTable />} />
          <Route path="/gallery" element={<GalleryManager />} />
        </Routes>
      </main>

    </div>
  );
};

export default Dashboard;
