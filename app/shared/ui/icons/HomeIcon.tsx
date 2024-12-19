import { IconProps } from "./types";

export function HomeIcon({ className = "w-5 h-5", color }: IconProps) {
  return (
    <svg
      className={className}
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_51_1362"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="30"
        height="30"
      >
        <rect width="30" height="30" fill="currentColor" />
      </mask>
      <g mask="url(#mask0_51_1362)">
        <path
          d="M7.5 23.75H11.25V16.25H18.75V23.75H22.5V12.5L15 6.875L7.5 12.5V23.75ZM5 26.25V11.25L15 3.75L25 11.25V26.25H16.25V18.75H13.75V26.25H5Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
