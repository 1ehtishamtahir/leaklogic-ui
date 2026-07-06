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
    <div className="border-t-2 border-slate-200 bg-slate-50 p-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Metric Change */}
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-semibold text-slate-900 mb-1">
                  Metric Change
                </h5>
                <p className="text-slate-700">{finding.metric_change}</p>
              </div>
            </div>
          </div>

          {/* Time Window */}
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-semibold text-slate-900 mb-1">
                  Time Window
                </h5>
                <p className="text-slate-700">{finding.time_window}</p>
              </div>
            </div>
          </div>

          {/* Evidence */}
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h5 className="font-semibold text-slate-900 mb-2">Evidence</h5>
                <ul className="space-y-1">
                  {finding.evidence.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-slate-700 flex items-start gap-2"
                    >
                      <span className="text-green-600 mt-0.5">•</span>
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
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-semibold text-orange-900 mb-1">
                  Likely Cause
                </h5>
                <p className="text-orange-800">{finding.likely_cause}</p>
              </div>
            </div>
          </div>

          {/* Suggested Action */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-semibold text-blue-900 mb-1">
                  Suggested Action
                </h5>
                <p className="text-blue-800">{finding.suggested_action}</p>
              </div>
            </div>
          </div>

          {/* Confidence Badge */}
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <h5 className="font-semibold text-slate-900 mb-3">
              Confidence Level
            </h5>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                    {(finding.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-slate-200">
                <div
                  style={{ width: `${finding.confidence * 100}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
