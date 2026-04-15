import React from 'react';
import { ArrowRight, Layout, Monitor, Moon, Sun } from 'lucide-react';

export default function LandingPage({ onStart, isLightMode, onToggleTheme }) {
  return (
    <div className="min-h-screen bg-bg-base text-text-1 flex flex-col relative overflow-x-hidden">
      {/* Navigation */}
      <nav className="h-[70px] px-10 flex items-center justify-between border-b border-border bg-bg-base sticky top-0 z-[100]">
        <div className="flex items-center gap-[10px] font-extrabold text-[20px] tracking-tighter">
          <div className="w-[10px] height-[10px] bg-blue-500 rounded-full" />
          <span>ResumeBuilder</span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            className="bg-transparent border border-border text-text-2 w-9 h-9 rounded-md flex items-center justify-center cursor-pointer transition-colors hover:bg-bg-elevated hover:text-text-1" 
            onClick={onToggleTheme} 
            title="Toggle theme"
          >
            {isLightMode ? <Moon size={18} strokeWidth={2} /> : <Sun size={18} strokeWidth={2} />}
          </button>
          <button 
            className="bg-transparent border border-border text-text-2 px-4 py-2 rounded-md text-[13px] font-semibold cursor-pointer transition-colors hover:bg-bg-elevated hover:text-text-1" 
            onClick={onStart}
          >
            Builder
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center py-20 px-5 max-w-[1200px] mx-auto">
        <h1 className="text-[clamp(40px,8vw,72px)] leading-[1.1] font-extrabold tracking-tight mb-6 text-text-1">
          Build your professional <br /> 
          story in <span className="text-blue-500">minutes.</span>
        </h1>
        
        <p className="text-lg text-text-2 max-w-[600px] leading-relaxed mb-10">
          A high-fidelity, single-page resume builder designed for <br />
          modern professionals who value speed and aesthetics.
        </p>

        <div className="flex justify-center">
          <button 
            className="bg-blue-500 text-white border-none px-9 py-4 rounded-lg text-base font-bold flex items-center gap-[10px] cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-[0_15px_30px_-10px_var(--blue-500)] hover:brightness-110 shadow-[0_10px_20px_-10px_var(--blue-500)]" 
            onClick={onStart}
          >
            Start Building
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-20 w-full">
          <div className="bg-bg-elevated border border-border p-[30px] rounded-lg text-left">
            <div className="w-11 h-11 bg-bg-base border border-border rounded-[10px] flex items-center justify-center text-blue-500 mb-5">
              <Layout size={20} />
            </div>
            <h3 className="text-base font-bold mb-2">Drag & Drop</h3>
            <p className="text-[13px] text-text-3 leading-normal">Interactive section management and reordering.</p>
          </div>
          <div className="bg-bg-elevated border border-border p-[30px] rounded-lg text-left">
            <div className="w-11 h-11 bg-bg-base border border-border rounded-[10px] flex items-center justify-center text-blue-500 mb-5">
              <Monitor size={20} />
            </div>
            <h3 className="text-base font-bold mb-2">OLED Dark Mode</h3>
            <p className="text-[13px] text-text-3 leading-normal">Immersive pitch-black interface for focused work.</p>
          </div>
          <div className="bg-bg-elevated border border-border p-[30px] rounded-lg text-left">
            <div className="w-11 h-11 bg-bg-base border border-border rounded-[10px] flex items-center justify-center text-blue-500 mb-5">
              <span className="text-xl">🖨️</span>
            </div>
            <h3 className="text-base font-bold mb-2">A4 Optimized</h3>
            <p className="text-[13px] text-text-3 leading-normal">One-click PDF export ready for single-page print.</p>
          </div>
        </div>
      </main>

      <footer className="p-10 text-center border-t border-border text-[13px] text-text-3">
        <p>&copy; 2026 ResumeBuilder. Crafted for professionals.</p>
      </footer>
    </div>
  );
}
