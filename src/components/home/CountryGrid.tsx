import type { Country } from "@/types/country";
import GlassCard from "@/components/ui/GlassCard";
import Link from "next/link";

interface CountryGridProps {
  countries: Country[];
}

export default function CountryGrid({ countries }: CountryGridProps) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-earth-900 mb-2 font-[family-name:var(--font-display)]">
            覆盖国家
          </h2>
          <p className="text-earth-500 text-sm">每个国家都有多条路径可选，点进去看看</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {countries.map((country) => (
            <Link key={country.slug} href={`/countries/${country.slug}`}>
              <GlassCard className="!p-4 text-center hover:!shadow-md transition-all hover:!-translate-y-1">
                <span className="text-3xl block mb-2">{country.flagEmoji}</span>
                <h3 className="text-earth-800 font-medium text-sm font-[family-name:var(--font-display)]">
                  {country.name}
                </h3>
                <p className="text-earth-400 text-xs mt-1">{country.continent}</p>
                <p className="text-earth-500 text-xs mt-2 line-clamp-2">{country.description}</p>
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
