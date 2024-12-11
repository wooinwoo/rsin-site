import { SelectProps } from "./types";

export function Select({
  options,
  value,
  onChange,
  placeholder,
  className = "",
  disabled,
  ...props
}: SelectProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        className={`
          w-full h-11 rounded-md border border-gray-300 p-2 pr-8 text-sm
          focus:border-blue-500 focus:ring-1 focus:ring-blue-500
          disabled:bg-gray-100
          appearance-none  /* 기본 화살표 제거 */
          ${className}
        `}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* 커스텀 화살표 */}
      <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
        <svg
          className="h-4 w-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
