"use client";

import { Finding } from "@/types";
import {
  Lightbulb,
  AlertCircle,
  TrendingUp,
  Clock,
  CheckCircle,
} from "lucide-react";

interface LeakCardProps {
  finding: Finding;
}

export default function LeakCard({ finding }: LeakCardProps) {
  return (
    <div className="border-t-2 border-primary/20 bg-dark-800/50 p-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Metric Change */}
          <div className="glass-effect rounded-lg p-4 border border-primary/20">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-semibold text-white mb-1">
                  Metric Change
                </h5>
                <p className="text-slate-300">{finding.metric_change}</p>
              </div>
            </div>
          </div>

          {/* Time Window */}
          <div className="glass-effect rounded-lg p-4 border border-accent/20">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-semibold text-white mb-1">
                  Time Window
                </h5>
                <p className="text-slate-300">{finding.time_window}</p>
              </div>
            </div>
          </div>

          {/* Evidence */}
          <div className="glass-effect rounded-lg p-4 border border-success/20">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h5 className="font-semibold text-white mb-2">Evidence</h5>
                <ul className="space-y-1">
                  {finding.evidence.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-slate-300 flex items-start gap-2"
                    >
                      <span className="text-success mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Likely Cause */}
          <div className="bg-warning/10 rounded-lg p-4 border border-warning/30">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-semibold text-warning mb-1">
                  Likely Cause
                </h5>
                <p className="text-slate-300">{finding.likely_cause}</p>
              </div>
            </div>
          </div>

          {/* Suggested Action */}
          <div className="bg-primary/10 rounded-lg p-4 border border-primary/30">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-semibold text-primary mb-1">
                  Suggested Action
                </h5>
                <p className="text-slate-300">{finding.suggested_action}</p>
              </div>
            </div>
          </div>

          {/* Confidence Badge */}
          <div className="glass-effect rounded-lg p-4 border border-primary/20">
            <h5 className="font-semibold text-white mb-3">
              Confidence Level
            </h5>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary bg-primary/20">
                    {(finding.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-dark-700">
                <div
                  style={{ width: `${finding.confidence * 100}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-primary transition-all"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
