"use client";

import { useState } from "react";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { AnalysisResult, UploadedFiles } from "@/types";

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
    if (!useSampleData && !files.sales) {
      setError("Please upload at least a sales CSV file to analyze");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();

      if (useSampleData) {
        // Fetch sample data from backend
        const response = await fetch("http://127.0.0.1:8000/analyze", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Analysis failed. Please try again.");
        }

        const result: AnalysisResult = await response.json();
        onAnalysisComplete(result);
      } else {
        // Upload user files
        if (files.sales) formData.append("sales", files.sales);
        if (files.refunds) formData.append("refunds", files.refunds);
        if (files.suppliers) formData.append("suppliers", files.suppliers);
        if (files.inventory) formData.append("inventory", files.inventory);

        const response = await fetch("http://127.0.0.1:8000/analyze", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Analysis failed. Please try again.");
        }

        const result: AnalysisResult = await response.json();
        onAnalysisComplete(result);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during analysis"
      );
      setIsAnalyzing(false);
    }
  };

  const handleUseSampleData = async () => {
    setIsAnalyzing(true);
    setError(null);
    setUseSampleData(true);

    try {
      // Fetch sample CSV files from backend
      const sampleFiles = ["sales", "refunds", "suppliers", "inventory"];
      const formData = new FormData();

      for (const fileName of sampleFiles) {
        const response = await fetch(
          `http://127.0.0.1:8000/sample-data/${fileName}.csv`
        );
        const blob = await response.blob();
        const file = new File([blob], `${fileName}.csv`, { type: "text/csv" });
        formData.append(fileName, file);
      }

      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Analysis failed. Please try again.");
      }

      const result: AnalysisResult = await response.json();
      onAnalysisComplete(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during analysis"
      );
      setIsAnalyzing(false);
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
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">
          Find Hidden Profit Leaks in Your Business
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Upload your business data and let our AI auditor identify where
          you&apos;re losing money without realizing it.
        </p>
      </div>

      {/* Upload Cards */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <h3 className="text-xl font-semibold text-slate-900 mb-6">
          Upload Your CSV Files
        </h3>

        <div className="grid gap-4 mb-6">
          {fileTypes.map((fileType) => (
            <div
              key={fileType.key}
              className="border-2 border-dashed border-slate-300 rounded-lg p-4 hover:border-blue-400 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-5 h-5 text-slate-600" />
                    <h4 className="font-medium text-slate-900">
                      {fileType.label}
                      {fileType.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </h4>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">
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
                    className="text-sm text-slate-600"
                    disabled={isAnalyzing}
                  />
                </div>
                {files[fileType.key] && (
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || (!files.sales && !useSampleData)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
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
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
          >
            Use Sample Data (1000 orders)
          </button>
        </div>

        <p className="text-xs text-slate-500 mt-4 text-center">
          * Required field. More data types = more comprehensive analysis
        </p>
      </div>

      {/* Info Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-semibold text-blue-900 mb-2">What We Detect:</h4>
        <ul className="grid sm:grid-cols-2 gap-2 text-sm text-blue-800">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Refund rate increases by product</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Ineffective discount campaigns</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Supplier cost increases eating margins</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Slow-moving inventory tying up cash</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
