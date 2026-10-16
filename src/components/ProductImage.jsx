import { useState } from 'react'

const FALLBACK =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000"><rect width="800" height="1000" fill="#E7EFE9"/><text x="400" y="490" font-family="Georgia,serif" font-size="42" fill="#047857" text-anchor="middle">GlamMart</text><text x="400" y="540" font-family="Georgia,serif" font-size="20" fill="#6B7280" text-anchor="middle">Image coming soon</text></svg>`,
  )

export default function ProductImage({ src, alt, className = '', eager = false }) {
  const [current, setCurrent] = useState(src)
  return (
    <img
      src={current}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      onError={() => {
        if (current !== FALLBACK) setCurrent(FALLBACK)
      }}
      className={className}
      draggable={false}
    />
  )
}
