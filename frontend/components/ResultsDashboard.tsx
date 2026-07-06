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
        return "text-red-600 bg-red-50 border-red-200";
      case "discount":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "supplier":
        return "text-purple-600 bg-purple-50 border-purple-200";
      case "inventory":
        return "text-blue-600 bg-blue-50 border-blue-200";
      default:
        return "text-slate-600 bg-slate-50 border-slate-200";
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
    <div className="max-w-6xl mx-auto">
      {/* Summary Section */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-xl p-8 mb-8 text-white">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Analysis Complete</h2>
            <p className="text-red-100">{result.executive_summary}</p>
          </div>
          <button
            onClick={handleExportPDF}
            className="bg-white text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-50 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export PDF
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-white/20 p-2 rounded-lg">
                <TrendingDown className="w-6 h-6" />
              </div>
              <div>
                <p className="text-red-100 text-sm">Total Leaks Detected</p>
                <p className="text-3xl font-bold">{result.findings.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-white/20 p-2 rounded-lg">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <p className="text-red-100 text-sm">Estimated Impact</p>
                <p className="text-3xl font-bold">
                  ${Math.abs(result.total_estimated_leak).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-white/20 p-2 rounded-lg">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-red-100 text-sm">Avg Confidence</p>
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
        <h3 className="text-2xl font-bold text-slate-900 mb-6">
          Profit Leaks (Ranked by Impact)
        </h3>

        <div className="space-y-4">
          {result.findings.map((finding, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden border-2 border-slate-200 hover:border-blue-300 transition-all"
            >
              {/* Leak Header */}
              <button
                onClick={() => toggleLeak(index)}
                className="w-full p-6 flex items-start justify-between hover:bg-slate-50 transition-colors"
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
                      <span className="text-sm text-slate-600">
                        Confidence: {(finding.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-1">
                      {finding.title}
                    </h4>
                    <p className="text-slate-600 font-medium">
                      {finding.entity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-600 mb-1">Impact</p>
                    <p className="text-2xl font-bold text-red-600">
                      -${Math.abs(finding.dollar_impact).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="ml-4">
                  {expandedLeak === index ? (
                    <ChevronUp className="w-6 h-6 text-slate-400" />
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
