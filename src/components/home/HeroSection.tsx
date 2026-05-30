export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto animate-[fadeUp_0.8s_ease-out]">
        {/* 主标题 — 工具属性 */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-earth-900 leading-tight mb-6 font-[family-name:var(--font-display)]">
          所有出国路径
          <br />
          官方信息一站式聚合
        </h1>

        {/* 副标题 — 保留温度 */}
        <p className="text-lg md:text-xl text-earth-600 leading-relaxed mb-10 max-w-lg mx-auto">
          人生三万天，不止三点一线
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/pathways"
            className="px-8 py-3 rounded-full bg-moss-500 text-white font-medium text-sm hover:bg-moss-600 transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            查看所有出国路径
          </a>
          <a
            href="#quick-match"
            className="px-8 py-3 rounded-full border border-earth-300 text-earth-700 font-medium text-sm hover:bg-earth-50 transition-all hover:-translate-y-0.5"
          >
            快速匹配适合我的路
          </a>
        </div>

        {/* 引导文案 */}
        <p className="mt-10 text-sm text-earth-500 leading-relaxed max-w-md mx-auto">
          这些路，有人已经走过了。
          <br />
          你要做的，只是找到属于自己的那一条
        </p>

        {/* 数据来源标识 */}
        <p className="mt-6 text-xs text-earth-400">
          最后更新：2026年5月 · 信息来自各国移民局官网
        </p>
      </div>
    </section>
  );
}
