"use client";

import { useState, useEffect, useCallback } from "react";
import type { Metadata } from "next";
import { pathways, countries } from "@/lib/data";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import curatedExperiences from "../../../data/experiences.json";

const API_URL = "https://overseas-pathways-experiences.262617886.workers.dev/api/experiences";

interface Experience {
  id?: string;
  name: string;
  pathway: string;
  content: string;
  date?: string;
  timestamp?: number;
  tags?: string[];
}

export default function ExperiencesPage() {
  const [userExperiences, setUserExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", pathway: "", content: "" });

  // 加载社区提交的经历
  const loadExperiences = useCallback(async () => {
    try {
      const res = await fetch(API_URL);
      if (res.ok) {
        const data = await res.json();
        setUserExperiences(data);
      }
    } catch {
      // API 不可用时静默处理
    }
  }, []);

  useEffect(() => {
    loadExperiences();
  }, [loadExperiences]);

  // 提交经历
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.pathway.trim() || !form.content.trim()) {
      setError("请填写所有字段");
      return;
    }
    if (form.content.trim().length < 20) {
      setError("经历内容至少20个字，写详细一点对其他人更有帮助");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          pathway: form.pathway.trim(),
          content: form.content.trim(),
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        setForm({ name: "", pathway: "", content: "" });
        await loadExperiences(); // 刷新列表
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        const data = await res.json();
        setError(data.error || "提交失败，请重试");
      }
    } catch {
      setError("网络错误，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  // 格式化时间
  const formatDate = (ts?: number) => {
    if (!ts) return "";
    const d = new Date(ts);
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
  };

  return (
    <>
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-earth-900 font-[family-name:var(--font-display)]">
            经验分享
          </h1>
          <p className="text-earth-500 text-sm mt-2">
            真实的出国经历。写下你的故事，帮助下一个出发的人。
          </p>
        </div>

        {/* 提交表单 */}
        <GlassCard className="!p-5 border-moss-100">
          <h3 className="text-sm font-bold text-earth-900 mb-4 font-[family-name:var(--font-display)]">
            ✍️ 分享你的经历
          </h3>

          {submitted && (
            <div className="mb-4 p-3 rounded-xl bg-moss-50 border border-moss-200 text-sm text-moss-700 text-center">
              分享成功！你的经历已发布，感谢帮助更多人
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex flex-wrap gap-3">
              <input
                type="text"
                placeholder="你的昵称"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                maxLength={20}
                className="flex-1 min-w-[140px] rounded-lg border border-earth-200 bg-white/70 px-3 py-2 text-sm text-earth-700 placeholder-earth-400 focus:outline-none focus:ring-2 focus:ring-moss-300"
              />
              <select
                value={form.pathway}
                onChange={(e) => setForm({ ...form, pathway: e.target.value })}
                className="flex-1 min-w-[180px] rounded-lg border border-earth-200 bg-white/70 px-3 py-2 text-sm text-earth-700 focus:outline-none focus:ring-2 focus:ring-moss-300"
              >
                <option value="">选择你走的路径</option>
                {pathways.map((p) => (
                  <option key={p.slug} value={p.title}>{p.title}</option>
                ))}
                <option value="其他路径">其他路径（请在内容中说明）</option>
              </select>
            </div>
            <textarea
              placeholder="写下你的经历——去了哪里、做了什么、踩了什么坑、有什么省钱技巧、让你惊喜或后悔的事……越具体越能帮助后来的人。（至少20个字）"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={5}
              maxLength={3000}
              className="w-full rounded-lg border border-earth-200 bg-white/70 px-3 py-2 text-sm text-earth-700 placeholder-earth-400 focus:outline-none focus:ring-2 focus:ring-moss-300 resize-y"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-earth-400">{form.content.length}/3000</span>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 rounded-full bg-moss-500 text-white text-sm font-medium hover:bg-moss-600 transition-colors disabled:opacity-50"
              >
                {loading ? "提交中..." : "发布分享"}
              </button>
            </div>
          </form>
        </GlassCard>

        {/* 用户提交的经历 */}
        {userExperiences.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-earth-700 font-[family-name:var(--font-display)]">
              💬 社区分享（{userExperiences.length} 条）
            </h3>
            {userExperiences.map((exp) => {
              const pathway = pathways.find((p) => p.title === exp.pathway);
              const countrySlug = pathway?.countrySlug;
              const country = countrySlug ? countries.find((c) => c.slug === countrySlug) : null;

              return (
                <GlassCard key={exp.id || exp.timestamp} className="!p-5">
                  <div className="flex items-center gap-2 mb-3">
                    {country && <span className="text-lg">{country.flagEmoji}</span>}
                    <span className="text-sm font-bold text-earth-800">{exp.name}</span>
                    <span className="text-xs text-earth-400">·</span>
                    <span className="text-xs text-moss-600 bg-moss-50 px-2 py-0.5 rounded-full">
                      {exp.pathway}
                    </span>
                    <span className="text-xs text-earth-400">{formatDate(exp.timestamp)}</span>
                  </div>
                  <p className="text-sm text-earth-700 leading-relaxed whitespace-pre-line">
                    {exp.content}
                  </p>
                </GlassCard>
              );
            })}
          </div>
        )}

        {/* 精选经历 */}
        <div>
          <h3 className="text-sm font-bold text-earth-700 mb-3 font-[family-name:var(--font-display)]">
            ⭐ 精选经历
          </h3>
          <div className="space-y-4">
            {curatedExperiences.map((exp, idx) => {
              const pathway = pathways.find((p) => p.title.includes(exp.pathway));
              const countrySlug = pathway?.countrySlug;
              const country = countrySlug ? countries.find((c) => c.slug === countrySlug) : null;

              return (
                <GlassCard key={idx} className="!p-5">
                  <div className="flex items-center gap-2 mb-3">
                    {country && <span className="text-lg">{country.flagEmoji}</span>}
                    <span className="text-sm font-bold text-earth-800">{exp.name}</span>
                    <span className="text-xs text-earth-400">·</span>
                    <span className="text-xs text-moss-600 bg-moss-50 px-2 py-0.5 rounded-full">
                      {exp.pathway}
                    </span>
                    <span className="text-xs text-earth-400">{exp.date}</span>
                  </div>
                  <p className="text-sm text-earth-700 leading-relaxed whitespace-pre-line">
                    {exp.content}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] rounded-full bg-earth-100 text-earth-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>

        {/* 外部社区 */}
        <GlassCard className="!p-5">
          <h3 className="text-sm font-bold text-earth-900 mb-3 font-[family-name:var(--font-display)]">
            更多人在这些地方分享
          </h3>
          <div className="flex flex-wrap gap-2 text-xs">
            <a
              href="https://www.douban.com/group/whv/"
              target="_blank" rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-full bg-earth-100 text-earth-600 hover:bg-earth-200 transition-colors"
            >
              豆瓣 WHV 小组 →
            </a>
            <a
              href="https://www.xiaohongshu.com/search_result?keyword=澳洲WHV"
              target="_blank" rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-full bg-earth-100 text-earth-600 hover:bg-earth-200 transition-colors"
            >
              小红书 #澳洲WHV →
            </a>
            <a
              href="https://www.xiaohongshu.com/search_result?keyword=新西兰WHV"
              target="_blank" rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-full bg-earth-100 text-earth-600 hover:bg-earth-200 transition-colors"
            >
              小红书 #新西兰WHV →
            </a>
            <a
              href="https://www.xiaohongshu.com/search_result?keyword=德国双元制"
              target="_blank" rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-full bg-earth-100 text-earth-600 hover:bg-earth-200 transition-colors"
            >
              小红书 #德国双元制 →
            </a>
          </div>
        </GlassCard>
      </main>
      <Footer />
    </>
  );
}
