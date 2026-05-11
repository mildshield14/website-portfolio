import { motion, useReducedMotion } from 'framer-motion'
import { ReactNode } from 'react'

export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ type: 'spring', stiffness: 220, damping: 24, mass: 0.9, delay }}
    >
      {children}
    </motion.div>
  )
}
