import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Menu, Search, ShoppingBag, User, X, LogOut, Package } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useAuth } from '../context/AuthContext'

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const { count, setIsOpen } = useCart()
  const { count: wishCount } = useWishlist()
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [accountOpen, setAccountOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen ])

  const submitSearch = (e) => {
    e.preventDefault()
    setSearchOpen(false)
    setMenuOpen(false)
    navigate(query.trim() ? `/shop?q=${encodeURIComponent(query.trim())}` : '/shop')
  }

  const linkCls = ({ isActive }) =>
    `relative text-sm font-medium transition-colors ${isActive ? 'text-brand-700' : 'text-charcoal/70 hover:text-charcoal'}`

  return (
    <header className="sticky top-0 z-40 border-b border-charcoal/8 bg-ivory/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:gap-5 sm:px-6">
        <button
          className="flex h-10 w-10 items-center justify-center rounded-xl text-charcoal lg:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-700 font-display text-lg font-bold text-white">
            G
          </span>
          <span className="font-display text-[22px] font-semibold tracking-tight text-charcoal">
            GlamMart
          </span>
        </Link>

        <nav className="ml-6 hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} className={linkCls}>
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="Search"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-charcoal/70 transition hover:bg-sage-100 hover:text-charcoal"
          >
            <Search size={19} />
          </button>
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-charcoal/70 transition hover:bg-sage-100 hover:text-charcoal"
          >
            <Heart size={19} />
            {wishCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-700 px-1 text-[10px] font-bold text-white">
                {wishCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open bag"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-charcoal/70 transition hover:bg-sage-100 hover:text-charcoal"
          >
            <ShoppingBag size={19} />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-700 px-1 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </button>
          <div className="relative">
            <button
              onClick={() => (user ? setAccountOpen((v) => !v) : navigate('/login'))}
              aria-label="Account"
              className="flex h-10 w-10 items-center justify-center rounded-xl text-charcoal/70 transition hover:bg-sage-100 hover:text-charcoal"
            >
              <User size={19} />
            </button>
            <AnimatePresence>
              {user && accountOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setAccountOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 z-20 mt-2 w-60 rounded-2xl border border-charcoal/8 bg-white p-2 shadow-lift"
                  >
                    <div className="px-3 py-2.5">
                      <p className="text-sm font-semibold text-charcoal">{user.name}</p>
                      <p className="truncate text-xs text-charcoal/50">{user.email}</p>
                    </div>
                    <div className="border-t border-charcoal/8 pt-1">
                      <button
                        onClick={() => {
                          setAccountOpen(false)
                          navigate('/wishlist')
                        }}
                        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-charcoal/80 hover:bg-sage-50"
                      >
                        <Heart size={16} /> Wishlist
                      </button>
                      <button
                        onClick={() => {
                          setAccountOpen(false)
                          navigate('/orders')
                        }}
                        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-charcoal/80 hover:bg-sage-50"
                      >
                        <Package size={16} /> Orders
                      </button>
                      <button
                        onClick={() => {
                          logout()
                          setAccountOpen(false)
                          navigate('/')
                        }}
                        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-charcoal/80 hover:bg-sage-50"
                      >
                        <LogOut size={16} /> Sign out
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-charcoal/8"
          >
            <form onSubmit={submitSearch} className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
              <Search size={18} className="shrink-0 text-charcoal/40" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search dresses, watches, serums…"
                className="w-full bg-transparent text-sm text-charcoal outline-none placeholder:text-charcoal/40"
              />
              <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close search">
                <X size={18} className="text-charcoal/50" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-charcoal/40 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-ivory p-6 lg:hidden"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-xl font-semibold">GlamMart</span>
                <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-sage-100">
                  <X size={20} />
                </button>
              </div>
              <nav className="mt-8 flex flex-col gap-1">
                {NAV.map((n, i) => (
                  <motion.div
                    key={n.to}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06 }}
                  >
                    <NavLink
                      to={n.to}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `block rounded-xl px-4 py-3 font-display text-2xl font-medium transition ${
                          isActive ? 'bg-sage-100 text-brand-700' : 'text-charcoal hover:bg-sage-100'
                        }`
                      }
                    >
                      {n.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto rounded-2xl bg-sage-100 p-5">
                <p className="font-display text-lg font-semibold">GLAM10</p>
                <p className="mt-1 text-sm text-charcoal/60">10% off your first order at checkout.</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
