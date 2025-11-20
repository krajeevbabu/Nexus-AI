import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Command, Clock, Zap, ExternalLink, FileText, X, ChevronRight, Menu, ArrowLeft } from 'lucide-react';
import { AI_TOOLS } from '../constants';
import { Tool } from '../types';

interface TopBarProps {
  activePage: string;
  setPage: (page: string) => void;
  toggleSidebar: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ activePage, setPage, toggleSidebar }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        // If we clicked outside on mobile, also close the expanded search bar
        if (window.innerWidth < 768) {
            setIsMobileSearchOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut (Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        setIsMobileSearchOpen(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredTools = AI_TOOLS.filter(tool => 
    tool.name.toLowerCase().includes(query.toLowerCase()) || 
    tool.description.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  // Mock Data for "History" or "Content" search
  const mockHistory = [
    { id: 'h1', title: 'Marketing Campaign Q3', type: 'chat', tool: 'ChatGPT', date: '2h ago' },
    { id: 'h2', title: 'Neon City Landscape', type: 'image', tool: 'Midjourney', date: '5h ago' },
  ].filter(h => h.title.toLowerCase().includes(query.toLowerCase()));

  const handleToolClick = (tool: Tool) => {
    if (tool.isInternal) {
      setPage('studio');
    } else {
      window.open(tool.url, '_blank');
    }
    setIsOpen(false);
    setIsMobileSearchOpen(false);
    setQuery('');
  };

  const getPageTitle = () => {
    switch(activePage) {
      case 'dashboard': return 'Dashboard';
      case 'tools': return 'Tool Directory';
      case 'studio': return 'Nexus Studio';
      default: return 'Overview';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0f1117]/90 backdrop-blur-md border-b border-gray-800 h-16 flex items-center px-4 md:px-6 justify-between transition-all duration-300">
      
      {/* Left Side: Toggle & Title */}
      <div className={`flex items-center gap-3 ${isMobileSearchOpen ? 'hidden md:flex' : 'flex'}`}>
        <button 
          onClick={toggleSidebar}
          className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
          <span className="hidden md:inline hover:text-white transition-colors cursor-pointer" onClick={() => setPage('dashboard')}>Nexus</span>
          <ChevronRight size={14} className="hidden md:inline" />
          <span className="text-white font-display font-bold tracking-wide">{getPageTitle()}</span>
        </div>
      </div>

      {/* Center: Unified Search */}
      <div className={`flex-1 max-w-xl relative mx-2 ${isMobileSearchOpen ? 'w-full flex' : 'hidden md:block'}`} ref={searchRef}>
         {/* Mobile Back Button for Search */}
         {isMobileSearchOpen && (
            <button 
              onClick={() => setIsMobileSearchOpen(false)} 
              className="mr-2 text-gray-400 p-2 md:hidden"
            >
              <ArrowLeft size={20} />
            </button>
         )}

        <div className="relative group w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary-500 transition-colors" size={18} />
          <input 
            ref={inputRef}
            type="text" 
            value={query}
            onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search tools..." 
            className="w-full bg-gray-900/50 border border-gray-800 text-gray-200 text-sm rounded-xl pl-10 pr-10 md:pr-12 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 focus:bg-gray-900 transition-all"
            autoFocus={isMobileSearchOpen}
          />
          {query ? (
             <button onClick={() => { setQuery(''); inputRef.current?.focus(); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
               <X size={14} />
             </button>
          ) : (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 px-1.5 py-0.5 rounded bg-gray-800 border border-gray-700">
              <Command size={10} className="text-gray-400" />
              <span className="text-[10px] text-gray-400 font-mono">K</span>
            </div>
          )}
        </div>

        {/* Search Dropdown Results */}
        {isOpen && (query || mockHistory.length > 0) && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-[#161b22] border border-gray-700 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100 max-h-[80vh] overflow-y-auto">
            {filteredTools.length > 0 && (
              <div className="p-2">
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-2 py-1 mb-1">Tools</div>
                {filteredTools.map(tool => (
                  <button 
                    key={tool.id}
                    onClick={() => handleToolClick(tool)}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-800 hover:text-white group transition-colors text-left"
                  >
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${tool.isInternal ? 'bg-primary-900/30 text-primary-400' : 'bg-gray-800 text-gray-400'}`}>
                      {tool.isInternal ? <Zap size={14} /> : <ExternalLink size={14} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-200 group-hover:text-white truncate">{tool.name}</span>
                      </div>
                      <div className="text-xs text-gray-500 truncate">{tool.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {mockHistory.length > 0 && (
              <div className="p-2 border-t border-gray-800">
                 <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-2 py-1 mb-1">Recent</div>
                 {mockHistory.map(item => (
                   <button key={item.id} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 group transition-colors text-left">
                      <Clock size={14} className="text-gray-500 group-hover:text-gray-300 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="text-sm text-gray-300 group-hover:text-white block truncate">{item.title}</span>
                        <span className="text-xs text-gray-600 flex items-center gap-1 truncate">
                           {item.tool} • {item.date}
                        </span>
                      </div>
                   </button>
                 ))}
              </div>
            )}

            {filteredTools.length === 0 && mockHistory.length === 0 && (
              <div className="p-8 text-center text-gray-500 text-sm">
                No results found for "{query}"
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right: Actions */}
      <div className={`flex items-center gap-2 md:gap-4 ${isMobileSearchOpen ? 'hidden' : 'flex'}`}>
        {/* Mobile Search Trigger */}
        <button 
          onClick={() => setIsMobileSearchOpen(true)}
          className="md:hidden text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-800"
        >
          <Search size={20} />
        </button>

        <button className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-all">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0f1117]"></span>
        </button>
        
        <div className="h-6 w-[1px] bg-gray-800 mx-1 hidden md:block"></div>

        <button className="flex items-center gap-3 hover:bg-gray-800 p-1 md:p-1.5 md:pl-2 md:pr-4 rounded-full transition-all border border-transparent hover:border-gray-700">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-accent-purple p-[1px]">
            <div className="w-full h-full rounded-full bg-[#0f1117] flex items-center justify-center">
              <span className="text-xs font-bold text-white">JD</span>
            </div>
          </div>
          <div className="text-left hidden lg:block">
             <div className="text-xs font-medium text-white">John Doe</div>
             <div className="text-[10px] text-gray-400">Pro Plan</div>
          </div>
        </button>
      </div>
    </header>
  );
};