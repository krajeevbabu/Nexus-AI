import React, { useState, useMemo } from 'react';
import { AI_TOOLS } from '../constants';
import { ToolCategory } from '../types';
import { Search, ExternalLink, Zap, Filter, Star } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

export const ToolExplorer: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Object.values(ToolCategory)];

  const filteredTools = useMemo(() => {
    return AI_TOOLS.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase()) || 
                            tool.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const getIcon = (iconName: string) => {
    // @ts-ignore
    const IconComponent = LucideIcons[iconName] || LucideIcons.Cpu;
    return <IconComponent size={24} />;
  };

  return (
    <div className="h-full flex flex-col overflow-hidden bg-[#0f1117]">
      <div className="flex-shrink-0 px-4 py-4 md:px-8 md:py-6 space-y-4 bg-[#0f1117] z-10 border-b border-gray-800/50">
        <div className="flex flex-col md:flex-row justify-between items-end gap-2">
           <div className="w-full md:w-auto">
              <h1 className="text-xl md:text-2xl font-display font-bold text-white mb-1">Tool Directory</h1>
              <p className="text-xs md:text-sm text-gray-400">Explore the 120+ curated AI tools for the 2026 landscape.</p>
           </div>
           <div className="text-xs text-gray-500 font-mono hidden md:block">
             Showing {filteredTools.length} tools
           </div>
        </div>

        {/* Filters Scroll - Fixed overflow and spacing */}
        <div className="relative">
          <div className="flex overflow-x-auto gap-2 pb-3 pt-1 scrollbar-hide w-full mask-fade-right">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-[11px] md:text-xs font-bold uppercase tracking-wide whitespace-nowrap transition-all border flex-shrink-0 select-none ${
                  selectedCategory === cat 
                    ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)] transform scale-105' 
                    : 'bg-gray-900 text-gray-400 border-gray-800 hover:border-gray-600 hover:text-gray-200 hover:bg-gray-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          {/* Fade Effect for Scroll Hint */}
          <div className="absolute right-0 top-0 bottom-3 w-8 bg-gradient-to-l from-[#0f1117] to-transparent pointer-events-none md:hidden"></div>
        </div>
      </div>

      {/* Scrollable Grid */}
      <div className="flex-1 overflow-y-auto px-4 py-4 md:px-8 pb-32">
        {filteredTools.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <Search size={48} className="mb-4 opacity-20" />
            <p>No tools found matching your criteria.</p>
            <button onClick={() => {setSearch(''); setSelectedCategory('All');}} className="mt-4 text-primary-400 text-sm hover:underline">Clear filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {filteredTools.map((tool) => (
              <div key={tool.id} className="group bg-gray-900/40 border border-gray-800 hover:border-primary-500/30 rounded-2xl p-4 md:p-5 transition-all duration-300 hover:bg-gray-800/60 flex flex-col relative overflow-hidden hover:shadow-lg hover:shadow-primary-900/10">
                {/* Popular Badge */}
                {tool.popular && (
                    <div className="absolute top-3 right-3">
                      <div className="bg-primary-500/20 text-primary-300 text-[9px] font-bold px-2 py-1 rounded-full flex items-center gap-1 border border-primary-500/20 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                        <Star size={8} fill="currentColor" /> POPULAR
                      </div>
                    </div>
                )}
                
                <div className="flex items-start gap-3 mb-3 pr-16">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 ${
                    tool.isInternal 
                      ? 'bg-gradient-to-br from-primary-500/20 to-accent-purple/20 text-accent-purple border border-accent-purple/20' 
                      : 'bg-gray-800 text-gray-400 border border-gray-700'
                  }`}>
                    {getIcon(tool.icon)}
                  </div>
                  <div className="pt-1 min-w-0">
                    <h3 className="font-bold text-white leading-tight text-base md:text-lg group-hover:text-primary-400 transition-colors truncate">{tool.name}</h3>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">{tool.category}</span>
                  </div>
                </div>
                
                <p className="text-xs md:text-sm text-gray-400 mb-4 flex-grow leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">
                  {tool.description}
                </p>
                
                <div className="mt-auto">
                    {tool.isInternal ? (
                      <button className="w-full py-2 md:py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-accent-purple text-white font-medium text-xs md:text-sm shadow-lg hover:shadow-primary-500/25 transition-all flex items-center justify-center gap-2 active:scale-95">
                        <Zap size={16} /> Launch Studio
                      </button>
                    ) : (
                      <a 
                        href={tool.url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-full py-2 md:py-2.5 rounded-xl bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700 hover:text-white hover:border-gray-600 transition-all flex items-center justify-center gap-2 font-medium text-xs md:text-sm group-hover:bg-gray-750"
                      >
                        Visit Website <ExternalLink size={14} />
                      </a>
                    )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};