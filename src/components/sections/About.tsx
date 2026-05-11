import { useLang } from '../../context/LangContext'
import { SectionHeader } from '../ui/SectionHeader'

export function About() {
  const { t } = useLang()
  const a = t.about

  return (
    <section
      id="about"
      className="section"
      style={{
        background: 'var(--c-bg2)',
        borderTop: '1px solid var(--c-border)',
        borderBottom: '1px solid var(--c-border)',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '5fr 4fr',
            gap: '64px',
            alignItems: 'start',
          }}
          className="about-grid"
        >
          {/* Left: text */}
          <div>
            <SectionHeader eyebrow={a.eyebrow} heading={a.heading} />

            <p
              style={{
                fontSize: '15px',
                color: 'var(--c-text)',
                lineHeight: 1.75,
                marginBottom: '20px',
              }}
            >
              {a.p1}
            </p>
            <p
              style={{
                fontSize: '15px',
                color: 'var(--c-text2)',
                lineHeight: 1.75,
              }}
            >
              {a.p2}
            </p>
          </div>

          {/* Right: pull quote */}
          <div style={{ paddingTop: '60px' }}>
            <blockquote
              style={{
                padding: '18px 20px',
                border: '1px solid var(--c-border)',
                borderRadius: 'var(--r-md)',
                background: 'color-mix(in srgb, var(--c-surf) 78%, transparent)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--ff-body)',
                  fontSize: 'clamp(17px, 1.7vw, 21px)',
                  fontWeight: 500,
                  letterSpacing: '-0.005em',
                  color: 'var(--c-text)',
                  lineHeight: 1.45,
                  fontStyle: 'italic',
                }}
              >
                "{a.quote}"
              </p>
            </blockquote>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  )
}
