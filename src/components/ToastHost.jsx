import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Info } from 'lucide-react'
import { useToast } from '../context/ToastContext'

export default function ToastHost() {
  const { toasts } = useToast()
  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[100] flex w-full max-w-sm -translate-x-1/2 flex-col items-center gap-2 px-4">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto flex w-full items-center gap-3 rounded-2xl bg-charcoal px-4 py-3 text-white shadow-lift"
          >
            {t.type === 'success' ? (
              <CheckCircle2 size={18} className="shrink-0 text-brand-600" />
            ) : (
              <Info size={18} className="shrink-0 text-sage-300" />
            )}
            <p className="text-sm font-medium">{t.message}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
