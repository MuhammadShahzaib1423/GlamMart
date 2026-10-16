import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Lock, Loader2, Sparkles } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { AuthLayout } from './Login'

export default function Signup() {
  const { signup } = useAuth()
  const { push } = useToast()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setError('')
    if (name.trim().length < 2) {
      setError('Please enter your name.')
      return
    }
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
      signup(name.trim(), email.trim())
      push('Account created — welcome to GlamMart')
      navigate('/')
    }, 600)
  }

  return (
    <AuthLayout title="Create your account" subtitle="Join GlamMart for 10% off your first order.">
      <form onSubmit={submit} className="space-y-4" noValidate>
        <div className="relative">
          <User size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40" />
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" autoComplete="name" className="input-field !pl-11" />
        </div>
        <div className="relative">
          <Mail size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" autoComplete="email" className="input-field !pl-11" />
        </div>
        <div className="relative">
          <Lock size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password (min. 6 characters)" autoComplete="new-password" className="input-field !pl-11" />
        </div>
        {error && <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700">{error}</p>}
        <button type="submit" disabled={busy} className="btn-primary w-full">
          {busy ? <Loader2 size={17} className="animate-spin" /> : <Sparkles size={16} />}
          {busy ? 'Creating account…' : 'Create account'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-charcoal/55">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-brand-700 hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  )
}
