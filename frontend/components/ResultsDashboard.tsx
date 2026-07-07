"use client";

import { useState } from "react";
import { AnalysisResult, Finding } from "@/types";
import {
  TrendingDown,
  DollarSign,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Download,
} from "lucide-react";
import LeakCard from "./LeakCard";

interface ResultsDashboardProps {
  result: AnalysisResult;
}

export default function ResultsDashboard({ result }: ResultsDashboardProps) {
  const [expandedLeak, setExpandedLeak] = useState<number | null>(0);

  const toggleLeak = (index: number) => {
    setExpandedLeak(expandedLeak === index ? null : index);
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "refund":
        return "text-danger bg-danger/10 border-danger/30";
      case "discount":
        return "text-warning bg-warning/10 border-warning/30";
      case "supplier":
        return "text-accent bg-accent/10 border-accent/30";
      case "inventory":
        return "text-primary bg-primary/10 border-primary/30";
      default:
        return "text-slate-400 bg-slate-800 border-slate-600";
    }
  };

  const getCategoryIcon = (category: string) => {
    return "💰";
  };

  const handleExportPDF = () => {
    // TODO: Implement PDF export
    alert("PDF export coming soon!");
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      {/* Summary Section */}
      <div className="bg-gradient-to-r from-danger via-danger/90 to-warning rounded-xl shadow-card shadow-glow-danger p-8 mb-8 text-white">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Analysis Complete ✨</h2>
            <p className="text-white/90">{result.executive_summary}</p>
          </div>
          <button
            onClick={handleExportPDF}
            className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium hover:bg-white/20 border border-white/20 transition-all duration-300 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export PDF
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="glass-effect rounded-lg p-4 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-white/20 p-2 rounded-lg">
                <TrendingDown className="w-6 h-6" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Total Leaks Detected</p>
                <p className="text-3xl font-bold">{result.findings.length}</p>
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-lg p-4 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-white/20 p-2 rounded-lg">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Estimated Impact</p>
                <p className="text-3xl font-bold">
                  ${Math.abs(result.total_estimated_leak).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-lg p-4 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-white/20 p-2 rounded-lg">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Avg Confidence</p>
                <p className="text-3xl font-bold">
                  {(
                    (result.findings.reduce((acc, f) => acc + f.confidence, 0) /
                      result.findings.length) *
                    100
                  ).toFixed(0)}
                  %
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Findings Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-6">
          Profit Leaks (Ranked by Impact)
        </h3>

        <div className="space-y-4">
          {result.findings.map((finding, index) => (
            <div
              key={index}
              className="glass-effect rounded-xl shadow-card overflow-hidden border-2 border-primary/20 hover:border-primary/50 hover:shadow-card-hover transition-all duration-300"
            >
              {/* Leak Header */}
              <button
                onClick={() => toggleLeak(index)}
                className="w-full p-6 flex items-start justify-between hover:bg-white/5 transition-colors"
              >
                <div className="flex items-start gap-4 flex-1 text-left">
                  <div className="text-3xl">{getCategoryIcon(finding.category)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(
                          finding.category
                        )}`}
                      >
                        {finding.category.toUpperCase()}
                      </span>
                      <span className="text-sm text-slate-400">
                        Confidence: {(finding.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-1">
                      {finding.title}
                    </h4>
                    <p className="text-slate-300 font-medium">
                      {finding.entity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-400 mb-1">Impact</p>
                    <p className="text-2xl font-bold text-danger">
                      -${Math.abs(finding.dollar_impact).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="ml-4">
                  {expandedLeak === index ? (
                    <ChevronUp className="w-6 h-6 text-primary" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Expanded Details */}
              {expandedLeak === index && (
                <LeakCard finding={finding} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
