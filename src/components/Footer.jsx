import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react'

const SHOP_LINKS = [
  { to: '/shop', label: 'All products' },
  { to: '/shop?cat=Women', label: 'Women' },
  { to: '/shop?cat=Men', label: 'Men' },
  { to: '/shop?cat=Beauty', label: 'Beauty' },
  { to: '/shop?cat=Home', label: 'Home' },
]

const COMPANY_LINKS = [
  { to: '/about', label: 'Our story' },
  { to: '/contact', label: 'Contact us' },
  { to: '/wishlist', label: 'Wishlist' },
  { to: '/cart', label: 'Shopping bag' },
]

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-700 font-display text-lg font-bold text-white">
                G
              </span>
              <span className="font-display text-[22px] font-semibold tracking-tight">GlamMart</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Considered fashion and lifestyle pieces, curated for modern living. Elegant essentials, delivered with care.
            </p>
            <div className="mt-5 flex gap-2">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <button
                  key={i}
                  aria-label="Social link"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-brand-700"
                >
                  <Icon size={17} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white/50">Shop</h4>
            <ul className="mt-4 space-y-2.5">
              {SHOP_LINKS.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-white/70 transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white/50">Company</h4>
            <ul className="mt-4 space-y-2.5">
              {COMPANY_LINKS.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-white/70 transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white/50">Visit us</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-brand-600" />
                12 Rosewater Lane, Marylebone, London
              </li>
              <li className="flex gap-2.5">
                <Phone size={16} className="mt-0.5 shrink-0 text-brand-600" />
                +44 20 7946 0812
              </li>
              <li className="flex gap-2.5">
                <Mail size={16} className="mt-0.5 shrink-0 text-brand-600" />
                hello@glammart.co.uk
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/50">
            © 2026 GlamMart. All rights reserved. ·{' '}
            <a
              href="https://shahzaib-portfolio-muhammad-shahzaibs-projects-16858ef3.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-white"
            >
              Built by Muhammad Shahzaib
            </a>
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Visa', 'Mastercard', 'Amex', 'PayPal', 'Apple Pay'].map((p) => (
              <span key={p} className="rounded-md bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white/70">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
