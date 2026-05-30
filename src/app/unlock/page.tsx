"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function UnlockPage() {
  return (
    <>
      <Header />
      <main className="flex-1 max-w-lg mx-auto px-4 py-20 text-center">
        <div className="glass rounded-2xl p-8">
          <div className="w-16 h-16 rounded-full bg-moss-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-moss-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-earth-900 mb-3 font-[family-name:var(--font-display)]">
            公测期间，全部内容免费开放
          </h2>
          <p className="text-sm text-earth-600 leading-relaxed mb-4">
            目前网站正在公测中，16 条出国路径的完整攻略、材料清单、费用明细全部免费浏览。
          </p>
          <p className="text-xs text-earth-400">
            后续将恢复 ¥9.90 永久解锁，现在浏览的内容届时不受影响。
          </p>
          <a
            href="/pathways"
            className="inline-block mt-6 px-6 py-2.5 rounded-full bg-moss-500 text-white font-medium text-sm hover:bg-moss-600 transition-colors"
          >
            开始浏览所有路径 →
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
