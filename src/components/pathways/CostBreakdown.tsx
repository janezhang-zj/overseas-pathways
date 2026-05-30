import type { PathwayCosts } from "@/types/pathway";

interface CostBreakdownProps {
  costs: PathwayCosts;
}

const TYPE_LABELS: Record<string, string> = {
  government: "政府费用",
  language: "语言考试",
  document: "证件材料",
  health: "体检健康",
  travel: "交通出行",
  living: "生活住宿",
};

export default function CostBreakdown({ costs }: CostBreakdownProps) {
  return (
    <div className="space-y-4">
      {/* 总计 */}
      <div className="glass rounded-xl p-4 text-center">
        <p className="text-xs text-earth-500 mb-1">预计总费用</p>
        <p className="text-2xl font-bold text-earth-900 font-[family-name:var(--font-display)]">
          ¥{costs.totalMinRMB.toLocaleString()} - ¥{costs.totalMaxRMB.toLocaleString()}
        </p>
        <p className="text-xs text-earth-400 mt-1">{costs.note}</p>
      </div>

      {/* 费用明细 */}
      <div className="space-y-2">
        {costs.items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-earth-50/50 transition-colors"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-earth-100 text-earth-500 flex-shrink-0">
                {TYPE_LABELS[item.type] || item.type}
              </span>
              <span className="text-sm text-earth-700 truncate">{item.name}</span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-sm font-medium text-earth-800">
                ¥{item.amountRMB.toLocaleString()}
              </span>
              {item.note && (
                <span className="hidden md:inline text-xs text-earth-400">{item.note}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
