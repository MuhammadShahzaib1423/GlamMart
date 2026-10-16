import { Star, StarHalf } from 'lucide-react'

export default function RatingStars({ rating, size = 14, className = '' }) {
  const full = Math.floor(rating)
  const half = rating - full >= 0.4
  return (
    <span className={`inline-flex items-center gap-0.5 text-amberish ${className}`} aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => {
        if (i < full) return <Star key={i} size={size} fill="currentColor" strokeWidth={0} />
        if (i === full && half)
          return (
            <span key={i} className="relative inline-flex" style={{ width: size, height: size }}>
              <Star size={size} className="absolute inset-0 text-charcoal/20" fill="currentColor" strokeWidth={0} />
              <StarHalf size={size} className="absolute inset-0" fill="currentColor" strokeWidth={0} />
            </span>
          )
        return <Star key={i} size={size} className="text-charcoal/20" fill="currentColor" strokeWidth={0} />
      })}
    </span>
  )
}
