/**
 * API Client for LeakLogic Backend
 * Centralized API configuration and helper functions
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export interface ApiError {
  detail: string;
}

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Health check endpoint
   */
  async healthCheck(): Promise<{ status: string; service: string; version: string }> {
    const response = await fetch(`${this.baseUrl}/health`);
    if (!response.ok) {
      throw new Error("Health check failed");
    }
    return response.json();
  }

  /**
   * Fetch sample CSV data
   */
  async getSampleData(filename: string): Promise<Blob> {
    const response = await fetch(`${this.baseUrl}/sample-data/${filename}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch sample data: ${filename}`);
    }
    return response.blob();
  }

  /**
   * Analyze uploaded CSV files
   */
  async analyze(formData: FormData): Promise<any> {
    const response = await fetch(`${this.baseUrl}/analyze`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.detail || "Analysis failed");
    }

    return response.json();
  }

  /**
   * Analyze with sample data
   */
  async analyzeWithSampleData(): Promise<any> {
    const formData = new FormData();
    
    // Fetch sample files
    const sampleFiles = ["sales", "refunds", "suppliers", "inventory"];
    
    for (const fileName of sampleFiles) {
      const blob = await this.getSampleData(`${fileName}.csv`);
      const file = new File([blob], `${fileName}.csv`, { type: "text/csv" });
      formData.append(fileName, file);
    }

    return this.analyze(formData);
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export base URL for direct usage
export { API_BASE_URL };
