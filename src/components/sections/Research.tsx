import { useLang } from '../../context/LangContext'
import { SectionHeader } from '../ui/SectionHeader'

export function Research() {
  const { t } = useLang()
  const r = t.research

  return (
    <section id="research" className="section" style={{ background: 'var(--c-bg2)', borderTop: '1px solid var(--c-border)', borderBottom: '1px solid var(--c-border)' }}>
      <div className="container">
        <div style={{ marginBottom: '10px' }}>
          <SectionHeader eyebrow={r.eyebrow} heading={r.heading} />
          <p style={{ fontSize: '12px', color: 'var(--c-text2)', fontWeight: 500, marginTop: '-24px', marginBottom: '40px' }}>
            {r.context}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '5fr 4fr', gap: '56px', alignItems: 'start' }} className="research-grid">

          {/* Left: problem + approach */}
          <div>
            <div style={{ marginBottom: '32px' }}>
              <p className="section-eyebrow" style={{ marginBottom: '10px' }}>{r.abstract_label}</p>
              <p style={{ fontSize: '14.5px', color: 'var(--c-text)', lineHeight: 1.78 }}>
                {r.abstract}
              </p>
            </div>

            <div>
              <p className="section-eyebrow" style={{ marginBottom: '10px' }}>{r.methods_label}</p>
              <p style={{ fontSize: '13.5px', color: 'var(--c-text2)', lineHeight: 1.72, marginBottom: '18px' }}>
                {r.methods}
              </p>
              <p style={{ fontSize: '12px', color: 'var(--c-text2)', fontWeight: 450, lineHeight: 1.6 }}>
                {r.keywords.join(' · ')}
              </p>
            </div>
          </div>

          {/* Right: open questions as plain numbered list */}
          <div>
            <p className="section-eyebrow" style={{ marginBottom: '20px' }}>{r.questions_label}</p>
            <ol style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {r.questions.map((q, i) => (
                <li key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <span style={{
                    fontFamily: 'var(--ff-mono)', fontSize: '10px',
                    color: 'var(--c-text2)', fontWeight: 500, flexShrink: 0, paddingTop: '3px', minWidth: '18px',
                  }}>
                    {i + 1}.
                  </span>
                  <p style={{ fontSize: '13.5px', color: 'var(--c-text2)', lineHeight: 1.68 }}>{q}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
