# GlamMart — Modern Fashion & Lifestyle

An elegant, fully responsive e-commerce experience for curated fashion and lifestyle pieces — apparel, accessories, beauty and home. Built with **React 18 + Vite**, styled with **Tailwind CSS**, animated with **Framer Motion**, icons from **lucide-react**, and routing via **react-router-dom**.

## Features

- **Home** — animated hero with arch-framed imagery and floating stat cards, category tiles, featured pieces, sale promo banner, bestsellers, perks, testimonials and newsletter signup
- **Shop** — live search, category / price / rating filters (slide-in panel on mobile), and sorting (featured, price ↑↓, top rated, most reviewed)
- **Product detail** — hover-zoom imagery, colour & size selectors, quantity stepper, add to bag, wishlist toggle, tabbed Description / Shipping & Returns / Reviews, related products
- **Cart** — global slide-over drawer plus a full cart page, quantity steppers, promo codes (`GLAM10` for 10% off), order summary
- **Wishlist** — save pieces for later, move to bag in one tap
- **Checkout** — 3-step flow (Information → Shipping → Payment) with a formatted mock card form, order summary sidebar and a confirmation page with order number + delivery timeline
- **Accounts** — elegant split-layout login/signup (demo auth persisted in localStorage), account menu in the header, order history page
- **About & Contact** — brand story, values, stats, contact form with success state, store info and FAQ accordion
- **Extras** — toast notifications, back-to-top button, custom 404 page, rotating announcement bar, sticky blurred header with mobile menu

## Tech stack

| Tool | Purpose |
| --- | --- |
| React 18 + Vite | UI + build |
| Tailwind CSS | Styling (custom ivory/sage/emerald theme) |
| Framer Motion | Animations & transitions |
| react-router-dom | Client-side routing |
| lucide-react | Icons |
| Fraunces + Inter | Display serif + body type (Google Fonts) |

## Design

Warm ivory backgrounds (`#FAF7F2`), deep charcoal text (`#1C1917`), emerald accent (`#047857`), soft sage surfaces, amber sale badges. Generous whitespace, rounded-2xl cards, soft shadows and subtle hover motion throughout.

## Getting started

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build   # outputs to dist/
npm run preview # preview the production build
```

## Deploying to Vercel

1. Push this folder to a GitHub repository
2. Import the repo in Vercel (framework preset: **Vite**)
3. Deploy — no environment variables or build configuration needed

## Product images

Product photography lives in `public/images/` as `product-01.webp` … `product-12.webp` and is referenced by path, so images can be added or swapped without touching code.
