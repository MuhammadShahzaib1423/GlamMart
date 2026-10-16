import { Link } from 'react-router-dom'
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react'
import { getProduct, formatPrice } from '../data/products'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import ProductImage from '../components/ProductImage'
import RatingStars from '../components/RatingStars'

export default function WishlistPage() {
  const { ids, remove } = useWishlist()
  const { addItem, setIsOpen } = useCart()
  const { push } = useToast()
  const products = ids.map(getProduct).filter(Boolean)

  const moveToCart = (p) => {
    addItem(p, { qty: 1 })
    remove(p.id)
    push(`${p.name} moved to bag`)
    setIsOpen(true)
  }

  if (products.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-24 text-center sm:px-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sage-100 text-brand-700">
          <Heart size={32} />
        </div>
        <h1 className="font-display text-3xl font-semibold">Your wishlist is empty</h1>
        <p className="max-w-sm text-charcoal/55">Tap the heart on any piece to save it here for later.</p>
        <Link to="/shop" className="btn-primary mt-2">
          Discover pieces <ArrowRight size={16} />
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Wishlist</h1>
      <p className="mt-2 text-charcoal/55">{products.length} saved {products.length === 1 ? 'piece' : 'pieces'}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {products.map((p) => (
          <div key={p.id} className="flex gap-4 rounded-2xl bg-white p-4 shadow-soft">
            <Link to={`/product/${p.id}`} className="h-36 w-28 shrink-0 overflow-hidden rounded-xl bg-sage-100">
              <ProductImage src={p.image} alt={p.name} className="h-full w-full object-cover" />
            </Link>
            <div className="flex flex-1 flex-col">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <Link to={`/product/${p.id}`} className="font-display text-[16px] font-semibold leading-snug hover:text-brand-700">
                    {p.name}
                  </Link>
                  <div className="mt-1 flex items-center gap-1.5">
                    <RatingStars rating={p.rating} size={12} />
                    <span className="text-xs text-charcoal/50">({p.reviews})</span>
                  </div>
                </div>
                <button onClick={() => { remove(p.id); push('Removed from wishlist', 'info') }} aria-label="Remove from wishlist" className="text-charcoal/40 transition hover:text-red-700">
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="mt-1 font-bold">{formatPrice(p.price)}</p>
              <button onClick={() => moveToCart(p)} className="btn-primary mt-auto !px-4 !py-2.5 !text-[13px]">
                <ShoppingBag size={14} /> Move to bag
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
