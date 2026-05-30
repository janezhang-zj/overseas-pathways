import { notFound } from "next/navigation";
import { getCountry, getPathwaysByCountry, countries as allCountries } from "@/lib/data";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import PathwayCard from "@/components/pathways/PathwayCard";
import Link from "next/link";

export function generateStaticParams() {
  return allCountries.map((c) => ({ slug: c.slug }));
}

export default async function CountryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const country = getCountry(slug);
  if (!country) notFound();

  const countryPathways = getPathwaysByCountry(slug);

  return (
    <>
      <Header />
      <main className="flex-1 max-w-6xl mx-auto px-4 py-8">
        <Link
          href="/countries"
          className="inline-flex items-center gap-1 text-sm text-earth-500 hover:text-earth-700 transition-colors mb-6"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          返回所有国家
        </Link>

        {/* 国家信息头部 */}
        <div className="flex items-start gap-4 mb-8">
          <span className="text-5xl">{country.flagEmoji}</span>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-earth-900 font-[family-name:var(--font-display)]">
              {country.name}
            </h1>
            <p className="text-earth-400 text-sm">{country.nameEn} · {country.continent}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* 基本信息 */}
          <div className="md:col-span-2 space-y-6">
            <GlassCard className="!p-6">
              <h2 className="text-lg font-bold text-earth-900 mb-3 font-[family-name:var(--font-display)]">国家简介</h2>
              <p className="text-earth-700 text-sm leading-relaxed">{country.description}</p>
            </GlassCard>

            <GlassCard className="!p-6">
              <h2 className="text-lg font-bold text-earth-900 mb-3 font-[family-name:var(--font-display)]">亮点</h2>
              <ul className="space-y-2">
                {country.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-earth-700">
                    <span className="text-moss-500 mt-1">•</span> {h}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>

          {/* 侧边栏 */}
          <div className="space-y-4">
            <GlassCard className="!p-4">
              <h3 className="text-sm font-medium text-earth-800 mb-3">生活成本</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-earth-500">月生活费</span>
                  <span className="text-earth-800">
                    ¥{country.costOfLiving.monthlyMinRMB.toLocaleString()} - ¥{country.costOfLiving.monthlyMaxRMB.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-earth-500">货币</span>
                  <span className="text-earth-800">{country.currency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-earth-500">汇率</span>
                  <span className="text-earth-800">{country.exchangeRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-earth-500">语言</span>
                  <span className="text-earth-800">{country.language}</span>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="!p-4">
              <h3 className="text-sm font-medium text-earth-800 mb-3">最低工资</h3>
              <p className="text-lg font-bold text-moss-600">{country.minWage.rate}</p>
              <p className="text-xs text-earth-500 mt-1">月收入约 ¥{country.minWage.monthlyEstimateRMB.toLocaleString()}</p>
              <p className="text-xs text-earth-400 mt-1">{country.minWage.note}</p>
            </GlassCard>

            <GlassCard className="!p-4">
              <h3 className="text-sm font-medium text-earth-800 mb-2">官方链接</h3>
              <div className="space-y-1.5">
                <a href={country.officialLinks.immigration} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-1.5 text-xs text-moss-600 hover:text-moss-700">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  移民局官网
                </a>
                {country.officialLinks.education && (
                  <a href={country.officialLinks.education} target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-1.5 text-xs text-moss-600 hover:text-moss-700">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    教育部官网
                  </a>
                )}
              </div>
            </GlassCard>
          </div>
        </div>

        {/* 该国路径 */}
        <section>
          <h2 className="text-2xl font-bold text-earth-900 mb-5 font-[family-name:var(--font-display)]">
            该国的出国路径 ({countryPathways.length})
          </h2>
          {countryPathways.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {countryPathways.map((pw) => (
                <PathwayCard key={pw.slug} pathway={pw} country={country} />
              ))}
            </div>
          ) : (
            <p className="text-earth-500 text-sm">暂无路径数据，正在整理中...</p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
