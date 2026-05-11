import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useLang } from '../../context/LangContext'
import { SectionHeader } from '../ui/SectionHeader'
import type { WorkItem } from '../../types'
import pipelineImg from '../../assets/pipeline.png'

interface CardLabels {
  challenge: string
  approach: string
  outcome: string
  expand: string
  collapse: string
}

/* ── Pipeline diagram panel (PromptSpec only) ──────────── */
function PipelineDiagram({ caption }: { caption: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ marginBottom: '18px' }}>
      {/* Panel header — same language as the code snippet */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '9px 14px',
        border: '1px solid var(--c-border)',
        borderRadius: open ? 'var(--r-sm) var(--r-sm) 0 0' : 'var(--r-sm)',
        borderBottom: open ? '1px solid var(--c-border)' : '1px solid var(--c-border)',
        background: 'var(--c-bg2)',
      }}>
        <span style={{
          fontFamily: 'var(--ff-mono)', fontSize: '11px',
          color: 'var(--c-text2)', letterSpacing: '0.01em',
        }}>
          pipeline.diagram
        </span>
        <button
          onClick={() => setOpen(o => !o)}
          style={{
            fontFamily: 'var(--ff-mono)', fontSize: '10.5px',
            color: 'var(--c-accent)', letterSpacing: '0.04em',
            background: 'none', border: 'none', cursor: 'pointer',
            padding: 0, lineHeight: 1,
            transition: 'color 0.15s',
          }}
        >
          {open ? '↑ close' : 'view →'}
        </button>
      </div>

      {/* Full diagram — expands below the header */}
      <div style={{
        maxHeight: open ? '900px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.4s ease',
      }}>
        <div style={{
          border: '1px solid var(--c-border)',
          borderTop: 'none',
          borderRadius: '0 0 var(--r-sm) var(--r-sm)',
          overflow: 'hidden',
        }}>
          <img
            src={pipelineImg}
            alt={caption}
            loading="lazy"
            decoding="async"
            style={{ width: '100%', display: 'block' }}
          />
          <div style={{
            padding: '10px 14px',
            borderTop: '1px solid var(--c-border)',
            background: 'var(--c-bg2)',
          }}>
            <p style={{
              fontFamily: 'var(--ff-mono)', fontSize: '10.5px',
              color: 'var(--c-text2)', lineHeight: 1.6, margin: 0,
            }}>
              {caption}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Featured (single, full-width, with code snippet) ──── */
function FeaturedWorkCard({ item, labels }: { item: WorkItem; labels: CardLabels }) {
  const [open, setOpen] = useState(false)

  return (
    <article
      className={`work-card work-card-featured${open ? ' is-open' : ''}`}
    >
      <div style={{ padding: '28px 28px 24px' }}>
        {/* Meta row */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '14px', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
            <span style={{ fontSize: '12px', color: 'var(--c-text2)', fontWeight: 500 }}>{item.type}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
            {item.role && <span style={{ fontSize: '11.5px', color: 'var(--c-text2)', fontWeight: 500 }}>{item.role}</span>}
            <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '11px', color: 'var(--c-text2)', fontWeight: 500 }}>{item.year}</span>
          </div>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: 'clamp(19px, 2vw, 24px)', fontWeight: 600, letterSpacing: '-0.01em',
          color: 'var(--c-text)', marginBottom: '8px', lineHeight: 1.2,
        }}>
          {item.title}
        </h3>

        {/* Sub */}
        <p style={{ fontSize: '14px', color: 'var(--c-text2)', lineHeight: 1.68, marginBottom: '18px', maxWidth: '640px' }}>
          {item.sub}
        </p>

        {/* Code snippet */}
        {item.codeSnippet && (
          <pre className="snippet-artifact" style={{
            fontFamily: 'var(--ff-mono)',
            fontSize: '11.5px',
            color: 'var(--c-text2)',
            background: 'var(--c-bg2)',
            border: '1px solid var(--c-border)',
            borderRadius: 'var(--r-sm)',
            padding: '14px 18px',
            marginBottom: '18px',
            overflowX: 'auto',
            lineHeight: 1.65,
          }}>
            {item.codeSnippet}
          </pre>
        )}

        {/* Pipeline diagram artifact */}
        {item.pipelineCaption && (
          <PipelineDiagram caption={item.pipelineCaption} />
        )}

        {/* Tags as plain text */}
        <p className="tag-list" style={{ marginBottom: '18px' }}>
          {item.tags.join(' · ')}
        </p>

        {/* Toggle */}
        <button className="work-toggle" onClick={() => setOpen(o => !o)} aria-expanded={open}>
          {open ? labels.collapse : labels.expand}
          <ChevronDown size={12} strokeWidth={1.5} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.22s' }} />
        </button>
      </div>

      {/* Expanded detail */}
      <div style={{ maxHeight: open ? '600px' : '0', overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
        <div style={{
          borderTop: '1px solid var(--c-border)',
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
        }} className="work-detail-grid">
          {[
            { label: labels.challenge, text: item.challenge },
            { label: labels.approach,  text: item.approach },
            { label: labels.outcome,   text: item.outcome },
          ].map(({ label, text }, i, arr) => (
            <div key={label} style={{ padding: '20px 28px', borderRight: i < arr.length - 1 ? '1px solid var(--c-border)' : 'none' }}>
              <p className="section-eyebrow" style={{ marginBottom: '8px' }}>{label}</p>
              <p style={{ fontSize: '13px', color: 'var(--c-text2)', lineHeight: 1.65 }}>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}

/* ── Medium card (2-col grid, accordion) ─────────────────── */
function MediumWorkCard({ item, labels }: { item: WorkItem; labels: CardLabels }) {
  const [open, setOpen] = useState(false)

  return (
    <article className={`work-card${open ? ' is-open' : ''}`}>
      <div style={{ padding: '20px 22px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '10px', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: 'var(--c-text2)', fontWeight: 500 }}>{item.type}</span>
          <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '11px', color: 'var(--c-text2)', fontWeight: 500 }}>{item.year}</span>
        </div>

        <h3 style={{
          fontSize: 'clamp(15px, 1.6vw, 18px)', fontWeight: 600, letterSpacing: '-0.01em',
          color: 'var(--c-text)', marginBottom: '6px', lineHeight: 1.25,
        }}>
          {item.title}
        </h3>

        <p style={{ fontSize: '13px', color: 'var(--c-text2)', lineHeight: 1.6, marginBottom: '12px' }}>
          {item.sub}
        </p>

        <p className="tag-list" style={{ marginBottom: '14px' }}>
          {item.tags.slice(0, 4).join(' · ')}
        </p>

        <button className="work-toggle" onClick={() => setOpen(o => !o)} aria-expanded={open}>
          {open ? labels.collapse : labels.expand}
          <ChevronDown size={12} strokeWidth={1.5} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.22s' }} />
        </button>
      </div>

      <div style={{ maxHeight: open ? '480px' : '0', overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
        <div style={{ borderTop: '1px solid var(--c-border)' }}>
          {[
            { label: labels.challenge, text: item.challenge },
            { label: labels.approach,  text: item.approach },
            { label: labels.outcome,   text: item.outcome },
          ].map(({ label, text }, i, arr) => (
            <div key={label} style={{ padding: '14px 22px', borderBottom: i < arr.length - 1 ? '1px solid var(--c-border)' : 'none' }}>
              <p className="section-eyebrow" style={{ marginBottom: '5px' }}>{label}</p>
              <p style={{ fontSize: '13px', color: 'var(--c-text2)', lineHeight: 1.65 }}>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}

/* ── Compact card (no accordion, dense) ─────────────────── */
function CompactWorkCard({ item }: { item: WorkItem }) {
  return (
    <article className="card card-interactive" style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
        <span style={{ fontSize: '11.5px', color: 'var(--c-text2)', fontWeight: 500 }}>{item.type.split(' · ')[0]}</span>
        <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '10px', color: 'var(--c-text2)', fontWeight: 500 }}>{item.year}</span>
      </div>

      <h3 style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--c-text)', lineHeight: 1.25 }}>
        {item.title}
      </h3>

      <p style={{ fontSize: '12.5px', color: 'var(--c-text2)', lineHeight: 1.55, flexGrow: 1 }}>
        {item.sub}
      </p>

      <p className="tag-list" style={{ marginTop: '4px' }}>
        {item.tags.slice(0, 3).join(' · ')}
      </p>
    </article>
  )
}

/* ── Section ─────────────────────────────────────────────── */
export function Work() {
  const { t } = useLang()
  const w = t.work
  const labels: CardLabels = {
    challenge: w.challenge,
    approach: w.approach,
    outcome: w.outcome,
    expand: w.expand,
    collapse: w.collapse,
  }

  const featuredItems = w.items.filter(i => i.featured)
  const nonFeatured   = w.items.filter(i => !i.featured)
  const mediumItems   = nonFeatured.slice(0, 2)
  const compactItems  = nonFeatured.slice(2)

  return (
    <section id="work" className="section" style={{ borderTop: '1px solid var(--c-border)' }}>
      <div className="container">
        <SectionHeader eyebrow={w.eyebrow} heading={w.heading} sub={w.sub} />

        <div style={{ marginBottom: '14px' }}>
          {featuredItems.map(item => <FeaturedWorkCard key={item.id} item={item} labels={labels} />)}
        </div>

        <div className="work-medium-grid" style={{ marginBottom: '12px' }}>
          {mediumItems.map(item => <MediumWorkCard key={item.id} item={item} labels={labels} />)}
        </div>

        <div className="work-compact-grid">
          {compactItems.map(item => <CompactWorkCard key={item.id} item={item} />)}
        </div>
      </div>
    </section>
  )
}
