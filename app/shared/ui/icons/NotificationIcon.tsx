import { IconProps } from "./types";

export function NotificationIcon({ className = "w-5 h-5", color }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke={color || ""}
    >
      <g clip-path="url(#clip0_150_396)">
        <path
          d="M12 22C13.1 22 14 21.1 14 20H9.99999C9.99999 21.1 10.89 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.62999 5.36 5.99999 7.92 5.99999 11V16L4.70999 17.29C4.07999 17.92 4.51999 19 5.40999 19H18.58C19.47 19 19.92 17.92 19.29 17.29L18 16Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_150_396">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
