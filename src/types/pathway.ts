import type { PathwayCategory, EducationLevel, EnglishLevel, Difficulty } from "./filter";

export interface PathwayCostItem {
  name: string;
  amountRMB: number;
  type: string;
  note?: string;
}

export interface PathwayCosts {
  items: PathwayCostItem[];
  totalMinRMB: number;
  totalMaxRMB: number;
  currency: string;
  note?: string;
}

export interface PathwayTimelinePhase {
  phase: string;
  duration: string;
  tasks: string[];
}

export interface PathwayMaterialRef {
  materialId: string;
  required: boolean;
  specificNote?: string;
}

export interface VisualTag {
  icon: "money" | "clock" | "dice" | "refresh" | "pin";
  text: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Pathway {
  slug: string;
  title: string;
  subtitle: string;
  countrySlug: string;
  category: PathwayCategory;
  type: string;
  isFeatured: boolean;

  eligibility: {
    minAge: number;
    maxAge: number;
    education: EducationLevel;
    englishLevel: EnglishLevel;
    minBudgetRMB: number;
    maxBudgetRMB: number;
    specialRequirements: string[];
  };

  overview: {
    description: string;
    officialPolicy: string;
    officialPolicyUrl: string;
    visaDuration: string;
    processingTime: string;
    successRate: string;
    quota?: string;
  };

  costs: PathwayCosts;
  timeline: PathwayTimelinePhase[];
  materials: PathwayMaterialRef[];
  visualTags: VisualTag[];
  renewable?: string;
  faq: FAQItem[];
  tips: string[];
  warnings: string[];
  difficulty: Difficulty;
  tags: string[];
  lastUpdated: string;
}
