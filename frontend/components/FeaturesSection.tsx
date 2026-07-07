"use client";

import { Shield, Zap, Target, Brain, BarChart, Sparkles } from "lucide-react";
import AnalyticsCharts from "./AnalyticsCharts";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Detection",
    description: "Advanced algorithms analyze your data to uncover hidden profit leaks automatically",
    color: "primary",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get comprehensive analysis results in seconds, not hours or days",
    color: "warning",
  },
  {
    icon: Target,
    title: "Precision Insights",
    description: "Pinpoint exact areas of concern with 95% accuracy and detailed evidence",
    color: "danger",
  },
  {
    icon: BarChart,
    title: "Visual Analytics",
    description: "Beautiful dashboards and charts make complex data easy to understand",
    color: "success",
  },
  {
    icon: Shield,
    title: "Data Security",
    description: "Your business data stays private and secure with end-to-end encryption",
    color: "accent",
  },
  {
    icon: Sparkles,
    title: "Actionable Recommendations",
    description: "Not just problems - get specific solutions to fix every leak detected",
    color: "primary",
  },
];

const getColorClasses = (color: string) => {
  const colors: { [key: string]: string } = {
    primary: "text-primary border-primary/30 hover:border-primary/50 hover:shadow-glow-primary",
    success: "text-success border-success/30 hover:border-success/50 hover:shadow-glow-success",
    warning: "text-warning border-warning/30 hover:border-warning/50",
    danger: "text-danger border-danger/30 hover:border-danger/50 hover:shadow-glow-danger",
    accent: "text-accent border-accent/30 hover:border-accent/50",
  };
  return colors[color] || colors.primary;
};

export default function FeaturesSection() {
  return (
    <div className="py-16 relative overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full text-sm font-semibold"
            style={{
              background: 'rgba(99, 102, 241, 0.15)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              color: '#6366F1',
            }}
          >
            <Sparkles className="w-4 h-4" />
            WHY CHOOSE LEAKLOGIC
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            POWERFUL FEATURES
          </h2>
          <p className="text-lg text-slate-400">
            Everything you need to identify and fix profit leaks in your business
          </p>
        </div>

        {/* Analytics Charts */}
        <AnalyticsCharts />

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`group rounded-2xl p-6 border transition-all duration-300 hover:scale-105 ${getColorClasses(
                  feature.color
                )} animate-fade-in`}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  background: 'rgba(24, 24, 27, 0.6)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <div className="inline-flex p-3 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: 'rgba(99, 102, 241, 0.15)' }}
                >
                  <Icon className={`w-6 h-6 ${getColorClasses(feature.color).split(" ")[0]}`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats Bar */}
        <div className="mt-12 rounded-2xl p-8 border"
          style={{
            background: 'rgba(24, 24, 27, 0.8)',
            backdropFilter: 'blur(20px)',
            borderColor: 'rgba(99, 102, 241, 0.2)',
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-primary mb-2">1000+</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider font-medium">Orders Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-primary mb-2">4</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider font-medium">Data Sources</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-primary mb-2">99.9%</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider font-medium">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-primary mb-2">24/7</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider font-medium">Analysis Ready</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
