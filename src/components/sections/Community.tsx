import { useLang } from '../../context/LangContext'
import { SectionHeader } from '../ui/SectionHeader'

export function Community() {
  const { t } = useLang()
  const c = t.community

  return (
    <section id="community" className="section" style={{ borderTop: '1px solid var(--c-border)' }}>
      <div className="container">
        <SectionHeader eyebrow={c.eyebrow} heading={c.heading} />
        <div>
          {c.items.map((item, i) => (
            <div
              key={i}
              className="community-row"
              style={{
                display: 'grid',
                gridTemplateColumns: '5fr 7fr',
                gap: '48px',
                padding: '24px 0',
                borderBottom: i < c.items.length - 1 ? '1px solid var(--c-border)' : 'none',
                alignItems: 'start',
              }}
            >
              <div>
                <p style={{
                  fontSize: '15px', fontWeight: 600,
                  color: 'var(--c-text)', marginBottom: '4px',
                }}>
                  {item.org}
                </p>
                <p style={{ fontSize: '13px', color: 'var(--c-text2)', fontWeight: 500 }}>{item.role}</p>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--c-text2)', fontWeight: 400, lineHeight: 1.72 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .community-row { grid-template-columns: 1fr !important; gap: 8px !important; }
        }
      `}</style>
    </section>
  )
}
