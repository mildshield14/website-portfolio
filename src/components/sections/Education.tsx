import { useLang } from '../../context/LangContext'
import { SectionHeader } from '../ui/SectionHeader'

export function Education() {
  const { t } = useLang()
  const e = t.education

  return (
    <section
      id="education"
      className="section"
      style={{
        background: 'var(--c-bg2)',
        borderTop: '1px solid var(--c-border)',
        borderBottom: '1px solid var(--c-border)',
      }}
    >
      <div className="container">
        <SectionHeader eyebrow={e.eyebrow} heading={e.heading} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }} className="education-stack">
          {e.items.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '160px 1fr',
                gap: '32px',
                padding: '24px 0',
                borderBottom: i < e.items.length - 1 ? '1px solid var(--c-border)' : 'none',
                alignItems: 'start',
              }}
              className="education-row"
            >
              {/* Left: period */}
              <div>
                <span className="meta-label">{item.period}</span>
              </div>

              {/* Right: degree info */}
              <div>
                <h3 style={{
                  fontFamily: 'var(--ff-display)',
                  fontSize: '18px', fontWeight: 700, letterSpacing: '-0.02em',
                  color: 'var(--c-text)', marginBottom: '4px',
                }}>
                  {item.degree}
                </h3>
                <p style={{ fontSize: '13.5px', color: 'var(--c-accent)', fontWeight: 500, marginBottom: '10px' }}>
                  {item.institution}
                </p>
                <p style={{ fontSize: '13px', color: 'var(--c-text2)', lineHeight: 1.65 }}>
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 560px) {
          .education-row { grid-template-columns: 1fr !important; gap: 8px !important; }
        }
      `}</style>
    </section>
  )
}
