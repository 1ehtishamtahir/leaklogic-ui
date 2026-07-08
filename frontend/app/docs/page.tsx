"use client";

import { BookOpen, Upload, BarChart3, AlertTriangle, TrendingDown, FileSpreadsheet, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="min-h-screen relative bg-transparent">
      {/* Ambient floating orbs */}
      <div className="orb orb-violet" />
      <div className="orb orb-cyan" />

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 max-w-5xl mx-auto">
        {/* Back Button */}
        <Link href="/#dashboard">
          <button className="mb-8 flex items-center gap-2 text-slate-400 hover:text-violet-400 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Dashboard</span>
          </button>
        </Link>

        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
                boxShadow: '0 0 24px rgba(167, 139, 250, 0.4)',
              }}
            >
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Documentation
            </h1>
          </div>
          <p className="text-lg text-slate-400">
            Learn how to use LeakLogic AI to detect and prevent profit leaks in your business
          </p>
        </div>

        {/* Quick Start Guide */}
        <div
          className="rounded-2xl p-8 border mb-8"
          style={{
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(16px)',
            borderColor: 'rgba(255,255,255,0.1)',
          }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            Quick Start Guide
          </h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div 
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                style={{
                  background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
                }}
              >
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Prepare Your Data</h3>
                <p className="text-slate-400">
                  Export your business data as CSV files. LeakLogic AI supports sales data, inventory records, 
                  refund transactions, and supplier information.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div 
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                style={{
                  background: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
                }}
              >
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Upload Files</h3>
                <p className="text-slate-400">
                  Navigate to the upload section and drag-and-drop your CSV files or click to browse. 
                  You can upload multiple files at once.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div 
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                style={{
                  background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
                }}
              >
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Run Analysis</h3>
                <p className="text-slate-400">
                  Click "Analyze Data" and our AI will process your files, typically completing in under 30 seconds. 
                  The system will detect patterns and anomalies across your data.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div 
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                style={{
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                }}
              >
                4
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Review Results</h3>
                <p className="text-slate-400">
                  Examine the detected leaks, view detailed analytics, and get actionable recommendations 
                  to plug profit leaks and improve your bottom line.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Supported Data Types */}
        <div
          className="rounded-2xl p-8 border mb-8"
          style={{
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(16px)',
            borderColor: 'rgba(255,255,255,0.1)',
          }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <FileSpreadsheet className="w-6 h-6 text-cyan-400" />
            Supported Data Types
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Sales Data",
                description: "Transaction records, order IDs, dates, amounts, products, quantities",
                icon: BarChart3,
                color: "#7C3AED"
              },
              {
                title: "Inventory Records",
                description: "Stock levels, product IDs, reorder points, warehouse data",
                icon: FileSpreadsheet,
                color: "#06B6D4"
              },
              {
                title: "Refund Data",
                description: "Return transactions, refund amounts, reasons, dates, product info",
                icon: TrendingDown,
                color: "#EF4444"
              },
              {
                title: "Supplier Information",
                description: "Vendor details, pricing, delivery times, payment terms",
                icon: Upload,
                color: "#A78BFA"
              },
            ].map(({ title, description, icon: Icon, color }) => (
              <div
                key={title}
                className="rounded-xl p-5 border"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  borderColor: 'rgba(255,255,255,0.08)',
                }}
              >
                <div className="flex items-start gap-3">
                  <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color }} />
                  <div>
                    <h3 className="font-semibold text-white mb-1">{title}</h3>
                    <p className="text-sm text-slate-400">{description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Types of Leaks Detected */}
        <div
          className="rounded-2xl p-8 border mb-8"
          style={{
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(16px)',
            borderColor: 'rgba(255,255,255,0.1)',
          }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
            Types of Leaks Detected
          </h2>
          
          <div className="space-y-4">
            {[
              {
                title: "Excessive Discounts",
                description: "Identifies products with unusually high discount rates that may be eroding profit margins.",
                severity: "Medium"
              },
              {
                title: "Abnormal Refund Patterns",
                description: "Detects suspicious refund activity, including high refund rates or unusual timing patterns.",
                severity: "High"
              },
              {
                title: "Inventory Inefficiencies",
                description: "Spots overstocking, understocking, and products with poor turnover rates.",
                severity: "Low"
              },
              {
                title: "Supplier Issues",
                description: "Flags potential problems with supplier pricing, delivery reliability, or payment terms.",
                severity: "Medium"
              },
            ].map(({ title, description, severity }) => (
              <div
                key={title}
                className="rounded-xl p-5 border"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  borderColor: 'rgba(255,255,255,0.08)',
                }}
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-semibold text-white">{title}</h3>
                  <span 
                    className="px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background: severity === 'High' ? 'rgba(239, 68, 68, 0.15)' : 
                                 severity === 'Medium' ? 'rgba(251, 191, 36, 0.15)' : 
                                 'rgba(59, 130, 246, 0.15)',
                      color: severity === 'High' ? '#EF4444' : 
                             severity === 'Medium' ? '#FBB936' : 
                             '#3B82F6'
                    }}
                  >
                    {severity}
                  </span>
                </div>
                <p className="text-sm text-slate-400">{description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Best Practices */}
        <div
          className="rounded-2xl p-8 border"
          style={{
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(16px)',
            borderColor: 'rgba(255,255,255,0.1)',
          }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Best Practices</h2>
          
          <ul className="space-y-3 text-slate-400">
            <li className="flex gap-3">
              <span className="text-violet-400 flex-shrink-0">•</span>
              <span>Ensure your CSV files have clear column headers that describe the data</span>
            </li>
            <li className="flex gap-3">
              <span className="text-violet-400 flex-shrink-0">•</span>
              <span>Use consistent date formats (YYYY-MM-DD recommended)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-violet-400 flex-shrink-0">•</span>
              <span>Include at least 3-6 months of data for more accurate pattern detection</span>
            </li>
            <li className="flex gap-3">
              <span className="text-violet-400 flex-shrink-0">•</span>
              <span>Remove any sensitive personal information before uploading</span>
            </li>
            <li className="flex gap-3">
              <span className="text-violet-400 flex-shrink-0">•</span>
              <span>Run regular analyses (weekly or monthly) to catch new leaks early</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link href="/#upload">
            <button
              className="px-8 py-4 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 50%, #06B6D4 100%)',
                boxShadow: '0 0 24px rgba(124,58,237,0.4)',
              }}
            >
              Start Your First Analysis
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
