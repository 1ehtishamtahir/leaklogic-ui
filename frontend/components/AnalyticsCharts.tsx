"use client";

import dynamic from 'next/dynamic';
import { TrendingDown, AlertTriangle } from 'lucide-react';
import { AnalysisResult } from '@/types';

// Import charts with SSR disabled to prevent hydration mismatch
const DonutChart = dynamic(
  () => import('./ChartsClientOnly').then(mod => mod.DonutChart),
  { ssr: false }
);

const BarChart = dynamic(
  () => import('./ChartsClientOnly').then(mod => mod.BarChart),
  { ssr: false }
);

interface AnalyticsChartsProps {
  result: AnalysisResult;
}

export default function AnalyticsCharts({ result }: AnalyticsChartsProps) {
  // Generate leak category breakdown from findings
  const leaksByCategory: Record<string, number> = {};
  result.findings.forEach(finding => {
    const category = finding.category.toUpperCase();
    if (!leaksByCategory[category]) {
      leaksByCategory[category] = 0;
    }
    leaksByCategory[category] += Math.abs(finding.dollar_impact);
  });

  // Category colors
  const categoryColors: Record<string, string> = {
    'REFUND': '#EF4444',
    'DISCOUNT': '#F59E0B',
    'SUPPLIER': '#A78BFA',
    'INVENTORY': '#06B6D4',
  };

  // Donut chart data - Leak Distribution by Category
  const donutData = Object.entries(leaksByCategory).map(([name, value]) => ({
    name,
    value,
    color: categoryColors[name] || '#6366F1',
  }));

  const totalLeakage = Object.values(leaksByCategory).reduce((a, b) => a + b, 0);

  // Bar chart data - Dollar Impact by Finding
  const barData = result.findings
    .slice(0, 5) // Top 5 findings
    .map(finding => ({
      name: finding.entity.length > 20 ? finding.entity.substring(0, 20) + '...' : finding.entity,
      value: Math.abs(finding.dollar_impact),
      category: finding.category,
    }));

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Leak Distribution by Category - Donut Chart */}
      <div className="rounded-2xl p-6 relative overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.15)',
        }}
      >
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-1">LEAK DISTRIBUTION</h3>
          <p className="text-xs text-slate-300 uppercase tracking-wider font-semibold">By Category</p>
        </div>

        <div className="flex items-center justify-center">
          <div className="relative w-[240px] h-[240px]">
            <DonutChart data={donutData} />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="text-2xl font-bold text-white">
                ${totalLeakage.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              <div className="text-xs text-slate-300 uppercase tracking-wider font-semibold">TOTAL LEAK</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          {donutData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full flex-shrink-0" 
                style={{ background: item.color, boxShadow: `0 0 8px ${item.color}` }}
              />
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-slate-300 uppercase tracking-wider font-semibold">{item.name}</span>
                <span className="text-sm font-bold text-white">${item.value.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top 5 Leaks by Dollar Impact - Bar Chart */}
      <div className="rounded-2xl p-6 relative overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.15)',
        }}
      >
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-1">TOP 5 LEAKS</h3>
          <p className="text-xs text-slate-300 uppercase tracking-wider font-semibold">By Dollar Impact</p>
        </div>

        <BarChart data={barData} categoryColors={categoryColors} />
      </div>

      {/* Leak Summary Stats */}
      <div className="rounded-2xl p-6 relative overflow-hidden lg:col-span-2"
        style={{
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.15)',
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
              <TrendingDown className="w-5 h-5" style={{ color: '#EF4444' }} />
            </div>
            <div>
              <div className="text-xs text-slate-300 uppercase tracking-wider mb-1 font-semibold">Total Leakage</div>
              <div className="text-2xl font-bold text-white">
                ${Math.abs(result.total_estimated_leak).toLocaleString()}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
              <AlertTriangle className="w-5 h-5" style={{ color: '#F59E0B' }} />
            </div>
            <div>
              <div className="text-xs text-slate-300 uppercase tracking-wider mb-1 font-semibold">Findings</div>
              <div className="text-2xl font-bold text-white">{result.findings.length}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ background: 'rgba(167, 139, 250, 0.15)', border: '1px solid rgba(167, 139, 250, 0.3)' }}>
              <AlertTriangle className="w-5 h-5" style={{ color: '#A78BFA' }} />
            </div>
            <div>
              <div className="text-xs text-slate-300 uppercase tracking-wider mb-1 font-semibold">Avg Impact</div>
              <div className="text-2xl font-bold text-white">
                ${Math.abs(result.total_estimated_leak / result.findings.length).toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ background: 'rgba(6, 182, 212, 0.15)', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
              <AlertTriangle className="w-5 h-5" style={{ color: '#06B6D4' }} />
            </div>
            <div>
              <div className="text-xs text-slate-300 uppercase tracking-wider mb-1 font-semibold">Categories</div>
              <div className="text-2xl font-bold text-white">{Object.keys(leaksByCategory).length}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
