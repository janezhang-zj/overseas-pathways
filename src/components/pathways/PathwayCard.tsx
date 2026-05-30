"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Pathway } from "@/types/pathway";
import type { Country } from "@/types/country";
import { DIFFICULTY_LABELS, CATEGORY_LABELS } from "@/lib/constants";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import VisualTag from "@/components/ui/VisualTag";

interface PathwayCardProps {
  pathway: Pathway;
  country: Country;
}

function getDomain(url: string): string {
  try {
    const u = new URL(url);
    return u.hostname.replace("www.", "");
  } catch {
    return url;
  }
}

export default function PathwayCard({ pathway, country }: PathwayCardProps) {
  const [flipped, setFlipped] = useState(false);
  const router = useRouter();

  const domain = getDomain(pathway.overview.officialPolicyUrl);
  const detailUrl = `/pathways/${pathway.slug}`;

  return (
    <div className="perspective-800" onClick={() => setFlipped(!flipped)}>
      <div
        className={`relative preserve-3d transition-transform duration-[800ms] ease-in-out cursor-pointer ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
        style={{ minHeight: "370px" }}
      >
        {/* ═══════ 正面 ═══════ */}
        <div className="absolute inset-0 backface-hidden">
          <GlassCard className="h-full flex flex-col !p-5">
            {/* 顶部：国家 + 类型 + 难度 */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{country.flagEmoji}</span>
              <span className="text-[11px] text-earth-400">{country.name}</span>
              <span className="text-[11px] text-earth-300">·</span>
              <span className="text-[11px] text-earth-500">{CATEGORY_LABELS[pathway.category]}</span>
              <div className="flex-1" />
              <Badge
                variant={
                  pathway.difficulty === "easy" ? "done"
                    : pathway.difficulty === "hard" ? "must"
                    : "difficulty"
                }
                size="sm"
              >
                {DIFFICULTY_LABELS[pathway.difficulty]}
              </Badge>
            </div>

            {/* 项目名称 */}
            <h3 className="text-earth-900 font-bold text-[17px] mb-2 leading-snug font-[family-name:var(--font-display)]">
              {pathway.title}
            </h3>

            {/* 可视化标签 */}
            {pathway.visualTags && pathway.visualTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {pathway.visualTags.map((vt, i) => (
                  <VisualTag key={i} tag={vt} />
                ))}
              </div>
            )}

            {/* 简介 */}
            <p className="text-earth-500 text-sm leading-relaxed flex-1 line-clamp-3 mb-3">
              {pathway.subtitle}
            </p>

            {/* 底部 */}
            <div className="mt-auto pt-3 border-t border-earth-200/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-earth-500">
                  约 ¥{Math.round(pathway.costs.totalMinRMB / 10000)}-{Math.round(pathway.costs.totalMaxRMB / 10000)} 万
                </span>
                <a
                  href={pathway.overview.officialPolicyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1 text-[11px] text-moss-600 hover:text-moss-700 transition-colors font-medium"
                >
                  官方来源 ↗ {domain}
                </a>
              </div>
              {/* 翻转提示 — 显眼的 */}
              <div className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-moss-50/50 border border-moss-200/50 cursor-pointer group hover:bg-moss-100/50 transition-colors">
                <svg className="w-4 h-4 text-moss-500 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="text-xs text-moss-600 font-medium">点击翻转，查看完整攻略</span>
                <svg className="w-3 h-3 text-moss-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              <span className="block text-center text-[10px] text-earth-400">
                更新于 {pathway.lastUpdated}
              </span>
            </div>
          </GlassCard>
        </div>

        {/* ═══════ 反面 — 攻略入口 ═══════ */}
        <div className="absolute inset-0 backface-hidden [transform:rotateY(180deg)]">
          <GlassCard className="h-full flex flex-col !p-5">
            {/* 标题 */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">{country.flagEmoji}</span>
              <div>
                <h3 className="text-earth-900 font-bold text-[15px] leading-snug font-[family-name:var(--font-display)]">
                  {pathway.title}
                </h3>
                <p className="text-[11px] text-earth-400">{pathway.type}</p>
              </div>
            </div>

            {/* 攻略包含内容 — 清单式预览 */}
            <p className="text-xs font-medium text-earth-700 mb-2">完整攻略包含：</p>
            <div className="space-y-1.5 text-xs text-earth-600 mb-4 flex-1">
              <div className="flex items-center gap-1.5">
                <svg className="w-3 h-3 text-moss-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                签证申请全流程（申请条件 + 在线操作步骤）
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-3 h-3 text-moss-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                全套材料清单（名字+费用+去哪办+多久+官网链接）
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-3 h-3 text-moss-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                费用明细（每项多少钱 + 总预算）
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-3 h-3 text-moss-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                完整时间线（从准备到出发每步做什么）
              </div>
              {pathway.renewable && (
                <div className="flex items-center gap-1.5">
                  <svg className="w-3 h-3 text-moss-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  续签与长期规划
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <svg className="w-3 h-3 text-moss-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                小贴士 + 避坑指南 + 常见问题 FAQ
              </div>
            </div>

            {/* ── 大按钮：查看完整攻略 ── */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                router.push(detailUrl);
              }}
              className="w-full py-3 rounded-xl bg-moss-500 text-white font-bold text-base hover:bg-moss-600 transition-all hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3l3 3-3 3" />
              </svg>
              查看完整攻略
            </button>

            {/* 底部信息 */}
            <div className="mt-3 text-center flex items-center justify-center gap-3">
              <a
                href={pathway.overview.officialPolicyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[10px] text-moss-600 hover:text-moss-700 font-medium"
              >
                官网 ↗ {domain}
              </a>
              <span className="text-[10px] text-earth-300">·</span>
              <span className="text-[10px] text-earth-400">更新于 {pathway.lastUpdated}</span>
              <span className="text-[10px] text-earth-300">·</span>
              <span
                className="text-[10px] text-earth-400 cursor-pointer hover:text-earth-600"
                onClick={(e) => {
                  e.stopPropagation();
                  setFlipped(false);
                }}
              >
                翻转回正面
              </span>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
