import React, { useState } from 'react';

export const PreOrderForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    role: '',
    email: '',
    phone: '',
    city: '',
    quantity: '1',
    useCase: 'individual'
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      // 1. Get the Backend URL from .env (or default to localhost:5000)
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      console.log("Sending data to:", `${API_URL}/api/preorder`); // Debug log

      // 2. Send the Real Data
      const response = await fetch(`${API_URL}/api/preorder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // 3. Check if it worked
      if (!response.ok) {
        throw new Error('Server returned an error');
      }

      // 4. Success!
      setStatus('success');
      setFormData({
        name: '', organization: '', role: '', email: '', phone: '', city: '', quantity: '1', useCase: 'individual'
      });
      
    } catch (error) {
      console.error("Submission failed:", error);
      setStatus('error');
      setErrorMessage('Failed to connect to the server. Is the backend running?');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold mb-4 uppercase tracking-tight">Pre-Order Interest</h2>
        <p className="text-xl text-slate-400">Join the movement for safer streets. Pricing will be announced after pilot trials.</p>
      </div>

      <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10 shadow-2xl">
        {status === 'success' ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl">✓</div>
            <h3 className="text-3xl font-bold mb-4">Submission Received!</h3>
            <p className="text-slate-400 mb-8">Thank you for your interest. Our team will contact you shortly regarding pilot availability.</p>
            <button onClick={() => setStatus('idle')} className="text-orange-500 font-bold hover:underline">Send another interest form</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            {/* Show Error Message if connection fails */}
            {status === 'error' && (
              <div className="md:col-span-2 bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-center">
                ⚠️ {errorMessage}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400">Full Name</label>
              <input 
                required
                type="text" 
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 focus:border-orange-500 focus:outline-none transition-all"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400">School/Organization</label>
              <input 
                required
                type="text" 
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 focus:border-orange-500 focus:outline-none transition-all"
                value={formData.organization}
                onChange={e => setFormData({...formData, organization: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400">Phone Number</label>
              <input 
                required
                type="tel" 
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 focus:border-orange-500 focus:outline-none transition-all"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400">Email Address</label>
              <input 
                required
                type="email" 
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 focus:border-orange-500 focus:outline-none transition-all"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400">City/District</label>
              <input 
                required
                type="text" 
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 focus:border-orange-500 focus:outline-none transition-all"
                value={formData.city}
                onChange={e => setFormData({...formData, city: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400">Estimated Quantity</label>
              <select 
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 focus:border-orange-500 focus:outline-none transition-all"
                value={formData.quantity}
                onChange={e => setFormData({...formData, quantity: e.target.value})}
              >
                <option value="1">1 Device (Individual)</option>
                <option value="10-50">10-50 Devices (Small Group)</option>
                <option value="50-200">50-200 Devices (School/Org)</option>
                <option value="200+">200+ Devices (Municipality)</option>
              </select>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-slate-400">Primary Use Case</label>
              <select 
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 focus:border-orange-500 focus:outline-none transition-all"
                value={formData.useCase}
                onChange={e => setFormData({...formData, useCase: e.target.value})}
              >
                <option value="students">School Students / Children</option>
                <option value="runners">Joggers & Morning Walkers</option>
                <option value="delivery">Delivery & Postal Workers</option>
                <option value="workers">Health / Sanitation Workers</option>
                <option value="night-shift">Night Shift Commuters</option>
              </select>
            </div>
            
            <div className="md:col-span-2 mt-4">
              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-xl text-lg transition-all shadow-xl hover:shadow-orange-600/30 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Connecting to Server...
                  </>
                ) : 'Submit Pre-Order Interest'}
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
        <button className="bg-white/5 border border-white/10 px-8 py-3 rounded-xl hover:bg-white/10 transition-all font-bold">Request School Pilot</button>
        <button className="bg-white/5 border border-white/10 px-8 py-3 rounded-xl hover:bg-white/10 transition-all font-bold">Inquiry for Municipalities</button>
      </div>
    </div>
  );
};