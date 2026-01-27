import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ParentPortal: React.FC = () => {
  const [view, setView] = useState('login'); 
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', studentName: '', studentID: '' });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Fake Loading Effect for Realism
  const simulateLoading = (callback: () => void) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      callback();
    }, 1500);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    simulateLoading(async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await fetch(`${API_URL}/api/parent/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const data = await res.json();
        if (data.success) {
          setMessage('Account Created Successfully! Redirecting to login...');
          setTimeout(() => setView('login'), 2000);
        } else {
          setMessage(data.message || 'Registration Failed');
        }
      } catch (err) { setMessage('Server connection failed'); }
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    simulateLoading(async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await fetch(`${API_URL}/api/parent/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, password: formData.password })
        });
        const data = await res.json();
        if (data.success) {
          setUser(data.user);
          setView('dashboard');
        } else {
          setMessage('Invalid Email or Password');
        }
      } catch (err) { setMessage('Server connection failed'); }
    });
  };

  // --- LOGIN / REGISTER VIEW ---
  if (view !== 'dashboard') {
    return (
      <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1494587416117-f102a71d326b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center flex items-center justify-center p-4 relative">
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"></div>
        
        <div className="relative z-10 w-full max-w-4xl bg-slate-900/90 border border-white/10 rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2 animate-fade-in-up">
          
          {/* Left Side: Art */}
          <div className="hidden md:flex flex-col justify-center p-10 bg-gradient-to-br from-orange-600 to-orange-800 text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
            <h2 className="text-4xl font-extrabold mb-4 relative z-10">Safe Streets Starts Here.</h2>
            <p className="text-orange-100 text-lg relative z-10">Real-time tracking, panic alerts, and AI-driven safety for your loved ones.</p>
          </div>

          {/* Right Side: Form */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="mb-8 text-center md:text-left">
              <h2 className="text-3xl font-bold text-white mb-2">{view === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
              <p className="text-slate-400">Manage your Street Dog Defender devices.</p>
            </div>

            {message && <div className={`p-3 rounded-lg mb-4 text-sm font-bold text-center ${message.includes('Success') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{message}</div>}

            <form onSubmit={view === 'login' ? handleLogin : handleRegister} className="space-y-4">
              {view === 'register' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <input required type="text" placeholder="Full Name" className="w-full p-4 bg-slate-800/50 rounded-xl border border-slate-700 text-white focus:border-orange-500 focus:bg-slate-800 transition-all outline-none" onChange={e => setFormData({...formData, fullName: e.target.value})} />
                    <input required type="text" placeholder="Child's Name" className="w-full p-4 bg-slate-800/50 rounded-xl border border-slate-700 text-white focus:border-orange-500 focus:bg-slate-800 transition-all outline-none" onChange={e => setFormData({...formData, studentName: e.target.value})} />
                  </div>
                  <input required type="text" placeholder="Device ID (SDD-XXX)" className="w-full p-4 bg-slate-800/50 rounded-xl border border-slate-700 text-white focus:border-orange-500 focus:bg-slate-800 transition-all outline-none" onChange={e => setFormData({...formData, studentID: e.target.value})} />
                </>
              )}
              
              <input required type="email" placeholder="Email Address" className="w-full p-4 bg-slate-800/50 rounded-xl border border-slate-700 text-white focus:border-orange-500 focus:bg-slate-800 transition-all outline-none" onChange={e => setFormData({...formData, email: e.target.value})} />
              <input required type="password" placeholder="Password" className="w-full p-4 bg-slate-800/50 rounded-xl border border-slate-700 text-white focus:border-orange-500 focus:bg-slate-800 transition-all outline-none" onChange={e => setFormData({...formData, password: e.target.value})} />

              <button disabled={isLoading} className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-orange-500/30 transition-all active:scale-[0.98] flex justify-center items-center">
                {isLoading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : (view === 'login' ? 'Access Portal' : 'Register Device')}
              </button>
            </form>

            <div className="mt-6 text-center text-slate-500">
              {view === 'login' ? "New here? " : "Already have an account? "}
              <button onClick={() => {setView(view === 'login' ? 'register' : 'login'); setMessage('')}} className="text-orange-500 font-bold hover:underline transition-colors">
                {view === 'login' ? 'Create Account' : 'Login'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- DASHBOARD VIEW (ENTERPRISE UI) ---
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-80 bg-slate-900 border-r border-slate-800 p-6 flex flex-col gap-8 fixed md:relative z-20 h-full">
        <div className="flex items-center gap-3 text-2xl font-bold tracking-tight">
          <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">S</div>
          SDD <span className="text-orange-500">MONITOR</span>
        </div>

        <div className="flex-1 space-y-6">
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg shadow-blue-500/20">
                {user?.child.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold">{user?.child}</h3>
                <p className="text-xs text-slate-400 font-mono">ID: {user?.deviceID}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-slate-900 p-2 rounded-lg border border-slate-700">
                <div className="text-xs text-slate-500 mb-1">Battery</div>
                <div className="text-green-400 font-bold">92%</div>
              </div>
              <div className="bg-slate-900 p-2 rounded-lg border border-slate-700">
                <div className="text-xs text-slate-500 mb-1">Signal</div>
                <div className="text-blue-400 font-bold">4G LTE</div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <button className="w-full text-left p-4 bg-orange-600/10 border border-orange-500/50 text-orange-400 rounded-xl font-bold flex items-center gap-3 shadow-lg shadow-orange-900/20">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span> Live Tracking
            </button>
            <button className="w-full text-left p-4 hover:bg-slate-800 rounded-xl text-slate-400 font-medium transition-colors">Alert History</button>
            <button className="w-full text-left p-4 hover:bg-slate-800 rounded-xl text-slate-400 font-medium transition-colors">Geofence Settings</button>
            <button className="w-full text-left p-4 hover:bg-slate-800 rounded-xl text-slate-400 font-medium transition-colors">Device Health</button>
          </div>
        </div>

        <button onClick={() => setView('login')} className="bg-slate-800 hover:bg-slate-700 py-3 rounded-xl font-bold text-slate-300 transition-colors border border-slate-700">
          Logout Securely
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 relative">
        <div className="absolute top-8 right-8 z-10 hidden md:flex items-center gap-2 bg-slate-900/80 backdrop-blur px-4 py-2 rounded-full border border-slate-700 text-xs font-mono">
           <span className="w-2 h-2 bg-green-500 rounded-full"></span> SYSTEM ONLINE
        </div>

        <div className="h-full w-full bg-slate-800 rounded-3xl overflow-hidden border border-slate-700 relative shadow-2xl">
          {/* Simulated Map */}
          <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/78.1460,11.6643,14,0/1600x900?access_token=YOUR_KEY')] bg-cover opacity-60"></div>
          
          {/* Map UI Overlays */}
          <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row gap-4 items-end justify-between">
            <div className="bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-700 shadow-xl max-w-sm">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Current Location</div>
              <div className="text-xl font-bold text-white flex items-center gap-2">
                 <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                 Kadayampatti Main Rd
              </div>
              <div className="text-slate-400 text-sm mt-1">Salem District, Tamil Nadu</div>
              <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-3/4"></div>
              </div>
              <div className="flex justify-between text-xs mt-1 text-slate-500">
                <span>Safe Zone Confidence</span>
                <span>98%</span>
              </div>
            </div>

            <div className="bg-slate-900/90 backdrop-blur-md p-2 rounded-xl border border-slate-700 flex gap-2">
              <button className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-white transition-colors">+</button>
              <button className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-white transition-colors">-</button>
            </div>
          </div>

          {/* User Marker */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="w-32 h-32 bg-orange-500/10 rounded-full animate-ping absolute"></div>
            <div className="w-4 h-4 bg-orange-500 border-2 border-white rounded-full relative z-10 shadow-[0_0_20px_rgba(249,115,22,0.6)]"></div>
            <div className="bg-white text-slate-900 px-3 py-1 rounded-full text-xs font-bold mt-2 shadow-lg relative z-10">
              {user?.child}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};