import { countries } from "@/lib/data";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import Link from "next/link";

export default function CountriesPage() {
  return (
    <>
      <Header />
      <main className="flex-1 max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-earth-900 font-[family-name:var(--font-display)]">
            覆盖国家
          </h1>
          <p className="text-earth-500 mt-2">
            目前已整理 {countries.length} 个国家/地区的低成本出国路径信息
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {countries.map((c) => (
            <Link key={c.slug} href={`/countries/${c.slug}`}>
              <GlassCard className="!p-6 h-full hover:!shadow-md transition-all hover:!-translate-y-1">
                <div className="flex items-start gap-4">
                  <span className="text-4xl flex-shrink-0">{c.flagEmoji}</span>
                  <div className="min-w-0">
                    <h2 className="text-lg font-bold text-earth-900 font-[family-name:var(--font-display)]">
                      {c.name}
                    </h2>
                    <p className="text-xs text-earth-400">{c.nameEn} · {c.continent}</p>
                    <p className="text-sm text-earth-600 mt-2 line-clamp-2 leading-relaxed">
                      {c.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {c.tags.map((t) => (
                        <span key={t} className="px-2 py-0.5 text-[11px] rounded-full bg-earth-100 text-earth-600">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
