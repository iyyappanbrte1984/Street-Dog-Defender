import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react'; // Import Icon

// --- COMPONENT IMPORTS ---
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { FeaturesGrid } from './components/FeaturesGrid';
import { HowItWorks } from './components/HowItWorks';
import { TechSpecs } from './components/TechSpecs';
import { TeamSection } from './components/TeamSection';
import { Ecosystem } from './components/Ecosystem';
import { CrisisMap } from './components/CrisisMap';
import { AISafetyHub } from './components/AISafetyHub';
import { PreOrderForm } from './components/PreOrderForm';
import { ContactFooter } from './components/ContactFooter';
import { AdminDashboard } from './components/AdminDashboard';
import { ParentPortal } from './components/ParentPortal';

// --- 1. BEHAVIOR: Reset Scroll on Page Change ---
const ScrollToTopBehavior = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- 2. VISIBLE BUTTON: "Back to Top" Arrow ---
const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[100] bg-orange-600 hover:bg-orange-500 text-white p-3 rounded-full shadow-2xl border-2 border-white transition-all duration-300 animate-bounce"
          aria-label="Back to Top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </>
  );
};

// --- HOME PAGE LAYOUT ---
const HomePage = () => (
  <>
    <Hero />
    <ProblemSection />
    <FeaturesGrid />
    <HowItWorks />
    <TechSpecs />
    <TeamSection />
    <Ecosystem />
    <div id="pre-order">
      <PreOrderForm />
    </div>
    <ContactFooter />
  </>
);

// --- MAIN APP COMPONENT ---
function App() {
  return (
    <Router>
      <ScrollToTopBehavior /> {/* Invisible Logic */}
      <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-orange-500/30">
        
        <Navbar />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/map" element={<CrisisMap />} />
          <Route path="/safety-ai" element={<AISafetyHub />} />
          <Route path="/parent" element={<ParentPortal />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>

        {/* The Visible Button */}
        <BackToTopButton /> 
        
      </div>
    </Router>
  );
}

export default App;