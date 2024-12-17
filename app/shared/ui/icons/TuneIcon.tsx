import { IconProps } from "./types";

export function TuneIcon({ className = "w-5 h-5", color }: IconProps) {
  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_51_315"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="32"
        height="32"
      >
        <rect width="32" height="32" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_51_315)">
        <path
          d="M14.6667 28V20H17.3333V22.6667H28V25.3333H17.3333V28H14.6667ZM4 25.3333V22.6667H12V25.3333H4ZM9.33333 20V17.3333H4V14.6667H9.33333V12H12V20H9.33333ZM14.6667 17.3333V14.6667H28V17.3333H14.6667ZM20 12V4H22.6667V6.66667H28V9.33333H22.6667V12H20ZM4 9.33333V6.66667H17.3333V9.33333H4Z"
          fill="#878787"
        />
      </g>
    </svg>
  );
}
