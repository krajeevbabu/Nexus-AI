import React from 'react';
import { LayoutDashboard, Grid, Zap, Settings, LogOut, Plus, X } from 'lucide-react';

interface SidebarProps {
  activePage: string;
  setPage: (page: string) => void;
  onLogout: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isDesktop: boolean;
  onBuyCredits: () => void;
  credits: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activePage, 
  setPage, 
  onLogout, 
  isOpen, 
  setIsOpen,
  isDesktop, 
  onBuyCredits,
  credits
}) => {
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'tools', icon: Grid, label: 'Tool Directory' },
    { id: 'studio', icon: Zap, label: 'Nexus Studio' },
  ];

  // Classes for the sidebar container
  const sidebarClasses = `
    fixed left-0 top-0 h-full bg-[#0f1117] border-r border-gray-800 flex flex-col z-50 transition-all duration-300 shadow-2xl
    ${isDesktop 
      ? (isOpen ? 'w-64 translate-x-0' : 'w-20 translate-x-0') 
      : (isOpen ? 'w-[85%] max-w-xs translate-x-0' : 'w-[85%] max-w-xs -translate-x-full')
    }
  `;

  // Overlay for mobile when sidebar is open
  const showOverlay = !isDesktop && isOpen;

  return (
    <>
      {/* Mobile Overlay */}
      {showOverlay && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity animate-in fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={sidebarClasses}>
        {/* Logo Area */}
        <div className={`h-16 flex items-center ${!isDesktop || isOpen ? 'px-6 justify-between' : 'justify-center'} border-b border-gray-800/50`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center text-white font-bold shadow-lg shadow-primary-500/20 flex-shrink-0">
              N
            </div>
            {(isOpen || !isDesktop) && (
              <span className="text-xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 whitespace-nowrap overflow-hidden">
                NEXUS AI
              </span>
            )}
          </div>
          {/* Mobile Close Button */}
          {!isDesktop && (
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <div className="flex-1 flex flex-col gap-4 p-3 overflow-y-auto overflow-x-hidden">
          <nav className="space-y-1">
            {(isOpen || !isDesktop) && (
              <div className="px-3 mb-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider transition-opacity duration-200">
                Menu
              </div>
            )}
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setPage(item.id)}
                  className={`w-full flex items-center ${isOpen || !isDesktop ? 'gap-3 px-3' : 'justify-center px-0'} py-3 rounded-xl transition-all duration-200 group relative ${
                    isActive 
                      ? 'bg-gradient-to-r from-primary-600/20 to-transparent text-white font-medium' 
                      : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                  }`}
                  title={!isOpen && isDesktop ? item.label : undefined}
                >
                  {isActive && (
                    <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-500 rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.5)]`}></div>
                  )}
                  <item.icon size={20} className={`transition-colors flex-shrink-0 ${isActive ? 'text-primary-400' : 'group-hover:text-gray-200'}`} />
                  {(isOpen || !isDesktop) && <span className="whitespace-nowrap">{item.label}</span>}
                  
                  {(isOpen || !isDesktop) && item.id === 'studio' && (
                    <span className="ml-auto text-[10px] font-bold bg-accent-purple/20 text-accent-purple px-2 py-0.5 rounded-full border border-accent-purple/20">
                      LIVE
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="mt-auto space-y-1">
            {(isOpen || !isDesktop) && (
              <div className="px-3 mb-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider">System</div>
            )}
            <button 
              className={`w-full flex items-center ${isOpen || !isDesktop ? 'gap-3 px-3' : 'justify-center'} py-3 rounded-xl text-gray-400 hover:bg-gray-800/50 hover:text-white transition-colors`}
              title={!isOpen && isDesktop ? 'Settings' : undefined}
            >
              <Settings size={20} />
              {(isOpen || !isDesktop) && <span>Settings</span>}
            </button>
            <button 
              onClick={onLogout}
              className={`w-full flex items-center ${isOpen || !isDesktop ? 'gap-3 px-3' : 'justify-center'} py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-900/10 transition-colors group`}
              title={!isOpen && isDesktop ? 'Sign Out' : undefined}
            >
              <LogOut size={20} className="group-hover:text-red-400 transition-colors" />
              {(isOpen || !isDesktop) && <span>Sign Out</span>}
            </button>
          </div>
        </div>
        
        {/* User Credits Card */}
        <div className={`p-3 border-t border-gray-800/50 transition-all duration-300`}>
          <div className={`bg-gray-800/40 rounded-xl border border-gray-700/50 backdrop-blur-sm overflow-hidden ${isOpen || !isDesktop ? 'p-4' : 'p-2 flex justify-center'}`}>
            {!(isOpen || !isDesktop) ? (
              <button 
                 onClick={onBuyCredits}
                 className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-cyan flex items-center justify-center hover:opacity-90 transition-opacity relative group"
                 title="Buy Credits"
              >
                <Plus size={16} className="text-white" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#161b22]"></span>
              </button>
            ) : (
              <>
                <div className="flex justify-between items-center text-xs mb-3">
                  <span className="text-gray-300 font-medium">Balance</span>
                  <span className="text-white font-mono font-bold bg-gray-700 px-1.5 rounded">{credits.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-3">
                  <div 
                    className="h-full bg-gradient-to-r from-primary-500 to-accent-cyan shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all duration-500"
                    style={{ width: `${Math.min((credits / 1000) * 100, 100)}%` }}
                  ></div>
                </div>
                <button 
                  onClick={onBuyCredits}
                  className="w-full py-2 rounded-lg bg-primary-600/20 border border-primary-600/50 text-primary-300 text-xs font-bold hover:bg-primary-600/30 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus size={12} /> Buy Credits
                </button>
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};