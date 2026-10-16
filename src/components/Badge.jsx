const STYLES = {
  New: 'bg-brand-700 text-white',
  Bestseller: 'bg-charcoal text-white',
  Sale: 'bg-amberish text-white',
}

export default function Badge({ label, className = '' }) {
  if (!label) return null
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${STYLES[label] || 'bg-charcoal text-white'} ${className}`}
    >
      {label}
    </span>
  )
}
