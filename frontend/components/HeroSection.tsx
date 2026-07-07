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
    <div className="relative min-h-[700px] lg:min-h-[800px]">
      {/* Spline Background - Full Width, Fixed */}
      <div className="absolute inset-0 w-full h-full">
        <SplineBackground />
      </div>

      {/* Hero Content - Positioned Left with 60% width (20% overlap) */}
      <div className="relative z-10 w-full lg:w-[60%] py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        {/* Gradient background for text readability */}
        <div 
          className={`rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:py-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}
          style={{
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
        
        {/* Status Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider"
            style={{
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#10B981',
            }}
          >
            <div className="relative">
              <Activity className="w-4 h-4" />
              <div className="absolute -inset-1 bg-success/30 rounded-full blur-sm animate-pulse"></div>
            </div>
            All Systems Operational
          </div>
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-300"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Enterprise Grade Security
          </div>
        </div>

        {/* Main Heading - Bold Astral Style */}
        <div className="mb-6 sm:mb-8 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight mb-4 sm:mb-6 text-left">
            <span className="block">FIND EVERY LEAK,</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-danger">
              PROTECT EVERY
            </span>
            <span className="block">PROFIT</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed text-left mb-6">
            AI-powered analysis that identifies hidden profit leaks in your business data. 
            <span className="block mt-2 text-slate-400">Upload your sales, refunds, supplier, and inventory data to discover where revenue is slipping through the cracks.</span>
          </p>

          {/* Product Features */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-success" />
              <span><span className="font-semibold text-white">Instant</span> Detection</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-success" />
              <span><span className="font-semibold text-white">7+</span> Leak Categories</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-success" />
              <span><span className="font-semibold text-white">AI-Powered</span> Insights</span>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <a
            href="#upload"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #7B2FF7 0%, #E8299C 100%)',
              boxShadow: '0 10px 40px rgba(123, 47, 247, 0.5)',
            }}
          >
            <span className="text-white">Try Free Analysis</span>
            <ArrowDown className="w-5 h-5 text-white group-hover:translate-y-1 transition-transform" />
          </a>

          <button className="text-slate-300 hover:text-white font-semibold text-base transition-colors flex items-center gap-2 group">
            View Sample Report
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
        </div>
      </div>

      {/* Bottom Metric Cards - Full Width Below Hero */}
      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-8 px-4 sm:px-6 lg:px-8">
        {/* Detection Categories */}
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:scale-105"
          style={{
            background: 'rgba(24, 24, 27, 0.9)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(123, 47, 247, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl" style={{ background: 'rgba(123, 47, 247, 0.15)' }}>
              <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-primary" />
            </div>
          </div>
          <div className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-1">Detection Types</div>
          <div className="text-xl sm:text-2xl font-bold text-white">7+ Categories</div>
        </div>

        {/* Analysis Speed */}
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:scale-105"
          style={{
            background: 'rgba(24, 24, 27, 0.9)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl" style={{ background: 'rgba(16, 185, 129, 0.15)' }}>
              <Activity className="w-4 h-4 sm:w-6 sm:h-6 text-success" />
            </div>
          </div>
          <div className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-1">Analysis Time</div>
          <div className="text-xl sm:text-2xl font-bold text-white">&lt;60 Seconds</div>
        </div>

        {/* File Support */}
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:scale-105"
          style={{
            background: 'rgba(24, 24, 27, 0.9)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(232, 41, 156, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl" style={{ background: 'rgba(232, 41, 156, 0.15)' }}>
              <svg className="w-4 h-4 sm:w-6 sm:h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <div className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-1">File Support</div>
          <div className="text-xl sm:text-2xl font-bold text-white">CSV Upload</div>
        </div>

        {/* AI Powered */}
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:scale-105"
          style={{
            background: 'rgba(24, 24, 27, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 122, 61, 0.2)',
          }}
        >
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/5 relative">
              <div className="text-xs font-bold text-white">AI</div>
              <div className="absolute -right-1 -bottom-1 w-2 sm:w-3 h-6 sm:h-8 rounded-l-full" 
                style={{ background: 'linear-gradient(to top, #7B2FF7 0%, #E8299C 100%)' }}
              />
            </div>
          </div>
          <div className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-1">Technology</div>
          <div className="text-xl sm:text-2xl font-bold text-white">Powered</div>
        </div>
      </div>
    </div>
  );
}
