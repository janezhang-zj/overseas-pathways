import type { Pathway } from "@/types/pathway";
import type { Country } from "@/types/country";
import PathwayCard from "@/components/pathways/PathwayCard";

interface FeaturedPathwaysProps {
  pathways: Pathway[];
  countries: Country[];
}

export default function FeaturedPathways({ pathways, countries }: FeaturedPathwaysProps) {
  const getCountry = (slug: string) => countries.find((c) => c.slug === slug);

  return (
    <section className="py-16 px-4 bg-earth-100/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-earth-900 mb-2 font-[family-name:var(--font-display)]">
            精选路径
          </h2>
          <p className="text-earth-500 text-sm">这些是目前最受关注、信息最完整的出国路线</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pathways.map((pw) => {
            const country = getCountry(pw.countrySlug);
            if (!country) return null;
            return <PathwayCard key={pw.slug} pathway={pw} country={country} />;
          })}
        </div>
      </div>
    </section>
  );
}
