import { useState } from 'react'
import { ChevronDown, MapPin } from 'lucide-react'
import { useLang } from '../../context/LangContext'
import { SectionHeader } from '../ui/SectionHeader'
import type { ExperienceItem } from '../../types'

import logoIA     from '../../assets/logo/Logo_iA_Groupe_financier_-_Industrielle_Alliance.png'
import logoMITACS from '../../assets/logo/MITACS.png'
import logoUdeM   from '../../assets/logo/Universite_de_Montreal_logo.svg.png'
import logoBell   from '../../assets/logo/logo-bellmedia-en.png'
import logoRFIUM  from '../../assets/logo/images-6.jpeg'

const LOGOS: Record<string, string> = {
  'iA Financial Group':    logoIA,
  'iA Groupe Financier':   logoIA,
  'Draft & Goal / MITACS': logoMITACS,
  'Université de Montréal': logoUdeM,
  'Bell Media':            logoBell,
  'RFIUM':                 logoRFIUM,
}

function ExperienceLogo({ company }: { company: string }) {
  const src = LOGOS[company]
  if (!src) return null

  return (
    <div
      aria-hidden="true"
      style={{
        width: 42, height: 42,
        flexShrink: 0,
        borderRadius: 'var(--r-sm)',
        border: '1px solid var(--c-border)',
        background: 'var(--c-surf)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
        padding: '5px',
      }}
    >
      <img
        src={src}
        alt=""
        style={{
          width: '100%', height: '100%',
          objectFit: 'contain',
          filter: 'grayscale(1)',
          opacity: 0.5,
          display: 'block',
        }}
      />
    </div>
  )
}

function ExperienceRow({ item, isLast, currentLabel }: {
  item: ExperienceItem
  isLast: boolean
  currentLabel: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ borderBottom: isLast ? 'none' : '1px solid var(--c-border)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{
          width: '100%', textAlign: 'left',
          background: 'transparent', border: 'none', cursor: 'pointer',
          padding: '20px 0',
          display: 'grid', gridTemplateColumns: '1fr auto',
          alignItems: 'center', gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ExperienceLogo company={item.company} />

          <div>
            {/* Company + current badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px', flexWrap: 'wrap' }}>
              <span style={{
                fontFamily: 'var(--ff-display)',
                fontSize: '16px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--c-text)',
              }}>
                {item.company}
              </span>
              {item.current && (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '4px',
                  fontFamily: 'var(--ff-mono)',
                  fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase',
                  fontWeight: 500,
                  color: 'var(--c-accent)', border: '1px solid var(--c-accent)',
                  borderRadius: '2px', padding: '2px 6px',
                }}>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--c-accent)' }} />
                  {currentLabel}
                </span>
              )}
            </div>

            {/* Role + period + location */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '13.5px', color: 'var(--c-text2)', fontWeight: 500 }}>{item.role}</span>
              <span className="meta-label">{item.period}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }} className="meta-label">
                <MapPin size={10} strokeWidth={1.5} />{item.loc}
              </span>
            </div>
          </div>
        </div>

        <ChevronDown size={16} strokeWidth={1.5} style={{
          color: 'var(--c-text2)', flexShrink: 0,
          transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s',
        }} />
      </button>

      {/* Expandable */}
      <div style={{ maxHeight: open ? '280px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
        <div style={{ paddingBottom: '20px', paddingLeft: '48px' }}>
          <p style={{ fontSize: '13.5px', color: 'var(--c-text2)', lineHeight: 1.7, marginBottom: '12px', maxWidth: '600px' }}>
            {item.summary}
          </p>
          <p className="tag-list">{item.tags.join(' · ')}</p>
        </div>
      </div>
    </div>
  )
}

export function Experience() {
  const { t } = useLang()
  const e = t.experience

  return (
    <section id="experience" className="section" style={{ borderTop: '1px solid var(--c-border)' }}>
      <div className="container">
        <SectionHeader eyebrow={e.eyebrow} heading={e.heading} />
        <div>
          {e.items.map((item, i) => (
            <ExperienceRow
              key={i}
              item={item}
              isLast={i === e.items.length - 1}
              currentLabel={t.ui.current}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
