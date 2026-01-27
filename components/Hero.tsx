import React from "react";
import { ArrowRight, Shield, Activity, Wifi } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[120px]"></div>

      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20 grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT: TEXT */}
        <div className="space-y-8 animate-fade-in z-10">
          <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-4 py-2 backdrop-blur-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-green-400 text-xs font-bold tracking-wide uppercase">
              System Operational
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-white">
            Smart Protection.
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
              Zero Incidents.
            </span>
          </h1>

          <p className="text-xl text-slate-400 max-w-xl leading-relaxed">
            The world's first wearable that uses ultrasonic defense and AI
            monitoring to protect communities from stray dog aggression.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => navigate("/map")}
              className="group bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-orange-600/20 flex items-center justify-center gap-3"
            >
              Live Crisis Map
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigate("/safety-ai")}
              className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all border border-slate-700"
            >
              Try Safety AI
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800">
            <div className="text-center md:text-left">
              <Shield className="w-6 h-6 text-orange-500 mb-2 mx-auto md:mx-0" />
              <div className="font-bold text-white">SafeZone</div>
              <div className="text-xs text-slate-500">Auto-Defense</div>
            </div>

            <div className="text-center md:text-left">
              <Activity className="w-6 h-6 text-blue-500 mb-2 mx-auto md:mx-0" />
              <div className="font-bold text-white">Real-Time</div>
              <div className="text-xs text-slate-500">12ms Latency</div>
            </div>

            <div className="text-center md:text-left">
              <Wifi className="w-6 h-6 text-green-500 mb-2 mx-auto md:mx-0" />
              <div className="font-bold text-white">IoT Mesh</div>
              <div className="text-xs text-slate-500">City-wide Sync</div>
            </div>
          </div>
        </div>

        {/* RIGHT: SWAPPED IMAGES */}
        <div className="relative animate-fade-in-up hidden lg:block">
          
          {/* 1. MAIN TILTED CARD (Now shows the BADGE) */}
          <div className="relative z-10 bg-slate-800/50 p-6 rounded-[40px] border border-slate-700 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 backdrop-blur-sm">
            {/* Changed to aspect-square and object-contain for the badge */}
            <div className="aspect-square rounded-3xl overflow-hidden relative flex items-center justify-center p-4">
              <img
                src="/badge.png"
                alt="Smart Wearable Tech Badge"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          {/* 2. ROTATING ELEMENT (Now shows the DOG) */}
          {/* Added rounded-full, overflow-hidden and border to make the dog photo a spinning circle */}
          <div className="absolute -bottom-12 -right-12 z-20 w-48 h-48 animate-[spin_20s_linear_infinite] hover:animate-none transition-all rounded-full overflow-hidden border-4 border-slate-700/50 shadow-xl">
            <img
               src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1000&auto=format&fit=crop"
              alt="Protected Dog"
              className="w-full h-full object-cover opacity-90"
            />
          </div>

        </div>
      </div>
    </div>
  );
};