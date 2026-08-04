import { ArrowUpRight, Plus } from 'lucide-react'
import { useLang } from '../../context/LangContext'
import type { PublicationItem } from '../../types'
import { SectionHeader } from '../ui/SectionHeader'

function PublicationCard({ item }: { item: PublicationItem }) {
  if (item.forthcoming) {
    return (
      <article className="publication-card publication-card-forthcoming">
        <div className="publication-placeholder-icon" aria-hidden="true">
          <Plus size={18} strokeWidth={1.4} />
        </div>
        <p className="section-eyebrow" style={{ marginBottom: '12px' }}>{item.status}</p>
        <h3>{item.title}</h3>
        <p className="publication-description">{item.description}</p>
      </article>
    )
  }

  return (
    <article className="publication-card">
      <p className="section-eyebrow" style={{ marginBottom: '12px' }}>{item.status}</p>
      <h3>{item.title}</h3>
      {item.authors && <p className="publication-authors">{item.authors}</p>}
      {item.meta && <p className="publication-meta">{item.meta}</p>}
      <p className="publication-description">{item.description}</p>
      <div className="publication-links">
        {item.links.map(link => (
          <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
            {link.label} <ArrowUpRight size={13} strokeWidth={1.5} aria-hidden="true" />
          </a>
        ))}
      </div>
    </article>
  )
}

export function Publications() {
  const { t } = useLang()
  const p = t.publications

  return (
    <section id="publications" className="section" style={{ borderBottom: '1px solid var(--c-border)' }}>
      <div className="container">
        <SectionHeader eyebrow={p.eyebrow} heading={p.heading} sub={p.sub} />
        <div className="publications-grid">
          {p.items.map(item => <PublicationCard key={item.title} item={item} />)}
        </div>
      </div>
    </section>
  )
}
