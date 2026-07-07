"use client";

import { useState } from "react";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { AnalysisResult, UploadedFiles } from "@/types";
import { apiClient } from "@/lib/api";

interface UploadSectionProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (analyzing: boolean) => void;
}

export default function UploadSection({
  onAnalysisComplete,
  isAnalyzing,
  setIsAnalyzing,
}: UploadSectionProps) {
  const [files, setFiles] = useState<UploadedFiles>({
    sales: null,
    refunds: null,
    suppliers: null,
    inventory: null,
  });
  const [error, setError] = useState<string | null>(null);
  const [useSampleData, setUseSampleData] = useState(false);

  const handleFileChange = (
    type: keyof UploadedFiles,
    file: File | null
  ) => {
    setFiles((prev) => ({ ...prev, [type]: file }));
    setError(null);
  };

  const handleAnalyze = async () => {
    // Check if at least sales file is uploaded
    if (!files.sales) {
      setError("Please upload at least a sales CSV file to analyze");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      
      // Upload user files
      if (files.sales) formData.append("sales", files.sales);
      if (files.refunds) formData.append("refunds", files.refunds);
      if (files.suppliers) formData.append("suppliers", files.suppliers);
      if (files.inventory) formData.append("inventory", files.inventory);

      const result: AnalysisResult = await apiClient.analyze(formData);
      onAnalysisComplete(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during analysis"
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleUseSampleData = async () => {
    setIsAnalyzing(true);
    setError(null);
    setUseSampleData(true);

    try {
      const result: AnalysisResult = await apiClient.analyzeWithSampleData();
      onAnalysisComplete(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during analysis"
      );
    } finally {
      setIsAnalyzing(false);
      setUseSampleData(false);
    }
  };

  const fileTypes = [
    {
      key: "sales" as keyof UploadedFiles,
      label: "Sales Data",
      required: true,
      description: "Order history, revenue, and product sales",
    },
    {
      key: "refunds" as keyof UploadedFiles,
      label: "Refunds",
      required: false,
      description: "Product returns and refund data",
    },
    {
      key: "suppliers" as keyof UploadedFiles,
      label: "Supplier / COGS",
      required: false,
      description: "Supplier costs and purchase volumes",
    },
    {
      key: "inventory" as keyof UploadedFiles,
      label: "Inventory",
      required: false,
      description: "Stock levels and inventory snapshots",
    },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-12 animate-fade-in">
        <h2 className="text-4xl font-bold text-white mb-4">
          Find Hidden Profit Leaks in Your Business
        </h2>
        <p className="text-lg text-slate-300">
          Upload your business data and let our AI auditor identify where
          you&apos;re losing money without realizing it.
        </p>
      </div>

      {/* Upload Cards */}
      <div className="glass-effect rounded-xl shadow-card p-8 mb-6 animate-slide-up border border-primary/20">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <Upload className="w-5 h-5 text-primary" />
          Upload Your CSV Files
        </h3>

        <div className="grid gap-4 mb-6">
          {fileTypes.map((fileType) => (
            <div
              key={fileType.key}
              className="border-2 border-dashed border-primary/30 rounded-lg p-4 hover:border-primary/60 hover:bg-primary/5 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-5 h-5 text-primary" />
                    <h4 className="font-medium text-white">
                      {fileType.label}
                      {fileType.required && (
                        <span className="text-danger ml-1">*</span>
                      )}
                    </h4>
                  </div>
                  <p className="text-sm text-slate-400 mb-3">
                    {fileType.description}
                  </p>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={(e) =>
                      handleFileChange(
                        fileType.key,
                        e.target.files?.[0] || null
                      )
                    }
                    className="text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30 file:cursor-pointer"
                    disabled={isAnalyzing}
                  />
                </div>
                {files[fileType.key] && (
                  <CheckCircle className="w-6 h-6 text-success flex-shrink-0" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-danger/10 border border-danger/30 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-danger flex-shrink-0 mt-0.5" />
            <p className="text-sm text-danger">{error}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || (!files.sales && !useSampleData)}
            className="bg-gradient-primary text-white px-6 py-3 rounded-lg font-medium hover:shadow-glow-primary disabled:bg-slate-700 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Analyzing...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Analyze Data
              </>
            )}
          </button>

          <button
            onClick={handleUseSampleData}
            disabled={isAnalyzing}
            className="bg-success/20 text-success border border-success/30 px-6 py-3 rounded-lg font-medium hover:bg-success/30 hover:shadow-glow-success disabled:bg-slate-700 disabled:cursor-not-allowed disabled:text-slate-500 disabled:border-slate-600 transition-all duration-300"
          >
            Use Sample Data (1000 orders)
          </button>
        </div>

        <p className="text-xs text-slate-500 mt-4 text-center">
          * Required field. More data types = more comprehensive analysis
        </p>
      </div>

      {/* Info Section */}
      <div className="glass-effect border border-primary/20 rounded-lg p-6">
        <h4 className="font-semibold text-primary mb-3 text-lg">What We Detect:</h4>
        <ul className="grid sm:grid-cols-2 gap-3 text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-success mt-0.5">✓</span>
            <span>Refund rate increases by product</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success mt-0.5">✓</span>
            <span>Ineffective discount campaigns</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success mt-0.5">✓</span>
            <span>Supplier cost increases eating margins</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success mt-0.5">✓</span>
            <span>Slow-moving inventory tying up cash</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
