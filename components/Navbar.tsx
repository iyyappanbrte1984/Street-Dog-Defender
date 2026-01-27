import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Disable scrolling on the body when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "bg-slate-900/95 backdrop-blur-md border-b border-white/10 py-3"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative z-50">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/logo.jpg" 
            alt="SDD Logo"
            className="w-10 h-10 rounded-full border-2 border-orange-500 shadow-lg object-cover bg-slate-800"
          />
          <span className="text-lg font-bold tracking-tight text-white">
            STREET DOG <span className="text-orange-500">DEFENDER</span>
          </span>
        </Link>

        {/* DESKTOP MENU (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link to="/" className="hover:text-white transition-colors uppercase tracking-wider text-xs font-bold text-orange-500">Home</Link>
          <Link to="/map" className="hover:text-white transition-colors uppercase tracking-wider text-xs">Crisis Map</Link>
          <Link to="/parent" className="hover:text-white transition-colors uppercase tracking-wider text-xs">Parent Portal</Link>
          <Link to="/safety-ai" className="hover:text-white transition-colors uppercase tracking-wider text-xs">Safety AI</Link>
          <Link to="/admin" className="hover:text-white transition-colors uppercase tracking-wider text-xs">Admin</Link>
          <button
            onClick={() => navigate("/parent")}
            className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-orange-600/30 active:scale-95 uppercase tracking-wider text-xs"
          >
            Sign In
          </button>
        </div>

        {/* MOBILE MENU TOGGLE BUTTON */}
        <button
          className="md:hidden text-white p-2 focus:outline-none hover:bg-white/10 rounded-full transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* MOBILE MENU OVERLAY (Fixed Full Screen with SOLID BACKGROUND) */}
      <div
        className={`fixed inset-0 z-40 bg-slate-900 h-screen w-full flex flex-col items-center justify-center gap-8 transition-transform duration-300 md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ top: "0", left: "0", right: "0", bottom: "0" }}
      >
        {/* Spacer to push content down from the logo area */}
        <div className="h-20"></div>

        <Link to="/" className="text-2xl font-bold text-white uppercase tracking-widest hover:text-orange-500 transition-colors">
          Home
        </Link>
        <Link to="/map" className="text-2xl font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors">
          Crisis Map
        </Link>
        <Link to="/parent" className="text-2xl font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors">
          Parent Portal
        </Link>
        <Link to="/safety-ai" className="text-2xl font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors">
          Safety AI
        </Link>
        <Link to="/admin" className="text-2xl font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors">
          Admin
        </Link>
        
        <button
          onClick={() => {
            setIsMobileMenuOpen(false);
            navigate("/parent");
          }}
          className="mt-6 bg-orange-600 text-white px-10 py-4 rounded-xl font-bold text-xl uppercase shadow-xl hover:bg-orange-500 transition-colors"
        >
          Sign In
        </button>
      </div>
    </nav>
  );
};