import { IconProps } from "./icon.types"

export default function SitemapIcon({ size = 24, ...props }: IconProps) {
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
      <rect x="9" y="2" width="6" height="5" rx="1" />
      <rect x="3" y="17" width="6" height="5" rx="1" />
      <rect x="15" y="17" width="6" height="5" rx="1" />
      <path d="M12 7v4" />
      <path d="M6 17v-3h12v3" />
      <path d="M12 11v3" />
    </svg>
  )
}
