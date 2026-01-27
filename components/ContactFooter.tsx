
import React from 'react';

export const ContactFooter: React.FC = () => {
  return (
    <div className="bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-8 uppercase tracking-tight">Contact Us</h2>
            <p className="text-lg text-slate-600 mb-10">Have a question? Interested in a pilot for your school or NGO? We'd love to hear from you.</p>
            
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Location</h4>
                  <p className="text-slate-600">Model School Kadayampatti, Salem,<br/>Tamil Nadu, India.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Email</h4>
                  <p className="text-slate-600">rubies.team.innovation@example.com</p>
                </div>
              </div>

              <div className="pt-8 flex gap-4">
                {['youtube', 'instagram', 'twitter', 'linkedin'].map(social => (
                  <a key={social} href="#" className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white hover:bg-orange-600 transition-all">
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5 bg-current opacity-20 rounded-full"></div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500">Name</label>
                  <input type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:border-orange-500 focus:outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500">Email</label>
                  <input type="email" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:border-orange-500 focus:outline-none transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500">Subject</label>
                <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:border-orange-500 focus:outline-none transition-all">
                  <option>School Pilot Program</option>
                  <option>NGO Partnership</option>
                  <option>Investor Inquiry</option>
                  <option>General Feedback</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500">Message</label>
                <textarea rows={4} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:border-orange-500 focus:outline-none transition-all resize-none"></textarea>
              </div>
              <button className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all shadow-lg">Send Message</button>
            </form>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">S</div>
            <span className="font-extrabold text-slate-900 uppercase tracking-tight">Street Dog Defender</span>
          </div>
          <div className="text-slate-500 text-sm">
            © 2026 THE RUBIES TEAM. All rights reserved. Supported by EDII-TN & SIDP.
          </div>
          <div className="flex gap-8 text-sm font-bold text-slate-400">
            <a href="#" className="hover:text-orange-600">Privacy Policy</a>
            <a href="#" className="hover:text-orange-600">Terms of Use</a>
          </div>
        </div>
      </div>
    </div>
  );
};
