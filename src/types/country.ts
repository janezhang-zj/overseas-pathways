export interface Country {
  slug: string;
  name: string;
  nameEn: string;
  continent: string;
  flagEmoji: string;
  description: string;
  image: string;
  currency: string;
  exchangeRate: string;
  language: string;
  costOfLiving: {
    monthlyMinRMB: number;
    monthlyMaxRMB: number;
    cityBreakdown: Record<string, number>;
  };
  minWage: {
    rate: string;
    monthlyEstimateRMB: number;
    note: string;
  };
  highlights: string[];
  officialLinks: {
    immigration: string;
    education?: string;
    health?: string;
  };
  tags: string[];
}
