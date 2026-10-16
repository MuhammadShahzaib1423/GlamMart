export const CATEGORIES = ['Women', 'Men', 'Beauty', 'Home']

export const PRODUCTS = [
  {
    id: 'p01',
    name: 'Sage Linen Midi Dress',
    category: 'Women',
    subcategory: 'Apparel',
    price: 89,
    rating: 4.8,
    reviews: 124,
    badge: 'New',
    image: '/images/product-01.webp',
    description:
      'Cut from breathable European linen in a soft sage hue, this midi dress drapes beautifully from shoulder to hem. A timeless silhouette for warm days and long evenings.',
    colors: ['#9CAF88', '#E8DCC8', '#1C1917'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'p02',
    name: 'Cream Silk Blouse',
    category: 'Women',
    subcategory: 'Apparel',
    price: 59,
    rating: 4.6,
    reviews: 86,
    image: '/images/product-02.webp',
    description:
      'A wardrobe essential in lustrous mulberry silk. The relaxed fit and mother-of-pearl buttons bring quiet polish to tailoring and denim alike.',
    colors: ['#F5EFE3', '#FFFFFF', '#8A9BA8'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'p03',
    name: 'Tan Leather Handbag',
    category: 'Women',
    subcategory: 'Accessories',
    price: 129,
    rating: 4.9,
    reviews: 203,
    badge: 'Bestseller',
    image: '/images/product-03.webp',
    description:
      'Full-grain leather, hand-finished in a warm tan that deepens with wear. Structured yet supple, with room for the everyday and hardware that lasts.',
    colors: ['#B07D4F', '#1C1917', '#E8DCC8'],
  },
  {
    id: 'p04',
    name: 'Gold Hoop Earrings',
    category: 'Women',
    subcategory: 'Jewelry',
    price: 45,
    rating: 4.7,
    reviews: 92,
    image: '/images/product-04.webp',
    description:
      'Everyday hoops in 14k gold vermeil with a softly hammered finish that catches the light. Lightweight, hypoallergenic and made for daily wear.',
    colors: ['#D4AF37', '#C0C0C0'],
  },
  {
    id: 'p05',
    name: 'White Oxford Shirt',
    category: 'Men',
    subcategory: 'Apparel',
    price: 69,
    rating: 4.7,
    reviews: 158,
    image: '/images/product-05.webp',
    description:
      'The definitive white shirt, cut from crisp Supima cotton oxford with a button-down collar. Equally at home under a blazer or with rolled sleeves.',
    colors: ['#FFFFFF', '#DCE6F0', '#1C1917'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'p06',
    name: 'Navy Wool Blazer',
    category: 'Men',
    subcategory: 'Apparel',
    price: 149,
    rating: 4.8,
    reviews: 74,
    badge: 'New',
    image: '/images/product-06.webp',
    description:
      'A half-canvassed blazer in Italian merino wool with a natural shoulder and patch pockets. Sharp without stiffness — tailoring that moves with you.',
    colors: ['#1B2A4A', '#4A5568', '#1C1917'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'p07',
    name: 'Leather Card Wallet',
    category: 'Men',
    subcategory: 'Accessories',
    price: 49,
    rating: 4.6,
    reviews: 117,
    image: '/images/product-07.webp',
    description:
      'Six cards, folded notes, nothing else. Vegetable-tanned leather burnished by hand, slim enough to disappear into any pocket.',
    colors: ['#5C3D2E', '#1C1917', '#B07D4F'],
  },
  {
    id: 'p08',
    name: 'Minimalist Steel Watch',
    category: 'Men',
    subcategory: 'Accessories',
    price: 199,
    rating: 4.9,
    reviews: 186,
    badge: 'Bestseller',
    image: '/images/product-08.webp',
    description:
      'A 40mm brushed-steel case, sapphire glass and a clean dial with no clutter. Japanese quartz movement, 5ATM water resistance, endlessly versatile.',
    colors: ['#C0C0C0', '#1C1917', '#8B6F47'],
  },
  {
    id: 'p09',
    name: 'Rosehip Face Serum',
    category: 'Beauty',
    subcategory: 'Skincare',
    price: 39,
    rating: 4.8,
    reviews: 231,
    image: '/images/product-09.webp',
    description:
      'Cold-pressed rosehip seed oil with vitamin E and squalane. Two drops morning and night for a calm, lit-from-within glow. Fragrance free.',
    colors: ['#E8B4B8'],
  },
  {
    id: 'p10',
    name: 'Matte Lipstick Trio',
    category: 'Beauty',
    subcategory: 'Makeup',
    price: 34,
    oldPrice: 45,
    rating: 4.5,
    reviews: 98,
    badge: 'Sale',
    image: '/images/product-10.webp',
    description:
      'Three weightless matte shades — terracotta, rosewood and classic red — enriched with jojoba for comfortable all-day wear. One for every mood.',
    colors: ['#B5542D', '#8E3B4B', '#A31621'],
  },
  {
    id: 'p11',
    name: 'Sandalwood Scented Candle',
    category: 'Home',
    subcategory: 'Fragrance',
    price: 29,
    rating: 4.7,
    reviews: 143,
    image: '/images/product-11.webp',
    description:
      'Creamy sandalwood, amber and a whisper of cardamom in clean-burning soy wax. Forty hours of slow, grounding warmth for any room.',
    colors: ['#E8DCC8', '#D6C7A8'],
  },
  {
    id: 'p12',
    name: 'Ceramic Vase Duo',
    category: 'Home',
    subcategory: 'Decor',
    price: 59,
    rating: 4.6,
    reviews: 67,
    badge: 'New',
    image: '/images/product-12.webp',
    description:
      'Two hand-thrown stoneware vases in complementary heights with a soft matte glaze. Beautiful empty, striking with stems.',
    colors: ['#E8E0D4', '#9CAF88', '#B0A08A'],
  },
]

export const getProduct = (id) => PRODUCTS.find((p) => p.id === id)

export const relatedProducts = (product, count = 4) =>
  PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.subcategory === product.subcategory),
  ).slice(0, count)

const REVIEW_POOL = [
  {
    name: 'Amelia R.',
    rating: 5,
    date: 'October 2026',
    title: 'Exceeded expectations',
    text: 'The quality is superb for the price. Packaging was beautiful and delivery was quick. I would absolutely buy again.',
  },
  {
    name: 'James W.',
    rating: 5,
    date: 'September 2026',
    title: 'Lovely piece',
    text: 'Elegant, well made and true to the photographs. It has become a favourite in my collection already.',
  },
  {
    name: 'Sofia M.',
    rating: 4,
    date: 'September 2026',
    title: 'Very good',
    text: 'Really pleased overall. Lovely materials and finish — just allow a little extra time for delivery.',
  },
  {
    name: 'Daniel K.',
    rating: 5,
    date: 'August 2026',
    title: 'Perfect gift',
    text: 'Bought this as a gift and it went down wonderfully. The attention to detail is clear from the moment you open the box.',
  },
]

export const productReviews = (product) => {
  const count = Math.min(3, REVIEW_POOL.length)
  const start = product.id.charCodeAt(1) % REVIEW_POOL.length
  return Array.from({ length: count }, (_, i) => REVIEW_POOL[(start + i) % REVIEW_POOL.length])
}

export const formatPrice = (n) => `$${n.toFixed(n % 1 === 0 ? 0 : 2)}`

export const TESTIMONIALS = [
  {
    name: 'Charlotte Ellis',
    role: 'Verified buyer',
    text: 'GlamMart has quietly become my first stop for considered pieces. Every order arrives beautifully packed and the quality is consistently excellent.',
    rating: 5,
  },
  {
    name: 'Oliver Bennett',
    role: 'Verified buyer',
    text: 'Ordered the watch for my father and the blazer for myself. Both flawless. Customer care replied within the hour when I had a sizing question.',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'Verified buyer',
    text: 'The serum transformed my routine and the candle makes the whole flat smell wonderful. Thoughtful curation, fair prices, lovely experience.',
    rating: 5,
  },
]
