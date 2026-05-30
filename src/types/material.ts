export type MaterialCategory =
  | "identity"
  | "education"
  | "finance"
  | "health"
  | "language"
  | "legal"
  | "insurance"
  | "document"
  | "other";

export interface MaterialStep {
  order: number;
  title: string;
  description: string;
  duration: string;
  tips?: string;
}

export interface Material {
  id: string;
  name: string;
  description: string;
  category: MaterialCategory;
  required: boolean;
  processingLocation: string;
  alternativeLocation?: string;
  estimatedFeeRMB: number;
  estimatedProcessingDays: number;
  validityPeriod?: string;
  officialUrl?: string;
  officialPhone?: string;
  steps: MaterialStep[];
  tips?: string[];
}
