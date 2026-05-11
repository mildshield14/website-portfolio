import { useLang } from '../../context/LangContext'
import { SectionHeader } from '../ui/SectionHeader'

export function Skills() {
  const { t } = useLang()
  const s = t.skills

  return (
    <section id="skills" className="section" style={{ borderTop: '1px solid var(--c-border)' }}>
      <div className="container">
        <SectionHeader eyebrow={s.eyebrow} heading={s.heading} />

        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0' }}
          className="skills-grid"
        >
          {s.clusters.map((cluster, i) => (
            <div
              key={cluster.label}
              style={{
                padding: '24px',
                borderRight: (i + 1) % 3 !== 0 ? '1px solid var(--c-border)' : 'none',
                borderBottom: i < s.clusters.length - 3 ? '1px solid var(--c-border)' : 'none',
              }}
              className={`skill-cell skill-cell-${i}`}
            >
              <p className="meta-label" style={{ marginBottom: '14px' }}>
                {cluster.label}
              </p>

              <ul style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                {cluster.skills.map(skill => (
                  <li key={skill} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                      width: '3px', height: '3px', borderRadius: '50%',
                      background: 'var(--c-border2)', flexShrink: 0,
                    }} />
                    <span style={{ fontSize: '13.5px', color: 'var(--c-text)', lineHeight: 1.4 }}>
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .skills-grid {
          border: 1px solid var(--c-border);
          border-radius: var(--r-md);
          overflow: hidden;
          background: var(--c-surf);
        }
        @media (max-width: 860px) {
          .skills-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .skill-cell { border-right: none !important; border-bottom: 1px solid var(--c-border) !important; }
          .skill-cell:last-child { border-bottom: none !important; }
        }
        @media (max-width: 560px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
