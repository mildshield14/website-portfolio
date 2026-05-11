import { useLang } from '../../context/LangContext'
import { Button } from '../ui/Button'
import profilePic from '../../assets/profilepic.jpeg'

export function Hero() {
  const { t } = useLang()
  const h = t.hero

  return (
    <section
      id="home"
      style={{ paddingTop: '60px', minHeight: '88vh', display: 'flex', alignItems: 'center' }}
    >
      <div className="container" style={{ width: '100%', paddingTop: '48px', paddingBottom: '48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: '56px', alignItems: 'start' }} className="hero-grid">

          {/* ── Left ── */}
          <div>
            {/* Role title — plain body text, not uppercase mono */}
            <p className="hero-1" style={{
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--c-accent)',
              marginBottom: '16px',
              letterSpacing: '0',
            }}>
              {h.eyebrow}
            </p>

            <h1 className="hero-2" style={{
              fontFamily: 'var(--ff-body)',
              fontSize: 'clamp(36px, 3.6vw, 50px)', fontWeight: 800,
              letterSpacing: '-0.03em', lineHeight: 1.05,
              color: 'var(--c-text)', marginBottom: '18px',
            }}>
              {h.name}
            </h1>

            <div className="hero-3" style={{ borderTop: '1px solid var(--c-border)', marginBottom: '18px' }} />

            <p className="hero-3" style={{
              fontSize: 'clamp(15px, 1.4vw, 18px)',
              color: 'var(--c-text)', lineHeight: 1.5, fontWeight: 400,
              maxWidth: '500px', marginBottom: '12px',
            }}>
              {h.positioning}
            </p>

            <p className="hero-4" style={{
              fontSize: '14px', color: 'var(--c-text2)', lineHeight: 1.72, fontWeight: 400,
              maxWidth: '480px', marginBottom: '28px',
            }}>
              {h.bio}
            </p>

            <div className="hero-5" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
              <Button variant="fill" haptic href="#work">{h.cta_work}</Button>
              <Button variant="outline" href="#research">{h.cta_research}</Button>
              <Button variant="outline" haptic href={t.contact.resumeFile}>{h.cta_cv}</Button>
              <Button variant="outline" href="#contact">{h.cta_contact}</Button>
            </div>

            {/* University line — small, plain, not uppercase mono */}
            <p className="hero-6" style={{
              fontSize: '12px',
              color: 'var(--c-text2)',
              fontWeight: 400,
              letterSpacing: '0',
            }}>
              {t.meta.uni}
            </p>
          </div>

          {/* ── Right: photo note + project artifact ── */}
          <div className="hero-4" style={{ paddingTop: '4px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="hero-photo card" style={{
              display: 'flex', flexDirection: 'column',
              background: 'var(--c-surf)', overflow: 'hidden',
            }}>
              <img
                src={profilePic}
                alt="Vennila Sooben"
                className="hero-photo-img"
                style={{
                  width: '100%',
                  height: 'clamp(230px, 30vw, 280px)',
                  objectFit: 'cover',
                  objectPosition: 'center 20%',
                  display: 'block',
                  flexShrink: 0,
                }}
              />
              <div style={{
                borderTop: '1px solid var(--c-border)',
                padding: '10px 16px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                flexShrink: 0,
              }}>
                <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--c-text)' }}>Vennila Sooben</span>
                <span className="meta-label">Montréal</span>
              </div>
            </div>

            <div className="hero-current-card card">
              <div className="panel-header">
                {/* "Currently" label — natural-case, matches panel context */}
                <span style={{
                  fontSize: '10.5px',
                  fontWeight: 500,
                  color: 'var(--c-text2)',
                  letterSpacing: '0',
                }}>
                  {h.currently_label}
                </span>
              </div>
              <div style={{ padding: '16px 20px' }}>
                <p style={{ fontSize: '13.5px', color: 'var(--c-text2)', lineHeight: 1.65, marginBottom: '14px', fontWeight: 400 }}>
                  {h.currently_prose}
                </p>
                {/* <pre className="snippet-artifact" style={{
                  fontFamily: 'var(--ff-mono)',
                  fontSize: '11px',
                  color: 'var(--c-text2)',
                  background: 'var(--c-bg2)',
                  border: '1px solid var(--c-border)',
                  borderRadius: 'var(--r-sm)',
                  padding: '10px 14px',
                  lineHeight: 1.6,
                  overflow: 'auto',
                  margin: 0,
                }}>
                  {h.artifact}
                </pre> */}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom meta bar */}
        <div style={{
          borderTop: '1px solid var(--c-border)', paddingTop: '14px', marginTop: '12px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span className="meta-label">{t.meta.name}</span>
          <span className="meta-label">Montréal, 2026</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .hero-grid { grid-template-columns: minmax(0, 1fr) !important; gap: 36px !important; }
          .hero-grid > * { min-width: 0 !important; }
          .hero-5 { width: 100% !important; }
          .hero-photo-img { height: 300px !important; object-position: center 15% !important; }
          .hero-photo, .hero-current-card { max-width: 440px !important; }
        }
        @media (max-width: 480px) {
          .hero-photo-img { height: 220px !important; }
          .hero-photo, .hero-current-card { max-width: 100% !important; }
        }
      `}</style>
    </section>
  )
}
