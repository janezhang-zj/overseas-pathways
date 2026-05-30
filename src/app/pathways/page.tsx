"use client";

import { Suspense, useState } from "react";
import type { PathwayCategory } from "@/types/filter";
import { pathways, countries } from "@/lib/data";
import { useFilters } from "@/hooks/useFilters";
import { useMatching } from "@/hooks/useMatching";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FilterPanel from "@/components/pathways/FilterPanel";
import PathwayCard from "@/components/pathways/PathwayCard";
import TypeDrawer from "@/components/pathways/TypeDrawer";
import EmptyState from "@/components/ui/EmptyState";

function PathwaysContent() {
  const { filters, updateFilters, clearAll, isActive } = useFilters();
  const { feasible, unfeasible, total, matchedCount, filtersActive } = useMatching(pathways, filters);

  const displayPathways = filtersActive ? feasible : feasible.concat(unfeasible).sort((a, _b) => a.score);

  const [typeDrawerCategory, setTypeDrawerCategory] = useState<PathwayCategory | null>(null);

  return (
    <div className="flex gap-6 max-w-6xl mx-auto px-4 py-8">
      <FilterPanel
        filters={filters}
        onUpdate={updateFilters}
        onClear={clearAll}
        isActive={isActive}
        matchedCount={matchedCount}
        totalCount={total}
        countries={countries}
        onTypeClick={(cat) => setTypeDrawerCategory(cat)}
      />

      <div className="flex-1 min-w-0">
        {/* 页面标题 */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-earth-900 font-[family-name:var(--font-display)]">
            所有出国路径
          </h1>
          <p className="text-earth-500 text-sm mt-1">
            {filtersActive
              ? `找到 ${matchedCount} 条匹配路径（共 ${total} 条）`
              : `共 ${total} 条路径，使用筛选条件找到适合你的路`}
          </p>
        </div>

        {filters.searchQuery && (
          <p className="text-sm text-earth-500 mb-4">
            搜索：&ldquo;{filters.searchQuery}&rdquo;
          </p>
        )}

        {displayPathways.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {displayPathways.map((result) => {
              const country = countries.find((c) => c.slug === result.pathway.countrySlug);
              if (!country) return null;
              return (
                <PathwayCard
                  key={result.pathway.slug}
                  pathway={result.pathway}
                  country={country}
                />
              );
            })}
          </div>
        ) : (
          <EmptyState
            title="没有找到匹配的路径"
            description="试试放宽筛选条件——降低英语要求、提高预算上限、或者减少国家和类型限制。也许有一条路正在等你发现。"
            actionLabel="清除所有筛选条件"
            onAction={clearAll}
          />
        )}

        {filtersActive && unfeasible.length > 0 && (
          <div className="mt-10 pt-8 border-t border-earth-200/50">
            <h3 className="text-earth-600 text-sm font-medium mb-3">可能还差一点</h3>
            <div className="space-y-2">
              {unfeasible.slice(0, 5).map((result) => (
                <div key={result.pathway.slug} className="text-sm text-earth-500 flex items-start gap-2">
                  <span className="text-earth-300 mt-1">•</span>
                  <div>
                    <span className="text-earth-600">{result.pathway.title}</span>
                    {result.reasons.length > 0 && (
                      <span className="text-earth-400 ml-2">— {result.reasons.join("；")}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 类型名词解释抽屉 */}
      <TypeDrawer
        open={typeDrawerCategory !== null}
        onClose={() => setTypeDrawerCategory(null)}
        category={typeDrawerCategory}
        allPathways={pathways}
        allCountries={countries}
      />
    </div>
  );
}

export default function PathwaysPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pb-16">
        <Suspense fallback={<div className="max-w-6xl mx-auto px-4 py-8 text-earth-500">加载中...</div>}>
          <PathwaysContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
