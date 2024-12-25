import { InputProps } from "./types";

export function Input({
  value,
  onChange,
  placeholder,
  className = "",
  disabled,
  type = "text",
  error,
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      <input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={`
          w-full h-11 rounded-md border px-3 text-sm
          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
              : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          }
          disabled:bg-gray-100
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
