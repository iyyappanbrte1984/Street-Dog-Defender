import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Order { _id: string; name: string; organization: string; phone: string; email: string; city: string; quantity: string; useCase: string; date: string; }

export const AdminDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL as string;
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (data.success) {
        setIsAuthenticated(true);
        fetchOrders();
      } else {
        setLoginError('Access Denied: Invalid Credentials');
      }
    } catch (error) { setLoginError('Server Unavailable'); }
    setLoading(false);
  };

  const fetchOrders = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/preorder`);
      const data = await response.json();
      setOrders(data);
    } catch (error) { console.error("Failed to fetch"); }
  };

  // --- LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
           <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600/20 rounded-full blur-[100px] animate-pulse"></div>
           <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[100px] animate-pulse"></div>
        </div>

        <div className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-orange-500/30">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>
            <h2 className="text-3xl font-bold text-white">Command Center</h2>
            <p className="text-slate-400 mt-2">Restricted Access. Authorized Personnel Only.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-3 rounded-lg text-sm text-center">{loginError}</div>}
            
            <div className="relative group">
               <input type="text" placeholder="Username" className="w-full bg-slate-800/50 border border-slate-700 text-white px-4 py-3.5 rounded-xl outline-none focus:border-orange-500 transition-all pl-10" value={username} onChange={e => setUsername(e.target.value)} />
               <span className="absolute left-3 top-3.5 text-slate-500 group-focus-within:text-orange-500">👤</span>
            </div>
            <div className="relative group">
               <input type="password" placeholder="Password" className="w-full bg-slate-800/50 border border-slate-700 text-white px-4 py-3.5 rounded-xl outline-none focus:border-orange-500 transition-all pl-10" value={password} onChange={e => setPassword(e.target.value)} />
               <span className="absolute left-3 top-3.5 text-slate-500 group-focus-within:text-orange-500">🔒</span>
            </div>
            
            <button disabled={loading} className="w-full bg-white text-slate-900 font-bold py-3.5 rounded-xl hover:bg-slate-200 transition-all shadow-lg active:scale-95 mt-2">
              {loading ? 'Authenticating...' : 'Unlock Dashboard'}
            </button>
          </form>
          
          <button onClick={() => navigate('/')} className="w-full text-center mt-6 text-sm text-slate-500 hover:text-white transition-colors">← Return to Website</button>
        </div>
      </div>
    );
  }

  // --- DASHBOARD UI ---
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
             <span className="font-bold tracking-wide">SDD <span className="text-slate-500">ADMINISTRATOR</span></span>
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="text-sm font-medium text-slate-400 hover:text-white bg-slate-800 px-4 py-2 rounded-lg transition-colors border border-slate-700">Logout</button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Pre-Order Database</h1>
            <p className="text-slate-400">Real-time submissions from the landing page.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 min-w-[150px]">
              <div className="text-slate-500 text-xs font-bold uppercase">Total Interest</div>
              <div className="text-3xl font-bold text-white mt-1">{orders.length}</div>
            </div>
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 min-w-[150px]">
              <div className="text-slate-500 text-xs font-bold uppercase">Cities Reached</div>
              <div className="text-3xl font-bold text-orange-500 mt-1">{new Set(orders.map(o => o.city)).size}</div>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/50 border-b border-slate-700 text-xs uppercase tracking-wider text-slate-400 font-bold">
                  <th className="p-5">Date Logged</th>
                  <th className="p-5">Contact Name</th>
                  <th className="p-5">Organization</th>
                  <th className="p-5">Details</th>
                  <th className="p-5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="p-5 text-sm text-slate-400 font-mono">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="p-5">
                      <div className="font-bold text-white group-hover:text-orange-400 transition-colors">{order.name}</div>
                      <div className="text-xs text-slate-500">{order.email}</div>
                    </td>
                    <td className="p-5 text-slate-300">{order.organization}</td>
                    <td className="p-5">
                      <div className="flex items-center gap-2">
                         <span className="bg-slate-800 border border-slate-700 px-2 py-1 rounded text-xs font-mono">{order.city}</span>
                         <span className="bg-slate-800 border border-slate-700 px-2 py-1 rounded text-xs font-mono">Qty: {order.quantity}</span>
                      </div>
                    </td>
                    <td className="p-5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> New Lead
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {orders.length === 0 && <div className="p-12 text-center text-slate-500 italic">Database is empty waiting for inputs...</div>}
          </div>
        </div>
      </main>
    </div>
  );
};