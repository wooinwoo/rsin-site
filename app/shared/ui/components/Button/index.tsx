interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "red" | "secondary" | "white" | "dark" | "ghost" | "charcoal";
  size?: "sm" | "md" | "lg";
  breakpoint?: {
    size: "sm" | "md" | "lg";
    screen: "sm" | "md" | "lg" | "xl" | "2xl";
  };
}

export function Button({
  variant = "primary",
  size = "sm",
  breakpoint,
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-blue-400 text-white hover:bg-blue-500",
    secondary: "bg-gray-700 text-white hover:bg-gray-800",
    red: "bg-red-400 text-white hover:bg-red-500",
    white: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
    dark: "bg-gray-800 text-white hover:bg-gray-900",
    ghost: "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-gray-900",
    charcoal: "bg-gray-700 text-white hover:bg-gray-800",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-sm",
  };

  const responsiveSize = breakpoint ? `${breakpoint.screen}:${sizes[breakpoint.size]}` : "";

  return (
    <button
      className={`
        rounded-md font-medium
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${responsiveSize}
        ${className}
      `}
      {...props}
    />
  );
}
