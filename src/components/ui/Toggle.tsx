interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: "sm" | "md";
}

export default function Toggle({ checked, onChange, label, disabled = false, size = "md" }: ToggleProps) {
  const toggleSize = size === "sm" ? "w-8 h-4" : "w-11 h-6";
  const knobSize = size === "sm" ? "w-3 h-3" : "w-5 h-5";
  const translateX = size === "sm" ? "translate-x-[14px]" : "translate-x-[20px]";

  return (
    <label className={`inline-flex items-center gap-2 ${disabled ? "opacity-50" : "cursor-pointer"}`}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative ${toggleSize} rounded-full transition-colors duration-200 ${
          checked ? "bg-moss-500" : "bg-earth-300"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 ${knobSize} rounded-full bg-white shadow-sm transition-transform duration-200 ${
            checked ? translateX : "translate-x-0"
          }`}
        />
      </button>
      {label && <span className="text-earth-700 text-sm">{label}</span>}
    </label>
  );
}
