import { notFound } from "next/navigation";
import { getPathway, getCountry, getMaterial, pathways } from "@/lib/data";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CostBreakdown from "@/components/pathways/CostBreakdown";
import Timeline from "@/components/pathways/Timeline";
import MaterialsChecklist from "@/components/pathways/MaterialsChecklist";
import Badge from "@/components/ui/Badge";
import { DIFFICULTY_LABELS, CATEGORY_LABELS } from "@/lib/constants";
import Link from "next/link";

export function generateStaticParams() {
  return pathways.map((p) => ({ slug: p.slug }));
}

export default function PathwayDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // In Next.js 16, params is a Promise that must be awaited
  // But for static generation, we need to handle this differently
  return <PathwayDetailPageContent params={params} />;
}

async function PathwayDetailPageContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pathway = getPathway(slug);
  if (!pathway) notFound();

  const country = getCountry(pathway.countrySlug);
  if (!country) notFound();

  // 解析材料引用
  const resolvedMaterials = pathway.materials
    .reduce<Array<{ material: NonNullable<ReturnType<typeof getMaterial>>; required: boolean; specificNote?: string }>>(
      (acc, ref) => {
        const material = getMaterial(ref.materialId);
        if (material) acc.push({ material, required: ref.required, specificNote: ref.specificNote });
        return acc;
      },
      []
    );

  return (
    <>
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 space-y-10">
        {/* 返回链接 */}
        <Link
          href="/pathways"
          className="inline-flex items-center gap-1 text-sm text-earth-500 hover:text-earth-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          返回所有路径
        </Link>

        {/* 路径标题 */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{country.flagEmoji}</span>
            <span className="text-sm text-earth-500">{country.name} · {CATEGORY_LABELS[pathway.category]}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-earth-900 font-[family-name:var(--font-display)]">
            {pathway.title}
          </h1>
          <p className="text-earth-600 mt-2 text-base leading-relaxed">{pathway.subtitle}</p>

          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="difficulty">{DIFFICULTY_LABELS[pathway.difficulty]}</Badge>
            {pathway.tags.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        </div>

        {/* 申请要求 */}
        <section className="glass rounded-2xl p-6">
          <h2 className="text-lg font-bold text-earth-900 mb-4 font-[family-name:var(--font-display)]">申请要求</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-earth-400 block text-xs">年龄</span>
              <span className="text-earth-800 font-medium">{pathway.eligibility.minAge}-{pathway.eligibility.maxAge} 岁</span>
            </div>
            <div>
              <span className="text-earth-400 block text-xs">学历</span>
              <span className="text-earth-800 font-medium">
                {pathway.eligibility.education === "high-school" ? "高中及以上" :
                 pathway.eligibility.education === "associate" ? "大专及以上" :
                 pathway.eligibility.education === "bachelor" ? "本科及以上" : "无要求"}
              </span>
            </div>
            <div>
              <span className="text-earth-400 block text-xs">英语</span>
              <span className="text-earth-800 font-medium">
                {pathway.eligibility.englishLevel === "none" ? "无要求" : pathway.eligibility.englishLevel}
              </span>
            </div>
            <div>
              <span className="text-earth-400 block text-xs">预算</span>
              <span className="text-earth-800 font-medium">¥{Math.round(pathway.eligibility.minBudgetRMB / 10000)}万起</span>
            </div>
          </div>
          {pathway.eligibility.specialRequirements.length > 0 && (
            <div className="mt-4 pt-4 border-t border-earth-200/40">
              <span className="text-xs text-earth-400 block mb-2">特殊要求</span>
              <ul className="space-y-1">
                {pathway.eligibility.specialRequirements.map((req, i) => (
                  <li key={i} className="text-sm text-earth-600 flex items-start gap-1.5">
                    <span className="text-moss-500 mt-1">•</span> {req}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* 签证概览 */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-earth-900 font-[family-name:var(--font-display)]">签证概览</h2>
          <div className="glass rounded-2xl p-6">
            <p className="text-earth-700 text-sm leading-relaxed mb-4">{pathway.overview.description}</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-earth-400 text-xs block">签证时长</span>
                <span className="text-earth-800">{pathway.overview.visaDuration}</span>
              </div>
              <div>
                <span className="text-earth-400 text-xs block">审理时间</span>
                <span className="text-earth-800">{pathway.overview.processingTime}</span>
              </div>
              {pathway.overview.quota && (
                <div>
                  <span className="text-earth-400 text-xs block">名额限制</span>
                  <span className="text-earth-800">{pathway.overview.quota}</span>
                </div>
              )}
              <div>
                <span className="text-earth-400 text-xs block">成功率</span>
                <span className="text-earth-800">{pathway.overview.successRate}</span>
              </div>
            </div>
            <a
              href={pathway.overview.officialPolicyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-4 text-sm text-moss-600 hover:text-moss-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              查看官网政策原文
            </a>
          </div>

          {/* 官方政策说明 */}
          <div className="glass rounded-2xl p-6">
            <h3 className="text-sm font-medium text-earth-800 mb-2">官方政策摘要</h3>
            <p className="text-sm text-earth-600 leading-relaxed whitespace-pre-line">
              {pathway.overview.officialPolicy}
            </p>
          </div>
        </section>

        {/* 费用明细 */}
        <section>
          <h2 className="text-lg font-bold text-earth-900 mb-4 font-[family-name:var(--font-display)]">费用明细</h2>
          <CostBreakdown costs={pathway.costs} />
        </section>

        {/* 时间线 */}
        <section>
          <h2 className="text-lg font-bold text-earth-900 mb-4 font-[family-name:var(--font-display)]">时间线</h2>
          <Timeline timeline={pathway.timeline} />
        </section>

        {/* 材料清单 */}
        <section>
          <h2 className="text-lg font-bold text-earth-900 mb-4 font-[family-name:var(--font-display)]">材料清单</h2>
          <MaterialsChecklist
            materials={resolvedMaterials}
            pathwaySlug={pathway.slug}
          />
        </section>

        {/* 续签说明 */}
        {pathway.renewable && (
          <section className="glass rounded-2xl p-6 border-moss-100">
            <h2 className="text-lg font-bold text-earth-900 mb-3 font-[family-name:var(--font-display)]">
              续签与长期规划
            </h2>
            <p className="text-sm text-earth-700 leading-relaxed">{pathway.renewable}</p>
          </section>
        )}

        {/* FAQ */}
        {pathway.faq && pathway.faq.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-earth-900 mb-4 font-[family-name:var(--font-display)]">
              常见问题
            </h2>
            <div className="space-y-3">
              {pathway.faq.map((item, idx) => (
                <details key={idx} className="glass rounded-xl p-4 group cursor-pointer">
                  <summary className="text-sm font-medium text-earth-800 list-none flex items-center justify-between">
                    {item.question}
                    <svg
                      className="w-4 h-4 text-earth-400 transition-transform group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="text-sm text-earth-600 mt-2 leading-relaxed pl-0">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* 小贴士 */}
        {pathway.tips.length > 0 && (
          <section className="glass rounded-2xl p-6">
            <h2 className="text-lg font-bold text-earth-900 mb-3 font-[family-name:var(--font-display)]">小贴士</h2>
            <ul className="space-y-2">
              {pathway.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-earth-600">
                  <span className="text-moss-500 mt-1 flex-shrink-0">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 注意事项 */}
        {pathway.warnings.length > 0 && (
          <section className="glass rounded-2xl p-6 border-red-100">
            <h2 className="text-lg font-bold text-red-600 mb-3 font-[family-name:var(--font-display)]">注意事项</h2>
            <ul className="space-y-2">
              {pathway.warnings.map((w, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-red-700">
                  <span className="text-red-400 mt-1 flex-shrink-0 font-bold">!</span>
                  {w}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 更新日期 */}
        <p className="text-xs text-earth-400 text-center pt-6 border-t border-earth-200/40">
          数据最后更新：{pathway.lastUpdated} · 来源：{country.name}移民局官网
        </p>
      </main>
      <Footer />
    </>
  );
}
