import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag } from 'lucide-react'
import { formatPrice } from '../data/products'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'
import ProductImage from './ProductImage'
import RatingStars from './RatingStars'
import Badge from './Badge'

export default function ProductCard({ product, index = 0 }) {
  const { addItem, setIsOpen } = useCart()
  const { toggle, has } = useWishlist()
  const { push } = useToast()
  const wished = has(product.id)

  const handleAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, { qty: 1 })
    push(`${product.name} added to bag`)
    setIsOpen(true)
  }

  const handleWish = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggle(product.id)
    push(wished ? 'Removed from wishlist' : 'Saved to wishlist', wished ? 'info' : 'success')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/product/${product.id}`}
        className="group block overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-sage-100">
          <ProductImage
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute left-3 top-3">
            <Badge label={product.badge} />
          </div>
          <button
            onClick={handleWish}
            aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
            className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full shadow-soft transition-all ${
              wished ? 'bg-brand-700 text-white' : 'bg-white/90 text-charcoal hover:bg-white'
            }`}
          >
            <Heart size={16} fill={wished ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={handleAdd}
            className="absolute inset-x-3 bottom-3 flex translate-y-14 items-center justify-center gap-2 rounded-xl bg-charcoal/90 py-2.5 text-sm font-semibold text-white opacity-0 backdrop-blur transition-all duration-300 hover:bg-brand-700 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <ShoppingBag size={15} /> Add to Bag
          </button>
        </div>
        <div className="p-4">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-charcoal/45">{product.category}</p>
          <h3 className="mt-1 font-display text-[17px] font-semibold leading-snug text-charcoal">{product.name}</h3>
          <div className="mt-1.5 flex items-center gap-1.5">
            <RatingStars rating={product.rating} />
            <span className="text-xs text-charcoal/50">
              {product.rating} ({product.reviews})
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-[16px] font-bold text-charcoal">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-sm text-charcoal/40 line-through">{formatPrice(product.oldPrice)}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
