import type { AnchorHTMLAttributes } from 'react'
import { triggerHaptic } from '../../utils/haptics'

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'fill' | 'outline'
  haptic?: boolean
  children: React.ReactNode
}

export function Button({ variant = 'fill', haptic = false, children, className, onClick, ...props }: ButtonProps) {
  const cls = variant === 'fill' ? 'btn-fill' : 'btn-outline'
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (haptic) triggerHaptic()
    onClick?.(e)
  }
  return (
    <a className={`${cls}${className ? ` ${className}` : ''}`} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}
