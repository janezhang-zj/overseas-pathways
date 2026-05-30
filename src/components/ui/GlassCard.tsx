interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function GlassCard({ children, className = "", hover = true, onClick }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={`glass rounded-2xl p-5 ${
        hover ? "transition-all duration-300 hover:shadow-lg hover:-translate-y-1" : ""
      } ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
