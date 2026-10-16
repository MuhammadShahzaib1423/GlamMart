import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Lock, CreditCard } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { formatPrice } from '../data/products'
import ProductImage from '../components/ProductImage'

const STEPS = ['Information', 'Shipping', 'Payment']

const SHIPPING_METHODS = [
  { id: 'standard', name: 'Standard', detail: '3–5 working days', price: 4.95 },
  { id: 'express', name: 'Express', detail: 'Next working day', price: 9.95 },
]

const saveOrder = (order) => {
  try {
    const orders = JSON.parse(localStorage.getItem('glammart:orders:v1')) || []
    orders.unshift(order)
    localStorage.setItem('glammart:orders:v1', JSON.stringify(orders))
  } catch {
    /* ignore */
  }
}

const formatCard = (v) =>
  v
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim()

const formatExpiry = (v) => {
  const d = v.replace(/\D/g, '').slice(0, 4)
  if (d.length <= 2) return d
  return `${d.slice(0, 2)}/${d.slice(2)}`
}

const inputCls = 'input-field'
const labelCls = 'mb-1.5 block text-[13px] font-semibold text-charcoal/70'

export default function Checkout() {
  const { items, subtotal, discount, total, promo, clear } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState({})
  const [placing, setPlacing] = useState(false)

  const [info, setInfo] = useState({
    email: user?.email || '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postcode: '',
    country: 'United Kingdom',
    phone: '',
  })
  const [shipping, setShipping] = useState('standard')
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvc: '' })

  const shipCost = useMemo(() => {
    if (total >= 75) return 0
    return SHIPPING_METHODS.find((m) => m.id === shipping)?.price || 0
  }, [shipping, total])
  const grandTotal = total + shipCost

  const set = (obj, key, value, setter) => {
    setter({ ...obj, [key]: value })
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const validateInfo = () => {
    const e = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email)) e.email = 'Enter a valid email address'
    if (!info.firstName.trim()) e.firstName = 'Required'
    if (!info.lastName.trim()) e.lastName = 'Required'
    if (!info.address.trim()) e.address = 'Required'
    if (!info.city.trim()) e.city = 'Required'
    if (!info.postcode.trim()) e.postcode = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validateCard = () => {
    const e = {}
    if (card.number.replace(/\s/g, '').length !== 16) e.number = 'Enter the 16-digit card number'
    if (!card.name.trim()) e.name = 'Required'
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.expiry)) e.expiry = 'Use MM/YY'
    if (!/^\d{3,4}$/.test(card.cvc)) e.cvc = '3–4 digits'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => {
    if (step === 0 && !validateInfo()) return
    setStep((s) => Math.min(2, s + 1))
    window.scrollTo(0, 0)
  }
  const back = () => {
    setStep((s) => Math.max(0, s - 1))
    window.scrollTo(0, 0)
  }

  const placeOrder = () => {
    if (!validateCard()) return
    setPlacing(true)
    setTimeout(() => {
      const orderId = `GM-${Math.floor(100000 + Math.random() * 900000)}`
      const order = {
        id: orderId,
        date: new Date().toISOString(),
        items,
        subtotal,
        discount,
        shipping: shipCost,
        total: grandTotal,
        email: info.email,
        name: `${info.firstName} ${info.lastName}`,
        address: `${info.address}, ${info.city}, ${info.postcode}`,
        method: SHIPPING_METHODS.find((m) => m.id === shipping)?.name,
      }
      saveOrder(order)
      clear()
      navigate(`/order-confirmation/${orderId}`, { state: { order } })
    }, 1400)
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-3xl font-semibold">Your bag is empty</h1>
        <p className="text-charcoal/55">Add some pieces before heading to checkout.</p>
        <Link to="/shop" className="btn-primary mt-2">
          Continue shopping <ArrowRight size={16} />
        </Link>
      </div>
    )
  }

  const field = (key, label, obj, setter, props = {}) => (
    <div className={props.wrap || ''}>
      <label className={labelCls}>{label}</label>
      <input
        value={obj[key]}
        onChange={(e) => set(obj, key, e.target.value, setter)}
        className={`${inputCls} ${errors[key] ? '!border-red-500' : ''}`}
        {...props.input}
      />
      {errors[key] && <p className="mt-1 text-xs text-red-700">{errors[key]}</p>}
    </div>
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Link to="/cart" className="inline-flex items-center gap-1.5 text-sm font-medium text-charcoal/60 hover:text-charcoal">
        <ArrowLeft size={15} /> Back to bag
      </Link>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">Checkout</h1>

      <div className="mt-6 flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition ${
                i < step ? 'bg-brand-700 text-white' : i === step ? 'bg-charcoal text-white' : 'bg-charcoal/10 text-charcoal/50'
              }`}
            >
              {i < step ? <Check size={15} /> : i + 1}
            </div>
            <span className={`text-sm font-medium ${i === step ? 'text-charcoal' : 'text-charcoal/45'}`}>{s}</span>
            {i < STEPS.length - 1 && <div className={`mx-2 h-px w-8 sm:w-16 ${i < step ? 'bg-brand-700' : 'bg-charcoal/15'}`} />}
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div>
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="s0" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }} className="rounded-2xl bg-white p-6 shadow-soft sm:p-8">
                <h2 className="font-display text-xl font-semibold">Contact & address</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {field('email', 'Email address', info, setInfo, { wrap: 'sm:col-span-2', input: { type: 'email', placeholder: 'you@example.com' } })}
                  {field('firstName', 'First name', info, setInfo, { input: { placeholder: 'Amelia' } })}
                  {field('lastName', 'Last name', info, setInfo, { input: { placeholder: 'Hart' } })}
                  {field('address', 'Street address', info, setInfo, { wrap: 'sm:col-span-2', input: { placeholder: '12 Rosewater Lane' } })}
                  {field('city', 'City', info, setInfo, { input: { placeholder: 'London' } })}
                  {field('postcode', 'Postcode', info, setInfo, { input: { placeholder: 'W1U 6LS' } })}
                  {field('phone', 'Phone (optional)', info, setInfo, { wrap: 'sm:col-span-2', input: { type: 'tel', placeholder: '+44 …' } })}
                </div>
                <button onClick={next} className="btn-primary mt-6 w-full sm:w-auto">
                  Continue to shipping <ArrowRight size={16} />
                </button>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }} className="rounded-2xl bg-white p-6 shadow-soft sm:p-8">
                <h2 className="font-display text-xl font-semibold">Delivery method</h2>
                <div className="mt-5 space-y-3">
                  {SHIPPING_METHODS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setShipping(m.id)}
                      className={`flex w-full items-center justify-between rounded-2xl border p-5 text-left transition ${
                        shipping === m.id ? 'border-brand-700 bg-brand-50/50 ring-1 ring-brand-700' : 'border-charcoal/12 hover:border-charcoal/30'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${shipping === m.id ? 'border-brand-700' : 'border-charcoal/25'}`}>
                          {shipping === m.id && <span className="h-2.5 w-2.5 rounded-full bg-brand-700" />}
                        </span>
                        <div>
                          <p className="font-semibold">{m.name}</p>
                          <p className="text-sm text-charcoal/55">{m.detail}</p>
                        </div>
                      </div>
                      <p className="font-bold">{total >= 75 && m.id === 'standard' ? 'Free' : formatPrice(m.price)}</p>
                    </button>
                  ))}
                </div>
                {total >= 75 && <p className="mt-3 text-sm text-brand-700">Standard delivery is complimentary on your order.</p>}
                <div className="mt-6 flex gap-3">
                  <button onClick={back} className="btn-secondary"><ArrowLeft size={16} /> Back</button>
                  <button onClick={next} className="btn-primary flex-1 sm:flex-none">Continue to payment <ArrowRight size={16} /></button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }} className="rounded-2xl bg-white p-6 shadow-soft sm:p-8">
                <h2 className="flex items-center gap-2 font-display text-xl font-semibold">
                  <CreditCard size={20} /> Payment
                </h2>
                <p className="mt-1.5 flex items-center gap-1.5 text-sm text-charcoal/55">
                  <Lock size={13} /> Demo checkout — no real payment is processed.
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Card number</label>
                    <input
                      value={card.number}
                      onChange={(e) => setCard({ ...card, number: formatCard(e.target.value) })}
                      placeholder="4242 4242 4242 4242"
                      inputMode="numeric"
                      className={`${inputCls} tracking-widest ${errors.number ? '!border-red-500' : ''}`}
                    />
                    {errors.number && <p className="mt-1 text-xs text-red-700">{errors.number}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Name on card</label>
                    <input
                      value={card.name}
                      onChange={(e) => setCard({ ...card, name: e.target.value })}
                      placeholder="Amelia Hart"
                      className={`${inputCls} ${errors.name ? '!border-red-500' : ''}`}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-700">{errors.name}</p>}
                  </div>
                  <div>
                    <label className={labelCls}>Expiry</label>
                    <input
                      value={card.expiry}
                      onChange={(e) => setCard({ ...card, expiry: formatExpiry(e.target.value) })}
                      placeholder="MM/YY"
                      inputMode="numeric"
                      className={`${inputCls} ${errors.expiry ? '!border-red-500' : ''}`}
                    />
                    {errors.expiry && <p className="mt-1 text-xs text-red-700">{errors.expiry}</p>}
                  </div>
                  <div>
                    <label className={labelCls}>CVC</label>
                    <input
                      value={card.cvc}
                      onChange={(e) => setCard({ ...card, cvc: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                      placeholder="123"
                      inputMode="numeric"
                      className={`${inputCls} ${errors.cvc ? '!border-red-500' : ''}`}
                    />
                    {errors.cvc && <p className="mt-1 text-xs text-red-700">{errors.cvc}</p>}
                  </div>
                </div>
                <div className="mt-6 flex gap-3">
                  <button onClick={back} className="btn-secondary" disabled={placing}><ArrowLeft size={16} /> Back</button>
                  <button onClick={placeOrder} disabled={placing} className="btn-primary flex-1 sm:flex-none">
                    {placing ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        Placing order…
                      </>
                    ) : (
                      <>
                        <Lock size={15} /> Pay {formatPrice(grandTotal)}
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <aside className="h-fit rounded-2xl bg-white p-6 shadow-soft lg:sticky lg:top-28">
          <h2 className="font-display text-xl font-semibold">Order summary</h2>
          <div className="mt-4 max-h-72 space-y-3 overflow-y-auto">
            {items.map((item) => (
              <div key={`${item.id}|${item.color}|${item.size}`} className="flex items-center gap-3">
                <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-xl bg-sage-100">
                  <ProductImage src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  <span className="absolute -right-0 -top-0 flex h-5 w-5 items-center justify-center rounded-full bg-charcoal text-[10px] font-bold text-white">
                    {item.qty}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-charcoal/50">{item.size || 'One size'}</p>
                </div>
                <p className="text-sm font-bold">{formatPrice(item.price * item.qty)}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2 border-t border-charcoal/10 pt-4 text-sm">
            <div className="flex justify-between text-charcoal/60"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            {discount > 0 && (
              <div className="flex justify-between font-medium text-brand-700">
                <span>Discount{promo ? ` (${promo.code})` : ''}</span>
                <span>−{formatPrice(discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-charcoal/60"><span>Delivery</span><span>{shipCost === 0 ? 'Free' : formatPrice(shipCost)}</span></div>
            <div className="flex justify-between pt-2 text-lg font-bold"><span>Total</span><span>{formatPrice(grandTotal)}</span></div>
          </div>
        </aside>
      </div>
    </div>
  )
}
