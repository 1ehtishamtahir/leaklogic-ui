"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api";

export default function TestConnection() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [healthData, setHealthData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    setStatus("loading");
    setError(null);
    
    try {
      const data = await apiClient.healthCheck();
      setHealthData(data);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Connection failed");
    }
  };

  return (
    <div className="min-h-screen bg-dark-primary p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">
          Backend Connection Test
        </h1>

        <div className="glass-effect rounded-lg p-6 border border-primary/20">
          <div className="mb-4">
            <span className="text-slate-400">Status: </span>
            {status === "loading" && (
              <span className="text-warning">Testing connection...</span>
            )}
            {status === "success" && (
              <span className="text-success">✓ Connected</span>
            )}
            {status === "error" && (
              <span className="text-danger">✗ Connection Failed</span>
            )}
          </div>

          {healthData && (
            <div className="bg-dark-secondary rounded-lg p-4 mb-4">
              <pre className="text-sm text-slate-300 overflow-auto">
                {JSON.stringify(healthData, null, 2)}
              </pre>
            </div>
          )}

          {error && (
            <div className="bg-danger/10 border border-danger/30 rounded-lg p-4 mb-4">
              <p className="text-danger text-sm">{error}</p>
              <p className="text-slate-400 text-xs mt-2">
                Make sure the backend is running on http://127.0.0.1:8000
              </p>
            </div>
          )}

          <button
            onClick={testConnection}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/80 transition-colors"
          >
            Test Again
          </button>

          <div className="mt-6 pt-6 border-t border-slate-700">
            <h3 className="text-white font-semibold mb-3">
              Troubleshooting:
            </h3>
            <ul className="text-sm text-slate-400 space-y-2">
              <li>1. Ensure backend is running: <code className="text-primary">python -m uvicorn app.main:app --reload</code></li>
              <li>2. Check backend URL in .env.local: <code className="text-primary">NEXT_PUBLIC_API_URL=http://127.0.0.1:8000</code></li>
              <li>3. Verify backend health: Open <a href="http://127.0.0.1:8000/health" target="_blank" className="text-primary underline">http://127.0.0.1:8000/health</a></li>
              <li>4. Check CORS settings in backend/app/main.py</li>
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <a
            href="/"
            className="text-primary hover:underline"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
