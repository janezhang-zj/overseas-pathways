"use client";

import type { Material } from "@/types/material";
import Toggle from "@/components/ui/Toggle";
import Badge from "@/components/ui/Badge";
import Accordion from "@/components/ui/Accordion";

interface MaterialItemProps {
  material: Material;
  required: boolean;
  specificNote?: string;
  status: "todo" | "done";
  onToggle: () => void;
}

export default function MaterialItem({
  material,
  required,
  specificNote,
  status,
  onToggle,
}: MaterialItemProps) {
  return (
    <div
      className={`rounded-xl border transition-colors ${
        status === "done"
          ? "bg-moss-50/50 border-moss-200/60"
          : "bg-white/50 border-earth-200/40"
      }`}
    >
      {/* 头部 */}
      <div className="flex items-start gap-3 p-4">
        <Toggle checked={status === "done"} onChange={onToggle} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h4
              className={`text-sm font-medium ${
                status === "done" ? "text-moss-700 line-through" : "text-earth-800"
              }`}
            >
              {material.name}
            </h4>
            {required ? (
              <Badge variant="must">必须</Badge>
            ) : (
              <Badge variant="optional">可选</Badge>
            )}
          </div>
          <p className="text-xs text-earth-500 line-clamp-2">{material.description}</p>
          {specificNote && (
            <p className="text-xs text-seed-500 mt-1 bg-seed-50/50 rounded px-2 py-0.5 inline-block">
              {specificNote}
            </p>
          )}
        </div>
      </div>

      {/* 详情信息 */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-earth-600 mb-3">
          <div className="bg-earth-50/50 rounded-lg p-2">
            <span className="text-earth-400 block">费用</span>
            <span className="font-medium text-earth-800">
              ¥{material.estimatedFeeRMB.toLocaleString()}
            </span>
          </div>
          <div className="bg-earth-50/50 rounded-lg p-2">
            <span className="text-earth-400 block">办理地点</span>
            <span className="font-medium text-earth-800 truncate block" title={material.processingLocation}>
              {material.processingLocation}
            </span>
          </div>
          <div className="bg-earth-50/50 rounded-lg p-2">
            <span className="text-earth-400 block">办理周期</span>
            <span className="font-medium text-earth-800">{material.estimatedProcessingDays}天</span>
          </div>
          <div className="bg-earth-50/50 rounded-lg p-2">
            <span className="text-earth-400 block">有效期</span>
            <span className="font-medium text-earth-800">{material.validityPeriod || "—"}</span>
          </div>
        </div>

        {/* 官方链接 */}
        <div className="flex items-center gap-3 mb-3 text-xs">
          {material.officialUrl && (
            <a
              href={material.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-moss-600 hover:text-moss-700 transition-colors"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              官网
            </a>
          )}
          {material.officialPhone && (
            <span className="flex items-center gap-1 text-earth-500">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {material.officialPhone}
            </span>
          )}
        </div>

        {/* 办理步骤 (手风琴展开) */}
        {material.steps.length > 0 && (
          <Accordion title="查看办理步骤">
            <div className="space-y-3 mt-1">
              {material.steps.map((step, idx) => (
                <div key={step.order} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-moss-100 text-moss-700 text-xs font-medium flex items-center justify-center">
                      {step.order}
                    </div>
                    {idx < material.steps.length - 1 && (
                      <div className="w-px flex-1 bg-earth-200 my-0.5" />
                    )}
                  </div>
                  <div className="flex-1 pb-3">
                    <h5 className="text-sm font-medium text-earth-800">{step.title}</h5>
                    <p className="text-xs text-earth-500 mt-0.5 leading-relaxed">{step.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] text-earth-400">{step.duration}</span>
                      {step.tips && (
                        <span className="text-[11px] text-seed-500 bg-seed-50 px-1.5 py-0.5 rounded">
                          提示：{step.tips}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Accordion>
        )}

        {/* 小贴士 */}
        {material.tips && material.tips.length > 0 && (
          <Accordion title="小贴士">
            <ul className="space-y-1 mt-1">
              {material.tips.map((tip, i) => (
                <li key={i} className="text-xs text-earth-600 flex items-start gap-1.5">
                  <span className="text-seed-400 mt-0.5 flex-shrink-0">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </Accordion>
        )}
      </div>
    </div>
  );
}
