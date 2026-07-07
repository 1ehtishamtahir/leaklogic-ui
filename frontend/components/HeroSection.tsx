"use client";

import { ArrowDown, Activity, TrendingUp, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import Spline to avoid SSR issues
const SplineBackground = dynamic(() => import("./SplineBackground"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary/20 via-accent/20 to-transparent animate-pulse" />
  ),
});

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative py-8">
      {/* Large Hero Card - Astral Style */}
      <div 
        className={`relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{
          background: 'rgba(15, 15, 16, 0.7)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
        }}
      >
        {/* 3D Spline Background */}
        <SplineBackground />
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/40 pointer-events-none" />
        
        {/* Status Badges */}
        <div className="relative z-10 flex flex-wrap items-center gap-3 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
            style={{
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#10B981',
            }}
          >
            <Activity className="w-4 h-4" />
            SYSTEM LIVE
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-slate-400"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <CheckCircle2 className="w-4 h-4" />
            PERFORMANCE OPTIMAL
          </div>
        </div>

        {/* Main Heading - Bold Astral Style */}
        <div className="relative z-10 mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight mb-6">
            <span className="block">LEAKLOGIC</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
              MANAGEMENT
            </span>
            <span className="block">ENGINE</span>
          </h1>
          
          <p className="text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Your business intelligence hub is synchronized. You have <span className="text-primary font-semibold">12 pending operations</span> and <span className="text-success font-semibold">3 active</span> leak detection requests.
          </p>
        </div>

        {/* Stats Section - Right Aligned Like Astral */}
        <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
          <a
            href="#upload"
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl font-bold text-base transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
              boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)',
            }}
          >
            <span className="text-white whitespace-nowrap">Start Analysis</span>
            <ArrowDown className="w-5 h-5 text-white group-hover:translate-y-1 transition-transform" />
          </a>

          <div className="flex gap-8 sm:gap-12">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">$42.8k</div>
              <div className="text-xs sm:text-sm text-slate-400 uppercase tracking-wider font-medium whitespace-nowrap">Monthly Yield</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">94.2%</div>
              <div className="text-xs sm:text-sm text-slate-400 uppercase tracking-wider font-medium whitespace-nowrap">Consistency</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Metric Cards - Astral Style */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-6">
        {/* Liquidity Pool Card */}
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:scale-105"
          style={{
            background: 'rgba(24, 24, 27, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
          }}
        >
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl" style={{ background: 'rgba(99, 102, 241, 0.15)' }}>
              <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-primary" />
            </div>
            <div className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-success">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">+32.5%</span>
            </div>
          </div>
          <div className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-1">Leak Types</div>
          <div className="text-xl sm:text-2xl font-bold text-white">7+</div>
        </div>

        {/* Active Accounts Card */}
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:scale-105"
          style={{
            background: 'rgba(24, 24, 27, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
          }}
        >
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl" style={{ background: 'rgba(16, 185, 129, 0.15)' }}>
              <Activity className="w-4 h-4 sm:w-6 sm:h-6 text-success" />
            </div>
            <div className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-success">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">+18.2%</span>
            </div>
          </div>
          <div className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-1">Accuracy Rate</div>
          <div className="text-xl sm:text-2xl font-bold text-white">95%</div>
        </div>

        {/* Market Share Card */}
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:scale-105"
          style={{
            background: 'rgba(24, 24, 27, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
          }}
        >
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl" style={{ background: 'rgba(239, 68, 68, 0.15)' }}>
              <svg className="w-4 h-4 sm:w-6 sm:h-6 text-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-danger">
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
              <span className="hidden sm:inline">-3.1%</span>
            </div>
          </div>
          <div className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-1">Avg Detected</div>
          <div className="text-xl sm:text-2xl font-bold text-white">$193K</div>
        </div>

        {/* System Tickets Card */}
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:scale-105"
          style={{
            background: 'rgba(24, 24, 27, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(245, 158, 11, 0.2)',
          }}
        >
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/5 relative">
              <div className="text-xs font-bold text-white">STABLE</div>
              <div className="absolute -right-1 -bottom-1 w-2 sm:w-3 h-6 sm:h-8 rounded-l-full" 
                style={{ background: 'linear-gradient(to top, #6366F1 0%, #8B5CF6 100%)' }}
              />
            </div>
            <div className="text-xs sm:text-sm font-semibold text-white">0.34ms</div>
          </div>
          <div className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-1">Response Time</div>
          <div className="text-xl sm:text-2xl font-bold text-white">Fast</div>
        </div>
      </div>
    </div>
  );
}
