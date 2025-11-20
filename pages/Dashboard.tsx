import React from 'react';
import { SKILLS_2026, AI_TOOLS } from '../constants';
import { ToolCategory } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

export const Dashboard: React.FC = () => {
  // Process data for charts
  const toolsPerCategory = Object.values(ToolCategory).map(cat => ({
    name: cat,
    value: AI_TOOLS.filter(t => t.category === cat).length,
    color: ['#6366f1', '#ec4899', '#06b6d4', '#8b5cf6', '#f43f5e', '#10b981', '#f59e0b', '#3b82f6'][Math.floor(Math.random() * 8)]
  }));

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 animate-fade-in overflow-y-auto h-full pb-24 scrollbar-hide">
      {/* Header Section */}
      <div className="relative rounded-3xl bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border border-white/5 p-6 md:p-8 overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">Welcome back, Architect</h1>
            <p className="text-sm md:text-base text-gray-400 max-w-xl">The 2026 AI Landscape is evolving. You have <span className="text-white font-bold">12</span> new tools to review.</p>
          </div>
          <div className="text-left md:text-right bg-gray-900/50 px-4 py-2 md:px-6 md:py-3 rounded-2xl border border-white/5 backdrop-blur-sm self-start md:self-auto">
            <div className="text-2xl md:text-3xl font-mono text-accent-cyan font-bold">120+</div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Tools Indexed</div>
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
           <h2 className="text-lg md:text-xl font-bold text-white">Core Skills 2026</h2>
           <button className="text-xs md:text-sm text-primary-400 hover:text-primary-300">View Roadmap &rarr;</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILLS_2026.map((skill, idx) => (
            <div key={idx} className="bg-gray-900/40 border border-gray-800 p-4 md:p-5 rounded-2xl hover:bg-gray-800/60 transition-all duration-300 group">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-base md:text-lg text-white group-hover:text-primary-400 transition-colors">
                  <span className="text-gray-600 mr-2 text-xs">0{idx + 1}</span>
                  {skill.title}
                </h3>
              </div>
              <p className="text-xs md:text-sm text-gray-400 mb-3 leading-snug">{skill.description}</p>
              <div className="flex flex-wrap gap-2">
                {skill.tools.map((t, i) => (
                  <span key={i} className="px-2 py-1 bg-gray-800 rounded-md text-[10px] font-mono text-gray-300 border border-gray-700">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Category Distribution */}
        <div className="bg-gray-900/40 border border-gray-800 p-4 md:p-6 rounded-2xl">
          <h3 className="text-base md:text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
            Ecosystem Distribution
          </h3>
          <div className="h-56 md:h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={toolsPerCategory}>
                <XAxis dataKey="name" stroke="#4b5563" fontSize={10} tickLine={false} axisLine={false} dy={10} interval={0} angle={-45} textAnchor="end" height={60} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: '#161b22', borderColor: '#374151', color: '#f3f4f6', borderRadius: '8px', fontSize: '12px' }}
                  itemStyle={{ color: '#f3f4f6' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {toolsPerCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Mastery Radial */}
        <div className="bg-gray-900/40 border border-gray-800 p-4 md:p-6 rounded-2xl flex flex-col relative overflow-hidden">
           <h3 className="text-base md:text-lg font-bold text-white mb-4 flex items-center gap-2 z-10">
             <span className="w-2 h-2 bg-accent-purple rounded-full"></span>
             Domain Mastery
           </h3>
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
           
           <div className="relative flex-1 min-h-[200px] md:min-h-[250px]">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={toolsPerCategory}
                   cx="50%"
                   cy="50%"
                   innerRadius={50}
                   outerRadius={70}
                   paddingAngle={5}
                   dataKey="value"
                   stroke="none"
                 >
                   {toolsPerCategory.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} />
                   ))}
                 </Pie>
                 <Tooltip contentStyle={{ backgroundColor: '#161b22', borderColor: '#374151', color: '#f3f4f6', borderRadius: '8px', fontSize: '12px' }}/>
               </PieChart>
             </ResponsiveContainer>
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none flex-col">
                  <div className="text-2xl md:text-3xl font-bold text-white">2026</div>
                  <div className="text-[10px] text-gray-400 tracking-widest uppercase">Projection</div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};