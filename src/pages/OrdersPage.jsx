import { Link } from 'react-router-dom'
import { Package, ArrowRight } from 'lucide-react'
import { formatPrice } from '../data/products'
import ProductImage from '../components/ProductImage'

const loadOrders = () => {
  try {
    return JSON.parse(localStorage.getItem('glammart:orders:v1')) || []
  } catch {
    return []
  }
}

export default function OrdersPage() {
  const orders = loadOrders()

  if (orders.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-24 text-center sm:px-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sage-100 text-brand-700">
          <Package size={32} />
        </div>
        <h1 className="font-display text-3xl font-semibold">No orders yet</h1>
        <p className="max-w-sm text-charcoal/55">When you place an order it will appear here with its details and status.</p>
        <Link to="/shop" className="btn-primary mt-2">
          Start shopping <ArrowRight size={16} />
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-4xl font-semibold tracking-tight">My orders</h1>
      <p className="mt-2 text-charcoal/55">{orders.length} {orders.length === 1 ? 'order' : 'orders'}</p>
      <div className="mt-8 space-y-5">
        {orders.map((order) => (
          <div key={order.id} className="rounded-2xl bg-white p-6 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-display text-lg font-bold">{order.id}</p>
                <p className="text-sm text-charcoal/50">
                  {new Date(order.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} · {order.method}
                </p>
              </div>
              <span className="rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-800">
                Preparing
              </span>
            </div>
            <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
              {order.items.map((item) => (
                <div key={`${item.id}|${item.color}|${item.size}`} className="h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-sage-100">
                  <ProductImage src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-charcoal/10 pt-4">
              <p className="text-sm text-charcoal/55">{order.items.reduce((n, i) => n + i.qty, 0)} items · {order.address}</p>
              <p className="font-bold">{formatPrice(order.total)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
