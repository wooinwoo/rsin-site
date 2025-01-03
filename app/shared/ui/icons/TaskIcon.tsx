import { IconProps } from "./types";

export function TaskIcon({ className = "w-5 h-5", color }: IconProps) {
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
        id="mask0_51_1294"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="30"
        height="30"
      >
        <rect width="30" height="30" fill="currentColor" />
      </mask>
      <g mask="url(#mask0_51_1294)">
        <path
          d="M13.6875 22.5001L20.75 15.4376L18.9375 13.6251L13.6562 18.9063L11.0313 16.2813L9.25 18.0626L13.6875 22.5001ZM7.5 27.5001C6.8125 27.5001 6.22396 27.2553 5.73438 26.7657C5.24479 26.2761 5 25.6876 5 25.0001V5.00008C5 4.31258 5.24479 3.72403 5.73438 3.23445C6.22396 2.74487 6.8125 2.50008 7.5 2.50008H17.5L25 10.0001V25.0001C25 25.6876 24.7552 26.2761 24.2656 26.7657C23.776 27.2553 23.1875 27.5001 22.5 27.5001H7.5ZM16.25 11.2501V5.00008H7.5V25.0001H22.5V11.2501H16.25Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
