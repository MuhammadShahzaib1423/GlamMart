import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, ChevronDown, Send, CheckCircle2 } from 'lucide-react'
import { useToast } from '../context/ToastContext'

const FAQS = [
  {
    q: 'How long does delivery take?',
    a: 'Orders are dispatched within 1–2 working days. Standard delivery takes 3–5 working days (£3.95, or free over $75); express next-working-day delivery is £9.95.',
  },
  {
    q: 'What is your returns policy?',
    a: 'You have 30 days from delivery to return unworn, unused items in their original condition for a full refund. Return shipping is free for UK orders.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes — we ship to most countries. Delivery times and costs are calculated at checkout based on your location.',
  },
  {
    q: 'How do I use a promo code?',
    a: 'Enter your code in the promo field in your bag or at checkout and press Apply. Codes cannot be combined with other offers.',
  },
  {
    q: 'Are your products ethically made?',
    a: 'We work directly with independent makers in small batches, use plastic-free packaging, and choose materials built to last.',
  },
]

export default function Contact() {
  const { push } = useToast()
  const [form, setForm] = useState({ name: '', email: '', subject: 'General enquiry', message: '' })
  const [sent, setSent] = useState(false)
  const [open, setOpen] = useState(0)

  const submit = (e) => {
    e.preventDefault()
    if (form.name.trim().length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) || form.message.trim().length < 10) {
      push('Please complete the form — a few more details help us reply properly.', 'info')
      return
    }
    setSent(true)
    push('Message sent — we will reply within one working day')
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="text-center">
        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">Get in touch</h1>
        <p className="mx-auto mt-3 max-w-md text-[15px] text-charcoal/60">
          Questions about an order, a piece, or just to say hello — we reply within one working day.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="rounded-2xl bg-white p-6 shadow-soft sm:p-8">
          {sent ? (
            <div className="flex flex-col items-center gap-3 py-14 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                <CheckCircle2 size={30} />
              </div>
              <h2 className="font-display text-2xl font-semibold">Message sent</h2>
              <p className="max-w-sm text-sm text-charcoal/55">
                Thank you, {form.name.split(' ')[0]}. Our care team will reply to {form.email} within one working day.
              </p>
              <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: 'General enquiry', message: '' }) }} className="btn-secondary mt-3">
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[13px] font-semibold text-charcoal/70">Your name</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Amelia Hart" className="input-field" />
                </div>
                <div>
                  <label className="mb-1.5 block text-[13px] font-semibold text-charcoal/70">Email address</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" className="input-field" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-charcoal/70">Subject</label>
                <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="input-field">
                  {['General enquiry', 'Order support', 'Returns & exchanges', 'Wholesale', 'Press'].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-charcoal/70">Message</label>
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} placeholder="How can we help?" className="input-field resize-none" />
              </div>
              <button type="submit" className="btn-primary">
                <Send size={15} /> Send message
              </button>
            </form>
          )}
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl bg-white p-6 shadow-soft">
            <h2 className="font-display text-lg font-semibold">Visit the studio</h2>
            <ul className="mt-4 space-y-3.5 text-sm text-charcoal/70">
              <li className="flex gap-3"><MapPin size={17} className="mt-0.5 shrink-0 text-brand-700" /> 12 Rosewater Lane,<br />Marylebone, London W1U 6LS</li>
              <li className="flex gap-3"><Clock size={17} className="mt-0.5 shrink-0 text-brand-700" /> Mon–Sat, 10am–6pm</li>
              <li className="flex gap-3"><Phone size={17} className="mt-0.5 shrink-0 text-brand-700" /> +44 20 7946 0812</li>
              <li className="flex gap-3"><Mail size={17} className="mt-0.5 shrink-0 text-brand-700" /> hello@glammart.co.uk</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-sage-100 p-6">
            <h2 className="font-display text-lg font-semibold">Prefer to talk?</h2>
            <p className="mt-2 text-sm text-charcoal/60">Our care team is available by phone during studio hours, or by email any time.</p>
          </div>
        </aside>
      </div>

      <div className="mx-auto mt-16 max-w-3xl">
        <h2 className="text-center font-display text-3xl font-semibold tracking-tight">Frequently asked</h2>
        <div className="mt-8 space-y-3">
          {FAQS.map((f, i) => (
            <div key={i} className="overflow-hidden rounded-2xl bg-white shadow-soft">
              <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
                <span className="font-semibold">{f.q}</span>
                <ChevronDown size={18} className={`shrink-0 text-charcoal/50 transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28 }}
                  >
                    <p className="px-6 pb-6 text-[15px] leading-relaxed text-charcoal/65">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
