import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const MESSAGES = [
  'Complimentary shipping on orders over $75',
  'Use code GLAM10 for 10% off your first order',
  'New season edit — discover the latest arrivals',
]

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % MESSAGES.length), 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="bg-charcoal text-white">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-center px-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="text-[12px] font-medium tracking-wide"
          >
            {MESSAGES[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}
