"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GlassCard from "@/components/ui/GlassCard";
import { EDUCATION_LABELS, ENGLISH_LABELS } from "@/lib/constants";

export default function QuickMatch() {
  const router = useRouter();
  const [age, setAge] = useState(22);
  const [education, setEducation] = useState("bachelor");
  const [english, setEnglish] = useState("ielts5.5");
  const [budget, setBudget] = useState(100000);

  const handleSubmit = () => {
    const params = new URLSearchParams({
      age: `${age}-${age + 10}`,
      education,
      english,
      budget: String(budget),
    });
    router.push(`/pathways?${params.toString()}`);
  };

  return (
    <section id="quick-match" className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-earth-900 mb-2 font-[family-name:var(--font-display)]">
            三秒匹配，看看你能走哪条路
          </h2>
          <p className="text-earth-500 text-sm">告诉我们你的基本情况，系统自动筛选可行的出国路径</p>
        </div>

        <GlassCard className="!p-6 md:!p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-medium text-earth-500 uppercase tracking-wider">年龄</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full mt-1.5 rounded-lg border border-earth-200 bg-white/60 px-3 py-2.5 text-earth-800 focus:outline-none focus:ring-2 focus:ring-moss-300"
                min={16}
                max={60}
              />
            </div>

            <div>
              <label className="text-xs font-medium text-earth-500 uppercase tracking-wider">学历</label>
              <select
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="w-full mt-1.5 rounded-lg border border-earth-200 bg-white/60 px-3 py-2.5 text-earth-800 focus:outline-none focus:ring-2 focus:ring-moss-300"
              >
                {Object.entries(EDUCATION_LABELS).map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-earth-500 uppercase tracking-wider">英语水平</label>
              <select
                value={english}
                onChange={(e) => setEnglish(e.target.value)}
                className="w-full mt-1.5 rounded-lg border border-earth-200 bg-white/60 px-3 py-2.5 text-earth-800 focus:outline-none focus:ring-2 focus:ring-moss-300"
              >
                {Object.entries(ENGLISH_LABELS).map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-earth-500 uppercase tracking-wider">预算（元）</label>
              <select
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full mt-1.5 rounded-lg border border-earth-200 bg-white/60 px-3 py-2.5 text-earth-800 focus:outline-none focus:ring-2 focus:ring-moss-300"
              >
                <option value={30000}>3万以内</option>
                <option value={50000}>5万以内</option>
                <option value={100000}>10万以内</option>
                <option value={150000}>15万以内</option>
                <option value={200000}>20万以内</option>
                <option value={500000}>50万以内</option>
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full mt-6 py-3 rounded-full bg-moss-500 text-white font-medium text-sm hover:bg-moss-600 transition-all hover:shadow-lg active:scale-[0.98]"
          >
            查看匹配结果
          </button>
        </GlassCard>
      </div>
    </section>
  );
}
