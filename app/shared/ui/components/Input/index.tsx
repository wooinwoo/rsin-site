import { InputProps } from "./types";

export function Input({
  value,
  onChange,
  placeholder,
  className = "",
  disabled,
  type = "text",
  ...props
}: InputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      className={`
        w-full h-11 rounded-md border border-gray-300 px-3 text-sm
        focus:border-blue-500 focus:ring-1 focus:ring-blue-500
        disabled:bg-gray-100
        ${className}
      `}
      {...props}
    />
  );
}
