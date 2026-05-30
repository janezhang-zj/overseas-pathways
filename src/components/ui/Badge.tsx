type Variant = "default" | "must" | "optional" | "done" | "difficulty";

interface BadgeProps {
  children: React.ReactNode;
  variant?: Variant;
  size?: "sm" | "md";
  className?: string;
}

const variants: Record<Variant, string> = {
  default: "bg-earth-200 text-earth-700",
  must: "bg-red-100 text-red-600 border border-red-200",
  optional: "bg-earth-100 text-earth-500",
  done: "bg-moss-100 text-moss-700",
  difficulty: "bg-seed-100 text-seed-500",
};

export default function Badge({ children, variant = "default", size = "sm", className = "" }: BadgeProps) {
  const sizeClass = size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm";
  return (
    <span className={`inline-flex items-center rounded-full font-medium ${sizeClass} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
