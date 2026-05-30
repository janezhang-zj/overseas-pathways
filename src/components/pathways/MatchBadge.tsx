import type { Difficulty } from "@/types/filter";
import { DIFFICULTY_LABELS } from "@/lib/constants";

interface MatchBadgeProps {
  difficulty: Difficulty;
  score?: number;
}

const COLORS: Record<Difficulty, string> = {
  easy: "bg-moss-100 text-moss-700 border-moss-200",
  medium: "bg-seed-100 text-seed-500 border-seed-200",
  hard: "bg-red-50 text-red-600 border-red-100",
};

export default function MatchBadge({ difficulty, score }: MatchBadgeProps) {
  return (
    <div className="flex items-center gap-2">
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${COLORS[difficulty]}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${
          difficulty === "easy" ? "bg-moss-500" : difficulty === "medium" ? "bg-seed-500" : "bg-red-500"
        }`} />
        {DIFFICULTY_LABELS[difficulty]}
      </span>
      {score !== undefined && (
        <span className="text-xs text-earth-400">
          匹配度 {score}%
        </span>
      )}
    </div>
  );
}
