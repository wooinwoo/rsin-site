interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "red" | "secondary";
}

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  const variants = {
    primary: "bg-blue-400 text-white hover:bg-blue-600",
    secondary: "bg-gray-400 text-white hover:bg-gray-600",
    red: "bg-red-400 text-white hover:bg-red-600",
    outline:
      "rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50",
  };

  return (
    <button
      className={`
        rounded-md px-4 py-2 text-sm font-medium
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
      {...props}
    />
  );
}
