"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import { PAYWALL_ACTIVE, PAYMENT_URL } from "@/lib/paywall-config";

function UnlockContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [justPaid, setJustPaid] = useState(false);

  // 从面包多支付成功回调回来时自动解锁
  useEffect(() => {
    if (searchParams.get("paid") === "1") {
      setJustPaid(true);
      document.cookie = `pw_access=1; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
      const timer = setTimeout(() => router.push("/pathways/australia-whv-462/"), 1500);
      return () => clearTimeout(timer);
    }
  }, [searchParams, router]);

  // ========== 待机模式 ==========
  if (!PAYWALL_ACTIVE) {
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
              16 条出国路径的完整攻略、材料清单、费用明细全部免费浏览。
            </p>
            <p className="text-xs text-earth-400">
              恢复收费后将改为 ¥9.90 永久解锁，届时已解锁用户不受影响。
            </p>
            <a href="/pathways" className="inline-block mt-6 px-6 py-2.5 rounded-full bg-moss-500 text-white font-medium text-sm hover:bg-moss-600 transition-colors">
              开始浏览所有路径 →
            </a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // ========== 支付成功，解锁中 ==========
  if (justPaid) {
    return (
      <>
        <Header />
        <main className="flex-1 max-w-lg mx-auto px-4 py-20 text-center">
          <div className="glass rounded-2xl p-8 animate-[fadeUp_0.5s_ease-out]">
            <div className="w-16 h-16 rounded-full bg-moss-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-moss-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-earth-900 mb-2 font-[family-name:var(--font-display)]">支付成功，正在解锁...</h2>
            <p className="text-sm text-earth-500">全部内容已永久解锁。下次访问无需再次付费。</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // ========== 收费模式 ==========
  return (
    <>
      <Header />
      <main className="flex-1 max-w-lg mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-earth-900 mb-3 font-[family-name:var(--font-display)]">解锁全部内容</h1>
          <p className="text-earth-600 text-sm leading-relaxed">一次付费，永久有效。解锁 16 条出国路径的完整攻略</p>
        </div>

        <GlassCard className="!p-5 mb-4">
          <h3 className="text-sm font-medium text-earth-800 mb-2">免费浏览</h3>
          <ul className="space-y-1 text-xs text-earth-600">
            <li className="flex items-center gap-1.5"><span className="text-moss-500">✓</span> 所有路径卡片 + 可视化标签</li>
            <li className="flex items-center gap-1.5"><span className="text-moss-500">✓</span> 筛选匹配（年龄/学历/英语/预算）</li>
            <li className="flex items-center gap-1.5"><span className="text-moss-500">✓</span> 国家信息 + 术语 + 类型名词解释</li>
          </ul>
        </GlassCard>

        <GlassCard className="!p-5 mb-6 border-moss-200">
          <h3 className="text-sm font-medium text-moss-700 mb-2">¥9.90 解锁后</h3>
          <ul className="space-y-1 text-xs text-earth-600">
            <li className="flex items-center gap-1.5"><span className="text-moss-500">🔓</span> 完整申请攻略 + 官方政策原文</li>
            <li className="flex items-center gap-1.5"><span className="text-moss-500">🔓</span> 互动材料清单（可逐项勾选跟踪）</li>
            <li className="flex items-center gap-1.5"><span className="text-moss-500">🔓</span> 费用明细 + 时间线 + FAQ + 避坑指南</li>
            <li className="flex items-center gap-1.5"><span className="text-moss-500">🔓</span> 永久有效，换设备可重新解锁</li>
          </ul>
        </GlassCard>

        <a
          href={PAYMENT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-4 rounded-xl bg-seed-400 text-earth-900 text-center font-bold text-lg hover:bg-seed-300 transition-all hover:shadow-lg active:scale-[0.98]"
        >
          ¥9.90 立即解锁（永久有效）
        </a>
        <p className="text-center text-xs text-earth-400 mt-3">跳转至安全支付页面，完成后自动返回并解锁</p>

        <p className="text-center text-xs text-earth-400 mt-6">在面包多商品设置中，将支付成功回调地址设为：</p>
        <code className="block text-center text-[10px] text-earth-500 mt-1 break-all bg-earth-50 rounded-lg py-1.5 px-2">
          https://你的域名.com/unlock?paid=1
        </code>
      </main>
      <Footer />
    </>
  );
}

export default function UnlockPage() {
  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center text-earth-500">加载中...</div>}>
      <UnlockContent />
    </Suspense>
  );
}
