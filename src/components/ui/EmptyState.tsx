interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {/* 蒲公英种子图标 */}
      <svg className="w-16 h-16 text-earth-300 mb-6" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="32" cy="44" r="3" fill="currentColor" />
        <path d="M32 41v-8" />
        <path d="M32 33l-8-10a2 2 0 014-2l4 5 4-5a2 2 0 014 2l-8 10z" />
        <path d="M28 30l-10-4a2 2 0 011-4l5 4 1-6a2 2 0 013 0l1 6 5-4a2 2 0 011 4l-10 4z" />
        <path d="M36 30l10-4a2 2 0 00-1-4l-5 4-1-6a2 2 0 00-3 0l-1 6-5-4a2 2 0 00-1 4l7 4z" />
      </svg>

      <h3 className="text-earth-700 font-medium text-lg mb-2 font-[family-name:var(--font-display)]">{title}</h3>
      <p className="text-earth-500 text-sm max-w-xs leading-relaxed">{description}</p>

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 px-5 py-2 rounded-full bg-moss-500 text-white text-sm font-medium hover:bg-moss-600 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
