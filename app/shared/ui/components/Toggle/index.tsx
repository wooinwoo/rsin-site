interface ToggleProps {
  label: string;
  isOn: boolean;
  onToggle: () => void;
  activeColor?: string;
  disabled?: boolean;
}

export function Toggle({
  label,
  isOn,
  onToggle,
  activeColor = "bg-blue-600",
  disabled = false,
}: ToggleProps) {
  return (
    <div
      className={`flex items-center ${label ? "gap-2" : ""} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <button
        type="button"
        onClick={disabled ? undefined : onToggle}
        disabled={disabled}
        className={`
          relative h-6 w-12 rounded-full 
          transition-all duration-300 ease-in-out
          ${isOn ? activeColor : "bg-gray-200"}
          ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        <span
          className={`
          absolute text-[8px] font-medium
          transition-all duration-300 ease-in-out
          ${isOn ? "left-2 top-1.5 text-white opacity-100" : "left-2 opacity-0"}
        `}
        >
          ON
        </span>
        <span
          className={`
          absolute text-[8px] font-medium
          transition-all duration-300 ease-in-out
          ${!isOn ? "right-2 top-1.5 text-gray-600 opacity-100" : "right-2 opacity-0"}
        `}
        >
          OFF
        </span>
        <div
          className={`
            absolute top-0.5 h-5 w-5 rounded-full bg-white
            transform transition-all duration-300 ease-in-out
            ${isOn ? "translate-x-[26px]" : "translate-x-0.5"}
            shadow-sm z-10
          `}
        />
      </button>
      <span className="text-sm">{label}</span>
    </div>
  );
}
