export type PathwayCategory =
  | "work-holiday"
  | "study"
  | "work"
  | "volunteer"
  | "internship"
  | "exchange"
  | "au-pair"
  | "training";

export type EducationLevel =
  | "any"
  | "high-school"
  | "associate"
  | "bachelor"
  | "master";

export type EnglishLevel =
  | "none"
  | "basic"
  | "ielts4.5"
  | "ielts5.5"
  | "ielts6.0"
  | "ielts6.5";

export type Difficulty = "easy" | "medium" | "hard";

export interface FilterState {
  age: [number, number];
  education: EducationLevel;
  englishLevel: EnglishLevel;
  budgetMax: number;
  countries: string[];
  categories: PathwayCategory[];
  searchQuery: string;
}

export const DEFAULT_FILTERS: FilterState = {
  age: [16, 60],
  education: "any",
  englishLevel: "none",
  budgetMax: 200000,
  countries: [],
  categories: [],
  searchQuery: "",
};

export const EDUCATION_RANK: Record<EducationLevel, number> = {
  any: 0,
  "high-school": 1,
  associate: 2,
  bachelor: 3,
  master: 4,
};

export const ENGLISH_RANK: Record<EnglishLevel, number> = {
  none: 0,
  basic: 1,
  "ielts4.5": 2,
  "ielts5.5": 3,
  "ielts6.0": 4,
  "ielts6.5": 5,
};

export const EDUCATION_LABELS: Record<EducationLevel, string> = {
  any: "无学历要求",
  "high-school": "高中/中专",
  associate: "大专",
  bachelor: "本科",
  master: "硕士及以上",
};

export const ENGLISH_LABELS: Record<EnglishLevel, string> = {
  none: "无要求",
  basic: "基础英语",
  "ielts4.5": "雅思 4.5 / PTE 30",
  "ielts5.5": "雅思 5.5 / PTE 42",
  "ielts6.0": "雅思 6.0 / PTE 50",
  "ielts6.5": "雅思 6.5 / PTE 58",
};

export const CATEGORY_LABELS: Record<PathwayCategory, string> = {
  "work-holiday": "打工度假",
  study: "留学",
  work: "工作",
  volunteer: "志愿者",
  internship: "实习",
  exchange: "交换生",
  "au-pair": "互惠生",
  training: "职业培训",
};

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: "简单",
  medium: "中等",
  hard: "困难",
};

export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  easy: "bg-moss-100 text-moss-700",
  medium: "bg-seed-100 text-seed-500",
  hard: "bg-red-100 text-red-700",
};
