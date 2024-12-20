import { IconProps } from "./types";

export function LogoIcon({ className = "w-5 h-5", color }: IconProps) {
  return (
    <svg
      width="41"
      height="38"
      viewBox="0 0 41 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
      stroke={color || ""}
    >
      <rect width="41" height="38" fill="url(#pattern0_120_1125)" />
      <defs>
        <pattern
          id="pattern0_120_1125"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_120_1125"
            transform="matrix(0.00591716 0 0 0.0063843 0 -0.00436001)"
          />
        </pattern>
        <image
          id="image0_120_1125"
          width="169"
          height="158"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}
