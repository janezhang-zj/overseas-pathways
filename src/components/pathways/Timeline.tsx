import type { PathwayTimelinePhase } from "@/types/pathway";

interface TimelineProps {
  timeline: PathwayTimelinePhase[];
}

export default function Timeline({ timeline }: TimelineProps) {
  return (
    <div className="relative">
      {/* 弯曲连接线 (SVG) */}
      <svg
        className="absolute left-5 top-0 bottom-0 w-8 -z-0 hidden md:block"
        viewBox="0 0 32 100"
        preserveAspectRatio="none"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          d="M16 0 Q 20 25, 16 50 T 16 100"
          className="text-earth-300"
          strokeDasharray="4 4"
        />
      </svg>

      <div className="space-y-8">
        {timeline.map((phase, idx) => (
          <div
            key={idx}
            className="relative flex gap-4 md:gap-6 group"
            style={{
              transform: `translateZ(${(idx - timeline.length / 2) * 2}px)`,
            }}
          >
            {/* 节点 */}
            <div className="flex flex-col items-center flex-shrink-0 z-10">
              <div className="w-10 h-10 rounded-full bg-moss-100 border-2 border-moss-300 flex items-center justify-center text-moss-700 text-xs font-bold group-hover:bg-moss-200 group-hover:scale-110 transition-all">
                {idx + 1}
              </div>
            </div>

            {/* 内容卡片 */}
            <div className="flex-1 glass rounded-xl p-4 md:p-5 transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-0.5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-earth-900 font-medium font-[family-name:var(--font-display)]">
                  {phase.phase}
                </h4>
                <span className="text-xs text-earth-400 bg-earth-100 rounded-full px-2.5 py-0.5">
                  {phase.duration}
                </span>
              </div>
              <ul className="space-y-1.5">
                {phase.tasks.map((task, ti) => (
                  <li key={ti} className="flex items-start gap-2 text-sm text-earth-600">
                    <span className="text-moss-500 mt-1 flex-shrink-0">•</span>
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
