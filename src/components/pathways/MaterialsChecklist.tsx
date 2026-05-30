"use client";

import type { Material } from "@/types/material";
import { useMaterialProgress } from "@/hooks/useMaterialProgress";
import MaterialItem from "./MaterialItem";

interface MaterialEntry {
  material: Material;
  required: boolean;
  specificNote?: string;
}

interface MaterialsChecklistProps {
  materials: MaterialEntry[];
  pathwaySlug: string;
}

export default function MaterialsChecklist({ materials, pathwaySlug }: MaterialsChecklistProps) {
  const { statuses, toggle, progress } = useMaterialProgress(pathwaySlug);

  // 初始化所有材料的状态
  const materialsWithStatus = materials.map((entry) => ({
    ...entry,
    status: statuses[entry.material.id] || "todo" as const,
  }));

  const requiredMaterials = materialsWithStatus.filter((m) => m.required);
  const optionalMaterials = materialsWithStatus.filter((m) => !m.required);

  return (
    <div className="space-y-5">
      {/* 进度条 */}
      <div className="glass rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-earth-700">材料准备进度</span>
          <span className="text-xs text-earth-500">{progress}%</span>
        </div>
        <div className="w-full h-2 bg-earth-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-moss-400 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-earth-400 mt-2">
          共 {materials.length} 项材料 · 必须 {requiredMaterials.length} 项 · 可选 {optionalMaterials.length} 项
        </p>
      </div>

      {/* 必须材料 */}
      {requiredMaterials.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-earth-700 flex items-center gap-2">
            <BadgeVariant>必须</BadgeVariant>
            必备材料 ({requiredMaterials.length})
          </h4>
          {requiredMaterials.map((entry) => (
            <MaterialItem
              key={entry.material.id}
              material={entry.material}
              required={entry.required}
              specificNote={entry.specificNote}
              status={entry.status}
              onToggle={() => toggle(entry.material.id)}
            />
          ))}
        </div>
      )}

      {/* 可选材料 */}
      {optionalMaterials.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-earth-700 flex items-center gap-2">
            <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs bg-earth-100 text-earth-500">
              可选
            </span>
            补充材料 ({optionalMaterials.length})
          </h4>
          {optionalMaterials.map((entry) => (
            <MaterialItem
              key={entry.material.id}
              material={entry.material}
              required={entry.required}
              specificNote={entry.specificNote}
              status={entry.status}
              onToggle={() => toggle(entry.material.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function BadgeVariant({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs bg-red-100 text-red-600 border border-red-200">
      {children}
    </span>
  );
}
