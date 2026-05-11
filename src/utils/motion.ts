export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 28, delay },
  }),
}

export const staggerContainer = {
  visible: { transition: { staggerChildren: 0.06 } },
}
