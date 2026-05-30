import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-earth-900 mb-8 font-[family-name:var(--font-display)]">
          使用指南
        </h1>

        <div className="space-y-8 text-earth-700 leading-relaxed">
          <section className="glass rounded-2xl p-6">
            <h2 className="text-lg font-bold text-earth-900 mb-3 font-[family-name:var(--font-display)]">怎么用这个网站</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-moss-500 mt-1 font-bold">1.</span>
                <span><strong>浏览所有路径</strong> — 在"所有路径"页面查看全部出国机会，每张卡片翻转就能看到完整攻略入口</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-moss-500 mt-1 font-bold">2.</span>
                <span><strong>按条件筛选</strong> — 左侧筛选栏支持按年龄、学历、英语水平、预算、国家、类型筛选。点击类型旁的 <code className="bg-earth-100 px-1 rounded text-earth-600">?</code> 可以看名词解释</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-moss-500 mt-1 font-bold">3.</span>
                <span><strong>快速匹配</strong> — 首页输入年龄/学历/英语/预算，系统自动匹配你能走的路径并按适合度排序</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-moss-500 mt-1 font-bold">4.</span>
                <span><strong>查看完整攻略</strong> — 点进任一路径查看官方政策、费用明细、时间线、材料清单（可逐项勾选跟踪进度）、FAQ</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-moss-500 mt-1 font-bold">5.</span>
                <span><strong>材料清单跟踪</strong> — 每条路径的材料清单可以勾选"已完成"，进度会自动保存在浏览器，下次打开还在</span>
              </li>
            </ul>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="text-lg font-bold text-earth-900 mb-3 font-[family-name:var(--font-display)]">信息可靠吗</h2>
            <p className="text-sm">
              每条路径的签证要求、材料清单、费用标准均来自各国移民局/劳工部/教育部官网的公开信息。
              每条路径底部都标注了官网链接和最后更新日期。但政策可能随时变化，建议在准备申请时以官网最新公告为准。
            </p>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="text-lg font-bold text-earth-900 mb-3 font-[family-name:var(--font-display)]">术语看不懂？</h2>
            <p className="text-sm">
              去<strong>术语表</strong>页面查看常见缩写和名词解释——WHV、PTE、EOI、Ausbildung、Sperrkonto 等。
              筛选面板里每个类型旁边的 <code className="bg-earth-100 px-1 rounded text-earth-600">?</code> 按钮也能帮你理解每条路径属于什么类型。
            </p>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
