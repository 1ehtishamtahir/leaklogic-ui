"use client";

import { useState } from "react";
import UploadSection from "@/components/UploadSection";
import ResultsDashboard from "@/components/ResultsDashboard";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import { AnalysisResult } from "@/types";

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen" style={{ background: '#0F0F10' }}>
      {/* Header - Astral Style */}
      <header className="sticky top-0 z-50 border-b" style={{
        background: 'rgba(15, 15, 16, 0.95)',
        backdropFilter: 'blur(20px)',
        borderColor: 'rgba(39, 39, 42, 0.5)',
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                  <span className="text-white font-black text-xl">L</span>
                </div>
                <div>
                  <h1 className="text-xl font-black text-white">
                    LEAKLOGIC
                  </h1>
                  <p className="text-xs text-primary uppercase tracking-wider font-semibold">
                    ENTERPRISE UI
                  </p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2 ml-8">
                <div className="px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer">
                  CORE
                </div>
                <div className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-primary/10 text-primary border border-primary/30">
                  DASHBOARD
                </div>
              </div>
            </div>
            {analysisResult && (
              <button
                onClick={handleReset}
                className="px-4 py-2 text-sm font-bold text-white rounded-lg transition-all duration-300"
                style={{
                  background: 'rgba(99, 102, 241, 0.15)',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                }}
              >
                New Analysis
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!analysisResult ? (
          <>
            <HeroSection />
            <FeaturesSection />
            <div id="upload" className="py-8">
              <UploadSection
                onAnalysisComplete={handleAnalysisComplete}
                isAnalyzing={isAnalyzing}
                setIsAnalyzing={setIsAnalyzing}
              />
            </div>
          </>
        ) : (
          <div className="py-8">
            <ResultsDashboard result={analysisResult} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t" style={{
        background: 'rgba(15, 15, 16, 0.95)',
        borderColor: 'rgba(39, 39, 42, 0.5)',
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-slate-500">
            Built for AMD Developer Hackathon: ACT II - Unicorn Track
          </p>
        </div>
      </footer>
    </div>
  );
}
