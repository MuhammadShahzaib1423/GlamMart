import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag, Minus, Plus, Truck, RefreshCcw, ShieldCheck, ChevronRight } from 'lucide-react'
import { getProduct, relatedProducts, productReviews, formatPrice } from '../data/products'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'
import ProductImage from '../components/ProductImage'
import ProductCard from '../components/ProductCard'
import RatingStars from '../components/RatingStars'
import Badge from '../components/Badge'
import NotFound from './NotFound'

const TABS = ['Description', 'Shipping & Returns', 'Reviews']

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProduct(id)
  const { addItem, setIsOpen } = useCart()
  const { toggle, has } = useWishlist()
  const { push } = useToast()

  const [color, setColor] = useState(product?.colors?.[0])
  const [size, setSize] = useState(product?.sizes?.[0])
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState(TABS[0])
  const [zoom, setZoom] = useState(false)

  const related = useMemo(() => (product ? relatedProducts(product) : []), [product])
  const reviews = useMemo(() => (product ? productReviews(product) : []), [product])
  const wished = product ? has(product.id) : false

  if (!product) return <NotFound />

  const handleAdd = (buyNow = false) => {
    addItem(product, { color, size, qty })
    push(`${product.name} added to bag`)
    if (buyNow) {
      navigate('/checkout')
    } else {
      setIsOpen(true)
    }
  }

  const handleWish = () => {
    toggle(product.id)
    push(wished ? 'Removed from wishlist' : 'Saved to wishlist', wished ? 'info' : 'success')
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <nav className="flex items-center gap-1.5 text-sm text-charcoal/50">
        <Link to="/" className="hover:text-charcoal">Home</Link>
        <ChevronRight size={14} />
        <Link to="/shop" className="hover:text-charcoal">Shop</Link>
        <ChevronRight size={14} />
        <Link to={`/shop?cat=${product.category}`} className="hover:text-charcoal">{product.category}</Link>
        <ChevronRight size={14} />
        <span className="truncate font-medium text-charcoal">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55 }}>
          <div
            className="relative cursor-zoom-in overflow-hidden rounded-3xl bg-sage-100 shadow-soft"
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => setZoom(false)}
          >
            <ProductImage
              src={product.image}
              alt={product.name}
              eager
              className={`aspect-[4/5] w-full object-cover transition-transform duration-700 ${zoom ? 'scale-125' : 'scale-100'}`}
            />
            <div className="absolute left-4 top-4">
              <Badge label={product.badge} />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`overflow-hidden rounded-xl bg-sage-100 ${i === 0 ? 'ring-2 ring-brand-700' : 'opacity-70'}`}
              >
                <ProductImage src={product.image} alt={`${product.name} view ${i + 1}`} className="aspect-square w-full object-cover" />
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55 }}>
          <p className="text-xs font-semibold uppercase tracking-widest text-charcoal/45">
            {product.category} · {product.subcategory}
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">{product.name}</h1>
          <div className="mt-3 flex items-center gap-2">
            <RatingStars rating={product.rating} size={16} />
            <span className="text-sm text-charcoal/55">
              {product.rating} · {product.reviews} reviews
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <>
                <span className="text-lg text-charcoal/40 line-through">{formatPrice(product.oldPrice)}</span>
                <span className="rounded-full bg-amberish/10 px-2.5 py-1 text-xs font-bold text-amberish">
                  Save {formatPrice(product.oldPrice - product.price)}
                </span>
              </>
            )}
          </div>
          <p className="mt-4 leading-relaxed text-charcoal/65">{product.description}</p>

          {product.colors?.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-semibold">
                Colour <span className="ml-1 font-normal text-charcoal/50">{product.colors.length} options</span>
              </p>
              <div className="mt-2.5 flex gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    aria-label={`Colour ${c}`}
                    style={{ backgroundColor: c }}
                    className={`h-10 w-10 rounded-full border border-charcoal/15 transition ${
                      color === c ? 'ring-2 ring-brand-700 ring-offset-2 ring-offset-ivory' : 'hover:scale-110'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {product.sizes?.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Size</p>
                <button className="text-xs font-medium text-brand-700 hover:underline">Size guide</button>
              </div>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`min-w-11 rounded-xl border px-3.5 py-2.5 text-sm font-semibold transition ${
                      size === s
                        ? 'border-charcoal bg-charcoal text-white'
                        : 'border-charcoal/15 bg-white text-charcoal hover:border-charcoal/40'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-full border border-charcoal/15 bg-white">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="flex h-12 w-11 items-center justify-center rounded-full hover:bg-sage-100">
                <Minus size={16} />
              </button>
              <span className="w-8 text-center font-semibold">{qty}</span>
              <button onClick={() => setQty((q) => Math.min(9, q + 1))} aria-label="Increase quantity" className="flex h-12 w-11 items-center justify-center rounded-full hover:bg-sage-100">
                <Plus size={16} />
              </button>
            </div>
            <button onClick={() => handleAdd(false)} className="btn-primary flex-1">
              <ShoppingBag size={17} /> Add to Bag
            </button>
            <button
              onClick={handleWish}
              aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
              className={`flex h-12 w-12 items-center justify-center rounded-full border transition ${
                wished ? 'border-brand-700 bg-brand-700 text-white' : 'border-charcoal/15 bg-white text-charcoal hover:border-charcoal/40'
              }`}
            >
              <Heart size={18} fill={wished ? 'currentColor' : 'none'} />
            </button>
          </div>
          <button onClick={() => handleAdd(true)} className="btn-secondary mt-3 w-full">
            Buy it now
          </button>

          <div className="mt-7 grid grid-cols-3 gap-3">
            {[
              { icon: Truck, label: 'Free ship over $75' },
              { icon: RefreshCcw, label: '30-day returns' },
              { icon: ShieldCheck, label: '2-year warranty' },
            ].map((f) => (
              <div key={f.label} className="flex flex-col items-center gap-1.5 rounded-2xl bg-sage-50 px-2 py-4 text-center">
                <f.icon size={18} className="text-brand-700" />
                <span className="text-[11px] font-medium text-charcoal/65">{f.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="mt-14">
        <div className="flex gap-1 border-b border-charcoal/10">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative px-5 py-3 text-sm font-semibold transition ${
                tab === t ? 'text-charcoal' : 'text-charcoal/45 hover:text-charcoal'
              }`}
            >
              {t}
              {tab === t && <motion.span layoutId="tab-underline" className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand-700" />}
            </button>
          ))}
        </div>
        <div className="py-8">
          {tab === 'Description' && (
            <div className="max-w-3xl">
              <p className="leading-relaxed text-charcoal/70">{product.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-charcoal/70">
                <li>· Designed in our London studio</li>
                <li>· Ethically made in small batches</li>
                <li>· Arrives in plastic-free, gift-ready packaging</li>
              </ul>
            </div>
          )}
          {tab === 'Shipping & Returns' && (
            <div className="max-w-3xl space-y-4 text-[15px] leading-relaxed text-charcoal/70">
              <p><strong className="text-charcoal">Delivery.</strong> Orders are dispatched within 1–2 working days. Standard delivery (3–5 days) is £3.95, or complimentary on orders over $75. Express next-day delivery is available at checkout.</p>
              <p><strong className="text-charcoal">Returns.</strong> You have 30 days from delivery to return unworn, unused items in their original condition for a full refund. Return shipping is free for UK orders.</p>
            </div>
          )}
          {tab === 'Reviews' && (
            <div className="max-w-3xl space-y-5">
              <div className="flex items-center gap-4">
                <p className="font-display text-5xl font-semibold">{product.rating}</p>
                <div>
                  <RatingStars rating={product.rating} size={16} />
                  <p className="mt-1 text-sm text-charcoal/55">Based on {product.reviews} verified reviews</p>
                </div>
              </div>
              {reviews.map((r, i) => (
                <div key={i} className="rounded-2xl bg-white p-6 shadow-soft">
                  <div className="flex items-center justify-between">
                    <RatingStars rating={r.rating} />
                    <span className="text-xs text-charcoal/45">{r.date}</span>
                  </div>
                  <p className="mt-2.5 font-semibold">{r.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-charcoal/65">{r.text}</p>
                  <p className="mt-3 text-xs font-medium text-charcoal/50">{r.name} · Verified buyer</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-6 pb-8">
          <h2 className="section-title">You may also like</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
