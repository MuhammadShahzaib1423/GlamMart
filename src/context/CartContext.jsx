import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const KEY = 'glammart:cart:v1'

const load = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(load)
  const [isOpen, setIsOpen] = useState(false)
  const [promo, setPromo] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items))
    } catch {
      /* ignore */
    }
  }, [items])

  const keyOf = (item) => `${item.id}|${item.color || ''}|${item.size || ''}`

  const addItem = (product, { color, size, qty = 1 } = {}) => {
    const entry = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: color || product.colors?.[0],
      size: size || product.sizes?.[0] || null,
      qty,
    }
    const key = keyOf(entry)
    setItems((prev) => {
      const found = prev.find((i) => keyOf(i) === key)
      if (found) {
        return prev.map((i) => (keyOf(i) === key ? { ...i, qty: i.qty + qty } : i))
      }
      return [...prev, entry]
    })
  }

  const updateQty = (entry, qty) => {
    const key = keyOf(entry)
    setItems((prev) =>
      qty <= 0 ? prev.filter((i) => keyOf(i) !== key) : prev.map((i) => (keyOf(i) === key ? { ...i, qty } : i)),
    )
  }

  const removeItem = (entry) => {
    const key = keyOf(entry)
    setItems((prev) => prev.filter((i) => keyOf(i) !== key))
  }

  const clear = () => {
    setItems([])
    setPromo(null)
  }

  const count = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items])
  const subtotal = useMemo(() => items.reduce((n, i) => n + i.qty * i.price, 0), [items])
  const discount = promo?.code === 'GLAM10' ? subtotal * 0.1 : 0
  const total = subtotal - discount

  const applyPromo = (code) => {
    const normalized = code.trim().toUpperCase()
    if (normalized === 'GLAM10') {
      setPromo({ code: 'GLAM10', pct: 10 })
      return true
    }
    return false
  }

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        addItem,
        updateQty,
        removeItem,
        clear,
        count,
        subtotal,
        discount,
        total,
        promo,
        applyPromo,
        removePromo: () => setPromo(null),
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
