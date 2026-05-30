"use client";

import { useMemo } from "react";
import type { FilterState } from "@/types/filter";
import type { Pathway } from "@/types/pathway";
import { matchPathways, sortByScore } from "@/lib/matching";

export function useMatching(pathways: Pathway[], filters: FilterState) {
  return useMemo(() => {
    const results = matchPathways(pathways, filters);
    const feasible = results.filter((r) => r.feasible);
    const unfeasible = results.filter((r) => !r.feasible);
    return {
      feasible: sortByScore(feasible),
      unfeasible,
      total: pathways.length,
      matchedCount: feasible.length,
      filtersActive:
        filters.age[0] > 16 ||
        filters.age[1] < 60 ||
        filters.education !== "any" ||
        filters.englishLevel !== "none" ||
        filters.budgetMax < 200000 ||
        filters.countries.length > 0 ||
        filters.categories.length > 0 ||
        filters.searchQuery !== "",
    };
  }, [pathways, filters]);
}
