"use client";

import { useEffect } from "react";
import type { PathwayCategory } from "@/types/filter";
import type { Pathway } from "@/types/pathway";
import type { Country } from "@/types/country";
import { CATEGORY_LABELS } from "@/lib/constants";
import Link from "next/link";

interface TypeDrawerProps {
  open: boolean;
  onClose: () => void;
  category: PathwayCategory | null;
  allPathways: Pathway[];
  allCountries: Country[];
}

const TYPE_INFO: Record<PathwayCategory, string> = {
  "work-holiday": "打工度假签证允许年轻人在国外短期工作+旅行。通常有年龄限制（18-30岁），有效期12个月，可合法工作。不需要提前找到工作（Offer）。",
  study: "留学签证允许你在国外全日制学习。就读期间通常可以合法兼职打工（各国规定不同）。毕业后有机会转为工作签证长期居留。",
  work: "工作签证通常需要先获得海外雇主的录取通知（Job Offer）。有些国家有技术移民通道，根据年龄、学历、工作经验评分。",
  volunteer: "志愿者/打工换宿通常不需要工作签证。通过WWOOF等平台每天工作4-6小时换取免费食宿，适合预算极低但体验意愿强的人。",
  internship: "海外实习通常通过学校推荐或国际组织安排（如AIESEC）。部分国家的实习签证有单独的申请通道，实习期满后可转为正式工作。",
  exchange: "交换生项目通常通过国内大学和国际合作院校安排。交换期间学费按国内标准收取，海外生活费自理。交换经历可丰富简历和语言能力。",
  "au-pair": "互惠生住在当地家庭，帮助照顾孩子或做简单家务，换取免费食宿+零花钱+语言课程。通常不需要工作签证，有单独的互惠生协议。",
  training: "职业培训（如德国双元制Ausbildung）是企业+学校联合培养模式。学员签订培训合同，每周在企业实践+在学校学习理论，企业支付培训津贴。",
};

export default function TypeDrawer({ open, onClose, category, allPathways, allCountries }: TypeDrawerProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", handleKey);
      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", handleKey);
      };
    }
  }, [open, onClose]);

  if (!open || !category) return null;

  const label = CATEGORY_LABELS[category];
  const info = TYPE_INFO[category];

  // 提供该类型的所有国家
  const categoryPathways = allPathways.filter((p) => p.category === category);
  const categoryCountries = allCountries.filter((c) =>
    categoryPathways.some((p) => p.countrySlug === c.slug)
  );

  return (
    <>
      {/* 遮罩 */}
      <div
        className="fixed inset-0 z-40 bg-earth-900/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* 抽屉 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 max-h-[75vh] overflow-y-auto glass rounded-t-2xl transition-transform duration-300 ease-out animate-[slideUp_0.3s_ease-out]">
        {/* 拖拽条 */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-earth-300" />
        </div>

        <div className="p-5 space-y-5">
          {/* 1. 是什么 */}
          <div>
            <h3 className="text-lg font-bold text-earth-900 font-[family-name:var(--font-display)]">
              什么是{label}？
            </h3>
            <p className="text-sm text-earth-600 leading-relaxed mt-2">{info}</p>
          </div>

          {/* 2. 哪些国家提供 */}
          {categoryCountries.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-earth-800 mb-2">
                提供{label}的国家/地区
              </h4>
              <div className="flex flex-wrap gap-2">
                {categoryCountries.map((c) => {
                  const pw = categoryPathways.find((p) => p.countrySlug === c.slug);
                  return pw ? (
                    <Link
                      key={c.slug}
                      href={`/pathways/${pw.slug}`}
                      onClick={onClose}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 text-sm border border-earth-200 hover:border-moss-300 hover:bg-moss-50 transition-colors"
                    >
                      <span>{c.flagEmoji}</span>
                      <span className="text-earth-700">{c.name}</span>
                      <span className="text-earth-400 text-xs">→ {pw.title.slice(0, 12)}...</span>
                    </Link>
                  ) : null;
                })}
              </div>
            </div>
          )}

          {/* 3. 快速自测 */}
          <div className="glass rounded-xl p-4">
            <h4 className="text-sm font-medium text-earth-800 mb-3">3秒自测：我适合{label}吗？</h4>
            <div className="space-y-2 text-xs text-earth-600">
              {categoryPathways.length > 0 && (
                <>
                  <div className="flex justify-between">
                    <span>年龄要求</span>
                    <span className="text-earth-800">
                      {Math.min(...categoryPathways.map((p) => p.eligibility.minAge))}-
                      {Math.max(...categoryPathways.map((p) => p.eligibility.maxAge))} 岁
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>学历要求</span>
                    <span className="text-earth-800">
                      {categoryPathways.some((p) => p.eligibility.education === "high-school" || p.eligibility.education === "any")
                        ? "低至高中/中专"
                        : "大专及以上"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>最低预算</span>
                    <span className="text-earth-800">
                      ¥{Math.round(Math.min(...categoryPathways.map((p) => p.eligibility.minBudgetRMB)) / 10000)}万起
                    </span>
                  </div>
                </>
              )}
            </div>
            <Link
              href="/pathways"
              onClick={onClose}
              className="mt-3 w-full block text-center py-2 rounded-full bg-moss-500 text-white text-sm font-medium hover:bg-moss-600 transition-colors"
            >
              去筛选页查看全部{label}机会
            </Link>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
