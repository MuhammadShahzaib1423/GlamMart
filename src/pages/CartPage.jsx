import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag, X } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'
import ProductImage from '../components/ProductImage'

export default function CartPage() {
  const { items, updateQty, removeItem, subtotal, discount, total, promo, applyPromo, removePromo } = useCart()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  const submitPromo = (e) => {
    e.preventDefault()
    if (!code.trim()) return
    if (applyPromo(code)) {
      setError('')
      setCode('')
    } else {
      setError('That code is not valid.')
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-24 text-center sm:px-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sage-100 text-brand-700">
          <ShoppingBag size={32} />
        </div>
        <h1 className="font-display text-3xl font-semibold">Your bag is empty</h1>
        <p className="max-w-sm text-charcoal/55">Beautiful things await. Start with our bestsellers or browse the full collection.</p>
        <Link to="/shop" className="btn-primary mt-2">
          Continue shopping <ArrowRight size={16} />
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Shopping bag</h1>
      <p className="mt-2 text-charcoal/55">{items.reduce((n, i) => n + i.qty, 0)} items</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={`${item.id}|${item.color}|${item.size}`} className="flex gap-4 rounded-2xl bg-white p-4 shadow-soft sm:gap-5 sm:p-5">
              <Link to={`/product/${item.id}`} className="h-32 w-28 shrink-0 overflow-hidden rounded-xl bg-sage-100 sm:h-40 sm:w-32">
                <ProductImage src={item.image} alt={item.name} className="h-full w-full object-cover" />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link to={`/product/${item.id}`} className="font-display text-lg font-semibold hover:text-brand-700">
                      {item.name}
                    </Link>
                    <p className="mt-1 text-sm text-charcoal/50">
                      {[item.size, 'One size'].filter((v, i, a) => (item.size ? i === 0 : i === 1) && a.indexOf(v) === i).join(' · ')}
                    </p>
                    {item.color && (
                      <span className="mt-2 inline-flex items-center gap-1.5 text-xs text-charcoal/55">
                        <span className="h-4 w-4 rounded-full border border-charcoal/15" style={{ backgroundColor: item.color }} />
                        Colour
                      </span>
                    )}
                  </div>
                  <button onClick={() => removeItem(item)} aria-label="Remove item" className="text-charcoal/40 transition hover:text-red-700">
                    <Trash2 size={17} />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center rounded-full border border-charcoal/12">
                    <button onClick={() => updateQty(item, item.qty - 1)} aria-label="Decrease quantity" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-sage-100">
                      <Minus size={15} />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{item.qty}</span>
                    <button onClick={() => updateQty(item, item.qty + 1)} aria-label="Increase quantity" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-sage-100">
                      <Plus size={15} />
                    </button>
                  </div>
                  <p className="font-bold">{formatPrice(item.price * item.qty)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-2xl bg-white p-6 shadow-soft lg:sticky lg:top-28">
          <h2 className="font-display text-xl font-semibold">Order summary</h2>
          {promo ? (
            <div className="mt-4 flex items-center justify-between rounded-xl bg-brand-50 px-3.5 py-2.5 text-sm">
              <span className="flex items-center gap-2 font-medium text-brand-800">
                <Tag size={14} /> GLAM10 — 10% off
              </span>
              <button onClick={removePromo} aria-label="Remove promo code" className="text-brand-800/60 hover:text-brand-800">
                <X size={15} />
              </button>
            </div>
          ) : (
            <form onSubmit={submitPromo} className="mt-4">
              <div className="flex gap-2">
                <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Promo code" className="input-field !py-2.5" />
                <button type="submit" className="btn-secondary shrink-0 !px-5 !py-2.5">Apply</button>
              </div>
              {error && <p className="mt-1.5 text-xs text-red-700">{error}</p>}
              <p className="mt-1.5 text-xs text-charcoal/45">Try GLAM10 for 10% off.</p>
            </form>
          )}
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-charcoal/60">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between font-medium text-brand-700">
                <span>Discount (10%)</span>
                <span>−{formatPrice(discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-charcoal/60">
              <span>Delivery</span>
              <span>{total >= 75 ? 'Free' : formatPrice(4.95)}</span>
            </div>
            <div className="flex justify-between border-t border-charcoal/10 pt-3 text-lg font-bold">
              <span>Total</span>
              <span>{formatPrice(total + (total >= 75 ? 0 : 4.95))}</span>
            </div>
          </div>
          <Link to="/checkout" className="btn-primary mt-5 w-full">
            Proceed to checkout <ArrowRight size={16} />
          </Link>
          <Link to="/shop" className="mt-3 block text-center text-sm font-medium text-charcoal/60 hover:text-charcoal">
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  )
}
