"use client";

import { useState } from "react";
import type { FilterState, EducationLevel, EnglishLevel, PathwayCategory } from "@/types/filter";
import type { Country } from "@/types/country";
import { EDUCATION_LABELS, ENGLISH_LABELS, CATEGORY_LABELS } from "@/lib/constants";

interface FilterPanelProps {
  filters: FilterState;
  onUpdate: (patch: Partial<FilterState>) => void;
  onClear: () => void;
  isActive: boolean;
  matchedCount: number;
  totalCount: number;
  countries: Country[];
  onTypeClick?: (category: PathwayCategory) => void;
}

export default function FilterPanel({
  filters,
  onUpdate,
  onClear,
  isActive,
  matchedCount,
  totalCount,
  countries,
  onTypeClick,
}: FilterPanelProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const panelContent = (
    <div className="space-y-6">
      {/* 头部 */}
      <div className="flex items-center justify-between">
        <h3 className="text-earth-800 font-medium text-sm font-[family-name:var(--font-display)]">
          筛选条件
        </h3>
        {isActive && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs text-earth-400 hover:text-earth-600 transition-colors"
          >
            清除全部
          </button>
        )}
      </div>

      {/* 预算 */}
      <FilterGroup label="预算（元）">
        <select
          value={filters.budgetMax}
          onChange={(e) => onUpdate({ budgetMax: Number(e.target.value) })}
          className="w-full rounded-lg border border-earth-200 bg-white/60 px-3 py-2 text-sm text-earth-700 focus:outline-none focus:ring-2 focus:ring-moss-300"
        >
          <option value={30000}>3万以内</option>
          <option value={50000}>5万以内</option>
          <option value={100000}>10万以内</option>
          <option value={150000}>15万以内</option>
          <option value={200000}>20万以内</option>
          <option value={500000}>50万以内</option>
          <option value={999999}>不限</option>
        </select>
      </FilterGroup>

      {/* 年龄 */}
      <FilterGroup label="年龄范围">
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={filters.age[0]}
            onChange={(e) => onUpdate({ age: [Number(e.target.value), filters.age[1]] })}
            className="w-full rounded-lg border border-earth-200 bg-white/60 px-3 py-2 text-sm text-earth-700 focus:outline-none focus:ring-2 focus:ring-moss-300"
            placeholder="最小"
            min={16}
            max={60}
          />
          <span className="text-earth-400">-</span>
          <input
            type="number"
            value={filters.age[1]}
            onChange={(e) => onUpdate({ age: [filters.age[0], Number(e.target.value)] })}
            className="w-full rounded-lg border border-earth-200 bg-white/60 px-3 py-2 text-sm text-earth-700 focus:outline-none focus:ring-2 focus:ring-moss-300"
            placeholder="最大"
            min={16}
            max={60}
          />
        </div>
      </FilterGroup>

      {/* 学历 */}
      <FilterGroup label="学历">
        <select
          value={filters.education}
          onChange={(e) => onUpdate({ education: e.target.value as EducationLevel })}
          className="w-full rounded-lg border border-earth-200 bg-white/60 px-3 py-2 text-sm text-earth-700 focus:outline-none focus:ring-2 focus:ring-moss-300"
        >
          {Object.entries(EDUCATION_LABELS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </FilterGroup>

      {/* 英语 */}
      <FilterGroup label="英语水平">
        <select
          value={filters.englishLevel}
          onChange={(e) => onUpdate({ englishLevel: e.target.value as EnglishLevel })}
          className="w-full rounded-lg border border-earth-200 bg-white/60 px-3 py-2 text-sm text-earth-700 focus:outline-none focus:ring-2 focus:ring-moss-300"
        >
          {Object.entries(ENGLISH_LABELS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </FilterGroup>

      {/* 国家 */}
      <FilterGroup label="国家">
        <div className="flex flex-wrap gap-1.5">
          {countries.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => {
                const next = filters.countries.includes(c.slug)
                  ? filters.countries.filter((s) => s !== c.slug)
                  : [...filters.countries, c.slug];
                onUpdate({ countries: next });
              }}
              className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                filters.countries.includes(c.slug)
                  ? "bg-moss-100 text-moss-700 border border-moss-300"
                  : "bg-earth-100 text-earth-600 border border-transparent hover:bg-earth-200"
              }`}
            >
              {c.flagEmoji} {c.name}
            </button>
          ))}
        </div>
      </FilterGroup>

      {/* 类型 */}
      <FilterGroup label="类型">
        <div className="flex flex-wrap gap-1.5">
          {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
            <div key={value} className="inline-flex items-center gap-0.5">
              <button
                type="button"
                onClick={() => {
                  const next = filters.categories.includes(value as PathwayCategory)
                    ? filters.categories.filter((c) => c !== value)
                    : [...filters.categories, value as PathwayCategory];
                  onUpdate({ categories: next });
                }}
                className={`px-3 py-1.5 rounded-l-full rounded-r-full text-xs transition-colors ${
                  filters.categories.includes(value as PathwayCategory)
                    ? "bg-seed-100 text-seed-500 border border-seed-300"
                    : "bg-earth-100 text-earth-600 border border-transparent hover:bg-earth-200"
                }`}
              >
                {label}
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onTypeClick?.(value as PathwayCategory);
                }}
                className="w-4 h-4 rounded-full bg-earth-200/50 text-earth-400 hover:bg-earth-300 hover:text-earth-600 flex items-center justify-center text-[10px] transition-colors"
                title={`了解${label}`}
              >
                ?
              </button>
            </div>
          ))}
        </div>
      </FilterGroup>

      {/* 搜索 */}
      <FilterGroup label="关键词搜索">
        <input
          type="text"
          value={filters.searchQuery}
          onChange={(e) => onUpdate({ searchQuery: e.target.value })}
          placeholder="如：打工度假、德语、护理..."
          className="w-full rounded-lg border border-earth-200 bg-white/60 px-3 py-2 text-sm text-earth-700 placeholder-earth-400 focus:outline-none focus:ring-2 focus:ring-moss-300"
        />
      </FilterGroup>

      {/* 结果统计 */}
      <div className="text-center pt-2 border-t border-earth-200/40">
        <span className="text-sm text-earth-600">
          找到 <strong className="text-moss-600">{matchedCount}</strong> / {totalCount} 条匹配路径
        </span>
      </div>
    </div>
  );

  return (
    <>
      {/* 桌面端：侧边栏 */}
      <aside className="hidden md:block w-[280px] flex-shrink-0">
        <div className="glass rounded-2xl p-5 sticky top-20">{panelContent}</div>
      </aside>

      {/* 移动端：底部按钮 + 滑出面板 */}
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 px-6 py-3 bg-earth-800/90 backdrop-blur-md text-white rounded-full shadow-lg text-sm font-medium flex items-center gap-2 active:scale-95 transition-transform"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          筛选 ({matchedCount}/{totalCount})
          {isActive && (
            <span className="w-2 h-2 bg-seed-400 rounded-full" />
          )}
        </button>

        {/* 遮罩 */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-earth-900/30 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* 滑出面板 */}
        <div
          className={`fixed bottom-0 left-0 right-0 z-50 max-h-[70vh] overflow-y-auto glass rounded-t-2xl transition-transform duration-300 ease-out ${
            mobileOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          {/* 拖拽条 */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-earth-300" />
          </div>
          <div className="px-5 pb-8">{panelContent}</div>
        </div>
      </div>
    </>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-earth-500 uppercase tracking-wider">{label}</label>
      {children}
    </div>
  );
}
