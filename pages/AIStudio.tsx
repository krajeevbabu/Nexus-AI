import React, { useState, useRef, useEffect } from 'react';
import { generateText, generateCode, generateImage } from '../services/geminiService';
import { StudioMode } from '../types';
import { Send, Code, Image as ImageIcon, MessageSquare, Loader2, ArrowDown } from 'lucide-react';

export const AIStudio: React.FC = () => {
  const [mode, setMode] = useState<StudioMode>(StudioMode.Chat);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Reset output when mode changes to avoid type mismatch errors (e.g. displaying text in image tag)
  useEffect(() => {
    setOutput(null);
    setError(null);
    setInput('');
  }, [mode]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (output || isLoading) {
      scrollToBottom();
    }
  }, [output, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setError(null);
    
    try {
      let result;
      switch (mode) {
        case StudioMode.Chat:
          result = await generateText(input);
          setOutput(result);
          break;
        case StudioMode.Code:
          result = await generateCode(input);
          setOutput(result);
          break;
        case StudioMode.ImageGen:
          result = await generateImage(input);
          if (!result) throw new Error("Image generation failed or not available.");
          setOutput(result);
          break;
      }
    } catch (err: any) {
      setError(err.message || "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-[#0f1117] relative">
      
      {/* Mobile/Desktop Mode Switcher Tab Bar */}
      <div className="flex-shrink-0 bg-gray-900/50 border-b border-gray-800 p-2 flex gap-2 overflow-x-auto scrollbar-hide">
        {[
          { id: StudioMode.Chat, icon: MessageSquare, label: 'Chat' },
          { id: StudioMode.Code, icon: Code, label: 'Code' },
          { id: StudioMode.ImageGen, icon: ImageIcon, label: 'Image' }
        ].map((item) => (
           <button
             key={item.id}
             onClick={() => setMode(item.id as StudioMode)}
             className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap flex-1 justify-center md:flex-none ${
               mode === item.id 
                 ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20' 
                 : 'text-gray-400 hover:bg-gray-800'
             }`}
           >
             <item.icon size={16} />
             {item.label}
           </button>
        ))}
      </div>

      {/* Main Content Area (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-hide pb-32">
        {/* Intro State */}
        {!output && !isLoading && (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-50 mt-10 md:mt-0">
            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-6 animate-pulse">
               {mode === StudioMode.Chat && <MessageSquare size={32} className="text-primary-500" />}
               {mode === StudioMode.Code && <Code size={32} className="text-accent-cyan" />}
               {mode === StudioMode.ImageGen && <ImageIcon size={32} className="text-accent-pink" />}
            </div>
            <h3 className="text-xl font-bold text-gray-300 mb-2">
              {mode === StudioMode.Chat ? 'Nexus Chat' : mode === StudioMode.Code ? 'Nexus Coder' : 'Nexus Vision'}
            </h3>
            <p className="max-w-xs text-sm text-gray-500">
              {mode === StudioMode.Chat && "Ask me anything about AI, tech, or strategy."}
              {mode === StudioMode.Code && "Generate React components, Python scripts, and more."}
              {mode === StudioMode.ImageGen && "Describe a scene to generate high-quality art."}
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-900/20 border border-red-900 text-red-200 p-4 rounded-xl mb-4 text-sm flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            Error: {error}
          </div>
        )}

        {/* Result Output */}
        {output && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-4 md:p-6 shadow-xl relative overflow-hidden">
              
              {/* Type Badge */}
              <div className="absolute top-0 right-0 p-2 opacity-20 pointer-events-none">
                {mode === StudioMode.Chat && <MessageSquare size={80} />}
                {mode === StudioMode.Code && <Code size={80} />}
                {mode === StudioMode.ImageGen && <ImageIcon size={80} />}
              </div>

              {mode === StudioMode.ImageGen ? (
                <div className="flex flex-col items-center relative z-10">
                  <img src={output} alt="Generated" className="rounded-xl shadow-lg w-full max-h-[400px] object-contain bg-black/20" />
                  <a href={output} download="nexus-gen.jpg" className="mt-4 text-sm text-primary-400 hover:text-primary-300 py-2 px-4 bg-primary-900/20 rounded-lg flex items-center gap-2 transition-colors hover:bg-primary-900/40">
                    <ArrowDown size={14} /> Download Image
                  </a>
                </div>
              ) : mode === StudioMode.Code ? (
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-2 text-xs text-gray-500 uppercase font-bold tracking-wider">
                    <span>Generated Code</span>
                    <button 
                      onClick={() => navigator.clipboard.writeText(output)}
                      className="text-primary-400 hover:text-primary-300"
                    >
                      Copy
                    </button>
                  </div>
                  <pre className="bg-[#0d1117] p-3 md:p-4 rounded-xl overflow-x-auto text-xs md:text-sm font-mono text-gray-300 border border-gray-700 shadow-inner custom-scrollbar">
                    <code>{output}</code>
                  </pre>
                </div>
              ) : (
                <div className="prose prose-invert max-w-none relative z-10">
                  <p className="whitespace-pre-wrap text-gray-200 leading-relaxed text-sm md:text-base">{output}</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Loading Indicator inline */}
        {isLoading && (
          <div className="flex justify-center mt-4">
            <div className="bg-gray-800/80 backdrop-blur rounded-full px-4 py-2 flex items-center gap-3 shadow-lg border border-gray-700 animate-pulse">
               <Loader2 size={16} className="text-primary-500 animate-spin" />
               <span className="text-xs text-gray-300 font-medium">Nexus is thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Fixed Input Area */}
      <div className="absolute bottom-0 left-0 w-full bg-[#0f1117]/95 backdrop-blur border-t border-gray-800 p-3 md:p-4 pb-6 md:pb-6 z-20">
        <div className="max-w-4xl mx-auto relative">
          <form onSubmit={handleSubmit} className="relative flex items-end gap-2">
             <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  mode === StudioMode.Chat ? "Ask Nexus anything..." :
                  mode === StudioMode.Code ? "Describe the code you need..." :
                  "Describe the image to generate..."
                }
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-2xl pl-4 pr-12 py-3 focus:outline-none focus:border-primary-600 resize-none shadow-lg min-h-[50px] max-h-[120px] text-sm transition-all focus:ring-1 focus:ring-primary-600/50 placeholder:text-gray-600"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-2 bottom-2 bg-primary-600 hover:bg-primary-500 text-white p-2 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex-shrink-0 disabled:hover:bg-primary-600 transform hover:scale-105 active:scale-95"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
          </form>
          <div className="text-center mt-2">
             <p className="text-[10px] text-gray-600">
               Nexus AI can make mistakes. Consider checking important information.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};