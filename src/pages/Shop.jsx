import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, X, SearchX, ChevronDown } from 'lucide-react'
import { PRODUCTS, CATEGORIES } from '../data/products'
import ProductCard from '../components/ProductCard'
import RatingStars from '../components/RatingStars'

const PRICE_RANGES = [
  { id: 'all', label: 'All prices', min: 0, max: Infinity },
  { id: 'u50', label: 'Under $50', min: 0, max: 50 },
  { id: '50-100', label: '$50 – $100', min: 50, max: 100 },
  { id: '100-150', label: '$100 – $150', min: 100, max: 150 },
  { id: '150p', label: 'Over $150', min: 150, max: Infinity },
]

const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
  { id: 'rating', label: 'Top rated' },
  { id: 'reviews', label: 'Most reviewed' },
]

export default function Shop() {
  const [params] = useSearchParams()
  const [cats, setCats] = useState([])
  const [priceId, setPriceId] = useState('all')
  const [minRating, setMinRating] = useState(0)
  const [sort, setSort] = useState('featured')
  const [query, setQuery] = useState('')
  const [mobileFilters, setMobileFilters] = useState(false)

  useEffect(() => {
    const q = params.get('q')
    const cat = params.get('cat')
    if (q !== null) setQuery(q)
    if (cat && CATEGORIES.includes(cat)) setCats([cat])
  }, [params])

  const toggleCat = (c) => setCats((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]))

  const results = useMemo(() => {
    const range = PRICE_RANGES.find((r) => r.id === priceId)
    const q = query.trim().toLowerCase()
    let list = PRODUCTS.filter((p) => {
      if (cats.length && !cats.includes(p.category)) return false
      if (p.price < range.min || p.price >= range.max) return false
      if (p.rating < minRating) return false
      if (q && !`${p.name} ${p.category} ${p.subcategory} ${p.description}`.toLowerCase().includes(q)) return false
      return true
    })
    switch (sort) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price)
        break
      case 'rating':
        list = [...list].sort((a, b) => b.rating - a.rating)
        break
      case 'reviews':
        list = [...list].sort((a, b) => b.reviews - a.reviews)
        break
      default:
        break
    }
    return list
  }, [cats, priceId, minRating, sort, query])

  const activeFilterCount =
    cats.length + (priceId !== 'all' ? 1 : 0) + (minRating > 0 ? 1 : 0)

  const clearAll = () => {
    setCats([])
    setPriceId('all')
    setMinRating(0)
    setQuery('')
  }

  const filters = (
    <div className="space-y-7">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-widest text-charcoal/50">Category</h3>
        <div className="mt-3 space-y-2">
          {CATEGORIES.map((c) => (
            <label key={c} className="flex cursor-pointer items-center gap-3 text-sm text-charcoal/80 hover:text-charcoal">
              <input
                type="checkbox"
                checked={cats.includes(c)}
                onChange={() => toggleCat(c)}
                className="h-4.5 w-4.5 h-[18px] w-[18px] rounded accent-[#047857]"
              />
              {c}
              <span className="ml-auto text-xs text-charcoal/40">
                {PRODUCTS.filter((p) => p.category === c).length}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-widest text-charcoal/50">Price</h3>
        <div className="mt-3 space-y-2">
          {PRICE_RANGES.map((r) => (
            <label key={r.id} className="flex cursor-pointer items-center gap-3 text-sm text-charcoal/80 hover:text-charcoal">
              <input
                type="radio"
                name="price"
                checked={priceId === r.id}
                onChange={() => setPriceId(r.id)}
                className="h-[18px] w-[18px] accent-[#047857]"
              />
              {r.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-widest text-charcoal/50">Rating</h3>
        <div className="mt-3 space-y-2">
          {[0, 4.5, 4.7].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition ${
                minRating === r ? 'bg-sage-100 font-semibold text-brand-800' : 'text-charcoal/70 hover:bg-sage-50'
              }`}
            >
              {r === 0 ? 'Any rating' : <><RatingStars rating={r} size={13} /> & up</>}
            </button>
          ))}
        </div>
      </div>

      {activeFilterCount > 0 && (
        <button onClick={clearAll} className="text-sm font-semibold text-brand-700 hover:underline">
          Clear all filters ({activeFilterCount})
        </button>
      )}
    </div>
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-semibold tracking-tight">Shop</h1>
          <p className="mt-2 text-[15px] text-charcoal/55">
            {results.length} {results.length === 1 ? 'piece' : 'pieces'}
            {query.trim() && (
              <>
                {' '}for <span className="font-semibold text-charcoal">"{query.trim()}"</span>
              </>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileFilters(true)}
            className="btn-secondary !px-5 !py-2.5 lg:hidden"
          >
            <SlidersHorizontal size={16} /> Filters
            {activeFilterCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-700 text-[10px] font-bold text-white">
                {activeFilterCount}
              </span>
            )}
          </button>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort products"
              className="appearance-none rounded-full border border-charcoal/15 bg-white py-2.5 pl-5 pr-10 text-sm font-medium outline-none transition focus:border-brand-700"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal/50" />
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-2xl bg-white p-6 shadow-soft">{filters}</div>
        </aside>

        <div>
          <div className="mb-5">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the collection…"
              className="input-field max-w-md"
            />
          </div>
          {results.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-charcoal/20 bg-white/60 px-6 py-20 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sage-100 text-charcoal/40">
                <SearchX size={26} />
              </div>
              <p className="font-display text-xl font-semibold">Nothing found</p>
              <p className="max-w-sm text-sm text-charcoal/55">
                No pieces match your current filters. Try broadening the price range or clearing your search.
              </p>
              <button onClick={clearAll} className="btn-primary mt-2">
                Clear all filters
              </button>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-2 gap-4 sm:gap-6 xl:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {results.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {mobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilters(false)}
              className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] overflow-y-auto bg-ivory p-6 lg:hidden"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold">Filters</h2>
                <button onClick={() => setMobileFilters(false)} aria-label="Close filters" className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-sage-100">
                  <X size={20} />
                </button>
              </div>
              {filters}
              <button onClick={() => setMobileFilters(false)} className="btn-primary mt-8 w-full">
                Show {results.length} {results.length === 1 ? 'result' : 'results'}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
