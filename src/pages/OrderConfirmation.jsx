import { Link, useParams, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight, Package, Truck, Home, CreditCard } from 'lucide-react'
import { formatPrice } from '../data/products'

const TIMELINE = [
  { icon: CreditCard, title: 'Payment confirmed', text: 'Your payment was approved.' },
  { icon: Package, title: 'Preparing your order', text: 'Our studio is carefully packing your pieces.' },
  { icon: Truck, title: 'On its way', text: 'You will receive tracking by email shortly.' },
  { icon: Home, title: 'Delivered', text: 'Estimated within 3–5 working days.' },
]

export default function OrderConfirmation() {
  const { orderId } = useParams()
  const { state } = useLocation()
  const order = state?.order

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="text-center"
      >
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-50 text-brand-700">
          <CheckCircle2 size={40} />
        </div>
        <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight">Thank you — order confirmed</h1>
        <p className="mx-auto mt-3 max-w-md text-[15px] text-charcoal/60">
          Your order is being prepared with care. A confirmation email is on its way
          {order?.email ? <> to <span className="font-semibold text-charcoal">{order.email}</span></> : null}.
        </p>
        <div className="mx-auto mt-6 inline-flex items-center gap-3 rounded-2xl bg-white px-6 py-4 shadow-soft">
          <span className="text-sm text-charcoal/55">Order number</span>
          <span className="font-display text-xl font-bold tracking-wide text-charcoal">{orderId}</span>
        </div>
      </motion.div>

      <div className="mt-12 rounded-2xl bg-white p-6 shadow-soft sm:p-8">
        <h2 className="font-display text-xl font-semibold">What happens next</h2>
        <div className="mt-6 space-y-0">
          {TIMELINE.map((t, i) => (
            <div key={t.title} className="relative flex gap-4 pb-7 last:pb-0">
              {i < TIMELINE.length - 1 && <span className="absolute left-[22px] top-12 h-[calc(100%-3rem)] w-px bg-charcoal/10" />}
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${i === 0 ? 'bg-brand-700 text-white' : 'bg-sage-100 text-brand-700'}`}>
                <t.icon size={18} />
              </div>
              <div className="pt-1">
                <p className="font-semibold">{t.title}</p>
                <p className="mt-0.5 text-sm text-charcoal/55">{t.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {order && (
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-soft sm:p-8">
          <h2 className="font-display text-xl font-semibold">Order summary</h2>
          <div className="mt-4 space-y-3">
            {order.items.map((item) => (
              <div key={`${item.id}|${item.color}|${item.size}`} className="flex justify-between text-sm">
                <span className="text-charcoal/70">
                  {item.name} <span className="text-charcoal/45">× {item.qty}</span>
                </span>
                <span className="font-semibold">{formatPrice(item.price * item.qty)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-1.5 border-t border-charcoal/10 pt-4 text-sm">
            <div className="flex justify-between text-charcoal/60"><span>Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
            {order.discount > 0 && (
              <div className="flex justify-between text-brand-700"><span>Discount</span><span>−{formatPrice(order.discount)}</span></div>
            )}
            <div className="flex justify-between text-charcoal/60"><span>Delivery</span><span>{order.shipping === 0 ? 'Free' : formatPrice(order.shipping)}</span></div>
            <div className="flex justify-between pt-1 text-base font-bold"><span>Total paid</span><span>{formatPrice(order.total)}</span></div>
          </div>
          <p className="mt-4 text-sm text-charcoal/55">Delivering to: {order.address}</p>
        </div>
      )}

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/shop" className="btn-primary">
          Continue shopping <ArrowRight size={16} />
        </Link>
        <Link to="/orders" className="btn-secondary">
          View my orders
        </Link>
      </div>
    </div>
  )
}
