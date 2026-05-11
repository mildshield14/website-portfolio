import { useState, useEffect } from 'react'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useLang } from '../../context/LangContext'
import { triggerHaptic } from '../../utils/haptics'

const navLinks = [
  { href: '#work',       key: 'work'       },
  { href: '#research',   key: 'research'   },
  { href: '#experience', key: 'experience' },
  { href: '#education',  key: 'education'  },
  { href: '#skills',     key: 'skills'     },
  { href: '#about',      key: 'about'      },
  { href: '#contact',    key: 'contact'    },
] as const

export function Nav() {
  const { theme, toggle } = useTheme()
  const { lang, setLang, t } = useLang()
  const isHome = typeof window === 'undefined' || window.location.pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState(isHome ? 'home' : '')
  const getSectionHref = (href: string) => (isHome ? href : `/${href}`)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    if (!isHome) return

    const sectionIds = ['home', ...navLinks.map(link => link.href.slice(1))]
    const sections = sectionIds
      .map(id => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target.id) {
          setActiveSection(visible.target.id)
        }
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0.01, 0.2, 0.5] },
    )

    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [isHome])

  return (
    <>
      <nav
        aria-label="Main navigation"
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          height: '60px',
          zIndex: 100,
          backgroundColor: scrolled ? 'color-mix(in srgb, var(--c-bg) 94%, transparent)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: `1px solid ${scrolled ? 'var(--c-border)' : 'transparent'}`,
          transition: 'background-color 0.3s, border-color 0.3s',
        }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 40px',
        }}>
          {/* Logo */}
          <a href={isHome ? '#home' : '/'} style={{
            fontFamily: 'var(--ff-body)',
            fontSize: '15px', fontWeight: 600, letterSpacing: '-0.01em',
            color: 'var(--c-text)', textDecoration: 'none', flexShrink: 0,
          }}>
            Vennila Sooben
          </a>

          {/* Desktop links */}
          <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {navLinks.map(link => (
              <a
                key={link.href}
                href={getSectionHref(link.href)}
                className={`nav-link${activeSection === link.href.slice(1) ? ' is-active' : ''}`}
              >
                {t.nav[link.key]}
              </a>
            ))}
          </div>

          {/* Right controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* CV pill */}
            <a
              href={t.contact.resumeFile}
              className="nav-cv-pill nav-desktop"
              onClick={triggerHaptic}
            >
              {t.nav.cv}
            </a>

            {/* Lang toggle */}
            <button
              onClick={() => {
                triggerHaptic()
                setLang(lang === 'en' ? 'fr' : 'en')
              }}
              aria-label={`Switch to ${lang === 'en' ? 'French' : 'English'}`}
              className="nav-control nav-lang-toggle"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '11px', letterSpacing: '0.06em', fontWeight: 500,
                color: 'var(--c-text2)', background: 'transparent',
                border: '1px solid var(--c-border)', borderRadius: 'var(--r-md)',
                padding: '6px 10px', cursor: 'pointer',
              }}
            >
              {lang === 'en' ? 'FR' : 'EN'}
            </button>

            {/* Theme toggle */}
            <button
              onClick={() => {
                triggerHaptic()
                toggle()
              }}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              className="nav-control nav-theme-toggle"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: '34px', height: '34px', borderRadius: 'var(--r-md)',
                color: 'var(--c-text2)', background: 'transparent',
                border: '1px solid var(--c-border)', cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              {theme === 'light' ? <Moon size={15} strokeWidth={1.5} /> : <Sun size={15} strokeWidth={1.5} />}
            </button>

            {/* Mobile hamburger */}
            <button
              className="nav-control nav-hamburger"
              style={{ display: 'none', alignItems: 'center', justifyContent: 'center', width: '34px', height: '34px', borderRadius: 'var(--r-md)', color: 'var(--c-text2)', background: 'transparent', border: '1px solid var(--c-border)', cursor: 'pointer' }}
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99,
          backgroundColor: 'var(--c-bg)',
          display: 'flex', flexDirection: 'column',
          padding: '80px 24px 40px',
        }}>
          {navLinks.map(link => (
            <a
              key={link.href}
              href={getSectionHref(link.href)}
              onClick={() => setMenuOpen(false)}
              className={activeSection === link.href.slice(1) ? 'is-active' : ''}
              style={{
                fontFamily: 'var(--ff-body)',
                fontSize: '20px', fontWeight: 600, letterSpacing: '-0.01em',
                color: 'var(--c-text)', textDecoration: 'none',
                padding: '14px 0', borderBottom: '1px solid var(--c-border)',
              }}
            >
              {t.nav[link.key]}
            </a>
          ))}
          <a
            href={t.contact.resumeFile}
            onClick={() => {
              triggerHaptic()
              setMenuOpen(false)
            }}
            style={{
              display: 'inline-flex', alignItems: 'center',
              marginTop: '24px', padding: '12px 20px',
              background: 'var(--c-accent)', color: 'var(--c-bg)',
              borderRadius: 'var(--r-sm)', fontWeight: 600, fontSize: '14px',
              textDecoration: 'none', alignSelf: 'flex-start',
            }}
          >
            {t.nav.cv}
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: inline-flex !important; }
        }
      `}</style>
    </>
  )
}
