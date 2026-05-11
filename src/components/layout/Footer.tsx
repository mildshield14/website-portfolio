import { useLang } from '../../context/LangContext'

export function Footer() {
  const { t } = useLang()
  const year = new Date().getFullYear()

  return (
    <footer style={{ borderTop: '1px solid var(--c-border)', padding: '28px 0' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <span className="meta-label">Vennila Sooben · {year}</span>
        <span className="meta-label">{t.footer.made}</span>
      </div>
    </footer>
  )
}
