import { Link } from 'react-router-dom'
import { Ghost, ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-28 text-center sm:px-6">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sage-100 text-brand-700">
        <Ghost size={34} />
      </div>
      <p className="font-display text-7xl font-semibold text-charcoal/15">404</p>
      <h1 className="font-display text-3xl font-semibold">This page wandered off</h1>
      <p className="max-w-sm text-charcoal/55">The page you are looking for doesn't exist or has moved. Let's get you back to something beautiful.</p>
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-primary">
          Back home
        </Link>
        <Link to="/shop" className="btn-secondary">
          Browse the shop <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )
}
