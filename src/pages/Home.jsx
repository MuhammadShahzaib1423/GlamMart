import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Truck, ShieldCheck, RefreshCcw, Star, Quote } from 'lucide-react'
import { PRODUCTS, TESTIMONIALS, formatPrice } from '../data/products'
import ProductCard from '../components/ProductCard'
import ProductImage from '../components/ProductImage'
import RatingStars from '../components/RatingStars'
import { useState } from 'react'
import { useToast } from '../context/ToastContext'

const CATEGORY_TILES = [
  { name: 'Women', image: '/images/product-01.webp', blurb: 'Dresses, silk & fine details' },
  { name: 'Men', image: '/images/product-06.webp', blurb: 'Tailoring & everyday icons' },
  { name: 'Beauty', image: '/images/product-09.webp', blurb: 'Skincare & considered colour' },
  { name: 'Home', image: '/images/product-12.webp', blurb: 'Objects for calm spaces' },
]

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
}

function Newsletter() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const { push } = useToast()

  const submit = (e) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      push('Please enter a valid email address', 'info')
      return
    }
    setDone(true)
    push('Welcome to the GlamMart list')
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
      <motion.div {...fadeUp} className="relative overflow-hidden rounded-3xl bg-charcoal px-6 py-14 text-center text-white sm:px-12">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-700/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-sage-300/15 blur-3xl" />
        <div className="relative">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Join the GlamMart list</h2>
          <p className="mx-auto mt-3 max-w-md text-[15px] text-white/65">
            New arrivals, private previews and 10% off your first order. One thoughtful email a week — never more.
          </p>
          {done ? (
            <p className="mx-auto mt-7 inline-flex items-center gap-2 rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold">
              You're on the list — welcome.
            </p>
          ) : (
            <form onSubmit={submit} className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="h-12 flex-1 rounded-full border border-white/15 bg-white/10 px-5 text-sm text-white placeholder:text-white/45 outline-none transition focus:border-brand-600 focus:bg-white/15"
              />
              <button type="submit" className="inline-flex h-12 items-center justify-center rounded-full bg-brand-700 px-7 text-sm font-semibold text-white transition hover:bg-brand-600">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  )
}

export default function Home() {
  const featured = PRODUCTS.slice(0, 4)
  const bestsellers = PRODUCTS.filter((p) => p.badge === 'Bestseller' || p.rating >= 4.8).slice(0, 4)
  const saleProduct = PRODUCTS.find((p) => p.badge === 'Sale')

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-sage-100 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-brand-100/60 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-sage-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-800">
              <Star size={12} /> New season edit
            </span>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-charcoal sm:text-6xl lg:text-[68px]">
              Elegance for <em className="not-italic text-brand-700">everyday</em> living
            </h1>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-charcoal/60">
              Curated apparel, accessories, beauty and home pieces — chosen slowly, made well, and designed to be loved for years.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="btn-primary">
                Shop the collection <ArrowRight size={16} />
              </Link>
              <Link to="/about" className="btn-secondary">
                Our story
              </Link>
            </div>
            <div className="mt-10 flex gap-8">
              {[
                ['12k+', 'Happy customers'],
                ['4.8', 'Average rating'],
                ['120+', 'Curated pieces'],
              ].map(([n, label]) => (
                <div key={label}>
                  <p className="font-display text-3xl font-semibold text-charcoal">{n}</p>
                  <p className="mt-0.5 text-xs uppercase tracking-widest text-charcoal/50">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="overflow-hidden rounded-b-[2rem] rounded-t-[10rem] shadow-lift">
              <ProductImage
                src="/images/product-01.webp"
                alt="Sage Linen Midi Dress"
                eager
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -left-4 top-16 rounded-2xl bg-white/95 px-4 py-3 shadow-lift backdrop-blur sm:-left-8"
            >
              <div className="flex items-center gap-2">
                <RatingStars rating={4.9} size={13} />
                <span className="text-sm font-bold">4.9</span>
              </div>
              <p className="mt-0.5 text-xs text-charcoal/55">2,400+ reviews</p>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              className="absolute -right-3 bottom-20 rounded-2xl bg-white/95 px-4 py-3 shadow-lift backdrop-blur sm:-right-6"
            >
              <p className="flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                <Truck size={15} /> Free delivery
              </p>
              <p className="mt-0.5 text-xs text-charcoal/55">On orders over $75</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <motion.div {...fadeUp} className="flex items-end justify-between">
          <div>
            <h2 className="section-title">Shop by category</h2>
            <p className="section-subtitle">Four edits, one calm aesthetic.</p>
          </div>
          <Link to="/shop" className="hidden items-center gap-1.5 text-sm font-semibold text-brand-700 hover:gap-2.5 sm:inline-flex transition-all">
            View all <ArrowRight size={16} />
          </Link>
        </motion.div>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {CATEGORY_TILES.map((c, i) => (
            <motion.div key={c.name} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}>
              <Link
                to={`/shop?cat=${c.name}`}
                className="group relative block overflow-hidden rounded-2xl shadow-soft transition-shadow hover:shadow-lift"
              >
                <ProductImage
                  src={c.image}
                  alt={c.name}
                  className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display text-2xl font-semibold text-white">{c.name}</h3>
                  <p className="mt-1 text-sm text-white/75">{c.blurb}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                    Explore <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="bg-white/60 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div {...fadeUp} className="flex items-end justify-between">
            <div>
              <h2 className="section-title">Featured pieces</h2>
              <p className="section-subtitle">This week's most loved arrivals.</p>
            </div>
            <Link to="/shop" className="hidden items-center gap-1.5 text-sm font-semibold text-brand-700 sm:inline-flex">
              View all <ArrowRight size={16} />
            </Link>
          </motion.div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* PROMO BANNER */}
      {saleProduct && (
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <motion.div {...fadeUp} className="grid overflow-hidden rounded-3xl bg-sage-100 lg:grid-cols-2">
            <div className="relative min-h-[280px]">
              <ProductImage src={saleProduct.image} alt={saleProduct.name} className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-12">
              <span className="inline-flex w-fit items-center rounded-full bg-amberish px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-white">
                Limited time
              </span>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                The Matte Lipstick Trio — now {formatPrice(saleProduct.price)}
              </h2>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-charcoal/60">
                Three weightless matte shades, down from {formatPrice(saleProduct.oldPrice)}. Plus an extra 10% off with code GLAM10.
              </p>
              <div className="mt-6">
                <Link to={`/product/${saleProduct.id}`} className="btn-primary">
                  Shop the sale <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* BESTSELLERS */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <motion.div {...fadeUp}>
          <h2 className="section-title">Bestsellers</h2>
          <p className="section-subtitle">The pieces our customers return for.</p>
        </motion.div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {bestsellers.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* PERKS */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: Truck, title: 'Free delivery', text: 'Complimentary shipping on every order over $75, tracked door to door.' },
            { icon: RefreshCcw, title: '30-day returns', text: 'Changed your mind? Easy returns within 30 days, no questions asked.' },
            { icon: ShieldCheck, title: 'Quality assured', text: 'Every piece is inspected by hand before it leaves our studio.' },
          ].map((f, i) => (
            <motion.div key={f.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }} className="card flex gap-4 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sage-100 text-brand-700">
                <f.icon size={22} />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-charcoal/60">{f.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white/60 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center">
            <h2 className="section-title">Loved by customers</h2>
            <p className="section-subtitle mx-auto max-w-md">Real words from people who shop with us.</p>
          </motion.div>
          <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.figure key={t.name} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }} className="card flex flex-col p-7">
                <Quote size={26} className="text-brand-700/30" fill="currentColor" />
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-charcoal/75">"{t.text}"</blockquote>
                <figcaption className="mt-6">
                  <RatingStars rating={t.rating} />
                  <p className="mt-2 text-sm font-semibold text-charcoal">{t.name}</p>
                  <p className="text-xs text-charcoal/50">{t.role}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  )
}
