interface SectionHeaderProps {
  eyebrow: string
  heading: string
  sub?: string
}

export function SectionHeader({ eyebrow, heading, sub }: SectionHeaderProps) {
  return (
    <div style={{ marginBottom: sub ? '44px' : '36px' }}>
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 style={{
        fontSize: 'clamp(24px, 2.6vw, 34px)',
        fontWeight: 600,
        letterSpacing: '-0.01em',
        lineHeight: 1.15,
        color: 'var(--c-text)',
        marginBottom: sub ? '14px' : 0,
      }}>
        {heading}
      </h2>
      {sub && (
        <p style={{ fontSize: '14px', color: 'var(--c-text2)', fontWeight: 400, lineHeight: 1.65, maxWidth: '540px' }}>
          {sub}
        </p>
      )}
    </div>
  )
}
