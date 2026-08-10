import { IconProps } from "./icon.types"

export default function TrendingDownIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M3 7l6 6 4-4 8 8" />
      <path d="M21 17v-4h-4" />
    </svg>
  )
}
