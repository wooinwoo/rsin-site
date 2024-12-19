import { IconProps } from "./types";

export function BoundingBoxIcon({ className = "w-5 h-5", color }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-panel-left ${className}`}
    >
      <rect width="18" height="18" x="3" y="3" rx="2"></rect>
      <path d="M9 3v18"></path>
    </svg>
  );
}
