import { IconProps } from "./types";

export function HouseboatIcon({ className = "w-5 h-5", color }: IconProps) {
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
        id="mask0_leave_status"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="30"
        height="30"
      >
        <rect width="30" height="30" fill="currentColor" />
      </mask>
      <g mask="url(#mask0_leave_status)">
        <path
          d="M6.25 26.25C5.5625 26.25 4.97375 26.005 4.48375 25.515C3.99375 25.025 3.75 24.4367 3.75 23.75V8.75C3.75 8.0625 3.99375 7.47375 4.48375 6.98375C4.97375 6.49375 5.5625 6.25 6.25 6.25H7.5V5C7.5 4.65625 7.615 4.365 7.845 4.125C8.075 3.885 8.36667 3.76667 8.72 3.75C9.0625 3.75 9.36125 3.865 9.61625 4.095C9.87125 4.325 9.99333 4.61667 9.975 4.97V6.25H20V5C20 4.65625 20.115 4.365 20.345 4.125C20.575 3.885 20.8667 3.76667 21.22 3.75C21.5625 3.75 21.8613 3.865 22.1163 4.095C22.3713 4.325 22.4933 4.61667 22.475 4.97V6.25H23.75C24.4375 6.25 25.0263 6.49375 25.5163 6.98375C26.0063 7.47375 26.25 8.0625 26.25 8.75V23.75C26.25 24.4375 26.0063 25.0263 25.5163 25.5163C25.0263 26.0063 24.4375 26.25 23.75 26.25H6.25ZM6.25 23.75H23.75V13.75H6.25V23.75ZM6.25 11.25H23.75V8.75H6.25V11.25Z"
          fill="currentColor"
        />
        <circle cx="15" cy="18.75" r="3" fill="currentColor" opacity="0.85" />
      </g>
    </svg>
  );
}
