import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Dashboard } from './pages/Dashboard';
import { ToolExplorer } from './pages/ToolExplorer';
import { AIStudio } from './pages/AIStudio';
import { BuyCreditsModal } from './components/BuyCreditsModal';

// Mock Authentication Component
const LoginScreen = ({ onLogin }: { onLogin: () => void }) => (
  <div className="h-screen w-full bg-[#0f1117] flex items-center justify-center relative overflow-hidden font-sans p-4">
    {/* Background Effects */}
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-600/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-purple/20 rounded-full blur-[120px]"></div>
    </div>

    <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800 p-8 rounded-3xl shadow-2xl max-w-md w-full z-10 text-center animate-in fade-in zoom-in duration-500">
      <div className="mb-8 flex justify-center">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary-500 to-accent-purple rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/20">
          <span className="text-3xl md:text-4xl font-bold text-white">N</span>
        </div>
      </div>
      <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">NEXUS AI</h1>
      <p className="text-gray-400 mb-8 text-sm md:text-base">Master the 2026 AI Landscape</p>
      
      <button 
        onClick={onLogin}
        className="w-full bg-white text-gray-900 hover:bg-gray-200 font-bold py-3 md:py-4 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02]"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        Continue with Google
      </button>
      <p className="mt-6 text-xs text-gray-500">
        By continuing, you agree to the Terms of Service of the Nexus Protocol.
      </p>
    </div>
  </div>
);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const [isDesktop, setIsDesktop] = useState(true);
  const [isBuyCreditsOpen, setIsBuyCreditsOpen] = useState(false);
  const [credits, setCredits] = useState(850);

  // Handle responsive state
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const desktop = width >= 768; // MD breakpoint
      setIsDesktop(desktop);
      if (desktop) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const storedAuth = localStorage.getItem('nexus_auth');
    if (storedAuth === 'true') setIsLoggedIn(true);
  }, []);

  const handleLogin = () => {
    localStorage.setItem('nexus_auth', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('nexus_auth');
    setIsLoggedIn(false);
  };

  const handlePageChange = (page: string) => {
    setActivePage(page);
    if (!isDesktop) {
      setIsSidebarOpen(false); 
    }
  };

  const handleAddCredits = (amount: number) => {
    setCredits(prev => prev + amount);
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-[#0f1117] text-white overflow-hidden font-sans fixed inset-0">
      {/* Sidebar - Handles its own responsive layout */}
      <Sidebar 
        activePage={activePage} 
        setPage={handlePageChange} 
        onLogout={handleLogout} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        isDesktop={isDesktop}
        onBuyCredits={() => setIsBuyCreditsOpen(true)}
        credits={credits}
      />
      
      {/* Main Content Area */}
      <div 
        className={`flex-1 flex flex-col h-full relative bg-[#0f1117] transition-all duration-300 ${
          isDesktop && isSidebarOpen ? 'ml-64' : isDesktop && !isSidebarOpen ? 'ml-20' : 'ml-0'
        }`}
      >
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary-900/05 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-purple/05 rounded-full blur-[120px]"></div>
        </div>

        {/* Global Top Bar */}
        <TopBar 
          activePage={activePage} 
          setPage={handlePageChange} 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-hidden relative w-full">
          {activePage === 'dashboard' && <Dashboard />}
          {activePage === 'tools' && <ToolExplorer />}
          {activePage === 'studio' && <AIStudio />}
        </main>
      </div>

      {/* Buy Credits Modal */}
      <BuyCreditsModal 
        isOpen={isBuyCreditsOpen} 
        onClose={() => setIsBuyCreditsOpen(false)} 
        onPurchase={handleAddCredits}
      />
    </div>
  );
}