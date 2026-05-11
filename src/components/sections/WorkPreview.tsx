import { ArrowRight } from 'lucide-react'
import { useLang } from '../../context/LangContext'
import { triggerHaptic } from '../../utils/haptics'

export function WorkPreview() {
  const { t } = useLang()
  const items = t.work.items

  return (
    <section style={{ borderTop: '1px solid var(--c-border)', background: 'var(--c-bg2)' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '28px 0 4px', gap: '16px' }}>
          <p className="section-eyebrow" style={{ margin: 0 }}>{t.work.eyebrow}</p>
          <a href="#work" className="link-quiet" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
            {t.ui.viewAllWork} <ArrowRight size={11} strokeWidth={1.5} />
          </a>
        </div>

        <div style={{ paddingBottom: '8px' }}>
          {items.map(item => (
            <a key={item.id} href="#work" className="preview-row" onClick={triggerHaptic}>
              <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--c-text)' }}>
                {item.title}
              </span>
              <span className="preview-row-type" style={{ fontSize: '12px', color: 'var(--c-text2)', fontWeight: 450 }}>
                {item.type.split(' · ')[0]}
              </span>
              <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '11px', color: 'var(--c-text2)', fontWeight: 500, textAlign: 'right' }}>
                {item.year}
              </span>
            </a>
          ))}
          <div style={{ borderTop: '1px solid var(--c-border)', paddingBottom: '28px' }} />
        </div>
      </div>
    </section>
  )
}
