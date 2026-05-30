"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { FilterState, EducationLevel, EnglishLevel, PathwayCategory } from "@/types/filter";
import { DEFAULT_FILTERS } from "@/types/filter";

function parseFiltersFromParams(params: URLSearchParams): FilterState {
  const ageParam = params.get("age");
  const age: [number, number] = ageParam
    ? (ageParam.split("-").map(Number) as [number, number])
    : DEFAULT_FILTERS.age;

  return {
    age,
    education: (params.get("education") as EducationLevel) || DEFAULT_FILTERS.education,
    englishLevel: (params.get("english") as EnglishLevel) || DEFAULT_FILTERS.englishLevel,
    budgetMax: Number(params.get("budget")) || DEFAULT_FILTERS.budgetMax,
    countries: params.get("countries")?.split(",").filter(Boolean) || [],
    categories: (params.get("categories")?.split(",").filter(Boolean) as PathwayCategory[]) || [],
    searchQuery: params.get("q") || "",
  };
}

function filtersToParams(f: FilterState): URLSearchParams {
  const p = new URLSearchParams();
  if (f.age[0] !== DEFAULT_FILTERS.age[0] || f.age[1] !== DEFAULT_FILTERS.age[1]) {
    p.set("age", `${f.age[0]}-${f.age[1]}`);
  }
  if (f.education !== DEFAULT_FILTERS.education) p.set("education", f.education);
  if (f.englishLevel !== DEFAULT_FILTERS.englishLevel) p.set("english", f.englishLevel);
  if (f.budgetMax !== DEFAULT_FILTERS.budgetMax) p.set("budget", String(f.budgetMax));
  if (f.countries.length > 0) p.set("countries", f.countries.join(","));
  if (f.categories.length > 0) p.set("categories", f.categories.join(","));
  if (f.searchQuery) p.set("q", f.searchQuery);
  return p;
}

export function useFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(() =>
    parseFiltersFromParams(searchParams)
  );

  useEffect(() => {
    setFilters(parseFiltersFromParams(searchParams));
  }, [searchParams]);

  const updateFilters = useCallback(
    (patch: Partial<FilterState>) => {
      const next = { ...filters, ...patch };
      setFilters(next);
      const params = filtersToParams(next);
      router.replace(`/pathways?${params.toString()}`, { scroll: false });
    },
    [filters, router]
  );

  const clearAll = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    router.replace("/pathways", { scroll: false });
  }, [router]);

  const isActive = useMemo(() => {
    return (
      filters.age[0] !== DEFAULT_FILTERS.age[0] ||
      filters.age[1] !== DEFAULT_FILTERS.age[1] ||
      filters.education !== DEFAULT_FILTERS.education ||
      filters.englishLevel !== DEFAULT_FILTERS.englishLevel ||
      filters.budgetMax !== DEFAULT_FILTERS.budgetMax ||
      filters.countries.length > 0 ||
      filters.categories.length > 0 ||
      filters.searchQuery !== ""
    );
  }, [filters]);

  return { filters, updateFilters, clearAll, isActive };
}
