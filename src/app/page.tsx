import { getFeaturedPathways, countries, pathways } from "@/lib/data";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DandelionParticles from "@/components/effects/DandelionParticles";
import ParallaxMountains from "@/components/effects/ParallaxMountains";
import HeroSection from "@/components/home/HeroSection";
import QuickMatch from "@/components/home/QuickMatch";
import FeaturedPathways from "@/components/home/FeaturedPathways";
import CountryGrid from "@/components/home/CountryGrid";
import VisitorCount from "@/components/home/VisitorCount";

export default function HomePage() {
  const featured = getFeaturedPathways();

  return (
    <>
      <Header />
      <main className="flex-1 relative">
        {/* 特效背景层 */}
        <div className="fixed inset-0 z-0">
          <ParallaxMountains />
          <DandelionParticles />
        </div>

        {/* 内容层 */}
        <div className="relative z-10">
          <HeroSection />
          <QuickMatch />
          {featured.length > 0 && (
            <FeaturedPathways pathways={featured} countries={countries} />
          )}
          <CountryGrid countries={countries} />

          {/* 数据标识 */}
          <section className="py-12 px-4 text-center border-t border-earth-200/50">
            <div className="max-w-6xl mx-auto">
              <p className="text-earth-500 text-sm">
                目前覆盖 <strong className="text-earth-700">{countries.length}</strong> 个国家，{" "}
                <strong className="text-earth-700">{pathways.length}</strong> 条出国路径
              </p>
              <p className="text-earth-400 text-xs mt-1">
                <VisitorCount />
              </p>
              <p className="text-earth-400 text-xs mt-1">
                所有数据来自各国移民局官网，持续更新中
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
