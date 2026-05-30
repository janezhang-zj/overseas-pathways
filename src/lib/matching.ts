import type { Pathway } from "@/types/pathway";
import type { FilterState } from "@/types/filter";
import { EDUCATION_RANK, ENGLISH_RANK } from "./constants";

export interface MatchResult {
  pathway: Pathway;
  feasible: boolean;
  reasons: string[];
  score: number;
}

function matchesQuery(pathway: Pathway, query: string): boolean {
  const q = query.toLowerCase();
  return (
    pathway.title.toLowerCase().includes(q) ||
    pathway.subtitle.toLowerCase().includes(q) ||
    pathway.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export function matchPathways(
  pathways: Pathway[],
  filters: FilterState
): MatchResult[] {
  return pathways.map((pathway) => {
    const reasons: string[] = [];
    let feasible = true;

    // 1. 年龄区间重叠
    const ageOverlap =
      filters.age[0] <= pathway.eligibility.maxAge &&
      filters.age[1] >= pathway.eligibility.minAge;
    if (!ageOverlap) {
      feasible = false;
      reasons.push(
        `年龄要求 ${pathway.eligibility.minAge}-${pathway.eligibility.maxAge} 岁，你的选择不在范围内`
      );
    }

    // 2. 学历
    const userEduRank = EDUCATION_RANK[filters.education];
    const requiredEduRank = EDUCATION_RANK[pathway.eligibility.education];
    if (userEduRank < requiredEduRank) {
      feasible = false;
      reasons.push(
        `需要${pathway.eligibility.education === "associate" ? "大专" : pathway.eligibility.education === "high-school" ? "高中" : "本科"}及以上学历`
      );
    }

    // 3. 英语
    const userEngRank = ENGLISH_RANK[filters.englishLevel];
    const requiredEngRank = ENGLISH_RANK[pathway.eligibility.englishLevel];
    if (userEngRank < requiredEngRank) {
      feasible = false;
      reasons.push(
        `需要英语达到 ${pathway.eligibility.englishLevel === "ielts4.5" ? "雅思4.5" : pathway.eligibility.englishLevel === "ielts5.5" ? "雅思5.5" : "雅思6.0"} 或以上`
      );
    }

    // 4. 预算
    if (filters.budgetMax < pathway.eligibility.minBudgetRMB) {
      feasible = false;
      reasons.push(
        `最低预算需要 ${Math.round(pathway.eligibility.minBudgetRMB / 10000)} 万元`
      );
    }

    // 5. 国家筛选
    if (
      filters.countries.length > 0 &&
      !filters.countries.includes(pathway.countrySlug)
    ) {
      feasible = false;
      reasons.push("不在所选国家范围内");
    }

    // 6. 类型筛选
    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(pathway.category)
    ) {
      feasible = false;
      reasons.push("不在所选类型范围内");
    }

    // 7. 搜索
    if (filters.searchQuery && !matchesQuery(pathway, filters.searchQuery)) {
      feasible = false;
      reasons.push("不匹配搜索关键词");
    }

    // 计算得分
    const score = feasible ? calculateScore(pathway, filters) : 0;

    return { pathway, feasible, reasons, score };
  });
}

function calculateScore(pathway: Pathway, filters: FilterState): number {
  let score = 50;

  // 预算宽松度 (max +20)
  if (filters.budgetMax >= pathway.costs.totalMaxRMB) {
    score += 20;
  } else if (filters.budgetMax >= pathway.eligibility.minBudgetRMB * 1.5) {
    score += 10;
  } else {
    score += 5;
  }

  // 年龄匹配度 (max +10)
  const userMidAge = (filters.age[0] + filters.age[1]) / 2;
  const pathwayMidAge =
    (pathway.eligibility.minAge + pathway.eligibility.maxAge) / 2;
  const ageDistance = Math.abs(userMidAge - pathwayMidAge);
  score += Math.max(0, 10 - ageDistance);

  // 超资格加分 (max +10)
  const userEduRank = EDUCATION_RANK[filters.education];
  const requiredEduRank = EDUCATION_RANK[pathway.eligibility.education];
  if (userEduRank > requiredEduRank) score += 5;

  const userEngRank = ENGLISH_RANK[filters.englishLevel];
  const requiredEngRank = ENGLISH_RANK[pathway.eligibility.englishLevel];
  if (userEngRank > requiredEngRank) score += 5;

  // 低门槛加分 (max +10)
  if (pathway.eligibility.minBudgetRMB < 50000) score += 5;
  if (pathway.eligibility.education === "high-school") score += 5;

  return score;
}

export function sortByScore(results: MatchResult[]): MatchResult[] {
  return [...results].sort((a, b) => b.score - a.score);
}
