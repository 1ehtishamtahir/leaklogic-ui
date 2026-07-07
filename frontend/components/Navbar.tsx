"use client";

import { Activity, BarChart3, Sparkles, ChevronDown } from "lucide-react";
import Image from "next/image";

interface NavbarProps {
  hasResults: boolean;
  onReset: () => void;
}

export default function Navbar({ hasResults, onReset }: NavbarProps) {
  const scrollToSection = (sectionId: string) => {
    if (hasResults && sectionId !== '#') {
      onReset();
      setTimeout(() => {
        const element = document.querySelector(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else if (sectionId === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b backdrop-blur-xl" style={{
      background: 'rgba(0, 16, 49, 0.90)',
      borderColor: 'rgba(123, 47, 247, 0.15)',
      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
    }}>
      <div className="max-w-[1920px] mx-auto px-8 lg:px-12">
        <div className="flex items-center justify-between h-[72px]">
          
          {/* Left: Logo & Brand */}
          <button 
            onClick={() => scrollToSection('#')}
            className="flex items-center gap-4 hover:opacity-90 transition-all duration-300 group"
          >
            {/* Logo with glow effect */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-xl group-hover:opacity-30 transition-opacity rounded-full"></div>
              <div className="relative w-[52px] h-[52px]">
                <Image
                  src="/logo-leak-logic.png"
                  alt="LeakLogic AI"
                  width={52}
                  height={52}
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
            
            {/* Brand Text */}
            <div className="flex flex-col">
              <h1 className="text-[22px] font-bold tracking-tight leading-none bg-gradient-primary bg-clip-text text-transparent">
                LeakLogic AI
              </h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-[0.15em] font-semibold mt-0.5 leading-none">
                Profit Intelligence Platform
              </p>
            </div>
          </button>

          {/* Center: Navigation */}
          <nav className="hidden lg:flex items-center gap-2 absolute left-1/2 transform -translate-x-1/2">
            <button
              onClick={() => scrollToSection('#')}
              className="px-5 py-2.5 text-[13px] font-semibold text-white bg-white/8 rounded-lg border border-primary/30 hover:bg-white/12 hover:border-primary/50 transition-all duration-300 shadow-lg"
            >
              Dashboard
            </button>
            <button
              onClick={() => scrollToSection('#features')}
              className="px-5 py-2.5 text-[13px] font-medium text-slate-300 hover:text-white hover:bg-white/8 rounded-lg transition-all duration-300"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('#upload')}
              className="px-5 py-2.5 text-[13px] font-medium text-slate-300 hover:text-white hover:bg-white/8 rounded-lg transition-all duration-300"
            >
              Analyze
            </button>
          </nav>

          {/* Right: Status & Actions */}
          <div className="flex items-center gap-4">
            
            {/* System Status */}
            <div className="hidden xl:flex items-center gap-6 mr-2">
              {/* Live Indicator */}
              <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-success/10 border border-success/30">
                <div className="relative">
                  <Activity className="w-3.5 h-3.5 text-success" strokeWidth={2.5} />
                  <div className="absolute -inset-1 bg-success/30 rounded-full blur-sm animate-pulse"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-success leading-none">SYSTEM LIVE</span>
                  <span className="text-[9px] text-success/60 leading-none mt-0.5">Optimal</span>
                </div>
              </div>

              {/* AI Badge */}
              <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg border relative overflow-hidden" style={{
                background: 'linear-gradient(135deg, rgba(123, 47, 247, 0.08) 0%, rgba(232, 41, 156, 0.08) 100%)',
                borderColor: 'rgba(123, 47, 247, 0.3)',
              }}>
                <Sparkles className="w-3.5 h-3.5 text-primary" strokeWidth={2.5} />
                <span className="text-[11px] font-bold text-primary tracking-wide">AI POWERED</span>
              </div>
            </div>

            {/* CTA Button */}
            {hasResults ? (
              <button
                onClick={onReset}
                className="relative px-6 py-2.5 text-[13px] font-bold text-white rounded-lg transition-all duration-300 hover:scale-[1.02] shadow-xl hover:shadow-2xl group overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #7B2FF7 0%, #E8299C 100%)',
                }}
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" strokeWidth={2.5} />
                  New Analysis
                </span>
              </button>
            ) : (
              <button
                onClick={() => scrollToSection('#upload')}
                className="relative px-6 py-2.5 text-[13px] font-bold text-white rounded-lg transition-all duration-300 hover:scale-[1.02] shadow-xl hover:shadow-2xl group overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #7B2FF7 0%, #E8299C 100%)',
                }}
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative flex items-center gap-2">
                  Get Started
                  <ChevronDown className="w-3.5 h-3.5" strokeWidth={3} />
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
