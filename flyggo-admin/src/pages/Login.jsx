import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Background Image */}
      <img 
        src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1600&q=80" 
        alt="Tropical Background"
        className="absolute inset-0 w-full h-full object-cover blur-sm brightness-75"
      />
      
      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-10 shadow-2xl border border-white/50 text-center">
        
        <div className="w-16 h-16 mx-auto mb-6 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center">
          <span className="text-3xl text-sky-700">✈</span>
        </div>
        
        <h1 className="text-2xl font-bold text-sky-800 tracking-tight mb-2">Admin Portal</h1>
        <p className="text-sm text-slate-500 mb-8">Secure gateway to global travel management</p>
        
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        
        <form onSubmit={handleLogin} className="space-y-6 text-left">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-2">Email Address</label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-slate-400">✉</span>
              <input 
                type="email" 
                required
                disabled={loading}
                className="w-full bg-slate-100/50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-shadow disabled:opacity-60"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-800">Password</label>
              <span className="text-[10px] font-semibold text-sky-700 cursor-pointer hover:underline">Forgot Password?</span>
            </div>
            <div className="relative">
              <span className="absolute left-4 top-3 text-slate-400">🔒</span>
              <input 
                type="password" 
                required
                disabled={loading}
                className="w-full bg-slate-100/50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-shadow disabled:opacity-60"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" className="rounded border-slate-300 text-orange-600 focus:ring-orange-500" />
            <label htmlFor="remember" className="text-xs font-medium text-slate-600">Remember this device</label>
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-white font-medium transition-transform hover:scale-[1.02] shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(to right, #ea580c, #f97316)' }}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Authenticating...
              </span>
            ) : (
              'Secure Access ➔'
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-200">
          <p className="text-[10px] text-slate-400 mb-2">Unauthorized access is strictly prohibited.</p>
          <div className="flex justify-center gap-4 text-[10px] font-semibold text-slate-500">
            <span className="hover:text-slate-800 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-800 cursor-pointer">Support Desk</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 w-full text-center z-10 text-white/70 text-xs font-medium">
        &copy; 2026 Flyggo. All rights reserved.
      </div>
    </div>
  );
};

export default Login;
