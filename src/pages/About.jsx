import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Leaf, HandHeart, Gem, Recycle } from 'lucide-react'
import ProductImage from '../components/ProductImage'

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
}

const VALUES = [
  { icon: Gem, title: 'Considered curation', text: 'Fewer, better pieces. Every item earns its place through material, make and longevity — never trend-chasing.' },
  { icon: Leaf, title: 'Lighter footprint', text: 'Plastic-free packaging, small-batch production and carbon-conscious delivery on every single order.' },
  { icon: HandHeart, title: 'Fair partnerships', text: 'We work directly with independent makers and studios, paying fairly and building relationships that last.' },
  { icon: Recycle, title: 'Made to keep', text: 'Timeless design and honest materials mean pieces you will reach for in ten years, not ten weeks.' },
]

export default function About() {
  return (
    <div>
      <section className="relative overflow-hidden bg-sage-100">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-700">Our story</p>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Beautiful things,<br />chosen slowly.
            </h1>
            <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-charcoal/65">
              GlamMart began in a small London studio with a simple frustration: shopping had become fast, noisy and disposable.
              We wanted the opposite — a calm, curated space where every piece is chosen for its craft, its materials and its staying power.
            </p>
            <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-charcoal/65">
              Today we work with independent makers across apparel, accessories, beauty and home, bringing you a tightly edited
              collection that values quality over quantity. No endless scrolling. No shouting. Just good things, well made.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="overflow-hidden rounded-3xl shadow-lift"
          >
            <ProductImage src="/images/product-12.webp" alt="GlamMart studio pieces" eager className="aspect-[4/3] w-full object-cover" />
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
          {[
            ['2019', 'Founded in London'],
            ['120+', 'Curated pieces'],
            ['12k+', 'Happy customers'],
            ['98%', 'Would shop again'],
          ].map(([n, label], i) => (
            <motion.div key={label} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}>
              <p className="font-display text-4xl font-semibold text-brand-700 sm:text-5xl">{n}</p>
              <p className="mt-2 text-sm text-charcoal/55">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-white/60 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center">
            <h2 className="section-title">What we stand for</h2>
            <p className="section-subtitle mx-auto max-w-md">Four principles behind everything we stock.</p>
          </motion.div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <motion.div key={v.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }} className="card p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-100 text-brand-700">
                  <v.icon size={22} />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/60">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6">
        <motion.div {...fadeUp}>
          <h2 className="font-display text-3xl font-semibold tracking-tight">Come and browse</h2>
          <p className="mx-auto mt-3 max-w-md text-charcoal/60">The collection is waiting — timeless pieces, fair prices, delivered with care.</p>
          <Link to="/shop" className="btn-primary mt-7">
            Shop the collection <ArrowRight size={16} />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
