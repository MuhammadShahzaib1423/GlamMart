import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Loader2, ShoppingBag } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import ProductImage from '../components/ProductImage'

export function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="grid min-h-[calc(100vh-64px)] lg:grid-cols-2">
      <div className="relative hidden overflow-hidden lg:block">
        <ProductImage src="/images/product-03.webp" alt="GlamMart collection" eager className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-12">
          <p className="font-display text-4xl font-semibold leading-tight text-white">
            Elegance for<br />everyday living.
          </p>
          <p className="mt-3 max-w-sm text-[15px] text-white/75">
            Sign in for faster checkout, order tracking and a wishlist that follows you everywhere.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center px-4 py-12 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-700 font-display text-lg font-bold text-white">G</span>
            <span className="font-display text-xl font-semibold">GlamMart</span>
          </div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-2 text-[15px] text-charcoal/55">{subtitle}</p>
          <div className="mt-7">{children}</div>
        </motion.div>
      </div>
    </div>
  )
}

export default function Login() {
  const { login } = useAuth()
  const { push } = useToast()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setError('')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setBusy(true)
    setTimeout(() => {
      login(email.trim())
      push('Welcome back')
      navigate('/')
    }, 600)
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your GlamMart account.">
      <form onSubmit={submit} className="space-y-4" noValidate>
        <div className="relative">
          <Mail size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" autoComplete="email" className="input-field !pl-11" />
        </div>
        <div className="relative">
          <Lock size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" autoComplete="current-password" className="input-field !pl-11" />
        </div>
        {error && <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700">{error}</p>}
        <button type="submit" disabled={busy} className="btn-primary w-full">
          {busy ? <Loader2 size={17} className="animate-spin" /> : <ShoppingBag size={16} />}
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-charcoal/55">
        New to GlamMart?{' '}
        <Link to="/signup" className="font-semibold text-brand-700 hover:underline">
          Create an account
        </Link>
      </p>
      <p className="mt-4 rounded-xl bg-sage-50 px-4 py-3 text-center text-xs text-charcoal/55">
        Demo sign-in — any email with a 6+ character password works. Details stay in your browser.
      </p>
    </AuthLayout>
  )
}
