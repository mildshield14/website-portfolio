import { Mail, Github, Linkedin, FileText } from 'lucide-react'
import { useLang } from '../../context/LangContext'
import { SectionHeader } from '../ui/SectionHeader'
import { triggerHaptic } from '../../utils/haptics'

function ContactLink({
  href,
  icon,
  label,
  value,
  haptic = false,
}: {
  href: string
  icon: React.ReactNode
  label: string
  value: string
  haptic?: boolean
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="card-interactive"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        padding: '20px 24px',
        border: '1px solid var(--c-border)',
        borderRadius: 'var(--r-md)',
        background: 'var(--c-surf)',
        textDecoration: 'none',
        boxShadow: 'var(--sh-xs)',
        color: 'inherit',
      }}
      aria-label={`${label}: ${value}`}
      onClick={haptic ? triggerHaptic : undefined}
    >
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '36px',
          height: '36px',
          borderRadius: 'var(--r-md)',
          background: 'var(--c-bg2)',
          color: 'var(--c-accent)',
          flexShrink: 0,
        }}
      >
        {icon}
      </span>
      <div>
        <p
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '9.5px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--c-text2)',
            fontWeight: 500,
            marginBottom: '2px',
          }}
        >
          {label}
        </p>
        <p
          style={{
            fontSize: '13.5px',
            color: 'var(--c-text)',
            fontWeight: 400,
          }}
        >
          {value}
        </p>
      </div>
    </a>
  )
}

export function Contact() {
  const { t } = useLang()
  const c = t.contact
  const ui = t.ui

  return (
    <section id="contact" className="section" style={{ borderTop: '1px solid var(--c-border)' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '4fr 5fr',
            gap: '64px',
            alignItems: 'start',
          }}
          className="contact-grid"
        >
          {/* Left: header */}
          <div>
            <SectionHeader
              eyebrow={c.eyebrow}
              heading={c.heading}
              sub={c.sub}
            />
          </div>

          {/* Right: links */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
            }}
            className="contact-links-grid"
          >
            <ContactLink
              href={`mailto:${c.email}`}
              icon={<Mail size={16} strokeWidth={1.5} />}
              label={ui.email}
              value={c.email}
            />
            <ContactLink
              href={`https://${c.github}`}
              icon={<Github size={16} strokeWidth={1.5} />}
              label={ui.githubLabel}
              value={c.github}
            />
            <ContactLink
              href={`https://${c.linkedin}`}
              icon={<Linkedin size={16} strokeWidth={1.5} />}
              label={ui.linkedinLabel}
              value={c.linkedin}
            />
            <ContactLink
            href={c.resumeFile}
            icon={<FileText size={16} strokeWidth={1.5} />}
            label={ui.resumeLabel}
            value={c.resumeLabel}
            haptic
          />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .contact-links-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
