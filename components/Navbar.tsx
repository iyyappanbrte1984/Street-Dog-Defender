import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Added useLocation
import { Menu, X } from "lucide-react"; // Added Icons for Hamburger

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // New State for Mobile Menu
  const navigate = useNavigate();
  const location = useLocation(); // New Hook to detect page changes

  // Close mobile menu automatically when the route changes (user clicks a link)
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        // We force the dark background if Scrolled OR if Mobile Menu is Open
        isScrolled || isMobileMenuOpen
          ? "bg-slate-900/95 backdrop-blur-md border-b border-white/10 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        {/* LOGO → HOME */}
        <Link to="/" className="flex items-center gap-3 group relative z-50">
          <img
            src="/logo.jpg"
            alt="SDD Logo"
            className="w-12 h-12 rounded-full border-2 border-orange-500 shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform object-cover bg-slate-800"
          />
          <span className="text-xl font-bold tracking-tight text-white">
            STREET DOG <span className="text-orange-500">DEFENDER</span>
          </span>
        </Link>

        {/* DESKTOP MENU (Hidden on small screens) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link to="/" className="hover:text-white transition-colors uppercase tracking-wider text-xs">Home</Link>
          <Link to="/map" className="hover:text-white transition-colors uppercase tracking-wider text-xs">Crisis Map</Link>
          <Link to="/parent" className="hover:text-white transition-colors uppercase tracking-wider text-xs">Parent Portal</Link>
          <Link to="/safety-ai" className="hover:text-white transition-colors uppercase tracking-wider text-xs">Safety AI</Link>
          <Link to="/admin" className="hover:text-white transition-colors uppercase tracking-wider text-xs">Admin</Link>
          <button
            onClick={() => navigate("/parent")}
            className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-orange-600/30 active:scale-95 uppercase tracking-wider text-xs"
          >
            Sign In
          </button>
        </div>

        {/* --- MOBILE MENU BUTTON (Visible only on Mobile) --- */}
        <button
          className="md:hidden text-white z-50 p-2 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* --- MOBILE DROPDOWN OVERLAY --- */}
        <div
          className={`fixed inset-0 bg-slate-950 z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-300 md:hidden ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <Link to="/" className="text-2xl font-bold text-white uppercase tracking-widest hover:text-orange-500 transition-colors">Home</Link>
          <Link to="/map" className="text-2xl font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors">Crisis Map</Link>
          <Link to="/parent" className="text-2xl font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors">Parent Portal</Link>
          <Link to="/safety-ai" className="text-2xl font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors">Safety AI</Link>
          <Link to="/admin" className="text-2xl font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors">Admin</Link>
          
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              navigate("/parent");
            }}
            className="mt-4 bg-orange-600 text-white px-10 py-4 rounded-xl font-bold text-xl uppercase shadow-xl hover:bg-orange-500 transition-colors"
          >
            Sign In
          </button>
        </div>

      </div>
    </nav>
  );
};