import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'
import ProductImage from './ProductImage'

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQty, removeItem, subtotal, discount, total, promo, applyPromo } = useCart()
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-ivory shadow-lift"
          >
            <div className="flex items-center justify-between border-b border-charcoal/8 px-5 py-4">
              <h2 className="font-display text-xl font-semibold">
                Your Bag {items.length > 0 && <span className="text-charcoal/50">({items.reduce((n, i) => n + i.qty, 0)})</span>}
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close bag"
                className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-sage-100"
              >
                <X size={20} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-100 text-brand-700">
                  <ShoppingBag size={26} />
                </div>
                <div>
                  <p className="font-display text-xl font-semibold">Your bag is empty</p>
                  <p className="mt-1 text-sm text-charcoal/55">Beautiful things await. Start with our bestsellers.</p>
                </div>
                <Link to="/shop" onClick={() => setIsOpen(false)} className="btn-primary">
                  Continue shopping <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
                  {items.map((item) => (
                    <motion.div
                      key={`${item.id}|${item.color}|${item.size}`}
                      layout
                      className="flex gap-4 rounded-2xl bg-white p-3 shadow-soft"
                    >
                      <div className="h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-sage-100">
                        <ProductImage src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-semibold text-charcoal">{item.name}</p>
                            <p className="mt-0.5 text-xs text-charcoal/50">
                              {[item.size, item.color && ''].filter(Boolean).join(' · ') || 'One size'}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item)}
                            aria-label="Remove item"
                            className="text-charcoal/40 transition hover:text-red-700"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center rounded-full border border-charcoal/12">
                            <button
                              onClick={() => updateQty(item, item.qty - 1)}
                              aria-label="Decrease quantity"
                              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-sage-100"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-7 text-center text-sm font-semibold">{item.qty}</span>
                            <button
                              onClick={() => updateQty(item, item.qty + 1)}
                              aria-label="Increase quantity"
                              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-sage-100"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <p className="text-sm font-bold text-charcoal">{formatPrice(item.price * item.qty)}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="border-t border-charcoal/8 bg-white px-5 py-4">
                  {promo ? (
                    <div className="mb-3 flex items-center justify-between rounded-xl bg-brand-50 px-3.5 py-2.5 text-sm">
                      <span className="flex items-center gap-2 font-medium text-brand-800">
                        <Tag size={14} /> GLAM10 applied — 10% off
                      </span>
                    </div>
                  ) : (
                    <form onSubmit={submitPromo} className="mb-3">
                      <div className="flex gap-2">
                        <input
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          placeholder="Promo code (try GLAM10)"
                          className="input-field !py-2.5"
                        />
                        <button type="submit" className="btn-secondary shrink-0 !px-5 !py-2.5">
                          Apply
                        </button>
                      </div>
                      {error && <p className="mt-1.5 text-xs text-red-700">{error}</p>}
                    </form>
                  )}
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-charcoal/60">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between font-medium text-brand-700">
                        <span>Discount</span>
                        <span>−{formatPrice(discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-t border-charcoal/8 pt-2 text-base font-bold">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                  <Link
                    to="/checkout"
                    onClick={() => setIsOpen(false)}
                    className="btn-primary mt-4 w-full"
                  >
                    Checkout <ArrowRight size={16} />
                  </Link>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="mt-2 w-full py-2 text-center text-sm font-medium text-charcoal/60 hover:text-charcoal"
                  >
                    Continue shopping
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
