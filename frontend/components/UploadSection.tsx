"use client";

import { useState, useRef, useEffect } from "react";
import {
  AlertCircle, Boxes, Database, Factory, FileCheck2,
  Receipt, UploadCloud, Cpu, Activity,
} from "lucide-react";
import { AnalysisResult, UploadedFiles } from "@/types";
import { apiClient } from "@/lib/api";
import Card3D from "./Card3D";

interface UploadSectionProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (v: boolean) => void;
  triggerSampleData?: boolean;
  onSampleDataTriggered?: () => void;
}

const STAGES = [
  { label: "Initializing audit protocol",     sub: "Securing data channel..." },
  { label: "Parsing financial ledgers",        sub: "Reading CSV structures..." },
  { label: "Cross-referencing supplier costs", sub: "Computing COGS variance..." },
  { label: "Detecting margin anomalies",       sub: "Running pattern recognition..." },
  { label: "Generating executive brief",       sub: "Synthesizing findings..." },
];

const FILE_TYPES = [
  { key: "sales"     as const, label: "Sales Ledger",  required: true,  desc: "Orders, revenue, discounts",    Icon: Database },
  { key: "refunds"   as const, label: "Refunds",        required: false, desc: "Returns, affected products",   Icon: Receipt  },
  { key: "suppliers" as const, label: "Supplier COGS",  required: false, desc: "Unit prices, purchase volume", Icon: Factory  },
  { key: "inventory" as const, label: "Inventory",      required: false, desc: "Stock levels, holding value",  Icon: Boxes    },
];

export default function UploadSection({ onAnalysisComplete, isAnalyzing, setIsAnalyzing, triggerSampleData, onSampleDataTriggered }: UploadSectionProps) {
  const [files, setFiles] = useState<UploadedFiles>({ sales: null, refunds: null, suppliers: null, inventory: null });
  const [error, setError]     = useState<string | null>(null);
  const [stage, setStage]     = useState(0);
  const [dragActiveKey, setDragActiveKey] = useState<string | null>(null);
  const intervalRef           = useRef<ReturnType<typeof setInterval> | null>(null);
  const stageRef              = useRef(0);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    stageRef.current = 0;
    setStage(0);
    if (isAnalyzing) {
      intervalRef.current = setInterval(() => {
        const next = Math.min(stageRef.current + 1, STAGES.length - 1);
        stageRef.current = next;
        setStage(next);
      }, 1600);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isAnalyzing]);

  // Handle trigger from dashboard
  useEffect(() => {
    if (triggerSampleData && !isAnalyzing) {
      handleSample();
      if (onSampleDataTriggered) {
        onSampleDataTriggered();
      }
    }
  }, [triggerSampleData]);

  const uploadedCount = Object.values(files).filter(Boolean).length;

  const handleFile = (key: keyof UploadedFiles, file: File | null) => {
    setFiles(p => ({ ...p, [key]: file }));
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!files.sales) { setError("Sales ledger is required to start audit."); return; }
    setIsAnalyzing(true); setError(null);
    try {
      const fd = new FormData();
      if (files.sales)     fd.append("sales",     files.sales);
      if (files.refunds)   fd.append("refunds",   files.refunds);
      if (files.suppliers) fd.append("suppliers", files.suppliers);
      if (files.inventory) fd.append("inventory", files.inventory);
      const result: AnalysisResult = await apiClient.analyze(fd);
      onAnalysisComplete(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unexpected error.");
      setIsAnalyzing(false);
    }
  };

  const handleSample = async () => {
    setIsAnalyzing(true); setError(null);
    try {
      const result: AnalysisResult = await apiClient.analyzeWithSampleData();
      onAnalysisComplete(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load sample.");
      setIsAnalyzing(false);
    }
  };

  /* ── Analyzing screen ──────────────────────────────── */
  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] gap-8">
        {/* Pulse ring */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-28 h-28 rounded-full animate-ping opacity-25"
            style={{ background: "rgba(124,58,237,0.4)" }} />
          <div className="absolute w-20 h-20 rounded-full animate-pulse opacity-30"
            style={{ background: "rgba(124,58,237,0.35)" }} />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full"
            style={{ background: "linear-gradient(135deg,#7C3AED,#4F46E5,#06B6D4)", boxShadow: "0 0 36px rgba(124,58,237,0.65)" }}>
            <Cpu className="h-7 w-7 text-white" />
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">Forensic Engine Active</h2>
          <p className="mt-1 text-xs font-mono tracking-widest" style={{ color: "rgba(167,139,250,0.65)" }}>
            AI AUDIT PROTOCOL RUNNING
          </p>
        </div>

        {/* Stage list */}
        <div className="glass-panel glass-violet rounded-2xl p-6 w-full max-w-sm scan-active">
          <ul className="space-y-4 relative z-10">
            {STAGES.map((s, i) => {
              const done   = i < stage;
              const active = i === stage;
              return (
                <li key={i}
                  className="flex items-start gap-3 transition-all duration-300"
                  style={{
                    opacity: done || active ? 1 : 0.3,
                    animation: `fadeInUp 0.3s ease forwards`,
                    animationDelay: `${i * 80}ms`,
                  }}>
                  <div className="mt-1 shrink-0">
                    {done   ? <div className="w-2.5 h-2.5 rounded-full" style={{ background:"#10B981", boxShadow:"0 0 6px #10B981" }} />
                    : active ? <div className="w-2.5 h-2.5 rounded-full pulse-dot" style={{ background:"#A78BFA", boxShadow:"0 0 8px rgba(167,139,250,0.8)" }} />
                    :          <div className="w-2.5 h-2.5 rounded-full" style={{ background:"rgba(255,255,255,0.1)" }} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium leading-tight ${done?"text-emerald-400":active?"text-violet-300":"text-slate-500"}`}>
                      {s.label}
                    </p>
                    {active && (
                      <p className="text-xs mt-0.5 font-mono" style={{ color:"rgba(103,232,249,0.65)" }}>
                        &gt; {s.sub}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }

  /* ── Upload form ─────────────────────────────────────── */
  return (
    <div className="w-full">

      {/* Hero */}
      <section className="mb-14 text-center animate-fade-in-up px-4 sm:px-6">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] mb-7 font-mono tracking-widest border"
          style={{ background:"rgba(124,58,237,0.10)", borderColor:"rgba(124,58,237,0.25)", color:"#C4B5FD" }}>
          <Activity className="h-3.5 w-3.5" />
          AI-POWERED FINANCIAL FORENSICS
        </div>

        <h2 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight leading-tight sm:text-6xl lg:text-7xl text-white">
          Find where your business is{" "}
          <span className="text-gradient">quietly losing money</span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-200">
          Upload your financial CSVs. The forensic engine cross-references sales, refunds,
          and supplier data to surface margin leaks — with evidence and fix recommendations.
        </p>
      </section>

      {/* Upload Card */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Card3D className="rounded-2xl overflow-hidden glass-panel" glowColor="rgba(6, 182, 212, 0.15)">
          <section className="h-full w-full" style={{
            background: 'rgba(0,0,0,0.35)',
            backdropFilter: 'blur(10px)',
          }}>

          {/* Card header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-8 py-6 border-b"
            style={{ borderColor:"rgba(255,255,255,0.12)", background:"rgba(255,255,255,0.025)" }}>
            <div>
              <h3 className="text-xl font-bold text-white">Data Input Console</h3>
              <p className="text-xs mt-1 font-mono tracking-widest font-bold" style={{ color:"#FCA5A5" }}>
                REQUIRED FORMAT: CSV
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-mono border"
              style={{ background:"rgba(6,182,212,0.08)", borderColor:"rgba(6,182,212,0.25)", color:"#67E8F9" }}>
              <FileCheck2 className="h-4 w-4" style={{ color:"#06B6D4" }} />
              {uploadedCount} / 4 FILES STAGED
            </div>
          </div>

          {/* Drop zones grid */}
          <div className="grid gap-4 p-8 sm:grid-cols-2">
            {FILE_TYPES.map(({ key, label, required, desc, Icon }) => {
              const selected = files[key];
              const isDragging = dragActiveKey === key;
              return (
                <label key={key} htmlFor={`f-${key}`}
                  className="group cursor-pointer rounded-xl border p-6 transition-all duration-200 relative z-10"
                  onDragOver={(e) => { e.preventDefault(); setDragActiveKey(key); }}
                  onDragLeave={() => setDragActiveKey(null)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragActiveKey(null);
                    const file = e.dataTransfer.files?.[0];
                    if (file) handleFile(key, file);
                  }}
                  style={{
                    background:   isDragging ? "rgba(124, 58, 237, 0.12)" : selected ? "rgba(6,182,212,0.08)" : "rgba(255,255,255,0.04)",
                    borderColor:  isDragging ? "rgba(124, 58, 237, 0.6)"  : selected ? "rgba(6,182,212,0.4)"  : "rgba(255,255,255,0.12)",
                    boxShadow:    isDragging ? "0 0 20px rgba(124, 58, 237, 0.4)" : selected ? "0 0 15px rgba(6,182,212,0.2)" : "0 2px 8px rgba(0,0,0,0.3)",
                  }}>
                  <input id={`f-${key}`} type="file" accept=".csv,text/csv" className="sr-only"
                    onChange={e => handleFile(key, e.target.files?.[0] ?? null)} />

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg flex-shrink-0"
                      style={{
                        background:   selected ? "rgba(6,182,212,0.15)"  : "rgba(124,58,237,0.12)",
                        color:        selected ? "#22D3EE"                : "#A78BFA",
                        border:       "1px solid",
                        borderColor:  selected ? "rgba(6,182,212,0.22)"  : "rgba(124,58,237,0.18)",
                      }}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded px-2.5 py-1 text-[10px] font-mono tracking-widest border"
                      style={{
                        background:  required ? "rgba(239,68,68,0.15)"   : "rgba(255,255,255,0.06)",
                        color:       required ? "#FCA5A5"                 : "#94A3B8",
                        borderColor: required ? "rgba(239,68,68,0.3)"   : "rgba(255,255,255,0.1)",
                      }}>
                      {required ? "REQUIRED" : "OPTIONAL"}
                    </span>
                  </div>

                  <h4 className="mt-4 text-base font-bold text-white">{label}</h4>
                  <p className="mt-1 text-sm text-slate-300">{desc}</p>

                  <div className="mt-4 flex items-center gap-2 text-xs font-mono">
                    {selected ? (
                      <><FileCheck2 className="h-4 w-4" style={{ color:"#22D3EE" }} />
                        <span className="truncate font-semibold" style={{ color:"#67E8F9" }}>{selected.name}</span></>
                    ) : (
                      <><UploadCloud className="h-4 w-4 text-slate-300" />
                        <span className="text-slate-300 font-medium">SELECT FILE</span></>
                    )}
                  </div>
                </label>
              );
            })}
          </div>

          {/* Error */}
          {error && (
            <div className="mx-8 mb-5 flex items-start gap-3 rounded-xl p-4 border"
              style={{ background:"rgba(239,68,68,0.07)", borderColor:"rgba(239,68,68,0.22)" }}>
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" style={{ color:"#F87171" }} />
              <p className="text-sm" style={{ color:"#FCA5A5" }}>{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="border-t px-8 py-5 flex flex-col sm:flex-row gap-4"
            style={{ borderColor:"rgba(255,255,255,0.07)", background:"rgba(0,0,0,0.18)" }}>
            <button onClick={handleAnalyze} disabled={!files.sales}
              className="flex-1 rounded-xl px-8 py-4 text-base font-semibold transition-all duration-200 active:scale-[0.98] btn-liquid-highlight"
              style={{
                background:  files.sales ? "linear-gradient(135deg,#7C3AED 0%,#4F46E5 50%,#0EA5E9 100%)" : "rgba(255,255,255,0.05)",
                color:       files.sales ? "white" : "#475569",
                boxShadow:   files.sales ? "0 0 28px rgba(124,58,237,0.40)" : "none",
                cursor:      files.sales ? "pointer" : "not-allowed",
              }}>
              Start Audit →
            </button>
            <button onClick={handleSample}
              className="rounded-xl border px-8 py-4 text-base font-semibold transition-all hover:bg-white/5 active:scale-[0.98] active:bg-white/10 btn-liquid-highlight"
              style={{ borderColor:"rgba(6,182,212,0.3)", color:"#67E8F9", background:"rgba(6,182,212,0.08)" }}>
              Try Sample Data
            </button>
          </div>
          </section>
        </Card3D>
      </div>

      {/* Feature pills */}
      <div className="mt-8 max-w-6xl mx-auto px-4 sm:px-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { t:"Refund Anomalies",  d:"Unusual return patterns",         c:"rgba(239,68,68,0.12)",   b:"rgba(239,68,68,0.20)",   dot:"#EF4444" },
          { t:"Discount Leakage",  d:"Promotions eroding margin",       c:"rgba(245,158,11,0.10)",  b:"rgba(245,158,11,0.20)",  dot:"#F59E0B" },
          { t:"Supplier Pressure", d:"Rising costs, shrinking margins", c:"rgba(167,139,250,0.08)", b:"rgba(167,139,250,0.20)", dot:"#A78BFA" },
          { t:"Inventory Drag",    d:"Capital tied in slow stock",      c:"rgba(6,182,212,0.08)",   b:"rgba(6,182,212,0.20)",   dot:"#06B6D4" },
        ].map(({ t, d, c, b, dot }) => (
          <div key={t} className="rounded-xl border px-5 py-4 transition-all duration-200 hover:scale-[1.02]"
            style={{ background:c, borderColor:b, backdropFilter:"blur(12px)" }}>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background:dot, boxShadow:`0 0 6px ${dot}` }} />
              <p className="text-sm font-bold text-white">{t}</p>
            </div>
              <p className="text-sm text-slate-200">{d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
