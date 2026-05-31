"use client";

import { useState, useEffect, useCallback } from "react";
import type { Pathway } from "@/types/pathway";
import { getItem, setItem } from "@/lib/storage";

interface ApplicationTrackerProps {
  pathway: Pathway;
}

interface Phase {
  label: string;
  icon: string;
  tasks: string[];
  deadline: string;
}

function getPhases(pathwaySlug: string): Phase[] {
  const shared = [
    { label: "准备语言考试", icon: "📝", tasks: ["报名雅思/PTE考试", "备考+参加考试", "等待成绩单"], deadline: "抽签开放前至少1个月" },
    { label: "注册ImmiAccount", icon: "💻", tasks: ["在移民局官网注册账户", "熟悉系统界面和材料上传流程"], deadline: "抽签开放前" },
    { label: "学历认证", icon: "🎓", tasks: ["准备毕业证+成绩单", "办理中英文公证（2-3份）", "学信网认证（带二维码）"], deadline: "中签前完成" },
  ];

  if (pathwaySlug === "australia-whv-462" || pathwaySlug === "new-zealand-whv") {
    return [
      ...shared,
      { label: "中签/获邀", icon: "🎲", tasks: ["提交EOI预申请（25澳元）", "等待抽签结果", "收到邀请邮件→开始28天倒计时！"], deadline: "中签后28天内必须递交" },
      { label: "递交正式申请", icon: "📋", tasks: ["填写签证申请表（ImmiAccount在线）", "上传全套材料PDF", "支付签证费（635澳元）", "确保28天倒计时内完成！"], deadline: "中签后28天" },
      { label: "体检", icon: "🏥", tasks: ["收到HAP ID", "预约指定体检医院", "完成胸部X光+常规体检（约1-2小时）"], deadline: "收到通知后尽快（通常2周内）" },
      { label: "等待下签", icon: "⏳", tasks: ["移民局审理（通常1-3个月）", "如需补材料→及时回复", "收到下签信（电子签证）"], deadline: "无固定期限" },
      { label: "准备出发", icon: "✈️", tasks: ["购买机票（提前3个月最划算）", "预订首1-2周住宿", "换汇+开通国际卡", "购买海外保险"], deadline: "下签后1年内必须入境" },
      { label: "二签追踪", icon: "🔄", tasks: ["偏远地区指定工作满88天", "保留工资单/雇主证明/住宿证明", "在第12个月结束前申请二签"], deadline: "一签到期前完成88天" },
    ];
  }

  return shared;
}

export default function ApplicationTracker({ pathway }: ApplicationTrackerProps) {
  const [startDate, setStartDate] = useState("");
  const [winDate, setWinDate] = useState("");
  const [visaDate, setVisaDate] = useState("");
  const [activePhase, setActivePhase] = useState(0);

  const key = `tracker_${pathway.slug}`;

  useEffect(() => {
    const saved = getItem<{ start: string; win: string; visa: string; phase: number }>(key, {
      start: "", win: "", visa: "", phase: 0,
    });
    if (saved.start) setStartDate(saved.start);
    if (saved.win) setWinDate(saved.win);
    if (saved.visa) setVisaDate(saved.visa);
    if (saved.phase) setActivePhase(saved.phase);
  }, [key]);

  const save = useCallback(
    (field: string, value: string | number) => {
      const data = { start: startDate, win: winDate, visa: visaDate, phase: activePhase, [field]: value };
      setItem(key, data);
    },
    [key, startDate, winDate, visaDate, activePhase]
  );

  const phases = getPhases(pathway.slug);

  // 计算倒计时
  const getCountdown = (targetDate: string): string | null => {
    if (!targetDate) return null;
    const now = new Date();
    const target = new Date(targetDate);
    const diff = target.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (days < 0) return `已过期 ${Math.abs(days)} 天`;
    if (days === 0) return "今天！";
    return `${days} 天`;
  };

  const winCountdown = winDate ? getCountdown(new Date(new Date(winDate).getTime() + 28 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]) : null;
  const visaCountdown = visaDate ? getCountdown(new Date(new Date(visaDate).getTime() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]) : null;

  return (
    <div className="space-y-6">
      {/* 日期设置区 */}
      <div className="glass rounded-2xl p-5">
        <h3 className="text-sm font-bold text-earth-900 mb-3 font-[family-name:var(--font-display)]">
          设置你的关键日期
        </h3>
        <div className="flex flex-wrap gap-3">
          <DateInput
            label="开始准备日期"
            value={startDate}
            onChange={(v) => { setStartDate(v); save("start", v); setActivePhase(v ? 0 : activePhase); }}
          />
          <DateInput
            label="中签/获邀日期"
            value={winDate}
            onChange={(v) => { setWinDate(v); save("win", v); setActivePhase(v ? 3 : activePhase); }}
          />
          <DateInput
            label="下签日期"
            value={visaDate}
            onChange={(v) => { setVisaDate(v); save("visa", v); setActivePhase(v ? 6 : activePhase); }}
          />
        </div>
      </div>

      {/* 关键倒计时 */}
      {(winCountdown || visaCountdown) && (
        <div className="glass rounded-2xl p-5">
          <h3 className="text-sm font-bold text-earth-900 mb-3 font-[family-name:var(--font-display)]">⏰ 关键倒计时</h3>
          <div className="flex flex-wrap gap-3">
            {winCountdown && (
              <div className={`px-4 py-2 rounded-xl text-sm font-bold ${winCountdown.includes("已过期") ? "bg-red-100 text-red-700" : Number(winCountdown.split(" ")[0]) <= 14 ? "bg-seed-100 text-seed-500" : "bg-moss-100 text-moss-700"}`}>
                材料递交截止：{winCountdown}
              </div>
            )}
            {visaCountdown && (
              <div className={`px-4 py-2 rounded-xl text-sm font-bold ${visaCountdown.includes("已过期") ? "bg-red-100 text-red-700" : "bg-moss-100 text-moss-700"}`}>
                入境截止：{visaCountdown}
              </div>
            )}
          </div>
          {winCountdown && Number(winCountdown.split(" ")[0]) <= 14 && !winCountdown.includes("已过期") && (
            <p className="text-xs text-red-600 mt-2">
              ⚠️ 材料递交截止日期在14天内！请尽快完成所有材料准备并递交！
            </p>
          )}
        </div>
      )}

      {/* 时间线进度条 */}
      <div className="glass rounded-2xl p-5">
        <h3 className="text-sm font-bold text-earth-900 mb-4 font-[family-name:var(--font-display)]">
          申请进度追踪
        </h3>

        <div className="space-y-0">
          {phases.map((phase, idx) => {
            const isActive = idx === activePhase;
            const isPast = idx < activePhase;
            const isFuture = idx > activePhase;

            return (
              <div
                key={idx}
                className={`relative flex gap-4 pb-4 ${
                  isActive ? "opacity-100" : isFuture ? "opacity-40" : "opacity-70"
                }`}
              >
                {/* 竖线 */}
                {idx < phases.length - 1 && (
                  <div
                    className={`absolute left-[17px] top-10 bottom-0 w-0.5 ${
                      isPast ? "bg-moss-400" : "bg-earth-200"
                    }`}
                    style={{ height: "calc(100% - 10px)" }}
                  />
                )}

                {/* 圆形标记 */}
                <button
                  type="button"
                  onClick={() => setActivePhase(idx)}
                  className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    isPast
                      ? "bg-moss-500 text-white"
                      : isActive
                      ? "bg-moss-500 text-white ring-4 ring-moss-200 scale-110"
                      : "bg-earth-200 text-earth-500"
                  }`}
                >
                  {isPast ? "✓" : idx + 1}
                </button>

                {/* 内容 */}
                <div className="flex-1 min-w-0">
                  <div
                    className={`flex items-center gap-2 cursor-pointer ${isActive ? "font-bold" : ""}`}
                    onClick={() => setActivePhase(idx)}
                  >
                    <span className="text-lg">{phase.icon}</span>
                    <span className="text-sm text-earth-800">{phase.label}</span>
                  </div>

                  {isActive && (
                    <div className="mt-2 ml-0 space-y-1.5">
                      <p className="text-xs text-earth-500">
                        ⏱ 截止时间：{phase.deadline}
                      </p>
                      <ul className="space-y-1">
                        {phase.tasks.map((task, ti) => (
                          <li key={ti} className="flex items-start gap-1.5 text-xs text-earth-600">
                            <input
                              type="checkbox"
                              className="mt-0.5 w-3.5 h-3.5 rounded border-earth-300 text-moss-500 focus:ring-moss-400"
                              defaultChecked={false}
                            />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 体检机构推荐 */}
      <div className="glass rounded-2xl p-5 border-moss-100">
        <h3 className="text-sm font-bold text-earth-900 mb-3 font-[family-name:var(--font-display)]">
          🏥 指定体检机构
        </h3>
        <p className="text-xs text-earth-500 mb-3">
          收到移民局体检通知（含HAP ID）后，选择最近的指定医院预约体检。建议提前1-2周预约。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {[
            { city: "北京", name: "北京国际旅行卫生保健中心", phone: "010-58648801" },
            { city: "上海", name: "上海国际旅行卫生保健中心", phone: "021-62688851" },
            { city: "广州", name: "广州国际旅行卫生保健中心", phone: "020-87580367" },
            { city: "成都", name: "成都国际旅行卫生保健中心", phone: "028-85159611" },
            { city: "重庆", name: "重庆国际旅行卫生保健中心", phone: "023-86883300" },
            { city: "武汉", name: "武汉国际旅行卫生保健中心", phone: "027-85725335" },
            { city: "南京", name: "南京国际旅行卫生保健中心", phone: "025-52345775" },
            { city: "杭州", name: "浙江国际旅行卫生保健中心", phone: "0571-81103888" },
            { city: "沈阳", name: "沈阳国际旅行卫生保健中心", phone: "024-23868741" },
            { city: "哈尔滨", name: "黑龙江国际旅行卫生保健中心", phone: "0451-82332051" },
            { city: "济南", name: "山东国际旅行卫生保健中心", phone: "0531-88595016" },
            { city: "福州", name: "福建国际旅行卫生保健中心", phone: "0591-87515939" },
          ].map((c) => (
            <div key={c.city + c.name} className="flex items-start gap-2 p-2 rounded-lg bg-white/50 border border-earth-100 text-xs">
              <span className="font-medium text-earth-800 w-10 flex-shrink-0">{c.city}</span>
              <div className="flex-1 min-w-0">
                <span className="text-earth-700">{c.name}</span>
                <span className="text-earth-400 block">{c.phone}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DateInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] text-earth-500 font-medium">{label}</label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-earth-200 bg-white/70 px-3 py-2 text-xs text-earth-700 focus:outline-none focus:ring-2 focus:ring-moss-300 w-[160px]"
      />
    </div>
  );
}
